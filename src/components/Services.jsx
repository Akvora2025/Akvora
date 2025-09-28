import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Bot, Cloud, CheckCircle, GraduationCap, ArrowRight } from 'lucide-react';

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const services = [
    {
      icon: Code,
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

  return (
    <section id="services" className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-gradient-to-br from-tech-blue/10 to-tech-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-gradient-to-br from-tech-green/10 to-neon-green/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-block bg-gradient-to-r from-tech-blue to-tech-purple text-white px-6 py-2 rounded-full text-sm font-semibold">
              Our Services
            </span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Complete <span className="gradient-text">Tech Solutions</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            From concept to deployment, we provide end-to-end technology solutions that drive business growth and innovation.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative h-full"
              >
                <div className={`h-full flex flex-col bg-gradient-to-br ${service.bgColor} rounded-2xl p-6 lg:p-8 border border-gray-200/50 hover:border-gray-300/50 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2`}>
                  {/* Icon */}
                  <div className={`w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg lg:text-xl font-bold mb-4 text-gray-900 group-hover:text-gray-800 transition-colors duration-300 line-clamp-2">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm lg:text-base text-gray-600 mb-6 leading-relaxed flex-grow">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 lg:space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center bg-gradient-to-r from-tech-blue to-tech-purple rounded-2xl p-8 md:p-12 text-white"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Transform Your Business?
          </h3>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Let's discuss how our comprehensive tech solutions can accelerate your growth and innovation.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-tech-blue px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2"
          >
            <span>Get Free Consultation</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;