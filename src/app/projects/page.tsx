'use client';

import Link from 'next/link';
import { ArrowDownUp, ArrowRight, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/data/site';

const filters = ['All', 'Upcoming', 'Service', 'Fellowship', 'Professional', 'Youth'];

export default function ProjectsPage() {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [filterBeforeSearch, setFilterBeforeSearch] = useState('All');
  const [sort, setSort] = useState('Newest');
  const featured = projects.find((project) => project.featured) ?? projects[0];
  const visibleProjects = useMemo(() => projects.filter((project) => {
    const matchesFilter = query.trim() ? true : filter === 'All' || (filter === 'Upcoming' ? project.status === 'upcoming' : project.avenue === filter);
    const matchesQuery = `${project.title} ${project.summary} ${project.location}`.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  }).sort((a, b) => sort === 'Oldest' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)), [filter, query, sort]);

  useEffect(() => { if (query.trim() && filter !== 'All') { setFilterBeforeSearch(filter); setFilter('All'); } if (!query.trim() && filter === 'All' && filterBeforeSearch !== 'All') setFilter(filterBeforeSearch); }, [query, filter, filterBeforeSearch]);
  return <>
    <section className="hero-banner"><div className="container-shell py-12"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#F7A81B]">Our work</p><h1 className="mt-4 max-w-3xl font-display leading-tight">Good intentions become useful when they become <span className="text-[#F7A81B]">action.</span></h1><p className="mt-4 max-w-xl text-base leading-7 text-blue-100">Explore practical acts of service that carry our shared purpose forward.</p><p className="mt-4 text-sm text-blue-100">Home / Projects</p></div></section>
    <section className="container-shell py-16 sm:py-20"><div className="relative overflow-hidden rounded-3xl bg-[#17458F] text-white"><div className="absolute inset-0 bg-cover bg-center opacity-35" style={{ backgroundImage: `url(${featured.image})` }} /><div className="relative grid min-h-[390px] items-end p-7 sm:p-10 lg:grid-cols-2"><div><span className="rounded-full bg-[#F7A81B] px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-[#0d2d60]">This year’s flagship</span><h2 className="mt-5 font-display text-3xl sm:text-4xl">{featured.title}</h2><p className="mt-4 max-w-lg text-sm leading-7 text-blue-50">{featured.summary}</p><Link href={`/projects/${featured.id}`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#F7A81B]">View project <ArrowRight size={17} /></Link></div></div></div></section>
    <section className="container-shell pb-24"><div className="flex flex-col gap-5 border-b border-slate-200 pb-7"><div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div className="flex flex-wrap gap-2">{filters.map((item) => <button key={item} onClick={() => setFilter(item)} className={`rounded-full border px-4 py-2 text-sm font-bold transition ${filter === item ? 'border-[#17458F] bg-[#17458F] text-white' : 'border-slate-200 text-slate-600 hover:border-[#17458F] hover:text-[#17458F]'}`}>{item}</button>)}</div><div className="relative w-full lg:w-64"><Search className="absolute left-3 top-3 text-slate-400" size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects" aria-label="Search projects" className="w-full rounded-full border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#17458F]" /></div></div><label className="flex items-center gap-2 self-start text-sm text-slate-600"> <ArrowDownUp size={16} /><span>Sort:</span><select value={sort} onChange={(event) => setSort(event.target.value)} className="bg-transparent font-bold text-[#17458F] outline-none"><option>Newest</option><option>Oldest</option></select></label></div><div className="grid gap-6 pt-9 md:grid-cols-2 lg:grid-cols-3">{visibleProjects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>{visibleProjects.length === 0 && <p className="py-20 text-center text-slate-500">No projects match that search yet.</p>}</section>
  </>;
}
