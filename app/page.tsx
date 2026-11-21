import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, BrainCircuit, Code2, Database, Sparkles, Workflow, Network, Github, Linkedin, Layers3, Terminal, Globe2, Phone, MessageCircle, Rocket } from 'lucide-react';
import Reveal from '@/components/Reveal';
import TiltCard from '@/components/TiltCard';
import Typewriter from '@/components/Typewriter';
import { HeroScene } from '@/components/Scenes';
import { GITHUB, LINKEDIN, PHONE_DISPLAY, PHONE_TEL, PHONE_WA, homeTech, sphereTech } from '@/lib/site';

const domains = [
  { n: '01', icon: BrainCircuit, title: 'Artificial Intelligence', text: 'Building intelligent systems that learn from data, recognize patterns and help solve practical problems.', tags: ['Machine Learning', 'Deep Learning', 'Model Development'] },
  { n: '02', icon: Sparkles, title: 'Generative AI & LLMs', text: 'Exploring language models and retrieval-based systems to turn information into useful, context-aware experiences.', tags: ['NLP', 'Transformers', 'LLMs', 'RAG'] },
  { n: '03', icon: Code2, title: 'Full-Stack Development', text: 'Developing modern web experiences and connecting clean interfaces with reliable server-side logic and databases.', tags: ['React', 'Node.js', 'Express.js', 'Firebase'] },
  { n: '04', icon: Database, title: 'Data Science & Automation', text: 'Working with raw data: collecting, cleaning, exploring and extracting insights that support better decisions.', tags: ['Python', 'Pandas', 'Web Scraping', 'Visualization'] }
];

const principles = [
  { icon: Network, title: 'Understand the problem', text: 'Start with the real need, the user and the data — not just the technology.' },
  { icon: Workflow, title: 'Design the system', text: 'Break complex ideas into clear components, workflows and practical milestones.' },
  { icon: Terminal, title: 'Build & improve', text: 'Write, test, learn and iterate. Progress comes from turning concepts into working software.' }
];

const typeWords = ['AI & Machine Learning', 'Generative AI & LLMs', 'Full-Stack Web Apps', 'Data Pipelines & Web Scraping'];
const focus = ['AI Engineering', 'LLM-powered applications', 'Retrieval-Augmented Generation', 'Full-Stack Web (React, Node.js)', 'Intelligent Agents', 'Machine Learning Systems', 'AI APIs & Deployment'];

