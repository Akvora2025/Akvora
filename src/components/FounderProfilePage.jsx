import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Github, Linkedin, CheckCircle2 } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import SEO from './SEO';
import { getFounderBySlug, SITE_URL } from '../data/founders';

const FounderProfilePage = ({ founderSlug }) => {
  const founder = getFounderBySlug(founderSlug);

  if (!founder) {
    return null;
  }

  const profileUrl = `${SITE_URL}/founders/${founder.slug}`;
  const imageUrl = `${SITE_URL}${founder.image}`;

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      name: `${founder.name} | ${founder.role} at Akvora`,
      url: profileUrl,
      mainEntity: {
        '@type': 'Person',
        name: founder.name,
        jobTitle: founder.role,
        description: founder.bio,
        image: imageUrl,
        url: profileUrl,
        worksFor: {
          '@type': 'Organization',
          name: 'Akvora',
          url: SITE_URL
        },
        knowsAbout: founder.knowsAbout,
        sameAs: [founder.linkedin, founder.github]
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${SITE_URL}/`
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Founders',
          item: `${SITE_URL}/founders`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: founder.name,
          item: profileUrl
        }
      ]
    }
  ];

  return (
    <div className="App bg-white min-h-screen flex flex-col">
      <SEO
        title={`${founder.name} | ${founder.role} of Akvora`}
        description={`${founder.name} is ${founder.role} of Akvora. ${founder.bio}`}
        keywords={`${founder.name}, ${founder.name} Akvora, Akvora ${founder.role}, Akvora Founders, ${founder.knowsAbout.join(', ')}`}
        image={imageUrl}
        url={`/founders/${founder.slug}`}
        structuredData={structuredData}
      />

      <Header activeSection="founders" />

      <main className="flex-1 pt-[calc(var(--header-height)+1.5rem)] pb-14 lg:pb-20 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top Navigation Bar: Breadcrumb + Back to Founders */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <nav aria-label="Breadcrumb" className="text-sm text-gray-600 flex items-center space-x-2">
              <Link to="/" className="hover:text-tech-blue transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link to="/founders" className="hover:text-tech-blue transition-colors">
                Founders
              </Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">{founder.name}</span>
            </nav>

            <Link
              to="/founders"
              className="inline-flex items-center space-x-1.5 text-sm font-semibold text-gray-700 hover:text-tech-blue transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Founders</span>
            </Link>
          </div>

          {/* Full-Page Profile Card */}
          <motion.article
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-gray-200 shadow-xl"
          >
            <div className="grid md:grid-cols-3 gap-8 lg:gap-10 items-start">
              {/* Photo, Designation & Social Profiles */}
              <div className="text-center md:sticky md:top-28">
                <div className={`w-44 h-44 mx-auto rounded-full bg-gradient-to-br ${founder.pageGradient} p-1.5 mb-5 shadow-lg`}>
                  <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden">
                    <img
                      src={founder.image}
                      alt={`${founder.name} - ${founder.role} at Akvora`}
                      width="176"
                      height="176"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1.5">
                  {founder.name}
                </h1>
                <p className={`text-base font-semibold mb-4 bg-gradient-to-r ${founder.pageGradient} bg-clip-text text-transparent`}>
                  {founder.role} at Akvora
                </p>

                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  {founder.bio}
                </p>

                <div className="flex justify-center space-x-3">
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${founder.name} LinkedIn profile`}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-800 hover:bg-blue-600 hover:text-white transition-all duration-300"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={founder.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${founder.name} GitHub profile`}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-900 hover:text-white transition-all duration-300"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>

              {/* Biography, Background & Technical Expertise */}
              <div className="md:col-span-2 space-y-8">
                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100">
                    Biography &amp; Background
                  </h2>
                  <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                    {founder.detailedBio.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100">
                    Technical Expertise &amp; Responsibilities
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {founder.knowsAbout.map((topic) => (
                      <div
                        key={topic}
                        className="flex items-center space-x-2.5 px-3.5 py-2.5 bg-gray-50 border border-gray-200/70 rounded-xl text-sm font-medium text-gray-800"
                      >
                        <CheckCircle2 className="w-4 h-4 text-tech-green flex-shrink-0" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="pt-6 border-t border-gray-200 flex flex-wrap gap-4 items-center justify-between">
                  <Link
                    to="/founders"
                    className="inline-flex items-center space-x-2 text-gray-700 hover:text-tech-blue font-semibold transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Founders</span>
                  </Link>

                  <Link
                    to="/contact"
                    className="bg-gradient-to-r from-tech-blue to-tech-purple text-white px-6 py-3 rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-200 inline-flex items-center space-x-2 neon-glow"
                  >
                    <span>Contact Akvora</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FounderProfilePage;
