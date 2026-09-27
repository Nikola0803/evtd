import type { Metadata } from "next";
import { FocusEducationPage } from "@/components/education/FocusEducationPage";

export const metadata: Metadata = {
  title: "Energy & Longevity Education",
  description: "Plain-language education about daily energy, healthy aging, resilience, and how to assess peptide research claims.",
  alternates: { canonical: "/energy-longevity" },
};

export default function EnergyLongevityPage() {
  return (
    <FocusEducationPage
      eyebrow="Energy & longevity"
      title="Build context for"
      accent="the long view."
      intro="Explore the everyday foundations of energy and healthy aging, then learn how to separate interesting peptide research from promises the evidence cannot make."
      image="/images/brand/focus-longevity.png"
      imageAlt="An active woman outdoors in warm natural light"
      foundationsTitle="Longevity starts with capacity."
      foundationsIntro="For us, longevity is not a promise to reverse aging. It is a way to understand the habits and systems that support how you want to feel over time."
      foundations={[
        { number: "01", title: "Restorative sleep", copy: "Learn how steady sleep and recovery routines support the rhythm of everyday energy." },
        { number: "02", title: "Cardio fitness", copy: "Understand the role of regular movement and cardiorespiratory capacity across the years." },
        { number: "03", title: "Strength", copy: "Explore why maintaining muscle and physical capability matters for long-term resilience." },
        { number: "04", title: "Daily rhythms", copy: "See how stress, meals, movement, and rest interact instead of treating energy as one switch." },
      ]}
      peptideTitle="Interesting biology is not an anti-aging promise."
      peptideParagraphs={[
        "Peptides take part in many signaling processes in the body. Researchers investigate some of those signals in connection with metabolism, inflammation, tissue response, and other areas related to aging biology.",
        "A change in a biomarker does not automatically mean a person will feel better, function better, or live longer. Preclinical findings can help shape future questions, but they do not establish a human benefit.",
        "We explain the research stage and the gaps that often disappear from online claims. We do not use phrases such as “reverse aging” because the evidence does not support that kind of guarantee.",
      ]}
      questions={[
        "Is this a study of a mechanism, a biomarker, or a real-world outcome?",
        "Was the finding replicated in well-designed human research?",
        "How large was the effect, and how certain was the result?",
        "What risks, unknowns, and study limitations were reported?",
        "Is the headline stronger than the evidence underneath it?",
      ]}
    />
  );
}
