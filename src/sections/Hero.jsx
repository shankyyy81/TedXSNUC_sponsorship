import { motion } from "framer-motion";
import Button from "../components/Button";

export default function Hero() {
  return (
    <section style={{ 
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      padding: "2rem",
      overflow: "hidden"
    }}>
      {/* Background ambient glow */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "60vw",
        height: "60vw",
        background: "radial-gradient(circle, var(--tedx-red-glow) 0%, transparent 70%)",
        filter: "blur(100px)",
        opacity: 0.5,
        zIndex: -1
      }} />

      <div style={{
        maxWidth: "900px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem"
      }}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
        >
          <h2 style={{
            fontSize: "1.5rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
            marginBottom: "1rem"
          }}>
            Partnership Proposal
          </h2>
          <h1 className="display">
            <span className="text-red">TEDx</span>ShivNadarUniversity<br />Chennai
          </h1>
        </motion.div>

        <motion.p 
          className="body-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", damping: 20, stiffness: 100 }}
          style={{ color: "var(--text-secondary)", maxWidth: "600px" }}
        >
          Join us in cultivating broad-minded leaders, bridging gaps, and fostering meaningful connections across the Chennai community.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", damping: 20, stiffness: 100 }}
          style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}
        >
          <Button onClick={() => document.getElementById('sponsorship').scrollIntoView({ behavior: 'smooth' })}>
            View Packages
          </Button>
          <Button variant="glass" onClick={() => document.getElementById('vision').scrollIntoView({ behavior: 'smooth' })}>
            Our Vision
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
