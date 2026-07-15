import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  schema?: Record<string, unknown>;
  faqSchema?: Array<{ question: string; answer: string }>;
}

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogImage = 'https://brarscribbles.com/logo.png',
  ogType = 'website',
  schema,
  faqSchema,
}: SEOProps) {
  useEffect(() => {
    document.title = `${title} | Brar Scribbles`;

    const setMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);

    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:type', ogType, 'property');
    setMeta('og:image', ogImage, 'property');
    setMeta('og:site_name', 'Brar Scribbles', 'property');

    setMeta('twitter:card', 'summary_large_image', 'name');
    setMeta('twitter:title', title, 'name');
    setMeta('twitter:description', description, 'name');
    setMeta('twitter:image', ogImage, 'name');

    if (canonical) {
      let linkEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!linkEl) {
        linkEl = document.createElement('link');
        linkEl.setAttribute('rel', 'canonical');
        document.head.appendChild(linkEl);
      }
      linkEl.setAttribute('href', canonical);
    }

    // Inject JSON-LD schema
    const schemas: Record<string, unknown>[] = [];

    schemas.push(schema || {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Brar Scribbles',
      url: 'https://brarscribbles.com',
      logo: 'https://brarscribbles.com/logo.png',
      description: 'Brar Scribbles is an online store that celebrates science with creative study materials, science-inspired merchandise, and educational resources.',
      sameAs: [
        'https://www.facebook.com/brar.scribbles',
        'https://twitter.com/BrarScribbles',
        'https://www.youtube.com/channel/UCP7baQZYF2uL-s5-c8arukQ',
        'https://in.pinterest.com/brarscribbles',
        'https://www.instagram.com/brar_scribbles',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-84279-76607',
        contactType: 'customer service',
        email: 'brarscribbles@gmail.com',
        areaServed: 'IN',
        availableLanguage: ['English'],
      },
    });

    if (faqSchema && faqSchema.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqSchema.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      });
    }

    // GEO optimization - Article/BlogPosting schema for content pages
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Brar Scribbles',
      url: 'https://brarscribbles.com',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://brarscribbles.com/shop/?search={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    });

    let scriptEl = document.getElementById('jsonld-schema');
    if (!scriptEl) {
      scriptEl = document.createElement('script') as HTMLElement & { type: string; textContent: string };
      scriptEl.id = 'jsonld-schema';
      (scriptEl as HTMLScriptElement).type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);

    return () => {
      // Cleanup only the schema script we added
      const el = document.getElementById('jsonld-schema');
      if (el) el.remove();
    };
  }, [title, description, keywords, canonical, ogImage, ogType, schema, faqSchema]);

  return null;
}
