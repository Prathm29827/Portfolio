export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative px-5 sm:px-8 py-10 max-w-6xl mx-auto border-t border-line">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
        <p className="font-mono text-xs text-slate-500">
          © {year} Prathmesh Marwalikar — built with intent, tested with care.
        </p>

     <div className="flex items-center gap-5 font-mono text-xs">
      <a 
        href="mailto:prathmeshmarwalikar1@gmail.com"
        className="text-slate-400 hover:text-cyan transition-colors"
      >
        email
      </a>
      <a 
        href="https://github.com/prathm29827" 
        target="_blank" 
        rel="noreferrer"
        className="text-slate-400 hover:text-cyan transition-colors"
      >
        github
      </a>
      <a 
        href="https://www.linkedin.com/in/prathmesh-marwalikar" 
        target="_blank" 
        rel="noreferrer"
        className="text-slate-400 hover:text-cyan transition-colors"
      >
        linkedin
      </a>
    </div>
      </div>
    </footer>
  );
}
