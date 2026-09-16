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
import jollofPath from '@assets/food/jollof.jpg';
import samosa480Path from '@assets/food/responsive/samosa-480.webp';
import samosa768Path from '@assets/food/responsive/samosa-768.webp';
import samosa1200Path from '@assets/food/responsive/samosa-1200.webp';
import cake480Path from '@assets/food/responsive/cake-480.webp';
import cake768Path from '@assets/food/responsive/cake-768.webp';
import cake1200Path from '@assets/food/responsive/cake-1200.webp';
import pastries480Path from '@assets/food/responsive/pastries-480.webp';
import pastries768Path from '@assets/food/responsive/pastries-768.webp';
import pastries1200Path from '@assets/food/responsive/pastries-1200.webp';
import jollof480Path from '@assets/food/responsive/jollof-480.webp';
import jollof768Path from '@assets/food/responsive/jollof-768.webp';
import jollof1200Path from '@assets/food/responsive/jollof-1200.webp';
import partyGrillPlatterPath from '@assets/food/carousel/party-grill-platter.jpg';
import partyGrillPlatter480Path from '@assets/food/carousel/responsive/party-grill-platter-480.webp';
import partyGrillPlatter768Path from '@assets/food/carousel/responsive/party-grill-platter-768.webp';
import partyGrillPlatter1200Path from '@assets/food/carousel/responsive/party-grill-platter-1200.webp';
import classicSmallChopsPath from '@assets/food/carousel/classic-small-chops.jpg';
import classicSmallChops480Path from '@assets/food/carousel/responsive/classic-small-chops-480.webp';
import classicSmallChops768Path from '@assets/food/carousel/responsive/classic-small-chops-768.webp';
import classicSmallChops1200Path from '@assets/food/carousel/responsive/classic-small-chops-1200.webp';
import pepperedSmallChopsPath from '@assets/food/carousel/peppered-small-chops.jpg';
import pepperedSmallChops480Path from '@assets/food/carousel/responsive/peppered-small-chops-480.webp';
import pepperedSmallChops768Path from '@assets/food/carousel/responsive/peppered-small-chops-768.webp';
import pepperedSmallChops1200Path from '@assets/food/carousel/responsive/peppered-small-chops-1200.webp';
import celebrationFeastPath from '@assets/food/carousel/celebration-feast.jpg';
import celebrationFeast480Path from '@assets/food/carousel/responsive/celebration-feast-480.webp';
import celebrationFeast768Path from '@assets/food/carousel/responsive/celebration-feast-768.webp';
import celebrationFeast1200Path from '@assets/food/carousel/responsive/celebration-feast-1200.webp';
import strawberryCakePath from '@assets/food/carousel/strawberry-chocolate-cake.jpg';
import strawberryCake480Path from '@assets/food/carousel/responsive/strawberry-chocolate-cake-480.webp';
import strawberryCake768Path from '@assets/food/carousel/responsive/strawberry-chocolate-cake-768.webp';
import strawberryCake1200Path from '@assets/food/carousel/responsive/strawberry-chocolate-cake-1200.webp';
import './index.css';

const queryClient = new QueryClient();
const WHATSAPP = '2348066777994';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  priceLabel?: string;
  tag?: string;
  serving?: string;
};

const platters: MenuItem[] = [
  { id: 'solo-platter', name: 'Solo Platter', description: '5 Samosa\n5 Spring Rolls\n20 Puff Puff\n15 Mosa\n5 Peppered Beef', price: 11000, serving: 'A little bit of everything' },
  { id: 'jolly-platter', name: 'Jolly Platter', description: '5 Samosa\n5 Spring Rolls\n20 Puff Puff\n20 Mosa\n5 Grilled Chicken\n5 Peppered Meat\n5 Peppered Gizzards', price: 15000, serving: 'Made for sharing' },
  { id: 'classic-platter', name: 'Classic Platter', description: '5 Samosa\n5 Spring Rolls\n20 Puff Puff\n20 Mosa\n5 Corn Dogs\n5 Grilled Chicken\n5 Peppered Meat\n5 Peppered Gizzards', price: 20000, tag: 'Best seller', serving: 'The full spread' },
  { id: 'delight-platter', name: 'Delight Platter', description: '5 Samosa\n5 Spring Rolls\n3 Corn Dogs\n30 Puff Puff\n20 Mosa\n5 Grilled Turkey', price: 30000, tag: 'For celebrations', serving: 'A generous table' },
];

