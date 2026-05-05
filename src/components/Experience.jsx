import { useRef, useEffect } from 'react';
import './Experience.css';

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

const JOBS = [
  {
    active: true,
    date: 'Sep 2024 — May 2025',
    role: 'Software Developer (Internship)',
    company: 'AdviserAide Ltd. — Auckland, New Zealand',
    link: 'https://www.adviseraide.com/',
    bullets: [
      'Developed and enhanced front-end components for the company website, improving interface responsiveness and overall user experience.',
      'Conducted code reviews, debugging, and functionality testing to maintain code quality and ensure system stability after new feature integration.',
      'Worked as sole backend developer for the PDF-Form tools system, independently designing and implementing core backend logic to handle PDF form processing and data management.',
      'Performed a penetration test under supervision and communicated findings to the team.',
    ],
  },
  {
    date: 'Dec 2019 — Feb 2020',
    role: 'Full Stack Developer (Contract)',
    company: 'Best Partner Education Pty Ltd. - Indonesia',
    bullets: [
      'Designed and implemented a new feature for the company\'s online learning platform, enabling students to download their course material from the web interface.',
      'Collaborated with the owner of the business to redesign their existing website, improving the UI/UX and optimizing performance.',
      
    ]
  }
];

const EDUCATION = [
  {
    date: 'May 2024 — Dec 2025',
    degree: 'Master of Information Technology',
    school: 'Auckland Institute of Studies',
  },
  {
    date: 'Mar 2021 — Mar 2023',
    degree: 'B.Sc. Cyber Security',
    school: 'University of Wollongong',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="exp-section">
      <div className="section-wrap">

        {/* Work Experience */}
        <FadeSection>
          <p className="section-label">Career</p>
          <h2 className="section-title">Experience</h2>
        </FadeSection>

        <div className="exp-timeline">
          {JOBS.map((job, i) => (
            <FadeSection key={i} style={{ transitionDelay: `${i * 0.12}s` }}>
              <div className={`exp-item${job.active ? ' active' : ''}${i === JOBS.length - 1 ? ' last' : ''}`}>
                <div className="exp-dot" />
                <div className="exp-date">{job.date}</div>
                <div className="exp-role">{job.role}</div>
                <div className="exp-company">
                  {job.link
                    ? <a href={job.link} target="_blank" rel="noreferrer" className="exp-company-link">{job.company}</a>
                    : job.company
                  }
                </div>
                <ul className="exp-bullets">
                  {job.bullets.map((b, j) => (
                    <li key={j}>
                      <span className="exp-arrow">→</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeSection>
          ))}
        </div>

        {/* Education */}
        <FadeSection style={{ marginTop: '5rem' }}>
          <p className="section-label">Academic</p>
          <h2 className="section-title">Education</h2>
        </FadeSection>

        <div className="edu-grid">
          {EDUCATION.map((edu, i) => (
            <FadeSection key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="edu-card">
                <div className="edu-card-top-bar" />
                <div className="edu-date">{edu.date}</div>
                <div className="edu-degree">{edu.degree}</div>
                <div className="edu-school">{edu.school}</div>
              </div>
            </FadeSection>
          ))}
        </div>

      </div>
    </section>
  );
}
