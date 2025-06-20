import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Linkedin, Mail, ChevronDown, Code, Database, Wind, Smartphone, X } from 'lucide-react';
import resumeImage from './assets/resume.png';
import profileImage from './assets/profile.jpg';
import Squares from './Squares';
import SpotlightCard from './SpotlightCard';
import SplashCursor from './SplashCursor'

// --- HELPER COMPONENTS & DATA ---

// SVG for the stylized logo
const Logo = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 7L12 12M22 7L12 12M12 22V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 4.5L7 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// SVG for WhatsApp Icon
const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 12C2.13 14.03 2.7 15.93 3.69 17.51L2.51 21.6L6.77 20.48C8.28 21.39 10.09 21.96 12.04 21.96C17.5 21.96 21.96 17.51 21.96 12C21.96 6.45 17.5 2 12.04 2ZM12.04 20.15C10.21 20.15 8.48 19.62 7.03 18.66L6.73 18.48L4.3 19.12L4.96 16.78L4.77 16.48C3.71 14.94 3.13 13.1 3.13 11.2C3.13 7.05 7.18 3 12.04 3C16.9 3 21 7.05 21 11.96C21 16.88 16.9 20.15 12.04 20.15ZM16.32 14.53C16.03 14.39 14.86 13.8 14.63 13.71C14.4 13.62 14.24 13.58 14.09 13.82C13.94 14.06 13.38 14.72 13.2 14.89C13.02 15.06 12.84 15.08 12.55 14.94C12.26 14.79 11.32 14.48 10.22 13.53C9.35 12.79 8.79 11.85 8.65 11.58C8.51 11.31 8.61 11.19 8.73 11.08C8.84 10.97 8.98 10.79 9.12 10.64C9.26 10.49 9.31 10.37 9.42 10.18C9.53 9.99 9.47 9.83 9.38 9.68C9.28 9.53 8.79 8.31 8.57 7.82C8.35 7.33 8.14 7.38 7.97 7.37H7.55C7.38 7.37 7.1 7.46 6.87 7.7C6.64 7.94 6.02 8.49 6.02 9.71C6.02 10.93 6.89 12.1 7.01 12.25C7.13 12.4 8.8 14.92 11.25 15.93C11.83 16.17 12.28 16.32 12.61 16.43C13.19 16.6 13.72 16.58 14.12 16.51C14.58 16.43 15.75 15.82 15.97 15.23C16.19 14.64 16.19 14.16 16.12 14.06C16.05 13.96 15.91 13.91 15.75 13.82C15.59 13.73 16.47 14.68 16.32 14.53Z" />
  </svg>
);

// Typewriter Effect Component
const Typewriter = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0); // eslint-disable-line no-unused-vars

  useEffect(() => {
    setDisplayText(''); // Reset display text on text change
    setCurrentIndex(0); // Reset index

    if (text.length === 0) return;

    const typingInterval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        if (prevIndex < text.length) {
          setDisplayText(text.substring(0, prevIndex + 1));
          return prevIndex + 1;
        } else {
          clearInterval(typingInterval);
          return prevIndex;
        }
      });
    }, 100);

    return () => clearInterval(typingInterval);
  }, [text]);

  return <span>{displayText}</span>;
};

// Main App Component
export default function App() {
  const [isContactModalOpen, setContactModalOpen] = useState(false);

  const openContactModal = () => setContactModalOpen(true);
  const closeContactModal = () => setContactModalOpen(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@700&family=Inter:wght@400;500&display=swap');
        body {
          font-family: 'Inter', sans-serif;
          background-color: #0d0c14;
        }
        .font-display { font-family: 'Exo 2', sans-serif; }
      `}</style>
      <div className="bg-[#0d0c14] text-gray-300 font-sans">
        <Navbar />
        <SplashCursor />
        <main className="pt-20"> {/* Add padding-top to account for fixed Navbar height */}
          <HeroSection />
          <AboutMeSection />
          <WorkExperienceSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection openModal={openContactModal} />
        </main>
        <Footer />
        <AnimatePresence>
          {isContactModalOpen && <ContactModal closeModal={closeContactModal} />}
        </AnimatePresence>
      </div>
    </>
  );
}

// -- Reusable Components --
const AnimatedSection = ({ id, children, className = "" }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.6, 0.05, 0.01, 0.9] } }
  };

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={`py-24 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </motion.section>
  );
};

