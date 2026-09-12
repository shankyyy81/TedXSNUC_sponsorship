import Section from "../components/Section";
import GlassCard from "../components/GlassCard";
import Button from "../components/Button";

export default function SponsorshipTiers() {
  const tiers = [
    {
      title: "Title / Anchor Sponsor",
      price: "₹ 1,50,000",
      benefits: [
        '"Presented By" Status on all collateral',
        'Premium Goodie Bag Placement',
        'Exclusive Experiential Zone',
        'Dedicated Social Media Campaign',
        'First Right of Refusal'
      ]
    },
    {
      title: "Co-Anchor Sponsor",
      price: "₹ 75,000 - ₹ 1,00,000",
      benefits: [
        'Prominent Logo Placement',
        'Goodie Bag Integration',
        'Interactive Brand Zone',
        'Social Media Acknowledgment',
        'All Associate tier deliverables'
      ]
    },
    {
      title: "Associate Sponsor",
      price: "₹ 50,000",
      benefits: [
        'Logo Recognition',
        'Goodie Bag Integration',
        'Social Media Tagging',
        'Access to B2B Networking'
      ]
    }
  ];

  return (
    <Section id="sponsorship">
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h2 className="heading-lg" style={{ marginBottom: "1rem" }}>Partnership Deliverables</h2>
        <p className="body-lg" style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto" }}>
          We offer a flexible suite of engagement options, structured to ensure maximum, long-term impact.
        </p>
      </div>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
        gap: "2rem" 
      }}>
        {tiers.map((tier, idx) => (
          <GlassCard key={idx}>
            <div style={{ padding: "2.5rem", display: "flex", flexDirection: "column", height: "100%" }}>
              <h3 className="heading-md" style={{ marginBottom: "0.5rem" }}>{tier.title}</h3>
              <div className="text-red" style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "2rem" }}>
                {tier.price}
              </div>
              
              <ul style={{ 
                listStyle: "none", 
                padding: 0, 
                margin: 0, 
                display: "flex", 
                flexDirection: "column", 
                gap: "1rem",
                flexGrow: 1,
                marginBottom: "2rem"
              }}>
                {tier.benefits.map((benefit, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", color: "var(--text-secondary)" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--tedx-red)", flexShrink: 0, marginTop: "2px" }}>
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span className="body-md">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <Button style={{ width: "100%" }}>Select Tier</Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
