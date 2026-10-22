'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, X } from 'lucide-react';
import { Portrait } from '@/components/Portrait';
import { RecognitionTags } from '@/components/RecognitionTags';
import { presidents, pastPresidents, members, currentTenureYear, clubPresident, site, type President } from '@/data/site';

const current = presidents.find(person => person.tenure === currentTenureYear)!;
const chronological = pastPresidents.filter(person => person.order !== 3000);
const undated = pastPresidents.filter(person => person.order === 3000);

export default function PresidentsPage() {
  const [selected, setSelected] = useState<President | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const selectedMember = members.find(person => person.presidentId === selected?.id);
  useEffect(() => {
    if (!selected) return;
    const element = dialog.current;
    const overflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { element?.close(); document.body.style.overflow = overflow; trigger.current?.focus(); };
  }, [selected]);
  const openProfile = (person: President, button: HTMLButtonElement) => { trigger.current = button; setSelected(person); };
  const renderPresident = (person: President) => <button key={person.id} aria-haspopup="dialog" onClick={event => openProfile(person, event.currentTarget)} className={`president-card ${person.isCharter ? 'charter-card' : ''}`}>
    <div className="president-card-portrait"><Portrait src={person.photo} crop={person.photoCrop} alt={`Portrait of ${person.name}`} className="president-card-image"/></div>
    <div className="president-card-copy"><p className="president-year">{person.tenure.replace('-', '–')}</p><h3 className="mt-3 font-display text-lg leading-7">{person.name}</h3><p className="mt-2 text-xs uppercase tracking-widest">{person.isCharter ? 'Charter President' : 'Club President'}</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-bold">View profile <ArrowUpRight size={15}/></span></div>
  </button>;
  return <>
    <section className="presidents-intro"><div className="container-shell presidents-intro-grid"><div><p className="publication-eyebrow">A legacy of Service Above Self</p><h1 className="mt-5 font-display text-4xl leading-tight md:text-5xl">One club.<br/><span className="text-[#F7A81B]">Generations of leadership.</span></h1><p className="mt-6 max-w-xl leading-8">Each Rotary year brings a new perspective and a shared promise to serve. Meet the presidents who have helped shape Rotary Club of Kasthamandap since its charter in 2001.</p><a href="#presidential-history" className="mt-8 inline-flex items-center gap-3 text-sm font-bold text-[#F7A81B]">Explore our history <ArrowDown size={17}/></a></div><article className="current-president-feature"><div className="current-president-photo"><Portrait src={current.photo} alt={current.name} className="h-full w-full object-contain object-bottom"/></div><div className="current-president-copy"><p className="text-xs font-bold uppercase tracking-widest text-[#F7A81B]">Current President · RY {site.rotaryYear}</p><h2 className="mt-3 font-display text-2xl leading-9">{clubPresident.name}</h2><p className="mt-2 text-sm leading-6">{clubPresident.org}</p><button aria-haspopup="dialog" onClick={event => openProfile(current, event.currentTarget)} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#F7A81B]">Meet our president <ArrowUpRight size={17}/></button></div></article></div></section>
    <section id="presidential-history" className="container-shell presidents-history py-16 md:py-20"><div className="section-heading-row"><div><p className="eyebrow">The years that brought us here</p><h2 className="mt-3 font-display text-3xl">Our presidential history</h2><p className="mt-4 max-w-2xl leading-7">From our charter president through the 2025–26 Rotary year, in chronological order.</p></div><Link href="/members" className="publication-link">Meet our members <ArrowUpRight size={17}/></Link></div><div className="president-grid mt-10">{chronological.map(renderPresident)}</div>
      {undated.length > 0 && <div className="mt-14 border-t border-[#17458F]/15 pt-10"><h2 className="font-display text-xl">Additional past presidents</h2><p className="mt-3 text-sm leading-7">Their service is recorded in the club directory. Exact Rotary years will be added once confirmed.</p><div className="president-grid mt-7">{undated.map(renderPresident)}</div></div>}
    </section>
    <dialog ref={dialog} aria-labelledby="president-name" onCancel={() => setSelected(null)} onClose={() => setSelected(null)} onKeyDown={event => {
      if (event.key !== 'Tab') return;
      const controls = event.currentTarget.querySelectorAll<HTMLElement>('button, a[href], [tabindex="0"]');
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }} onClick={event => { if (event.target !== event.currentTarget) return; const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) setSelected(null); }} className="president-dialog">
      {selected && <><button autoFocus aria-label="Close president profile" onClick={() => setSelected(null)} className="president-dialog-close"><X size={21}/></button><div className="president-dialog-header"><Portrait src={selected.photo} crop={selected.photoCrop} alt={selected.name} className="president-dialog-photo"/><div><p className="eyebrow">{selected.tenure === currentTenureYear ? 'Current President' : selected.isCharter ? 'Charter President' : 'Past President'}</p><h2 id="president-name" className="mt-3 font-display text-2xl leading-9">{selected.name}</h2><p className="mt-3 font-bold">{selected.tenure.replace('-', '–')}</p></div></div><p className="mt-7 leading-8">{selected.bio}</p>{selectedMember && <div className="mt-7 border-t border-[#17458F]/15 pt-6"><h3 className="font-bold">Rotary recognitions</h3><RecognitionTags tags={selectedMember.recognitions} detailed/></div>}{selected.projects.length > 0 && <div className="mt-7"><h3 className="font-bold">Projects during tenure</h3>{selected.projects.map(project => <p key={project.title} className="mt-3 leading-7">{project.title} · {project.description}</p>)}</div>}{selected.financialContribution && <p className="mt-5 leading-7">{selected.financialContribution}</p>}{selected.achievements.length > 0 && <ul className="mt-5 list-disc space-y-2 pl-5">{selected.achievements.map(item => <li key={item}>{item}</li>)}</ul>}{selected.sourceUrl && <a href={selected.sourceUrl} target="_blank" rel="noopener noreferrer" className="publication-link mt-7">View club record <ArrowUpRight size={16}/></a>}</>}
    </dialog>
  </>;
}
