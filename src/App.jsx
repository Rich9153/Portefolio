import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import PageTransition from './components/PageTransition';
import SmoothScroll from './components/SmoothScroll';
import MatrixBackground from './components/MatrixBackground';
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
      <MatrixBackground />
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
        <p>&copy; 2024 {t.footer.rights}</p>
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
