import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

const DEVELOPMENT_SITE_KEY = '1x00000000000000000000AA';

type TurnstileOptions = {
  sitekey: string;
  action: string;
  appearance: 'interaction-only';
  size: 'flexible';
  theme: 'auto';
  callback: (token: string) => void;
  'error-callback': () => boolean;
  'expired-callback': () => void;
  'timeout-callback': () => void;
};

type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileOptions) => string;
  remove: (widgetId: string) => void;
  reset: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type TurnstileProps = {
  onTokenChange: (token: string | null) => void;
  onUnavailable: () => void;
  resetKey: number;
  unavailableMessage: string;
};

export default function Turnstile({
  onTokenChange,
  onUnavailable,
  resetKey,
  unavailableMessage,
}: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const previousResetKeyRef = useRef(resetKey);
  const [scriptReady, setScriptReady] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const siteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ??
    (process.env.NODE_ENV === 'production' ? '' : DEVELOPMENT_SITE_KEY);

  useEffect(() => {
    if (
      !scriptReady ||
      !siteKey ||
      unavailable ||
      !containerRef.current ||
      !window.turnstile
    ) {
      return;
    }

    const turnstile = window.turnstile;
    widgetIdRef.current = turnstile.render(containerRef.current, {
      sitekey: siteKey,
      action: 'contact',
      appearance: 'interaction-only',
      size: 'flexible',
      theme: 'auto',
      callback: token => onTokenChange(token),
      'error-callback': () => {
        onTokenChange(null);
        onUnavailable();
        setUnavailable(true);
        return true;
      },
      'expired-callback': () => onTokenChange(null),
      'timeout-callback': () => onTokenChange(null),
    });

    return () => {
      if (widgetIdRef.current) {
        turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [onTokenChange, onUnavailable, scriptReady, siteKey, unavailable]);

  useEffect(() => {
    if (!siteKey) {
      onUnavailable();
    }
  }, [onUnavailable, siteKey]);

  useEffect(() => {
    if (previousResetKeyRef.current === resetKey) {
      return;
    }

    previousResetKeyRef.current = resetKey;
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
      onTokenChange(null);
    }
  }, [onTokenChange, resetKey]);

  if (!siteKey || unavailable) {
    return (
      <p className='text-xs text-red-700 dark:text-red-300' role='alert'>
        {unavailableMessage}
      </p>
    );
  }

  return (
    <>
      <Script
        src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
        strategy='afterInteractive'
        onReady={() => setScriptReady(true)}
        onError={() => {
          onUnavailable();
          setUnavailable(true);
        }}
      />
      <div ref={containerRef} className='w-full' />
    </>
  );
}
