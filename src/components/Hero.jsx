import { useState, useEffect } from 'react';
import './Hero.css';

const TYPEWRITER_WORDS = [
  'web applications',
  'AI-powered products',
  'scalable backends',
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
      <div className="hero-inner">

        <p className="hero-tag">
          <span className="hero-tag-line" />
          Full-Stack Developer &amp; AI Integrator
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
          From clean frontends to intelligent backends — shipping software that solves real problems.
        </p>

        <div className="hero-cta">
          <a href="#projects"   className="btn-primary">View My Work</a>
          <a href="#experience" className="btn-secondary">My Experience</a>
        </div>

        <div className="hero-stats">
          {[
            ['2+',  'Years Experience'],
            ['10+', 'Projects'],
            ['3+', 'AI Integrations'],
          ].map(([num, label]) => (
            <div key={label} className="stat-item">
              <div className="stat-num">{num}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="scroll-hint">
        <div className="scroll-line" />
        Scroll
      </div>
    </section>
  );
}
