import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Instagram, Linkedin, MessageCircle, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (targetPath) => {
    if (location.pathname === targetPath) {
      if (targetPath === '/contact') {
        const contactEl = document.getElementById('contact');
        if (contactEl) {
          contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const footerLinks = {
    services: [
      { name: 'Full-Stack Development', to: '/services' },
      { name: 'AI Integration', to: '/services' },
      { name: 'Cloud Deployment', to: '/services' },
      { name: 'Consulting', to: '/contact' }
    ],
    company: [
      { name: 'About Us', to: '/about' },
      { name: 'Founders', to: '/founders' },
      { name: 'CEO', to: '/ceo' },
      { name: 'CTO', to: '/founders/karthik' },
      { name: 'Contact', to: '/contact' }
    ]
  };

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/akvora_solutions/?igsh=dnJ1M3JrZWhidTFn#', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/akvora', label: 'LinkedIn' },
    { icon: MessageCircle, href: 'https://whatsapp.com/channel/0029VbBeQ8n65yDKjr7Q703r', label: 'WhatsApp' },
    { icon: Mail, href: 'mailto:contactakvora@gmail.com', label: 'Email' }
  ];

  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-tech-blue/10 to-tech-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-tech-green/10 to-neon-green/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="pt-12 pb-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link
                  to="/"
                  onClick={() => handleLinkClick('/')}
                  className="text-3xl font-bold gradient-text cursor-pointer inline-block mb-3"
                >
                  Akvora
                </Link>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4 max-w-md">
                  Building smarter solutions with Full-Stack development, AI integration, and seamless deployment.
                  Your partner in digital transformation.
                </p>

                {/* MSME Registration */}
                <div className="inline-flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5 px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700/80 mb-5 text-xs">
                  <span className="font-semibold text-tech-green tracking-wide uppercase">
                    MSME Registered
                  </span>
                  <span className="hidden sm:inline text-slate-600">|</span>
                  <span className="text-gray-300">
                    Udyam Registration No: <span className="font-mono text-white">UDYAM-TN-11-0109697</span>
                  </span>
                </div>

                {/* Social Links */}
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-tech-blue hover:to-tech-purple transition-all duration-300"
                      >
                        <Icon className="w-5 h-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Services Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-base font-semibold mb-3.5 text-white">Services</h3>
                <ul className="space-y-2.5 text-sm">
                  {footerLinks.services.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.to}
                        onClick={() => handleLinkClick(link.to)}
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Company Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-base font-semibold mb-3.5 text-white">Company</h3>
                <ul className="space-y-2.5 text-sm">
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.to}
                        onClick={() => handleLinkClick(link.to)}
                        className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-gray-400 text-sm"
            >
              © {currentYear} Akvora. All rights reserved.
            </motion.p>

            <div className="flex items-center space-x-6">
              <Link
                to="/contact"
                onClick={() => handleLinkClick('/contact')}
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
              >
                Contact Support
              </Link>

              {/* Back to Top Button */}
              <motion.button
                type="button"
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 bg-gradient-to-r from-tech-blue to-tech-purple rounded-lg flex items-center justify-center hover:shadow-lg transition-all duration-300 cursor-pointer"
                aria-label="Back to top"
              >
                <ArrowUp className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
