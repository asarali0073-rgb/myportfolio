import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Lock } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import TiltCard from '@/components/TiltCard';

export const metadata: Metadata = { title: 'Projects', description: 'Projects by Muhammad Usman — the showcase is coming soon.' };

const areas = ['AI & LLM applications', 'Retrieval-Augmented Generation', 'Full-stack web development'];

export default function ProjectsPage() {
  return <main>
    <PageHero variant="cube" eyebrow="PROJECTS · COMING SOON" title={<>Something is<br/><span>being built.</span></>} text="My project showcase is on its way. I'm putting together a polished collection of selected work — it will appear here in about a month. Check back soon.">
      <div className="build-bar" role="progressbar" aria-label="Showcase in preparation" aria-valuetext="In preparation"><i/></div>
      <p className="build-note">PREPARING THE SHOWCASE…</p>
      <div className="hero-actions"><Link className="button button-primary" href="/lets-talk">Have a project in mind? <ArrowUpRight size={16}/></Link><Link className="button button-ghost" href="/tech-stack">See what I work with <ArrowUpRight size={16}/></Link></div>
    </PageHero>

    <section className="section-pad">
      <Reveal className="section-heading"><div><span className="section-index">UPCOMING</span><h2>The showcase<br/><em>opens soon.</em></h2></div><p>Each project will come with the problem, the approach and what I learned building it. Areas you can expect:</p></Reveal>
      <div className="soon-grid">{areas.map((a, i) => <TiltCard key={a}><Reveal className="domain-card soon-card"><div className="card-top"><span>PROJECT {String(i + 1).padStart(2, '0')}</span><Lock size={21}/></div><h3>Coming soon</h3><div className="skeleton"><i/><i/><i/></div><div className="tag-list"><span>{a}</span><span>UPCOMING</span></div><div className="card-orbit" aria-hidden="true"/></Reveal></TiltCard>)}</div>
    </section>
  </main>;
}
