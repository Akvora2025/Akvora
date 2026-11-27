import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  RotateCcw,
  ArrowLeft
} from 'lucide-react';
import { COMPANY_LOCATION } from '../data/founders';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s\-()]{7,20}$/;

const VERIFIED_PHONES = [
  { display: '+91 93619 92041', tel: 'tel:+919361992041', wa: 'https://wa.me/919361992041' },
  { display: '+91 80569 63761', tel: 'tel:+918056963761', wa: 'https://wa.me/918056963761' }
];

const isValidPhone = (value) => {
  const trimmed = value.trim();
  if (!trimmed) return true; // Optional
  const digitsOnly = trimmed.replace(/\D/g, '');
  return PHONE_REGEX.test(trimmed) && digitsOnly.length >= 7 && digitsOnly.length <= 15;
};

const hasFormspreeErrors = (errors) => {
  if (!errors) return false;
  if (Array.isArray(errors)) return errors.length > 0;
  return true;
};

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  const prefersReducedMotion = useReducedMotion();
  const [state, handleSubmit, resetFormspree] = useForm('xjkagrvl');

  const awaitingResultRef = useRef(false);
  const [submissionResult, setSubmissionResult] = useState('idle'); // 'idle' | 'success' | 'error'

  const fieldRefs = {
    name: useRef(null),
    email: useRef(null),
    phone: useRef(null),
    whatsapp: useRef(null),
    project_details: useRef(null)
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    project_details: ''
  });

  const [sameNumberForWhatsapp, setSameNumberForWhatsapp] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [shakeFields, setShakeFields] = useState({});
  const [showFormSummaryError, setShowFormSummaryError] = useState(false);

  const isFlipped = submissionResult !== 'idle';

  const validateSingleField = (fieldName, value) => {
    const trimmed = value.trim();
    switch (fieldName) {
      case 'name':
        if (!trimmed) return "Please enter your name so we know who we're speaking with.";
        return '';
      case 'email':
        if (!trimmed) return 'Please enter a valid email address so we can reach you.';
        if (!EMAIL_REGEX.test(trimmed)) return 'Please enter a valid email address.';
        return '';
      case 'phone':
        if (!isValidPhone(value)) return 'Please enter a valid phone number or leave this field empty.';
        return '';
      case 'whatsapp':
        if (!isValidPhone(value)) return 'Please enter a valid phone number or leave this field empty.';
        return '';
      case 'project_details':
        if (!trimmed) return 'Please tell us a little about your project before submitting.';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === 'phone' && sameNumberForWhatsapp) {
        updated.whatsapp = value;
      }
      return updated;
    });

    const nextErrors = { ...fieldErrors };
    const err = validateSingleField(name, value);
    if (err) {
      if (fieldErrors[name]) nextErrors[name] = err;
    } else {
      delete nextErrors[name];
    }

    if (name === 'phone' && sameNumberForWhatsapp) {
      const waErr = validateSingleField('whatsapp', value);
      if (!waErr) {
        delete nextErrors.whatsapp;
      }
    }

    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setShowFormSummaryError(false);
    }
  };

  const handleSameNumberChange = (e) => {
    const checked = e.target.checked;
    setSameNumberForWhatsapp(checked);

    setFormData((prev) => ({
      ...prev,
      whatsapp: checked ? prev.phone : prev.whatsapp
    }));

    if (checked) {
      const nextErrors = { ...fieldErrors };
      const waErr = validateSingleField('whatsapp', formData.phone);
      if (waErr) {
        nextErrors.whatsapp = waErr;
      } else {
        delete nextErrors.whatsapp;
      }
      setFieldErrors(nextErrors);
    }
  };

  // Flip only after Formspree returns an actual result
  useEffect(() => {
    if (!awaitingResultRef.current || state.submitting) return;

    if (state.succeeded) {
      awaitingResultRef.current = false;
      setSubmissionResult('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        whatsapp: '',
        project_details: ''
      });
      setSameNumberForWhatsapp(false);
      setFieldErrors({});
      setShowFormSummaryError(false);
    } else if (hasFormspreeErrors(state.errors)) {
      awaitingResultRef.current = false;
      setSubmissionResult('error');
    }
  }, [state.submitting, state.succeeded, state.errors]);

  const handleReturnToForm = (clearValues = false) => {
    setSubmissionResult('idle');
    awaitingResultRef.current = false;
    if (typeof resetFormspree === 'function') {
      resetFormspree();
    }
    if (clearValues) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        whatsapp: '',
        project_details: ''
      });
      setSameNumberForWhatsapp(false);
      setFieldErrors({});
      setShowFormSummaryError(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (state.submitting) return;

    const validationErrors = {};
    const fieldsToCheck = ['name', 'email', 'phone', 'whatsapp', 'project_details'];

    fieldsToCheck.forEach((field) => {
      const val = field === 'whatsapp' && sameNumberForWhatsapp ? formData.phone : formData[field];
      const err = validateSingleField(field, val);
      if (err) validationErrors[field] = err;
    });

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      const mandatoryMissingCount = ['name', 'email', 'project_details'].filter(
        (f) => validationErrors[f]
      ).length;
      setShowFormSummaryError(mandatoryMissingCount > 1);

      const timestamp = Date.now();
      const nextShake = {};
      Object.keys(validationErrors).forEach((key) => {
        nextShake[key] = timestamp;
      });
      setShakeFields(nextShake);

      const firstInvalid = fieldsToCheck.find((f) => validationErrors[f]);
      if (firstInvalid && fieldRefs[firstInvalid]?.current) {
        fieldRefs[firstInvalid].current.focus();
        fieldRefs[firstInvalid].current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setShowFormSummaryError(false);
    awaitingResultRef.current = true;

    try {
      await handleSubmit(e);
    } catch {
      awaitingResultRef.current = false;
      setSubmissionResult('error');
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      value: 'contactakvora@gmail.com',
      href: 'mailto:contactakvora@gmail.com',
      description: 'Send us an email anytime!'
    },
    {
      icon: Phone,
      title: 'Call Us',
      value: VERIFIED_PHONES.map((p) => p.display),
      href: VERIFIED_PHONES.map((p) => p.tel),
      description: 'Mon-Sat from 8am to 6pm'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      value: COMPANY_LOCATION.label,
      href: COMPANY_LOCATION.mapsUrl,
      external: true,
      description: 'Contact us for more information!'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, duration: 0.6 }
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

  const getInputClassName = (fieldName, extra = '') => {
    const hasError = Boolean(fieldErrors[fieldName]);
    return `w-full px-3.5 py-2.5 text-sm border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 ${
      hasError
        ? 'border-red-500 focus:ring-red-500/40 bg-red-50/30'
        : 'border-gray-300 focus:ring-tech-blue focus:border-transparent'
    } ${extra}`;
  };

  const shakeAnimation = prefersReducedMotion ? { x: 0 } : { x: [0, -6, 6, -4, 4, 0] };

  return (
    <section
      id="contact"
      className="scroll-mt-[var(--header-height)] min-h-[calc(100dvh-var(--header-height))] pt-[calc(var(--header-height)+0.75rem)] pb-6 lg:py-6 lg:pt-[calc(var(--header-height)+0.75rem)] flex items-center bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-64 h-64 bg-gradient-to-br from-tech-blue/10 to-tech-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-20 w-64 h-64 bg-gradient-to-br from-tech-green/10 to-neon-green/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Compact Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-4 lg:mb-5"
        >
          {/* <motion.div variants={itemVariants} className="mb-1.5">
            <span className="inline-block bg-gradient-to-r from-tech-blue to-tech-purple text-white px-3.5 py-1 rounded-full text-xs font-semibold">
              Get In Touch
            </span>
          </motion.div> */}

          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl font-bold mb-1.5"
          >
            Have an Idea? <span className="gradient-text">Let's Talk</span>
          </motion.h2>

          {/* <motion.p
            variants={itemVariants}
            className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto leading-relaxed"
          >
            
          </motion.p> */}
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Side: 3D Flip Card Container */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
            style={{ perspective: '1400px' }}
          >
            <motion.div
              data-testid="contact-flip-card"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.15 }
                  : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
              }
              style={{
                transformStyle: 'preserve-3d',
                position: 'relative',
                width: '100%',
                height: '100%'
              }}
            >
              {/* FRONT FACE: Contact Form */}
              <div
                aria-hidden={isFlipped}
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
                className={`bg-white rounded-2xl shadow-xl p-5 sm:p-6 border border-gray-100 h-full flex flex-col justify-center ${
                  isFlipped ? 'pointer-events-none select-none' : ''
                }`}
              >
                <h3 className="text-lg sm:text-xl font-bold mb-3">Send us a message</h3>

                {showFormSummaryError && (
                  <div
                    role="alert"
                    aria-live="polite"
                    className="mb-3 p-2.5 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-xs sm:text-sm text-red-700"
                  >
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <span>Almost there! Please complete the highlighted fields so we can get back to you.</span>
                  </div>
                )}

                <form onSubmit={onSubmit} noValidate className="space-y-3">
                  <input
                    type="hidden"
                    name="same_number_for_whatsapp"
                    value={sameNumberForWhatsapp ? 'Yes' : 'No'}
                  />

                  {/* Row 1: Full Name & Email Address */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      {fieldErrors.name && (
                        <p role="alert" className="text-red-600 text-xs mb-1">
                          {fieldErrors.name}
                        </p>
                      )}
                      <motion.div
                        key={shakeFields.name || 'name-idle'}
                        animate={fieldErrors.name && shakeFields.name ? shakeAnimation : { x: 0 }}
                        transition={{ duration: 0.35 }}
                      >
                        <input
                          ref={fieldRefs.name}
                          type="text"
                          id="name"
                          name="name"
                          autoComplete="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          aria-invalid={Boolean(fieldErrors.name)}
                          className={getInputClassName('name')}
                          placeholder="Enter your full name"
                        />
                      </motion.div>
                      <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-xs mt-1" />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      {fieldErrors.email && (
                        <p role="alert" className="text-red-600 text-xs mb-1">
                          {fieldErrors.email}
                        </p>
                      )}
                      <motion.div
                        key={shakeFields.email || 'email-idle'}
                        animate={fieldErrors.email && shakeFields.email ? shakeAnimation : { x: 0 }}
                        transition={{ duration: 0.35 }}
                      >
                        <input
                          ref={fieldRefs.email}
                          type="email"
                          id="email"
                          name="email"
                          autoComplete="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          aria-invalid={Boolean(fieldErrors.email)}
                          className={getInputClassName('email')}
                          placeholder="Enter your email address"
                        />
                      </motion.div>
                      <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
                    </div>
                  </div>

                  {/* Row 2: Phone Number & WhatsApp Number (Optional) */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Phone Number <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      {fieldErrors.phone && (
                        <p role="alert" className="text-red-600 text-xs mb-1">
                          {fieldErrors.phone}
                        </p>
                      )}
                      <motion.div
                        key={shakeFields.phone || 'phone-idle'}
                        animate={fieldErrors.phone && shakeFields.phone ? shakeAnimation : { x: 0 }}
                        transition={{ duration: 0.35 }}
                      >
                        <input
                          ref={fieldRefs.phone}
                          type="tel"
                          id="phone"
                          name="phone"
                          autoComplete="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          aria-invalid={Boolean(fieldErrors.phone)}
                          className={getInputClassName('phone')}
                          placeholder="Enter your phone number"
                        />
                      </motion.div>
                    </div>

                    <div>
                      <label htmlFor="whatsapp" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        WhatsApp Number <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      {fieldErrors.whatsapp && (
                        <p role="alert" className="text-red-600 text-xs mb-1">
                          {fieldErrors.whatsapp}
                        </p>
                      )}
                      <motion.div
                        key={shakeFields.whatsapp || 'whatsapp-idle'}
                        animate={fieldErrors.whatsapp && shakeFields.whatsapp ? shakeAnimation : { x: 0 }}
                        transition={{ duration: 0.35 }}
                      >
                        <input
                          ref={fieldRefs.whatsapp}
                          type="tel"
                          id="whatsapp"
                          name="whatsapp"
                          value={sameNumberForWhatsapp ? formData.phone : formData.whatsapp}
                          onChange={handleInputChange}
                          readOnly={sameNumberForWhatsapp}
                          aria-invalid={Boolean(fieldErrors.whatsapp)}
                          className={getInputClassName(
                            'whatsapp',
                            sameNumberForWhatsapp ? 'bg-gray-100 text-gray-600 cursor-not-allowed' : ''
                          )}
                          placeholder={
                            sameNumberForWhatsapp ? 'Synced with phone number' : 'Enter your WhatsApp number'
                          }
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Same Number Checkbox */}
                  <div className="flex items-center">
                    <label
                      htmlFor="same_number_for_whatsapp"
                      className="inline-flex items-center space-x-2 text-xs sm:text-sm text-gray-700 cursor-pointer select-none py-1"
                    >
                      <input
                        type="checkbox"
                        id="same_number_for_whatsapp"
                        checked={sameNumberForWhatsapp}
                        onChange={handleSameNumberChange}
                        className="w-4 h-4 text-tech-blue border-gray-300 rounded focus:ring-tech-blue cursor-pointer"
                      />
                      <span>Use the same number for WhatsApp</span>
                    </label>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label htmlFor="project_details" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Project Details <span className="text-red-500">*</span>
                    </label>
                    {fieldErrors.project_details && (
                      <p role="alert" className="text-red-600 text-xs mb-1">
                        {fieldErrors.project_details}
                      </p>
                    )}
                    <motion.div
                      key={shakeFields.project_details || 'project_details-idle'}
                      animate={
                        fieldErrors.project_details && shakeFields.project_details ? shakeAnimation : { x: 0 }
                      }
                      transition={{ duration: 0.35 }}
                    >
                      <textarea
                        ref={fieldRefs.project_details}
                        id="project_details"
                        name="project_details"
                        value={formData.project_details}
                        onChange={handleInputChange}
                        rows="3"
                        aria-invalid={Boolean(fieldErrors.project_details)}
                        className={getInputClassName('project_details', 'resize-none')}
                        placeholder="Tell us about your project, requirements, budget or what you would like to build..."
                      ></textarea>
                    </motion.div>
                    <ValidationError
                      prefix="Project Details"
                      field="project_details"
                      errors={state.errors}
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    aria-label="Submit Query"
                    disabled={state.submitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-tech-blue to-tech-purple text-white px-6 py-3 rounded-full text-sm sm:text-base font-semibold hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 neon-glow cursor-pointer"
                  >
                    {state.submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Query</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>

              {/* BACK FACE: Success or Failure Result Screen */}
              <div
                aria-hidden={!isFlipped}
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
                className={`absolute inset-0 bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100 flex flex-col items-center justify-center text-center overflow-y-auto ${
                  !isFlipped ? 'pointer-events-none select-none' : ''
                }`}
              >
                {submissionResult === 'success' && (
                  <div role="status" aria-live="polite" className="max-w-md mx-auto space-y-4">
                    <motion.div
                      key="success-icon"
                      initial={prefersReducedMotion ? false : { scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="w-20 h-20 mx-auto rounded-full bg-green-50 ring-8 ring-green-100/80 shadow-lg shadow-green-500/20 flex items-center justify-center"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-10 h-10 text-green-600"
                        aria-hidden="true"
                      >
                        <motion.path
                          d="M5 13l4 4L19 7"
                          stroke="currentColor"
                          strokeWidth="2.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
                        />
                      </svg>
                    </motion.div>

                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                      Message Sent Successfully!
                    </h3>

                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      Thank you for reaching out to Akvora. We've received your inquiry and our team will get back to you shortly.
                    </p>

                    <p className="text-xs sm:text-sm font-medium text-tech-green bg-green-50/80 border border-green-100 rounded-lg px-4 py-2">
                      We typically respond within 24 hours during business days.
                    </p>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => handleReturnToForm(true)}
                        className="bg-gradient-to-r from-tech-blue to-tech-purple text-white px-6 py-3 rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-200 inline-flex items-center space-x-2 cursor-pointer neon-glow"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Send Another Message</span>
                      </button>
                    </div>
                  </div>
                )}

                {submissionResult === 'error' && (
                  <div role="alert" aria-live="assertive" className="max-w-md mx-auto space-y-4">
                    <motion.div
                      key="error-icon"
                      initial={prefersReducedMotion ? false : { scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="w-20 h-20 mx-auto rounded-full bg-red-50 ring-8 ring-red-100/80 shadow-lg shadow-red-500/20 flex items-center justify-center"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-10 h-10 text-red-600"
                        aria-hidden="true"
                      >
                        <motion.path
                          d="M6 6l12 12"
                          stroke="currentColor"
                          strokeWidth="2.75"
                          strokeLinecap="round"
                          initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.35, delay: 0.3, ease: 'easeOut' }}
                        />
                        <motion.path
                          d="M18 6l-12 12"
                          stroke="currentColor"
                          strokeWidth="2.75"
                          strokeLinecap="round"
                          initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.35, delay: 0.45, ease: 'easeOut' }}
                        />
                      </svg>
                    </motion.div>

                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                      Message Could Not Be Sent
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      Sorry, we couldn't send your message right now. Please try again or contact our team directly using the phone numbers below.
                    </p>

                    {/* Direct Verified Phone & WhatsApp Options */}
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 space-y-2.5 text-left">
                      {VERIFIED_PHONES.map((phoneItem) => (
                        <div
                          key={phoneItem.display}
                          className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm"
                        >
                          <span className="font-medium text-gray-800">{phoneItem.display}</span>
                          <div className="flex items-center space-x-2">
                            <a
                              href={phoneItem.tel}
                              aria-label={`Call Us at ${phoneItem.display}`}
                              className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-blue-50 text-tech-blue hover:bg-tech-blue hover:text-white transition-colors font-medium"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              <span>Call Us</span>
                            </a>
                            <a
                              href={phoneItem.wa}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`WhatsApp Us at ${phoneItem.display}`}
                              className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-green-50 text-tech-green hover:bg-tech-green hover:text-white transition-colors font-medium"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>WhatsApp Us</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => handleReturnToForm(false)}
                        className="w-full sm:w-auto bg-gradient-to-r from-tech-blue to-tech-purple text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-200 inline-flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Try Again</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleReturnToForm(false)}
                        className="w-full sm:w-auto border border-gray-300 text-gray-700 px-5 py-2.5 rounded-full text-sm font-semibold hover:border-tech-blue hover:text-tech-blue transition-all duration-200 inline-flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Contact Form</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Stationary Contact Information */}
          <motion.div
            data-testid="contact-info-column"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-between space-y-3.5"
          >
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-1">Get in touch</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Choose the most convenient way to reach out, and we'll get back to you promptly.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-3">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="flex items-center space-x-3.5 p-3.5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-tech-blue to-tech-purple rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm text-gray-900">{info.title}</h4>
                      {info.href ? (
                        Array.isArray(info.value) ? (
                          <div className="flex flex-wrap gap-x-3">
                            {info.value.map((val, idx) => (
                              <a
                                key={idx}
                                href={info.href[idx]}
                                className="text-tech-blue text-sm font-medium hover:text-tech-purple transition-colors duration-300 cursor-pointer"
                                aria-label={`${info.title}: ${val}`}
                              >
                                {val}
                              </a>
                            ))}
                          </div>
                        ) : (
                          <a
                            href={info.href}
                            target={info.external ? '_blank' : undefined}
                            rel={info.external ? 'noopener noreferrer' : undefined}
                            className="text-tech-blue text-sm font-medium hover:text-tech-purple transition-colors duration-300 cursor-pointer block truncate"
                            aria-label={`${info.title}: ${info.value}`}
                          >
                            {info.value}
                          </a>
                        )
                      ) : (
                        <p className="text-tech-blue text-sm font-medium">{info.value}</p>
                      )}
                      <p className="text-gray-500 text-xs">{info.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gradient-to-r from-tech-blue to-tech-purple rounded-xl p-4 text-white"
            >
              <h4 className="font-bold text-sm sm:text-base mb-1">Quick Response Guarantee</h4>
              <p className="text-blue-100 text-xs sm:text-sm mb-2">
                We typically respond to all inquiries within 24 hours during business days.
              </p>
              <div className="flex items-center space-x-2 text-xs">
                <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Free consultation included</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