const mealPackages: MenuItem[] = [
  { id: 'breakfast-platter', name: 'Breakfast', description: 'Pancakes / Waffles\nSandwich (Egg Mayo, Chicken, Turkey, Vegetable)\nJuice\nFruit\nWater\n2 Chicken', price: 25000, serving: 'A proper breakfast spread' },
  { id: 'lunch-package', name: 'Lunch', description: 'Jollof Rice / Fried Rice\nSalad / Coleslaw\nChicken / Beef / Fish / Turkey\nSmall Chops (5 Samosa / 5 Spring Rolls / 20 Puff Puff)\nJuice\nWater\nFruit', price: 35000, priceLabel: '₦35,000–₦40,000', serving: 'Choice of protein' },
  { id: 'lunch-package-two', name: 'Lunch 2', description: 'Grilled Chicken / Fish\nChips (Yam or Sweet Potato)\nSalad\nWine\nWater\nFruit', price: 30000, priceLabel: '₦30,000–₦35,000', serving: 'Grilled and generous' },
  { id: 'executive-breakfast-platter', name: 'Executive Breakfast Platter', description: 'Sausage / Doughnut / Cupcake\nSmall Chops / Meat Pie\nChicken\nTea Condiments / Coffee\nWater', price: 6000, tag: 'MOQ: 15', serving: 'Minimum order: 15' },
  { id: 'executive-lunch-platter', name: 'Executive Lunch Platter', description: 'Jollof Rice / Fried Rice\nSalad\nChicken / Beef / Fish\nWater\nSoft Drink\nFruit', price: 9000, tag: 'MOQ: 15', serving: 'Minimum order: 15' },
  { id: 'birthday-regular', name: 'Birthday Regular', description: '6-inch Cake, 1 Layer\nSmall Chops (5 Samosa, 5 Spring Rolls, 20 Puff Puff, 3 Chicken)\nJuice\nFruit\nBiscuits\nWater', price: 35000, tag: 'Birthday', serving: 'Ready to celebrate' },
];

const extras: MenuItem[] = [
  { id: 'rice-and-chicken', name: 'Jollof Rice / Fried Rice and Chicken', description: '', price: 5000, serving: 'Per serving' },
  { id: 'extra-meat-pie', name: 'Meat Pie', description: '', price: 1500, serving: 'Each' },
  { id: 'extra-chicken-pie', name: 'Chicken Pie', description: '', price: 1800, serving: 'Each' },
  { id: 'full-chicken-lap', name: 'Chicken Lap, Full', description: '', price: 3000, serving: 'Each' },
  { id: 'half-chicken-lap', name: 'Chicken Lap, Half', description: '', price: 1500, serving: 'Each' },
  { id: 'turkey-wings', name: 'Turkey Wings', description: '', price: 5000, serving: 'Each' },
  { id: 'extra-beef', name: 'Beef', description: '', price: 1500, serving: 'Serving' },
  { id: 'plantain', name: 'Plantain', description: '', price: 2000, serving: 'Serving' },
  { id: 'fish-mini', name: 'Fish Mini', description: '', price: 4000, serving: 'Each' },
  { id: 'extra-sausage', name: 'Sausage', description: '', price: 1200, serving: 'Each' },
  { id: 'extra-cupcake', name: 'Cupcake', description: '', price: 1500, serving: 'Each' },
  { id: 'extra-doughnut', name: 'Doughnut', description: '', price: 1200, serving: 'Each' },
  { id: 'extra-juice', name: 'Juice', description: '', price: 0, priceLabel: 'Ask us', serving: 'Price on request' },
  { id: 'extra-wine', name: 'Wine', description: '', price: 0, priceLabel: 'Ask us', serving: 'Price on request' },
  { id: 'extra-fruit', name: 'Fruit', description: '', price: 0, priceLabel: 'Ask us', serving: 'Price on request' },
  { id: 'extra-chocolate', name: 'Chocolate', description: '', price: 0, priceLabel: 'Ask us', serving: 'Price on request' },
];

