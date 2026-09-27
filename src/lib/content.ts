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
    question: "What does evolv provide?",
    answer:
      "evolv provides peptide and wellness education in plain language. We share research context, learning resources, and questions you can bring to a licensed healthcare professional. We are not a medical provider.",
  },
  {
    question: "How do I get started?",
    answer:
      "Start with a free 15-minute call. We’ll listen to your goals, how you feel today, and the kind of support you want. Then we’ll agree on a simple next step.",
  },
  {
    question: "Do I need to be local to work with evolv?",
    answer:
      "Yes. Our education platform and sessions are online across the United States.",
  },
  {
    question: "Is this a substitute for medical care?",
    answer:
      "No. evolv provides education only. We are not a clinic or telehealth provider, and we do not diagnose, prescribe, or provide treatment. Personal medical questions belong with a licensed healthcare professional.",
  },
  {
    question: "What does a typical program include?",
    answer:
      "Start with a short call about what you want to understand. Depending on your membership, you may receive education sessions, access to our resource library, and organized learning guides.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "Digital programs and completed education sessions are non-refundable. If something is not right, contact us and we will review the situation. Membership plans can be cancelled before the next billing cycle.",
  },
  {
    question: "Do you offer programs for businesses or spas?",
    answer:
      "Yes. We work with spas, wellness centers, and corporate wellness programs to offer branded group plans, staff education, and client-facing wellness protocols. Reach out through the Contact page to discuss a B2B partnership.",
  },
];
