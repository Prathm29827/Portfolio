import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import SkillsMatrix from './components/SkillsMatrix.jsx';
import BugSquash from './components/BugSquash.jsx';
import MockIDE from './components/MockIDE.jsx';
import Timeline from './components/Timeline.jsx';
import ContactTicket from './components/ContactTicket.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      {/* Fixed technical blueprint grid sits behind every section */}
      <div className="blueprint-bg" aria-hidden="true" />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <SkillsMatrix />
          <BugSquash />
          <MockIDE />
          <Timeline />
          <ContactTicket />
        </main>
        <Footer />
      </div>
    </>
  );
}
