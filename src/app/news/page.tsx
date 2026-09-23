'use client';

import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ArticleCard } from '@/components/ArticleCard';
import { news } from '@/data/site';

export default function NewsPage() {
  const [tab, setTab] = useState('Club News');
  const [query, setQuery] = useState('');
  const visible = useMemo(() => news.filter((article) => article.type === tab && `${article.title} ${article.excerpt} ${article.author} ${article.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase())), [query, tab]);
  return <><section className="hero-banner"><div className="container-shell py-12"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#F7A81B]">Stories from the club</p><h1 className="mt-4 max-w-3xl font-display leading-tight">News & Articles</h1><p className="mt-4 max-w-xl text-base leading-7 text-blue-100">A closer look at the people, projects and questions shaping our Rotary year.</p><p className="mt-4 text-sm text-blue-100">Home / News & Articles</p></div></section><section className="container-shell py-16 md:py-20"><div className="flex flex-col gap-5 border-b border-slate-200 pb-7 sm:flex-row sm:items-center sm:justify-between"><div className="flex flex-wrap gap-2"><button onClick={() => setTab('Club News')} className={`rounded-full border px-4 py-2 text-sm font-bold ${tab === 'Club News' ? 'border-[#17458F] bg-[#17458F] text-white' : 'border-slate-200 text-slate-600'}`}>Club News</button><button onClick={() => setTab('Rotarian Articles')} className={`rounded-full border px-4 py-2 text-sm font-bold ${tab === 'Rotarian Articles' ? 'border-[#17458F] bg-[#17458F] text-white' : 'border-slate-200 text-slate-600'}`}>Rotarian Articles</button></div><div className="relative w-full sm:w-64"><Search className="absolute left-3 top-3 text-slate-400" size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search stories or tags" aria-label="Search stories" className="w-full rounded-full border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#17458F]" /></div></div><div className="grid gap-9 pt-9 md:grid-cols-3">{visible.map((article) => <ArticleCard key={article.id} article={article} />)}</div></section></>;
}
