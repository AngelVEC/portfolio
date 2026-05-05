import { useRef, useEffect } from 'react';

/**
 * Attaches an IntersectionObserver to a ref and adds 'visible'
 * class when the element enters the viewport.
 *
 * @param {number} threshold  - 0..1, how much of the element must be visible
 * @param {string} rootMargin - e.g. '0px 0px -60px 0px' to trigger earlier/later
 */
export function useScrollReveal(threshold = 0.12, rootMargin = '0px 0px -40px 0px') {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          obs.unobserve(el); // fire once then stop watching
        }
      },
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);
  return ref;
}

/**
 * Convenience wrapper component — renders a div that fades in on scroll.
 *
 * Props:
 *   variant  — 'fade-section' | 'fade-left' | 'fade-right' | 'fade-in' | 'fade-scale'
 *   delay    — CSS transition-delay string, e.g. '0.1s'
 *   style    — extra inline styles
 *   className — extra class names
 */
export function Reveal({ children, variant = 'fade-section', delay, style, className = '' }) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`${variant} ${className}`}
      style={delay ? { transitionDelay: delay, ...style } : style}
    >
      {children}
    </div>
  );
}