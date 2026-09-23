'use client';

import { useState } from 'react';

const questions = [
  ['What does Rotary primarily bring together?', 'People committed to service'],
  ['What is a Rotary club?', 'A local community of members'],
  ['Which is a Rotary area of focus?', 'Clean water and sanitation'],
  ['What makes a service project stronger?', 'Listening to the community'],
  ['What is fellowship?', 'Building genuine connection'],
  ['Who can participate in service?', 'Anyone who wants to help'],
  ['What is District 3292?', 'The Rotary district including Nepal and Bhutan'],
  ['What should a project aim for?', 'Sustainable local impact'],
  ['What is this year’s RCK theme?', 'Serve with Soul'],
  ['What is the first step to joining?', 'Start a conversation']
];

export default function QuizPage() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [done, setDone] = useState(false);
  const answer = (correct: boolean) => { if (answered) return; setAnswered(true); if (correct) setScore((value) => value + 1); };
  if (done) return <section className="container-shell grid min-h-[70vh] place-items-center py-20"><div className="max-w-xl text-center"><p className="eyebrow">Quiz complete</p><h1 className="mt-5 font-display text-5xl text-[#17458F]">You scored {score} / {questions.length}</h1><p className="mt-5 leading-7 text-slate-600">Thanks for taking a little time to learn more about Rotary. There is always more to discover through service.</p><button onClick={() => { setIndex(0); setScore(0); setDone(false); setAnswered(false); }} className="mt-8 rounded-full bg-[#F7A81B] px-6 py-3 font-bold text-[#0d2d60]">Try again</button></div></section>;
  const [question, correctAnswer] = questions[index];
  const options = [correctAnswer, 'A private social club', 'A yearly fundraising event', 'A government department'].sort(() => index % 2 ? -1 : 1);
  return <section className="container-shell min-h-[70vh] py-16 sm:py-24"><div className="mx-auto max-w-2xl"><p className="eyebrow">Rotary FAQ quiz · {index + 1} of {questions.length}</p><div className="mt-5 h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-[#F7A81B] transition-all" style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div><h1 className="mt-12 font-display text-3xl leading-tight text-[#17458F] sm:text-5xl">{question}</h1><div className="mt-10 grid gap-3">{options.map((option) => <button key={option} onClick={() => answer(option === correctAnswer)} className={`rounded-xl border p-4 text-left text-sm font-bold transition ${answered && option === correctAnswer ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-700 hover:border-[#17458F] hover:text-[#17458F]'}`}>{option}</button>)}</div>{answered && <div className="mt-8 flex items-center justify-between"><p className="text-sm font-bold text-[#17458F]">{score > 0 && index === questions.length - 1 ? 'Nice work.' : 'Answer recorded.'}</p><button onClick={() => { if (index === questions.length - 1) setDone(true); else { setIndex((value) => value + 1); setAnswered(false); } }} className="rounded-full bg-[#17458F] px-6 py-3 text-sm font-bold text-white">{index === questions.length - 1 ? 'See score' : 'Next question'}</button></div>}</div></section>;
}
