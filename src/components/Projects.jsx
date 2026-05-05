import { Reveal } from '../hooks/useScrollReveal.jsx';
import './Projects.css';

function IconLink() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="proj-link-icon">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
function IconGithub() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="proj-link-icon">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

const PROJECTS = [
  {
    num: '01 / Featured',
    badge: 'Live',
    title: 'Resume AI',
    desc: 'AI-powered resume and cover letter generator with real-time streaming via Server-Sent Events. Features a split-screen editor, section-by-section AI rewriting, ATS match scoring, PDF/DOCX parsing, and three downloadable resume templates.',
    stack: ['Python', 'FastAPI', 'React', 'Gemini API', 'Vercel', 'Render'],
    demoHref: 'https://ai-resume-git.vercel.app/',
    githubHref: 'https://github.com/AngelVEC/Ai-Resume-Frontend',
  },
  {
    num: '02',
    title: 'AI-Powered Product Recommendation Chatbot',
    desc: 'A chatbot that recommends products from a database using natural language queries. Uses LLM-based intent extraction to convert user input into structured search filters, with conversational memory to maintain context across the session.',
    stack: ['Python', 'Gemini Flash', 'SQLite'],
    githubHref: 'https://github.com/AngelVEC/AI-Chatbot-With-Item-Recommendation',
  },
  {
    num: '03',
    title: 'PDF-Form Tools',
    desc: 'Web-based platform for uploading and completing PDF forms digitally. Includes automated form-field detection, manual field adjustment, and a full backend for processing and storing user-submitted form data.',
    stack: ['.NET', 'SQLite', 'Azure Blob'],
  },
  {
    num: '04',
    title: 'Secure File Sharing',
    desc: 'A secure file-sharing platform with end-to-end encryption using Shamir\'s Secret Sharing. Integrates Gmail API for MFA authentication, AWS EC2 management, and Firestore for NoSQL storage. Includes a full OWASP Top 10 penetration test with documented findings.',
    stack: ['Python', 'AWS EC2', 'Firestore', 'Gmail API', 'MFA', 'OWASP'],
  },
  {
    num: '05',
    title: 'Restaurant Website',
    desc: 'A responsive website for a restaurant',
    stack: ['React', '.NET', 'GraphQL', 'PostgreSQL'],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="section-wrap">

        <Reveal variant="fade-in">
          <p className="section-label">Selected Work</p>
        </Reveal>
        <Reveal variant="fade-section" delay="0.05s">
          <h2 className="section-title">Projects</h2>
        </Reveal>

        <div className="projects-list">
          {PROJECTS.map((p, i) => (
            <Reveal key={i} variant="fade-section" delay={`${i * 0.1}s`}>
              <div className="project-card">
                <div className="project-body">
                  <div className="project-num">{p.num}</div>
                  <div className="project-title">{p.title}</div>
                  <p className="project-desc">{p.desc}</p>
                  <div className="project-stack">
                    {p.stack.map((t) => <span key={t} className="skill-tag-box">{t}</span>)}
                  </div>
                </div>

                <div className="project-links">
                  {p.badge && <span className="project-badge">{p.badge}</span>}
                  {p.demoHref && (
                    <a href={p.demoHref} className="project-link" target="_blank" rel="noreferrer">
                      <IconLink /> Demo
                    </a>
                  )}
                  {p.githubHref && (
                    <a href={p.githubHref} className="project-link" target="_blank" rel="noreferrer">
                      <IconGithub /> GitHub
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}