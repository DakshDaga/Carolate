import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ChocolateScene from './components/ChocolateScene';
import ChocolateDrip from './components/ChocolateDrip';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollStory from './components/ScrollStory';
import SceneOverlay from './components/SceneOverlay';
import IngredientSections from './components/IngredientSection';
import ProductShowcase from './components/ProductShowcase';
import WhyCarolate from './components/WhyCarolate';
import OurStory from './components/OurStory';
import Contact from './components/Contact';

import './index.css';

gsap.registerPlugin(ScrollTrigger);

// Global GSAP defaults
gsap.defaults({ ease: 'power2.out' });
ScrollTrigger.defaults({ markers: false });

export default function App() {
  useEffect(() => {
    // Refresh ScrollTrigger after all components mount
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {/* Fixed 3D chocolate scene — always in background */}
      <ChocolateScene />

      {/* Fixed chocolate drip edges */}
      <ChocolateDrip />

      {/* Fixed scene overlay labels */}
      <SceneOverlay />

      {/* Navigation */}
      <Navbar />

      {/* Page content */}
      <main>
        {/* Hero: chocolate appears */}
        <Hero />

        {/* Scroll story: 5 phases of scroll height drive the 3D animation */}
        <ScrollStory>
          {/* After the 3D story, reveal ingredient sections */}
          <IngredientSections />
          <ProductShowcase />
          <WhyCarolate />
          <OurStory />
          <Contact />
        </ScrollStory>
      </main>
    </>
  );
}
