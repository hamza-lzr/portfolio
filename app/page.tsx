"use client"; 

import React, { useState, useEffect, PropsWithChildren } from 'react';
// --- FRAMER MOTION ---
// We've added framer-motion for animations
import { motion, AnimatePresence } from 'framer-motion';

// --- ICONS ---
import {
  LinkedinIcon as Linkedin,
  Github,
  Mail,
  Phone,
  Menu,
  X,
  ArrowUpRight,
  MapPin,
  CalendarDays,
  Briefcase,
  GraduationCap,
  Code,
  Database,
  Cog,
  BookOpen,
  Download
} from 'lucide-react';

// --- TYPES ---
interface NavLink {
  name: string;
  href: string;
}

interface Experience {
  role: string;
  company: string;
  location: string;
  dates: string;
  description: string;
  technologies: string[];
}

interface Project {
  name: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  otherUrl?: string;
}

interface SkillCategory {
  category: string;
  skills: string[];
}

// --- DATA FROM YOUR CV ---

const personalInfo = {
  name: "Hamza Lazaar",
  title: "Software Engineering Student @ ENSA Agadir",
  email: "lazaarhamza@gmail.com",
  phone: "+212674145890",
  github: "https://github.com/hamza-lzr",
  linkedin: "https://www.linkedin.com/in/hamza-lazaar-19330a329/",
  // --- UPDATED PROFILE SUMMARY ---
  profileSummary: [
    "As a final-year Software Engineering student, my passion extends beyond just code! I'm driven by the challenge of solving real-world problems. For me, full-stack development is the ultimate creative outlet.",
    "It's the art of taking an idea from a simple concept to a fully-realized application, from crafting a robust Java Spring Boot backend to building a dynamic, user-friendly React frontend.",
    "I'm now seeking my final-year internship (PFE) to tackle new challenges, contribute to a team that builds scalable, impactful solutions, learn in a dynamic environment, and continue my growth as an aspiring engineer."
  ]
};

const navLinks: NavLink[] = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

const experienceData: Experience[] = [
  {
    role: "Internship - Full-Stack Developer",
    company: "Royal Air Maroc",
    location: "Casablanca",
    dates: "Jul 2025 - Aug 2025",
    description: "Design and development of a full-stack application for managing employee badges, passes, and airport access for RAM and its subsidiaries (Admin Platform + Employee Platform).",
    technologies: ["Java Spring Boot", "React", "TypeScript", "Bootstrap", "Keycloak", "PostgreSQL", "Git/GitHub"]
  },
  {
    role: "4th Year Internship (PFA) - Full-Stack Developer",
    company: "Ralydev Technology",
    location: "Agadir",
    dates: "Feb 2025 - May 2025",
    description: "Design and development of a full-stack web application including a company presentation website, a client platform for login and request submission, and a back-office administration platform.",
    technologies: ["Java Spring Boot", "React", "TypeScript", "JWT", "PostgreSQL", "TailwindCSS", "Git/GitHub"]
  }
];

const educationData = [
  {
    degree: "Software Engineering Major",
    institution: "ENSA Agadir",
    dates: "Current"
  },
  {
    degree: "High School Degree in Mathematical Sciences B",
    institution: "Ennour-2 High School, Casablanca",
    dates: ""
  }
];

const projectsData: Project[] = [
  {
    name: "RAM Access Management App (Internship)",
    description: "Full-stack application for managing employee badges, passes, and airport access for RAM and its subsidiaries (Admin Platform + Employee Platform).",
    technologies: ["Java Spring Boot", "React", "TypeScript", "Keycloak", "PostgreSQL"],
    githubUrl: "https://github.com/hamza-lzr/badgesApp", 
    otherUrl: "https://github.com/hamza-lzr/badges-app-frontend"
  },
  {
    name: "Ralydev Client/Back-Office Platform (PFA)",
    description: "Full-stack web platform including a company website, client portal for requests, and back-office administration.",
    technologies: ["Java Spring Boot", "React", "TypeScript", "JWT", "PostgreSQL", "TailwindCSS"],
    githubUrl: "https://github.com/hamza-lzr/ralydev_crud_frontend" 
  },
  {
    name: "Agile Management App",
    description: "Java SpringBoot API that allows the management of Agile projects (Sprints, Backlogs and role-based Authentication) using SCRUM.",
    technologies: ["Java Spring", "Spring Boot", "Spring Security", "Swagger", "Mockito", "JUnit", "PostgreSQL", "JWT", "Git"],
    githubUrl: "https://github.com/hamza-lzr/Agile_Management_App" 
  },
];

