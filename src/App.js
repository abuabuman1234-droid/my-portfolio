import { useState, useEffect } from "react";

/* ============================================================
   DATA
   ============================================================ */
const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const ROLES = ["Front-End Developer"];

// Updated Skills Array directly as requested
const SKILLS = [
  { name: "HTML", icon: "🌐", desc: "Semantic, accessible markup structure." },
  { name: "CSS", icon: "🎨", desc: "Responsive layouts, Grid, Flexbox & animations." },
  { name: "JavaScript", icon: "⚡", desc: "ES6+, DOM logic, interactive UI behavior." },
  { name: "Basic React.js", icon: "⚛️", desc: "Component-driven UIs with basic hooks & state." },
];

const PROJECTS = [
  {
    id: "shopping",
    title: "One-Page Shopping Website",
    description:
      "A responsive, modern shopping website featuring an attractive product layout, interactive buttons, a dynamic shopping cart count, product filtering, and a user-friendly shopping experience.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80", 
  },
  {
    id: "restaurant",
    title: "One-Page Restaurant Website",
    description:
      "A modern restaurant website designed to showcase the restaurant's menu with category filtering, atmosphere imagery, contact information, and smooth navigation through an elegant, responsive interface.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", 
  },
];

// Updated Tech Stack to match the direct names
const TECH_STACK = [
  { name: "HTML", icon: "🌐" },
  { name: "CSS", icon: "🎨" },
  { name: "JavaScript", icon: "⚡" },
  { name: "Basic React.js", icon: "⚛️" },
];

/* ============================================================
   HOOKS
   ============================================================ */
function useTypewriter(words, typeSpeed = 90, deleteSpeed = 50, pause = 1600) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            deleting
              ? current.slice(0, text.length - 1)
              : current.slice(0, text.length + 1)
          );
        },
        deleting ? deleteSpeed : typeSpeed
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ============================================================
   COMPONENTS
   ============================================================ */

