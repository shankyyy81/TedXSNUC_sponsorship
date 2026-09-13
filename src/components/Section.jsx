import { motion } from "framer-motion";

export default function Section({ children, id, className = "", style = {} }) {
  return (
    <section
      id={id}
      className={`section-wrapper ${className}`}
      style={{
        padding: "6rem 2rem",
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        ...style,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", damping: 20, stiffness: 100, mass: 1 }}
      >
        {children}
      </motion.div>
    </section>
  );
}
