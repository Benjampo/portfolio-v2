This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contact form configuration

The contact form uses the official `resend` package. Its historical endpoint
`/api/sendgrid` is kept to preserve existing callers; it now sends through Resend.
Configure these variables in Vercel for each deployment environment:

```bash
RESEND_API_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

`RESEND_API_KEY` is a server-only Resend API key with email sending permission.
Verify the `benjampo.ch` sending domain in Resend so that `contact@benjampo.ch`
can send to `benjaminporchet.pro@gmail.com`. Never prefix the API key with
`NEXT_PUBLIC_`. Copy `.env.example` to `.env.local` for local overrides.

Turnstile is required in production. If its widget cannot load, submission stays
blocked and the existing verification-unavailable message is shown. Missing
server configuration or unavailable verification returns HTTP 503; rejected or
missing tokens are refused. There is no fallback that bypasses verification.
This prioritizes spam protection over form availability during Cloudflare outages.
Honeypot, timing, validation, and spam-content checks remain in place.
During local development only, missing Turnstile keys use Cloudflare's official
always-pass test keys; email sending still uses Resend if the form is submitted.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
