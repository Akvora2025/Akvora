import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Rocket, Bot, Cloud, Zap } from 'lucide-react';

const WhyChooseUs = () => {
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

  const advantages = [
    {
      icon: Rocket,
      title: 'End-to-End Tech Solutions',
      description: 'From initial concept to final deployment, we handle every aspect of your technology needs with comprehensive, integrated solutions.',
      color: 'from-tech-blue to-blue-600',
      stats: '360°',
      statsLabel: 'Complete Coverage'
    },
    {
      icon: Bot,
      title: 'AI-Powered Innovation',
      description: 'Leverage cutting-edge artificial intelligence and machine learning to automate processes and gain intelligent insights.',
      color: 'from-tech-purple to-purple-600',
      stats: '3x',
      statsLabel: 'Faster Processing'
    },
    {
      icon: Cloud,
      title: 'Reliable Deployment & Support',
      description: 'Secure, scalable cloud infrastructure with 24/7 monitoring and support to ensure your applications run smoothly.',
      color: 'from-tech-green to-green-600',
      stats: '99.9%',
      statsLabel: 'Uptime Guarantee'
    },
    {
      icon: Zap,
      title: 'Fast Delivery with Agile Approach',
      description: 'Our agile methodology ensures rapid development cycles with continuous feedback and iterative improvements.',
      color: 'from-orange-500 to-red-500',
      stats: '50%',
      statsLabel: 'Faster Delivery'
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-tech-blue/5 to-tech-purple/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-tech-green/5 to-neon-green/5 rounded-full blur-3xl"></div>
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
              Why Choose Us
            </span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            The <span className="gradient-text">Akvora</span> Advantage
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            We combine technical expertise with business acumen to deliver solutions that drive real results for your organization.
          </motion.p>
        </motion.div>

        {/* Advantages Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                <div className="h-full bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                  <div className="flex items-start space-x-6">
                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${advantage.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-gray-900 transition-colors duration-300">
                        {advantage.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {advantage.description}
                      </p>
                      
                      {/* Stats */}
                      <div className="flex items-center space-x-2">
                        <span className={`text-2xl font-bold bg-gradient-to-r ${advantage.color} bg-clip-text text-transparent`}>
                          {advantage.stats}
                        </span>
                        <span className="text-sm text-gray-500">{advantage.statsLabel}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-slate-900 to-gray-900 rounded-2xl p-8 md:p-12 text-white"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Trusted by Businesses Worldwide
            </h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Our track record speaks for itself. Here's what we've achieved for our clients.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-neon-green to-tech-green bg-clip-text text-transparent"
              >
                5+
              </motion.div>
              <div className="text-sm opacity-80">Projects Completed</div>
            </div>
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-tech-blue to-tech-purple bg-clip-text text-transparent"
              >
                24/7
              </motion.div>
              <div className="text-sm opacity-80">Support Available</div>
            </div>
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent"
              >
                99%
              </motion.div>
              <div className="text-sm opacity-80">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              >
                1
              </motion.div>
              <div className="text-sm opacity-80">Years Experience</div>
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default WhyChooseUs;