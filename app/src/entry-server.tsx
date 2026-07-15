import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './App';
import { products } from './data/products';

/**
 * Routes rendered to static HTML at build time. Product URLs derive from the
 * real data so adding a product cannot silently leave it unprerendered.
 *
 * Deliberately excluded: /checkout, /login, /dashboard, /admin — per-user or
 * private, and disallowed in robots.txt.
 */
export const routesToPrerender: string[] = [
  '/',
  '/shop',
  '/about',
  '/gallery',
  '/blog',
  '/contact',
  '/faqs',
  '/privacy',
  '/terms',
  '/shipping',
  '/refund',
  '/disclaimer',
  ...products.map((p) => `/product/${p.slug}`),
];

/** Renders one route to static HTML. Called by scripts/prerender.mjs per URL. */
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
}
