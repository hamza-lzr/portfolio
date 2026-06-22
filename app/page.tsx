"use client";

import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import type { BufferAttribute } from "three";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Braces,
  Download,
  Mail,
  Menu,
  MonitorSmartphone,
  Phone,
  ServerCog,
  Terminal,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

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
  githubUrl?: string;
  otherUrl?: string;
  featured?: boolean;
}

interface SkillCategory {
  category: string;
  skills: string[];
}

interface HeroStatement {
  action: string;
  object: string;
}

const personalInfo = {
  name: "Hamza Lazaar",
  title: "Software Engineer | Fullstack Web Developer",
  currentRole: "Fullstack SWE at VOID Agency",
  location: "Morocco",
  email: "lazaarhamza@gmail.com",
  phone: "+212674145890",
  github: "https://github.com/hamza-lzr",
  linkedin: "https://www.linkedin.com/in/hamza-lazaar-19330a329/",
  profileSummary: [
    "Software engineer and fullstack web developer building reliable web platforms across backend services, frontend interfaces, authentication, and data-driven workflows.",
    "My work sits between product clarity and implementation discipline: Java Spring Boot APIs, React and Next.js interfaces, Oracle and PostgreSQL data models, and delivery habits shaped by real client and internship projects.",
    "I am currently working as a Fullstack SWE at VOID Agency while completing my PFE, with a focus on maintainable systems, clean user experiences, and production-ready engineering.",
  ],
};

const navLinks: NavLink[] = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

const heroStatements: HeroStatement[] = [
  { action: "Building", object: "platforms" },
  { action: "Designing", object: "systems" },
  { action: "Shipping", object: "workflows" },
  { action: "Crafting", object: "interfaces" },
];

const experienceData: Experience[] = [
  {
    role: "Fullstack SWE",
    company: "VOID Agency",
    location: "Morocco",
    dates: "Current",
    description:
      "Building full-stack web experiences for agency clients, combining polished interfaces with maintainable backend logic and practical delivery workflows.",
    technologies: ["React", "Next.js", "TypeScript", "Java Spring Boot", "PostgreSQL", "Git"],
  },
  {
    role: "Final-Year Project",
    company: "Maaloumati migration project",
    location: "ENSA Agadir",
    dates: "PFE",
    description:
      "Migration-focused engineering project for modernizing Maaloumati, improving maintainability, data flow, and the reliability of the application architecture.",
    technologies: ["Migration", "Java Spring Boot", "React", "TypeScript", "REST APIs", "Oracle DB"],
  },
  {
    role: "Full-Stack Developer Intern",
    company: "Royal Air Maroc",
    location: "Casablanca",
    dates: "Jul 2025 - Aug 2025",
    description:
      "Designed and developed a full-stack application for managing employee badges, passes, and airport access for RAM and its subsidiaries.",
    technologies: ["Java Spring Boot", "React", "TypeScript", "Bootstrap", "Keycloak", "PostgreSQL"],
  },
  {
    role: "PFA Full-Stack Developer",
    company: "Ralydev Technology",
    location: "Agadir",
    dates: "Feb 2025 - May 2025",
    description:
      "Built a company website, client request portal, and back-office administration platform for a full-stack business workflow.",
    technologies: ["Java Spring Boot", "React", "TypeScript", "JWT", "PostgreSQL", "TailwindCSS"],
  },
];

const educationData = [
  {
    degree: "Software Engineering",
    institution: "ENSA Agadir",
    dates: "Final year",
  },
  {
    degree: "Mathematical Sciences B",
    institution: "Ennour-2 High School, Casablanca",
    dates: "High school degree",
  },
];

