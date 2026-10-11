import type { Metadata } from "next";
import { FocusEducationPage } from "@/components/education/FocusEducationPage";

export const metadata: Metadata = {
  title: "Sleep & Recovery Education",
  description: "Plain-language education about sleep rhythms, recovery, and how to evaluate peptide research claims without promised results.",
  alternates: { canonical: "/sleep-recovery" },
};

export default function SleepRecoveryPage() {
  return (
    <FocusEducationPage
      eyebrow="Sleep & recovery"
      title="Build context for"
      accent="restored days."
      intro="Learn how sleep timing, daily rhythms, environment, and recovery fit together - and how to read peptide research without treating early findings as answers."
      image="/images/brand/focus-sleep-recovery.png"
      imageAlt="A woman resting peacefully in a calm bedroom"
      foundationsTitle="Recovery begins before bedtime."
      foundationsIntro="Sleep and recovery are shaped by patterns across the day. Timing, light, movement, stress, environment, and routine can all be part of the wider picture."
      foundations={[
        { number: "01", title: "Sleep rhythm", copy: "Learn why regular timing and the body’s daily rhythm matter when discussing sleep." },
        { number: "02", title: "Environment", copy: "Consider light, temperature, sound, and the routines that frame the night." },
        { number: "03", title: "Daily load", copy: "Explore how training, stress, work, and stimulation can shape the need for recovery." },
        { number: "04", title: "Patterns over time", copy: "Look at trends and context instead of treating one difficult night as the whole story." },
      ]}
      peptideTitle="Sleep biology is complex. Peptide research is one small part of it."
      peptideParagraphs={[
        "Peptides take part in signaling throughout the body, including systems connected with daily rhythms, stress response, and sleep-wake biology. Research in these areas can help explain mechanisms without proving a practical benefit.",
        "A result in cells, animals, or a small early study does not establish that a peptide will improve sleep or recovery in people. Sleep-related outcomes can also depend heavily on how they were measured and who was studied.",
        "We help you identify the research stage, outcome, and limitations behind a claim. We do not diagnose sleep concerns or recommend products, doses, or treatment plans.",
      ]}
      questions={[
        "Was sleep measured objectively, through self-report, or both?",
        "Did the study examine sleep timing, duration, continuity, or how participants felt?",
        "Was the research conducted in people and was the comparison appropriate?",
        "How long did the study last, and were the findings consistent?",
        "Does the claim go beyond the outcome the researchers actually measured?",
      ]}
    />
  );
}
