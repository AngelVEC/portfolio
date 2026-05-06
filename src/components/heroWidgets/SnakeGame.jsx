import { useEffect, useRef, useState, useCallback } from 'react';
import './SnakeGame.css';

const CELL = 18;
const COLS = 22;
const ROWS = 16;
const TICK = 120;

const DIR = { UP:[0,-1], DOWN:[0,1], LEFT:[-1,0], RIGHT:[1,0] };

function rand(max) { return Math.floor(Math.random() * max); }
function newFood(snake) {
  let f;
  do { f = [rand(COLS), rand(ROWS)]; }
  while (snake.some(s => s[0]===f[0] && s[1]===f[1]));
  return f;
}

export default function SnakeGame() {
  const canvasRef = useRef(null);
  const state = useRef({
    snake: [[11,8],[10,8],[9,8]],
    dir: [1,0],
    nextDir: [1,0],
    food: [16,8],
    score: 0,
    running: false,
    dead: false,
  });
  const tickRef = useRef(null);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState('idle'); // idle | running | dead

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const s = state.current;
    const W = COLS * CELL;
    const H = ROWS * CELL;

    ctx.clearRect(0, 0, W, H);

    // grid
    ctx.strokeStyle = 'rgba(185,255,75,0.04)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= COLS; x++) {
      ctx.beginPath(); ctx.moveTo(x*CELL,0); ctx.lineTo(x*CELL,H); ctx.stroke();
    }
    for (let y = 0; y <= ROWS; y++) {
      ctx.beginPath(); ctx.moveTo(0,y*CELL); ctx.lineTo(W,y*CELL); ctx.stroke();
    }

    // food — pulsing dot
    const pulse = 0.6 + 0.4 * Math.abs(Math.sin(Date.now() / 300));
    ctx.fillStyle = `rgba(185,255,75,${pulse})`;
    ctx.shadowBlur = 10; ctx.shadowColor = '#b9ff4b';
    ctx.beginPath();
    ctx.arc(s.food[0]*CELL + CELL/2, s.food[1]*CELL + CELL/2, CELL/2 - 3, 0, Math.PI*2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // snake
    s.snake.forEach(([x,y], i) => {
      const alpha = i === 0 ? 1 : 0.55 + 0.35 * (1 - i / s.snake.length);
      ctx.fillStyle = i === 0 ? '#b9ff4b' : `rgba(185,255,75,${alpha})`;
      if (i === 0) { ctx.shadowBlur = 8; ctx.shadowColor = '#b9ff4b'; }
      const pad = i === 0 ? 1 : 2;
      ctx.fillRect(x*CELL+pad, y*CELL+pad, CELL-pad*2, CELL-pad*2);
      ctx.shadowBlur = 0;
    });

    // dead overlay
    if (s.dead) {
      ctx.fillStyle = 'rgba(5,13,26,0.7)';
      ctx.fillRect(0,0,W,H);
      ctx.fillStyle = '#b9ff4b';
      ctx.font = `bold 18px 'Space Mono', monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', W/2, H/2 - 14);
      ctx.fillStyle = 'rgba(185,255,75,0.6)';
      ctx.font = `12px 'Space Mono', monospace`;
      ctx.fillText(`score: ${s.score}`, W/2, H/2 + 8);
      ctx.fillText('press space / click to restart', W/2, H/2 + 28);
    }
  }, []);

  const tick = useCallback(() => {
    const s = state.current;
    if (!s.running) return;
    s.dir = s.nextDir;
    const head = [s.snake[0][0]+s.dir[0], s.snake[0][1]+s.dir[1]];
    // wall collision
    if (head[0]<0||head[0]>=COLS||head[1]<0||head[1]>=ROWS) { die(); return; }
    // self collision
    if (s.snake.some(p=>p[0]===head[0]&&p[1]===head[1])) { die(); return; }
    const ate = head[0]===s.food[0] && head[1]===s.food[1];
    s.snake = [head, ...s.snake];
    if (!ate) s.snake.pop();
    else { s.food = newFood(s.snake); s.score++; setScore(s.score); }
    draw();
  }, [draw]);

  const die = useCallback(() => {
    const s = state.current;
    s.running = false;
    s.dead = true;
    clearInterval(tickRef.current);
    setStatus('dead');
    draw();
  }, [draw]);

  const start = useCallback(() => {
    const s = state.current;
    s.snake = [[11,8],[10,8],[9,8]];
    s.dir = [1,0]; s.nextDir = [1,0];
    s.food = newFood(s.snake);
    s.score = 0; s.running = true; s.dead = false;
    setScore(0); setStatus('running');
    clearInterval(tickRef.current);
    tickRef.current = setInterval(tick, TICK);
    draw();
  }, [tick, draw]);

  // keyboard
  useEffect(() => {
    const onKey = (e) => {
      const s = state.current;
      if (e.code === 'Space') { e.preventDefault(); if (!s.running) start(); return; }
      if (!s.running) return;
      const map = {
        ArrowUp: DIR.UP, ArrowDown: DIR.DOWN,
        ArrowLeft: DIR.LEFT, ArrowRight: DIR.RIGHT,
        KeyW: DIR.UP, KeyS: DIR.DOWN, KeyA: DIR.LEFT, KeyD: DIR.RIGHT,
      };
      const d = map[e.code];
      if (d && !(d[0]===-s.dir[0] && d[1]===-s.dir[1])) {
        e.preventDefault();
        s.nextDir = d;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [start]);

  // food pulse animation even when idle
  useEffect(() => {
    let raf;
    const loop = () => { draw(); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); clearInterval(tickRef.current); };
  }, [draw]);

  const handleClick = () => { if (!state.current.running) start(); };

  // D-pad for mobile
  const press = (dir) => {
    const s = state.current;
    if (!s.running) { start(); return; }
    const d = DIR[dir];
    if (!(d[0]===-s.dir[0] && d[1]===-s.dir[1])) s.nextDir = d;
  };

  return (
    <div className="snake-wrap">
      <div className="snake-header">
        <span className="snake-title">snake.exe</span>
        <span className="snake-score">score: {score}</span>
      </div>
      <canvas
        ref={canvasRef}
        width={COLS * CELL}
        height={ROWS * CELL}
        className="snake-canvas"
        onClick={handleClick}
      />
      {status === 'idle' && (
        <div className="snake-overlay">
          <span>press space or click to start</span>
          <span className="snake-hint">arrow keys / WASD to move</span>
        </div>
      )}
      <div className="snake-dpad">
        <button onClick={()=>press('UP')}>▲</button>
        <div className="snake-dpad-row">
          <button onClick={()=>press('LEFT')}>◀</button>
          <button onClick={()=>press('DOWN')}>▼</button>
          <button onClick={()=>press('RIGHT')}>▶</button>
        </div>
      </div>
    </div>
  );
}
