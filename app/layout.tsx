import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import CursorGlow from '@/components/CursorGlow';

export const metadata: Metadata = {
  title: { default: 'ASAR. — The AI Universe', template: '%s · ASAR.' },
  description: 'The digital universe of Muhammad Usman — Software Engineering undergraduate and freelancer working on AI, machine learning, LLMs, data science and full-stack development.',
  keywords: ['ASAR', 'Muhammad Usman', 'AI Engineer', 'Machine Learning', 'Generative AI', 'RAG', 'Full-Stack Developer', 'Python', 'Freelancer'],
  openGraph: { title: 'ASAR. — The AI Universe', description: 'Dream. Code. Build. Innovate.', type: 'website' }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
    <ScrollProgress />
    <CursorGlow />
    <Navbar />
    {children}
    <Footer />
  </body></html>;
}
