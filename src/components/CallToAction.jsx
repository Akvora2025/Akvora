import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Sparkles, CheckCircle, Star } from 'lucide-react';

const CallToAction = ({ setActiveSection }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  const benefits = [
    'Free consultation & project assessment',
    'Custom solution tailored to your needs',
    'Dedicated project manager',
    'Transparent pricing with no hidden costs',
    'Post-launch support & maintenance'
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-gradient-to-br from-neon-green/20 to-tech-green/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-gradient-to-br from-tech-purple/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-tech-blue/10 to-tech-purple/10 rounded-full blur-3xl"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-tech-purple rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
            >
              <Star className="w-4 h-4 text-neon-green" />
              <span className="text-sm font-medium">Ready to Get Started?</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6"
            >
              Let's Build the{' '}
              <span className="bg-gradient-to-r from-neon-green to-tech-green bg-clip-text text-transparent">
                Future
              </span>{' '}
              Together
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed"
            >
              Transform your ideas into powerful digital solutions. Our expert team is ready to help you build, deploy, and scale your next big project.
            </motion.p>

            {/* Benefits List */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-3 mb-8"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-neon-green flex-shrink-0" />
                  <span className="text-gray-300">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => setActiveSection && setActiveSection('contact')}
                className="bg-gradient-to-r from-neon-green to-tech-green text-black px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-neon-green/25 transform hover:scale-105 transition-all duration-300 cursor-pointer inline-flex items-center justify-center space-x-2 neon-glow"
              >
                <span>Get a Free Consultation</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:border-neon-green hover:text-neon-green transition-all duration-300 inline-flex items-center justify-center">
                View Portfolio
              </button>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative">
              {/* Main card */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-gradient-to-br from-neon-green to-tech-green rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-10 h-10 text-black" />
                  </div>
                  <h4 className="text-xl font-bold mb-4">Start Your Project Today</h4>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Be among the first to grow with us and shape the future with our innovative solutions.
                  </p>
                  
                  {/* Quick stats */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
                    <div>
                      <div className="text-2xl font-bold text-neon-green">48h</div>
                      <div className="text-xs text-gray-400">Response Time</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-tech-purple">100%</div>
                      <div className="text-xs text-gray-400">Satisfaction</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-tech-blue">24/7</div>
                      <div className="text-xs text-gray-400">Support</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-neon-green to-tech-green rounded-xl shadow-2xl flex items-center justify-center"
              >
                <CheckCircle className="w-6 h-6 text-black" />
              </motion.div>

              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-tech-purple to-pink-500 rounded-xl shadow-2xl flex items-center justify-center"
              >
                <ArrowRight className="w-6 h-6 text-white" />
              </motion.div>

              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 -left-8 w-4 h-4 bg-neon-green rounded-full"
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;