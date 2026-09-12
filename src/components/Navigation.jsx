import { motion } from "framer-motion";
import "../styles/global.css";

export default function Navigation() {
  const links = [
    { label: "Vision", id: "vision" },
    { label: "Sponsorship", id: "sponsorship" },
    { label: "Contact", id: "contact" }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 100 }}
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
      <div style={{ fontWeight: 700, fontSize: "1.2rem", letterSpacing: "-0.02em" }}>
        <span className="text-red">TEDx</span>SNUC
      </div>
      
      <nav style={{ display: "flex", gap: "2rem" }}>
        {links.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            style={{
              color: "var(--text-secondary)",
              textDecoration: "none",
              fontWeight: 500,
              fontSize: "0.95rem",
              transition: "color 0.2s"
            }}
            onMouseOver={(e) => e.target.style.color = "var(--text-primary)"}
            onMouseOut={(e) => e.target.style.color = "var(--text-secondary)"}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
