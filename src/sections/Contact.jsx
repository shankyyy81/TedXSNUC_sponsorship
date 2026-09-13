import Section from "../components/Section";
import GlassCard from "../components/GlassCard";
import "../styles/global.css";

// Executive board member images
import sriramImg from "../assets/images/sriramK.jpeg";
import sharanImg from "../assets/images/sharan.jpeg";
import ashwathiImg from "../assets/images/ashwathi.jpeg";
import vishalImg from "../assets/images/vishal.jpeg";

const boardMembers = [
  {
    name: "K. Sriram Nishad",
    role: "President",
    department: "Mechanical, IV Year",
    phone: "+91 73586 24081",
    email: "sriram2310898@ssn.edu.in",
    image: sriramImg,
  },
  {
    name: "Sharan K",
    role: "Vice President",
    department: "AI/DS, IV Year",
    phone: "+91 88255 01250",
    email: "sharan23110004@snuchennai.edu.in",
    image: sharanImg,
  },
  {
    name: "Ashwathi",
    role: "Secretary",
    department: "AI/DS, IV Year",
    phone: "+91 99402 16537",
    email: "ashwathi23110137@snuchennai.edu.in",
    image: ashwathiImg,
  },
  {
    name: "Vishal Muralidharan",
    role: "Treasurer",
    department: "CSE, IV Year",
    phone: "+91 63823 45578",
    email: "vishal2310253@ssn.edu.in",
    image: vishalImg,
  },
];

export default function Contact() {
  return (
    <Section id="contact" style={{ marginBottom: "6rem" }}>
      <GlassCard className="contact-card" style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <h2 className="display" style={{ marginBottom: "1.5rem" }}>
          Ready to <span className="text-red">Partner?</span>
        </h2>
        <p className="body-lg" style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto 3rem auto" }}>
          Join us in bringing credible voices and big ideas to Chennai. Let's shape the future of SNUC together.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {boardMembers.map((member, idx) => (
            <GlassCard key={idx} className="member-card" style={{ padding: "1.5rem", textAlign: "center" }}>
              <img
                src={member.image}
                alt={member.name}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "1rem",
                }}
              />
              <h3 className="heading-md" style={{ margin: "0.5rem 0", color: "var(--text-primary)" }}>
                {member.name}
              </h3>
              <p className="body-md" style={{ margin: "0.25rem 0", color: "var(--text-secondary)" }}>
                {member.role} – {member.department}
              </p>
              <p className="body-md" style={{ margin: "0.25rem 0", color: "var(--text-secondary)" }}>
                {member.phone}<br />{member.email}
              </p>
            </GlassCard>
          ))}
        </div>
      </GlassCard>
    </Section>
  );
}
