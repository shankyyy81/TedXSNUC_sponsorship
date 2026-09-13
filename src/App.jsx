import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Partner from './pages/Partner';
import './styles/global.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)" }}>
        <ScrollToTop />
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/partner" element={<Partner />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
