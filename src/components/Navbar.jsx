import { useEffect, useState } from 'react';

const LINKS = [
  { href: '#about', label: 'about' },
  { href: '#skills', label: 'skills' },
  { href: '#ide', label: 'showcase' },
  { href: '#timeline', label: 'work' },
  { href: '#contact', label: 'contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = () => setOpen(false);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-void/85 backdrop-blur-md border-b border-line' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a
          href="#top"
          className="font-mono text-sm sm:text-base text-slate-200 hover:text-cyan transition-colors"
        >
          prathmesh<span className="text-cyan">@qa</span>
          <span className="text-slate-500">:~$</span>
          <span className="inline-block w-2 h-4 bg-cyan ml-1 align-middle animate-blink" />
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 font-mono text-sm">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-slate-400 hover:text-cyan transition-colors relative group"
              >
                <span className="text-teal/70">./</span>
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 font-mono text-xs px-4 py-2 rounded border border-cyan/40 text-cyan hover:bg-cyan/10 hover:border-cyan transition-all duration-200"
        >
          [ open_ticket ]
        </a>

        {/* Mobile toggle */}
        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
        >
          <span
            className={`block w-6 h-px bg-slate-300 transition-transform duration-300 ${
              open ? 'translate-y-1.5 rotate-45' : ''
            }`}
          />
          <span
            className={`block w-6 h-px bg-slate-300 transition-opacity duration-300 ${
              open ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-px bg-slate-300 transition-transform duration-300 ${
              open ? '-translate-y-1.5 -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-void/95 backdrop-blur-md border-b border-line ${
          open ? 'max-h-72' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col gap-1 px-5 py-4 font-mono text-sm">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={handleNavClick}
                className="block py-2.5 text-slate-300 hover:text-cyan transition-colors"
              >
                <span className="text-teal/70">./</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
