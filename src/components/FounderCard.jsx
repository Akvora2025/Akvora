import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Github, Linkedin, ArrowRight } from 'lucide-react';

const FounderCard = ({ founder, headingTag = 'h3' }) => {
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const [transitionRect, setTransitionRect] = useState(null);
  const Heading = headingTag;

  const handleOpenProfile = () => {
    if (transitionRect) return;

    const targetPath = `/founders/${founder.slug}`;
    if (prefersReducedMotion || !cardRef.current) {
      navigate(targetPath);
      return;
    }

    const rect = cardRef.current.getBoundingClientRect();
    setTransitionRect({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    });

    window.setTimeout(() => {
      navigate(targetPath);
    }, 850);
  };

  return (
    <>
      <motion.div
        ref={cardRef}
        data-testid={`founder-card-${founder.slug}`}
        onClick={handleOpenProfile}
        whileHover={prefersReducedMotion ? undefined : { y: -6 }}
        className="h-full min-h-[380px] bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-300 text-center flex flex-col justify-between cursor-pointer group"
      >
        <div>
          {/* Profile Image */}
          <div className="relative mb-4">
            <div
              className={`w-22 h-22 mx-auto rounded-full bg-gradient-to-br ${founder.gradient} p-1 group-hover:scale-105 transition-transform duration-300`}
            >
              <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {founder.image ? (
                  <img
                    src={founder.image}
                    alt={`${founder.name} - ${founder.role} at Akvora`}
                    loading="lazy"
                    width="88"
                    height="88"
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div
                  className={`w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center ${
                    founder.image ? 'hidden' : ''
                  }`}
                >
                  <span className="text-2xl font-bold text-white">
                    {founder.name.split(' ')[0][0]}
                    {founder.name.split(' ')[1][0]}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Name & Role */}
          <Heading className="text-xl font-bold mb-1 text-gray-900">
            {founder.name}
          </Heading>
          <p
            className={`text-sm font-semibold mb-3 bg-gradient-to-r ${founder.gradient} bg-clip-text text-transparent`}
          >
            {founder.role}
          </p>

          {/* Short Bio */}
          <p className="text-gray-600 leading-relaxed mb-4 text-sm">{founder.bio}</p>
        </div>

        <div className="space-y-3.5">
          {/* Social Links */}
          <div className="flex justify-center space-x-3">
            <a
              href={founder.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`${founder.name} LinkedIn profile`}
              className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={founder.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`${founder.name} GitHub profile`}
              className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenProfile();
            }}
            aria-label={`View Full Profile of ${founder.name}`}
            className="inline-flex items-center justify-center space-x-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-tech-blue to-tech-purple text-white text-sm font-semibold hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <span>View Full Profile</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* 3D Card-to-Page Flip & Expand Transition Overlay */}
      {transitionRect &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            data-testid="founder-3d-transition"
            className="fixed inset-0 z-40 pointer-events-none"
            style={{ perspective: '1600px' }}
          >
            <motion.div
              initial={{
                top: transitionRect.top,
                left: transitionRect.left,
                width: transitionRect.width,
                height: transitionRect.height,
                rotateY: 0,
                scale: 1,
                borderRadius: '1rem'
              }}
              animate={{
                top: [transitionRect.top, transitionRect.top - 12, 0],
                left: [transitionRect.left, transitionRect.left, 0],
                width: [transitionRect.width, transitionRect.width, window.innerWidth],
                height: [transitionRect.height, transitionRect.height, window.innerHeight],
                rotateY: [0, 18, 180],
                scale: [1, 1.03, 1],
                borderRadius: ['1rem', '1.25rem', '0rem']
              }}
              transition={{
                duration: 0.85,
                times: [0, 0.22, 1],
                ease: [0.22, 1, 0.36, 1]
              }}
              style={{
                position: 'fixed',
                transformStyle: 'preserve-3d',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}
            >
              {/* Front Face (Card Snapshot) */}
              <div
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
                className="absolute inset-0 bg-white rounded-2xl p-6 border border-gray-200 flex flex-col items-center justify-center text-center"
              >
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${founder.gradient} p-1 mb-3`}>
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <p className="text-xl font-bold text-gray-900">{founder.name}</p>
                <p className="text-sm font-semibold text-tech-blue">{founder.role}</p>
              </div>

              {/* Back Face (Full-Page Canvas) */}
              <div
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
                className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 flex flex-col items-center justify-center p-8"
              >
                <div className="w-12 h-12 rounded-full border-2 border-tech-blue border-t-transparent animate-spin mb-3" />
                <p className="text-sm font-semibold text-gray-700">
                  Loading {founder.name}'s Profile...
                </p>
              </div>
            </motion.div>
          </div>,
          document.body
        )}
    </>
  );
};

export default FounderCard;