const pepperPackages: MenuItem[] = [
  { id: 'pepper-package', name: 'Pepper Package', description: 'Peppered Puff Puff — 30 pcs', price: 6000, tag: 'Our Pepper Package', serving: '30 pieces' },
  { id: 'pepper-petite', name: 'Petite', description: '1 Samosa\n1 Spring Roll\n4 Puff Puff\n1 Beef', price: 2000, serving: 'A petite bite box' },
  { id: 'pepper-basic', name: 'Basic', description: '1 Samosa\n1 Spring Roll\n4 Puff Puff\n3 Mosa\n1 Chicken', price: 3000, serving: 'A simple crowd-pleaser' },
  { id: 'pepper-classic', name: 'Classic', description: '1 Samosa\n1 Spring Roll\n4 Puff Puff\n3 Mosa\n1 Gizzard / Beef\n1 Chicken', price: 3500, serving: 'The classic mix' },
  { id: 'pepper-delight', name: 'Delight', description: '1 Samosa\n1 Spring Roll\n1 Corn Dog\n5 Puff Puff\n4 Mosa\n1 Gizzard\n1 Beef\n1 Chicken', price: 5000, serving: 'The full Pepper mix' },
];

const formatNaira = (value: number) => `₦${value.toLocaleString('en-NG')}`;
const displayPrice = (item: MenuItem) => item.priceLabel ?? formatNaira(item.price);
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
    <article className="menu-item-card group relative flex min-w-0 flex-col overflow-hidden rounded-[1.65rem] border border-[#bb6a2d]/25 bg-[#fffaf0] p-5 shadow-[0_10px_28px_rgba(83,42,17,.07)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-[#d76720]/55 hover:shadow-[0_18px_38px_rgba(83,42,17,.13)] sm:p-6" data-testid={`card-menu-item-${item.id}`}>
      <div className="absolute -right-9 -top-10 h-24 w-24 rounded-full border-[18px] border-[#efb25e]/15 transition-transform duration-500 group-hover:scale-110" aria-hidden="true" />
      <div className="relative flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0 pt-1">
          {item.tag && <span className="mb-3 inline-flex rounded-full bg-[#5b2c18] px-3 py-1 font-mono-brand text-[8px] uppercase tracking-[.14em] text-[#fff4df]">{item.tag}</span>}
          <h3 className="break-words font-display text-[1.55rem] leading-[1.05] text-[#492313] sm:text-[1.7rem]">{item.name}</h3>
        </div>
        <span className="relative z-[1] max-w-[52%] shrink-0 rounded-bl-[1.15rem] rounded-br-md rounded-tl-md rounded-tr-[1.15rem] bg-[#dc651d] px-3 py-2 text-center font-display text-lg leading-none text-[#fffaf0] shadow-[0_4px_0_#6a3218] sm:px-4 sm:text-xl">{displayPrice(item)}</span>
      </div>
      {item.description && <p className="relative mt-5 flex-1 whitespace-pre-line text-[13px] leading-6 text-[#6f5342]">{item.description}</p>}
      {!item.description && <div className="min-h-5 flex-1" />}
      <div className="relative mt-6 flex items-end justify-between gap-3 border-t border-dashed border-[#bb6a2d]/25 pt-4">
        <p className="min-w-0 font-mono-brand text-[9px] uppercase tracking-[.11em] text-[#8c6b55]">{item.serving}</p>
        <button onClick={() => onAdd(item)} className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#5b2c18] px-4 py-2.5 font-mono-brand text-[9px] uppercase tracking-[.12em] text-[#fff6e8] transition-[transform,background-color] hover:bg-[#d45e1c] active:scale-95" data-testid={`button-add-${item.id}`}>
          <Plus size={12} strokeWidth={2.5} /> Add
        </button>
      </div>
    </article>
  );
}

