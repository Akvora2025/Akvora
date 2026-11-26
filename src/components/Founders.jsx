import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { foundersData } from '../data/founders';
import FounderCard from './FounderCard';

const Founders = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  const navigate = useNavigate();
  const location = useLocation();

  const handleContactTeamClick = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl && (location.pathname === '/' || location.pathname === '/contact')) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    navigate('/contact');
  };

  return (
    <section
      id="founders"
      className="scroll-mt-[var(--header-height)] py-12 lg:py-16 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-40 h-40 bg-gradient-to-br from-tech-blue/10 to-tech-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-40 h-40 bg-gradient-to-br from-tech-green/10 to-neon-green/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 lg:mb-10"
        >
          <div className="mb-2.5">
            <span className="inline-block bg-gradient-to-r from-tech-blue to-tech-purple text-white px-4 py-1.5 rounded-full text-xs font-semibold">
              Meet the Team
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2.5">
            Meet the <span className="gradient-text">Founders</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The visionaries driving Akvora's innovation and committed to delivering exceptional technology solutions.
          </p>
        </motion.div>

        {/* Founders 3D Flip Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto mb-10">
          {foundersData.map((founder) => (
            <FounderCard key={founder.slug} founder={founder} headingTag="h3" />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 sm:p-8 border border-gray-200"
        >
          <h3 className="text-xl md:text-2xl font-bold mb-3">
            Ready to Work with Our Team?
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-5 max-w-2xl mx-auto">
            Our combined expertise in full-stack development, AI integration, and cloud deployment
            ensures your project is in capable hands.
          </p>
          <motion.button
            type="button"
            onClick={handleContactTeamClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-tech-blue to-tech-purple text-white px-7 py-3 rounded-full text-sm sm:text-base font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center space-x-2 cursor-pointer neon-glow"
          >
            <span>Contact Our Team</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Founders;
