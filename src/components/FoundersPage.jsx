import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import SEO from './SEO';
import FounderCard from './FounderCard';
import { foundersData, SITE_URL } from '../data/founders';

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

  const founders = foundersData;

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Akvora Founders and Leadership Team',
      description: 'Meet the visionary founders and leadership team of Akvora',
      itemListElement: founders.map((founder, index) => ({
        '@type': 'Person',
        position: index + 1,
        name: founder.name,
        jobTitle: founder.role,
        description: founder.bio,
        image: `${SITE_URL}${founder.image}`,
        url: `${SITE_URL}/founders/${founder.slug}`,
        sameAs: [founder.linkedin, founder.github],
        worksFor: {
          '@type': 'Organization',
          name: 'Akvora',
          url: SITE_URL
        }
      }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Founders', item: `${SITE_URL}/founders` }
      ]
    }
  ];

  return (
    <div className="App bg-white min-h-screen">
      <SEO 
        title="Akvora Founders & Leadership Team | Meet Our Founders"
        description="Discover the visionary founders of Akvora - Aravind K. (CEO) and Karthik K. (CTO). Experts in AI, full-stack development, and cloud deployment."
        keywords="akvora founders, akvora leadership, akvora team, technology founders, ai experts, full stack developers, cloud deployment experts"
        url="/founders"
        structuredData={structuredData}
      />
      
      <Header 
        activeSection="founders" 
        setActiveSection={setActiveSection}
      />
      
      <section className="pt-[calc(var(--header-height)+0.75rem)] pb-10 lg:pb-14 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-40 h-40 bg-gradient-to-br from-tech-blue/10 to-tech-purple/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-20 w-40 h-40 bg-gradient-to-br from-tech-green/10 to-neon-green/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
          {/* Compact Introductory Header */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-center mb-6 lg:mb-7"
          >
            <motion.div variants={itemVariants} className="mb-2">
              <span className="inline-block bg-gradient-to-r from-tech-blue to-tech-purple text-white px-4 py-1 rounded-full text-xs font-semibold">
                Meet the Team
              </span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-2xl sm:text-3xl font-bold mb-1.5"
            >
              Meet the <span className="gradient-text">Founders</span> of Akvora
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto leading-relaxed"
            >
              The visionary leaders driving Akvora's innovation in full-stack development, AI integration, and cloud deployment.
            </motion.p>
          </motion.div>

          {/* Founders 3D Flip Grid */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto mb-10">
            {founders.map((founder) => (
              <FounderCard key={founder.slug} founder={founder} headingTag="h2" />
            ))}
          </div>

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
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 text-tech-blue font-semibold hover:text-tech-purple transition-colors cursor-pointer"
            >
              <span>Contact Our Team</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
      
      <Footer setActiveSection={setActiveSection} />
    </div>
  );
};

export default FoundersPage;