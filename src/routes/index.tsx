import { createFileRoute } from '@tanstack/react-router';
import { HomePage } from '@/components/MaxwellSite';
export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Maxwell Rubber Industry — Automotive Rubber Parts Manufacturer' },
    { name: 'description', content: 'Maxwell Rubber Industry manufactures and exports heavy-duty automotive rubber parts, with a focus on quality, durability and reliable performance since 2000.' },
    { property: 'og:title', content: 'Maxwell Rubber Industry — Built to Endure' },
    { property: 'og:description', content: 'Heavy-duty automotive rubber components built for reliable, durable performance since 2000.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }, { property: 'og:url', content: '/' },
  ], links: [{ rel: 'canonical', href: '/' }] }),
  component: HomePage,
});
