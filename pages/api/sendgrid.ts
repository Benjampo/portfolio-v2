import sendgrid from '@sendgrid/mail';
import type { NextApiRequest, NextApiResponse } from 'next';

const DEVELOPMENT_SECRET_KEY = '1x0000000000000000000000000000000AA';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TURNSTILE_VERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const SPAM_KEYWORDS = [
  'viagra',
  'casino',
  'lottery',
  'winner',
  'click here',
  'buy now',
  'free money',
  'cryptocurrency',
  'bitcoin investment',
];

type ContactPayload = {
  subject: string;
  fullname: string;
  email: string;
  message: string;
  website: string;
  turnstileToken: string;
};

type TurnstileResponse = {
  success: boolean;
  action?: string;
  hostname?: string;
  'error-codes'?: string[];
};

function readPayload(body: unknown): ContactPayload | null {
  if (!body || typeof body !== 'object') {
    return null;
  }

  const values = body as Record<string, unknown>;
  const fields = [
    'subject',
    'fullname',
    'email',
    'message',
    'website',
    'turnstileToken',
  ] as const;

  if (fields.some(field => typeof values[field] !== 'string')) {
    return null;
  }

  return Object.fromEntries(
    fields.map(field => [field, values[field]])
  ) as ContactPayload;
}

function isPayloadValid(payload: ContactPayload) {
  const { subject, fullname, email, message, turnstileToken } = payload;

  return (
    fullname.trim().length > 0 &&
    fullname.length <= 100 &&
    subject.trim().length > 0 &&
    subject.length <= 200 &&
    message.trim().length > 0 &&
    message.length <= 5000 &&
    email.length <= 320 &&
    EMAIL_REGEX.test(email) &&
    turnstileToken.length > 0 &&
    turnstileToken.length <= 2048
  );
}

function getRequestIp(req: NextApiRequest) {
  const forwardedFor = req.headers['x-forwarded-for'];
  const value = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor;
  return value?.split(',')[0]?.trim();
}

function getRequestHostname(req: NextApiRequest) {
  const host = req.headers['x-forwarded-host'] ?? req.headers.host;
  const value = Array.isArray(host) ? host[0] : host;
  return value?.split(',')[0]?.trim().split(':')[0]?.toLowerCase();
}

async function verifyTurnstile(req: NextApiRequest, payload: ContactPayload) {
  const secret =
    process.env.TURNSTILE_SECRET_KEY ??
    (process.env.NODE_ENV === 'production'
      ? undefined
      : DEVELOPMENT_SECRET_KEY);

  if (!secret) {
    console.error('TURNSTILE_SECRET_KEY is not configured');
    return { ok: false, status: 503 } as const;
  }

  const verificationBody = new URLSearchParams({
    secret,
    response: payload.turnstileToken,
  });
  const requestIp = getRequestIp(req);
  if (requestIp) {
    verificationBody.set('remoteip', requestIp);
  }

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      body: verificationBody,
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      console.error('Turnstile verification request failed', response.status);
      return { ok: false, status: 503 } as const;
    }

    const result = (await response.json()) as TurnstileResponse;
    const requestHostname = getRequestHostname(req);
    const hostnameMatches =
      !requestHostname ||
      !result.hostname ||
      result.hostname === requestHostname;

    if (!result.success || result.action !== 'contact' || !hostnameMatches) {
      console.warn('Turnstile rejected a contact submission', {
        errors: result['error-codes'],
        action: result.action,
        hostname: result.hostname,
      });
      return { ok: false, status: 400 } as const;
    }

    return { ok: true } as const;
  } catch (error) {
    console.error('Turnstile verification was unavailable', error);
    return { ok: false, status: 503 } as const;
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function sendEmail(payload: ContactPayload) {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    throw new Error('SENDGRID_API_KEY is not configured');
  }

  sendgrid.setApiKey(apiKey);
  const safeName = escapeHtml(payload.fullname.trim());
  const safeEmail = escapeHtml(payload.email.trim());
  const safeMessage = escapeHtml(payload.message.trim()).replace(/\n/g, '<br>');
  const safeSubject = payload.subject.trim().replace(/[\r\n]+/g, ' ');

  await sendgrid.send({
    to: 'benjaminporchet.pro@gmail.com',
    from: 'contact@benjampo.ch',
    replyTo: payload.email.trim(),
    subject: `[Contact from website] ${safeSubject}`,
    html: `<h3>New message from ${safeName} (${safeEmail})</h3><p>${safeMessage}</p>`,
  });
}

export default async function contactHandler(
  req: NextApiRequest,
  res: NextApiResponse<{ error: string }>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const payload = readPayload(req.body);
  if (!payload) {
    return res.status(400).json({ error: 'Invalid form data' });
  }

  if (payload.website.trim().length > 0) {
    return res.status(200).json({ error: '' });
  }

  if (!isPayloadValid(payload)) {
    return res.status(400).json({ error: 'Invalid form data' });
  }

  const normalizedContent =
    `${payload.subject} ${payload.message}`.toLowerCase();
  if (SPAM_KEYWORDS.some(keyword => normalizedContent.includes(keyword))) {
    return res.status(400).json({ error: 'Message flagged as spam' });
  }

  const verification = await verifyTurnstile(req, payload);
  if (!verification.ok) {
    return res
      .status(verification.status)
      .json({ error: 'Spam verification failed' });
  }

  try {
    await sendEmail(payload);
    return res.status(200).json({ error: '' });
  } catch (error) {
    console.error('Unable to send contact email', error);
    return res.status(502).json({ error: 'Unable to send message' });
  }
}
