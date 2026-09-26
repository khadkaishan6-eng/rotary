'use client';

import Link from 'next/link';
import { Menu, Search, X } from 'lucide-react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { searchItems } from '@/data/site';

const links = [['About', '/about'], ['Projects', '/projects'], ['Gallery', '/gallery'], ['Members', '/members'], ['News & Articles', '/news'], ['Contact', '/contact']];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const pathname = usePathname();
  const searchRef = useRef<HTMLDivElement>(null);
  useEffect(() => { const timeout = window.setTimeout(() => setDebouncedQuery(query.trim()), 200); return () => window.clearTimeout(timeout); }, [query]);
  useEffect(() => {
    if (!searchOpen) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') { setSearchOpen(false); setQuery(''); } };
    const onPointerDown = (event: PointerEvent) => { if (searchRef.current && !searchRef.current.contains(event.target as Node)) { setSearchOpen(false); setQuery(''); } };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => { document.removeEventListener('keydown', onKeyDown); document.removeEventListener('pointerdown', onPointerDown); };
  }, [searchOpen]);
  const groupedResults = debouncedQuery ? searchItems.reduce<Record<string, typeof searchItems>>((groups, item) => {
    const haystack = `${item.title} ${item.description}`.toLowerCase();
    if (haystack.includes(debouncedQuery.toLowerCase())) (groups[item.type] ??= []).push(item);
    return groups;
  }, {}) : {};
  const resultGroups = Object.entries(groupedResults).map(([type, items]) => [type, items.slice(0, 5)] as const);
  const closeSearch = () => { setSearchOpen(false); setQuery(''); };
  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    if (pathname === '/') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  return <header className="sticky top-0 z-50 border-b border-slate-200 bg-white text-[#0A2350] shadow-sm">
    <div className="container-shell flex h-[76px] items-center justify-between gap-4"><Link href="/" aria-label="Rotaract Club of Kasthamandap home" onClick={handleLogoClick}><img src="/logos/club_logo.png" alt="Rotaract Club of Kasthamandap" className="h-12 w-auto" /></Link><nav className="hidden items-center gap-5 xl:flex">{links.map(([label, href]) => <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined} className={`text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:text-[#F7A81B] ${pathname === href ? 'border-b-2 border-[#F7A81B] pb-1 text-[#F7A81B]' : ''}`}>{label}</Link>)}</nav><div className="hidden items-center gap-2 md:flex"><button aria-label="Open search" onClick={() => setSearchOpen(true)} className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white hover:border-[#F7A81B] hover:text-[#F7A81B]"><Search size={17} /></button><a href="#" aria-label="Facebook" className="grid h-9 w-9 place-items-center text-white hover:text-[#F7A81B]"><FaFacebookF /></a><a href="#" aria-label="Instagram" className="grid h-9 w-9 place-items-center text-white hover:text-[#F7A81B]"><FaInstagram /></a><Link href="/join" className="rounded-full bg-[#F7A81B] px-4 py-2.5 text-sm font-bold text-[#17458F] hover:bg-white">Join Us</Link><Link href="/donate" className="rounded-full border border-white px-4 py-2.5 text-sm font-bold text-white hover:bg-white hover:text-[#17458F]">Donate</Link></div><button className="grid h-10 w-10 place-items-center text-white xl:hidden" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div>
    {open && <div className="border-t border-slate-200 bg-white px-4 pb-5 xl:hidden"><nav className="container-shell flex flex-col gap-1 py-3">{links.map(([label, href]) => <Link onClick={() => setOpen(false)} key={href} href={href} className="rounded-lg px-3 py-3 text-sm font-bold uppercase tracking-[0.08em] hover:bg-[#F5F7FA]">{label}</Link>)}<button onClick={() => setSearchOpen(true)} className="flex items-center gap-2 rounded-lg px-3 py-3 text-left text-sm font-bold"><Search size={16} /> Search</button><div className="mt-3 flex gap-2 border-t border-slate-200 pt-4"><Link href="/join" className="flex-1 rounded-full bg-[#F7A81B] py-3 text-center text-sm font-bold text-[#0A2350]">Join Us</Link><Link href="/donate" className="flex-1 rounded-full border border-[#17458F] py-3 text-center text-sm font-bold text-[#17458F]">Donate</Link></div></nav></div>}
    {searchOpen && <div ref={searchRef} role="dialog" aria-modal="true" aria-label="Site search" className="absolute left-0 right-0 top-full border-b border-slate-200 bg-white p-4 shadow-xl sm:p-6"><div className="container-shell"><div className="flex items-center gap-3"><Search className="shrink-0 text-[#17458F]" size={20} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects, gallery, members and stories" className="min-w-0 flex-1 border-0 text-base outline-none" /><button aria-label="Close search" onClick={closeSearch} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#F5F7FA]"><X size={18} /></button></div>{debouncedQuery && <div className="mt-5 max-h-[min(65vh,480px)] overflow-y-auto border-t border-slate-100 pt-4">{resultGroups.length ? resultGroups.map(([type, items]) => <section key={type} className="mb-5 last:mb-0"><h2 className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-[#17458F]">{type} ({items.length})</h2><div className="grid gap-1">{items.map((item) => <Link key={`${type}-${item.title}`} href={item.href} onClick={closeSearch} className="flex items-center gap-3 rounded-lg p-2 text-left hover:bg-[#F5F7FA]"><img src={item.image} alt="" className="h-12 w-14 shrink-0 rounded-md object-cover" /><span className="min-w-0"><strong className="block truncate text-sm text-[#0A2350]">{item.title}</strong><span className="block truncate text-xs text-slate-500">{item.description}</span></span></Link>)}</div></section>) : <p className="py-5 text-sm text-slate-500">No results for &apos;{debouncedQuery}&apos;</p>}</div>}</div></div>}
  </header>;
}