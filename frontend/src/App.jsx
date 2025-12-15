import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications'; // New
import Contact from './components/Contact';
import { usePortfolioData } from './hooks/usePortfolioData';

function App() {
  const { data, loading, error } = usePortfolioData();

  if (loading) {
    return (
      <div className="h-screen w-screen bg-background flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-400 font-mono text-sm tracking-wider animate-pulse">BOOTING SYSTEM...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-screen w-screen bg-background flex flex-col items-center justify-center p-4 text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-white mb-2">System Failure</h1>
        <p className="text-gray-400 max-w-md">Critical error connecting to the backend mainframe. Please ensure the neural link (API) is active.</p>
        <button onClick={() => window.location.reload()} className="mt-8 px-6 py-2 border border-gray-700 text-white rounded-lg hover:bg-white/5 transition-colors">
          Reboot System
        </button>
      </div>
    )
  }

  return (
    <div className="bg-background min-h-screen text-white selection:bg-primary/30 selection:text-white">
      <Hero bio={data.bio} />
      <About bio={data.bio} />
      <TechStack skills={data.skills} />
      <Experience experience={data.experience} />
      <Projects projects={data.projects} />
      <Certifications certifications={data.certifications} />
      <Contact />

      <footer className="py-12 bg-surface border-t border-white/5 text-center">
        <p className="text-gray-500 text-sm font-mono">&copy; {new Date().getFullYear()} {data.bio?.name}. Engineered with Precision.</p>
      </footer>
    </div>
  );
}

export default App;
