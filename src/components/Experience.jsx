import { Reveal } from '../hooks/useScrollReveal.jsx';
import './Experience.css';

const JOBS = [
  {
    active: true,
    date: 'Sep 2024 — May 2025',
    role: 'Software Developer Intern',
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
        <Reveal variant="fade-in">
          <p className="section-label">Career</p>
        </Reveal>
        <Reveal variant="fade-section" delay="0.05s">
          <h2 className="section-title">Experience</h2>
        </Reveal>

        <div className="exp-timeline">
          {JOBS.map((job, i) => (
            <Reveal key={i} variant="fade-left" delay={`${i * 0.12}s`}>
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
                    <li key={j} style={{ transitionDelay: `${0.1 + j * 0.06}s` }}>
                      <span className="exp-arrow">→</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Education */}
        <Reveal variant="fade-in" style={{ marginTop: '5rem' }}>
          <p className="section-label">Academic</p>
        </Reveal>
        <Reveal variant="fade-section" delay="0.05s">
          <h2 className="section-title">Education</h2>
        </Reveal>

        <div className="edu-grid">
          {EDUCATION.map((edu, i) => (
            <Reveal key={i} variant="fade-scale" delay={`${i * 0.12}s`}>
              <div className="edu-card">
                <div className="edu-card-top-bar" />
                <div className="edu-date">{edu.date}</div>
                <div className="edu-degree">{edu.degree}</div>
                <div className="edu-school">{edu.school}</div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}