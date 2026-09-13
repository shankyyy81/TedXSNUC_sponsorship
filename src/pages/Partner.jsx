import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import {
  TextField,
  TextareaField,
  SelectField,
  CheckboxField,
  CheckboxGroupField,
  RadioGroupField,
} from "../components/form/FormControls";
import { WEB3FORMS_ACCESS_KEY, SPONSORSHIP_EMAIL, isWeb3FormsConfigured } from "../config/web3forms";
import "../styles/form.css";

const INDUSTRY_OPTIONS = [
  "Technology",
  "FMCG",
  "Finance/Banking",
  "Education",
  "Healthcare",
  "F&B",
  "Retail/E-commerce",
  "Media/Entertainment",
  "Manufacturing",
  "Other",
];

const CONTACT_MODE_OPTIONS = ["Email", "Phone/WhatsApp", "Either"];

const TIER_OPTIONS = [
  { value: "anchor", label: "Title / Anchor Sponsor — ₹1,50,000" },
  { value: "co-anchor", label: "Co-Anchor Sponsor — ₹75,000–₹1,00,000" },
  { value: "associate", label: "Associate Sponsor — ₹50,000" },
  { value: "not-sure", label: "Not sure yet / need a custom package" },
];

const SPONSORSHIP_TYPE_OPTIONS = [
  "Monetary",
  "In-kind: Food & Refreshments",
  "In-kind: Goodies & Merchandise",
  "Other",
];

const ENGAGEMENT_OPTIONS = [
  "Goodie Bag Inclusion",
  "Interactive Brand Zone / Stall",
  "Experiential Product Demo Zone",
  "Themed Networking Hub",
  "Knowledge-Sharing Seminar / Workshop",
  "Ancillary Fundraiser",
  "Digital-only presence",
  "Not sure — happy to discuss",
];

const HEAR_ABOUT_OPTIONS = ["LinkedIn", "Instagram", "Referral", "Alumni Network", "Existing Partner", "Other"];

const DESCRIPTION_MAX = 150;

const INITIAL_FORM = {
  companyName: "",
  industry: "",
  website: "",
  description: "",
  contactName: "",
  designation: "",
  email: "",
  phone: "",
  preferredContact: "",
  bestTime: "",
  tier: "",
  sponsorshipTypes: [],
  otherSponsorshipDetail: "",
  inKindDescription: "",
  inKindValue: "",
  engagementOptions: [],
  campaignAlignment: "",
  industryRestrictions: "",
  complianceContent: false,
  complianceEditorial: false,
  complianceSales: false,
  hearAbout: "",
  comments: "",
  scheduleCall: false,
  botcheck: "",
};

const REQUIRED_ORDER = [
  "companyName",
  "industry",
  "description",
  "contactName",
  "designation",
  "email",
  "phone",
  "tier",
  "sponsorshipTypes",
  "complianceContent",
  "complianceEditorial",
  "complianceSales",
];

function validate(data) {
  const errors = {};

  if (!data.companyName.trim()) errors.companyName = "Company or organisation name is required.";
  if (!data.industry) errors.industry = "Select an industry or sector.";
  if (!data.description.trim()) {
    errors.description = "A one-line description is required.";
  } else if (data.description.length > DESCRIPTION_MAX) {
    errors.description = `Keep the description to ${DESCRIPTION_MAX} characters or fewer.`;
  }

  if (!data.contactName.trim()) errors.contactName = "Full name is required.";
  if (!data.designation.trim()) errors.designation = "Designation or role is required.";

  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Enter a valid email address, e.g. name@company.com.";
  }

  if (!data.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^\+?[0-9\s-]{7,}$/.test(data.phone.trim())) {
    errors.phone = "Enter a valid phone number with country code, e.g. +91 98765 43210.";
  }

  if (!data.tier) errors.tier = "Select a sponsorship tier.";
  if (data.sponsorshipTypes.length === 0) {
    errors.sponsorshipTypes = "Select at least one type of sponsorship.";
  }

  if (!data.complianceContent) errors.complianceContent = "This confirmation is required to proceed.";
  if (!data.complianceEditorial) errors.complianceEditorial = "This confirmation is required to proceed.";
  if (!data.complianceSales) errors.complianceSales = "This confirmation is required to proceed.";

  return errors;
}