const projectsData: Project[] = [
  {
    name: "Maaloumati Migration Project",
    description:
      "PFE project focused on migrating Maaloumati toward a cleaner, more maintainable full-stack architecture with stronger data flow and delivery readiness.",
    technologies: ["Migration", "Java Spring Boot", "React", "TypeScript", "Oracle DB"],
    featured: true,
  },
  {
    name: "RAM Access Management App",
    description:
      "Full-stack platform for employee badges, passes, and airport access management across RAM and subsidiary workflows.",
    technologies: ["Java Spring Boot", "React", "TypeScript", "Keycloak", "PostgreSQL"],
    githubUrl: "https://github.com/hamza-lzr/badgesApp",
    otherUrl: "https://github.com/hamza-lzr/badges-app-frontend",
  },
  {
    name: "Ralydev Client Platform",
    description:
      "Company website, client portal, and back-office administration system for request intake and operational follow-up.",
    technologies: ["Java Spring Boot", "React", "TypeScript", "JWT", "PostgreSQL"],
    githubUrl: "https://github.com/hamza-lzr/ralydev_crud_frontend",
  },
  {
    name: "Agile Management App",
    description:
      "Spring Boot API for managing Scrum projects, sprints, backlogs, role-based authentication, and API documentation.",
    technologies: ["Java Spring", "Spring Security", "Swagger", "JUnit", "PostgreSQL"],
    githubUrl: "https://github.com/hamza-lzr/Agile_Management_App",
  },
];

const skillsData: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["Java", "J2EE", "PHP", "JavaScript", "TypeScript", "HTML/CSS"],
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TailwindCSS", "Responsive UI", "Framer Motion"],
  },
  {
    category: "Backend",
    skills: ["Java Spring Boot", "PHP", "Drupal", "REST APIs", "JWT", "Keycloak"],
  },
  {
    category: "Data & Tools",
    skills: ["PostgreSQL", "Oracle DB", "MySQL", "Git", "Swagger", "Postman", "Linux", "Docker", "Scrum"],
  },
];

const stackIconMap: Record<string, LucideIcon> = {
  Languages: Braces,
  Frontend: MonitorSmartphone,
  Backend: ServerCog,
  "Data & Tools": Terminal,
};

const easeCinematic = [0.22, 0.78, 0.26, 1] as const;
const easeIn = [0.4, 0, 1, 1] as const;
const easeEmphasized = [0.2, 0, 0, 1] as const;

const createFadeUp = (distance: number, reducedMotion: boolean) => ({
  hidden: { opacity: 0, y: reducedMotion ? 0 : distance },
  visible: { opacity: 1, y: 0 },
});

const createRevealTransition = (delay = 0, duration = 0.72) => ({
  delay,
  duration,
  ease: easeCinematic,
});

const createMaskedTextCycle = (reducedMotion: boolean) => ({
  hidden: { opacity: 0, y: reducedMotion ? "0%" : "112%" },
  visible: { opacity: 1, y: "0%" },
  exit: { opacity: 0, y: reducedMotion ? "0%" : "-112%" },
});

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

const heroSequence = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.18,
      staggerChildren: 0.16,
    },
  },
};

const createMobileMenuVariants = (reducedMotion: boolean) =>
  reducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.36, ease: easeCinematic, when: "beforeChildren", staggerChildren: 0.08 },
        },
        exit: { opacity: 0, transition: { duration: 0.28, ease: easeIn } },
      }
    : {
        hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
        visible: {
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          transition: { duration: 0.58, ease: easeEmphasized, when: "beforeChildren", staggerChildren: 0.08 },
        },
        exit: {
          opacity: 0,
          clipPath: "inset(0 0 100% 0)",
          transition: { duration: 0.34, ease: easeIn },
        },
      };

const scrollRevealViewport = {
  once: true,
  amount: 0.24,
  margin: "0px 0px -96px 0px",
} as const;

const ScrollReveal: React.FC<
  PropsWithChildren<{
    className?: string;
    delay?: number;
    distance?: number;
    duration?: number;
  }>
> = ({ children, className, delay = 0, distance = 18, duration = 0.72 }) => {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={scrollRevealViewport}
      variants={createFadeUp(distance, Boolean(reducedMotion))}
      transition={createRevealTransition(delay, duration)}
    >
      {children}
    </motion.div>
  );
};

