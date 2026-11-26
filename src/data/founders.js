export const SITE_URL = 'https://akvora.in';

export const COMPANY_LOCATION = {
  label: 'Hosur, Bangalore',
  fullLabel: 'Hosur, Bangalore, India',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Hosur%2C+Bangalore'
};

export const foundersData = [
  {
    slug: 'aravind',
    name: 'Aravind K.',
    role: 'Founder & CEO',
    bio: 'AI researcher and solutions engineer, passionate about deploying AI to solve real-world problems',
    detailedBio: [
      "Aravind K. is the visionary CEO and Founder of Akvora, leading the company's strategic direction and innovation initiatives. With a strong background in artificial intelligence research and solutions engineering, Aravind specializes in deploying cutting-edge AI technologies to solve complex real-world problems.",
      'As a leader in the technology industry, Aravind has extensive experience in developing and implementing AI solutions across various domains. His expertise spans machine learning, deep learning, natural language processing, and computer vision. Under his leadership, Akvora has become a trusted partner for businesses seeking to leverage AI for competitive advantage.',
      'Before founding Akvora, Aravind worked on several high-impact AI projects in both startup and enterprise environments. His research contributions have been published in leading technical journals, and he frequently speaks at industry conferences about the future of AI and its applications in business.',
      "Aravind holds a degree in Computer Science and has continued to stay at the forefront of technological advancement through continuous learning and research. His passion for innovation drives Akvora's commitment to delivering transformative technology solutions that create real value for clients."
    ],
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'Deep Learning',
      'Natural Language Processing',
      'Computer Vision',
      'Solutions Engineering'
    ],
    image: '/images/aravind.jpeg',
    linkedin: 'https://www.linkedin.com/in/aravind-aravind/',
    github: 'https://github.com/Aravind419',
    gradient: 'from-tech-green to-green-800',
    pageGradient: 'from-tech-blue to-blue-600',
    isCEO: true
  },
  {
    slug: 'karthik',
    name: 'Karthik K.',
    role: 'Founder & CTO',
    bio: 'Tech enthusiast and full-stack architect with experience in building scalable digital solutions.',
    detailedBio: [
      'Karthik K. is the Founder and Chief Technology Officer (CTO) of Akvora, leading the architecture and engineering of scalable digital solutions. As a full-stack architect, he oversees end-to-end web and mobile application development, API architecture, and cloud deployment.',
      'At Akvora, Karthik focuses on building reliable, high-performance systems using modern web technologies and cloud infrastructure, helping startups and enterprises turn ideas into production-ready software.'
    ],
    knowsAbout: [
      'Full-Stack Development',
      'Software Architecture',
      'Web Application Development',
      'API Development & Integration',
      'Cloud Deployment'
    ],
    image: '/images/karthik.jpg',
    linkedin: 'https://www.linkedin.com/in/karthik-k-573459278',
    github: 'https://github.com/Karthik0484',
    gradient: 'from-tech-purple to-purple-600',
    pageGradient: 'from-tech-purple to-purple-600',
    isCEO: false
  }
];

export const getFounderBySlug = (slug) =>
  foundersData.find((founder) => founder.slug === slug);
