import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_URL } from '../data/founders';

const SEO = ({
  title = 'Akvora | Technology Solutions, AI Integration & Software Development',
  description = 'Akvora delivers modern technology solutions, full-stack development, AI integration, cloud deployment and technical education for businesses and professionals.',
  keywords = 'akvora, akvora technologies, akvora technology solutions, full-stack development, ai integration, cloud deployment, aravind k, karthik k',
  image = `${SITE_URL}/transpareny_logo.png`,
  url = '',
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  structuredData = null
}) => {
  const location = useLocation();

  useEffect(() => {
    const resolvedPath = url !== '' ? url : location.pathname;
    const canonicalUrl = `${SITE_URL}${resolvedPath === '/' ? '/' : resolvedPath}`;

    document.title = title;

    const setMeta = (selector, attr, value) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };

    setMeta('meta[name="title"]', 'content', title);
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[name="keywords"]', 'content', keywords);
    setMeta('meta[name="robots"]', 'content', robots);

    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:image"]', 'content', image);
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);

    setMeta('meta[property="twitter:title"]', 'content', title);
    setMeta('meta[property="twitter:description"]', 'content', description);
    setMeta('meta[property="twitter:image"]', 'content', image);
    setMeta('meta[property="twitter:url"]', 'content', canonicalUrl);

    setMeta('link[rel="canonical"]', 'href', canonicalUrl);

    if (structuredData) {
      const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
      existingScripts.forEach((script) => {
        if (script.textContent.includes('schema.org')) {
          script.remove();
        }
      });

      const items = Array.isArray(structuredData) ? structuredData : [structuredData];
      items.forEach((item) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(item);
        document.head.appendChild(script);
      });
    }
  }, [title, description, keywords, image, url, robots, location.pathname, structuredData]);

  return null;
};

export default SEO;
