import { defineMiddleware } from 'astro:middleware';
import geoip from 'geoip-lite';

const COUNTRY_LOCALE: Record<string, string> = {
  PL: 'pl',
  BR: 'br',
  MX: 'mx',
};
const DEFAULT_LOCALE = 'pl';

export function getLocaleFromIp(ip: string): string {
  const geo = geoip.lookup(ip);
  const country = geo?.country || '';
  return COUNTRY_LOCALE[country] || DEFAULT_LOCALE;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Root "/" — geo-redirect
  if (pathname === '/') {
    const forwarded = context.request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() || context.clientAddress;
    const locale = getLocaleFromIp(ip);
    return context.redirect(`/${locale}/`, 302);
  }

  // Add cache headers
  const response = await next();
  const url = context.url.pathname;

  if (/\.(png|jpg|jpeg|gif|svg|ico|woff2?|ttf|eot)$/i.test(url)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (url.endsWith('.html') || !url.includes('.')) {
    response.headers.set('Cache-Control', 'public, max-age=600, stale-while-revalidate=86400');
  }

  return response;
});
