export const trustRow = [
  { label: 'Licensed US clinicians', icon: 'ri-shield-check-line' },
  { label: 'Licensed US pharmacy fulfillment', icon: 'ri-truck-line' },
  { label: 'Transparent monthly pricing', icon: 'ri-price-tag-3-line' },
  { label: 'Secure and private', icon: 'ri-lock-2-line' },
  { label: 'Ongoing support', icon: 'ri-customer-service-2-line' },
];

export const standardStats = [
  { value: '40+', label: 'US states where network clinicians are licensed' },
  { value: '100%', label: 'Prescription decisions made by a licensed clinician' },
  { value: '0', label: 'Research-grade products sold, ever' },
  { value: '~3 min', label: 'Average time to complete an assessment' },
];

export const standards = [
  {
    title: 'Licensed clinical review',
    copy: 'A provider licensed to care for you in your state reviews your information independently.',
    icon: 'ri-stethoscope-line',
  },
  {
    title: 'Patient-specific prescriptions',
    copy: 'Prescriptions are written for you — never a one-size-fits-all order.',
    icon: 'ri-file-list-3-line',
  },
  {
    title: 'Licensed US pharmacy fulfillment',
    copy: 'Prepared and dispensed by licensed US pharmacy partners, not a research-product warehouse.',
    icon: 'ri-building-2-line',
  },
  {
    title: 'Transparent plan pricing',
    copy: 'Starting prices are shown up front, with inclusions and totals before you authorize payment.',
    icon: 'ri-price-tag-3-line',
  },
  {
    title: 'Ongoing clinician access',
    copy: 'Check-ins, follow-up questions and renewal reviews keep care moving with you.',
    icon: 'ri-chat-check-line',
  },
  {
    title: 'Secure patient experience',
    copy: 'Your assessment and messages are protected with strong privacy practices.',
    icon: 'ri-lock-2-line',
  },
];

export const comparison = {
  evlv: [
    'Licensed provider evaluation',
    'Individual prescription when appropriate',
    'Pharmacy-dispensed treatment',
    'Personalized directions',
    'Ongoing clinical support',
    'Traceable fulfillment',
  ],
  research: [
    'No patient evaluation',
    'No prescription',
    'No clinician responsible for care',
    'Not intended for human use',
    'No personalized medical oversight',
  ],
};

export const comparisonRows = [
  { label: 'Licensed provider evaluation', evlv: true, research: false },
  { label: 'Individual prescription when appropriate', evlv: true, research: false },
  { label: 'Pharmacy-dispensed treatment', evlv: true, research: false },
  { label: 'Personalized directions', evlv: true, research: false },
  { label: 'Ongoing clinical support', evlv: true, research: false },
  { label: 'Traceable fulfillment', evlv: true, research: false },
];

export const steps = [
  {
    number: '01',
    title: 'Tell us about yourself',
    copy: 'Complete a secure assessment covering your goals, health history, medications and preferences.',
    image:
      'https://readdy.ai/api/search-image?query=Editorial%20lifestyle%20photograph%20of%20an%20adult%20sitting%20calmly%20on%20a%20sofa%20completing%20a%20private%20online%20form%20on%20a%20tablet%2C%20warm%20natural%20window%20light%2C%20soft%20neutral%20interior%2C%20muted%20sage%20and%20stone%20palette%2C%20authentic%20unposed%20premium%20wellness%20mood&width=900&height=620&seq=evlv-step-assess-01&orientation=landscape',
  },
  {
    number: '02',
    title: 'A clinician reviews your information',
    copy: 'A licensed provider independently determines whether treatment is safe and appropriate. They may request more information, laboratory testing or a video visit.',
    image:
      'https://readdy.ai/api/search-image?query=Editorial%20photograph%20of%20a%20physician%20reviewing%20notes%20on%20a%20laptop%20at%20a%20tidy%20minimal%20desk%2C%20soft%20daylight%2C%20calm%20professional%20atmosphere%2C%20muted%20sage%20and%20stone%20palette%2C%20unposed%20documentary%20style%2C%20trustworthy%20premium%20mood&width=900&height=620&seq=evlv-step-review-01&orientation=landscape',
  },
  {
    number: '03',
    title: 'Your treatment is delivered',
    copy: 'If prescribed, your licensed pharmacy prepares and ships your treatment. Care continues through check-ins and renewal reviews.',
    image:
      'https://readdy.ai/api/search-image?query=Editorial%20photograph%20of%20a%20plain%20discreet%20parcel%20resting%20at%20a%20bright%20front%20door%20in%20morning%20light%2C%20minimal%20lifestyle%20still%20life%2C%20muted%20sage%20and%20stone%20palette%2C%20calm%20quiet%20premium%20mood%2C%20generous%20negative%20space&width=900&height=620&seq=evlv-step-delivery-01&orientation=landscape',
  },
];

export const inclusions = [
  { label: 'Licensed clinician review', icon: 'ri-stethoscope-line' },
  { label: 'Individual prescription when appropriate', icon: 'ri-file-list-3-line' },
  { label: 'Pharmacy preparation and dispensing', icon: 'ri-flask-line' },
  { label: 'Required administration supplies where applicable', icon: 'ri-hand-sanitizer-line' },
  { label: 'Shipping', icon: 'ri-truck-line' },
  { label: 'Secure clinician messaging', icon: 'ri-chat-3-line' },
  { label: 'Progress check-ins', icon: 'ri-line-chart-line' },
  { label: 'Renewal review', icon: 'ri-refresh-line' },
  { label: 'Pause or cancellation controls', icon: 'ri-pause-circle-line' },
];

