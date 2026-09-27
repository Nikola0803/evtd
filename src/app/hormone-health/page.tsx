import type { Metadata } from "next";
import { FocusEducationPage } from "@/components/education/FocusEducationPage";

export const metadata: Metadata = {
  title: "Hormone Health Education",
  description: "Plain-language education about hormone signaling, everyday context, and how to assess peptide and hormone research claims.",
  alternates: { canonical: "/hormone-health" },
};

export default function HormoneHealthPage() {
  return (
    <FocusEducationPage
      eyebrow="Hormone health"
      title="Learn the language behind"
      accent="the conversation."
      intro="Build a clearer understanding of hormone signaling, everyday influences, and the limits of research - without turning general information into personal medical advice."
      image="/images/brand/focus-hormone-balance.png"
      imageAlt="A woman reading in a calm, sunlit room"
      foundationsTitle="Hormones work as part of a system."
      foundationsIntro="Hormones are chemical messengers. Their patterns can vary with timing, life stage, sleep, stress, movement, nutrition, and many other factors. One observation rarely explains the whole picture."
      foundations={[
        { number: "01", title: "Signals & feedback", copy: "Learn how messengers, receptors, and feedback loops are discussed in plain language." },
        { number: "02", title: "Timing & patterns", copy: "Understand why a single moment and a longer pattern can tell different stories." },
        { number: "03", title: "Everyday context", copy: "Explore how sleep, stress, food, movement, and recovery appear in the wider conversation." },
        { number: "04", title: "Better questions", copy: "Separate what you notice, what research suggests, and what needs individual medical context." },
      ]}
      peptideTitle="Peptides and hormones can overlap - but the terms are not interchangeable."
      peptideParagraphs={[
        "Some hormones are peptides, but not every hormone is a peptide and not every peptide acts as a hormone. Both can take part in signaling, which is why the language often overlaps in research discussions.",
        "Researchers study peptide signals in many biological systems. A finding about a pathway or laboratory marker does not show that a product is appropriate, safe, or effective for an individual.",
        "We help you understand terminology, study design, and uncertainty. We do not interpret symptoms, laboratory results, or personal hormone levels.",
      ]}
      questions={[
        "Is the claim about a normal biological pathway or a proven human outcome?",
        "Who was studied, and at what life stage?",
        "Was the finding based on one measurement or a consistent pattern?",
        "What other factors could influence the result?",
        "Does the source clearly explain uncertainty and limitations?",
      ]}
    />
  );
}
