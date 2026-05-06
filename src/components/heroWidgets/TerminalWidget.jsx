import { useEffect, useRef, useState } from 'react';
import './TerminalWidget.css';

const LINES = [
  { delay: 0,    text: '$ whoami',                       type: 'cmd' },
  { delay: 600,  text: 'ekki_gunawan',                   type: 'out' },
  { delay: 1000, text: '$ cat skills.txt',               type: 'cmd' },
  { delay: 1600, text: '→ Python  FastAPI  React  .NET', type: 'out' },
  { delay: 1900, text: '→ Gemini API  ChatGPT  LangChain',type: 'out' },
  { delay: 2200, text: '→ AWS EC2  Azure  Vercel  Render',type: 'out' },
  { delay: 2500, text: '→ OWASP  Pen Testing  MFA',      type: 'out' },
  { delay: 3000, text: '$ ls projects/',                 type: 'cmd' },
  { delay: 3600, text: 'resume-ai/   chatbot/   pdf-tools/   secure-share/', type: 'out' },
  { delay: 4200, text: '$ git log --oneline -3',         type: 'cmd' },
  { delay: 4800, text: 'a1b2c3d feat: add SSE streaming to resume AI', type: 'out' },
  { delay: 5100, text: 'e4f5g6h fix: OWASP Top 10 vulnerabilities patched', type: 'out' },
  { delay: 5400, text: 'i7j8k9l init: AI chatbot with intent extraction', type: 'out' },
  { delay: 6000, text: '$ echo $STATUS',                 type: 'cmd' },
  { delay: 6600, text: 'open_to_opportunities=true',     type: 'out', highlight: true },
  { delay: 7200, text: '$ _',                            type: 'cmd' },
];

export default function TerminalWidget() {
  const [visible, setVisible] = useState([]);
  const bodyRef  = useRef(null);
  const timers   = useRef([]);

  useEffect(() => {
    setVisible([]);
    timers.current.forEach(clearTimeout);
    timers.current = LINES.map((line, i) =>
      setTimeout(() => setVisible(v => [...v, i]), line.delay)
    );
    return () => timers.current.forEach(clearTimeout);
  }, []);

  // Scroll the terminal body itself — never the page
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [visible]);

  // Block wheel events from bubbling to the page
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const stop = (e) => {
      const atTop    = el.scrollTop === 0 && e.deltaY < 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight && e.deltaY > 0;
      if (!atTop && !atBottom) e.stopPropagation();
    };
    el.addEventListener('wheel', stop, { passive: true });
    return () => el.removeEventListener('wheel', stop);
  }, []);

  return (
    <div className="terminal-wrap">
      <div className="terminal-bar">
        <span className="terminal-dot red" />
        <span className="terminal-dot yellow" />
        <span className="terminal-dot green" />
        <span className="terminal-title">ekki@portfolio: ~</span>
      </div>
      <div className="terminal-body" ref={bodyRef}>
        {LINES.map((line, i) =>
          visible.includes(i) ? (
            <div key={i} className={`terminal-line ${line.type}${line.highlight ? ' highlight' : ''}`}>
              {line.type === 'cmd' && <span className="terminal-prompt">❯ </span>}
              <span className="terminal-text">{line.text.replace(/^\$ /, '')}</span>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}