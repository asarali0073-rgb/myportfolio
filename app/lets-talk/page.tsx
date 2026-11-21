import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, BrainCircuit, Code2, Database, Phone, Search, Linkedin } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import TiltCard from '@/components/TiltCard';
import TalkForm from '@/components/TalkForm';
import { LINKEDIN, PHONE_DISPLAY, PHONE_TEL, WA_NUMBER } from '@/lib/site';

export const metadata: Metadata = { title: "Let's talk", description: "Have an idea? Let's talk. Muhammad Usman is a freelancer open to AI, LLM, data and full-stack web projects." };

const help = [
  { icon: BrainCircuit, title: 'AI & LLM applications', text: 'Chatbots, assistants and AI-powered features connected to language models through APIs.' },
  { icon: Search, title: 'RAG & document Q&A', text: 'Pipelines that let a language model answer from your own documents, grounded in the source.' },
  { icon: Code2, title: 'Full-stack web apps', text: 'Responsive React interfaces with Node.js or Flask backends, authentication and databases.' },
  { icon: Database, title: 'Data collection & cleaning', text: 'Web scraping, preprocessing and clean, structured datasets ready for analysis or AI.' }
];
const steps = [
  ['01', 'Share your idea', 'Tell me what you want to build and what problem it should solve.'],
  ['02', 'We shape the plan', 'We agree on scope, features and a practical timeline together.'],
  ['03', 'I build & improve', 'I build it step by step, share progress and refine it with your feedback.']
];

export default function LetsTalkPage() {
  return <main>
    <PageHero variant="wave" eyebrow="LET'S TALK · OPEN FOR PROJECTS" title={<>Have an idea?<br/><span>Let&apos;s make it real.</span></>} text="I'm a freelancer — I enjoy turning ideas into working software. Tell me what you have in mind and we can take it from there.">
      <div className="hero-actions"><a className="button button-primary" href="#message">Write a message <ArrowUpRight size={16}/></a><a className="button button-ghost" href={PHONE_TEL}>Call {PHONE_DISPLAY} <Phone size={16}/></a></div>
    </PageHero>

    <section className="section-pad">
      <Reveal className="section-heading"><div><span className="section-index">HOW I CAN HELP</span><h2>Where we could<br/><em>work together.</em></h2></div><p>These are the areas I work in — if your idea sits somewhere between them, that is fine too.</p></Reveal>
      <div className="domain-grid">{help.map((h, i) => { const Icon = h.icon; return <TiltCard key={h.title}><Reveal className="domain-card"><div className="card-top"><span>{String(i + 1).padStart(2, '0')} / SERVICE</span><Icon size={23}/></div><h3>{h.title}</h3><p>{h.text}</p><div className="card-orbit" aria-hidden="true"/></Reveal></TiltCard>; })}</div>
    </section>

    <section className="approach section-pad">
      <Reveal className="section-heading"><div><span className="section-index">HOW IT WORKS</span><h2>From message<br/><em>to making it.</em></h2></div><p>A simple, transparent way of working.</p></Reveal>
      <div className="principle-grid">{steps.map(([n, t, x]) => <Reveal key={n} className="principle"><span className="principle-number">{n}</span><h3>{t}</h3><p>{x}</p></Reveal>)}</div>
    </section>

    <section className="section-pad message-section" id="message">
      <Reveal className="section-heading"><div><span className="section-index">START THE CONVERSATION</span><h2>Send me<br/><em>a message.</em></h2></div><p>Fill this in and it opens WhatsApp with your message ready to send. Nothing is stored on this website.</p></Reveal>
      <Reveal className="talk-layout"><TalkForm number={WA_NUMBER} />
        <div className="talk-side"><span className="journey-year">PREFER ANOTHER WAY?</span>
          <a className="side-link" href={PHONE_TEL}><Phone size={16}/> Call {PHONE_DISPLAY} <ArrowUpRight size={13}/></a>
          <a className="side-link" href={LINKEDIN} target="_blank" rel="noreferrer"><Linkedin size={16}/> Message on LinkedIn <ArrowUpRight size={13}/></a>
          <Link className="side-link" href="/contact">All contact details <ArrowUpRight size={13}/></Link>
        </div>
      </Reveal>
    </section>
  </main>;
}
