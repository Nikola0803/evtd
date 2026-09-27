export interface JournalArticle {
  slug: string;
  label: string;
  title: string;
  excerpt: string;
  image: string;
  publishedDate: string;
  readTime: string;
  body: string[];
  cta?: { label: string; href: string };
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    slug: "hormone-health-after-35",
    label: "Hormone Health",
    title: "Hormone health after 35: what is changing, and what is not",
    excerpt:
      "A grounded guide to the shifts that can affect sleep, energy, mood and body composition - and how to prepare for a useful conversation with your clinician.",
    image: "/images/brand/hormone-metabolic-health.png",
    publishedDate: "2026-09-24",
    readTime: "6 min read",
    body: [
      "Hormone health is not a single number and it is rarely explained by one symptom. Sleep quality, stress, nutrition, activity, medications and life stage all shape how you feel. In the years leading up to menopause, changing hormone patterns can affect menstrual cycles and may coincide with symptoms such as hot flashes, disrupted sleep, mood changes or difficulty concentrating. The experience varies widely, which is why a personal timeline is often more useful than a generic checklist.",
      "Start by noticing patterns rather than trying to diagnose yourself. Track cycle changes, sleep, energy, temperature sensitivity, training recovery and mood for several weeks. Include medications and major changes in work, caregiving or stress. This creates a clearer picture for a licensed healthcare professional and helps separate a persistent trend from an unusually demanding week.",
      "Testing can be useful when a clinician determines that it fits the situation, but results need context. A laboratory value is interpreted alongside symptoms, medical history, age and sometimes the timing of a menstrual cycle. One isolated result cannot describe the whole system, and online reference ranges are not a substitute for a clinical interpretation.",
      "The strongest foundation remains surprisingly practical: regular movement, strength work, enough food and protein for your needs, consistent sleep routines and preventive care. These habits do not erase every symptom, but they make changes easier to observe and give you a more stable baseline from which to make decisions with your care team.",
      "A good next step is not to chase a perfect hormone profile. It is to arrive at your appointment with a concise history, clear priorities and questions you genuinely want answered. That turns a vague sense that something is off into a productive, individualized conversation.",
    ],
    cta: { label: "Explore Hormone Health", href: "/hormone-health" },
  },
  {
    slug: "metabolic-health-beyond-the-scale",
    label: "Metabolic Health",
    title: "Metabolic health is bigger than the number on the scale",
    excerpt:
      "Why energy, blood pressure, sleep, daily movement and clinical markers tell a more useful story than body weight alone.",
    image: "/images/brand/wellness-consultation.png",
    publishedDate: "2026-09-20",
    readTime: "5 min read",
    body: [
      "Body weight is one measurement. Metabolic health is the broader way your body handles and uses energy, and it cannot be read from appearance alone. Two people at the same weight may have very different activity patterns, sleep quality, muscle mass, medical history and clinical markers. That is why a scale can be part of the picture without becoming the entire picture.",
      "A more useful review combines daily experience with objective information. Energy through the day, appetite patterns, sleep, blood pressure, waist trend and appropriate laboratory results can each add context. Your clinician may consider markers such as blood glucose or lipids depending on your history and risk factors. No single metric should be treated as a grade.",
      "The basics are powerful because they influence several systems at once. Regular aerobic activity and muscle-strengthening work support health beyond calorie expenditure. Consistent sleep, a varied eating pattern and less sedentary time help build a foundation that is easier to sustain than an aggressive short-term reset.",
      "Progress can also happen before it is obvious on the scale. You may recover more quickly, feel steadier between meals, lift more weight, walk farther or sleep more consistently. Those changes are not consolation prizes; they are meaningful signals that a plan is becoming part of your life.",
      "The goal is not to collect as many metrics as possible. Choose a small set that reflects what you are actually trying to improve, review them at a sensible interval and bring medical questions to a qualified professional. Better data should create clarity, not anxiety.",
    ],
  },
  {
    slug: "sustainable-body-recomposition",
    label: "Body Composition",
    title: "Body recomposition without the all-or-nothing plan",
    excerpt:
      "A practical framework for building strength, supporting muscle and changing body composition without turning wellness into a second job.",
    image: "/images/brand/weight-body-composition.png",
    publishedDate: "2026-09-16",
    readTime: "6 min read",
    body: [
      "Body recomposition generally means changing the relationship between fat mass and lean mass. It is not the same as simply making body weight fall as quickly as possible. A useful plan therefore pays attention to strength, recovery and consistency - not only to a weekly scale reading.",
      "Resistance training is central because muscle needs a reason to be maintained and developed. The best program is not necessarily the most complicated one; it is the one you can repeat with sound technique and gradual progression. Current public-health guidance recommends muscle-strengthening activity on at least two days each week, alongside regular aerobic movement, but an individual starting point should reflect health, experience and mobility.",
      "Nutrition should support the work rather than punish the body. Regular meals, adequate protein, fiber-rich foods and portions that match your needs are more useful than cycling between severe restriction and rebound eating. If you have a medical condition, a history of disordered eating or significant dietary restrictions, personalized guidance from a registered dietitian or clinician matters.",
      "Recovery is part of the program. Training stress, work stress and poor sleep all draw from the same person. When performance stalls, adding more exercise is not always the answer; a lighter week, a consistent bedtime or a simpler plan may create more progress than another high-intensity session.",
      "Measure what supports good decisions. Strength trends, how clothing fits, energy, mobility and occasional standardized measurements can be more informative together than daily fluctuations in weight. Sustainable recomposition is usually quiet: modest actions repeated long enough to become normal.",
    ],
    cta: { label: "Book a Free Consultation", href: "/book" },
  },
  {
    slug: "sleep-is-a-health-strategy",
    label: "Sleep & Recovery",
    title: "Sleep is a health strategy, not leftover time",
    excerpt:
      "How to build a calmer, more consistent sleep routine - and when persistent sleep problems deserve clinical attention.",
    image: "/images/brand/wellness-hero.png",
    publishedDate: "2026-09-12",
    readTime: "5 min read",
    body: [
      "Sleep affects how we think, move, recover and regulate emotion, yet it is often treated as whatever time remains after the day is finished. A better approach is to view sleep as a repeating health behavior with its own environment, timing and cues.",
      "Consistency is a useful first lever. Going to bed and waking at roughly similar times helps make sleep more predictable. A short wind-down routine, lower evening light, a comfortable room and a clear boundary around late work can tell the body that the active part of the day is ending.",
      "Daytime behavior matters too. Regular activity and morning light can support a stable rhythm, while late caffeine, heavy meals close to bedtime and alcohol may interfere with sleep for some people. Change one variable at a time so you can tell what actually helps instead of rebuilding your entire routine overnight.",
      "Not every difficult night is a problem to solve. Travel, stress, illness and life events temporarily change sleep. The more important signal is a persistent pattern - especially loud snoring, pauses in breathing, severe daytime sleepiness or insomnia that affects daily function. Those signs deserve a conversation with a healthcare professional rather than another supplement experiment.",
      "The goal is not flawless sleep. It is a routine that makes good sleep more likely and a plan for getting appropriate help when it remains out of reach.",
    ],
  },
  {
    slug: "longevity-starts-with-capacity",
    label: "Longevity",
    title: "Longevity starts with capacity for everyday life",
    excerpt:
      "A less glamorous - and more useful - way to think about living well for longer: strength, movement, connection and preventive care.",
    image: "/images/brand/female-athlete-focus.png",
    publishedDate: "2026-09-08",
    readTime: "6 min read",
    body: [
      "Longevity is often marketed as a collection of advanced interventions. A more practical definition is the ability to keep participating in your own life: walking comfortably, carrying things, recovering from ordinary effort, staying connected and adapting when circumstances change.",
      "Physical capacity is built through repeated use. Aerobic activity supports endurance, strength work helps maintain muscle and bone, and balance or mobility practice can preserve confidence in movement. The right mix depends on the person, but consistency matters more than novelty.",
      "Healthy aging also happens outside the gym. Nutritious food, regular sleep, stress management, social connection and routine medical care all contribute to the larger picture. Genetics matters, but it does not make daily behavior irrelevant; small choices can still influence how well we function as we age.",
      "Preventive care belongs in any credible longevity plan. Screening schedules, vaccinations and risk-factor management should be discussed with a healthcare professional who knows your age, history and family background. A wearable can surface trends, but it cannot replace that relationship.",
      "Choose goals that describe a life, not just a lifespan. Being able to hike on holiday, play with grandchildren, travel independently or return to a favorite sport makes the idea of longevity concrete - and gives today’s habits a reason to stick.",
    ],
  },
  {
    slug: "energy-is-information",
    label: "Performance & Energy",
    title: "Low energy is information - not a character flaw",
    excerpt:
      "A structured way to examine fatigue across sleep, workload, nutrition, training and health without defaulting to more caffeine.",
    image: "/images/brand/female-athlete-focus.png",
    publishedDate: "2026-09-04",
    readTime: "5 min read",
    body: [
      "Energy is often discussed as if it were motivation. In reality, persistent fatigue can reflect many overlapping factors: insufficient or disrupted sleep, under-fueling, excessive training, stress, medication effects or a medical issue that needs assessment. Treating it as a personal failure usually delays the useful questions.",
      "Begin with a simple audit. Note when energy drops, how long you sleep, whether you wake refreshed, how regularly you eat and how training or work demands have changed. Look for patterns across two or three weeks rather than drawing conclusions from one difficult day.",
      "Then reduce avoidable friction. Schedule demanding work for your clearer hours when possible, build meals you can repeat, alternate hard and easier training days and protect a consistent sleep window. These are not dramatic interventions, but they make it easier to see what remains when basic strain is reduced.",
      "More stimulation is not always more energy. Caffeine can temporarily improve alertness, but increasing it to compensate for chronic exhaustion may make sleep more difficult and continue the cycle. A persistent or unexplained change in energy - especially with other symptoms - should be discussed with a healthcare professional.",
      "The useful question is not “How do I force myself through this?” It is “What is this pattern asking me to investigate?” That shift turns fatigue from a moral judgment into actionable information.",
    ],
  },
  {
    slug: "prepare-for-a-wellness-consultation",
    label: "Getting Started",
    title: "How to prepare for a useful wellness consultation",
    excerpt:
      "The notes, questions and priorities that turn a first conversation into a clearer and more personal plan.",
    image: "/images/brand/wellness-consultation.png",
    publishedDate: "2026-08-30",
    readTime: "4 min read",
    body: [
      "A useful consultation starts before the call. You do not need a perfect health record, but a short, organized summary helps the conversation move from broad goals to practical next steps.",
      "Write down the two or three changes that matter most to you. “Feel better” is understandable, but “sleep through the night,” “rebuild strength after a long break” or “understand what to discuss with my clinician” gives the conversation direction. Add when the issue began and what you have already tried.",
      "Bring an accurate list of medications and supplements, relevant diagnoses, recent changes and any clinician-provided laboratory results you want help organizing. A wellness consultation should not diagnose disease or replace medical care, but it can help you prepare questions and identify which concerns belong with a licensed provider.",
      "Be honest about your real schedule. A plan that assumes five free mornings is not personalized if you have one. Mention work patterns, caregiving, travel, food preferences, injuries and what has made previous plans hard to maintain.",
      "Finish by agreeing on a small number of next actions and how progress will be reviewed. Clarity beats volume. You should leave knowing what to do, why it matters and when to reassess.",
    ],
    cta: { label: "Book Your Free Call", href: "/book" },
  },
  {
    slug: "a-better-way-to-track-progress",
    label: "Wellness Planning",
    title: "A better way to track progress without tracking everything",
    excerpt:
      "How to choose a few meaningful signals, review them calmly and keep the dashboard from becoming the goal.",
    image: "/images/brand/molecular-sculpture.png",
    publishedDate: "2026-08-25",
    readTime: "5 min read",
    body: [
      "More data does not automatically create better decisions. Wearables, food logs, scales and apps can be useful, but they can also produce a constant stream of numbers with no clear link to the outcome you care about.",
      "Start with the goal, then choose the measure. If the goal is steadier energy, a simple afternoon energy rating and sleep consistency may be enough. If it is strength, track a few repeatable lifts or movements. If it is a clinical concern, agree with your healthcare professional on the appropriate marker and review interval.",
      "Use trends rather than isolated readings. Daily values move for ordinary reasons, including hydration, travel, stress and routine variation. A weekly or monthly review often tells a more useful story than reacting to every fluctuation.",
      "Pair numbers with context. A training session completed after poor sleep does not mean the same thing as one completed after a restorative week. Brief notes about stress, illness or schedule changes can explain a trend that otherwise looks mysterious.",
      "Finally, remove any metric that changes your behavior in an unhelpful way. The dashboard is there to support the plan, not become another source of pressure. The best tracking system is small enough to maintain and clear enough to guide the next decision.",
    ],
  },
];

export function getJournalArticles() {
  return JOURNAL_ARTICLES;
}

export function getJournalArticleBySlug(slug: string) {
  return JOURNAL_ARTICLES.find((article) => article.slug === slug);
}
