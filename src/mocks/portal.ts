export const portalPatient = {
  name: 'Sample Patient',
  initials: 'SP',
  memberSince: 'Member since January 2026',
  plan: 'Sermorelin Care · Monthly plan',
};

export const currentTreatment = {
  name: 'Sermorelin Care',
  format: 'Subcutaneous',
  directions: 'Follow the directions written by your clinician. Store as instructed and never adjust dosing on your own.',
  startedOn: 'Started 12 January 2026',
  status: 'Active',
};

export const reviewStatus = {
  stage: 'Approved',
  copy: 'A licensed clinician reviewed your information and approved your current plan. Your next renewal review is scheduled automatically.',
  date: 'Decision recorded 10 January 2026',
  steps: [
    { label: 'Assessment submitted', state: 'done' },
    { label: 'Clinical review', state: 'done' },
    { label: 'Prescription issued', state: 'done' },
    { label: 'Renewal review', state: 'upcoming' },
  ],
};

export const pharmacyStatus = {
  stage: 'Prepared',
  copy: 'Your prescription was prepared by a licensed US pharmacy partner and dispensed for you individually.',
  pharmacy: 'Licensed US pharmacy partner — details pending',
  lastUpdate: 'Updated 11 January 2026',
};

export const shipment = {
  carrier: 'Tracked carrier',
  tracking: 'Tracking number appears once dispatched',
  eta: 'Delivered 14 January 2026',
  status: 'Delivered',
  events: [
    { label: 'Pharmacy prepared', date: '11 Jan', done: true },
    { label: 'Dispatched', date: '12 Jan', done: true },
    { label: 'In transit', date: '13 Jan', done: true },
    { label: 'Delivered', date: '14 Jan', done: true },
  ],
};

export const renewal = {
  nextReview: '12 February 2026',
  copy: 'Renewals are reviewed, not automatic. A clinician confirms your plan is still appropriate before it continues.',
};

export const upcomingPayment = {
  date: '14 February 2026',
  amount: '$109.00',
  copy: 'Charged only after your renewal review is approved. You can update your payment method at any time.',
};

export const messages = [
  {
    id: 'msg-1',
    role: 'clinical',
    from: 'Clinical Care Team',
    subject: 'Your renewal review is scheduled',
    preview: 'Your clinician has scheduled your renewal review. No action is needed right now.',
    date: '14 Jan',
    unread: true,
  },
  {
    id: 'msg-2',
    role: 'clinical',
    from: 'Clinical Care Team',
    subject: 'How to report side effects',
    preview: 'If you notice anything unusual, use Side-effect reporting so your clinician is alerted promptly.',
    date: '12 Jan',
    unread: false,
  },
  {
    id: 'msg-3',
    role: 'support',
    from: 'EVOLV Support',
    subject: 'Delivery confirmed',
    preview: 'Your shipment was delivered. Let us know if the packaging was damaged in any way.',
    date: '14 Jan',
    unread: false,
  },
];

export const documents = [
  { id: 'doc-1', name: 'Prescription directions', kind: 'Instructions', date: '11 Jan 2026', size: 'PDF · 180 KB' },
  { id: 'doc-2', name: 'Plan summary and inclusions', kind: 'Plan', date: '10 Jan 2026', size: 'PDF · 240 KB' },
  { id: 'doc-3', name: 'Telehealth consent record', kind: 'Consent', date: '10 Jan 2026', size: 'PDF · 96 KB' },
  { id: 'doc-4', name: 'Subscription policy acknowledgement', kind: 'Policy', date: '10 Jan 2026', size: 'PDF · 120 KB' },
];

export const labs = [
  { id: 'lab-1', name: 'Baseline panel', date: 'Not requested yet', status: 'Pending clinician request' },
  { id: 'lab-2', name: 'Follow-up panel', date: 'To be scheduled', status: 'Not scheduled' },
];

export const treatmentInstructions = [
  'Follow the directions exactly as written by your clinician.',
  'Store your treatment as instructed on the packaging.',
  'Do not share your prescription with anyone else.',
  'Keep your contact details current so your care team can reach you.',
];

export const sideEffectReporting = [
  'Report anything unusual, even if you are unsure it is related.',
  'Describe when it started and how severe it feels.',
  'For severe reactions, stop and seek in-person care immediately.',
];

export const emergencyGuidance =
  'EVOLV Today is not for emergencies. If you have chest pain, difficulty breathing, severe swelling, signs of a serious allergic reaction or any other emergency, call 911 or go to the nearest emergency department immediately. Do not wait for a reply in the portal.';