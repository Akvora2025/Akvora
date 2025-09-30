import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';


const Header = ({ activeSection, setActiveSection, isTransitioning }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', section: 'home' },
    { name: 'About', section: 'about' },
    { name: 'Services', section: 'services' },
    { name: 'Contact', section: 'contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
          : "bg-white/10 backdrop-blur-sm"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20 py-2">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center flex-shrink-0">
            <button
              onClick={() => setActiveSection("home")}
              className="text-2xl lg:text-3xl font-bold gradient-text cursor-pointer whitespace-nowrap flex items-center justify-center">
              <img
                // The path starts from the public directory.
                // So, it's '/images/' followed by your image file name.
                src="/transpareny_logo.png"
                alt="Transparent Akvora Logo" // IMPORTANT: Provide descriptive alt text
                className="h-13 w-auto inline-block align-top mr-3.5 text-2xl lg:text-3xl" // Adjust these Tailwind CSS classes for sizing as needed
              />
              <span>Akvora</span>
             
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => setActiveSection(item.section)}
                className={`font-medium cursor-pointer transition-all duration-200 relative group px-1 py-2 ${
                  activeSection === item.section
                    ? "text-tech-blue scale-105"
                    : "text-gray-700 hover:text-tech-blue hover:scale-105"
                }`}>
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-tech-blue to-tech-purple transition-all duration-200 ${
                    activeSection === item.section
                      ? "w-full opacity-100"
                      : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                  }`}></span>
              </button>
            ))}
          </motion.nav>

          {/* CTA Button - Desktop */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden lg:block">
            <button
              onClick={() => {
                setActiveSection("contact");
                setIsOpen(false);
              }}
              className="bg-gradient-to-r from-tech-blue to-tech-purple text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 cursor-pointer inline-block neon-glow">
              Contact
            </button>
          </motion.div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-tech-blue transition-colors duration-300">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={
            isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
          className="lg:hidden overflow-hidden">
          <div className="py-4 space-y-4 bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg border border-gray-200">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setActiveSection(item.section);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-6 py-3 font-medium cursor-pointer transition-all duration-200 rounded-lg mx-2 ${
                  activeSection === item.section
                    ? "text-tech-blue bg-tech-blue/10 border-l-4 border-tech-blue"
                    : "text-gray-700 hover:text-tech-blue hover:bg-gray-50"
                }`}>
                {item.name}
              </button>
            ))}
            <div className="px-6 pt-2">
              <button
                onClick={() => {
                  setActiveSection("contact");
                  setIsOpen(false);
                }}
                className="bg-gradient-to-r from-tech-blue to-tech-purple text-white px-6 py-3 rounded-full font-semibold text-center cursor-pointer inline-block w-full neon-glow">
                Contact
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};


export default Header;
