import Section from "../components/Section";
import GlassCard from "../components/GlassCard";
import WhyPartnerPillars from "../components/WhyPartnerPillars";
import { Users, Infinity as InfinityIcon, ShieldCheck, Wallet } from "lucide-react";

// Renders a literal {{TOKEN}} in the page. JSX would otherwise parse double
// braces as an expression, so unfilled content tokens are built as strings.
function T({ name }) {
  return <span style={{ color: "var(--tedx-red)" }}>{`{{${name}}}`}</span>;
}

function StatRow({ items }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem 1.5rem", marginTop: "1.25rem" }}>
      {items.map(({ label, value }) => (
        <span key={label} className="body-md" style={{ color: "var(--text-tertiary)" }}>
          <strong style={{ color: "var(--text-secondary)" }}>{label}:</strong> {value}
        </span>
      ))}
    </div>
  );
}

function IconBadge({ Icon }) {
  return (
    <div
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(230, 43, 30, 0.12)",
        marginBottom: "1.25rem",
      }}
    >
      <Icon size={24} color="var(--tedx-red)" />
    </div>
  );
}

export default function WhyPartner() {
  return (
    <Section id="why-partner">
      <WhyPartnerPillars />

      <div style={{ textAlign: "center", margin: "1rem 0 3rem" }}>
        <h2 className="heading-lg" style={{ marginBottom: "1rem" }}>
          Why Partner with <span className="text-red">TEDxSNUC</span>
        </h2>
        <p className="body-lg" style={{ color: "var(--text-secondary)", maxWidth: "700px", margin: "0 auto" }}>
          A sponsorship here isn't a line item for a single afternoon — here's what it actually buys you.
        </p>
      </div>

      {/* Featured block — deserves the most space per the brief */}
      <GlassCard style={{ padding: "3rem", marginBottom: "1.5rem" }}>
        <IconBadge Icon={InfinityIcon} />
        <h3 className="heading-md" style={{ marginBottom: "1rem" }}>
          The Talk Outlives the Day
        </h3>
        <p className="body-lg" style={{ color: "var(--text-secondary)", maxWidth: "760px" }}>
          A banner comes down when the tent does. A TEDx talk doesn't. Once your sponsored talk is filmed, licensed,
          and published, it lives permanently on TEDx's global YouTube channel — carrying your brand in the pre- and
          post-roll for as long as the video exists, discoverable years after the event itself is a memory. Most
          sponsorships buy a single day. This buys a permanent, compounding piece of media that keeps introducing
          your brand to new people long after the lights come down.
        </p>
        <StatRow
          items={[
            { label: "Event date", value: <T name="EVENT_DATE" /> },
            { label: "Edition", value: <T name="EDITION_NUMBER" /> },
            { label: "Livestreamed", value: <T name="IS_LIVESTREAMED" /> },
          ]}
        />
      </GlassCard>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
        <GlassCard style={{ padding: "2.5rem" }}>
          <IconBadge Icon={Users} />
          <h3 className="heading-md" style={{ marginBottom: "1rem" }}>
            Reach the Room
          </h3>
          <p className="body-md" style={{ color: "var(--text-secondary)" }}>
            Every TEDxSNUC talk plays to a room built from three audiences at once: the students who'll carry your
            brand into their careers, the faculty who shape what Chennai's next engineers and founders believe is
            possible, and an alumni network already working across the city's business community. A sponsorship
            here isn't a booth at a fair — it's a seat at the table with the people who'll remember you were in the
            room.
          </p>
          <StatRow
            items={[
              { label: "Venue", value: <><T name="VENUE_NAME" /> (<T name="VENUE_CAPACITY" /> capacity)</> },
              { label: "Expected attendance", value: <T name="EXPECTED_ATTENDANCE" /> },
              { label: "Student body", value: <T name="CAMPUS_STUDENT_COUNT" /> },
              { label: "Alumni network", value: <T name="ALUMNI_NETWORK_SIZE" /> },
            ]}
          />
        </GlassCard>

        <GlassCard style={{ padding: "2.5rem" }}>
          <IconBadge Icon={ShieldCheck} />
          <h3 className="heading-md" style={{ marginBottom: "1rem" }}>
            Ideas, Chosen Independently
          </h3>
          <p className="body-md" style={{ color: "var(--text-secondary)" }}>
            Every one of our <T name="SPEAKER_COUNT" /> speakers is selected on the strength of their idea, full
            stop — sponsors have no say in who takes the stage or what they say. That's not a limitation we're
            apologizing for; it's the asset you're actually buying. A TEDx stage carries credibility precisely
            because it can't be bought outright, and standing next to a curated, non-commercial platform is worth
            more to a thoughtful brand than a logo on a banner ever could be.
          </p>
        </GlassCard>

        <GlassCard style={{ padding: "2.5rem" }}>
          <IconBadge Icon={Wallet} />
          <h3 className="heading-md" style={{ marginBottom: "1rem" }}>
            Where the Money Goes
          </h3>
          <p className="body-md" style={{ color: "var(--text-secondary)" }}>
            TEDxSNUC is run entirely by students, on a non-profit license from TED. Every rupee raised goes directly
            back into the event: venue and AV production, the TEDx licensing fee, speaker travel and hospitality,
            printing, and the collateral that puts your logo in front of the room. There's no overhead, no agency
            fee, and no margin sitting between your sponsorship and the event it's meant to make possible.
          </p>
        </GlassCard>
      </div>
    </Section>
  );
}
