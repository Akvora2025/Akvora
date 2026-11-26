import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Github, Linkedin, ExternalLink } from 'lucide-react';
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
    <div className="App bg-white min-h-screen">
      <SEO
        title={`${founder.name} | ${founder.role} of Akvora`}
        description={`${founder.name} is ${founder.role} of Akvora. ${founder.bio}`}
        keywords={`${founder.name}, ${founder.name} Akvora, Akvora ${founder.role}, Akvora Founders, ${founder.knowsAbout.join(', ')}`}
        image={imageUrl}
        url={`/founders/${founder.slug}`}
        structuredData={structuredData}
      />

      <Header activeSection="founders" />

      <main className="py-24 lg:py-32 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-600 flex items-center space-x-2">
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

          {/* Profile Card */}
          <article className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-xl">
            <div className="grid md:grid-cols-3 gap-10 items-start">
              {/* Photo & Socials */}
              <div className="text-center">
                <div className={`w-44 h-44 mx-auto rounded-full bg-gradient-to-br ${founder.pageGradient} p-1.5 mb-6`}>
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

                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {founder.name}
                </h1>
                <p className={`text-base font-semibold mb-6 bg-gradient-to-r ${founder.pageGradient} bg-clip-text text-transparent`}>
                  {founder.role} at Akvora
                </p>

                <div className="flex justify-center space-x-4 mb-6">
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${founder.name} LinkedIn profile`}
                    className="w-11 h-11 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={founder.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${founder.name} GitHub profile`}
                    className="w-11 h-11 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all duration-300"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>

                {founder.isCEO && (
                  <Link
                    to="/ceo"
                    className="inline-flex items-center space-x-2 text-sm font-semibold text-tech-blue hover:text-tech-purple transition-colors"
                  >
                    <span>View CEO Leadership Page</span>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                )}
              </div>

              {/* Bio & Expertise */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    About {founder.name}
                  </h2>
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    {founder.detailedBio.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    Areas of Expertise
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {founder.knowsAbout.map((topic) => (
                      <span
                        key={topic}
                        className="px-3 py-1.5 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 flex flex-wrap gap-4 items-center justify-between">
                  <Link
                    to="/founders"
                    className="inline-flex items-center space-x-2 text-gray-700 hover:text-tech-blue font-medium transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>All Founders</span>
                  </Link>

                  <Link
                    to="/contact"
                    className="bg-gradient-to-r from-tech-blue to-tech-purple text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-200 inline-flex items-center space-x-2"
                  >
                    <span>Contact Akvora</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FounderProfilePage;
