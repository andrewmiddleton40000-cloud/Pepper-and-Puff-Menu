import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Clock3, Copy, Instagram, Menu, Minus, Plus, ShoppingBag, Sparkles, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import logoPath from '@assets/pepper-puff-logo.png';
import markPath from '@assets/pepper-puff-logo-mark.png';
import samosaPath from '@assets/food/samosa.jpg';
import cakePath from '@assets/food/cake.jpg';
import pastriesPath from '@assets/food/pastries.jpg';
import './index.css';

const queryClient = new QueryClient();
const WHATSAPP = '2348066777994';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  tag?: string;
  serving?: string;
};

const smallChops: MenuItem[] = [
  { id: 'puff-puff', name: 'Puff Puff', description: 'Golden, airy bites with just the right touch of sweetness.', price: 2500, serving: 'Box of 20' },
  { id: 'spring-rolls', name: 'Spring Rolls', description: 'Crisp pastry parcels filled with our savoury vegetable mix.', price: 3500, serving: 'Box of 10' },
  { id: 'samosa', name: 'Samosa', description: 'Flaky triangles, filled generously with seasoned minced beef.', price: 3500, tag: 'Crowd favourite', serving: 'Box of 10' },
  { id: 'chicken-skewers', name: 'Chicken Skewers', description: 'Charred, peppery chicken bites with a smoky finish.', price: 5500, serving: 'Box of 10' },
  { id: 'small-chops-platter', name: 'Small Chops Platter', description: 'A proper spread of puff puff, spring rolls, samosa and chicken.', price: 18500, tag: 'For sharing', serving: 'Feeds 6–8' },
  { id: 'party-tray', name: 'Party Tray', description: 'The generous one: enough little bites to keep the room moving.', price: 32000, tag: 'Best for parties', serving: 'Feeds 12–15' },
];

const cakes: MenuItem[] = [
  { id: 'vanilla-cake', name: 'Classic Vanilla', description: 'Soft vanilla sponge, whipped buttercream and a clean finish.', price: 18000, serving: '6 inch' },
  { id: 'red-velvet', name: 'Red Velvet', description: 'Tender cocoa sponge with a velvet cream cheese frosting.', price: 22000, tag: 'Signature', serving: '6 inch' },
  { id: 'chocolate-cake', name: 'Chocolate Fudge', description: 'Deep chocolate layers, glossy ganache and no holding back.', price: 25000, serving: '6 inch' },
  { id: 'celebration-cake', name: 'Celebration Cake', description: 'A dressed-up centrepiece made to match your special day.', price: 38000, tag: 'Made to order', serving: '8 inch' },
  { id: 'cupcakes', name: 'Party Cupcakes', description: 'Fluffy little cakes, swirled and finished in your chosen colours.', price: 16000, serving: 'Box of 12' },
  { id: 'banana-bread', name: 'Banana Bread', description: 'Moist, warmly spiced and lovely with a cup of tea.', price: 9000, serving: 'Loaf' },
];

const pastries: MenuItem[] = [
  { id: 'meat-pie', name: 'Meat Pie', description: 'Buttery shortcrust packed with minced beef, potato and carrot.', price: 1200, tag: 'Always ready', serving: 'Each' },
  { id: 'chicken-pie', name: 'Chicken Pie', description: 'Flaky, golden pastry wrapped around tender peppered chicken.', price: 1500, serving: 'Each' },
  { id: 'sausage-roll', name: 'Sausage Roll', description: 'Seasoned sausage in a crisp, comforting pastry blanket.', price: 1000, serving: 'Each' },
  { id: 'doughnut', name: 'Sugar Doughnut', description: 'Pillowy, freshly fried and rolled in fine sugar.', price: 800, serving: 'Each' },
  { id: 'cinnamon-roll', name: 'Cinnamon Roll', description: 'Soft spirals with brown sugar, cinnamon and a light glaze.', price: 2500, serving: 'Each' },
  { id: 'breakfast-box', name: 'Breakfast Box', description: 'Two meat pies, two sausage rolls, doughnuts and a little joy.', price: 8500, tag: 'Office hero', serving: 'Box of 6' },
];