function CategorySection({ id, eyebrow, title, note, items, accent, image, imageAlt, imagePosition, onAdd }: { id: string; eyebrow: string; title: string; note: string; items: MenuItem[]; accent: string; image: FoodImage; imageAlt: string; imagePosition: string; onAdd: (item: MenuItem) => void }) {
  return (
    <section id={id} className="reveal relative scroll-mt-24 px-5 py-16 sm:px-8 lg:py-24" data-testid={`section-${id}`}>
      <div className="mx-auto max-w-7xl">
        <div className="relative mb-10 grid overflow-hidden rounded-[2rem] bg-[#542714] text-[#fff7e9] shadow-[0_18px_44px_rgba(68,31,13,.16)] md:grid-cols-[1.15fr_.85fr] md:items-stretch">
          <div className="relative z-[1] px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
            <p className="font-mono-brand text-[10px] uppercase tracking-[.24em] text-[#f1b15b]">{eyebrow}</p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl leading-[.95] sm:text-5xl lg:text-6xl">{title}</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#f6ddc3]">{note}</p>
            <div className="mt-7 h-1 w-20 rounded-full" style={{ backgroundColor: accent }} />
          </div>
          <div className="relative min-h-52 overflow-hidden md:min-h-full">
            <ResponsiveFoodImage image={image} alt={imageAlt} className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]" objectPosition={imagePosition} sizes="(max-width: 767px) calc(100vw - 2.5rem), 42vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#542714]/55 via-transparent to-transparent md:block" />
          </div>
        </div>
        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
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

type FoodImage = {
  fallback: string;
  mobileSrcSet: string;
  desktopSrcSet: string;
};

const foodImages = {
  samosa: {
    fallback: samosaPath,
    mobileSrcSet: `${samosa480Path} 480w, ${samosa768Path} 768w`,
    desktopSrcSet: `${samosa768Path} 768w, ${samosa1200Path} 1200w`,
  },
  cake: {
    fallback: cakePath,
    mobileSrcSet: `${cake480Path} 480w, ${cake768Path} 768w`,
    desktopSrcSet: `${cake768Path} 768w, ${cake1200Path} 1200w`,
  },
  pastries: {
    fallback: pastriesPath,
    mobileSrcSet: `${pastries480Path} 480w, ${pastries768Path} 768w`,
    desktopSrcSet: `${pastries768Path} 768w, ${pastries1200Path} 1200w`,
  },
  jollof: {
    fallback: jollofPath,
    mobileSrcSet: `${jollof480Path} 480w, ${jollof768Path} 768w`,
    desktopSrcSet: `${jollof768Path} 768w, ${jollof1200Path} 1200w`,
  },
} satisfies Record<string, FoodImage>;

const carouselImages = {
  partyGrill: {
    fallback: partyGrillPlatterPath,
    mobileSrcSet: `${partyGrillPlatter480Path} 480w, ${partyGrillPlatter768Path} 768w`,
    desktopSrcSet: `${partyGrillPlatter768Path} 768w, ${partyGrillPlatter1200Path} 1200w`,
  },
  classicSmallChops: {
    fallback: classicSmallChopsPath,
    mobileSrcSet: `${classicSmallChops480Path} 480w, ${classicSmallChops768Path} 768w`,
    desktopSrcSet: `${classicSmallChops768Path} 768w, ${classicSmallChops1200Path} 1200w`,
  },
  pepperedSmallChops: {
    fallback: pepperedSmallChopsPath,
    mobileSrcSet: `${pepperedSmallChops480Path} 480w, ${pepperedSmallChops768Path} 768w`,
    desktopSrcSet: `${pepperedSmallChops768Path} 768w, ${pepperedSmallChops1200Path} 1200w`,
  },
  celebrationFeast: {
    fallback: celebrationFeastPath,
    mobileSrcSet: `${celebrationFeast480Path} 480w, ${celebrationFeast768Path} 768w`,
    desktopSrcSet: `${celebrationFeast768Path} 768w, ${celebrationFeast1200Path} 1200w`,
  },
  strawberryCake: {
    fallback: strawberryCakePath,
    mobileSrcSet: `${strawberryCake480Path} 480w, ${strawberryCake768Path} 768w`,
    desktopSrcSet: `${strawberryCake768Path} 768w, ${strawberryCake1200Path} 1200w`,
  },
} satisfies Record<string, FoodImage>;

function ResponsiveFoodImage({
  image,
  alt,
  className,
  objectPosition,
  sizes,
  loading = 'lazy',
}: {
  image: FoodImage;
  alt: string;
  className: string;
  objectPosition: string;
  sizes: string;
  loading?: 'eager' | 'lazy';
}) {
  return (
    <picture className="block h-full w-full">
      <source media="(max-width: 639px)" type="image/webp" srcSet={image.mobileSrcSet} sizes={sizes} />
      <source type="image/webp" srcSet={image.desktopSrcSet} sizes={sizes} />
      <img
        src={image.fallback}
        alt={alt}
        loading={loading}
        decoding="async"
        className={className}
        style={{ objectPosition }}
      />
    </picture>
  );
}

type FoodStory = {
  image: FoodImage;
  alt: string;
  objectPosition: string;
  eyebrow: string;
  title: string;
  description: string;
};

const foodStories: FoodStory[] = [
  {
    image: carouselImages.partyGrill,
    alt: 'Party platter with glazed ribs, grilled chicken, wraps, fries, corn and skewers',
    objectPosition: 'center 50%',
    eyebrow: 'Party platters',
    title: 'A full spread, ready to share.',
    description: 'Grilled favourites, crisp sides and generous bites gathered onto one table-ready platter.',
  },
  {
    image: carouselImages.classicSmallChops,
    alt: 'Small chops platter with puff puff, samosas, spring rolls, grilled chicken and peppered meat',
    objectPosition: 'center 52%',
    eyebrow: 'Classic small chops',
    title: 'The first tray always disappears first.',
    description: 'Golden puff puff, crisp rolls and smoky grilled favourites made for passing around.',
  },
  {
    image: carouselImages.pepperedSmallChops,
    alt: 'Peppered small chops tray with spring rolls, samosas, puff puff, plantain and assorted meats',
    objectPosition: 'center 50%',
    eyebrow: 'Pepper package',
    title: 'Golden bites with a proper kick.',
    description: 'Crisp small chops, sweet plantain and peppered proteins packed for the whole crew.',
  },
  {
    image: carouselImages.celebrationFeast,
    alt: 'Celebration tray filled with jollof rice, fried rice, chicken, plantain, puff puff and pastries',
    objectPosition: 'center 48%',
    eyebrow: 'Flavours that feel like home',
    title: 'Come hungry. Leave happy.',
    description: 'Rice, grilled chicken, plantain and small chops brought together for a generous feast.',
  },
  {
    image: carouselImages.strawberryCake,
    alt: 'Strawberry celebration cake with chocolate drip, fresh berries and piped cream',
    objectPosition: 'center 45%',
    eyebrow: 'Celebration cakes',
    title: 'Make the moment a little sweeter.',
    description: 'Soft layers, fresh berries and a show-stopping finish worth gathering around.',
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
        <ResponsiveFoodImage
          image={activeStory.image}
          alt={activeStory.alt}
          className="h-full w-full object-cover transition-opacity duration-700"
          objectPosition={activeStory.objectPosition}
          sizes="(max-width: 639px) calc(100vw - 2.5rem), 544px"
          loading="eager"
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
            <span className="font-mono-brand text-[10px] uppercase tracking-[.24em] text-[#a7461d]">Home-style food & bakes</span>
          </div>
          <h1 className="max-w-2xl font-display text-[4.4rem] leading-[.84] tracking-[-.045em] text-[#572514] sm:text-[6.8rem] lg:text-[8.2rem]">
            Made for<br /><em className="text-[#b4402b]">your people.</em>
          </h1>
          <p className="mt-8 max-w-md text-base leading-7 text-[#6f5342] sm:text-lg">
            Platters, breakfast and lunch spreads, birthday packages and peppered bites for the table, the office, and every “just one more” moment.
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
          <p className="mb-3 font-mono-brand text-[10px] uppercase tracking-[.22em] text-[#a7461d]">On the tray · platters · breakfast · lunch</p>
          <FoodCarousel />
        </div>
      </section>

      <section className="border-y border-[#5c2f15]/15 bg-[#572514] px-5 py-5 text-[#fff6e8] sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <p className="font-display text-xl">For the first bite, the last bite, and everything in between.</p>
          <div className="flex flex-wrap gap-x-7 gap-y-2 font-mono-brand text-[9px] uppercase tracking-[.18em] text-[#f5d6a7]">
            <span>Platters</span><span className="text-[#e68a32]">•</span><span>Meal packages</span><span className="text-[#e68a32]">•</span><span>Pepper package</span>
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
            {
              image: foodImages.samosa,
              alt: 'Golden samosas arranged on a wooden tray',
              objectPosition: 'center 52%',
              label: 'Platters',
              title: 'For sharing',
              href: '/menu#platters',
            },
            {
              image: foodImages.cake,
              alt: 'Chocolate celebration cake with piped frosting and chocolate drizzle',
              objectPosition: 'center 54%',
              label: 'Meal packages',
              title: 'For marking the moment',
              href: '/menu#meal-plans',
            },
            {
              image: foodImages.pastries,
              alt: 'Fresh seeded and flour-dusted loaves ready to share',
              objectPosition: 'center 48%',
              label: 'Extras',
              title: 'For the road',
              href: '/menu#extras',
            },
          ].map((card) => (
            <a key={card.label} href={card.href} className="group overflow-hidden rounded-[1.35rem] bg-[#fff6e8] shadow-[0_12px_28px_rgba(84,40,18,.06)]">
              <div className="aspect-[4/3] overflow-hidden">
                <ResponsiveFoodImage
                  image={card.image}
                  alt={card.alt}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  objectPosition={card.objectPosition}
                  sizes="(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1200px) 30vw, 384px"
                />
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
          <a href="/menu#platters" className="font-mono-brand text-[10px] uppercase tracking-[.16em] text-[#6f5342] hover:text-[#a7461d]" data-testid="link-platters">Platters</a>
          <a href="/menu#meal-plans" className="font-mono-brand text-[10px] uppercase tracking-[.16em] text-[#6f5342] hover:text-[#a7461d]" data-testid="link-meal-plans">Breakfast & lunch</a>
          <a href="/menu#extras" className="font-mono-brand text-[10px] uppercase tracking-[.16em] text-[#6f5342] hover:text-[#a7461d]" data-testid="link-extras">Extras</a>
          <a href="/menu#pepper-package" className="font-mono-brand text-[10px] uppercase tracking-[.16em] text-[#6f5342] hover:text-[#a7461d]" data-testid="link-pepper-package">Pepper package</a>
          <button onClick={() => setDrawerOpen(true)} className="flex items-center gap-2 rounded-full bg-[#a7461d] px-4 py-2.5 font-mono-brand text-[10px] uppercase tracking-[.13em] text-[#fff6e8] transition-transform hover:-translate-y-0.5" data-testid="button-open-order">
            <ShoppingBag size={14} /> Order
          </button>
        </nav>
        <button onClick={() => setDrawerOpen(true)} className="rounded-full border border-[#5c2f15]/20 p-2.5 md:hidden" aria-label="Open order" data-testid="button-open-order-mobile"><Menu size={18} /></button>
      </header>

      <section id="top" className="relative mx-auto max-w-7xl px-5 pb-16 pt-7 sm:px-8 sm:pb-24 lg:pt-12">
        <div className="reveal relative isolate grid min-h-[34rem] overflow-hidden rounded-[2.25rem] bg-[#f5b14f] shadow-[0_24px_60px_rgba(84,40,18,.15)] lg:grid-cols-[1.03fr_.97fr]">
          <div className="relative z-[2] flex flex-col justify-center px-7 py-14 sm:px-12 lg:px-16">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-9 bg-[#572514]" />
              <span className="font-mono-brand text-[10px] uppercase tracking-[.24em] text-[#572514]">The menu is open</span>
            </div>
            <h1 className="font-display text-[5rem] font-bold leading-[.78] tracking-[-.06em] text-[#4d2412] sm:text-[7.5rem] lg:text-[9.5rem]">MENU</h1>
            <p className="mt-8 max-w-md text-base leading-7 text-[#63371f] sm:text-lg">
              Platters, breakfast and lunch spreads, birthday packages and peppered bites made for the table, the office, and every “just one more” moment.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#platters" className="inline-flex items-center gap-3 rounded-full bg-[#572514] px-5 py-3.5 font-mono-brand text-[10px] uppercase tracking-[.14em] text-[#fff6e8] transition-transform hover:-translate-y-1" data-testid="link-browse-menu">
                Browse the menu <ChevronRight size={15} />
              </a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#572514]/35 bg-[#fff1d5]/45 px-5 py-3.5 font-mono-brand text-[10px] uppercase tracking-[.14em] text-[#572514] transition-colors hover:bg-[#fff1d5]/70" data-testid="link-whatsapp-hero">
                WhatsApp us <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
          <div className="relative min-h-80 overflow-hidden lg:min-h-full">
            <ResponsiveFoodImage image={foodImages.jollof} alt="A generous plate of seasoned rice with vegetables and fresh garnishes" className="h-full w-full object-cover" objectPosition="center 56%" sizes="(max-width: 1023px) calc(100vw - 2.5rem), 48vw" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#f5b14f] via-[#f5b14f]/25 to-transparent lg:block" />
          </div>
          <div className="pointer-events-none absolute -left-16 -top-20 z-[1] h-44 w-44 rounded-full border-[30px] border-[#fff0ca]/35" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-20 left-[42%] z-[3] h-40 w-40 rounded-full border-[22px] border-[#d95f19]/35" aria-hidden="true" />
        </div>
      </section>

      <section className="border-y border-[#5c2f15]/15 bg-[#572514] px-5 py-5 text-[#fff6e8] sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <p className="font-display text-xl">For the first bite, the last bite, and everything in between.</p>
          <div className="flex flex-wrap gap-x-7 gap-y-2 font-mono-brand text-[9px] uppercase tracking-[.18em] text-[#f5d6a7]">
            <span>Platters</span><span className="text-[#e68a32]">•</span><span>Meal packages</span><span className="text-[#e68a32]">•</span><span>Pepper package</span>
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
            <a href="#platters" className="group relative min-h-64 overflow-hidden rounded-[1.35rem] bg-[#e8a13e] p-6 transition-transform hover:-translate-y-1" data-testid="card-highlight-platter">
              <div className="absolute -right-8 -top-10 h-40 w-40 rounded-full border-[20px] border-[#f4c66e]/70" />
              <p className="relative font-mono-brand text-[10px] uppercase tracking-[.18em] text-[#572514]/70">For sharing</p>
              <h3 className="relative mt-20 max-w-[12rem] font-display text-3xl leading-none text-[#572514]">Platters for every table</h3>
              <span className="relative mt-5 inline-flex items-center gap-2 font-mono-brand text-[10px] uppercase tracking-[.14em] text-[#572514]">See platters <ArrowUpRight size={14} /></span>
            </a>
            <a href="#meal-plans" className="group min-h-64 rounded-[1.35rem] bg-[#b4402b] p-6 text-[#fff6e8] transition-transform hover:-translate-y-1" data-testid="card-highlight-cake">
              <p className="font-mono-brand text-[10px] uppercase tracking-[.18em] text-[#f5d6a7]">Full spreads</p>
              <h3 className="mt-20 max-w-[10rem] font-display text-3xl leading-none">Breakfast, lunch & birthdays</h3>
              <span className="mt-5 inline-flex items-center gap-2 font-mono-brand text-[10px] uppercase tracking-[.14em] text-[#f5d6a7]">Explore packages <ArrowUpRight size={14} /></span>
            </a>
            <a href="#extras" className="group min-h-64 rounded-[1.35rem] border border-[#5c2f15]/20 bg-[#75813d] p-6 text-[#fff6e8] transition-transform hover:-translate-y-1" data-testid="card-highlight-pastry">
              <p className="font-mono-brand text-[10px] uppercase tracking-[.18em] text-[#e5e5bb]">Add a little more</p>
              <h3 className="mt-20 max-w-[10rem] font-display text-3xl leading-none">Extras for the table</h3>
              <span className="mt-5 inline-flex items-center gap-2 font-mono-brand text-[10px] uppercase tracking-[.14em] text-[#e5e5bb]">See extras <ArrowUpRight size={14} /></span>
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-5 pb-5 sm:px-8">
        {[
          ['platters', '01 · Platters'],
          ['meal-plans', '02 · Breakfast & lunch'],
          ['extras', '03 · Extras'],
          ['pepper-package', '04 · Our Pepper package'],
        ].map(([id, label]) => (
          <a key={id} href={`#${id}`} className="rounded-full border border-[#5c2f15]/20 bg-[#fff6e8]/65 px-4 py-2 font-mono-brand text-[10px] uppercase tracking-[.12em] text-[#6f5342] transition-colors hover:border-[#a7461d] hover:text-[#a7461d]" data-testid={`link-category-${id}`}>{label}</a>
        ))}
      </div>

      <CategorySection id="platters" eyebrow="01 / Made to share" title="Platters for every table." note="From a solo box to a full celebration spread, choose your mix of small chops, grilled favourites and peppered bites." items={platters} accent="#e77724" image={foodImages.samosa} imageAlt="Golden samosas arranged on a wooden tray" imagePosition="center 52%" onAdd={addItem} />
      <div className="mx-auto max-w-6xl px-5 sm:px-8"><div className="fine-rule" /></div>
      <CategorySection id="meal-plans" eyebrow="02 / Full spreads" title="Breakfast, lunch & celebrations." note="Thoughtful packages for office mornings, family lunches, birthdays and every gathering that needs a little more." items={mealPackages} accent="#e77724" image={foodImages.jollof} imageAlt="A generous plate of seasoned rice with vegetables and fresh garnishes" imagePosition="center 56%" onAdd={addItem} />
      <div className="mx-auto max-w-6xl px-5 sm:px-8"><div className="fine-rule" /></div>
      <CategorySection id="extras" eyebrow="03 / Add a little more" title="Extras for the table." note="Build out your order with rice, protein, pastries, drinks and something sweet. Items without a listed price are available on request." items={extras} accent="#e77724" image={foodImages.pastries} imageAlt="Fresh seeded and flour-dusted loaves arranged on a dark baking surface" imagePosition="center 48%" onAdd={addItem} />
      <div className="mx-auto max-w-6xl px-5 sm:px-8"><div className="fine-rule" /></div>
      <CategorySection id="pepper-package" eyebrow="04 / Our Pepper package" title="Small bites, Pepper style." note="Choose a neat little box of samosa, spring roll, puff puff, mosa and your favourite peppered extras." items={pepperPackages} accent="#e77724" image={foodImages.samosa} imageAlt="Golden samosas arranged on a wooden tray with dipping sauce" imagePosition="center 52%" onAdd={addItem} />

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
                      <div><p className="font-display text-xl">{item.name}</p><p className="font-mono-brand text-[10px] text-[#a7461d]">{displayPrice(item)}{item.priceLabel ? '' : ' each'}</p></div>
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