const SectionTitle = ({ children }) => (
  <h2 className="text-4xl font-display font-bold text-center mb-16 text-white relative">
    {children}
    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-purple-600 rounded-full shadow-[0_0_15px_rgba(147,51,234,0.5)]"></span>
  </h2>
);

// --- PAGE SECTIONS ---
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ["Home", "About", "Experience", "Skills", "Projects", "Contact"];

  return (
    <nav className="bg-[#0d0c14]/60 backdrop-blur-lg fixed w-full z-50 top-0 transition-colors duration-500 border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#hero" className="flex-shrink-0 text-purple-500 hover:text-purple-400 transition-colors">
            <Logo className="w-9 h-9" />
          </a>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {navLinks.map(link => (
                <a key={link} href={`#${link.toLowerCase() === 'home' ? 'hero' : link.toLowerCase()}`} className="text-gray-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-all">
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none">
              {isOpen ? <span className="text-2xl">&times;</span> : <span className="text-2xl">&#9776;</span>}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-[#111019]/95">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map(link => (
              <a key={link} href={`#${link.toLowerCase() === 'home' ? 'hero' : link.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-gray-300 hover:bg-purple-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all text-center">
                {link}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center text-center bg-[#0d0c14] relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Squares
          direction="up"
          speed={0.3}
          borderColor="#341F38"
          squareSize={40}
          hoverFillColor="#7D3C86"
        />
      </div>
      <div className="relative z-10 flex flex-col items-center px-4">
        <motion.div
          className="relative mb-6"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          <img
            src={profileImage}
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/160x160/1F2937/FFFFFF?text=MH'; }}
            alt="M M Mishaf Hasan"
            className="w-40 h-40 rounded-full object-cover border-4 border-purple-700 shadow-[0_0_30px_rgba(147,51,234,0.5)]"
          />
          <div className="absolute inset-0 rounded-full border-2 border-purple-500/50 animate-pulse-slow"></div>
          <div className="absolute inset-[-8px] rounded-full border border-purple-400/30 animate-pulse-slower"></div>
        </motion.div>
        <motion.h1
          className="text-5xl md:text-7xl font-display font-bold text-white mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Mishaf Hasan
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-purple-300 font-light mb-4 min-h-[32px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Typewriter text="Full-Stack Developer & AI Enthusiast" />
        </motion.p>
        <motion.p
          className="max-w-2xl text-gray-400 mx-auto mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          A passionate Computer Science undergraduate driving to build modern, efficient, and scalable web and mobile solutions.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <a href="#about" className="group flex flex-col items-center text-gray-400 hover:text-purple-300 transition-colors">
            <span className="mb-1 text-sm">Scroll</span>
            <ChevronDown className="animate-bounce w-7 h-7"/>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function AboutMeSection() {
  return (
    <AnimatedSection id="about">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-2/3 text-lg space-y-4 text-gray-300">
          <h2 className="text-4xl font-display font-bold text-white mb-4">About Me</h2>
          <p>I'm a detail-oriented Computer Science undergraduate from the University of Colombo School of Computing, with hands-on experience in full-stack development using technologies like React, Next.js, Flutter, and Spring Boot. I'm eager to apply my knowledge in real-world applications, contribute to team success, and continuously learn and adapt.</p>
          <p>My journey in tech is driven by a curiosity for solving complex problems and building efficient, user-friendly applications. I thrive in collaborative environments where I can both learn from my peers and share my own insights. I'm currently seeking new opportunities to leverage my skills in a challenging role.</p>
          <div className="flex items-center space-x-6 pt-4">
            <a href="https://raw.githubusercontent.com/mind-flayers/my-portfolio/cffb5972057fd22bbbcec5b35854b502aba44bd3/src/assets/resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-block bg-purple-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-purple-700 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(147,51,234,0.4)]">
              View Resume
            </a>
            <div className="flex space-x-4">
              <a href="https://github.com/mind-flayers" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors"><Github size={28} /></a>
              <a href="https://www.linkedin.com/in/mishaf-hasan-3234a7202" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors"><Linkedin size={28} /></a>
              <a href="mailto:mishafhasan@gmail.com" className="text-gray-400 hover:text-purple-400 transition-colors"><Mail size={28} /></a>
            </div>
          </div>
        </div>
        <motion.div
          className="lg:w-1/3 w-full mt-8 lg:mt-0"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="bg-gradient-to-br from-[#1E1C29] to-[#111019] p-2 rounded-lg shadow-2xl shadow-purple-900/20">
            <img
              src={resumeImage}
              onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/1F2937/FFFFFF?text=Profile'; }}
              alt="Mishaf Hasan Profile"
              className="rounded-lg"
            />
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

function WorkExperienceSection() {
  const experiences = [
    { title: "Frontend Development", icon: <Code/>, description: "Building responsive and dynamic user interfaces with React and Next.js." },
    { title: "Mobile App Development", icon: <Smartphone/>, description: "Creating cross-platform mobile apps with Flutter and Firebase." },
    { title: "Backend Engineering", icon: <Database/>, description: "Developing robust server-side applications with Spring Boot and Node.js." },
    { title: "UI/UX Design", icon: <Wind/>, description: "Crafting intuitive and engaging user experiences with a focus on clean design." },
  ];

  return (
    <AnimatedSection id="experience" className="bg-[#111019]">
      <SectionTitle>What I Do</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {experiences.map(exp => (
          <SpotlightCard
            key={exp.title}
            className="bg-gradient-to-br from-[#1E1C29] to-[#111019] p-6 rounded-lg border border-purple-900/50 hover:border-purple-600 transition-all duration-300 shadow-lg hover:shadow-purple-700/20 hover:-translate-y-2"
            spotlightColor="#9333ea"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-purple-500 mb-4">{React.cloneElement(exp.icon, { size: 36 })}</div>
              <h3 className="text-xl font-bold font-display text-white mb-2">{exp.title}</h3>
              <p className="text-gray-400">{exp.description}</p>
            </motion.div>
          </SpotlightCard>
        ))}
      </div>
    </AnimatedSection>
  )
}

function SkillsSection() {
  const skills = [
    { name: 'React', icon: 'https://cdn.worldvectorlogo.com/logos/react-2.svg' },
    { name: 'Next.js', icon: 'https://cdn.worldvectorlogo.com/logos/next-js.svg' },
    { name: 'Flutter', icon: 'https://cdn.worldvectorlogo.com/logos/flutter.svg' },
    { name: 'Node.js', icon: 'https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg' },
    { name: 'Spring', icon: 'https://cdn.worldvectorlogo.com/logos/spring-3.svg' },
    { name: 'Java', icon: 'https://cdn.worldvectorlogo.com/logos/java-4.svg' },
    { name: 'Firebase', icon: 'https://cdn.worldvectorlogo.com/logos/firebase-1.svg' },
    { name: 'MySQL', icon: 'https://www.svgrepo.com/show/303251/mysql-logo.svg' },
    { name: 'Tailwind CSS', icon: 'https://cdn.worldvectorlogo.com/logos/tailwind-css-2.svg' },
    { name: 'Docker', icon: 'https://cdn.worldvectorlogo.com/logos/docker.svg' },
  ];

  return (
    <AnimatedSection id="skills">
      <SectionTitle>Technologies I Use</SectionTitle>
      <p className="text-center max-w-2xl mx-auto text-gray-400 -mt-8 mb-12">
        I'm currently working with a variety of modern technologies to build high-quality web and mobile applications.
      </p>
      <div className="flex flex-wrap justify-center items-center gap-8">
                {skills.map((skill, index) => (
                     <motion.div 
                        key={skill.name}
                        className="group flex flex-col items-center gap-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                     >
                        <div className="w-20 h-20 bg-[#111019] rounded-full flex items-center justify-center border-2 border-purple-900/60 group-hover:border-purple-600 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(147,51,234,0.4)]">
                            <img src={skill.icon} alt={skill.name} className="h-10 w-10 object-contain"/>
                        </div>
                        <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{skill.name}</span>
                    </motion.div>
                ))}
            </div>
    </AnimatedSection>
  );
}

const BrowserFrame = ({ children, title }) => (
  <div className="bg-[#1E1C29] border border-purple-900/50 rounded-lg shadow-2xl shadow-purple-900/20 overflow-hidden h-full">
    <div className="flex items-center p-3 bg-gray-900/50">
      <div className="flex space-x-1.5">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="flex-grow text-center text-sm text-gray-400">{title}</div>
    </div>
    {children}
  </div>
);

function ProjectsSection() {
  const projects = [
    { title: "RouteLead", description: "Final Year Project: A logistics bidding platform connecting return-trip drivers with deliveries.", tech: ["React Native", "Spring Boot", "Supabase"], link: "https://github.com/mind-flayers/RouteLead", image: "https://placehold.co/600x400/374151/FFFFFF?text=RouteLead+Preview" },
    { title: "Epic Reads", description: "An online bookstore project enabling book browsing, order management, and user/admin control.", tech: ["Java", "MySQL", "JSP/Servlets"], link: "https://github.com/mind-flayers/epic-reads", image: "https://placehold.co/600x400/374151/FFFFFF?text=Epic+Reads+Preview" },
    { title: "Edu-Track", description: "Flutter app for managing students, attendance, and payments with QR and SMS integration.", tech: ["Flutter", "Firebase", "Cloudinary"], link: "https://github.com/mind-flayers/edu-track", image: "https://placehold.co/600x400/374151/FFFFFF?text=Edu-Track+Preview" },
  ];

  return (
    <AnimatedSection id="projects" className="bg-[#111019]">
      <SectionTitle>Example Projects</SectionTitle>
      <div className="space-y-24">
        {projects.map((p, index) => (
          <div key={p.title} className={`flex flex-col md:flex-row items-center gap-8 lg:gap-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className="md:w-1/2">
              <BrowserFrame title={p.title}>
                <img src={p.image} alt={p.title} className="w-full h-auto object-cover" />
              </BrowserFrame>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-3xl font-display font-bold text-white mb-4">{p.title}</h3>
              <p className="text-gray-400 mb-6">{p.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {p.tech.map(t => <span key={t} className="bg-purple-900/50 text-purple-300 text-sm font-medium px-3 py-1 rounded-full border border-purple-800/60">{t}</span>)}
              </div>
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                View on GitHub <Github size={18} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}

function ContactSection({ openModal }) {
  return (
    <AnimatedSection id="contact">
      <SectionTitle>Get In Touch</SectionTitle>
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-lg text-gray-400 mb-8">
          I'm currently looking for new opportunities and my inbox is always open. Whether you have a question, a proposal, or just want to say hi, I'll get back to you!
        </p>
        <button
          onClick={openModal}
          className="inline-block bg-purple-600 text-white font-bold py-4 px-10 rounded-lg hover:bg-purple-700 transition-all transform hover:scale-105 shadow-[0_0_25px_rgba(147,51,234,0.5)]"
        >
          Say Hello
        </button>
      </div>
    </AnimatedSection>
  );
}

function ContactModal({ closeModal }) {
  // Whatsapp number 
  const whatsappLink = "https://wa.me/94789393823";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={closeModal}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="bg-gradient-to-br from-[#1E1C29] to-[#111019] w-full max-w-md rounded-2xl p-8 border border-purple-900/50 shadow-2xl shadow-purple-900/20 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
          <X size={24} />
        </button>
        <h3 className="text-2xl font-display font-bold text-white text-center mb-2">Contact Me</h3>
        <p className="text-center text-gray-400 mb-8">Choose your preferred way to connect.</p>
        <div className="flex flex-col gap-4">
          <a href="mailto:mishafhasan@gmail.com" className="group flex items-center justify-center w-full gap-3 inline-block bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 transition-all transform hover:scale-105 shadow-[0_0_25px_rgba(147,51,234,0.5)]">
            <Mail size={20} />
            Send an Email
          </a>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center w-full gap-3 bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg shadow-green-700/30">
            <WhatsAppIcon className="w-5 h-5" />
            Chat on WhatsApp
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Footer() {
  return (
    <footer className="bg-[#111019] text-center py-10 border-t border-purple-900/30">
      <div className="flex justify-center mb-6">
        <Logo className="w-12 h-12 text-purple-700"/>
      </div>
      <div className="flex justify-center space-x-6 mb-6">
        <a href="https://github.com/mind-flayers" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-purple-400 transition-colors"><Github size={24} /></a>
        <a href="https://www.linkedin.com/in/mishaf-hasan-3234a7202" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-purple-400 transition-colors"><Linkedin size={24} /></a>
        <a href="mailto:mishafhasan@gmail.com" className="text-gray-500 hover:text-purple-400 transition-colors"><Mail size={24} /></a>
      </div>
      <p className="text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Mishaf Hasan. Designed & Built with &hearts;
      </p>
    </footer>
  );
}