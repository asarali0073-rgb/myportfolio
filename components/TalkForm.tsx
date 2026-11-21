'use client';
import { useState } from 'react';
import { Send } from 'lucide-react';

const types = ['AI / LLM app', 'RAG / Document Q&A', 'Full-stack web app', 'Data collection & scraping', 'Something else'];

export default function TalkForm({ number }: { number: string }) {
  const [name, setName] = useState('');
  const [sel, setSel] = useState<string[]>([]);
  const [msg, setMsg] = useState('');
  const toggle = (t: string) => setSel((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));
  const text = [`Hi Usman${name.trim() ? `, I'm ${name.trim()}` : ''}.`, sel.length ? `I'm interested in: ${sel.join(', ')}.` : '', msg.trim()].filter(Boolean).join(' ');
  const href = `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  return <div className="talk-form">
    <label className="field"><span>YOUR NAME</span><input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Ali Khan" maxLength={60} /></label>
    <div className="field"><span>WHAT DO YOU NEED?</span>
      <div className="chips">{types.map((t) => <button type="button" key={t} className={sel.includes(t) ? 'chip on' : 'chip'} aria-pressed={sel.includes(t)} onClick={() => toggle(t)}>{t}</button>)}</div>
    </div>
    <label className="field"><span>TELL ME ABOUT YOUR IDEA</span><textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="A few lines about what you want to build…" rows={4} maxLength={600} /></label>
    <div className="wa-preview" aria-live="polite"><span>MESSAGE PREVIEW</span><p>{text}</p></div>
    <a className="button button-primary" href={href} target="_blank" rel="noreferrer">Send on WhatsApp <Send size={15}/></a>
  </div>;
}
