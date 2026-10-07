import { useEffect } from 'react';

interface PageMeta {
  title: string;
  description?: string;
  canonicalPath?: string;
}

const SITE_ORIGIN = 'https://www.evolvtoday.com';

export function usePageMeta({ title, description, canonicalPath }: PageMeta) {
  useEffect(() => {
    document.title = title;

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);
    }

    if (canonicalPath) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', `${SITE_ORIGIN}${canonicalPath}`);
    }
  }, [title, description, canonicalPath]);
}

export default usePageMeta;