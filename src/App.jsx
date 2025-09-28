import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Founders from './components/Founders';
import CallToAction from './components/CallToAction';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Handle section change with transition state and scroll to top
  const handleSectionChange = (section) => {
    // Special case: always scroll to top when clicking Home, even if already on home
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (section === activeSection) return; // Exit early only if already on home after scrolling
    }
    
    if (section === activeSection) return;
    
    setIsTransitioning(true);
    
    // Scroll to top immediately for better UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Small delay to allow scroll to start, then change section
    setTimeout(() => {
      setActiveSection(section);
    }, 50);
    
    // Reset transition state after animation
    setTimeout(() => {
      setIsTransitioning(false);
    }, 350); // Match the new faster animation duration
  };

  // Section configuration
  const sections = {
    home: { 
      components: [Hero, About, Services, WhyChooseUs, Founders, CallToAction, Contact],
      showAll: true 
    },
    about: { 
      components: [About],
      showAll: false 
    },
    services: { 
      components: [Services],
      showAll: false 
    },
    contact: { 
      components: [Contact],
      showAll: false 
    }
  };

  // Page transition variants with optimized, faster animations
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 15,
      scale: 0.98
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1
    },
    out: {
      opacity: 0,
      y: -10,
      scale: 1.01
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: [0.25, 0.46, 0.45, 0.94], // Optimized cubic-bezier for smooth, responsive feel
    duration: 0.35 // Faster 350ms duration for responsive performance
  };

  const renderSection = () => {
    const currentSection = sections[activeSection];
    if (!currentSection) return null;

    const { components, showAll } = currentSection;

    if (showAll) {
      // Home page - show all sections with continuous scroll
      return (
        <motion.div
          key={activeSection}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="w-full"
        >
          {components.map((Component, index) => {
            const isHero = Component === Hero;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.05, // Faster stagger timing
                  ease: [0.4, 0.0, 0.2, 1] // Consistent modern easing
                }}
              >
                {isHero ? (
                  <Component setActiveSection={handleSectionChange} />
                ) : Component === CallToAction ? (
                  <Component setActiveSection={handleSectionChange} />
                ) : (
                  <Component />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      );
    } else {
      // Individual section pages
      const Component = components[0];
      return (
        <motion.div
          key={activeSection}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="min-h-screen flex flex-col"
        >
          <Component />
        </motion.div>
      );
    }
  };

  return (
    <div className="App bg-white">
      <Header 
        activeSection={activeSection} 
        setActiveSection={handleSectionChange}
        isTransitioning={isTransitioning}
      />
      <main className="relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {renderSection()}
        </AnimatePresence>
      </main>
      <Footer setActiveSection={handleSectionChange} />
    </div>
  );
}

export default App;
