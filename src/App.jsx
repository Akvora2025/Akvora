import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Founders from './components/Founders';
import CallToAction from './components/CallToAction';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SEO from './components/SEO';
import { foundersData, SITE_URL } from './data/founders';

function App({ initialSection }) {
  const location = useLocation();

  const getDefaultSection = () => {
    if (initialSection) return initialSection;
    if (location.pathname === '/about') return 'about';
    if (location.pathname === '/services') return 'services';
    if (location.pathname === '/contact') return 'contact';
    if (location.pathname === '/founders') return 'founders';
    if (location.pathname === '/ceo') return 'ceo';
    return 'home';
  };

  const [activeSection, setActiveSection] = useState(getDefaultSection());
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const nextSection =
      initialSection ||
      (location.pathname === '/about'
        ? 'about'
        : location.pathname === '/services'
        ? 'services'
        : location.pathname === '/contact'
        ? 'contact'
        : location.pathname === '/founders'
        ? 'founders'
        : location.pathname === '/ceo'
        ? 'ceo'
        : 'home');
    setActiveSection(nextSection);
  }, [location.pathname, initialSection]);

  const handleSectionChange = (section) => {
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (section === activeSection) return;
    }

    if (section === activeSection) return;

    setIsTransitioning(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      setActiveSection(section);
    }, 50);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 350);
  };

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
    founders: {
      components: [Founders],
      showAll: false
    },
    ceo: {
      components: [],
      showAll: false
    },
    contact: {
      components: [Contact],
      showAll: false
    }
  };

  const seoBySection = {
    home: {
      title: 'Akvora | Technology Solutions, AI Integration & Software Development',
      description:
        'Akvora delivers modern technology solutions, full-stack development, AI integration, cloud deployment and technical education for businesses and professionals.',
      keywords:
        'akvora, akvora technologies, akvora technology solutions, akvora software development, akvora ai solutions, akvora web development, akvora cloud solutions, aravind k, karthik k',
      url: '/'
    },
    about: {
      title: 'About Akvora | Mission, Values & Technology Leadership',
      description:
        'Learn about Akvora, a technology solutions company bridging innovation and execution with scalable full-stack, AI, and cloud solutions.',
      keywords: 'about akvora, akvora technology solutions, akvora mission, akvora company',
      url: '/about'
    },
    services: {
      title: 'Services | Full-Stack Development, AI Integration & Cloud — Akvora',
      description:
        'Explore Akvora services: Full-Stack Development, AI Integration, Deployment & Cloud infrastructure, and Webinars, Seminars & Career Guidance.',
      keywords:
        'akvora services, full-stack development, ai integration, cloud deployment, webinars seminars career guidance',
      url: '/services'
    },
    contact: {
      title: 'Contact Akvora | Start Your Technology Project',
      description:
        'Get in touch with Akvora for full-stack development, AI integration, cloud deployment, or technical mentorship. Reach us via form, email, or phone.',
      keywords: 'contact akvora, akvora email, akvora phone, start project akvora',
      url: '/contact'
    }
  };

  const currentSeo = seoBySection[activeSection] || seoBySection.home;

  const pageVariants = {
    initial: { opacity: 0, y: 15, scale: 0.98 },
    in: { opacity: 1, y: 0, scale: 1 },
    out: { opacity: 0, y: -10, scale: 1.01 }
  };

  const pageTransition = {
    type: 'tween',
    ease: [0.25, 0.46, 0.45, 0.94],
    duration: 0.35
  };

  const renderSection = () => {
    const currentSection = sections[activeSection];
    if (!currentSection) return null;

    const { components, showAll } = currentSection;

    if (showAll) {
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
                  delay: index * 0.05,
                  ease: [0.4, 0.0, 0.2, 1]
                }}
              >
                {isHero || Component === CallToAction ? (
                  <Component setActiveSection={handleSectionChange} />
                ) : (
                  <Component />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      );
    }

    const Component = components[0];
    if (Component) {
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
    return null;
  };

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Akvora',
      url: SITE_URL,
      logo: `${SITE_URL}/transpareny_logo.png`,
      description:
        'Akvora delivers cutting-edge technology solutions including full-stack development, AI integration, cloud deployment, and technical education.',
      email: 'contactakvora@gmail.com',
      telephone: ['+91-93619-92041', '+91-80569-63761'],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Hosur, Bangalore',
        addressCountry: 'IN'
      },
      founder: foundersData.map((f) => ({
        '@type': 'Person',
        name: f.name,
        jobTitle: f.role,
        url: `${SITE_URL}/founders/${f.slug}`,
        sameAs: [f.linkedin, f.github]
      })),
      sameAs: [
        'https://www.linkedin.com/company/akvora',
        'https://www.instagram.com/akvora_solutions/',
        'https://whatsapp.com/channel/0029VbBeQ8n65yDKjr7Q703r'
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Akvora',
      url: SITE_URL
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: currentSeo.title,
      description: currentSeo.description,
      url: `${SITE_URL}${currentSeo.url === '/' ? '/' : currentSeo.url}`,
      isPartOf: {
        '@type': 'WebSite',
        name: 'Akvora',
        url: SITE_URL
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Akvora Services',
      itemListElement: [
        {
          '@type': 'Service',
          position: 1,
          name: 'Full-Stack Development',
          description:
            'Responsive, scalable, and custom web & mobile applications tailored to your business needs.',
          provider: { '@type': 'Organization', name: 'Akvora', url: SITE_URL }
        },
        {
          '@type': 'Service',
          position: 2,
          name: 'AI Integration',
          description:
            'Intelligent automation, chatbots, and data-driven insights for better business decisions.',
          provider: { '@type': 'Organization', name: 'Akvora', url: SITE_URL }
        },
        {
          '@type': 'Service',
          position: 3,
          name: 'Deployment & Cloud',
          description:
            'Fast, secure, and scalable cloud infrastructure with CI/CD pipelines for seamless deployment.',
          provider: { '@type': 'Organization', name: 'Akvora', url: SITE_URL }
        },
        {
          '@type': 'Service',
          position: 4,
          name: 'Webinars, Seminars & Career Guidance',
          description:
            'Interactive learning sessions, expert talks, and personalized career guidance to help students and professionals achieve their goals.',
          provider: { '@type': 'Organization', name: 'Akvora', url: SITE_URL }
        }
      ]
    }
  ];

  return (
    <div className="App bg-white">
      <SEO
        title={currentSeo.title}
        description={currentSeo.description}
        keywords={currentSeo.keywords}
        url={currentSeo.url}
        structuredData={structuredData}
      />

      <Header
        activeSection={activeSection}
        setActiveSection={handleSectionChange}
        isTransitioning={isTransitioning}
      />
      <main className="relative overflow-hidden">
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }}
        >
          {renderSection()}
        </AnimatePresence>
      </main>
      <Footer setActiveSection={handleSectionChange} />
    </div>
  );
}

export default App;
