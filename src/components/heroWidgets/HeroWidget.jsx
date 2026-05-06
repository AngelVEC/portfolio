import { useState, useCallback } from 'react';
import ParticleCanvas  from './ParticleCanvas';
import TerminalWidget  from './TerminalWidget';
import SnakeGame       from './SnakeGame';
import CodeRain        from './CodeRain';
import './HeroWidget.css';

const WIDGETS = [
  { id: 'terminal',  label: 'terminal',   icon: '❯_', component: <TerminalWidget /> },
  { id: 'particles', label: 'particles',  icon: '✦', component: <ParticleCanvas /> },
  { id: 'snake',     label: 'snake.exe',  icon: '◈', component: <SnakeGame /> },
];

//   { id: 'rain',      label: 'code rain',  icon: '⋮⋮', component: <CodeRain /> },

export default function HeroWidget() {
  const [idx, setIdx]       = useState(0);
  const [dir, setDir]       = useState(null); // 'left' | 'right'
  const [animKey, setAnimKey] = useState(0);

  const go = useCallback((step) => {
    setDir(step > 0 ? 'right' : 'left');
    setAnimKey(k => k + 1);
    setIdx(i => (i + step + WIDGETS.length) % WIDGETS.length);
  }, []);

  const current = WIDGETS[idx];

  return (
    <div className="hw-wrap">
      {/* top bar */}
      <div className="hw-bar">
        <div className="hw-dots">
          {WIDGETS.map((w, i) => (
            <button
              key={w.id}
              className={`hw-dot${i === idx ? ' active' : ''}`}
              onClick={() => { setDir(i > idx ? 'right' : 'left'); setAnimKey(k=>k+1); setIdx(i); }}
              title={w.label}
            />
          ))}
        </div>
        <span className="hw-label">{current.icon} {current.label}</span>
      </div>

      {/* widget area */}
      <div className="hw-stage">
        <div key={animKey} className={`hw-panel hw-enter-${dir}`}>
          {current.component}
        </div>

        {/* prev / next arrows */}
        <button className="hw-arrow hw-arrow-left"  onClick={() => go(-1)}>&#8249;</button>
        <button className="hw-arrow hw-arrow-right" onClick={() => go(+1)}>&#8250;</button>
      </div>
    </div>
  );
}
