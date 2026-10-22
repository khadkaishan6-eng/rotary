'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowDownToLine, ArrowUpRight, BookOpen, FileText, Search } from 'lucide-react';
import { archive, souvenirs } from '@/data/site';
import documents from '@/data/legacy-documents.json';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const issues = Object.values(documents.reduce<Record<string, { year: string; month: string; files: typeof documents }>>((groups, document) => {
  const year = document.title.match(/20\d{2}/)?.[0] ?? '';
  const month = months.find(name => document.title.toLowerCase().includes(name.toLowerCase())) ?? '';
  const key = `${year}-${month}`;
  (groups[key] ??= { year, month, files: [] }).files.push(document);
  return groups;
}, {})).sort((a, b) => b.year.localeCompare(a.year) || months.indexOf(b.month) - months.indexOf(a.month));

export default function ArchivePage() {
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('All');
  const term = query.trim().toLowerCase();
  const visible = issues.filter(issue => (year === 'All' || year === issue.year) && issue.files.some(file => `${file.title} ${file.text}`.toLowerCase().includes(term)));
  return <>
    <section className="hero-banner archive-intro"><div className="container-shell py-14 md:py-20"><p className="publication-eyebrow">Our story, in print</p><h1 className="mt-4 font-display">Club Archive</h1><p className="mt-5 max-w-2xl leading-8">Explore the publications that record our service, fellowship and the people behind it. A growing collection of club bulletins, annual souvenirs and leadership records.</p><nav aria-label="Archive sections" className="mt-8 flex flex-wrap gap-3"><a className="archive-anchor" href="#bulletins">Bulletins</a><a className="archive-anchor" href="#souvenirs">Souvenirs</a><a className="archive-anchor" href="#club-boards">Club boards</a></nav></div></section>
    <div className="container-shell py-14 md:py-20">
      <section id="bulletins" className="archive-section" aria-labelledby="bulletins-title">
        <div className="section-heading-row"><div><p className="eyebrow">The club, month by month</p><h2 id="bulletins-title" className="mt-3 font-display text-3xl">Club bulletins</h2><p className="mt-4 max-w-2xl leading-7">Read stories, project updates and member milestones from 2012–2014. Search inside the publications to find a person, place or project.</p></div><span className="collection-count">{issues.length} issues</span></div>
        <div className="archive-controls"><label className="archive-search"><Search size={18} aria-hidden="true"/><span className="sr-only">Search bulletins</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search names, projects or places"/></label><label className="flex items-center gap-3 text-sm font-bold">Year<select aria-label="Bulletin year" value={year} onChange={event => setYear(event.target.value)} className="rounded-lg border border-[#17458F]/20 bg-white px-4 py-3"><option value="All">All years</option>{['2014', '2013', '2012'].map(item => <option key={item}>{item}</option>)}</select></label></div>
        <p role="status" className="mb-6 text-sm">{visible.length} {visible.length === 1 ? 'issue' : 'issues'}{term || year !== 'All' ? ' found' : ' in the collection'}</p>
        <div className="publication-grid">{visible.map(issue => {
          const primary = (term ? issue.files.find(file => `${file.title} ${file.text}`.toLowerCase().includes(term)) : undefined) ?? issue.files[0];
          const matching = issue.files.find(file => file.text.toLowerCase().includes(term)) ?? primary;
          const index = Math.max(0, matching.text.toLowerCase().indexOf(term) - 70);
          return <article key={`${issue.year}-${issue.month}`} className="publication-card"><div className="publication-cover"><FileText size={30} strokeWidth={1.3}/><span>{issue.year}</span><h3 className="font-display">{issue.month}</h3><p>Club bulletin</p></div><div className="p-5"><p className="text-xs font-bold uppercase tracking-widest">{issue.month} {issue.year}</p><p className="mt-2 text-sm leading-6">Service updates, club life and fellowship.</p>{term && <p className="mt-3 text-sm leading-6">…{matching.text.slice(index, index + 180).trim()}…</p>}<a href={primary.localUrl} target="_blank" rel="noopener noreferrer" className="publication-link" aria-label={`Open ${issue.month} ${issue.year} bulletin PDF`}>Read bulletin <ArrowUpRight size={17}/></a>{issue.files.length > 1 && <details className="mt-4 border-t border-[#17458F]/10 pt-3 text-xs"><summary className="cursor-pointer">Other editions ({issue.files.length - 1})</summary><ul className="mt-3 space-y-3">{issue.files.filter(file => file.id !== primary.id).map((file, i) => <li key={file.id}><a className="inline-flex items-center gap-2 underline" href={file.localUrl} target="_blank" rel="noopener noreferrer"><ArrowDownToLine size={13}/> Edition {i + 2} · PDF</a></li>)}</ul></details>}</div></article>;
        })}</div>
        {visible.length === 0 && <div className="publication-empty"><FileText size={30}/><h3 className="mt-4 font-display text-xl">No bulletins found</h3><p className="mt-3">Try a different keyword or year.</p><button className="mt-5 font-bold underline" onClick={() => { setQuery(''); setYear('All'); }}>Clear filters</button></div>}
      </section>
      <section id="souvenirs" className="archive-section mt-16 border-t border-[#17458F]/15 pt-16" aria-labelledby="souvenirs-title"><div className="souvenir-panel"><div className="souvenir-symbol" aria-hidden="true"><BookOpen size={60} strokeWidth={1}/></div><div><p className="eyebrow">An annual record of our club</p><h2 id="souvenirs-title" className="mt-3 font-display text-3xl">Souvenirs</h2><p className="mt-4 max-w-2xl leading-7">Our annual club magazine brings together the year’s board, projects, funds used, member stories and milestones in one lasting record.</p>{souvenirs.length === 0 ? <p className="mt-5 inline-block rounded-full border border-[#17458F]/20 px-4 py-2 text-xs font-bold">Annual editions coming soon</p> : <div className="mt-6 space-y-4">{souvenirs.map(item => <a key={item.id} className="publication-link" href={item.file} target="_blank" rel="noopener noreferrer">{item.title} · {item.year}<ArrowUpRight size={17}/></a>)}</div>}</div></div></section>
      <section id="club-boards" className="archive-section mt-16 border-t border-[#17458F]/15 pt-16"><div className="section-heading-row"><div><p className="eyebrow">The people who served</p><h2 className="mt-3 font-display text-3xl">Club boards</h2><p className="mt-4 max-w-2xl leading-7">Leadership recorded in the archived club souvenir. Visit Members for the confirmed appointments for the current Rotary year.</p></div><Link href="/members" className="publication-link">Current members <ArrowUpRight size={17}/></Link></div><details className="mt-8 rounded-2xl border border-[#17458F]/15 px-6 py-5"><summary className="cursor-pointer font-bold">Board from the 2024–25 souvenir</summary><p className="mt-4 text-sm leading-6">Listed as printed in the souvenir. The uploaded filenames carry a different year; these offices are retained as historical records.</p><div className="mt-4 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">{archive.board.map(person => <div key={person.name} className="border-b border-[#17458F]/10 py-5"><h3 className="font-bold">{person.name}</h3><p className="mt-1 text-sm">{person.role}</p></div>)}</div></details></section>
    </div>
  </>;
}
