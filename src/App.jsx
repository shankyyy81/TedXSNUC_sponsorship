import React from 'react';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import Vision from './sections/Vision';
import SponsorshipTiers from './sections/SponsorshipTiers';
import Contact from './sections/Contact';
import './styles/global.css';

export default function App() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)" }}>
      <Navigation />
      <main>
        <Hero />
        <Vision />
        <SponsorshipTiers />
        <Contact />
      </main>
    </div>
  );
}
