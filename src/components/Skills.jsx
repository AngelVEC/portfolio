import { useRef, useEffect } from 'react';
import './Skills.css';

function FadeSection({ children, style }) {
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
  return <div ref={ref} className="fade-section" style={style}>{children}</div>;
}

const SKILL_CARDS = [
  {
    icon: '⬡',
    title: 'Frontend Development',
    desc: 'Building responsive, interactive UIs with modern frameworks and clean component architecture.',
    tags: ['React', 'JavaScript', 'HTML/CSS'],
  },
  {
    icon: '⬡',
    title: 'Backend & APIs',
    desc: 'Designing and implementing robust server-side logic, REST APIs, and data management systems.',
    tags: ['Python', 'FastAPI', '.NET', 'Java', 'Bash', 'PowerShell'],
  },
  {
    icon: '⬡',
    title: 'AI Integration',
    desc: 'Building AI-powered features using LLM APIs including real-time streaming, RAG pipelines, and intent extraction.',
    tags: ['Gemini API', 'ChatGPT API', 'SSE Streaming', 'LLM Prompting'],
  },
  {
    icon: '⬡',
    title: 'Cloud & Deployment',
    desc: 'Deploying and managing production applications across cloud platforms with a focus on reliability.',
    tags: ['AWS EC2', 'Azure Blob', 'Vercel', 'Render'],
  },
  {
    icon: '⬡',
    title: 'Database',
    desc: 'Designing and maintaining relational and non-relational databases for scalable data storage.',
    tags: ['SQL', 'SQLite', 'NoSQL', 'Firestore'],
  },
  {
    icon: '⬡',
    title: 'Cyber Security',
    desc: 'Conducting penetration testing, vulnerability assessments, and implementing security best practices based on OWASP.',
    tags: ['OWASP Top 10', 'Pen Testing', 'API Security', 'MFA', 'Encryption'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="section-wrap">
        <FadeSection>
          <p className="section-label">Capabilities</p>
          <h2 className="section-title">Skills &amp; Tools</h2>
        </FadeSection>

        <div className="skills-grid">
          {SKILL_CARDS.map((card, i) => (
            <FadeSection key={i} style={{ transitionDelay: `${i * 0.07}s`, height: '100%' }}>
              <div className="skill-card">
                {/* top section: icon + title + desc — grows to fill space */}
                <div className="skill-card-top">
                  <span className="skill-card-icon">{card.icon}</span>
                  <div className="skill-card-title">{card.title}</div>
                  <p className="skill-card-desc">{card.desc}</p>
                </div>

                {/* divider */}
                <div className="skill-card-divider" />

                {/* tag area — scrollable if overflow */}
                <div className="skill-tags-scroll">
                  {card.tags.map((t) => (
                    <span key={t} className="skill-tag-box">{t}</span>
                  ))}
                </div>
              </div>
            </FadeSection>
          ))}
        </div>

        {/* Certifications row */}
        <FadeSection style={{ marginTop: '3rem' }}>
          <div className="certs-row">
            <div className="cert-label">Certifications</div>
            <div className="certs-list">
              <a
                href="https://www.credly.com/badges/a3f295dc-a53e-4eaf-9fd7-31c159ad82cd"
                target="_blank"
                rel="noreferrer"
                className="cert-item cert-link"
              >
                <span className="cert-dot" />
                AWS Academy Graduate — Cloud Foundations
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="cert-link-icon">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
              <a
                href="https://www.credly.com/badges/89d9a089-cc98-4a44-a8cf-1e23be1d7070/"
                target="_blank"
                rel="noreferrer"
                className="cert-item cert-link"
              >
                <span className="cert-dot" />
                API Penetration Testing — APIsec University
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="cert-link-icon">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </div>
        </FadeSection>
      </div>
    </section>
  );
}