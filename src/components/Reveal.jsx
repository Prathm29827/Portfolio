import useReveal from '../hooks/useReveal.js';

/**
 * Reveal — wraps any block of content and fades/slides it up the first
 * time it scrolls into view. `delay` accepts a Tailwind-safe ms value
 * (e.g. 100, 200) applied as inline transition-delay so staggered grids
 * read as a deliberate sequence rather than popping in all at once.
 */
export default function Reveal({ children, delay = 0, className = '', as = 'div' }) {
  const [ref, visible] = useReveal();
  const Tag = as;

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  );
}
