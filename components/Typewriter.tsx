'use client';
import { useEffect, useState } from 'react';

export default function Typewriter({ words }: { words: string[] }) {
  const [text, setText] = useState(words[0] ?? '');
  const key = words.join('|');
  useEffect(() => {
    if (!words.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let w = 0;
    let i = words[0].length;
    let deleting = true;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = words[w];
      i += deleting ? -1 : 1;
      setText(word.slice(0, i));
      let delay = deleting ? 35 : 70;
      if (!deleting && i === word.length) { deleting = true; delay = 1800; }
      else if (deleting && i === 0) { deleting = false; w = (w + 1) % words.length; delay = 300; }
      t = setTimeout(tick, delay);
    };
    t = setTimeout(tick, 1800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return <span className="typewriter">{text}<i className="caret" aria-hidden="true" /></span>;
}