const skillsData: SkillCategory[] = [
  {
    category: "Programming Languages",
    skills: ["Java", "J2EE", "C/C++", "C#", "JavaScript", "TypeScript", "HTML/CSS"]
  },
  {
    category: "Frameworks & Libraries",
    skills: [ "Java Spring Boot", "React", ".NET", "TailwindCSS"]
  },
  {
    category: "Databases",
    skills: ["SQL", "PL/SQL", "PostgreSQL", "Oracle DB", "MySQL"]
  },
  {
    category: "Tools & Concepts",
    skills: ["Git", "Swagger", "Postman", "JWT", "Keycloak", "Agile (Scrum)"]
  }
];

// --- REUSABLE COMPONENTS ---

// Section Wrapper - Now with Framer Motion!
const Section: React.FC<PropsWithChildren<{ id: string, title: string, className?: string }>> = ({ id, title, children, className = "" }) => (
  <motion.section 
    id={id} 
    className={`w-full max-w-5xl mx-auto py-16 md:py-24 px-6 ${className}`}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: "easeInOut" }}
    viewport={{ once: true }}
  >
    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-teal-300">
      {title}
    </h2>
    {children}
  </motion.section>
);

// Tech Pill Component
const TechPill: React.FC<{ tech: string }> = ({ tech }) => (
  <span className="inline-block bg-gray-700 text-teal-200 rounded-full px-4 py-1.5 text-xs md:text-sm font-medium">
    {tech}
  </span>
);

// --- PAGE SECTIONS ---

