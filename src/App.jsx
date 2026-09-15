import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import PageTransition from './components/PageTransition';
import SmoothScroll from './components/SmoothScroll';
import Home from './pages/Home';
import About from './pages/About';
import Education from './pages/Education';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import './App.css';

function AnimatedRoutes() {
  const location = useLocation();
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/education" element={<PageTransition><Education /></PageTransition>} />
            <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <strong>Ulrich Babbel Mbonihankuye</strong>
            <p>{t.footer.tagline}</p>
          </div>
          <div className="footer-links">
            <a href="https://github.com/Rich9153" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/ulrich-babbel-mbonihankuye-798a752b1/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </div>
          <p className="footer-copy">&copy; {new Date().getFullYear()} {t.footer.rights}</p>
        </div>
      </footer>
    </>
  );
}

function AppContent() {
  return (
    <Router>
      <div className="app">
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

function App() {
  return (
    <LanguageProvider>
      <SmoothScroll>
        <AppContent />
      </SmoothScroll>
    </LanguageProvider>
  );
}

export default App;
