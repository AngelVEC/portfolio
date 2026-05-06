import { useEffect, useRef } from 'react';
import './ParticleCanvas.css';

const CONFIG = {
  count: 80,
  maxDist: 130,
  mouseDist: 160,
  baseSpeed: 0.35,
  dotRadius: 2,
  lineWidth: 0.7,
  neon: '#b9ff4b',
  dimColor: 'rgba(185,255,75,',
};

function rand(min, max) { return Math.random() * (max - min) + min; }

export default function ParticleCanvas() {
  const canvasRef = useRef(null);
  const mouse     = useRef({ x: -9999, y: -9999 });
  const raf       = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let particles = [];

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const init = () => {
      particles = Array.from({ length: CONFIG.count }, () => ({
        x:  rand(0, canvas.width),
        y:  rand(0, canvas.height),
        vx: rand(-CONFIG.baseSpeed, CONFIG.baseSpeed),
        vy: rand(-CONFIG.baseSpeed, CONFIG.baseSpeed),
        r:  rand(1.2, CONFIG.dotRadius),
        phase: rand(0, Math.PI * 2),
        pulseSpeed: rand(0.008, 0.02),
      }));
    };
    init();

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // mouse repulsion
        const dx   = p.x - mx;
        const dy   = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.mouseDist && dist > 0) {
          const force = (CONFIG.mouseDist - dist) / CONFIG.mouseDist;
          p.vx += (dx / dist) * force * 0.4;
          p.vy += (dy / dist) * force * 0.4;
        }

        // damping
        p.vx *= 0.98;
        p.vy *= 0.98;

        // keep minimum drift
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed < 0.1) {
          p.vx += rand(-0.05, 0.05);
          p.vy += rand(-0.05, 0.05);
        }

        p.x += p.vx;
        p.y += p.vy;

        // wrap edges
        if (p.x < -10) p.x = canvas.width  + 10;
        if (p.x > canvas.width  + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // pulse opacity
        p.phase += p.pulseSpeed;
        const opacity = 0.4 + 0.5 * Math.abs(Math.sin(p.phase));

        // dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(185,255,75,' + opacity + ')';
        ctx.fill();

        // connections between particles
        for (let j = i + 1; j < particles.length; j++) {
          const q  = particles[j];
          const ex = p.x - q.x;
          const ey = p.y - q.y;
          const d  = Math.sqrt(ex * ex + ey * ey);
          if (d < CONFIG.maxDist) {
            const alpha = (1 - d / CONFIG.maxDist) * 0.55;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = 'rgba(185,255,75,' + alpha.toFixed(3) + ')';
            ctx.lineWidth   = CONFIG.lineWidth;
            ctx.stroke();
          }
        }

        // lines from mouse-near particles to cursor
        if (dist < CONFIG.mouseDist && dist > 0) {
          const alpha = (1 - dist / CONFIG.mouseDist) * 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = 'rgba(185,255,75,' + alpha.toFixed(3) + ')';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // glowing cursor dot
      if (mx > 0 && mx < canvas.width) {
        ctx.beginPath();
        ctx.arc(mx, my, 3, 0, Math.PI * 2);
        ctx.fillStyle    = CONFIG.neon;
        ctx.shadowBlur   = 14;
        ctx.shadowColor  = CONFIG.neon;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf.current);
      ro.disconnect();
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}
