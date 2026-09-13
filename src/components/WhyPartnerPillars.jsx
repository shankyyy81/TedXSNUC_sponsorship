import { motion } from "framer-motion";
import { Flame, Search, TrendingUp, Link2 } from "lucide-react";

const pillars = [
  { Icon: Flame, label: "Ignite Curiosity" },
  { Icon: Search, label: "Discover New Talent" },
  { Icon: TrendingUp, label: "Grow Brand Awareness" },
  { Icon: Link2, label: "Join the Movement" },
];

export default function WhyPartnerPillars() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "1.5rem",
        marginBottom: "3rem",
      }}
    >
      {pillars.map(({ Icon, label }, idx) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", damping: 20, stiffness: 100, delay: idx * 0.08 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "0.75rem",
          }}
        >
          <Icon size={32} color="var(--tedx-red)" strokeWidth={1.75} />
          <span
            style={{
              display: "block",
              width: "32px",
              height: "2px",
              backgroundColor: "var(--tedx-red)",
            }}
          />
          <span className="body-md" style={{ color: "var(--text-primary)", fontWeight: 600 }}>
            {label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