const handleDepthPointerMove = (event: React.PointerEvent<HTMLElement>) => {
  if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const target = event.currentTarget;
  const rect = target.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;

  target.style.setProperty("--tilt-x", `${(-y * 5.5).toFixed(2)}deg`);
  target.style.setProperty("--tilt-y", `${(x * 7).toFixed(2)}deg`);
  target.style.setProperty("--depth-x", `${(x * 18).toFixed(2)}px`);
  target.style.setProperty("--depth-y", `${(y * 18).toFixed(2)}px`);
};

const resetDepthPointer = (event: React.PointerEvent<HTMLElement>) => {
  event.currentTarget.style.setProperty("--tilt-x", "0deg");
  event.currentTarget.style.setProperty("--tilt-y", "0deg");
  event.currentTarget.style.setProperty("--depth-x", "0px");
  event.currentTarget.style.setProperty("--depth-y", "0px");
};

const OrganicHeroScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let frameId = 0;
    let disposed = false;
    let isVisible = true;
    let hasPresentedFrame = false;
    let normalFrame = 0;
    let cleanupScene: (() => void) | undefined;

    const initScene = async () => {
      const THREE = await import("three");

      if (disposed || !canvasRef.current) {
        return;
      }

      const canvas = canvasRef.current;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const pointer = { x: 0, y: 0 };
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });

      renderer.setClearColor(0x000000, 1);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.08;

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x000000, 0.05);

      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
      camera.position.set(0, 0.15, 8.6);

      const group = new THREE.Group();
      scene.add(group);

      const geometry = new THREE.SphereGeometry(2.35, 88, 44);
      const position = geometry.getAttribute("position") as BufferAttribute;
      const basePositions = new Float32Array(position.array as ArrayLike<number>);

      const material = new THREE.MeshPhysicalMaterial({
        color: 0x10241d,
        roughness: 0.34,
        metalness: 0.58,
        clearcoat: 0.64,
        clearcoatRoughness: 0.22,
        emissive: 0x04110c,
        emissiveIntensity: 0.72,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.set(-0.18, 0.34, -0.08);
      group.add(mesh);

      const shellGeometry = new THREE.IcosahedronGeometry(2.95, 3);
      const shellMaterial = new THREE.MeshBasicMaterial({
        color: 0xa0e0ab,
        transparent: true,
        opacity: 0.08,
        wireframe: true,
        depthWrite: false,
      });
      const shell = new THREE.Mesh(shellGeometry, shellMaterial);
      shell.rotation.set(0.22, -0.4, 0.18);
      group.add(shell);

      const ribbonGeometry = new THREE.TorusKnotGeometry(1.58, 0.24, 220, 30);
      const ribbonMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x2a120c,
        roughness: 0.3,
        metalness: 0.68,
        clearcoat: 0.6,
        clearcoatRoughness: 0.2,
        emissive: 0x120503,
        emissiveIntensity: 0.46,
      });
      const ribbon = new THREE.Mesh(ribbonGeometry, ribbonMaterial);
      ribbon.rotation.set(0.8, -0.2, 0.48);
      ribbon.scale.setScalar(1.18);
      group.add(ribbon);

      const particleCount = 118;
      const particleGeometry = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i += 1) {
        const angle = i * 2.399963229728653;
        const layer = (i % 17) / 16;
        const radius = 3.05 + (i % 9) * 0.055;
        const z = (layer - 0.5) * 4.8;
        const orbitalRadius = Math.sqrt(Math.max(radius * radius - z * z * 0.18, 0.2));

        particlePositions[i * 3] = Math.cos(angle) * orbitalRadius;
        particlePositions[i * 3 + 1] = Math.sin(angle) * orbitalRadius * 0.72;
        particlePositions[i * 3 + 2] = z;
      }

      particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
      const particleMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.32,
        size: 0.026,
        depthWrite: false,
      });
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      particles.rotation.set(0.18, 0, -0.08);
      group.add(particles);

      const rim = new THREE.PointLight(0xffa52e, 62, 16);
      rim.position.set(3.8, 2.4, 3.1);
      scene.add(rim);

      const green = new THREE.PointLight(0x7fd99b, 46, 14);
      green.position.set(-3.8, -1.2, 4.2);
      scene.add(green);

      const oxblood = new THREE.PointLight(0x9b2b1e, 34, 13);
      oxblood.position.set(1.2, -3.2, 3.8);
      scene.add(oxblood);

      const fill = new THREE.AmbientLight(0x16201c, 1.3);
      scene.add(fill);

      const resize = () => {
        const parent = canvas.parentElement;
        const width = parent?.clientWidth || window.innerWidth;
        const height = parent?.clientHeight || window.innerHeight;

        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.position.z = width < 720 ? 8.9 : 7.8;
        group.position.x = width < 900 ? 0 : 0.7;
        group.scale.setScalar(width < 720 ? 0.96 : 1.05);
        camera.updateProjectionMatrix();
      };

      const onPointerMove = (event: PointerEvent) => {
        if (reducedMotion) {
          return;
        }

        pointer.x = event.clientX / window.innerWidth - 0.5;
        pointer.y = event.clientY / window.innerHeight - 0.5;
      };

      const render = (time = 0) => {
        frameId = 0;
        const t = reducedMotion ? 2.4 : time * 0.001;

        for (let i = 0; i < position.count; i += 1) {
          const index = i * 3;
          const x = basePositions[index];
          const y = basePositions[index + 1];
          const z = basePositions[index + 2];
          const wave =
            1 +
            Math.sin(x * 1.55 + t * 0.72) * 0.105 +
            Math.sin(y * 2.15 + z * 0.8 + t * 0.48) * 0.075 +
            Math.cos((x - y + z) * 2.65 + t * 0.38) * 0.045;

          position.setXYZ(i, x * wave, y * wave, z * wave);
        }

        position.needsUpdate = true;
        if (normalFrame % 4 === 0) {
          geometry.computeVertexNormals();
        }
        normalFrame += 1;

        mesh.rotation.y = 0.34 + Math.sin(t * 0.16) * 0.08 + t * 0.045;
        mesh.rotation.x = -0.18 + Math.cos(t * 0.12) * 0.06;
        mesh.position.z = Math.sin(t * 0.22) * 0.08;
        shell.rotation.x = 0.22 + Math.sin(t * 0.14) * 0.08;
        shell.rotation.y = -0.4 - t * 0.026;
        shell.rotation.z = 0.18 + Math.cos(t * 0.16) * 0.05;
        ribbon.rotation.y = -0.2 - t * 0.068;
        ribbon.rotation.x = 0.8 + Math.sin(t * 0.2) * 0.07;
        ribbon.rotation.z = 0.48 + t * 0.035;
        ribbon.position.z = 0.1 + Math.cos(t * 0.18) * 0.12;
        particles.rotation.y = t * 0.018;
        particles.rotation.x = 0.18 + Math.sin(t * 0.11) * 0.035;
        group.rotation.y = pointer.x * 0.16;
        group.rotation.x = pointer.y * -0.08;
        group.rotation.z = Math.sin(t * 0.18) * 0.045;

        renderer.render(scene, camera);

        if (!hasPresentedFrame) {
          hasPresentedFrame = true;
          window.requestAnimationFrame(() => {
            if (!disposed) {
              setIsReady(true);
            }
          });
        }

        if (!reducedMotion && !disposed && isVisible) {
          frameId = window.requestAnimationFrame(render);
        }
      };

      resize();
      window.addEventListener("resize", resize);
      window.addEventListener("pointermove", onPointerMove);
      const observer =
        typeof IntersectionObserver === "undefined"
          ? undefined
          : new IntersectionObserver(
              ([entry]) => {
                isVisible = Boolean(entry?.isIntersecting);

                if (!isVisible && frameId) {
                  window.cancelAnimationFrame(frameId);
                  frameId = 0;
                }

                if (isVisible && !reducedMotion && !frameId && !disposed) {
                  frameId = window.requestAnimationFrame(render);
                }
              },
              { threshold: 0.08 },
            );

      observer?.observe(canvas.parentElement ?? canvas);
      render(0);

      cleanupScene = () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onPointerMove);
        observer?.disconnect();
        window.cancelAnimationFrame(frameId);
        geometry.dispose();
        material.dispose();
        shellGeometry.dispose();
        shellMaterial.dispose();
        ribbonGeometry.dispose();
        ribbonMaterial.dispose();
        particleGeometry.dispose();
        particleMaterial.dispose();
        renderer.dispose();
      };
    };

    void initScene();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      cleanupScene?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full transition-opacity duration-[900ms] ease-out ${
        isReady ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    />
  );
};