export const pathway = [
  { label: 'Clinical review', icon: 'ri-stethoscope-line' },
  { label: 'Prescription', icon: 'ri-file-list-3-line' },
  { label: 'Pharmacy preparation', icon: 'ri-flask-line' },
  { label: 'Quality controls', icon: 'ri-shield-check-line' },
  { label: 'Patient delivery', icon: 'ri-truck-line' },
];

export const supportTeams = [
  {
    title: 'EVOLV Support',
    copy: 'Real people to help with the practical side of your care.',
    icon: 'ri-customer-service-2-line',
    items: ['Account access', 'Billing', 'Subscription changes', 'Delivery tracking', 'General assistance'],
  },
  {
    title: 'Clinical Care Team',
    copy: 'Licensed clinicians handle anything medical.',
    icon: 'ri-stethoscope-line',
    items: [
      'Treatment questions',
      'Side effects',
      'Prescription directions',
      'Treatment changes',
      'Follow-up care',
    ],
  },
];

// Bolder homepage merchandising — mirrors a premium direct-care storefront rhythm.
export const heroPanel = {
  eyebrow: 'Most started program',
  name: 'Sermorelin Care',
  purpose: 'Sleep, recovery and natural growth-hormone support',
  priceLabel: '$109',
  priceSuffix: '/month',
  note: 'Free clinical review · Pay only if prescribed',
  slug: 'sermorelin',
  image:
    'https://readdy.ai/api/search-image?query=Premium%20clinical%20still%20life%20of%20a%20single%20glass%20vial%20and%20slim%20neutral%20packaging%20on%20a%20soft%20stone%20pedestal%2C%20warm%20directional%20light%2C%20deep%20charcoal%20and%20sage%20background%2C%20editorial%20pharmaceutical%20product%20photography%2C%20calm%20luxurious%20mood%2C%20clean%20minimal%20composition&width=1000&height=760&seq=evlv-hero-feature-card-01&orientation=landscape',
};

export const heroTracker = {
  eyebrow: 'Your patient portal',
  title: 'Progress tracked in one place',
  copy: 'Clinical-review status, shipment tracking, renewal dates and secure messages — all in your portal.',
  image:
    'https://readdy.ai/api/search-image?query=Editorial%20lifestyle%20photograph%20of%20an%20adult%20checking%20a%20health%20tracking%20app%20on%20a%20smartphone%20while%20standing%20near%20a%20bright%20window%2C%20warm%20morning%20light%2C%20neutral%20modern%20interior%2C%20muted%20sage%20and%20stone%20palette%2C%20calm%20premium%20lifestyle%20mood&width=900&height=760&seq=evlv-hero-tracker-card-01&orientation=landscape',
};

export const comparisonImage =
  'https://readdy.ai/api/search-image?query=Premium%20editorial%20portrait%20of%20a%20calm%20confident%20adult%20in%20simple%20neutral%20clothing%20standing%20in%20a%20bright%20minimal%20room%2C%20soft%20natural%20window%20light%2C%20unposed%20documentary%20lifestyle%20photography%2C%20muted%20sage%20and%20stone%20palette%2C%20quiet%20aspirational%20mood%2C%20generous%20negative%20space&width=900&height=1100&seq=evlv-comparison-portrait-01&orientation=portrait';

export const faqImage =
  'https://readdy.ai/api/search-image?query=Warm%20editorial%20photograph%20of%20an%20adult%20relaxed%20in%20a%20bright%20minimal%20room%20reading%20on%20a%20tablet%2C%20soft%20natural%20light%2C%20neutral%20linen%20and%20sage%20tones%2C%20calm%20lifestyle%20photography%2C%20quiet%20premium%20mood%2C%20generous%20negative%20space&width=900&height=1000&seq=evlv-faq-portrait-01&orientation=portrait';

export const heroImage =
  'https://readdy.ai/api/search-image?query=Abstract%20editorial%20photograph%20of%20soft%20morning%20light%20falling%20across%20a%20textured%20plaster%20wall%20in%20warm%20ivory%20and%20deep%20sage%20tones%2C%20gentle%20organic%20gradients%2C%20calm%20premium%20atmosphere%2C%20no%20people%2C%20subtle%20film%20grain%2C%20cinematic%20minimal%20composition%2C%20quiet%20luxury%20mood&width=1920&height=1080&seq=evlv-hero-main-01&orientation=landscape';

export const pharmacyImage =
  'https://readdy.ai/api/search-image?query=Minimal%20editorial%20still%20life%20of%20matte%20neutral%20pharmaceutical%20packaging%20and%20glass%20vials%20on%20a%20clean%20stone%20surface%2C%20soft%20warm%20daylight%2C%20premium%20medical%20product%20photography%2C%20muted%20sage%20and%20stone%20palette%2C%20calm%20uncluttered%20background&width=1200&height=900&seq=evlv-pharmacy-still-01&orientation=landscape';

export const supportImage =
  'https://readdy.ai/api/search-image?query=Warm%20editorial%20photograph%20of%20a%20friendly%20support%20specialist%20with%20a%20headset%20smiling%20at%20a%20bright%20minimal%20desk%2C%20natural%20window%20light%2C%20authentic%20unposed%20lifestyle%20photography%2C%20muted%20sage%20and%20stone%20palette%2C%20caring%20premium%20mood&width=1200&height=1000&seq=evlv-support-human-01&orientation=portrait';

export const finalCtaImage =
  'https://readdy.ai/api/search-image?query=Abstract%20editorial%20photograph%20of%20calm%20morning%20mist%20over%20a%20quiet%20landscape%20in%20deep%20sage%20and%20warm%20stone%20tones%2C%20soft%20light%20gradients%2C%20no%20people%2C%20serene%20premium%20atmosphere%2C%20subtle%20film%20grain%2C%20cinematic%20minimal%20composition&width=1920&height=1000&seq=evlv-final-cta-01&orientation=landscape';