import Nav from './components/Nav';
import HeroSection from './components/HeroSection';
import CollectionsCtaSection from './components/CollectionsCtaSection';
import AboutSection from './components/AboutSection';
import RecentAddingsSection from './components/RecentAddingsSection';
import TheCollections from './components/TheCollections';
import QuoteSection from './components/QuoteSection';
import ProcessSection from './components/ProcessSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <Nav />
      <HeroSection />
      <CollectionsCtaSection />
      <AboutSection />
      <RecentAddingsSection />
      <TheCollections />
      <QuoteSection />
      <ProcessSection />
      <Footer />
    </div>
  );
}