const formatNaira = (value: number) => `₦${value.toLocaleString('en-NG')}`;
const defaultWhatsAppUrl = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hello Pepper & Puff, I would like to ask about your menu.')}`;

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function MenuItemRow({ item, onAdd }: { item: MenuItem; onAdd: (item: MenuItem) => void }) {
  return (
    <article className="group relative flex gap-4 border-b border-[#5c2f15]/15 py-5 first:pt-1 last:border-0 sm:gap-6" data-testid={`card-menu-item-${item.id}`}>
      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#c45a20]/40 font-mono-brand text-[10px] text-[#a7461d] transition-colors group-hover:bg-[#c45a20] group-hover:text-[#fff6e8]">
        {String(item.name.charCodeAt(0)).slice(-2)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-display text-[1.35rem] leading-tight text-[#572514]">{item.name}</h3>
          {item.tag && <span className="font-mono-brand text-[9px] uppercase tracking-[.14em] text-[#75813d]">{item.tag}</span>}
        </div>
        <p className="mt-1 max-w-xl text-sm leading-relaxed text-[#6f5342]">{item.description}</p>
        <p className="mt-2 font-mono-brand text-[10px] uppercase tracking-[.13em] text-[#a18b78]">{item.serving}</p>
      </div>
      <div className="flex shrink-0 flex-col items-end justify-between gap-3">
        <span className="font-display text-lg text-[#a7461d]">{formatNaira(item.price)}</span>
        <button onClick={() => onAdd(item)} className="inline-flex items-center gap-1 rounded-full border border-[#c45a20]/40 px-3 py-1.5 font-mono-brand text-[10px] uppercase tracking-[.12em] text-[#a7461d] transition-all hover:bg-[#a7461d] hover:text-[#fff6e8] active:scale-95" data-testid={`button-add-${item.id}`}>
          <Plus size={12} strokeWidth={2.5} /> Add
        </button>
      </div>
    </article>
  );
}

function CategorySection({ id, eyebrow, title, note, items, accent, onAdd }: { id: string; eyebrow: string; title: string; note: string; items: MenuItem[]; accent: string; onAdd: (item: MenuItem) => void }) {
  return (
    <section id={id} className="reveal scroll-mt-24 px-5 py-16 sm:px-8 lg:py-24" data-testid={`section-${id}`}>
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <p className="font-mono-brand text-[10px] uppercase tracking-[.24em]" style={{ color: accent }}>{eyebrow}</p>
          <h2 className="mt-3 max-w-sm font-display text-5xl leading-[.94] text-[#572514] sm:text-6xl">{title}</h2>
          <p className="mt-5 max-w-xs text-sm leading-7 text-[#6f5342]">{note}</p>
          <div className="mt-8 hidden items-center gap-3 text-[#a7461d] lg:flex">
            <span className="h-px w-12 bg-[#a7461d]/40" />
            <span className="font-mono-brand text-[9px] uppercase tracking-[.16em]">Swipe, choose, share</span>
          </div>
        </div>
        <div className="rounded-[1.5rem] border border-[#5c2f15]/15 bg-[#fff6e8]/55 px-5 py-2 shadow-[0_12px_28px_rgba(84,40,18,.04)] sm:px-8">
          {items.map((item) => <MenuItemRow key={item.id} item={item} onAdd={onAdd} />)}
        </div>
      </div>
    </section>
  );
}

function QrCode() {
  const [menuUrl, setMenuUrl] = useState('');

  useEffect(() => {
    const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
    setMenuUrl(`${window.location.origin}${basePath}/menu`);
  }, []);

  const qrUrl = menuUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=10&data=${encodeURIComponent(menuUrl)}`
    : '';

  return (
    <div className="rounded-[1.5rem] border border-[#5c2f15]/15 bg-[#fff6e8] p-3 shadow-[0_12px_28px_rgba(84,40,18,.08)]">
      {qrUrl ? (
        <img
          src={qrUrl}
          alt="Scan to open the Pepper & Puff digital menu"
          className="block h-44 w-44 rounded-[.75rem] sm:h-52 sm:w-52"
        />
      ) : (
        <div className="flex h-44 w-44 items-center justify-center rounded-[.75rem] bg-[#f3d9ac] font-mono-brand text-[9px] uppercase tracking-[.12em] text-[#8b6d59] sm:h-52 sm:w-52">
          Loading menu link
        </div>
      )}
    </div>
  );
}

type FoodStory = {
  image: string;
  eyebrow: string;
  title: string;
  description: string;
};

const foodStories: FoodStory[] = [
  {
    image: samosaPath,
    eyebrow: 'Small chops',
    title: 'The first plate always disappears first.',
    description: 'Golden samosa, puff puff and party bites made for passing around.',
  },
  {
    image: cakePath,
    eyebrow: 'Celebration cakes',
    title: 'Make the moment a little sweeter.',
    description: 'Soft layers, generous frosting and a centrepiece worth gathering around.',
  },
  {
    image: pastriesPath,
    eyebrow: 'Fresh pastries',
    title: 'Something warm for the road.',
    description: 'Buttery bakes and golden pastries for office mornings and slow Saturdays.',
  },
];

function FoodCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStory = foodStories[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % foodStories.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  const move = (direction: number) => {
    setActiveIndex((current) => (current + direction + foodStories.length) % foodStories.length);
  };

  return (
    <div className="relative overflow-hidden rounded-[1.8rem] border border-[#5c2f15]/15 bg-[#f3d9ac] shadow-[0_24px_60px_rgba(84,40,18,.14)]" data-testid="carousel-food-stories">
      <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4]">
        <img
          key={activeStory.image}
          src={activeStory.image}
          alt={activeStory.title}
          className="h-full w-full object-cover transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#572514]/90 via-[#572514]/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-[#fff6e8] sm:p-8">
          <p className="font-mono-brand text-[10px] uppercase tracking-[.22em] text-[#f5d6a7]">{activeStory.eyebrow}</p>
          <h2 className="mt-3 max-w-md font-display text-4xl leading-[.95] sm:text-5xl">{activeStory.title}</h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[#f8e8d2]">{activeStory.description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 bg-[#fff6e8] px-5 py-4">
        <div className="flex gap-1.5" aria-label="Food photo slides">
          {foodStories.map((story, index) => (
            <button
              key={story.eyebrow}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all ${index === activeIndex ? 'w-8 bg-[#a7461d]' : 'w-3 bg-[#d7b995]'}`}
              aria-label={`Show ${story.eyebrow} slide`}
              aria-current={index === activeIndex}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => move(-1)} className="rounded-full border border-[#5c2f15]/20 p-2 text-[#572514] transition-colors hover:bg-[#f3d9ac]" aria-label="Previous food photo">
            <ChevronLeft size={16} />
          </button>
          <button onClick={() => move(1)} className="rounded-full border border-[#5c2f15]/20 p-2 text-[#572514] transition-colors hover:bg-[#f3d9ac]" aria-label="Next food photo">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Landing() {
  useReveal();

  return (
    <main id="top" className="menu-paper min-h-[100dvh] text-[#572514]">
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <a href="/" className="flex items-center gap-3" data-testid="link-home">
          <img src={markPath} alt="Pepper & Puff mark" className="h-11 w-11 rounded-full object-cover shadow-sm" />
          <span className="hidden font-mono-brand text-[10px] uppercase tracking-[.17em] text-[#6f5342] sm:block">Flavours that feel like home</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          <a href="#story" className="font-mono-brand text-[10px] uppercase tracking-[.16em] text-[#6f5342] hover:text-[#a7461d]">Our story</a>
          <a href="#favourites" className="font-mono-brand text-[10px] uppercase tracking-[.16em] text-[#6f5342] hover:text-[#a7461d]">Favourites</a>
          <a href="/menu" className="flex items-center gap-2 rounded-full bg-[#a7461d] px-4 py-2.5 font-mono-brand text-[10px] uppercase tracking-[.13em] text-[#fff6e8]" data-testid="link-menu-nav">
            View menu <ArrowUpRight size={14} />
          </a>
        </nav>
        <a href="/menu" className="rounded-full border border-[#5c2f15]/20 p-2.5 md:hidden" aria-label="Open menu" data-testid="link-menu-mobile">
          <Menu size={18} />
        </a>
      </header>

      <section className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-12 sm:px-8 sm:pb-28 lg:grid-cols-[.9fr_1.1fr] lg:gap-20 lg:pt-20">
        <div className="hero-orb -left-20 top-20 h-60 w-60 bg-[#e9bd72]/25" />
        <div className="relative z-[1] reveal">
          <div className="mb-7 flex items-center gap-3">
            <span className="h-px w-8 bg-[#a7461d]" />
            <span className="font-mono-brand text-[10px] uppercase tracking-[.24em] text-[#a7461d]">Nigerian home-style food & bakes</span>
          </div>
          <h1 className="max-w-2xl font-display text-[4.4rem] leading-[.84] tracking-[-.045em] text-[#572514] sm:text-[6.8rem] lg:text-[8.2rem]">
            Made for<br /><em className="text-[#b4402b]">your people.</em>
          </h1>
          <p className="mt-8 max-w-md text-base leading-7 text-[#6f5342] sm:text-lg">
            Small chops, celebration cakes and warm pastries for the table, the office, and every “just one more” moment.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="/menu" className="inline-flex items-center gap-3 rounded-full bg-[#a7461d] px-5 py-3.5 font-mono-brand text-[10px] uppercase tracking-[.14em] text-[#fff6e8] transition-transform hover:-translate-y-1" data-testid="link-browse-menu">
              Explore the menu <ChevronRight size={15} />
            </a>
            <a href={defaultWhatsAppUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#a7461d]/40 px-5 py-3.5 font-mono-brand text-[10px] uppercase tracking-[.14em] text-[#a7461d] transition-colors hover:bg-[#a7461d]/10" data-testid="link-whatsapp-hero">
              WhatsApp us <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="mt-8 flex items-center gap-3 text-[#8b6d59]">
            <span className="font-mono-brand text-[10px] uppercase tracking-[.18em]">Made fresh in Nigeria</span>
            <span className="text-[#e68a32]">•</span>
            <span className="font-mono-brand text-[10px] uppercase tracking-[.18em]">Order with love</span>
          </div>
        </div>
        <div className="reveal delay-2 relative mx-auto w-full max-w-[34rem]">
          <p className="mb-3 font-mono-brand text-[10px] uppercase tracking-[.22em] text-[#a7461d]">On the tray · small chops · cakes · pastries</p>
          <FoodCarousel />
        </div>
      </section>

      <section className="border-y border-[#5c2f15]/15 bg-[#572514] px-5 py-5 text-[#fff6e8] sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <p className="font-display text-xl">For the first bite, the last bite, and everything in between.</p>
          <div className="flex flex-wrap gap-x-7 gap-y-2 font-mono-brand text-[9px] uppercase tracking-[.18em] text-[#f5d6a7]">
            <span>Small chops</span><span className="text-[#e68a32]">•</span><span>Celebration cakes</span><span className="text-[#e68a32]">•</span><span>Fresh pastries</span>
          </div>
        </div>
      </section>

      <section id="story" className="reveal px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_.85fr] lg:gap-20">
          <div>
            <p className="font-mono-brand text-[10px] uppercase tracking-[.23em] text-[#75813d]">A little taste of home</p>
            <h2 className="mt-4 max-w-2xl font-display text-5xl leading-[.94] text-[#572514] sm:text-7xl">The kind of food that brings people closer.</h2>
          </div>
          <div className="border-l border-[#5c2f15]/20 pl-6 sm:pl-8">
            <p className="text-base leading-8 text-[#6f5342]">Pepper & Puff is here for the full table: the party tray at a naming ceremony, the cake carried into the office, the meat pie that makes a quick afternoon feel cared for.</p>
            <a href="/menu" className="mt-7 inline-flex items-center gap-2 font-mono-brand text-[10px] uppercase tracking-[.16em] text-[#a7461d] hover:text-[#572514]">See what is cooking <ArrowUpRight size={14} /></a>
          </div>
        </div>
      </section>

      <section id="favourites" className="reveal bg-[#f3d9ac]/50 px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {[
            { image: samosaPath, label: 'Small chops', title: 'For sharing', href: '/menu#small-chops' },
            { image: cakePath, label: 'Cakes', title: 'For marking the moment', href: '/menu#cakes' },
            { image: pastriesPath, label: 'Pastries', title: 'For the road', href: '/menu#pastries' },
          ].map((card) => (
            <a key={card.label} href={card.href} className="group overflow-hidden rounded-[1.35rem] bg-[#fff6e8] shadow-[0_12px_28px_rgba(84,40,18,.06)]">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={card.image} alt={card.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="flex items-center justify-between p-5">
                <div><p className="font-mono-brand text-[10px] uppercase tracking-[.18em] text-[#75813d]">{card.label}</p><h3 className="mt-2 font-display text-2xl text-[#572514]">{card.title}</h3></div>
                <ArrowUpRight size={18} className="text-[#a7461d]" />
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="reveal px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 rounded-[1.6rem] bg-[#e8a13e] px-6 py-10 sm:px-12 sm:py-14 md:flex-row md:items-center">
          <div>
            <p className="font-mono-brand text-[10px] uppercase tracking-[.22em] text-[#572514]/70">For the office · family · just because</p>
            <h2 className="mt-4 max-w-2xl font-display text-5xl leading-[.94] text-[#572514] sm:text-6xl">Bring something good to the table.</h2>
          </div>
          <a href="/menu" className="inline-flex shrink-0 items-center gap-3 rounded-full bg-[#572514] px-5 py-3.5 font-mono-brand text-[10px] uppercase tracking-[.14em] text-[#fff6e8] transition-transform hover:-translate-y-1">View the menu <ArrowUpRight size={15} /></a>
        </div>
      </section>

      <footer className="border-t border-[#5c2f15]/15 bg-[#f3d9ac]/40 px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div className="flex items-center gap-4">
            <img src={markPath} alt="Pepper & Puff" className="h-16 w-16 rounded-full object-cover" />
            <div>
              <p className="font-display text-2xl text-[#572514]">Pepper & Puff</p>
              <p className="mt-1 font-mono-brand text-[9px] uppercase tracking-[.18em] text-[#8b6d59]">Flavours that feel like home</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-sm text-[#6f5342] sm:items-end">
            <a href="tel:08066777994" className="font-mono-brand text-xs text-[#572514] hover:text-[#a7461d]">08066777994</a>
            <a href="https://instagram.com/pepperandpuff" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-[#a7461d]"><Instagram size={15} /> @pepperandpuff</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function MenuPage() {
  const [order, setOrder] = useState<Record<string, { item: MenuItem; quantity: number }>>({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  useReveal();

  const addItem = (item: MenuItem) => {
    setOrder((current) => ({ ...current, [item.id]: { item, quantity: (current[item.id]?.quantity ?? 0) + 1 } }));
    setDrawerOpen(true);
  };
  const changeQuantity = (id: string, delta: number) => {
    setOrder((current) => {
      const next = { ...current };
      const line = next[id];
      if (!line) return current;
      if (line.quantity + delta <= 0) delete next[id];
      else next[id] = { ...line, quantity: line.quantity + delta };
      return next;
    });
  };
  const orderLines = Object.values(order);
  const orderCount = orderLines.reduce((sum, line) => sum + line.quantity, 0);
  const orderTotal = orderLines.reduce((sum, line) => sum + line.item.price * line.quantity, 0);
  const message = orderLines.length
    ? `Hello Pepper & Puff, I would like to order:\n${orderLines.map((line) => `• ${line.quantity} x ${line.item.name}`).join('\n')}\nEstimated total: ${formatNaira(orderTotal)}`
    : 'Hello Pepper & Puff, I would like to place an order.';
  const whatsappUrl = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;

  const copyLink = async () => {
    await navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main id="top" className="menu-paper min-h-[100dvh] text-[#572514]">
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <a href="/" className="flex items-center gap-3" data-testid="link-home">
          <img src={markPath} alt="Pepper & Puff mark" className="h-11 w-11 rounded-full object-cover shadow-sm" />
          <span className="hidden font-mono-brand text-[10px] uppercase tracking-[.17em] text-[#6f5342] sm:block">Digital menu · est. with love</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          <a href="/menu#small-chops" className="font-mono-brand text-[10px] uppercase tracking-[.16em] text-[#6f5342] hover:text-[#a7461d]" data-testid="link-small-chops">Small chops</a>
          <a href="/menu#cakes" className="font-mono-brand text-[10px] uppercase tracking-[.16em] text-[#6f5342] hover:text-[#a7461d]" data-testid="link-cakes">Cakes</a>
          <a href="/menu#pastries" className="font-mono-brand text-[10px] uppercase tracking-[.16em] text-[#6f5342] hover:text-[#a7461d]" data-testid="link-pastries">Pastries</a>
          <button onClick={() => setDrawerOpen(true)} className="flex items-center gap-2 rounded-full bg-[#a7461d] px-4 py-2.5 font-mono-brand text-[10px] uppercase tracking-[.13em] text-[#fff6e8] transition-transform hover:-translate-y-0.5" data-testid="button-open-order">
            <ShoppingBag size={14} /> Order
          </button>
        </nav>
        <button onClick={() => setDrawerOpen(true)} className="rounded-full border border-[#5c2f15]/20 p-2.5 md:hidden" aria-label="Open order" data-testid="button-open-order-mobile"><Menu size={18} /></button>
      </header>

      <section id="top" className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-20 pt-8 sm:px-8 sm:pb-28 lg:grid-cols-[1.1fr_.9fr] lg:gap-16 lg:pt-16">
        <div className="hero-orb -left-20 top-20 h-60 w-60 bg-[#e9bd72]/25" />
        <div className="relative z-[1] reveal">
          <div className="mb-7 flex items-center gap-3">
            <span className="h-px w-8 bg-[#a7461d]" />
            <span className="font-mono-brand text-[10px] uppercase tracking-[.24em] text-[#a7461d]">The menu is open</span>
          </div>
          <h1 className="max-w-2xl font-display text-[4.4rem] leading-[.84] tracking-[-.045em] text-[#572514] sm:text-[6.8rem] lg:text-[8.5rem]">
            Flavours<br /><em className="text-[#b4402b]">that feel</em><br />like home.
          </h1>
          <p className="mt-8 max-w-md text-base leading-7 text-[#6f5342] sm:text-lg">
            Nigerian home-style food, bakes and small chops made for the table, the office, and every “just one more” moment.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#small-chops" className="inline-flex items-center gap-3 rounded-full bg-[#a7461d] px-5 py-3.5 font-mono-brand text-[10px] uppercase tracking-[.14em] text-[#fff6e8] transition-transform hover:-translate-y-1" data-testid="link-browse-menu">
              Browse the menu <ChevronRight size={15} />
            </a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#a7461d]/40 px-5 py-3.5 font-mono-brand text-[10px] uppercase tracking-[.14em] text-[#a7461d] transition-colors hover:bg-[#a7461d]/10" data-testid="link-whatsapp-hero">
              WhatsApp us <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
        <div className="reveal delay-2 relative mx-auto w-full max-w-[34rem]">
          <p className="mb-3 font-mono-brand text-[10px] uppercase tracking-[.22em] text-[#a7461d]">On the tray · small chops · cakes · pastries</p>
          <FoodCarousel />
        </div>
      </section>

      <section className="border-y border-[#5c2f15]/15 bg-[#572514] px-5 py-5 text-[#fff6e8] sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <p className="font-display text-xl">For the first bite, the last bite, and everything in between.</p>
          <div className="flex flex-wrap gap-x-7 gap-y-2 font-mono-brand text-[9px] uppercase tracking-[.18em] text-[#f5d6a7]">
            <span>Small chops</span><span className="text-[#e68a32]">•</span><span>Celebration cakes</span><span className="text-[#e68a32]">•</span><span>Fresh pastries</span>
          </div>
        </div>
      </section>

      <section className="reveal px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-end justify-between gap-5">
            <div>
              <p className="font-mono-brand text-[10px] uppercase tracking-[.23em] text-[#75813d]">A little taste of home</p>
              <h2 className="mt-3 font-display text-4xl text-[#572514] sm:text-5xl">Today’s table</h2>
            </div>
            <span className="hidden max-w-44 text-right text-xs leading-5 text-[#6f5342] sm:block">The things we would put out when you come around.</span>
          </div>
          <div className="grid gap-4 md:grid-cols-[1.35fr_1fr_1fr]">
            <a href="#small-chops" className="group relative min-h-64 overflow-hidden rounded-[1.35rem] bg-[#e8a13e] p-6 transition-transform hover:-translate-y-1" data-testid="card-highlight-platter">
              <div className="absolute -right-8 -top-10 h-40 w-40 rounded-full border-[20px] border-[#f4c66e]/70" />
              <p className="relative font-mono-brand text-[10px] uppercase tracking-[.18em] text-[#572514]/70">For sharing</p>
              <h3 className="relative mt-20 max-w-[12rem] font-display text-3xl leading-none text-[#572514]">The party platter</h3>
              <span className="relative mt-5 inline-flex items-center gap-2 font-mono-brand text-[10px] uppercase tracking-[.14em] text-[#572514]">See small chops <ArrowUpRight size={14} /></span>
            </a>
            <a href="#cakes" className="group min-h-64 rounded-[1.35rem] bg-[#b4402b] p-6 text-[#fff6e8] transition-transform hover:-translate-y-1" data-testid="card-highlight-cake">
              <p className="font-mono-brand text-[10px] uppercase tracking-[.18em] text-[#f5d6a7]">Sweet thing</p>
              <h3 className="mt-20 max-w-[10rem] font-display text-3xl leading-none">A cake for your people</h3>
              <span className="mt-5 inline-flex items-center gap-2 font-mono-brand text-[10px] uppercase tracking-[.14em] text-[#f5d6a7]">Explore cakes <ArrowUpRight size={14} /></span>
            </a>
            <a href="#pastries" className="group min-h-64 rounded-[1.35rem] border border-[#5c2f15]/20 bg-[#75813d] p-6 text-[#fff6e8] transition-transform hover:-translate-y-1" data-testid="card-highlight-pastry">
              <p className="font-mono-brand text-[10px] uppercase tracking-[.18em] text-[#e5e5bb]">Fresh from the oven</p>
              <h3 className="mt-20 max-w-[10rem] font-display text-3xl leading-none">Pastries for the road</h3>
              <span className="mt-5 inline-flex items-center gap-2 font-mono-brand text-[10px] uppercase tracking-[.14em] text-[#e5e5bb]">See pastries <ArrowUpRight size={14} /></span>
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 pb-5 sm:px-8">
        {[['small-chops', '01 · Small chops'], ['cakes', '02 · Cakes'], ['pastries', '03 · Pastries']].map(([id, label]) => (
          <a key={id} href={`#${id}`} className="shrink-0 rounded-full border border-[#5c2f15]/20 bg-[#fff6e8]/50 px-4 py-2 font-mono-brand text-[10px] uppercase tracking-[.14em] text-[#6f5342] transition-colors hover:border-[#a7461d] hover:text-[#a7461d]" data-testid={`link-category-${id}`}>{label}</a>
        ))}
      </div>

      <CategorySection id="small-chops" eyebrow="01 / Gather round" title="Small chops, big welcome." note="The tray arrives and somehow everyone is already standing around it. Order by the box or build a spread for the whole room." items={smallChops} accent="#a7461d" onAdd={addItem} />
      <div className="mx-auto max-w-6xl px-5 sm:px-8"><div className="fine-rule" /></div>
      <CategorySection id="cakes" eyebrow="02 / Mark the moment" title="A little extra sweetness." note="Birthday, promotion, naming ceremony or simply Saturday. Tell us the story and we will make the centrepiece." items={cakes} accent="#b4402b" onAdd={addItem} />
      <div className="mx-auto max-w-6xl px-5 sm:px-8"><div className="fine-rule" /></div>
      <CategorySection id="pastries" eyebrow="03 / From the oven" title="Pastries with a point of view." note="Buttery edges, generous fillings and the kind of golden finish that makes a quick snack feel like a proper break." items={pastries} accent="#75813d" onAdd={addItem} />

      <section className="reveal mx-5 my-14 overflow-hidden rounded-[1.6rem] bg-[#e8a13e] sm:mx-8 lg:my-24">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 py-10 sm:px-12 sm:py-14 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="font-mono-brand text-[10px] uppercase tracking-[.22em] text-[#572514]/70">Office spread · family gathering · just because</p>
            <h2 className="mt-4 max-w-xl font-display text-4xl leading-[.95] text-[#572514] sm:text-5xl">Got a room to feed?</h2>
            <p className="mt-4 max-w-lg text-sm leading-6 text-[#6c421f]">We do boxes, trays and celebration cakes for the moments that need more than one portion. Send a message and let’s make a plan.</p>
          </div>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-3 rounded-full bg-[#572514] px-5 py-3.5 font-mono-brand text-[10px] uppercase tracking-[.14em] text-[#fff6e8] transition-transform hover:-translate-y-1" data-testid="link-whatsapp-catering">Plan a spread <ArrowUpRight size={15} /></a>
        </div>
      </section>

      <section className="reveal border-t border-[#5c2f15]/15 px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <p className="font-mono-brand text-[10px] uppercase tracking-[.22em] text-[#a7461d]">Keep this menu close</p>
            <h2 className="mt-4 max-w-lg font-display text-5xl leading-[.94] text-[#572514] sm:text-6xl">Good food is better shared.</h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-[#6f5342]">Scan, save or send this menu to someone who needs a little taste of home. We are one WhatsApp away.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={copyLink} className="inline-flex items-center gap-2 rounded-full border border-[#5c2f15]/25 px-4 py-3 font-mono-brand text-[10px] uppercase tracking-[.14em] text-[#572514] hover:bg-[#572514]/5" data-testid="button-copy-menu-link">
                {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Link copied' : 'Copy menu link'}
              </button>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#75813d] px-4 py-3 font-mono-brand text-[10px] uppercase tracking-[.14em] text-[#fff6e8] hover:bg-[#647037]" data-testid="link-whatsapp-share">Send on WhatsApp <ArrowUpRight size={14} /></a>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <QrCode />
            <span className="font-mono-brand text-[9px] uppercase tracking-[.18em] text-[#8b6d59]">Point your camera here</span>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#5c2f15]/15 bg-[#f3d9ac]/40 px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div className="flex items-center gap-4">
            <img src={markPath} alt="Pepper & Puff" className="h-16 w-16 rounded-full object-cover" />
            <div>
              <p className="font-display text-2xl text-[#572514]">Pepper & Puff</p>
              <p className="mt-1 font-mono-brand text-[9px] uppercase tracking-[.18em] text-[#8b6d59]">Flavours that feel like home</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-sm text-[#6f5342] sm:items-end">
            <a href={`tel:08066777994`} className="font-mono-brand text-xs text-[#572514] hover:text-[#a7461d]" data-testid="link-phone">08066777994</a>
            <a href="https://instagram.com/pepperandpuff" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-[#a7461d]" data-testid="link-instagram"><Instagram size={15} /> @pepperandpuff</a>
            <span className="font-mono-brand text-[9px] uppercase tracking-[.13em] text-[#a18b78]">Nigerian home-style food & bakes</span>
          </div>
        </div>
      </footer>

      {orderCount > 0 && (
        <button onClick={() => setDrawerOpen(true)} className="fixed bottom-4 left-4 right-4 z-30 flex items-center justify-between rounded-full bg-[#572514] px-5 py-3.5 text-[#fff6e8] shadow-[0_10px_30px_rgba(84,40,18,.25)] md:hidden" data-testid="button-sticky-order">
          <span className="flex items-center gap-2 font-mono-brand text-[10px] uppercase tracking-[.14em]"><ShoppingBag size={16} /> {orderCount} {orderCount === 1 ? 'item' : 'items'}</span>
          <span className="font-display text-lg">{formatNaira(orderTotal)} <ChevronRight className="inline" size={16} /></span>
        </button>
      )}

      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-[#572514]/40" role="dialog" aria-modal="true" aria-label="Your order">
          <div className="flex h-full w-full max-w-md flex-col bg-[#fff6e8] p-5 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between border-b border-[#5c2f15]/15 pb-5">
              <div><p className="font-mono-brand text-[10px] uppercase tracking-[.2em] text-[#a7461d]">Your order</p><h2 className="mt-2 font-display text-4xl text-[#572514]">Let’s make it real.</h2></div>
              <button onClick={() => setDrawerOpen(false)} className="rounded-full border border-[#5c2f15]/20 p-2" aria-label="Close order" data-testid="button-close-order"><X size={18} /></button>
            </div>
            <div className="flex-1 overflow-y-auto py-5">
              {orderLines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="rounded-full bg-[#e8a13e]/25 p-5"><ShoppingBag size={28} className="text-[#a7461d]" /></div>
                  <h3 className="mt-5 font-display text-2xl">Your tray is waiting.</h3>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-[#6f5342]">Add a few favourites from the menu and we’ll put your order together on WhatsApp.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orderLines.map(({ item, quantity }) => (
                    <div key={item.id} className="flex items-center justify-between gap-3 border-b border-[#5c2f15]/10 pb-4" data-testid={`row-order-${item.id}`}>
                      <div><p className="font-display text-xl">{item.name}</p><p className="font-mono-brand text-[10px] text-[#a7461d]">{formatNaira(item.price)} each</p></div>
                      <div className="flex items-center gap-2 rounded-full border border-[#5c2f15]/20 p-1">
                        <button onClick={() => changeQuantity(item.id, -1)} className="rounded-full p-1 hover:bg-[#572514]/10" aria-label={`Remove one ${item.name}`} data-testid={`button-decrease-${item.id}`}><Minus size={13} /></button>
                        <span className="w-4 text-center font-mono-brand text-xs">{quantity}</span>
                        <button onClick={() => changeQuantity(item.id, 1)} className="rounded-full p-1 hover:bg-[#572514]/10" aria-label={`Add one ${item.name}`} data-testid={`button-increase-${item.id}`}><Plus size={13} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="border-t border-[#5c2f15]/15 pt-5">
              <div className="mb-4 flex items-center justify-between"><span className="font-mono-brand text-[10px] uppercase tracking-[.15em] text-[#8b6d59]">Estimated total</span><strong className="font-display text-2xl text-[#a7461d]">{formatNaira(orderTotal)}</strong></div>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className={`flex w-full items-center justify-center gap-2 rounded-full px-5 py-4 font-mono-brand text-[10px] uppercase tracking-[.16em] text-[#fff6e8] ${orderLines.length ? 'bg-[#75813d] hover:bg-[#647037]' : 'pointer-events-none bg-[#b7ad9e]'}`} data-testid="link-whatsapp-checkout">
                <Clock3 size={15} /> Continue on WhatsApp
              </a>
              <p className="mt-3 text-center text-[11px] leading-5 text-[#8b6d59]">We’ll confirm availability, delivery and final total with you.</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/menu" component={MenuPage} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;