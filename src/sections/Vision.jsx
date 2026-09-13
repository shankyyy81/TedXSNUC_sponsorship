import Section from "../components/Section";
import GlassCard from "../components/GlassCard";

export default function Vision() {
  const missions = [
    { title: "Cultivate Leaders", desc: "Instill curiosity, open-mindedness, and diverse perspectives." },
    { title: "Meaningful Connections", desc: "Create robust opportunities for networking and mentorship." },
    { title: "Bridge the Gap", desc: "Strengthen relationships between SNUC, alumni, and industry leaders." },
    { title: "Provide Direct Access", desc: "Offer students unparalleled interaction with accomplished professionals." }
  ];

  return (
    <Section id="vision">
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h2 className="heading-lg" style={{ marginBottom: "1rem" }}>Our Vision</h2>
        <p className="body-lg" style={{ color: "var(--text-secondary)", maxWidth: "800px", margin: "0 auto" }}>
          Host an annual TEDx event at SNUC that brings together a curated lineup of 10 speakers under a thoughtful theme, creating a massive networking opportunity that positions our university as a hub for community impact.
        </p>
      </div>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
        gap: "1.5rem" 
      }}>
        {missions.map((mission, idx) => (
          <GlassCard key={idx} className="mission-card" style={{ padding: "2rem" }}>
            <div style={{ padding: "1.5rem" }}>
              <h3 className="heading-md" style={{ marginBottom: "1rem", color: "var(--text-primary)" }}>{mission.title}</h3>
              <p className="body-md" style={{ color: "var(--text-secondary)" }}>{mission.desc}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
