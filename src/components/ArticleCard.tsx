import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

type Article = { slug?: string; title: string; excerpt: string; author: string; date: string; readTime: string; image: string };
export function ArticleCard({ article }: { article: Article }) {
  return <article className="group"><Link href={`/news/${article.slug ?? article.id}`}><img src={article.image} alt="" className="mb-5 aspect-[16/9] w-full rounded-xl object-cover transition duration-500 group-hover:scale-[1.02]" /><p className="text-xs font-bold uppercase tracking-[0.12em] text-[#17458F]">{new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · {article.readTime}</p><h3 className="mt-3 font-display text-xl leading-8 text-[#17458F]">{article.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{article.excerpt}</p><p className="mt-4 flex items-center gap-1 text-sm font-bold text-[#17458F]">Read story <ArrowUpRight size={16} /></p></Link></article>;
}
