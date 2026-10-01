import { useEffect, useRef, useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { brand, clients, products, strengths, values, companyDescription, mission, vision } from '@/lib/maxwell-content';

const nav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' }, { label: 'Products', to: '/products' },
  { label: 'Why Us', to: '/why-us' }, { label: 'Clients', to: '/clients' },
  { label: 'Leadership', to: '/leadership' }, { label: 'Contact', to: '/contact' },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = useRouterState({ select: s => s.location.pathname });
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 12); onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll); }, []);
  useEffect(() => { if (!open) return; const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey); }, [open]);
  return <header className={`site-header ${scrolled ? 'site-header-scrolled' : ''}`}>
    <div className="site-header-inner container-wide">
      <Link to="/" className="brand-link" aria-label="Maxwell Rubber Industry home"><img src={brand.logo} alt="Maxwell Rubber Industry" width="154" height="38" /></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{nav.map(item => <Link key={item.to} to={item.to} activeProps={{ className: 'nav-active' }} activeOptions={{ exact: item.to === '/' }}>{item.label}</Link>)}</nav>
      <div className="desktop-cta"><Button asChild variant="brand" size="sm"><Link to="/contact" >Get in Touch <ArrowUpRight /></Link></Button></div>
      <Button variant="iconOutline" size="icon" className="mobile-menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
    </div>
    <nav id="mobile-navigation" className={`mobile-nav ${open ? 'mobile-nav-open' : ''}`} aria-label="Mobile navigation" inert={!open}>{nav.map((item, i) => <Link key={item.to} to={item.to} onClick={() => setOpen(false)}><span>0{i + 1}</span>{item.label}<ArrowUpRight size={17} /></Link>)}<Button asChild variant="brand" className="mobile-nav-cta"><Link to="/contact" onClick={() => setOpen(false)}>Get in Touch <ArrowUpRight /></Link></Button></nav>
  </header>;
}
export function Footer() {
  return <footer className="site-footer"><div className="container-wide footer-grid"><div><Link to="/" className="footer-brand"><img src={brand.logo} alt="Maxwell Rubber Industry" width="180" height="44" /></Link><p>Manufacturer and exporter of heavy-duty automotive rubber parts. Built on quality, consistency and long-term relationships since 2000.</p></div><div><span className="footer-label">Explore</span><Link to="/about">About</Link><Link to="/products">Products</Link><Link to="/why-us">Why Us</Link><Link to="/clients">Clients</Link></div><div><span className="footer-label">Company</span><Link to="/leadership">Leadership</Link><Link to="/contact" >Contact</Link></div><div className="footer-statement">BUILT TO<br />ENDURE<span className="accent-dot">.</span></div></div><div className="container-wide footer-bottom"><span>© {new Date().getFullYear()} Maxwell Rubber Industry</span><span>Automotive rubber components · Since 2000</span></div></footer>;
}
export function SectionHeading({ index, label, title, light = false }: { index: string; label: string; title?: string; light?: boolean }) {
  return <div className={`section-heading ${light ? 'section-heading-light' : ''}`}><div className="section-kicker"><span>{index} / {label}</span><span className="kicker-line" /></div>{title && <h2>{title}</h2>}</div>;
}
export function HeroProductSlider() {
  const slides = products.slice(0, 4) as [typeof products[number], ...typeof products[number][]];
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const touchStart = useRef<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const go = (next: number) => { setActive(current => { const target = (next + slides.length) % slides.length; if (current === target) return current; setPrevious(current); return target; }); };
  useEffect(() => { const query = window.matchMedia('(prefers-reduced-motion: reduce)'); const update = () => setReduced(query.matches); update(); query.addEventListener('change', update); return () => query.removeEventListener('change', update); }, []);
  useEffect(() => { if (paused || reduced) return; const interval = window.setInterval(() => setActive(current => { setPrevious(current); return (current + 1) % slides.length; }), 2800); return () => window.clearInterval(interval); }, [paused, reduced, slides.length]);
  useEffect(() => { if (previous === null) return; timer.current = setTimeout(() => setPrevious(null), reduced ? 150 : 820); return () => { if (timer.current) clearTimeout(timer.current); }; }, [previous, reduced, active]);
  useEffect(() => { const img = new Image(); img.src = (slides[(active + 1) % slides.length] ?? slides[0]).image; }, [active, slides]);
  return <div className="hero-showcase" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }} onTouchStart={e => { touchStart.current = e.touches[0]?.clientX ?? null; }} onTouchEnd={e => { if (touchStart.current === null) return; const end = e.changedTouches[0]?.clientX ?? touchStart.current; if (Math.abs(end - touchStart.current) > 45) go(active + (end < touchStart.current ? 1 : -1)); touchStart.current = null; }}>
    <div className="showcase-top"><span>MAXWELL / COMPONENT SERIES</span><span>FIG. {String(active + 1).padStart(2, '0')}</span></div>
    <div className="showcase-stage" role="region" aria-label="Featured product images" aria-roledescription="carousel" onKeyDown={e => { if (e.key === 'ArrowRight') go(active + 1); if (e.key === 'ArrowLeft') go(active - 1); }} tabIndex={0}>
      <div className="stage-grid" /><div className="stage-ring" /><span className="stage-cross stage-cross-tl">+</span><span className="stage-cross stage-cross-br">+</span>
      {slides.map((product, index) => <div key={product.id} className={`hero-image-wrap ${index === active ? 'hero-image-active' : index === previous ? 'hero-image-exit' : ''}`} aria-hidden={index !== active}><img src={product.image} alt={product.alt} width="320" height="320" fetchPriority={index === 0 ? 'high' : undefined} /></div>)}
      <div className="stage-secondary" aria-hidden="true"><img src={slides[(active + 1) % slides.length]?.image ?? slides[0].image} alt="" width="320" height="320" /><span>NEXT / {String((active + 1) % slides.length + 1).padStart(2, '0')}</span></div>
      <span className="stage-side-label">AUTOMOTIVE / RUBBER PARTS</span>
    </div>
    <div className="showcase-bottom"><div className="slide-index"><strong>{String(active + 1).padStart(2, '0')}</strong><span> / {String(slides.length).padStart(2, '0')}</span></div><div className="slide-progress" aria-hidden="true">{slides.map((product, i) => <span key={product.id} className={i === active ? 'progress-active' : ''} />)}</div><div className="slide-controls"><Button variant="iconOutline" size="icon" aria-label="Previous product" onClick={() => go(active - 1)}><ArrowLeft /></Button><Button variant="iconOutline" size="icon" aria-label="Next product" onClick={() => go(active + 1)}><ArrowRight /></Button></div></div>
  </div>;
}
export function ProductShowcase({ compact = false }: { compact?: boolean }) {
  const [selected, setSelected] = useState(0);
  const featured = products[selected] ?? products[0];
  return <div className={`product-showcase ${compact ? 'product-showcase-compact' : ''}`}><div className="product-feature"><div className="product-feature-top"><span>MAXWELL / PRODUCT ARCHIVE</span><span>{featured.id} — {String(products.length).padStart(2, '0')}</span></div><Link to="/products/$product" params={{ product: featured.slug }} className="product-feature-image"><img src={featured.image} alt={featured.alt} width="320" height="320" loading="lazy" /></Link><div className="product-feature-bottom"><div><span className="micro-label">CATALOGUE IMAGE {featured.id}</span><h3>Automotive components</h3></div><Button asChild variant="circle" size="icon" aria-label={`View catalogue image ${featured.id}`}><Link to="/products/$product" params={{ product: featured.slug }}><ArrowUpRight /></Link></Button></div></div><div className="product-side"><div className="product-side-intro"><span className="micro-label">EXPLORE THE RANGE</span><p>Heavy-duty automotive parts, presented directly from our company profile.</p></div><div className="product-previews">{products.slice(0, compact ? 6 : 8).map((product, i) => <Button key={product.id} variant="bare" className={`product-preview ${selected === i ? 'product-preview-active' : ''}`} onClick={() => setSelected(i)} aria-label={`Show catalogue image ${product.id}`} aria-pressed={selected === i}><img src={product.image} alt="" width="320" height="320" loading="lazy" /><span>{product.id}</span></Button>)}</div><Button asChild variant="textArrow"><Link to="/products">View All Products <ArrowUpRight /></Link></Button></div></div>;
}
export function ValueList() {
  const [active, setActive] = useState<number | null>(0);
  return <div className="value-list">{values.map((value, i) => <div className={`value-row ${active === i ? 'value-row-active' : ''}`} key={value.title}><Button variant="bare" className="value-trigger" aria-expanded={active === i} onClick={() => setActive(active === i ? null : i)}><span className="value-number">0{i + 1}</span><span className="value-title">{value.title}</span><span className="value-plus">{active === i ? '−' : '+'}</span></Button><div className="value-panel"><p>{value.description}</p></div></div>)}</div>;
}
export function ClientLogoWall() { return <div className="client-wall">{clients.map(client => <div className="client-logo" key={client.name}><img src={client.image} alt={client.name} loading="lazy" /></div>)}</div>; }
export function CtaBand() { return <section className="cta-band"><div className="container-wide cta-inner"><span className="micro-label">LET'S CONNECT / MAXWELL RUBBER</span><h2>BUILT FOR PERFORMANCE.<br /><em>READY FOR PARTNERSHIP.</em></h2><div className="cta-bottom"><p>Connect with Maxwell Rubber Industry for automotive rubber component requirements.</p><Button asChild variant="light" size="lg"><Link to="/contact" >Get in Touch <ArrowUpRight /></Link></Button></div></div></section>; }
export function PageIntro({ index, eyebrow, title, description }: { index: string; eyebrow: string; title: string; description?: string }) { return <section className="page-intro"><div className="container-wide"><div className="section-kicker"><span>{index} / {eyebrow}</span><span className="kicker-line" /></div><h1>{title}</h1>{description && <p>{description}</p>}</div></section>; }
export function HomePage() {
  return <main>
    <section className="hero"><div className="container-wide hero-grid"><div className="hero-copy"><div className="hero-eyebrow"><span className="eyebrow-mark" /> AUTOMOTIVE RUBBER COMPONENTS</div><h1>BUILT TO<br /><span>ENDURE.</span></h1><p>Heavy-duty automotive rubber components built for reliable, durable performance.</p><div className="hero-actions"><Button asChild variant="brand" size="lg"><Link to="/products">Explore Products <ArrowUpRight /></Link></Button><Button asChild variant="outlineBrand" size="lg"><Link to="/contact" >Contact Us <ArrowUpRight /></Link></Button></div><div className="hero-meta"><span>EST. 2000</span><span className="hero-meta-line" /><span>MANUFACTURING & EXPORT</span></div></div><HeroProductSlider /></div><div className="hero-bottom-line container-wide"><span>PRECISION IN EVERY COMPONENT</span><ArrowDown size={15} /></div></section>
    <section className="intro-section section-pad"><div className="container-wide"><SectionHeading index="01" label="THE COMPANY" /><div className="intro-grid"><div><span className="blue-eyebrow">SINCE 2000</span><h2>Made for the<br />demands of <em>the road.</em></h2></div><div className="intro-body"><p className="intro-lead">Manufacturing rubber components built for demanding automotive applications.</p><p>{companyDescription}</p><p>With a focus on quality, consistency, and customer satisfaction, we continue to build lasting relationships with clients in local and international markets.</p><Button asChild variant="textArrow"><Link to="/about">Discover Our Company <ArrowUpRight /></Link></Button></div></div></div></section>
    <section className="experience-band"><div className="container-wide experience-inner"><div><span className="micro-label">AN ENDURING COMMITMENT</span><div className="experience-big">25<span>+</span></div></div><div className="experience-copy"><h2>YEARS OF<br />INDUSTRY<br />EXPERIENCE<span className="accent-dot">.</span></h2><p>Since 2000, driven by quality, consistency and long-term customer relationships.</p></div></div></section>
    <section className="products-section section-pad"><div className="container-wide"><SectionHeading index="02" label="WHAT WE MAKE" title="OUR PRODUCTS" /><ProductShowcase compact /></div></section>
    <section className="approach-section section-pad"><div className="container-wide"><SectionHeading index="03" label="OUR APPROACH" title="MADE WITH INTENT." /><div className="approach-intro"><p>Our commitment to quality, consistency and continuous improvement informs the way we manufacture and serve our customers.</p></div><div className="process-line">{['Materials', 'Manufacturing', 'Quality', 'Consistency', 'Delivery'].map((step, i) => <div key={step} className="process-step"><span>0{i + 1}</span><h3>{step}</h3></div>)}</div></div></section>
    <section className="strength-section section-pad"><div className="container-wide"><SectionHeading index="04" label="OUR STRENGTHS" title="WHY CHOOSE US" light /><div className="strength-list">{strengths.map((item, i) => <div className="strength-row" key={item.title}><span>0{i + 1}</span><h3>{item.title}</h3><p>{item.description}</p><ArrowUpRight size={19} /></div>)}</div><Button asChild variant="lightOutline"><Link to="/why-us">More About Our Approach <ArrowUpRight /></Link></Button></div></section>
    <section className="values-section section-pad"><div className="container-wide values-grid"><div><SectionHeading index="05" label="WHAT DRIVES US" title="OUR CORE VALUES" /><p>Our core values guide the way we work, serve our customers, and grow as a company.</p></div><ValueList /></div></section>
    <section className="leadership-preview section-pad"><div className="container-wide"><SectionHeading index="06" label="LEADERSHIP" /><div className="leadership-grid"><div className="portrait-frame"><img src={brand.portrait} alt="Mian Faizan Aslam, CEO of Maxwell Rubber Industry" loading="lazy" width="888" height="1243" /></div><div className="leadership-copy"><span className="blue-eyebrow">OUR LEADERSHIP</span><h2>Led with<br /><em>purpose.</em></h2><div className="leader-name">MIAN FAIZAN ASLAM</div><p className="leader-role">CEO — Maxwell Rubber Industry<br />Chairman — MD Group</p><p>His leadership focuses on maintaining high standards, building lasting business relationships, and expanding the company’s presence in local and international markets.</p><Button asChild variant="textArrow"><Link to="/leadership">Meet Our Leadership <ArrowUpRight /></Link></Button></div></div></div></section>
    <section className="vision-section section-pad"><div className="container-wide"><SectionHeading index="07" label="OUR DIRECTION" /><div className="vision-grid"><div><span className="micro-label">01 / OUR VISION</span><h2>A trusted name<br />around the world.</h2><p>{vision}</p></div><div><span className="micro-label">02 / OUR MISSION</span><h2>Performance with<br />purpose.</h2><p>{mission}</p></div></div></div></section>
    <section className="clients-section section-pad"><div className="container-wide"><SectionHeading index="08" label="WORKING RELATIONSHIPS" title="OUR VALUED CLIENTS" /><ClientLogoWall /><div className="section-end-link"><Button asChild variant="textArrow"><Link to="/clients">View Our Clients <ArrowUpRight /></Link></Button></div></div></section>
    <CtaBand />
  </main>;
}
