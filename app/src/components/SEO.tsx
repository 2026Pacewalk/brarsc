import { SITE_NAME, SITE_ORIGIN } from '@/lib/site';

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

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_ORIGIN,
  logo: `${SITE_ORIGIN}/images/logo.png`,
  description:
    'Brar Scribbles is an online store that celebrates science with creative study materials, science-inspired merchandise, and educational resources.',
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
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_ORIGIN,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_ORIGIN}/shop?search={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

/**
 * Renders page metadata as real elements rather than writing to document in an
 * effect. React hoists title/meta/link to <head> on both client and server, so
 * this markup is present in the prerendered HTML — which is the only version
 * crawlers that do not execute JavaScript will ever see.
 */
export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogImage = `${SITE_ORIGIN}/images/logo.png`,
  ogType = 'website',
  schema,
  faqSchema,
}: SEOProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical ? `${SITE_ORIGIN}${canonical}` : undefined;

  const schemas: Record<string, unknown>[] = [schema ?? organizationSchema, websiteSchema];

  if (faqSchema && faqSchema.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqSchema.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    });
  }

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
    </>
  );
}
