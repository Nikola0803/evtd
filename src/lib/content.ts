import { FaqItem } from "./types";

// The previous export here (`testimonials`) was a set of fabricated
// social-handle quotes (@researchlab_j, etc.) never backed by a real
// review system -- removed per the B2B/analytical repositioning: an
// unverifiable quote is the same credibility problem as a fake consumer
// review. No replacement needed; nothing in the app imports it anymore
// (see ProofSection.tsx, which now renders a static institutional trust
// strip instead of any quote-based social proof).

export const faqItems: FaqItem[] = [
  {
    question: "What does the session cost?",
    answer: "Nothing. Your first 15-minute call is free, with no obligation.",
  },
  {
    question: "Who will I be speaking with?",
    answer: "One of our peptide education specialists. They work with these topics every day and explain our resources in plain language.",
  },
  {
    question: "Do I need to prepare anything?",
    answer: "No. Come with whatever questions are on your mind. There are no wrong ones.",
  },
  {
    question: "Is this medical advice?",
    answer: "No. EVLV provides education only. We do not provide medical advice, diagnoses, prescriptions, or treatment.",
  },
  {
    question: "Will you try to sell me something?",
    answer: "No. The first call is educational. There is no pitch and no obligation.",
  },
  {
    question: "What happens to my information?",
    answer: "It stays with our team. We follow applicable U.S. privacy laws and never sell your details.",
  },
  {
    question: "Where is EVLV available?",
    answer: "Online, across the United States. All you need is a phone or computer.",
  },
];
