import { useEffect, useRef } from 'react';
import './Cursor.css';

export default function Cursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ mx: 0, my: 0, rx: 0, ry: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const move = (e) => {
      pos.current.mx = e.clientX;
      pos.current.my = e.clientY;
    };
    document.addEventListener('mousemove', move);

    const animate = () => {
      const { mx, my } = pos.current;
      pos.current.rx += (mx - pos.current.rx) * 0.15;
      pos.current.ry += (my - pos.current.ry) * 0.15;
      if (cursorRef.current) {
        cursorRef.current.style.left = mx + 'px';
        cursorRef.current.style.top = my + 'px';
      }
      if (ringRef.current) {
        ringRef.current.style.left = pos.current.rx + 'px';
        ringRef.current.style.top = pos.current.ry + 'px';
      }
      raf.current = requestAnimationFrame(animate);
    };
    animate();

    const grow = () => {
      if (cursorRef.current) { cursorRef.current.style.width = '16px'; cursorRef.current.style.height = '16px'; }
      if (ringRef.current)   { ringRef.current.style.width  = '52px'; ringRef.current.style.height  = '52px'; }
    };
    const shrink = () => {
      if (cursorRef.current) { cursorRef.current.style.width = '10px'; cursorRef.current.style.height = '10px'; }
      if (ringRef.current)   { ringRef.current.style.width  = '36px'; ringRef.current.style.height  = '36px'; }
    };

    const interactiveEls = document.querySelectorAll('a, button, .project-card, .skill-card');
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', grow);
      el.addEventListener('mouseleave', shrink);
    });

    return () => {
      document.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf.current);
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', grow);
        el.removeEventListener('mouseleave', shrink);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef}   className="cursor-ring" />
    </>
  );
}
