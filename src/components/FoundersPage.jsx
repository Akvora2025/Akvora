import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Github, Linkedin, ExternalLink } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import SEO from './SEO';

const FoundersPage = ({ setActiveSection }) => {
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

  const founders = [
    {
      name: 'Aravind K.',
      role: 'Founder & CEO',
      bio: 'AI researcher and solutions engineer, passionate about deploying AI to solve real-world problems',
      image: '/images/Aravind.jpg',
      linkedin: 'https://www.linkedin.com/in/aravind-aravind/',
      github: 'https://github.com/Aravind419',
      gradient: 'from-tech-blue to-blue-600'
    },
    {
      name: 'Karthik K.',
      role: 'Founder & CTO',
      bio: 'Tech enthusiast and full-stack architect with experience in building scalable digital solutions.',
      image: '/images/karthik.jpg',
      linkedin: 'https://www.linkedin.com/in/karthik-k-573459278',
      github: 'https://github.com/Karthik0484',
      gradient: 'from-tech-purple to-purple-600'
    },
    {
      name: 'Balaji S.',
      role: 'Co-Founder & CDO',
      bio: 'Operations and cloud deployment expert, ensuring projects scale reliably and efficiently.',
      image: '/images/Balaji.jpg',
      linkedin: 'https://www.linkedin.com/in/balaji-s-19b175278?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      github: 'https://github.com/Balaji200510',
      gradient: 'from-tech-green to-green-600'
    },
    {
      name: 'Dushyanth C.',
      role: 'Full Stack Developer',
      bio: ' Full-stack web developer Building modern, responsive and reliable web applications end-to-end.',
      image: '/images/Dushyanth.jpg',
      linkedin: 'https://www.linkedin.com/in/dushyanth-c-7430b9278?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ',
      github: 'https://github.com/dushyanth88',
      gradient: 'from-tech-blue to-blue-600'
    },
    {
      name: 'Kishore S.',
      role: 'Data Analyst',
      bio: 'Turning raw numbers into powerful stories 📊.Driving data-driven growth with clear, actionable insights 💡.',
      image: '/images/Kishore.jpg',
      linkedin: 'https://www.linkedin.com/in/kishore-krish-9510bb278?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ',
      github: 'https://github.com/kishoreShankar97',
      gradient: 'from-tech-blue to-blue-600'
    },
  ];

  // Structured data for the page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Akvora Founders and Leadership Team",
    "description": "Meet the visionary founders and leadership team of Akvora",
    "itemListElement": founders.map((founder, index) => ({
      "@type": "Person",
      "position": index + 1,
      "name": founder.name,
      "jobTitle": founder.role,
      "description": founder.bio,
      "url": "https://akvora.com/founders",
      "worksFor": {
        "@type": "Organization",
        "name": "Akvora",
        "url": "https://akvora.com"
      }
    }))
  };

  return (
    <div className="App bg-white min-h-screen">
      <SEO 
        title="Akvora Founders & Leadership Team | Meet Our Founders"
        description="Discover the visionary founders of Akvora - Aravind K. (CEO), Karthik K. (CTO), and Balaji S. (CDO). Experts in AI, full-stack development, and cloud deployment."
        keywords="akvora founders, akvora leadership, akvora team, technology founders, ai experts, full stack developers, cloud deployment experts"
        url="/founders"
        structuredData={structuredData}
      />
      
      <Header 
        activeSection="founders" 
        setActiveSection={setActiveSection}
      />
      
      <section className="py-20 lg:py-32 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-40 h-40 bg-gradient-to-br from-tech-blue/10 to-tech-purple/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-20 w-40 h-40 bg-gradient-to-br from-tech-green/10 to-neon-green/10 rounded-full blur-3xl"></div>
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
                Meet the Team
              </span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            >
              Meet the <span className="gradient-text">Founders</span> of Akvora
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              The visionary leaders driving Akvora's innovation and committed to delivering exceptional technology solutions. 
              Discover the expertise behind our success in full-stack development, AI integration, and cloud deployment.
            </motion.p>
          </motion.div>

          {/* Founders Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 lg:justify-items-center"
          >
            <div className="lg:col-span-3 lg:grid lg:grid-cols-3 lg:gap-8 lg:w-full contents">
              {/* First 3 founders */}
              {founders.slice(0, 3).map((founder, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative"
                >
                  <div className="h-full bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center">
                    {/* Profile Image */}
                    <div className="relative mb-6">
                      <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${founder.gradient} p-1 group-hover:scale-110 transition-transform duration-300`}>
                        <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          {founder.image ? (
                            <img 
                              src={founder.image} 
                              alt={founder.name}
                              className="w-full h-full object-cover rounded-full"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div className={`w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center ${founder.image ? 'hidden' : ''}`}>
                            <span className="text-2xl font-bold text-white">
                              {founder.name.split(' ')[0][0]}{founder.name.split(' ')[1][0]}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Name & Role */}
                    <h2 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-gray-900 transition-colors duration-300">
                      {founder.name}
                    </h2>
                    <p className={`text-sm font-semibold mb-4 bg-gradient-to-r ${founder.gradient} bg-clip-text text-transparent`}>
                      {founder.role}
                    </p>

                    {/* Bio */}
                    <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                      {founder.bio}
                    </p>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-4">
                      <motion.a
                        href={founder.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 group/social"
                      >
                        <Linkedin className="w-5 h-5" />
                      </motion.a>
                      <motion.a
                        href={founder.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all duration-300 group/social"
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                    </div>

                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Last 2 founders centered */}
            <div className="lg:col-span-3 lg:flex lg:justify-center lg:gap-8 lg:max-w-2xl lg:mx-auto contents">
              {founders.slice(3, 5).map((founder, index) => (
                <motion.div
                  key={index + 3}
                  variants={itemVariants}
                  className="group relative lg:flex-1 lg:max-w-sm"
                >
                  <div className="h-full bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center">
                    {/* Profile Image */}
                    <div className="relative mb-6">
                      <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${founder.gradient} p-1 group-hover:scale-110 transition-transform duration-300`}>
                        <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          {founder.image ? (
                            <img 
                              src={founder.image} 
                              alt={founder.name}
                              className="w-full h-full object-cover rounded-full"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div className={`w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center ${founder.image ? 'hidden' : ''}`}>
                            <span className="text-2xl font-bold text-white">
                              {founder.name.split(' ')[0][0]}{founder.name.split(' ')[1][0]}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Name & Role */}
                    <h2 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-gray-900 transition-colors duration-300">
                      {founder.name}
                    </h2>
                    <p className={`text-sm font-semibold mb-4 bg-gradient-to-r ${founder.gradient} bg-clip-text text-transparent`}>
                      {founder.role}
                    </p>

                    {/* Bio */}
                    <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                      {founder.bio}
                    </p>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-4">
                      <motion.a
                        href={founder.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 group/social"
                      >
                        <Linkedin className="w-5 h-5" />
                      </motion.a>
                      <motion.a
                        href={founder.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all duration-300 group/social"
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                    </div>

                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* SEO Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white rounded-2xl p-8 border border-gray-200 mb-16"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Akvora Leadership Team</h2>
            
            <div className="space-y-6 text-gray-700">
              <p>
                At Akvora, our success is driven by visionary leadership and technical excellence. Our founding team brings together decades of experience in software development, artificial intelligence, and cloud technologies.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900">Aravind K. - CEO & Founder</h3>
              <p>
                As the CEO of Akvora, Aravind leads our strategic direction and innovation initiatives. With a strong background in AI research and solutions engineering, he specializes in deploying cutting-edge artificial intelligence to solve complex real-world problems. His expertise drives our commitment to delivering transformative technology solutions.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900">Karthik K. - CTO & Founder</h3>
              <p>
                Karthik serves as our Chief Technology Officer, overseeing all technical aspects of our operations. As a seasoned full-stack architect, he brings extensive experience in building scalable digital solutions that power modern businesses. His technical vision ensures we stay at the forefront of technological advancement.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900">Balaji S. - CDO & Co-Founder</h3>
              <p>
                Balaji leads our operations and cloud deployment initiatives as Chief Delivery Officer. His expertise in cloud infrastructure and scalable systems ensures our projects are delivered efficiently and reliably. With his deep knowledge of operations, he plays a crucial role in maintaining our high standards of service delivery.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900">Why Choose Akvora?</h3>
              <p>
                Our leadership team's combined expertise in full-stack development, AI integration, and cloud deployment ensures your project is in capable hands. We've successfully delivered technology solutions across various industries, helping businesses transform through innovative digital strategies.
              </p>
              
              <p>
                When you search for "akvora founders" or "akvora ceo", you're discovering the team that makes our exceptional service possible. Each founder brings unique skills and perspectives that contribute to our holistic approach to technology solutions.
              </p>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center bg-gradient-to-r from-gray-50 to-white rounded-2xl p-8 border border-gray-200"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              Ready to Work with Our Leadership Team?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our combined expertise in full-stack development, AI integration, and cloud deployment 
              ensures your project is in capable hands. Connect with us to discuss your technology needs.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 text-tech-blue font-semibold cursor-pointer"
              onClick={() => setActiveSection && setActiveSection('contact')}
            >
              <span>Contact Our Team</span>
              <ExternalLink className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <Footer setActiveSection={setActiveSection} />
    </div>
  );
};

export default FoundersPage;