const Section: React.FC<PropsWithChildren<{ id: string; label: string; title: string; dark?: boolean }>> = ({
  id,
  label,
  title,
  dark = false,
  children,
}) => {
  return (
    <section
      id={id}
      className={`w-full ${dark ? "bg-black text-white" : "bg-white text-[#181818]"}`}
    >
      <div className="section-shell section-grid">
        <ScrollReveal distance={16} duration={0.78}>
          <p className={`eyebrow mb-6 ${dark ? "text-white/60" : "text-[#6d6d6d]"}`}>{label}</p>
          <h2 className="display-heading max-w-[620px]">{title}</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.12} distance={20}>
          {children}
        </ScrollReveal>
      </div>
    </section>
  );
};

const TechPill: React.FC<{ tech: string; dark?: boolean }> = ({ tech, dark = false }) => (
  <span
    className={`tech-pill glass-control ${
      dark ? "glass-on-dark text-white" : "glass-on-light text-[#181818]"
    }`}
  >
    {tech}
  </span>
);

const Header: React.FC<{ isMenuOpen: boolean; setIsMenuOpen: (isOpen: boolean) => void }> = ({
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isLightHeader = isScrolled || isMenuOpen;
  const linkColor = isLightHeader ? "text-[#181818]" : "text-white";

  return (
    <header
      className={`site-header fixed left-0 right-0 top-0 z-50 ${
        isLightHeader ? "site-header--light text-[#181818]" : "site-header--dark text-white"
      }`}
    >
      <nav className="site-header-glass mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-10 xl:px-14">
        <a href="#home" className={`nav-brand ${linkColor}`} aria-label="Go to top">
          {personalInfo.name}&apos;s portfolio
        </a>

        <div className="hidden items-center gap-[15px] md:flex">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className={`nav-link ${linkColor}`}>
              {link.name}
            </a>
          ))}
          <a
            href="/HAMZA_LAZAAR_CV.pdf"
            download
            className={`pill-control nav-pill glass-control ${
              isLightHeader ? "glass-on-light text-[#181818]" : "glass-on-dark text-white"
            }`}
          >
            <Download size={15} />
            CV
          </a>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`glass-control inline-flex h-10 w-10 items-center justify-center rounded-[75px] md:hidden ${
            isLightHeader ? "glass-on-light text-[#181818]" : "glass-on-dark text-white"
          }`}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-menu-glass mx-auto mt-2 max-w-[1440px] px-6 pb-8 pt-6 text-[#181818] md:hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={createMobileMenuVariants(Boolean(reducedMotion))}
            style={{ transformOrigin: "top" }}
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[30px] font-light leading-[1.25]"
                  variants={createFadeUp(10, Boolean(reducedMotion))}
                  transition={createRevealTransition(0, 0.48)}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="/HAMZA_LAZAAR_CV.pdf"
                download
                onClick={() => setIsMenuOpen(false)}
                className="pill-control glass-control glass-solid-dark mt-2 w-fit text-white"
                variants={createFadeUp(10, Boolean(reducedMotion))}
                transition={createRevealTransition(0, 0.48)}
              >
                <Download size={17} />
                Download CV
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [heroStatementIndex, setHeroStatementIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const heroItem = createFadeUp(18, Boolean(reducedMotion));
  const heroLine = createMaskedTextCycle(Boolean(reducedMotion));
  const activeHeroStatement = heroStatements[heroStatementIndex];
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 86]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const planeY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const planeOpacity = useTransform(scrollYProgress, [0, 0.72], [0.42, 0]);

  useEffect(() => {
    if (reducedMotion) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setHeroStatementIndex((currentIndex) => (currentIndex + 1) % heroStatements.length);
    }, 5600);

    return () => window.clearInterval(intervalId);
  }, [reducedMotion]);

  return (
    <motion.section ref={heroRef} id="home" className="relative min-h-[92svh] overflow-hidden bg-black text-white">
      <motion.div
        className="absolute inset-0"
        style={reducedMotion ? undefined : { y: sceneY, scale: sceneScale }}
      >
        <OrganicHeroScene />
      </motion.div>
      <motion.div
        className="hero-depth-plane"
        aria-hidden="true"
        style={reducedMotion ? undefined : { y: planeY, opacity: planeOpacity }}
      />
      <div className="absolute inset-0 bg-black/32" aria-hidden="true" />

      <motion.div
        className="relative z-10 mx-auto flex min-h-[92svh] max-w-[1440px] flex-col justify-center px-6 pb-16 pt-24 md:px-10 xl:px-14"
        initial="hidden"
        animate="visible"
        variants={heroSequence}
        style={reducedMotion ? undefined : { y: contentY }}
      >
        <div className="grid gap-12 lg:grid-cols-[0.78fr_0.64fr] lg:items-end xl:grid-cols-[0.74fr_0.68fr] xl:gap-16">
          <div>
            <motion.p className="eyebrow mb-8 text-white/72" variants={heroItem} transition={createRevealTransition(0, 0.72)}>
              {personalInfo.currentRole}
            </motion.p>
            <motion.h1
              className="hero-heading max-w-[9ch]"
              aria-label={`${activeHeroStatement.action} ${activeHeroStatement.object}`}
            >
              <span className="hero-line-mask">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeHeroStatement.action}
                    className="hero-line-text"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={heroLine}
                    transition={createRevealTransition(0.02, 1.08)}
                  >
                    {activeHeroStatement.action}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="hero-line-mask">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeHeroStatement.object}
                    className="hero-line-text"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={heroLine}
                    transition={createRevealTransition(0.14, 1.08)}
                  >
                    {activeHeroStatement.object}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>
          </div>

          <motion.div
            className="w-full max-w-[560px] text-left lg:justify-self-stretch xl:max-w-[620px]"
            variants={heroItem}
            transition={createRevealTransition(0.22, 0.84)}
          >
            <p className="text-[30px] font-light leading-[1.25] text-white md:text-[39px] md:leading-[1.19]">
              {personalInfo.title}
            </p>
            <p className="body-lg mt-6 text-white/78">
              Building Java Spring Boot APIs, React and Next.js interfaces, PHP and Drupal features, and
              Oracle-backed workflows.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="pill-control glass-control glass-solid-light text-[#181818]">
                View Work
              </a>
              <a href={`mailto:${personalInfo.email}`} className="pill-control glass-control glass-on-dark text-white">
                <Mail size={16} />
                Contact
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

    </motion.section>
  );
};

