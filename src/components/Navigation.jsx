import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Button from "./Button";
import "../styles/global.css";

const springTransition = { type: "spring", damping: 20, stiffness: 100 };

const links = [
  { label: "Vision", id: "vision" },
  { label: "Why Partner", id: "why-partner" },
  { label: "Sponsorship", id: "sponsorship" },
  { label: "Contact", id: "contact" },
];

function useIsMobile(breakpoint = 720) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= breakpoint
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [breakpoint]);

  return isMobile;
}

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  // Close the mobile menu when the route changes, derived during render
  // rather than in an effect (avoids an extra cascading render).
  const [menuOpenForPathname, setMenuOpenForPathname] = useState(location.pathname);
  if (location.pathname !== menuOpenForPathname) {
    setMenuOpenForPathname(location.pathname);
    if (menuOpen) setMenuOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const goToAnchor = (id) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      // Wait for Home to mount before attempting to scroll.
      requestAnimationFrame(() => {
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 50);
      });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToPartner = () => {
    setMenuOpen(false);
    navigate("/partner");
  };

  const overlay = (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="glass"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            borderRadius: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            backgroundColor: "rgba(0, 0, 0, 0.96)",
          }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            style={{
              position: "absolute",
              top: "1.25rem",
              right: "1.5rem",
              background: "transparent",
              border: "none",
              color: "var(--text-primary)",
              cursor: "pointer",
              padding: "0.5rem",
            }}
          >
            <X size={28} />
          </button>
          {links.map((link) => (
            <a
              key={link.id}
              href={`/#${link.id}`}
              onClick={goToAnchor(link.id)}
              className="heading-md"
              style={{ color: "var(--text-primary)", textDecoration: "none" }}
            >
              {link.label}
            </a>
          ))}
          <Button variant="primary" onClick={goToPartner}>
            Partner with us
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={springTransition}
      className="glass-toolbar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
      }}
    >
      <a
        href="/"
        onClick={(e) => {
          if (location.pathname === "/") {
            e.preventDefault();
            setMenuOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
        style={{
          fontWeight: 700,
          fontSize: "1.2rem",
          letterSpacing: "-0.02em",
          textDecoration: "none",
          color: "var(--text-primary)",
        }}
      >
        <span className="text-red">TEDx</span>SNUC
      </a>

      {/* Desktop nav */}
      <nav
        style={{ display: isMobile ? "none" : "flex", alignItems: "center", gap: "2rem" }}
      >
        {links.map((link) => (
          <a
            key={link.id}
            href={`/#${link.id}`}
            onClick={goToAnchor(link.id)}
            style={{
              color: "var(--text-secondary)",
              textDecoration: "none",
              fontWeight: 500,
              fontSize: "0.95rem",
              transition: "color 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.color = "var(--text-primary)")}
            onMouseOut={(e) => (e.target.style.color = "var(--text-secondary)")}
          >
            {link.label}
          </a>
        ))}
        <Button variant="primary" onClick={goToPartner} style={{ padding: "10px 20px", fontSize: "0.9rem" }}>
          Partner with us
        </Button>
      </nav>

      {/* Mobile trigger */}
      {isMobile && (
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          style={{
            display: "inline-flex",
            background: "transparent",
            border: "none",
            color: "var(--text-primary)",
            cursor: "pointer",
            padding: "0.5rem",
          }}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      )}

      </motion.header>
      {createPortal(overlay, document.body)}
    </>
  );
}
