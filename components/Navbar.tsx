'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { navLinks } from '@/lib/site';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const close = () => setOpen(false);
  return <header className={`site-header ${scrolled || open ? 'is-scrolled' : ''}`}>
    <Link className="brand" href="/" aria-label="ASAR home" onClick={close}>ASAR<span>.</span><small>THE AI UNIVERSE</small></Link>
    <nav className={open ? 'nav-links nav-open' : 'nav-links'} aria-label="Main navigation">
      {navLinks.map(([label, href]) => <Link key={href} href={href} onClick={close} className={pathname === href ? 'active' : ''} aria-current={pathname === href ? 'page' : undefined}>{label}</Link>)}
      <Link className={`nav-contact ${pathname === '/lets-talk' ? 'active' : ''}`} href="/lets-talk" onClick={close}>Let&apos;s talk <ArrowUpRight size={14}/></Link>
    </nav>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X/> : <Menu/>}</button>
  </header>;
}