function Navbar() {
  const [open, setOpen] = useState(false);

  const handleNav = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="navbar">
      <nav className="nav-inner" aria-label="Main navigation">
        <a
          href="#home"
          className="brand"
          onClick={(e) => {
            e.preventDefault();
            handleNav("home");
          }}
        >
          <span className="brand-mark">AS</span>
          <div className="brand-info">
            <span className="brand-name">Abubeker Sultan</span>
            <span className="brand-role">Front-End Developer</span>
          </div>
        </a>

        <ul className={`nav-links ${open ? "open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(link.id);
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNav("home");
              }}
            >
              About
            </a>
          </li>
        </ul>

        <div className="nav-actions">
          <button
            className={`hamburger ${open ? "open" : ""}`}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
      {open && <div className="nav-backdrop" onClick={() => setOpen(false)} />}
    </header>
  );
}

function Hero({ onOpenProjects, onOpenContact }) {
  const typed = useTypewriter(ROLES);

  return (
    <section id="home" className="hero">
      <div className="hero-bg" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="grid-overlay" />
      </div>

      <div className="hero-content">
        <div className="about-header">
          <span className="eyebrow">About Me</span>
          <span id="about-me" className="anchor-target"></span>
        </div>

        <h1 className="hero-name">
          Abubeker <span className="gradient-text">Sultan</span>
        </h1>
        
        <h2 className="hero-role">
          <span className="typed">{typed}</span>
          <span className="cursor-blink">|</span>
        </h2>
        
        <p className="hero-tagline">
          "Building modern, responsive, and interactive digital experiences."
        </p>
        <p className="hero-intro">
          I'm a passionate Front-End Developer who enjoys building modern, responsive,
          interactive, and user-friendly websites. I focus on clean code, attractive user
          interfaces, smooth animations, and creating excellent user experiences using
          modern web technologies.
        </p>

        <div className="hero-cta">
          <button className="btn btn-primary" onClick={onOpenProjects}>
            View My Projects <span aria-hidden="true">→</span>
          </button>
          <button className="btn btn-ghost" onClick={onOpenContact}>
            Contact Me
          </button>
        </div>
      </div>

      <div className="hero-visual">
        <div className="avatar-ring">
          <div className="avatar">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" 
              alt="Abubeker Sultan" 
              className="avatar-img" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="section-head" data-reveal>
        <span className="eyebrow">My Toolkit</span>
        <h2 className="section-title">
          My <span className="gradient-text">Skills</span>
        </h2>
        <p className="section-sub">
          A growing set of tools I use to build modern, responsive web experiences.
        </p>
      </div>

      <div className="skills-grid">
        {SKILLS.map((skill, i) => (
          <article
            className="skill-card glass"
            key={skill.name}
            data-reveal
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            <div className="skill-icon" aria-hidden="true">
              {skill.icon}
            </div>
            <h3 className="skill-name">{skill.name}</h3>
            <p className="skill-desc">{skill.desc}</p>
            <div className="skill-bar" aria-hidden="true">
              <span className="skill-bar-fill" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="section-head" data-reveal>
        <span className="eyebrow">Portfolio</span>
        <h2 className="section-title">
          My <span className="gradient-text">Projects</span>
        </h2>
      </div>

      <div className="projects-grid">
        {PROJECTS.map((project, i) => (
          <article
            className="project-card glass"
            key={project.id}
            data-reveal
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <div className="project-thumb">
              <img src={project.image} alt={project.title} className="project-img" />
            </div>

            <div className="project-body">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus(null), 3000);
    }, 1000);
  };

  return (
    <section id="contact" className="section contact">
      <div className="section-head" data-reveal>
        <span className="eyebrow">Get In Touch</span>
        <h2 className="section-title">
          Let's build something <span className="gradient-text">great</span>
        </h2>
      </div>

      <div className="contact-container" data-reveal>
        <form className="contact-form glass" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Full Name *</label>
            <input
              id="name"
              type="text"
              placeholder="Your full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="subject">Subject *</label>
            <input
              id="subject"
              type="text"
              placeholder="What is this about?"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              rows="5"
              placeholder="Tell me about your project..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={status === "loading"}>
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
          
          {status === "success" && (
            <div className="form-feedback success">
              ✅ Demo submission successful! (This is a front-end demo).
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

function ProjectsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">✕</button>
        <h3 className="modal-title">Technologies Used</h3>
        <p className="modal-sub">The core stack powering these projects.</p>
        
        <div className="modal-tech-grid">
          {TECH_STACK.map((tech) => (
            <div key={tech.name} className="modal-tech-item">
              <span className="modal-tech-icon">{tech.icon}</span>
              <span className="modal-tech-name">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">✕</button>
        <h3 className="modal-title">Contact Me</h3>
        <p className="modal-sub">Choose your preferred method to reach out.</p>
        
        <div className="modal-links">
          <a href="mailto:abuabuman1234@gmail.com" className="modal-link">
            <span className="modal-icon">✉️</span>
            <div>
              <span className="modal-label">Email</span>
              <span className="modal-value">abuabuman1234@gmail.com</span>
            </div>
          </a>
          
          <a href="https://t.me/abuki11" target="_blank" rel="noopener noreferrer" className="modal-link">
            <span className="modal-icon">✈️</span>
            <div>
              <span className="modal-label">Telegram</span>
              <span className="modal-value">@abuki11</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Abubeker Sultan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      className={`back-to-top ${visible ? "visible" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}

export default function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);

  useScrollReveal();

  return (
    <>
      <Navbar />
      <main id="main">
        <Hero 
          onOpenProjects={() => setIsProjectsModalOpen(true)} 
          onOpenContact={() => setIsContactModalOpen(true)} 
        />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      <ProjectsModal isOpen={isProjectsModalOpen} onClose={() => setIsProjectsModalOpen(false)} />
    </>
  );
}