import { PageScene } from '@/components/Scenes';
import type { PageVariant } from '@/components/PageCanvas';

export default function PageHero({ eyebrow, title, text, variant, aside, children }: { eyebrow: string; title: React.ReactNode; text: string; variant: PageVariant; aside?: React.ReactNode; children?: React.ReactNode }) {
  return <section className={`page-hero ${aside ? 'has-aside' : ''}`}>
    <PageScene variant={variant} />
    <div className="hero-vignette" aria-hidden="true" />
    <div className="hero-grid" aria-hidden="true" />
    <div className="page-hero-content">
      <div className="eyebrow"><span className="status-dot"/> {eyebrow}</div>
      <h1>{title}</h1>
      <p className="hero-description">{text}</p>
      {children}
    </div>
    {aside && <div className="page-aside">{aside}</div>}
  </section>;
}
