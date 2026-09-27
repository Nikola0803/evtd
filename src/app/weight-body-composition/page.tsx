import type { Metadata } from "next";
import { FocusEducationPage } from "@/components/education/FocusEducationPage";

export const metadata: Metadata = {
  title: "Weight & Body Composition Education",
  description: "Plain-language education about weight, body composition, everyday foundations, and how to read peptide research without hype.",
  alternates: { canonical: "/weight-body-composition" },
};

export default function WeightBodyCompositionPage() {
  return (
    <FocusEducationPage
      eyebrow="Weight & body composition"
      title="Understand the whole picture,"
      accent="not just the scale."
      intro="Learn how strength, movement, recovery, and metabolic context fit together—and where peptide research does and does not belong in the conversation."
      image="/images/brand/focus-weight-optimization.png"
      imageAlt="A woman exercising on a stationary bike"
      foundationsTitle="Body composition is more than one number."
      foundationsIntro="Weight can change for many reasons. Body composition adds useful context by considering muscle, fat, and the habits that support both. No single metric tells the whole story."
      foundations={[
        { number: "01", title: "Food patterns", copy: "Look at repeatable choices, enough nourishment, and the patterns that fit daily life." },
        { number: "02", title: "Strength & movement", copy: "Understand why muscle, resistance work, and regular movement matter to body composition." },
        { number: "03", title: "Sleep & recovery", copy: "Explore how rest and recovery can shape energy, consistency, and the way goals feel." },
        { number: "04", title: "Useful measures", copy: "Learn what a measure can show, what it cannot, and why trends need context." },
      ]}
      peptideTitle="Where peptide research enters the conversation."
      peptideParagraphs={[
        "Peptides are short chains of amino acids that can act as signals in the body. Researchers study peptide signaling in areas connected with appetite, energy use, glucose regulation, muscle biology, and fat tissue.",
        "A biological mechanism is not proof of a personal outcome. Findings can differ by study design, population, endpoint, and research stage. Results from cells or animals do not establish that the same effect will occur in people.",
        "Our role is to help you understand the vocabulary, research stage, and limits behind a claim—not to turn early research into a recommendation.",
      ]}
      questions={[
        "Was the research done in people, animals, or cells?",
        "Who was studied, and does that population matter?",
        "Was the outcome a laboratory marker or a meaningful real-world change?",
        "How long did the study run, and what limitations did the authors report?",
        "Does the claim reflect one result or the wider body of evidence?",
      ]}
    />
  );
}
