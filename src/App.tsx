import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header, Footer } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { ImageToComponent } from './pages/ImageToComponent';
import { DesignQA } from './pages/DesignQA';
import { CustomSystemBuilder } from './pages/CustomSystemBuilder';
import { useEffect } from 'react';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/image-to-component" element={<ImageToComponent />} />
            <Route path="/design-qa" element={<DesignQA />} />
            <Route path="/system-builder" element={<CustomSystemBuilder />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
