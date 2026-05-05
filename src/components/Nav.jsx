import { useState, useEffect } from 'react';
import './Nav.css';

const NAV_SECTIONS = ['about', 'skills', 'projects', 'experience'];

export default function Nav() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const ids = ['hero', ...NAV_SECTIONS];
    const handler = () => {
      let current = 'hero';
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) current = id;
      });
      setActive(current);
    };
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className="nav">
      <a href="#hero" className="nav-logo">
        Ekki<span className="nav-logo-dot">.</span>Gunawan
      </a>

      <ul className="nav-links">
        {NAV_SECTIONS.map((id) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`nav-link${active === id ? ' active' : ''}`}
            >
              {id}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-status">
        <span className="status-dot" />
        Available for hire
      </div>
    </nav>
  );
}
