import { Resend } from 'resend';
import type { NextApiRequest, NextApiResponse } from 'next';

const DEVELOPMENT_SECRET_KEY = '1x0000000000000000000000000000000AA';
const EMAIL_REGEX =
  /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/;
const HEADER_CONTROL_REGEX = /[\x00-\x1f\x7f]/;
const MIN_FORM_TIME_MS = 2000;
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
  formStartedAt: number;
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
  const stringFields = [
    'subject',
    'fullname',
    'email',
    'message',
    'website',
    'turnstileToken',
  ] as const;

  if (
    stringFields.some(field => typeof values[field] !== 'string') ||
    typeof values.formStartedAt !== 'number'
  ) {
    return null;
  }

  return {
    ...Object.fromEntries(stringFields.map(field => [field, values[field]])),
    formStartedAt: values.formStartedAt,
  } as ContactPayload;
}

function isPayloadValid(payload: ContactPayload) {
  const { subject, fullname, email, message, formStartedAt, turnstileToken } =
    payload;
  const elapsedTime = Date.now() - formStartedAt;

  return (
    fullname.trim().length > 0 &&
    fullname.length <= 100 &&
    !HEADER_CONTROL_REGEX.test(fullname) &&
    subject.trim().length > 0 &&
    subject.length <= 200 &&
    !HEADER_CONTROL_REGEX.test(subject) &&
    message.trim().length > 0 &&
    message.length <= 5000 &&
    email.length <= 254 &&
    !HEADER_CONTROL_REGEX.test(email) &&
    EMAIL_REGEX.test(email) &&
    Number.isFinite(formStartedAt) &&
    elapsedTime >= MIN_FORM_TIME_MS &&
    elapsedTime <= 24 * 60 * 60 * 1000 &&
    turnstileToken.length <= 2048
  );
}

function getRequestIp(req: NextApiRequest) {
  const forwardedFor = req.headers['x-forwarded-for'];
  const value = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor;
  return value?.split(',')[0]?.trim();
}

function getRequestHostname(req: NextApiRequest) {
  // Use Host, not a client-supplied forwarded host, and require an allowed deployment.
  const host = req.headers.host;
  if (!host || !/^[a-z0-9.-]+(?::[0-9]+)?$/i.test(host)) {
    return undefined;
  }
  const hostname = host.split(':')[0].toLowerCase();
  const allowedHostnames = [
    'benjampo.ch',
    'www.benjampo.ch',
    'www.benjampo.com',
    'www.benjaminporchet.ch',
    process.env.VERCEL_URL,
    process.env.VERCEL_BRANCH_URL,
    ...(process.env.NODE_ENV !== 'production'
      ? ['localhost', '127.0.0.1']
      : []),
  ];
  return allowedHostnames.includes(hostname) ? hostname : undefined;
}

async function verifyTurnstile(req: NextApiRequest, payload: ContactPayload) {
  const secret =
    process.env.TURNSTILE_SECRET_KEY ??
    (process.env.NODE_ENV === 'production'
      ? undefined
      : DEVELOPMENT_SECRET_KEY);

  if (!secret) {
    console.error('Turnstile configuration error', {
      code: 'missing_secret',
      message: 'TURNSTILE_SECRET_KEY is not configured',
    });
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
      Boolean(requestHostname) && result.hostname === requestHostname;

    if (
      result.success !== true ||
      result.action !== 'contact' ||
      !hostnameMatches
    ) {
      console.warn('Turnstile rejected a contact submission', {
        errors: result['error-codes'],
        action: result.action,
        hostname: result.hostname,
      });
      return { ok: false, status: 400 } as const;
    }

    return { ok: true } as const;
  } catch (error) {
    console.error('Turnstile verification was unavailable', {
      code: 'verification_unavailable',
      message:
        error instanceof Error ? error.message : 'Unknown verification error',
    });
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
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const resend = new Resend(apiKey);
  const safeName = escapeHtml(payload.fullname.trim());
  const safeEmail = escapeHtml(payload.email.trim());
  const safeMessage = escapeHtml(payload.message.trim()).replace(/\n/g, '<br>');
  const safeSubject = payload.subject.trim().replace(/[\r\n]+/g, ' ');

  const { error } = await resend.emails.send({
    to: 'benjaminporchet.pro@gmail.com',
    from: 'hello@benjampo.ch',
    replyTo: payload.email.trim(),
    subject: `[Contact from website] ${safeSubject}`,
    html: `<h3>New message from ${safeName} (${safeEmail})</h3><p>${safeMessage}</p>`,
  });

  if (error) {
    console.error('Resend rejected contact email', {
      code: error.name,
      message: error.message.replaceAll(apiKey, '[redacted]'),
      status: error.statusCode,
    });
    throw new Error('Resend email delivery failed');
  }
}

export const config = {
  api: { bodyParser: { sizeLimit: '32kb' } },
};

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

  if (!payload.turnstileToken.trim()) {
    return res.status(400).json({ error: 'Spam verification failed' });
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
    const apiKey = process.env.RESEND_API_KEY;
    const message =
      error instanceof Error ? error.message : 'Unknown delivery error';
    console.error('Unable to send contact email', {
      code: error instanceof Error ? error.name : 'unknown_error',
      message: apiKey ? message.replaceAll(apiKey, '[redacted]') : message,
    });
    return res.status(502).json({ error: 'Unable to send message' });
  }
}
