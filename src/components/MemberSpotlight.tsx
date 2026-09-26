'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { MemberProfile } from '@/data/site';

const rotationMs = 5500;

const facts = [
  'led our first Books Open Doors reading circle',
  'keeps every new member feeling welcome',
  'turns careful listening into practical action',
  'brings a steady rhythm to our service calendar',
  'connects local partners with generous ideas',
  'makes fellowship feel like a place to belong',
  'helps young leaders find their next brave step',
  'believes small details can carry big care',
];

export function MemberSpotlight({ members }: { members: MemberProfile[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const activeMember = members[activeIndex] ?? members[0];

  useEffect(() => {
    if (paused || members.length < 2) return;
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % members.length), rotationMs);
    return () => window.clearInterval(timer);
  }, [members.length, paused]);

  if (!activeMember) return null;

  const setActive = (index: number) => setActiveIndex(index);
  const pauseOnFocus = () => setPaused(true);
  const resumeOnBlur = (event: React.FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
  };

  return <div className="mt-8" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={pauseOnFocus} onBlur={resumeOnBlur}>
    <div className="grid gap-7 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
      <article key={activeMember.id} className="spotlight-enter overflow-hidden rounded-2xl border-2 border-[#F7A81B] bg-[#17458F] text-white shadow-xl shadow-[#17458F]/20">
        <div className="grid gap-0 sm:grid-cols-[minmax(220px,0.8fr)_1fr] sm:items-stretch">
          <img src={activeMember.image} alt={`Anonymous placeholder portrait of ${activeMember.name}`} className="aspect-[4/3] h-full w-full object-cover sm:aspect-auto" />
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#F7A81B]">In the spotlight</p>
            <h3 className="mt-3 font-display text-2xl sm:text-3xl">{activeMember.name}</h3>
            <p className="mt-2 text-sm font-bold text-white">{activeMember.role}</p>
            <p className="mt-6 border-l-2 border-[#F7A81B] pl-4 text-sm leading-7 text-white/90">“{activeMember.name} {facts[activeIndex % facts.length]}. ”</p>
          </div>
        </div>
      </article>

      <div className="flex flex-col justify-center rounded-2xl border border-[#17458F]/15 bg-white p-6 sm:p-7">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#17458F]">More people behind the work</p>
        <p className="mt-3 max-w-sm text-sm leading-6 text-[#17458F]">A rotating glimpse of the people who bring care, energy and practical optimism to RCK.</p>
        <div className="mt-6 flex flex-wrap items-center gap-4" role="list" aria-label="Member spotlight choices">
          {members.map((member, index) => index === activeIndex ? null : <button key={member.id} type="button" role="listitem" onClick={() => setActive(index)} aria-label={`View ${member.name}'s profile`} className="group grid justify-items-center gap-2 text-[#17458F]">
            <img src={member.image} alt="" className="h-14 w-14 rounded-full border-2 border-[#17458F]/15 object-cover transition group-hover:border-[#F7A81B] group-focus-visible:border-[#F7A81B] group-focus-visible:outline-none sm:h-16 sm:w-16" />
            <span className="max-w-16 truncate text-[0.68rem] font-bold">{member.name}</span>
          </button>)}
        </div>
        <div className="mt-5 flex items-center gap-2" aria-label={`Spotlight ${activeIndex + 1} of ${members.length}`}>
          {members.map((member, index) => <button key={member.id} type="button" onClick={() => setActive(index)} aria-label={`Show spotlight ${index + 1}: ${member.name}`} className={`h-2 rounded-full transition-all ${index === activeIndex ? 'w-7 bg-[#F7A81B]' : 'w-2 bg-[#17458F]/20 hover:bg-[#F7A81B]'}`} />)}
        </div>
      </div>
    </div>
    <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-bold text-[#17458F]"><span>60 members and counting</span><span aria-hidden="true" className="text-[#F7A81B]">/</span><Link href="/members" className="underline decoration-[#F7A81B] decoration-2 underline-offset-4 hover:text-[#F7A81B]">Meet everyone</Link></div>
  </div>;
}