// Header / Navigation
const Header: React.FC<{ isMenuOpen: boolean; setIsMenuOpen: (isOpen: boolean) => void }> = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-700">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-white hover:text-teal-300 transition-colors">
          {personalInfo.name}
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-teal-300 transition-colors font-medium"
            >
              {link.name}
            </a>
          ))}
          <a
            href="/Hamza_Lazaar_CV.pdf"
            download
            className="flex items-center gap-2 text-white font-medium bg-teal-600 px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
            aria-label="Download CV"
          >
            <Download size={20} />
            My CV
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-teal-300 transition-colors"
            aria-label="GitHub Profile"
          >
            <Github size={24} />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-teal-300 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={24} />
          </a>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-300 hover:text-teal-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu Dropdown - Now with Animation! */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden absolute top-full left-0 w-full bg-gray-900 border-t border-gray-700 shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex flex-col space-y-4 p-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-300 hover:text-teal-300 transition-colors font-medium text-lg"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="/Hamza_Lazaar_CV.pdf"
                download
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-white font-medium text-lg bg-teal-600 px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                aria-label="Download CV"
              >
                <Download size={24} />
                Download CV
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-teal-300 transition-colors text-lg"
                aria-label="GitHub Profile"
              >
                <Github size={24} />
                GitHub
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-teal-300 transition-colors text-lg"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={24} />
                LinkedIn
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// Hero Section
const Hero: React.FC = () => {
  const roles = [
    "Software Engineering Student @ ENSA Agadir",
    "Fullstack Developer",
    "Java Enthusiast ♨️",
    "Seeking a PFE Internship"
  ];
  
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen w-full flex items-center justify-center text-center px-6 pt-24 pb-12 overflow-hidden">
      <motion.div 
        className="max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4">
          Hi, I am <span className="text-teal-300">{personalInfo.name}</span>
        </h1>
        <AnimatePresence mode="wait">
          <motion.p 
            key={currentRoleIndex}
            className="text-xl md:text-2xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {roles[currentRoleIndex]}
          </motion.p>
        </AnimatePresence>
        <div className="flex flex-wrap justify-center gap-4">
          <motion.a 
            href="/Hamza_Lazaar_CV.pdf"
            download
            className="bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Download size={20} />
            Download CV
          </motion.a>
          <motion.a 
            href="#projects" 
            className="bg-gray-700 text-gray-100 font-semibold px-6 py-3 rounded-lg shadow-lg"
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            View My Work
          </motion.a>
          <motion.a 
            href="#contact" 
            className="bg-gray-700 text-gray-100 font-semibold px-6 py-3 rounded-lg shadow-lg"
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Get in Touch
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

// About Section
const About: React.FC = () => (
  <Section id="about" title="About Me">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
      <div className="lg:col-span-2 space-y-6 text-gray-300 text-lg leading-relaxed">
        {/* Updated profile summary paragraphs */}
        {personalInfo.profileSummary.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <GraduationCap className="text-teal-300" />
          Education
        </h3>
        <ul className="space-y-5">
          {educationData.map((edu, index) => (
            <li key={index}>
              <h4 className="font-semibold text-white text-lg">{edu.degree}</h4>
              <p className="text-gray-400">{edu.institution}</p>
              {edu.dates && <p className="text-gray-500 text-sm">{edu.dates}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Section>
);

// Experience Section
const Experience: React.FC = () => (
  <Section id="experience" title="Professional Experience">
    <div className="relative space-y-12">
      {/* Timeline Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-700" />
      
      {experienceData.map((job, index) => (
        <div key={index} className="relative flex md:justify-center">
          {/* Timeline Dot */}
          <div className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2 w-4 h-4 bg-teal-400 rounded-full border-4 border-gray-900" />
          
          <div className={`w-full md:w-1/2 p-6 rounded-lg shadow-xl bg-gray-800 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12 md:self-end'}`}>
            <h3 className="text-2xl font-bold text-white">{job.role}</h3>
            <h4 className="text-lg font-semibold text-teal-300 mb-2">{job.company}</h4>
            <div className={`flex items-center gap-4 text-gray-400 mb-4 md:justify-start`}>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays size={16} />
                <span>{job.dates}</span>
              </div>
            </div>
            <p className="text-gray-300 mb-5">{job.description}</p>
            <div className={`flex flex-wrap gap-2 md:justify-start`}>
              {job.technologies.map((tech) => (
                <TechPill key={tech} tech={tech} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </Section>
);

// Projects Section
const Projects: React.FC = () => (
  <Section id="projects" title="Projects">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projectsData.map((project, index) => (
        <motion.a 
          key={index}
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col group" // Removed transition classes
          whileHover={{ y: -8, scale: 1.03 }} // Added framer-motion hover
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">{project.name}</h3>
              <ArrowUpRight className="text-gray-500 group-hover:text-teal-300 transition-colors" size={20} />
            </div>
            <p className="text-gray-300 mb-6">{project.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <TechPill key={tech} tech={tech} />
            ))}
          </div>
        </motion.a>
      ))}
    </div>
  </Section>
);

// Skills Section
const Skills: React.FC = () => {
  const iconMap: { [key: string]: React.ReactNode } = {
    "Programming Languages": <Code className="text-teal-300" />,
    "Frameworks & Libraries": <Briefcase className="text-teal-300" />,
    "Databases": <Database className="text-teal-300" />,
    "Tools & Concepts": <Cog className="text-teal-300" />,
  };

  return (
    <Section id="skills" title="My Skills">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillsData.map((category) => (
          <div key={category.category} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              {iconMap[category.category] || <BookOpen className="text-teal-300" />}
              {category.category}
            </h3>
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill) => (
                 <span key={skill} className="bg-gray-900 text-gray-200 rounded-lg px-5 py-2.5 text-sm font-medium shadow-md">
                   {skill}
                 </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

// Contact Section
const Contact: React.FC = () => (
  <Section id="contact" title="Get in Touch">
    <div className="text-center max-w-xl mx-auto">
      <p className="text-lg text-gray-300 mb-8">
        I am currently seeking a final-year internship (PFE) and am open to new opportunities.
        Feel free to reach out!
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
        <a 
          href={`mailto:${personalInfo.email}`}
          className="flex items-center gap-3 text-lg font-medium text-gray-200 hover:text-teal-300 transition-colors bg-gray-800 px-6 py-3 rounded-lg shadow-lg"
        >
          <Mail size={22} />
          {personalInfo.email}
        </a>
        <a 
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-lg font-medium text-gray-200 hover:text-teal-300 transition-colors bg-gray-800 px-6 py-3 rounded-lg shadow-lg"
        >
          <Github size={22} />
          GitHub
        </a>
        <a 
          href={`tel:${personalInfo.phone}`}
          className="flex items-center gap-3 text-lg font-medium text-gray-200 hover:text-teal-300 transition-colors bg-gray-800 px-6 py-3 rounded-lg shadow-lg"
        >
          <Phone size={22} />
          {personalInfo.phone}
        </a>
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-lg font-medium text-gray-200 hover:text-teal-300 transition-colors bg-gray-800 px-6 py-3 rounded-lg shadow-lg"
        >
          <Linkedin size={22} />
          LinkedIn
        </a>
      </div>
    </div>
  </Section>
);

// Footer
const Footer: React.FC = () => (
  <footer className="w-full py-10 border-t border-gray-700">
    <div className="max-w-7xl mx-auto px-6 text-center text-gray-500">
      <p>&copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
    </div>
  </footer>
);


// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Global Styles */}
      <style>{`
        /* --- ADDED POPPINS FONT IMPORT --- */
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        
        html {
          scroll-behavior: smooth;
        }
        body {
          background-color: #111827; /* bg-gray-900 */
          color: #d1d5db; /* text-gray-300 */
          /* --- UPDATED FONT --- */
          font-family: 'Poppins', sans-serif;
        }
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #1f2937; /* bg-gray-800 */
        }
        ::-webkit-scrollbar-thumb {
          background: #0d9488; /* bg-teal-600 */
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #0f766e; /* bg-teal-700 */
        }
      `}</style>
      
      <div className="flex flex-col min-h-screen">
        <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <main className="flex-grow pt-20">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

// Next.js App Router requires the default export from page.tsx to be the component itself
export default App;

