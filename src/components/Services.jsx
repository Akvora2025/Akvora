import { motion, useReducedMotion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Code2, Bot, Cloud, CheckCircle2, GraduationCap, ArrowRight } from 'lucide-react';

const Services = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  const [isSpread, setIsSpread] = useState(false);
  const [layoutMode, setLayoutMode] = useState(() => {
    if (typeof window === 'undefined') return 'desktop';
    if (window.innerWidth >= 1024) return 'desktop';
    if (window.innerWidth >= 768) return 'tablet';
    return 'mobile';
  });

  useEffect(() => {
    const updateLayoutMode = () => {
      if (window.innerWidth >= 1024) setLayoutMode('desktop');
      else if (window.innerWidth >= 768) setLayoutMode('tablet');
      else setLayoutMode('mobile');
    };

    updateLayoutMode();
    window.addEventListener('resize', updateLayoutMode);
    return () => window.removeEventListener('resize', updateLayoutMode);
  }, []);

  // Repeatable viewport observer: spreads on enter, resets to stack on exit
  useEffect(() => {
    if (prefersReducedMotion) {
      setIsSpread(true);
      return;
    }

    const target = gridRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.18) {
          setIsSpread(true);
        } else if (entry.intersectionRatio <= 0.02) {
          setIsSpread(false);
        }
      },
      { threshold: [0.02, 0.18] }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const handleConsultationClick = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl && (location.pathname === '/' || location.pathname === '/contact')) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    navigate('/contact');
  };

  const services = [
    {
      icon: Code2,
      title: 'Full-Stack Development',
      description: 'Responsive, scalable, and custom web & mobile applications tailored to your business needs.',
      features: [
        'Custom Web Applications',
        'Mobile App Development',
        'API Development & Integration',
        'Database Design & Optimization',
        'Progressive Web Apps (PWA)'
      ],
      color: 'from-tech-blue to-blue-600',
      bgColor: 'from-tech-blue/5 to-blue-50'
    },
    {
      icon: Bot,
      title: 'AI Integration',
      description: 'Intelligent automation, chatbots, and data-driven insights for better business decisions.',
      features: [
        'AI-Powered Chatbots',
        'Machine Learning Models',
        'Data Analytics & Insights',
        'Process Automation',
        'Natural Language Processing'
      ],
      color: 'from-tech-purple to-purple-600',
      bgColor: 'from-tech-purple/5 to-purple-50'
    },
    {
      icon: Cloud,
      title: 'Deployment & Cloud',
      description: 'Fast, secure, and scalable cloud infrastructure with CI/CD pipelines for seamless deployment.',
      features: [
        'Cloud Infrastructure Setup',
        'CI/CD Pipeline Implementation',
        'Container Orchestration',
        'Performance Monitoring',
        'Security & Compliance'
      ],
      color: 'from-tech-green to-green-600',
      bgColor: 'from-tech-green/5 to-green-50'
    },
    {
      icon: GraduationCap,
      title: 'Webinars, Seminars & Career Guidance',
      description: 'Interactive learning sessions, expert talks, and personalized career guidance to help students and professionals achieve their goals.',
      features: [
        'Expert-Led Webinars',
        'Interactive Seminars',
        'Career Counseling & Mentorship',
        'Skill Development Guidance',
        'Industry Insights & Trends'
      ],
      color: 'from-orange-500 to-red-600',
      bgColor: 'from-orange-50 to-red-50'
    }
  ];

  const getStackedPose = (index) => {
    if (prefersReducedMotion) {
      return { x: 0, y: 0, rotateZ: 0, rotateY: 0, rotateX: 0, scale: 1 };
    }

    if (layoutMode === 'desktop') {
      const desktopPoses = [
        { x: '156%', y: 0, rotateZ: -4, rotateY: 8, rotateX: 0, scale: 0.98 },
        { x: '52%', y: 10, rotateZ: -1.5, rotateY: 4, rotateX: 0, scale: 0.96 },
        { x: '-52%', y: 20, rotateZ: 1.5, rotateY: -4, rotateX: 0, scale: 0.94 },
        { x: '-156%', y: 30, rotateZ: 4, rotateY: -8, rotateX: 0, scale: 0.92 }
      ];
      return desktopPoses[index];
    }

    if (layoutMode === 'tablet') {
      const tabletPoses = [
        { x: '52%', y: '52%', rotateZ: -3, rotateY: 6, rotateX: 0, scale: 0.98 },
        { x: '-52%', y: '52%', rotateZ: -1, rotateY: -6, rotateX: 0, scale: 0.96 },
        { x: '52%', y: '-52%', rotateZ: 1.5, rotateY: 6, rotateX: 0, scale: 0.94 },
        { x: '-52%', y: '-52%', rotateZ: 3, rotateY: -6, rotateX: 0, scale: 0.92 }
      ];
      return tabletPoses[index];
    }

    // Mobile: vertical deck stack with zero horizontal overflow
    const mobilePoses = [
      { x: 0, y: 0, rotateZ: -1.5, rotateY: 0, rotateX: 4, scale: 0.98 },
      { x: 0, y: -24, rotateZ: 1, rotateY: 0, rotateX: 3, scale: 0.95 },
      { x: 0, y: -48, rotateZ: -1, rotateY: 0, rotateX: 2, scale: 0.92 },
      { x: 0, y: -72, rotateZ: 1.5, rotateY: 0, rotateX: 1, scale: 0.89 }
    ];
    return mobilePoses[index];
  };

  const spreadPose = { x: 0, y: 0, rotateZ: 0, rotateY: 0, rotateX: 0, scale: 1 };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="scroll-mt-[var(--header-height)] py-10 lg:py-12 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-gradient-to-br from-tech-blue/10 to-tech-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-gradient-to-br from-tech-green/10 to-neon-green/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 lg:mb-8"
        >
          <div className="mb-2">
            <span className="inline-block bg-gradient-to-r from-tech-blue to-tech-purple text-white px-4 py-1 rounded-full text-xs font-semibold">
              Our Services
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            Complete <span className="gradient-text">Tech Solutions</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            From concept to deployment, we provide end-to-end technology solutions that drive business growth and innovation.
          </p>
        </motion.div>

        {/* Services 3D Stacked-to-Spread Grid */}
        <div
          ref={gridRef}
          data-testid="services-cards-grid"
          data-spread={isSpread ? 'true' : 'false'}
          style={{ perspective: '1400px' }}
          className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const targetPose = isSpread ? spreadPose : getStackedPose(index);
            const zIndex = isSpread ? 10 + index : 40 - index * 10;

            return (
              <motion.div
                key={service.title}
                data-testid={`service-card-${index}`}
                initial={getStackedPose(index)}
                animate={targetPose}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.15 }
                    : {
                        duration: 0.72,
                        delay: isSpread ? index * 0.18 : (services.length - 1 - index) * 0.05,
                        ease: [0.22, 1, 0.36, 1]
                      }
                }
                style={{
                  zIndex,
                  transformStyle: 'preserve-3d'
                }}
                className="group relative h-full"
              >
                <div
                  className={`h-full flex flex-col bg-gradient-to-br ${service.bgColor} bg-white rounded-2xl p-5 border border-gray-200/70 hover:border-gray-300/70 ${
                    isSpread ? 'shadow-sm hover:shadow-xl' : 'shadow-xl'
                  } transition-shadow duration-300`}
                >
                  {/* Icon */}
                  <div
                    className={`w-11 h-11 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform duration-300 shadow-md`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-base lg:text-lg font-bold mb-2 text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3.5">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-1.5 mt-auto">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-xs text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center bg-gradient-to-r from-tech-blue to-tech-purple rounded-2xl p-6 md:p-7 text-white"
        >
          <h3 className="text-xl md:text-2xl font-bold mb-2">
            Ready to Transform Your Business?
          </h3>
          <p className="text-sm md:text-base opacity-90 mb-4 max-w-2xl mx-auto">
            Let's discuss how our comprehensive tech solutions can accelerate your growth and innovation.
          </p>
          <motion.button
            type="button"
            onClick={handleConsultationClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-tech-blue px-7 py-3 rounded-full text-sm font-semibold hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2 cursor-pointer"
          >
            <span>Get a Free Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
