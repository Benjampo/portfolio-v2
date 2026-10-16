declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SENDGRID_API_KEY: string;
      NEXT_PUBLIC_TURNSTILE_SITE_KEY?: string;
      TURNSTILE_SECRET_KEY?: string;
    }
  }
}
export {};
