import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import TiltCard from '@/components/TiltCard';
import { TechScene } from '@/components/Scenes';
import { sphereTech, techCategories } from '@/lib/site';

export const metadata: Metadata = { title: 'Tech Stack', description: 'The full tech stack of Muhammad Usman: AI & machine learning, NLP, Transformers & LLMs, RAG, data science, Python APIs and full-stack web development.' };

export default function TechStackPage() {
  return <main>
    <PageHero variant="stars" eyebrow="TECH STACK · IN DETAIL" title={<>The tools behind<br/><span>the thinking.</span></>} text="Eleven areas across AI, data and web engineering — what I work with, and how each piece fits into the things I build. Drag the sphere to explore." aside={<TechScene items={sphereTech} />}>
      <div className="hero-actions"><a className="button button-primary" href="#stack">Explore the stack <ArrowUpRight size={16}/></a><Link className="button button-ghost" href="/lets-talk">Let&apos;s talk <MessageCircle size={16}/></Link></div>
    </PageHero>

    <section className="section-pad" id="stack">
      <Reveal className="section-heading"><div><span className="section-index">TECHNOLOGY CONSTELLATION</span><h2>Everything I work with,<br/><em>area by area.</em></h2></div><p>From training models and building retrieval pipelines to shipping the interfaces and APIs around them.</p></Reveal>
      <div className="domain-grid three">{techCategories.map((c, i) => { const Icon = c.icon; return <TiltCard key={c.title}><Reveal className="domain-card"><div className="card-top"><span>{String(i + 1).padStart(2, '0')} / AREA</span><Icon size={23}/></div><h3>{c.title}</h3><p>{c.text}</p><div className="tag-list">{c.items.map(t => <span key={t}>{t}</span>)}</div><div className="card-orbit" aria-hidden="true"/></Reveal></TiltCard>; })}
        <TiltCard><Reveal className="domain-card cta-card"><div className="card-top"><span>NEXT</span><ArrowUpRight size={23}/></div><h3>Have something in mind?</h3><p>If one of these areas fits your idea, I would love to hear about it.</p><div className="tag-list"><Link className="button button-primary" href="/lets-talk">Let&apos;s talk <ArrowUpRight size={15}/></Link></div></Reveal></TiltCard>
      </div>
      <p className="tech-note" style={{ marginTop: 34 }}><span/> Skills are a work in progress — this represents technologies I have worked with or am actively exploring, not proficiency ratings.</p>
    </section>
  </main>;
}
