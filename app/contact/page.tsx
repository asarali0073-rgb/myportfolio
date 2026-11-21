import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Github, GraduationCap, Linkedin, MapPin, MessageCircle, Phone, Briefcase, FolderGit2 } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import TiltCard from '@/components/TiltCard';
import { DS_PORTFOLIO, GITHUB, LINKEDIN, PHONE_DISPLAY, PHONE_TEL, PHONE_WA } from '@/lib/site';

export const metadata: Metadata = { title: 'Contact', description: 'Contact Muhammad Usman — phone, WhatsApp, LinkedIn and GitHub. Freelancer open to new projects.' };

export default function ContactPage() {
  return <main>
    <PageHero variant="rings" eyebrow="CONTACT · ALL DETAILS" title={<>Let&apos;s get<br/>in <span>touch.</span></>} text="Everything you need to reach me in one place — call, message on WhatsApp, or connect on LinkedIn and GitHub.">
      <div className="hero-actions"><a className="button button-primary" href={PHONE_TEL}>Call {PHONE_DISPLAY} <Phone size={16}/></a><a className="button button-ghost" href={PHONE_WA} target="_blank" rel="noreferrer">WhatsApp <MessageCircle size={16}/></a></div>
    </PageHero>

    <section className="section-pad">
      <Reveal className="section-heading"><div><span className="section-index">REACH ME</span><h2>Pick the channel<br/><em>that suits you.</em></h2></div><p>I&apos;m a freelancer open to new projects. WhatsApp or a call is the fastest way to reach me.</p></Reveal>
      <div className="domain-grid three">
        <TiltCard><Reveal className="domain-card info-card"><div className="card-top"><span>PHONE · WHATSAPP</span><Phone size={23}/></div><h3>{PHONE_DISPLAY}</h3><p>Call or message me directly on WhatsApp.</p><div className="tag-list"><a className="button button-primary" href={PHONE_TEL}>Call <Phone size={14}/></a><a className="button button-ghost" href={PHONE_WA} target="_blank" rel="noreferrer">WhatsApp <MessageCircle size={14}/></a></div><div className="card-orbit" aria-hidden="true"/></Reveal></TiltCard>
        <TiltCard><Reveal className="domain-card info-card"><div className="card-top"><span>LINKEDIN</span><Linkedin size={23}/></div><h3>Muhammad Usman</h3><p>Connect with me professionally.</p><div className="tag-list"><a className="button button-ghost" href={LINKEDIN} target="_blank" rel="noreferrer">Open LinkedIn <ArrowUpRight size={14}/></a></div><div className="card-orbit" aria-hidden="true"/></Reveal></TiltCard>
        <TiltCard><Reveal className="domain-card info-card"><div className="card-top"><span>GITHUB</span><Github size={23}/></div><h3>asarali0073-rgb</h3><p>Code, experiments and notebooks.</p><div className="tag-list"><a className="button button-ghost" href={GITHUB} target="_blank" rel="noreferrer">Open GitHub <ArrowUpRight size={14}/></a></div><div className="card-orbit" aria-hidden="true"/></Reveal></TiltCard>
        <TiltCard><Reveal className="domain-card info-card"><div className="card-top"><span>DATA SCIENCE</span><FolderGit2 size={23}/></div><h3>Data Science Projects Portfolio</h3><p>A GitHub collection of my data science work.</p><div className="tag-list"><a className="button button-ghost" href={DS_PORTFOLIO} target="_blank" rel="noreferrer">View on GitHub <ArrowUpRight size={14}/></a></div><div className="card-orbit" aria-hidden="true"/></Reveal></TiltCard>
        <TiltCard><Reveal className="domain-card info-card"><div className="card-top"><span>LOCATION</span><MapPin size={23}/></div><h3>Kotli, Azad Kashmir</h3><p>Azad Jammu &amp; Kashmir, Pakistan — working with clients remotely.</p><div className="tag-list"><span>PAKISTAN</span><span>REMOTE-FRIENDLY</span></div><div className="card-orbit" aria-hidden="true"/></Reveal></TiltCard>
        <TiltCard><Reveal className="domain-card info-card"><div className="card-top"><span>AVAILABILITY</span><Briefcase size={23}/></div><h3>Freelancer · Open for projects</h3><p>Software Engineering undergraduate working on AI, LLM applications, data and full-stack web.</p><div className="tag-list"><Link className="button button-primary" href="/lets-talk">Let&apos;s talk <ArrowUpRight size={14}/></Link></div><div className="card-orbit" aria-hidden="true"/></Reveal></TiltCard>
      </div>

      <Reveal className="edu-strip"><GraduationCap size={22}/><div><span className="journey-year">EDUCATION</span><h3>BS Software Engineering — Undergraduate</h3><p>University of Kotli, Azad Jammu &amp; Kashmir · 6th Semester · Expected graduation 2027</p></div></Reveal>
    </section>
  </main>;
}
