import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

// Minimum time (in ms) user should spend on form - too fast = bot
const MIN_FORM_TIME_MS = 3000; // 3 seconds

// Simple email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Spam keywords to check in message content
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

async function sendEmail(
  req: {
    body: {
      subject: string;
      fullname: string;
      email: string;
      message: string;
      website?: string; // honeypot field
      formLoadTime?: number; // timestamp when form loaded
    };
  },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { error: any }): any; new (): any };
    };
  }
) {
  const { subject, fullname, email, message, website, formLoadTime } = req.body;

  // Spam check 1: Honeypot field should be empty
  if (website && website.length > 0) {
    // Silently reject - don't let bots know they were caught
    return res.status(200).json({ error: '' });
  }

  // Spam check 2: Form submission too fast
  if (formLoadTime) {
    const timeSpent = Date.now() - formLoadTime;
    if (timeSpent < MIN_FORM_TIME_MS) {
      return res.status(400).json({ error: 'Please take your time filling out the form.' });
    }
  }

  // Spam check 3: Validate email format
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  // Spam check 4: Check for spam keywords
  const lowerMessage = message.toLowerCase();
  const lowerSubject = subject.toLowerCase();
  const hasSpamKeyword = SPAM_KEYWORDS.some(
    keyword => lowerMessage.includes(keyword) || lowerSubject.includes(keyword)
  );
  if (hasSpamKeyword) {
    return res.status(400).json({ error: 'Your message was flagged as spam. Please revise and try again.' });
  }

  // Spam check 5: Basic field length validation
  if (fullname.length > 100 || subject.length > 200 || message.length > 5000) {
    return res.status(400).json({ error: 'Please keep your message within reasonable length limits.' });
  }

  try {
    // Sanitize inputs to prevent XSS in email
    const sanitize = (str: string) =>
      str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    await sendgrid.send({
      to: 'benjaminporchet.pro@gmail.com', // Your email where you'll receive emails
      from: 'contact@benjampo.ch', // your website email address here
      subject: `[Contact from website] : ${sanitize(subject)}`,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en">
      <head>
        <meta charset="utf-8">

        <title>The HTML5 Herald</title>
        <meta name="description" content="The HTML5 Herald">
        <meta name="author" content="SitePoint">
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />

        <link rel="stylesheet" href="css/styles.css?v=1.0">

      </head>

      <body>
        <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">
              </div>
              <div class="container" style="margin-left: 20px;margin-right: 20px;">
              <h3>You've got a new mail from ${sanitize(fullname)}, their email is: ✉️${sanitize(email)} </h3>
              <div style="font-size: 16px;">
              <p>Message:</p>
              <p>${sanitize(message)}</p>
              <br>
              </div>

              </div>
      </body>
      </html>`,
    });
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: '' });
}

export default sendEmail;