const About: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const itemVariant = createFadeUp(10, Boolean(reducedMotion));

  return (
    <Section id="about" label="Profile" title="Full-stack work with a systems mindset.">
      <div className="grid gap-12 lg:grid-cols-[1.16fr_0.84fr]">
        <motion.div className="space-y-6 text-[18px] leading-[1.58] text-[#181818]" variants={staggerContainer}>
          {personalInfo.profileSummary.map((paragraph) => (
            <motion.p key={paragraph} variants={itemVariant} transition={createRevealTransition(0, 0.64)}>
              {paragraph}
            </motion.p>
          ))}
        </motion.div>
        <motion.div variants={createFadeUp(12, Boolean(reducedMotion))} transition={createRevealTransition(0.08, 0.68)}>
          <p className="eyebrow mb-6 text-[#6d6d6d]">Education</p>
          <motion.div className="border-t border-[#181818]/18" variants={staggerContainer}>
            {educationData.map((edu) => (
              <motion.div
                key={edu.degree}
                className="border-b border-[#181818]/18 py-8 md:py-9"
                variants={itemVariant}
                transition={createRevealTransition(0, 0.64)}
              >
                <h3 className="text-[30px] font-light leading-[1.25]">{edu.degree}</h3>
                <p className="mt-2 text-[#6d6d6d]">{edu.institution}</p>
                <p className="micro-label mt-1 text-[#6d6d6d]">{edu.dates}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
};

const Experience: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const rowVariant = createFadeUp(14, Boolean(reducedMotion));

  return (
    <Section id="experience" label="Experience" title="Client platforms, migrations, and full-stack delivery." dark>
      <div className="experience-list depth-stage border-t border-white/20">
        {experienceData.map((job, index) => (
          <motion.article
            key={`${job.company}-${job.role}`}
            className="experience-row grid gap-8 border-b border-white/20 py-10 md:grid-cols-[0.82fr_1.18fr] md:py-12"
            initial="hidden"
            whileInView="visible"
            viewport={scrollRevealViewport}
            variants={rowVariant}
            transition={createRevealTransition(Math.min(index, 3) * 0.09, 0.76)}
          >
            <div>
              <p className="eyebrow text-white/55">{job.dates}</p>
              <h3 className="mt-4 text-[30px] font-light leading-[1.25] md:text-[45px] md:leading-[1.22]">
                {job.role}
              </h3>
              <p className="mt-3 text-[16px] leading-[1.39] text-white/70">
                {job.company} / {job.location}
              </p>
            </div>
            <div>
              <p className="body-lg max-w-[65ch] text-white/82">{job.description}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {job.technologies.map((tech) => (
                  <TechPill key={tech} tech={tech} dark />
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
};

const Projects: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const itemVariant = createFadeUp(16, Boolean(reducedMotion));

  return (
    <Section id="projects" label="Selected Work" title="Projects shaped around real workflows.">
      <div className="depth-stage grid gap-px bg-[#181818] md:grid-cols-2 xl:grid-cols-3">
        {projectsData.map((project, index) => {
          const href = project.githubUrl || project.otherUrl;
          const content = (
            <>
              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0">
                  <p className="eyebrow mb-5 text-white/55">
                    {project.featured ? "Featured PFE" : `Project 0${index}`}
                  </p>
                  <h3
                    className={`text-[30px] font-light leading-[1.25] text-balance text-white ${
                      project.featured ? "md:text-[45px] md:leading-[1.22]" : "md:text-[36px] md:leading-[1.16]"
                    }`}
                  >
                    {project.name}
                  </h3>
                </div>
                {href && <ArrowUpRight className="project-card-arrow mt-2 shrink-0 text-white" size={22} />}
              </div>
              <p className="body-lg mt-8 max-w-[54ch] text-white/78">{project.description}</p>
              <div className="mt-8 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <TechPill key={tech} tech={tech} dark />
                ))}
              </div>
            </>
          );

          const className = `project-card depth-card editorial-cell group flex min-h-[380px] flex-col justify-between bg-black text-white ${
            project.featured ? "xl:col-span-2" : ""
          }`;

          return href ? (
            <motion.a
              key={project.name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
              initial="hidden"
              whileInView="visible"
              viewport={scrollRevealViewport}
              variants={itemVariant}
              transition={createRevealTransition(Math.min(index, 2) * 0.1, 0.76)}
              onPointerMove={handleDepthPointerMove}
              onPointerLeave={resetDepthPointer}
              onPointerCancel={resetDepthPointer}
            >
              <div className="depth-card-inner flex min-h-full flex-1 flex-col justify-between">{content}</div>
            </motion.a>
          ) : (
            <motion.article
              key={project.name}
              className={className}
              initial="hidden"
              whileInView="visible"
              viewport={scrollRevealViewport}
              variants={itemVariant}
              transition={createRevealTransition(Math.min(index, 2) * 0.1, 0.76)}
              onPointerMove={handleDepthPointerMove}
              onPointerLeave={resetDepthPointer}
              onPointerCancel={resetDepthPointer}
            >
              <div className="depth-card-inner flex min-h-full flex-1 flex-col justify-between">{content}</div>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
};

const Skills: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const itemVariant = createFadeUp(14, Boolean(reducedMotion));

  return (
    <Section id="skills" label="Stack" title="Tools I use to ship full-stack products." dark>
      <div className="depth-stage grid gap-px bg-white/20 md:grid-cols-2">
        {skillsData.map((category, index) => {
          const StackIcon = stackIconMap[category.category] ?? Terminal;

          return (
            <motion.article
              key={category.category}
              className="depth-card editorial-cell bg-black"
              initial="hidden"
              whileInView="visible"
              viewport={scrollRevealViewport}
              variants={itemVariant}
              transition={createRevealTransition(Math.min(index, 2) * 0.1, 0.76)}
              onPointerMove={handleDepthPointerMove}
              onPointerLeave={resetDepthPointer}
              onPointerCancel={resetDepthPointer}
            >
              <div className="depth-card-inner">
                <div className="mb-8 flex items-center gap-4">
                  <StackIcon aria-hidden="true" size={22} strokeWidth={1.7} />
                  <h3 className="text-[30px] font-light leading-[1.25]">{category.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <TechPill key={skill} tech={skill} dark />
                  ))}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
};

const Contact: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const linkVariant = createFadeUp(8, Boolean(reducedMotion));

  return (
    <section id="contact" className="bg-white text-[#181818]">
      <div className="section-shell">
        <div className="grid gap-12 md:grid-cols-[1fr_0.8fr]">
          <ScrollReveal distance={16} duration={0.78}>
            <p className="eyebrow mb-6 text-[#6d6d6d]">Contact</p>
            <h2 className="max-w-4xl text-[54px] font-light leading-[1.1] text-balance md:text-[94px]">
              Let us build something precise.
            </h2>
          </ScrollReveal>
          <div className="flex flex-col justify-end">
            <motion.a
              href={`mailto:${personalInfo.email}`}
              className="editorial-link border-t border-[#181818]/25 text-[#181818]"
              initial="hidden"
              whileInView="visible"
              viewport={scrollRevealViewport}
              variants={linkVariant}
              transition={createRevealTransition(0, 0.62)}
            >
              <span>{personalInfo.email}</span>
              <Mail className="shrink-0" size={20} />
            </motion.a>
            <motion.a
              href={`tel:${personalInfo.phone}`}
              className="editorial-link border-t border-[#181818]/25 text-[#181818]"
              initial="hidden"
              whileInView="visible"
              viewport={scrollRevealViewport}
              variants={linkVariant}
              transition={createRevealTransition(0.08, 0.62)}
            >
              <span>{personalInfo.phone}</span>
              <Phone className="shrink-0" size={20} />
            </motion.a>
            <motion.a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-link border-t border-[#181818]/25 text-[#181818]"
              initial="hidden"
              whileInView="visible"
              viewport={scrollRevealViewport}
              variants={linkVariant}
              transition={createRevealTransition(0.16, 0.62)}
            >
              <span>GitHub</span>
              <ArrowUpRight className="shrink-0" size={20} />
            </motion.a>
            <motion.a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-link border-y border-[#181818]/25 text-[#181818]"
              initial="hidden"
              whileInView="visible"
              viewport={scrollRevealViewport}
              variants={linkVariant}
              transition={createRevealTransition(0.24, 0.62)}
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="shrink-0" size={20} />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-black px-6 py-8 text-white md:px-10 xl:px-14">
    <div className="micro-label mx-auto flex max-w-[1440px] flex-col gap-3 text-white/60 md:flex-row md:items-center md:justify-between">
      <p>{personalInfo.name}</p>
      <p>{new Date().getFullYear()} / {personalInfo.title}</p>
    </div>
  </footer>
);

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