function buildPayload(data) {
  const tierLabel = TIER_OPTIONS.find((t) => t.value === data.tier)?.label ?? data.tier;
  const isOtherSelected = data.sponsorshipTypes.includes("Other");
  const isInKindSelected = data.sponsorshipTypes.some((t) => t.startsWith("In-kind"));

  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: `TEDxSNUC Sponsor Enquiry — ${data.companyName} (${tierLabel})`,
    from_name: "TEDxSNUC Sponsorship Site",
    replyto: data.email,
    botcheck: data.botcheck,
    "Company Name": data.companyName,
    "Industry / Sector": data.industry,
    "One-line Description": data.description,
    "Full Name": data.contactName,
    "Designation / Role": data.designation,
    Email: data.email,
    Phone: data.phone,
    "Sponsorship Tier": tierLabel,
    "Type of Sponsorship": data.sponsorshipTypes.join(", "),
    "Compliance — Branding Guidelines": data.complianceContent ? "Confirmed" : "Not confirmed",
    "Compliance — Editorial Independence": data.complianceEditorial ? "Confirmed" : "Not confirmed",
    "Compliance — No On-site Sales": data.complianceSales ? "Confirmed" : "Not confirmed",
    "Wants a Call Before Finalizing": data.scheduleCall ? "Yes" : "No",
  };

  if (data.website.trim()) payload["Company Website / LinkedIn"] = data.website.trim();
  if (data.preferredContact) payload["Preferred Mode of Contact"] = data.preferredContact;
  if (data.bestTime.trim()) payload["Best Time to Reach"] = data.bestTime.trim();
  if (isOtherSelected && data.otherSponsorshipDetail.trim()) {
    payload["Other Sponsorship Type"] = data.otherSponsorshipDetail.trim();
  }
  if (isInKindSelected && data.inKindDescription.trim()) {
    payload["In-Kind Description"] = data.inKindDescription.trim();
  }
  if (isInKindSelected && data.inKindValue.trim()) {
    payload["Estimated In-Kind Value"] = data.inKindValue.trim();
  }
  if (data.engagementOptions.length > 0) {
    payload["Engagement Options"] = data.engagementOptions.join(", ");
  }
  if (data.campaignAlignment.trim()) payload["Campaign / Message to Align With"] = data.campaignAlignment.trim();
  if (data.industryRestrictions.trim()) payload["Industry Restrictions"] = data.industryRestrictions.trim();
  if (data.hearAbout) payload["How They Heard About Us"] = data.hearAbout;
  if (data.comments.trim()) payload["Additional Comments"] = data.comments.trim();

  return payload;
}

