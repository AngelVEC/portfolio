import { useRef, useEffect } from 'react';
import './About.css';

function FadeSection({ children, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('visible'); },
      { threshold: 0.1 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`fade-section ${className}`}>{children}</div>;
}

const INFO_ITEMS = [
  { icon: '📍', label: 'Location',  value: 'Auckland, New Zealand' },
  { icon: '🎓', label: 'Education', value: 'Master of Information Technology' },
  { icon: '💼', label: 'Status',    value: 'Open to opportunities' },
  { icon: '⚡', label: 'Focus',     value: 'Full-stack + AI Integration' },
  { icon: '🌐', label: 'Languages', value: 'English, Indonesian' },
];

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="section-wrap">
        <FadeSection>
          <p className="section-label">About Me</p>
          <h2 className="section-title">Who I Am</h2>
        </FadeSection>

        <div className="about-grid">
          <FadeSection>
            <div className="about-text">
              <p>
                I'm a <strong>software developer</strong> specialising in full-stack web
                development and AI integration. I thrive at the intersection of clean code
                and intelligent systems.
              </p>
              <p>
                I had recently graduated from my master's in information technology, where I applied my skills
                on the internship at a startups company to deliver a scalable web application with interactive frontend and robust backend.
                Since then, I've been focused polishing myself on building AI-powered products that solve real problems and automate the tedious process.
              </p>
              <p>
                When I'm not coding, I'm exploring the latest news regarding <strong>Cyber Security</strong>.  
                I believe that to write a robust web application, security should be the top priority.
              </p>
            </div>
          </FadeSection>

          <FadeSection>
            <div className="about-card">
              <div className="about-card-top-bar" />
              {INFO_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className={`about-card-item${i === INFO_ITEMS.length - 1 ? ' last' : ''}`}
                >
                  <div className="about-icon">{item.icon}</div>
                  <div>
                    <div className="about-card-label">{item.label}</div>
                    <div className="about-card-value">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeSection>
        </div>
      </div>
    </section>
  );
}
