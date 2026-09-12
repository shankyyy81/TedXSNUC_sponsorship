import { motion } from "framer-motion";

// Apple-inspired critically damped spring
const springTransition = {
  type: "spring",
  damping: 20,
  stiffness: 300,
  mass: 1
};

export default function Button({ children, onClick, variant = "primary", className = "" }) {
  const baseStyle = {
    padding: "12px 24px",
    borderRadius: "999px",
    border: "none",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    outline: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    WebkitTapHighlightColor: "transparent"
  };

  const variants = {
    primary: {
      backgroundColor: "var(--tedx-red)",
      color: "#ffffff",
      boxShadow: "0 4px 14px 0 var(--tedx-red-glow)"
    },
    glass: {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      color: "#ffffff",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.2)"
    }
  };

  return (
    <motion.button
      onClick={onClick}
      style={{ ...baseStyle, ...variants[variant] }}
      className={className}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      transition={springTransition}
    >
      {children}
    </motion.button>
  );
}
