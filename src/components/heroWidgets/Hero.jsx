import { useState, useEffect } from 'react';
import HeroWidget from './HeroWidget';
import './Hero.css';

const TYPEWRITER_WORDS = [
  'secure web apps',
  'AI-powered tools',
  'full-stack solutions',
  'clean interfaces',
];

function TypeWriter({ words }) {
  const [display, setDisplay]   = useState('');
  const [wordIdx, setWordIdx]   = useState(0);
  const [charIdx, setCharIdx]   = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout;
    if (!deleting && charIdx < word.length) {
      timeout = setTimeout(() => setCharIdx((i) => i + 1), 80);
    } else if (!deleting && charIdx === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((i) => i - 1), 40);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }
    setDisplay(word.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words]);

  return (
    <span className="typewriter">
      {display}
      <span className="typewriter-cursor" />
    </span>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="hero">

      {/* ── Left: text content ── */}
      <div className="hero-inner">
        <p className="hero-tag">
          <span className="hero-tag-line" />
          Software Developer &amp; Security Enthusiast
        </p>

        <h1 className="hero-name">
          Hello,<br />
          I'm <span className="hero-highlight">Ekki</span><br />
          <span className="hero-highlight">Gunawan.</span>
        </h1>

        <p className="hero-subtitle">
          I build{' '}
          <strong className="hero-subtitle-strong">
            <TypeWriter words={TYPEWRITER_WORDS} />
          </strong>
        </p>
        <p className="hero-desc">
          From clean frontends to intelligent backends — shipping software that
          solves real problems, built securely from the ground up.
        </p>

        <div className="hero-cta">
          <a href="#projects"   className="btn-primary">View My Work</a>
          <a href="#experience" className="btn-secondary">My Experience</a>
        </div>

        <div className="hero-links">
          <a href="https://github.com/AngelVEC" target="_blank" rel="noreferrer" className="hero-pill">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="hero-pill-icon">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            GitHub
          </a>
          <a href="mailto:Gunawanekki@gmail.com" className="hero-pill">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="hero-pill-icon">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Gunawanekki@gmail.com
          </a>
          <a href="tel:0225042564" className="hero-pill">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="hero-pill-icon">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            022 504 2564
          </a>
        </div>

        <div className="hero-stats">
          {[
            ['2+',  'Years Experience'],
            ['10+', 'Projects'],
            ['3+',  'AI Integrations'],
          ].map(([num, label]) => (
            <div key={label} className="stat-item">
              <div className="stat-num">{num}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: particle constellation ── */}
      <div className="hero-canvas-wrap">
        
        <HeroWidget />
      </div>

      <div className="scroll-hint">
        <div className="scroll-line" />
        Scroll
      </div>
    </section>
  );
}
