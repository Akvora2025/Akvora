import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Users, Lightbulb, Award } from 'lucide-react';

const About = () => {
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

  const values = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'We bridge innovation and execution to deliver scalable, intelligent solutions.'
    },
    {
      icon: Users,
      title: 'Client-Focused',
      description: 'Your success is our priority. We work closely with you every step of the way.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation First',
      description: 'We leverage cutting-edge technologies to solve complex business challenges.'
    },
    {
      icon: Award,
      title: 'Quality Assured',
      description: 'We maintain the highest standards in code quality and project delivery.'
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-40 h-40 bg-gradient-to-br from-tech-blue/10 to-tech-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-40 h-40 bg-gradient-to-br from-tech-green/10 to-neon-green/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-block bg-gradient-to-r from-tech-blue to-tech-purple text-white px-6 py-2 rounded-full text-sm font-semibold">
              About AKvora
            </span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Why Choose <span className="gradient-text">AKvora</span>?
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            AKvora is a technology solutions company that bridges innovation and execution. 
            Our mission is to deliver scalable, intelligent, and future-ready solutions that 
            empower businesses to grow in the digital age.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h3 
              variants={itemVariants}
              className="text-2xl md:text-3xl font-bold mb-6"
            >
              Empowering Digital Transformation
            </motion.h3>
            
            <motion.p 
              variants={itemVariants}
              className="text-gray-600 mb-6 leading-relaxed"
            >
              In today's rapidly evolving digital landscape, businesses need more than just technology—they need strategic partners who understand their vision and can execute it flawlessly.
            </motion.p>
            
            <motion.p 
              variants={itemVariants}
              className="text-gray-600 mb-8 leading-relaxed"
            >
              At AKvora, we combine technical expertise with business acumen to deliver solutions that not only meet your current needs but also position you for future growth. From concept to deployment, we're with you every step of the way.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 gap-6"
            >
              <div className="text-center p-6 bg-gradient-to-br from-tech-blue/5 to-tech-purple/5 rounded-xl border border-gray-100">
                <div className="text-3xl font-bold gradient-text mb-2">3</div>
                <div className="text-sm text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-tech-green/5 to-neon-green/5 rounded-xl border border-gray-100">
                <div className="text-3xl font-bold gradient-text mb-2">100%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              {/* Main card */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-tech-blue to-tech-purple rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Lightbulb className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-4">Innovation at Scale</h4>
                  <p className="text-gray-600 leading-relaxed">
                    We leverage the latest technologies and best practices to build solutions that scale with your business growth.
                  </p>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-neon-green to-tech-green rounded-xl shadow-lg flex items-center justify-center"
              >
                <Award className="w-6 h-6 text-white" />
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-tech-purple to-tech-blue rounded-xl shadow-lg flex items-center justify-center"
              >
                <Target className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Values/Principles */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-tech-blue to-tech-purple rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-3">{value.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default About;