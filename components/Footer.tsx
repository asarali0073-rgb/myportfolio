import Link from 'next/link';
import { Phone } from 'lucide-react';
import { navLinks, PHONE_DISPLAY, PHONE_TEL } from '@/lib/site';

export default function Footer() {
  return <footer className="footer">
    <Link className="brand" href="/">ASAR<span>.</span><small>THE AI UNIVERSE</small></Link>
    <nav className="footer-links" aria-label="Footer navigation">
      {[...navLinks, ['Let’s talk', '/lets-talk'] as [string, string]].map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
    </nav>
    <a className="footer-phone" href={PHONE_TEL}><Phone size={12}/> {PHONE_DISPLAY}</a>
    <span>© {new Date().getFullYear()} ASAR. Built with curiosity.</span>
  </footer>;
}
