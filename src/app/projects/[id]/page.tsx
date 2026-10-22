import Link from 'next/link';
import { notFound } from 'next/navigation';
import { archive, projects } from '@/data/site';
export function generateStaticParams() { return projects.map(item => ({ id: item.id })); }
export default async function Detail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find(item => item.id === id);
  if (!project) notFound();
  return <><section className="hero-banner"><div className="container-shell py-12"><Link className="underline" href="/projects">Back to projects</Link><p className="mt-7 text-sm text-[#F7A81B]">{project.isDraft ? `Proposed for RY ${project.tenureYear}` : 'From the club archive'}</p><h1 className="mt-4 font-display">{project.title}</h1><p className="mt-5">{project.isDraft ? 'Sample plan · dates and budget to be confirmed' : <>Event: {project.dateLabel} · Published: {new Date(archive.articles.find(item => item.id === project.id)!.date).toLocaleDateString('en-GB')}</>}</p></div></section><article className="container-shell max-w-4xl py-16"><img src={project.image} alt={project.isDraft ? `Illustration for ${project.title}` : `Archive image for ${project.title}`} className="max-h-[520px] w-full object-contain"/><div className="mt-10 space-y-5 text-base leading-8">{project.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div><p className="mt-8 border-t pt-6 text-sm">{project.isDraft ? 'This sample plan is not an approved project or a record of completed work.' : 'Historical report; office titles and figures refer to the event at the time.'}</p>{project.sourceUrl && <a className="mt-4 inline-block underline" href={project.sourceUrl} target="_blank" rel="noopener noreferrer">Read the original club report</a>}</article></>;
}
