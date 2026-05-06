import { useEffect, useRef } from 'react';
import './CodeRain.css';

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF</>{}[]()=>!@#$%^&*';
const FONT_SIZE = 13;

export default function CodeRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let drops = [];
    let raf;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const cols = Math.floor(canvas.width / FONT_SIZE);
      drops = Array.from({ length: cols }, () => Math.random() * -50);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      // fade trail
      ctx.fillStyle = 'rgba(5,13,26,0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${FONT_SIZE}px 'Space Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * FONT_SIZE;
        const y = drops[i] * FONT_SIZE;

        // head char — bright white
        ctx.fillStyle = '#e8eaf6';
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#b9ff4b';
        ctx.fillText(char, x, y);
        ctx.shadowBlur = 0;

        // second char — neon green
        if (drops[i] > 1) {
          const prev = CHARS[Math.floor(Math.random() * CHARS.length)];
          ctx.fillStyle = '#b9ff4b';
          ctx.fillText(prev, x, y - FONT_SIZE);
        }

        // reset when off screen
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.5;
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <div className="coderain-wrap">
      <canvas ref={canvasRef} className="coderain-canvas" />
      <div className="coderain-overlay">
        <span className="coderain-label">// code rain</span>
      </div>
    </div>
  );
}
