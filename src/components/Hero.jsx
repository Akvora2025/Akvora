import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Cloud } from 'lucide-react';

const Hero = ({ setActiveSection }) => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 pt-20 lg:pt-24">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-tech-blue/20 to-tech-purple/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-tech-green/20 to-neon-green/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-neon-green rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-tech-purple rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-tech-blue rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0.0, 0.2, 1] }}
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 mb-6 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-tech-purple" />
              <span className="text-sm font-medium text-gray-700">Modern Technology Solutions</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.4, 0.0, 0.2, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Building Smarter Solutions with{' '}
              <span className="gradient-text">Full-Stack, AI & Deployment</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              At Akvora, we help startups and enterprises accelerate growth with modern web solutions, AI-powered automation, and seamless cloud deployment.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.4, 0.0, 0.2, 1] }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={() => setActiveSection && setActiveSection('contact')}
                className="bg-gradient-to-r from-tech-blue to-tech-purple text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer inline-flex items-center justify-center space-x-2 neon-glow"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActiveSection && setActiveSection('services')}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold hover:border-tech-blue hover:text-tech-blue transition-all duration-300 cursor-pointer inline-flex items-center justify-center"
              >
                Services
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200"
            >
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">5+</div>
                <div className="text-sm text-gray-600">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">24/7</div>
                <div className="text-sm text-gray-600">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">99%</div>
                <div className="text-sm text-gray-600">Client Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual/Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative">
              {/* Main tech illustration */}
              <div className="relative w-full max-w-lg mx-auto">
                {/* Center circle */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-48 h-48 mx-auto bg-gradient-to-br from-tech-blue to-tech-purple rounded-full flex items-center justify-center shadow-2xl"
                >
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-inner">
                    <Sparkles className="w-16 h-16 gradient-text" />
                  </div>
                </motion.div>

                {/* Floating icons */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -left-8 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center border-2 border-tech-blue/20"
                >
                  <Zap className="w-8 h-8 text-tech-blue" />
                </motion.div>

                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -top-4 -right-8 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center border-2 border-tech-purple/20"
                >
                  <Cloud className="w-8 h-8 text-tech-purple" />
                </motion.div>

                <motion.div
                  animate={{ y: [-5, 15, -5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center border-2 border-tech-green/20"
                >
                  <ArrowRight className="w-8 h-8 text-tech-green" />
                </motion.div>
              </div>

              {/* Glowing orbs */}
              <div className="absolute top-1/4 -left-8 w-4 h-4 bg-neon-green rounded-full animate-pulse"></div>
              <div className="absolute bottom-1/4 -right-8 w-3 h-3 bg-tech-purple rounded-full animate-pulse"></div>
              <div className="absolute top-3/4 left-1/4 w-2 h-2 bg-tech-blue rounded-full animate-pulse"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
        </motion.div>
      </motion.div>
    </section>
  );
};


export default Hero;