function SectionBlock({ id, title, intro, children }) {
  return (
    <div id={id} style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "3rem" }}>
      <div>
        <h3 className="heading-md" style={{ marginBottom: intro ? "0.5rem" : 0 }}>
          {title}
        </h3>
        {intro && (
          <p className="body-md" style={{ color: "var(--text-secondary)" }}>
            {intro}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

function FieldRow({ children }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
      {children}
    </div>
  );
}

export default function Partner() {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [submitError, setSubmitError] = useState("");

  const fieldRefs = useRef({});
  const setRef = (name) => (el) => {
    fieldRefs.current[name] = el;
  };

  useEffect(() => {
    const tierParam = searchParams.get("tier");
    if (tierParam && TIER_OPTIONS.some((t) => t.value === tierParam)) {
      setFormData((d) => ({ ...d, tier: tierParam }));
      requestAnimationFrame(() => {
        setTimeout(() => {
          document.getElementById("sponsorship-interest")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      });
    }
    // Only run once on mount — this is a one-time deep-link pre-select.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const errors = validate(formData);
  const shouldShow = (name) => touched[name] || submitAttempted;

  const setField = (name) => (e) => setFormData((d) => ({ ...d, [name]: e.target.value }));
  const setChecked = (name) => (e) => setFormData((d) => ({ ...d, [name]: e.target.checked }));
  const markTouched = (name) => () => setTouched((t) => ({ ...t, [name]: true }));

  const toggleInArray = (name) => (option) =>
    setFormData((d) => ({
      ...d,
      [name]: d[name].includes(option) ? d[name].filter((v) => v !== option) : [...d[name], option],
    }));

  const isOtherSelected = formData.sponsorshipTypes.includes("Other");
  const isInKindSelected = formData.sponsorshipTypes.some((t) => t.startsWith("In-kind"));
  const tierChosen = !!formData.tier;

  const focusFirstError = (errs) => {
    const firstKey = REQUIRED_ORDER.find((k) => errs[k]);
    if (!firstKey) return;
    const el = fieldRefs.current[firstKey];
    el?.scrollIntoView?.({ behavior: "smooth", block: "center" });
    el?.focus?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    const currentErrors = validate(formData);
    if (Object.keys(currentErrors).length > 0) {
      focusFirstError(currentErrors);
      return;
    }

    if (formData.botcheck) return; // honeypot tripped — drop silently

    setStatus("submitting");
    setSubmitError("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(buildPayload(formData)),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setSubmitError(data.message || "The sponsorship inbox didn't accept the submission. Please try again.");
      }
    } catch {
      setStatus("error");
      setSubmitError("A network error occurred. Check your connection and try again.");
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", padding: "9rem 1.5rem 6rem", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: "5%",
          left: "50%",
          transform: "translate(-50%, 0)",
          width: "60vw",
          height: "60vw",
          background: "radial-gradient(circle, var(--tedx-red-glow) 0%, transparent 70%)",
          filter: "blur(100px)",
          opacity: 0.4,
          zIndex: -1,
        }}
      />

      <div style={{ maxWidth: "800px", margin: "0 auto 3rem", textAlign: "center" }}>
        <h2
          style={{
            fontSize: "1rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
            marginBottom: "1rem",
          }}
        >
          Partnership
        </h2>
        <h1 className="display" style={{ marginBottom: "1.5rem" }}>
          Partner with <span className="text-red">TEDxSNUC</span>
        </h1>
        <p className="body-lg" style={{ color: "var(--text-secondary)" }}>
          Tell us about your organisation and what you're looking for, and our sponsorship team will follow up with
          a tailored partnership package.
        </p>
      </div>

      <div className="glass" style={{ maxWidth: "800px", margin: "0 auto", padding: "2.5rem" }}>
        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "2rem 0" }}>
            <h2 className="heading-lg" style={{ marginBottom: "1.5rem" }}>
              Thank you<span className="text-red">.</span>
            </h2>
            <p className="body-lg" style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
              Thank you for your interest in partnering with TEDxSNUC. Our sponsorship team will be in touch within
              2–3 business days with next steps and a formal agreement — including a request for your company logo
              for event collateral. In the meantime, reach us at{" "}
              <a href={`mailto:${SPONSORSHIP_EMAIL}`} className="text-red" style={{ textDecoration: "none" }}>
                {SPONSORSHIP_EMAIL}
              </a>
              .
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            {/* Honeypot — must remain empty */}
            <input
              type="text"
              name="botcheck"
              value={formData.botcheck}
              onChange={setField("botcheck")}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ display: "none" }}
            />

            <SectionBlock id="org-info" title="Organisation">
              <TextField
                ref={setRef("companyName")}
                label="Company / Organisation Name"
                name="companyName"
                required
                value={formData.companyName}
                onChange={setField("companyName")}
                onBlur={markTouched("companyName")}
                error={shouldShow("companyName") ? errors.companyName : undefined}
              />
              <FieldRow>
                <SelectField
                  ref={setRef("industry")}
                  label="Industry / Sector"
                  name="industry"
                  required
                  value={formData.industry}
                  onChange={setField("industry")}
                  onBlur={markTouched("industry")}
                  error={shouldShow("industry") ? errors.industry : undefined}
                  options={INDUSTRY_OPTIONS}
                />
                <TextField
                  label="Company Website / LinkedIn"
                  name="website"
                  type="url"
                  value={formData.website}
                  onChange={setField("website")}
                  placeholder="https://"
                />
              </FieldRow>
              <TextField
                ref={setRef("description")}
                label="One-line description"
                name="description"
                required
                value={formData.description}
                onChange={setField("description")}
                onBlur={markTouched("description")}
                error={shouldShow("description") ? errors.description : undefined}
                maxLength={DESCRIPTION_MAX}
                showCounter
                placeholder="What your organisation does, in one sentence"
              />
            </SectionBlock>

            <SectionBlock id="contact-info" title="Point of Contact">
              <FieldRow>
                <TextField
                  ref={setRef("contactName")}
                  label="Full Name"
                  name="contactName"
                  required
                  value={formData.contactName}
                  onChange={setField("contactName")}
                  onBlur={markTouched("contactName")}
                  error={shouldShow("contactName") ? errors.contactName : undefined}
                />
                <TextField
                  ref={setRef("designation")}
                  label="Designation / Role"
                  name="designation"
                  required
                  value={formData.designation}
                  onChange={setField("designation")}
                  onBlur={markTouched("designation")}
                  error={shouldShow("designation") ? errors.designation : undefined}
                />
              </FieldRow>
              <FieldRow>
                <TextField
                  ref={setRef("email")}
                  label="Email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={setField("email")}
                  onBlur={markTouched("email")}
                  error={shouldShow("email") ? errors.email : undefined}
                />
                <TextField
                  ref={setRef("phone")}
                  label="Phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={setField("phone")}
                  onBlur={markTouched("phone")}
                  error={shouldShow("phone") ? errors.phone : undefined}
                  placeholder="+91 98765 43210"
                />
              </FieldRow>
              <FieldRow>
                <SelectField
                  label="Preferred Mode of Contact"
                  name="preferredContact"
                  value={formData.preferredContact}
                  onChange={setField("preferredContact")}
                  options={CONTACT_MODE_OPTIONS}
                />
                <TextField
                  label="Best time to reach you"
                  name="bestTime"
                  value={formData.bestTime}
                  onChange={setField("bestTime")}
                  placeholder="e.g. weekday afternoons"
                />
              </FieldRow>
            </SectionBlock>

            <SectionBlock id="sponsorship-interest" title="Sponsorship Interest">
              <RadioGroupField
                ref={setRef("tier")}
                legend="Sponsorship tier"
                name="tier"
                required
                options={TIER_OPTIONS}
                value={formData.tier}
                onChange={(value) => setFormData((d) => ({ ...d, tier: value }))}
                error={shouldShow("tier") ? errors.tier : undefined}
              />
              <CheckboxGroupField
                ref={setRef("sponsorshipTypes")}
                legend="Type of sponsorship"
                required
                options={SPONSORSHIP_TYPE_OPTIONS}
                values={formData.sponsorshipTypes}
                onToggle={toggleInArray("sponsorshipTypes")}
                error={shouldShow("sponsorshipTypes") ? errors.sponsorshipTypes : undefined}
              />
              {isOtherSelected && (
                <TextField
                  label="Other — please specify"
                  name="otherSponsorshipDetail"
                  value={formData.otherSponsorshipDetail}
                  onChange={setField("otherSponsorshipDetail")}
                />
              )}
              {isInKindSelected && (
                <>
                  <TextareaField
                    label="In-kind description"
                    name="inKindDescription"
                    value={formData.inKindDescription}
                    onChange={setField("inKindDescription")}
                    rows={3}
                  />
                  <TextField
                    label="Estimated value of in-kind contribution"
                    name="inKindValue"
                    value={formData.inKindValue}
                    onChange={setField("inKindValue")}
                    placeholder="e.g. ₹20,000"
                  />
                </>
              )}
            </SectionBlock>

            {tierChosen && (
              <SectionBlock
                id="engagement-preferences"
                title="Engagement Preferences"
                intro="Help us tailor the right benefits for you — pick whatever's relevant, we'll work out the rest together."
              >
                <CheckboxGroupField
                  legend="Engagement options"
                  options={ENGAGEMENT_OPTIONS}
                  values={formData.engagementOptions}
                  onToggle={toggleInArray("engagementOptions")}
                />
                <TextareaField
                  label="Campaign / product / message to align with"
                  name="campaignAlignment"
                  value={formData.campaignAlignment}
                  onChange={setField("campaignAlignment")}
                  rows={3}
                />
                <TextareaField
                  label="Industry restrictions on your end"
                  name="industryRestrictions"
                  value={formData.industryRestrictions}
                  onChange={setField("industryRestrictions")}
                  rows={3}
                />
              </SectionBlock>
            )}

            <SectionBlock id="compliance" title="Compliance">
              <CheckboxField
                ref={setRef("complianceContent")}
                name="complianceContent"
                label="Our branding/products contain no explicit religious, political, alcohol or tobacco content, per TEDx guidelines."
                checked={formData.complianceContent}
                onChange={setChecked("complianceContent")}
                error={shouldShow("complianceContent") ? errors.complianceContent : undefined}
              />
              <CheckboxField
                ref={setRef("complianceEditorial")}
                name="complianceEditorial"
                label="We understand sponsors have no influence over speaker selection, programming, or editorial decisions."
                checked={formData.complianceEditorial}
                onChange={setChecked("complianceEditorial")}
                error={shouldShow("complianceEditorial") ? errors.complianceEditorial : undefined}
              />
              <CheckboxField
                ref={setRef("complianceSales")}
                name="complianceSales"
                label="We understand on-site direct sales are not permitted in Experiential Zones (informational/demo use only)."
                checked={formData.complianceSales}
                onChange={setChecked("complianceSales")}
                error={shouldShow("complianceSales") ? errors.complianceSales : undefined}
              />
            </SectionBlock>

            <SectionBlock id="final-details" title="Final Details">
              <SelectField
                label="How did you hear about TEDxSNUC?"
                name="hearAbout"
                value={formData.hearAbout}
                onChange={setField("hearAbout")}
                options={HEAR_ABOUT_OPTIONS}
              />
              <TextareaField
                label="Additional questions or comments"
                name="comments"
                value={formData.comments}
                onChange={setField("comments")}
                rows={3}
              />
              <CheckboxField
                name="scheduleCall"
                label="I'd like to schedule a call before finalizing"
                checked={formData.scheduleCall}
                onChange={setChecked("scheduleCall")}
              />
            </SectionBlock>

            {status === "error" && (
              <div
                className="form-field"
                style={{ marginBottom: "1.5rem", padding: "1rem", border: "1px solid var(--tedx-red)", borderRadius: "12px" }}
              >
                <span className="form-error">{submitError}</span>
                <span className="form-hint">
                  Your answers are still here — hit submit to retry, or reach us directly at{" "}
                  <a href={`mailto:${SPONSORSHIP_EMAIL}`} className="text-red">
                    {SPONSORSHIP_EMAIL}
                  </a>
                  .
                </span>
              </div>
            )}

            {!isWeb3FormsConfigured ? (
              <div className="form-error" style={{ textAlign: "center" }}>
                Form submission isn't configured yet — add a Web3Forms access key in src/config/web3forms.js.
              </div>
            ) : (
              <Button
                type="submit"
                disabled={status === "submitting"}
                style={{ width: "100%" }}
              >
                {status === "submitting" ? (
                  <>
                    <span className="form-spinner" /> Submitting…
                  </>
                ) : status === "error" ? (
                  "Retry submission"
                ) : (
                  "Submit"
                )}
              </Button>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
