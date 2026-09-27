import type { Metadata } from "next";
import { FocusEducationPage } from "@/components/education/FocusEducationPage";

export const metadata: Metadata = {
  title: "Performance & Energy Education",
  description: "Plain-language education about training, recovery, daily capacity, and how to read peptide performance research without hype.",
  alternates: { canonical: "/performance-energy" },
};

export default function PerformanceEnergyPage() {
  return (
    <FocusEducationPage
      eyebrow="Performance & energy"
      title="Understand what supports"
      accent="your capacity."
      intro="Explore how training, recovery, fuel, and daily rhythms work together—then learn how to question peptide claims without mistaking a mechanism for a result."
      image="/images/brand/focus-performance-energy.png"
      imageAlt="A woman training with focus in a bright fitness space"
      foundationsTitle="Performance is built across the whole week."
      foundationsIntro="Energy is not one switch, and performance is not one workout. Useful context includes training load, recovery, nourishment, sleep, stress, and how consistently those pieces fit together."
      foundations={[
        { number: "01", title: "Training demand", copy: "Understand the difference between effort, volume, intensity, and the purpose of a session." },
        { number: "02", title: "Fuel & hydration", copy: "Explore why energy availability and hydration belong in the performance conversation." },
        { number: "03", title: "Recovery", copy: "Learn how rest, sleep, and easier days relate to adaptation and everyday capacity." },
        { number: "04", title: "Consistency", copy: "Look beyond a single peak day toward repeatable habits and longer-term patterns." },
      ]}
      peptideTitle="A pathway is not proof of better performance."
      peptideParagraphs={[
        "Peptides can participate in signaling related to metabolism, tissue response, appetite, and recovery biology. Those mechanisms make them a subject of research, but a plausible pathway does not establish a performance benefit.",
        "Cell, animal, and early-stage findings answer different questions from controlled human research. A change in a laboratory measure also does not automatically mean more energy, strength, endurance, or faster recovery.",
        "We explain what kind of study you are looking at and what it can reasonably support. We do not recommend performance products or turn research into a personal protocol.",
      ]}
      questions={[
        "Was performance actually measured, or only a biological marker?",
        "Were the participants trained, untrained, healthy, or part of another population?",
        "What training, nutrition, and recovery conditions accompanied the result?",
        "Was the effect meaningful and repeated in human research?",
        "Are risks and unknowns given the same attention as possible benefits?",
      ]}
    />
  );
}
