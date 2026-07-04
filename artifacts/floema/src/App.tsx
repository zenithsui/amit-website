import { useState } from 'react';
import Nav from './components/Nav';
import HeroSection from './components/HeroSection';
import CollectionsCtaSection from './components/CollectionsCtaSection';
import AboutSection from './components/AboutSection';
import RecentAddingsSection from './components/RecentAddingsSection';
import TheCollections from './components/TheCollections';
import QuoteSection from './components/QuoteSection';
import ProcessSection from './components/ProcessSection';
import Footer from './components/Footer';
import AboutModal from './components/AboutModal';

export default function App() {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <Nav onAboutClick={() => setAboutOpen(true)} />
      <HeroSection />
      <CollectionsCtaSection />
      <AboutSection />
      <RecentAddingsSection />
      <TheCollections />
      <QuoteSection />
      <ProcessSection />
      <Footer />
      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  );
}