export default function Home() {
  return <main>
    <section className="hero" id="home">
      <div className="hero-image" aria-hidden="true" />
      <HeroScene />
      <div className="hero-vignette" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-content">
        <div className="eyebrow"><span className="status-dot"/> SOFTWARE ENGINEER · AI · FREELANCER</div>
        <p className="hero-intro">HELLO, I&apos;M MUHAMMAD USMAN</p>
        <h1>Exploring the<br/><span>intelligence</span><br/>behind tomorrow.</h1>
        <p className="hero-description">I work at the intersection of <strong>Artificial Intelligence</strong>, data and software engineering — turning complex ideas into useful digital experiences.</p>
        <p className="hero-type"><span>&gt;</span> Currently into: <Typewriter words={typeWords} /></p>
        <div className="hero-actions">
          <a className="button button-primary" href="#domains">Explore my universe <ArrowDown size={16}/></a>
          <Link className="button button-ghost" href="/lets-talk">Let&apos;s talk <ArrowUpRight size={16}/></Link>
        </div>
        <div className="hero-socials">
          <a href={GITHUB} target="_blank" rel="noreferrer"><Github size={16}/> GitHub <ArrowUpRight size={12}/></a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn <ArrowUpRight size={12}/></a>
          <a href={PHONE_TEL}><Phone size={16}/> {PHONE_DISPLAY}</a>
        </div>
      </div>
      <div className="hero-coordinate"><span>PORTAL 001</span><i/> <span>THE BEGINNING</span></div>
      <a href="#about" className="scroll-cue"><span>SCROLL TO EXPLORE</span><ArrowDown size={14}/></a>
      <div className="hero-side-note">DREAM. CODE. BUILD. INNOVATE.</div>
    </section>

    <div className="marquee" aria-hidden="true"><div className="marquee-track">{[...sphereTech, ...sphereTech].map((t, i) => <span key={i}>{t}<i/></span>)}</div></div>

    <section className="intro-band" id="about">
      <Reveal className="intro-label"><span className="section-index">01 / WHO I AM</span><span className="line"/></Reveal>
      <div className="about-layout">
        <TiltCard><Reveal className="profile-photo"><div className="photo-frame"><Image src="/images/usman.jpg" alt="Muhammad Usman" width={1800} height={2250} quality={92} sizes="(max-width: 650px) 80vw, 340px" priority/><i className="corner c-tl"/><i className="corner c-tr"/><i className="corner c-bl"/><i className="corner c-br"/></div><div className="photo-caption"><div><strong>Muhammad Usman</strong><span>SOFTWARE ENGINEER · FREELANCER</span></div><span className="open-badge"><span className="status-dot"/>OPEN FOR PROJECTS</span></div><div className="photo-orbit" aria-hidden="true"/></Reveal></TiltCard>
        <Reveal className="intro-main"><div><p className="kicker">A curious mind. A builder&apos;s mindset.</p><h2>Not just fascinated by technology.<br/><em>Driven to understand it.</em></h2></div><div className="intro-copy"><p>I&apos;m an <strong>undergraduate Software Engineering student</strong> with a strong interest in Artificial Intelligence and modern software development. I enjoy understanding how intelligent systems work — from data and machine learning to language models — and bringing ideas to life through code.</p><p>Alongside my studies, I work as a <strong>freelancer</strong> — helping clients turn ideas into working software, data solutions and web experiences.</p><p>My approach is simple: keep learning, build with purpose, and make technology useful.</p><span className="location-note"><Globe2 size={15}/> Kotli, Azad Jammu & Kashmir · Pakistan</span></div></Reveal>
      </div>
    </section>

    <section className="domains section-pad" id="domains">
      <Reveal className="section-heading"><div><span className="section-index">02 / WHAT I DO</span><h2>Four directions.<br/><em>One curious mind.</em></h2></div><p>My work and learning revolve around these connected areas of technology.</p></Reveal>
      <div className="domain-grid">{domains.map((item) => { const Icon = item.icon; return <TiltCard key={item.n}><Reveal className="domain-card"><div className="card-top"><span>{item.n} / FIELD</span><Icon size={23}/></div><h3>{item.title}</h3><p>{item.text}</p><div className="tag-list">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="card-orbit" aria-hidden="true"/></Reveal></TiltCard>; })}</div>
    </section>

    <section className="technology section-pad" id="technology">
      <Reveal className="section-heading"><div><span className="section-index">03 / TECH STACK</span><h2>The tools behind<br/><em>the thinking.</em></h2></div><p>A quick look at what I work with. The full breakdown — with details for every area — lives on its own page.</p></Reveal>
      <div className="tech-brief">{homeTech.map(group => <Reveal className="tech-group" key={group.label}><h3>{group.label}</h3><div className="tech-pills">{group.items.map(item => <span key={item}>{item}</span>)}</div></Reveal>)}</div>
      <Reveal className="section-cta"><Link className="button button-primary" href="/tech-stack">See the full tech stack <ArrowUpRight size={16}/></Link><p className="tech-note"><span/> Skills are a work in progress — this represents technologies I have worked with or am actively exploring, not proficiency ratings.</p></Reveal>
    </section>

    <section className="approach section-pad">
      <Reveal className="section-heading"><div><span className="section-index">04 / HOW I THINK</span><h2>From curiosity<br/><em>to creation.</em></h2></div><p>Good engineering is more than writing code. It is a process of asking better questions and making thoughtful decisions.</p></Reveal>
      <div className="principle-grid">{principles.map((p, i) => { const Icon = p.icon; return <Reveal key={p.title} className="principle"><span className="principle-number">0{i+1}</span><Icon size={25}/><h3>{p.title}</h3><p>{p.text}</p></Reveal>; })}</div>
    </section>

    <section className="journey section-pad" id="journey">
      <Reveal className="section-heading"><div><span className="section-index">05 / THE JOURNEY</span><h2>Always learning.<br/><em>Always building.</em></h2></div><p>Shaped by university study, self-directed learning, practical work and a commitment to keep moving forward.</p></Reveal>
      <Reveal className="journey-panel"><div className="journey-mark"><Layers3 size={30}/><span>THE FOUNDATION</span></div><div className="journey-details">
        <span className="journey-year">EDUCATION · UNDERGRADUATE</span><h3>Bachelor of Science in Software Engineering</h3><p>University of Kotli, Azad Jammu & Kashmir</p><p className="journey-sub">6th Semester · Expected graduation 2027</p>
        <div className="journey-divider"/>
        <span className="journey-year">BEYOND THE CLASSROOM</span><p className="journey-sub">About 1.5 years of self-directed, project-based learning across Python data workflows, web data collection, Transformer components and LLM applications.</p>
        <div className="journey-divider"/>
        <span className="journey-year">AREAS OF DEEPER EXPLORATION</span><div className="journey-focus">{focus.map(f => <span key={f}>{f}</span>)}</div>
        <div className="journey-divider"/>
        <Link className="up-next" href="/projects"><Rocket size={16}/><span><b>UP NEXT</b> — Projects showcase, coming soon</span><ArrowUpRight size={14}/></Link>
      </div></Reveal>
    </section>

    <section className="contact section-pad" id="contact">
      <Reveal className="contact-inner"><span className="section-index">06 / OPEN TO CONNECTIONS</span><div className="contact-glow" aria-hidden="true"/><h2>Have an idea?<br/><em>Let&apos;s make it real.</em></h2><p>I&apos;m a freelancer open to new projects — and always happy to connect with curious people, talk technology and build something useful together.</p>
        <div className="contact-actions"><Link className="button button-primary" href="/lets-talk">Let&apos;s talk <ArrowUpRight size={16}/></Link><Link className="button button-ghost" href="/contact">All contact details <ArrowUpRight size={16}/></Link></div>
        <div className="contact-phone"><a href={PHONE_TEL}><span className="phone-icon"><Phone size={16}/></span> {PHONE_DISPLAY}</a><a href={PHONE_WA} target="_blank" rel="noreferrer"><span className="phone-icon"><MessageCircle size={16}/></span> WhatsApp</a></div></Reveal>
    </section>
  </main>;
}
