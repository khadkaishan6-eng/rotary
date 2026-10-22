import Link from 'next/link';
import { notFound } from 'next/navigation';
import { news } from '@/data/site';
export function generateStaticParams() { return news.map(item => ({ slug: item.slug })); }
export default async function Detail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = news.find(item => item.slug === slug);
  if (!article) notFound();
  return <><section className="hero-banner"><div className="container-shell py-12"><Link className="underline" href="/news">Back to news</Link><p className="mt-7 text-sm text-[#F7A81B]">From the club archive</p><h1 className="mt-4 font-display">{article.title}</h1><p className="mt-5">Event: {article.dateLabel} · Published: {new Date(article.date).toLocaleDateString('en-GB')}</p></div></section><article className="container-shell max-w-4xl py-16"><img src={article.image} alt="Club archive illustration or event photograph" className="max-h-[520px] w-full object-contain"/><div className="mt-10 space-y-5 text-base leading-8">{article.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div><p className="mt-8 border-t pt-6 text-sm">Historical report; office titles and figures refer to the event at the time.</p><a className="mt-4 inline-block underline" href={article.sourceUrl} target="_blank" rel="noopener noreferrer">Read the original club report</a></article></>;
}
