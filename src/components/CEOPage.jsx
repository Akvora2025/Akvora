import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Github, Linkedin, ExternalLink } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import SEO from './SEO';

const CEOPage = ({ setActiveSection }) => {
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

  const ceo = {
    name: 'Aravind K.',
    role: 'Founder & CEO',
    bio: 'AI researcher and solutions engineer, passionate about deploying AI to solve real-world problems',
    image: '/images/Aravind.jpg',
    linkedin: 'https://www.linkedin.com/in/aravind-aravind/',
    github: 'https://github.com/Aravind419',
    gradient: 'from-tech-blue to-blue-600',
    detailedBio: `Aravind K. is the visionary CEO and Founder of Akvora, leading the company's strategic direction and innovation initiatives. With a strong background in artificial intelligence research and solutions engineering, Aravind specializes in deploying cutting-edge AI technologies to solve complex real-world problems.

As a leader in the technology industry, Aravind has extensive experience in developing and implementing AI solutions across various domains. His expertise spans machine learning, deep learning, natural language processing, and computer vision. Under his leadership, Akvora has become a trusted partner for businesses seeking to leverage AI for competitive advantage.

Before founding Akvora, Aravind worked on several high-impact AI projects in both startup and enterprise environments. His research contributions have been published in leading technical journals, and he frequently speaks at industry conferences about the future of AI and its applications in business.

Aravind holds a degree in Computer Science and has continued to stay at the forefront of technological advancement through continuous learning and research. His passion for innovation drives Akvora's commitment to delivering transformative technology solutions that create real value for clients.`
  };

  // Structured data for the CEO page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Aravind K.",
    "jobTitle": "Founder & CEO",
    "worksFor": {
      "@type": "Organization",
      "name": "Akvora",
      "url": "https://akvora.com"
    },
    "description": "AI researcher and solutions engineer, passionate about deploying AI to solve real-world problems",
    "url": "https://akvora.com/ceo",
    "sameAs": [
      "https://www.linkedin.com/in/aravind-aravind/",
      "https://github.com/Aravind419"
    ]
  };

  return (
    <div className="App bg-white min-h-screen">
      <SEO 
        title="Aravind K. - CEO of Akvora | AI & Technology Leader"
        description="Meet Aravind K., the visionary CEO of Akvora. Expert in AI research, full-stack development, and strategic business leadership. Discover his approach to technology innovation."
        keywords="akvora ceo, aravind k ceo, akvora leadership, ai expert ceo, technology ceo, akvora founder, artificial intelligence leader"
        url="/ceo"
        structuredData={structuredData}
      />
      
      <Header 
        activeSection="ceo" 
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
                Leadership
              </span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            >
              Aravind K. - <span className="gradient-text">CEO</span> of Akvora
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Meet Aravind K., the visionary CEO driving Akvora's innovation in technology solutions. 
              Expert in AI research and full-stack development with a passion for solving real-world problems.
            </motion.p>
          </motion.div>

          {/* CEO Profile */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-500 text-center">
              {/* Profile Image */}
              <div className="relative mb-8 flex justify-center">
                <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${ceo.gradient} p-1`}>
                  <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {ceo.image ? (
                      <img 
                        src={ceo.image} 
                        alt={ceo.name}
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className={`w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center ${ceo.image ? 'hidden' : ''}`}>
                      <span className="text-3xl font-bold text-white">
                        {ceo.name.split(' ')[0][0]}{ceo.name.split(' ')[1][0]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Name & Role */}
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
                {ceo.name}
              </h2>
              <p className={`text-lg font-semibold mb-6 bg-gradient-to-r ${ceo.gradient} bg-clip-text text-transparent`}>
                {ceo.role}
              </p>

              {/* Bio */}
              <p className="text-gray-600 leading-relaxed mb-8 text-lg max-w-2xl mx-auto">
                {ceo.bio}
              </p>

              {/* Social Links */}
              <div className="flex justify-center space-x-4 mb-10">
                <motion.a
                  href={ceo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 group/social"
                >
                  <Linkedin className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href={ceo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all duration-300 group/social"
                >
                  <Github className="w-6 h-6" />
                </motion.a>
              </div>

              {/* Detailed Bio */}
              <div className="text-left bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-900">About Aravind K.</h3>
                <div className="space-y-4 text-gray-700 whitespace-pre-line">
                  {ceo.detailedBio}
                </div>
              </div>

              {/* Leadership Achievements */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-tech-blue/5 to-blue-50 rounded-xl p-6 border border-blue-100">
                  <h4 className="font-bold text-lg mb-2 text-tech-blue">AI Innovation</h4>
                  <p className="text-gray-600">Leading cutting-edge AI research and implementation projects</p>
                </div>
                <div className="bg-gradient-to-br from-tech-purple/5 to-purple-50 rounded-xl p-6 border border-purple-100">
                  <h4 className="font-bold text-lg mb-2 text-tech-purple">Strategic Growth</h4>
                  <p className="text-gray-600">Driving company expansion and market positioning</p>
                </div>
                <div className="bg-gradient-to-br from-tech-green/5 to-green-50 rounded-xl p-6 border border-green-100">
                  <h4 className="font-bold text-lg mb-2 text-tech-green">Team Leadership</h4>
                  <p className="text-gray-600">Building and mentoring high-performance tech teams</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SEO Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white rounded-2xl p-8 border border-gray-200 mb-16 mt-16"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Akvora CEO - Aravind K.</h2>
            
            <div className="space-y-6 text-gray-700">
              <p>
                When searching for "akvora ceo" or "akvora leadership", you're discovering Aravind K., the visionary leader who founded Akvora with a mission to deliver cutting-edge technology solutions. As our CEO, Aravind brings together expertise in artificial intelligence, full-stack development, and strategic business leadership.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900">Leadership Philosophy</h3>
              <p>
                Aravind believes in technology's power to solve real-world problems. His leadership approach combines technical excellence with business acumen, ensuring that every solution Akvora delivers creates tangible value for clients. Under his guidance, the company has established itself as a trusted partner for businesses seeking to leverage AI and modern web technologies.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900">Industry Recognition</h3>
              <p>
                As a recognized expert in AI solutions engineering, Aravind has led numerous successful projects that have transformed how businesses operate. His work has been featured in industry publications, and he regularly contributes to the technology community through speaking engagements and research publications.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900">Vision for the Future</h3>
              <p>
                Aravind's vision for Akvora centers on democratizing access to advanced technology solutions. He is committed to making AI and cloud technologies accessible to businesses of all sizes, helping them compete in an increasingly digital world. His forward-thinking approach ensures that Akvora remains at the forefront of technological innovation.
              </p>
              
              <p>
                Whether users search for "akvora ceo" or "akvora founders", they're discovering the leadership that drives our commitment to excellence. Aravind's combination of technical expertise, business insight, and visionary leadership makes him a standout figure in the technology industry.
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
              Connect with Our CEO
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Interested in discussing how Akvora can help transform your business through technology? 
              Reach out to connect with our leadership team.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 text-tech-blue font-semibold cursor-pointer"
              onClick={() => setActiveSection && setActiveSection('contact')}
            >
        
                <span>Contact Akvora Leadership</span>
                <ExternalLink className="w-4 h-4" />
             
              <ExternalLink className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <Footer setActiveSection={setActiveSection} />
    </div>
  );
};

export default CEOPage;