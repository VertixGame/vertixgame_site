import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEO({
  title = 'Vertix - Plataforma de Gamificação que Transforma Tarefas em Conquistas',
  description = 'Aumente a produtividade em 40% com a plataforma de gamificação Vertix. Sistema de pontos, rankings, metas e recompensas inteligentes para equipes de alta performance.',
  keywords = 'gamificação, produtividade, gestão de equipes, sistema de pontos, gestão de tarefas, motivação de equipes, software de produtividade, gestão de metas, plataforma de gamificação, vertix',
  image = 'https://vertixgame.com/og-image.jpg',
  url = 'https://vertixgame.com',
  type = 'website',
}: SEOProps) {
  useEffect(() => {
    // Atualizar title
    document.title = title;

    // Atualizar ou criar meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Meta tags básicas
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('title', title);

    // Open Graph
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);

    // Twitter
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', image, true);
    updateMetaTag('twitter:card', 'summary_large_image', true);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }, [title, description, keywords, image, url, type]);

  return null;
}

