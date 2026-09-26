'use client';

import { ChevronLeft, ChevronRight, Search, Share2, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { gallery } from '@/data/site';

const filters = ['All', 'Service', 'Fellowship', 'Professional', 'Youth'];
const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

export default function GalleryPage() {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [filterBeforeSearch, setFilterBeforeSearch] = useState('All');
  const [selected, setSelected] = useState<number | null>(null);
  const thumbnailRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const visible = gallery.filter((item) => (!query.trim() && filter !== 'All' ? item.avenue === filter : true) && `${item.title} ${item.avenue}`.toLowerCase().includes(query.toLowerCase())).sort((a, b) => b.date.localeCompare(a.date));
  const active = selected === null ? null : visible[selected];

  useEffect(() => {
    if (query.trim() && filter !== 'All') { setFilterBeforeSearch(filter); setFilter('All'); }
    if (!query.trim() && filter === 'All' && filterBeforeSearch !== 'All') setFilter(filterBeforeSearch);
  }, [query, filter, filterBeforeSearch]);

  useEffect(() => {
    if (selected === null) return;
    const close = () => setSelected(null);
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') close(); if (event.key === 'ArrowLeft') setSelected((current) => current === null ? null : (current - 1 + visible.length) % visible.length); if (event.key === 'ArrowRight') setSelected((current) => current === null ? null : (current + 1) % visible.length); };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKeyDown); thumbnailRefs.current[selected]?.focus(); };
  }, [selected, visible.length]);

  return <><section className="hero-banner"><div className="container-shell py-12"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#F7A81B]">Moments that stay with us</p><h1 className="mt-4 max-w-3xl font-display leading-tight">A record of people <span className="text-[#F7A81B]">showing up.</span></h1><p className="mt-4 max-w-xl text-base leading-7 text-blue-100">Browse moments from our projects, gatherings and everyday service.</p><p className="mt-4 text-sm text-blue-100">Home / Gallery</p></div></section><section className="container-shell py-16 md:py-20"><div className="flex flex-col gap-4 border-b border-slate-200 pb-7 lg:flex-row lg:items-center lg:justify-between"><div className="flex flex-wrap gap-2">{filters.map((item) => <button key={item} onClick={() => setFilter(item)} className={`rounded-full border px-4 py-2 text-sm font-bold transition ${filter === item ? 'border-[#17458F] bg-[#17458F] text-white' : 'border-slate-200 text-slate-600 hover:border-[#17458F] hover:text-[#17458F]'}`}>{item}</button>)}</div><div className="relative w-full lg:w-64"><Search className="absolute left-3 top-3 text-slate-400" size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search gallery" aria-label="Search gallery" className="w-full rounded-full border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#17458F]" /></div></div><div className="grid gap-5 pt-9 sm:grid-cols-2 lg:grid-cols-3">{visible.map((item, index) => <button ref={(element) => { thumbnailRefs.current[index] = element; }} key={item.id} onClick={() => setSelected(index)} className="group overflow-hidden rounded-xl border border-slate-200 bg-white text-left"><img src={item.image} alt={item.title} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" /><div className="p-4"><p className="font-display text-lg text-[#17458F]">{item.title}</p><p className="mt-1 text-xs text-slate-500">{formatDate(item.date)} · {item.avenue}</p></div></button>)}</div>{visible.length === 0 && <p className="py-20 text-center text-slate-500">No gallery moments match that search.</p>}</section>{active && <div role="dialog" aria-modal="true" aria-label="Gallery image viewer" onClick={(event) => { if (event.target === event.currentTarget) setSelected(null); }} className="fixed inset-0 z-[60] grid place-items-center bg-[#0A2350]/95 p-5"><button aria-label="Close image viewer" onClick={() => setSelected(null)} className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"><X /></button><button aria-label="Previous image" onClick={() => setSelected((selected! - 1 + visible.length) % visible.length)} className="absolute left-3 top-1/2 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white sm:left-8"><ChevronLeft /></button><div className="w-full max-w-4xl"><img src={active.image} alt={active.title} className="mx-auto max-h-[65vh] w-full object-contain" /><div className="mt-5 flex flex-col gap-4 text-white sm:flex-row sm:items-end sm:justify-between"><div><h2 className="font-display text-xl">{active.title}</h2><p className="mt-1 text-sm text-blue-100">{formatDate(active.date)} · {active.avenue}</p></div><button className="flex items-center gap-2 self-start text-sm font-bold text-[#F7A81B]"><Share2 size={16} /> Share</button></div></div><button aria-label="Next image" onClick={() => setSelected((selected! + 1) % visible.length)} className="absolute right-3 top-1/2 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white sm:right-8"><ChevronRight /></button></div>}</>;
}
