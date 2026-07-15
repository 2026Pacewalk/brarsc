/**
 * Renders every public route to static HTML at build time.
 *
 * Why this exists: the app is a client-rendered SPA, so without this the server
 * sends `<div id="root"></div>` and nothing else. Google renders JS eventually,
 * but GPTBot, PerplexityBot and ClaudeBot do not run JS at all — to them the
 * site was simply empty. Prerendering puts the real content, metadata and
 * JSON-LD into the HTML itself.
 *
 * Run after `vite build` (client) and `vite build --ssr` (server).
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const here = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(here, '..');
const distDir = resolve(appRoot, 'dist');

// pathToFileURL: a bare Windows path ("F:\...") is not a valid ESM specifier.
const { render, routesToPrerender } = await import(
  pathToFileURL(resolve(appRoot, 'dist-server/entry-server.js')).href
);

const template = readFileSync(resolve(distDir, 'index.html'), 'utf8');

// React emits <title>/<meta>/<link>/<script type=ld+json> inline in the render
// output. They are only valid — and only reliably read by crawlers — inside
// <head>, so lift them out of the body markup and into the template's head.
const HEAD_TAGS =
  /<title>[\s\S]*?<\/title>|<meta\b[^>]*\/?>|<link\b[^>]*rel="canonical"[^>]*\/?>|<script\b[^>]*type="application\/ld\+json"[\s\S]*?<\/script>/gi;

function splitHeadAndBody(html) {
  const head = html.match(HEAD_TAGS) ?? [];
  const body = html.replace(HEAD_TAGS, '');
  return { head: head.join('\n    '), body };
}

let count = 0;
for (const url of routesToPrerender) {
  const rendered = render(url);
  const { head, body } = splitHeadAndBody(rendered);

  let html = template;

  // Replace the template's static title/description with this page's own.
  if (head.includes('<title>')) {
    html = html.replace(/<title>[\s\S]*?<\/title>\s*/i, '');
    html = html.replace(/<meta\s+name="description"[^>]*>\s*/i, '');
  }

  html = html
    .replace('</head>', `  ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  const outPath =
    url === '/'
      ? resolve(distDir, 'index.html')
      : resolve(distDir, `.${url}/index.html`);

  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
  count++;
  console.log(`  prerendered ${url}`);
}

console.log(`\nPrerendered ${count} routes.`);

// Generate the sitemap from the same route list, so adding a product cannot
// leave the sitemap stale. BUILD_DATE lets CI pin lastmod; defaults to today.
const lastmod = (process.env.BUILD_DATE || new Date().toISOString()).slice(0, 10);
const ORIGIN = 'https://brarscribbles.com';

const priorityFor = (url) => {
  if (url === '/') return '1.0';
  if (url === '/shop') return '0.9';
  if (url.startsWith('/product/')) return '0.8';
  if (['/privacy', '/terms', '/shipping', '/refund', '/disclaimer'].includes(url)) return '0.3';
  return '0.7';
};

const changefreqFor = (url) => {
  if (url === '/' || url === '/shop' || url === '/blog') return 'weekly';
  if (['/privacy', '/terms', '/shipping', '/refund', '/disclaimer'].includes(url)) return 'yearly';
  return 'monthly';
};

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routesToPrerender
  .map(
    (url) => `  <url>
    <loc>${ORIGIN}${url === '/' ? '/' : url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreqFor(url)}</changefreq>
    <priority>${priorityFor(url)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

writeFileSync(resolve(distDir, 'sitemap.xml'), sitemap);
console.log(`Wrote sitemap.xml with ${routesToPrerender.length} URLs (lastmod ${lastmod}).`);
