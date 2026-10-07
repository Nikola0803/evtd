import { states } from '@/mocks/states';

export interface FieldOption {
  value: string;
  label: string;
  description?: string;
  icon?: string;
}

export interface Field {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'select' | 'multiselect' | 'cards' | 'consent';
  required?: boolean;
  placeholder?: string;
  options?: FieldOption[];
  maxLength?: number;
  help?: string;
  optional?: boolean;
  consentText?: string;
  wide?: boolean;
}

export interface Step {
  id: string;
  section: string;
  title: string;
  subtitle?: string;
  fields: Field[];
  isReview?: boolean;
}

const stateOptions: FieldOption[] = states.map((state) => ({
  value: state.code,
  label: `${state.name} (${state.code})`,
}));

export const assessmentSteps: Step[] = [
  {
    id: 'eligibility',
    section: 'Eligibility',
    title: 'Let’s confirm you can continue.',
    subtitle: 'EVOLV Today serves adults 18 and over in supported states.',
    fields: [
      {
        name: 'state',
        label: 'Which state do you live in?',
        type: 'select',
        required: true,
        placeholder: 'Select your state',
        options: stateOptions,
      },
      {
        name: 'age',
        label: 'How old are you?',
        type: 'number',
        required: true,
        placeholder: 'e.g. 42',
        help: 'You must be 18 or older to continue.',
      },
    ],
  },
  {
    id: 'goal',
    section: 'Your goal',
    title: 'What would you most like to improve?',
    subtitle: 'Choose the goal that matters most right now.',
    fields: [
      {
        name: 'primaryGoal',
        label: 'Primary goal',
        type: 'cards',
        required: true,
        options: [
          { value: 'sleep-recovery', label: 'Sleep & Recovery', description: 'Wake restored. Recover with purpose.', icon: 'ri-moon-clear-line' },
          { value: 'energy-longevity', label: 'Energy & Longevity', description: 'Consistent energy and long-term resilience.', icon: 'ri-sun-line' },
          { value: 'body-composition', label: 'Body Composition', description: 'A clinician-guided metabolic strategy.', icon: 'ri-body-scan-line' },
          { value: 'skin-hair', label: 'Skin & Hair', description: 'Healthier-looking skin, hair and renewal.', icon: 'ri-leaf-line' },
          { value: 'sexual-wellness', label: 'Sexual Wellness', description: 'Private care built around confidence.', icon: 'ri-heart-3-line' },
        ],
      },
    ],
  },
  {
    id: 'category',
    section: 'Your goal',
    title: 'Which type of care interests you?',
    subtitle: 'If you are unsure, your clinician can guide you.',
    fields: [
      {
        name: 'preferredCategory',
        label: 'Preferred treatment category',
        type: 'cards',
        required: true,
        options: [
          { value: 'Injectable', label: 'Injectable therapy', description: 'Subcutaneous treatment, clinician-directed.', icon: 'ri-drop-line' },
          { value: 'Topical', label: 'Topical treatment', description: 'Applied to skin or scalp as part of a routine.', icon: 'ri-hand-sanitizer-line' },
          { value: 'Oral', label: 'Oral treatment', description: 'A tablet or capsule taken as directed.', icon: 'ri-capsule-line' },
          { value: 'Personalized', label: 'Personalized program', description: 'A plan shaped after clinical review.', icon: 'ri-user-settings-line' },
          { value: 'Recommend', label: 'Not sure — guide me', description: 'Let your clinician recommend an option.', icon: 'ri-question-line' },
        ],
      },
    ],
  },
  {
    id: 'symptoms',
    section: 'Health background',
    title: 'Tell us what you have been experiencing.',
    subtitle: 'Select everything that applies. This helps your clinician.',
    fields: [
      {
        name: 'symptoms',
        label: 'Symptoms and concerns',
        type: 'multiselect',
        required: true,
        options: [
          { value: 'low-energy', label: 'Low energy or fatigue' },
          { value: 'poor-sleep', label: 'Poor sleep quality' },
          { value: 'slow-recovery', label: 'Slow recovery from exercise' },
          { value: 'focus', label: 'Difficulty with focus' },
          { value: 'weight', label: 'Weight or metabolic concerns' },
          { value: 'skin', label: 'Skin changes' },
          { value: 'hair', label: 'Hair thinning' },
          { value: 'libido', label: 'Reduced libido' },
          { value: 'none', label: 'None of the above' },
        ],
      },
      {
        name: 'symptomNotes',
        label: 'Anything else your clinician should know?',
        type: 'textarea',
        optional: true,
        maxLength: 500,
        placeholder: 'Optional. Please avoid sharing unnecessary sensitive details.',
        wide: true,
      },
    ],
  },
  {
    id: 'conditions',
    section: 'Health background',
    title: 'Do any of these medical conditions apply to you?',
    subtitle: 'Select all that apply. Honest answers keep your review safe.',
    fields: [
      {
        name: 'conditions',
        label: 'Medical conditions',
        type: 'multiselect',
        required: true,
        options: [
          { value: 'diabetes', label: 'Diabetes or prediabetes' },
          { value: 'blood-pressure', label: 'High blood pressure' },
          { value: 'heart', label: 'Heart condition' },
          { value: 'thyroid', label: 'Thyroid condition' },
          { value: 'cancer', label: 'Cancer (current or past)' },
          { value: 'kidney-liver', label: 'Kidney or liver condition' },
          { value: 'sleep-apnea', label: 'Sleep apnea' },
          { value: 'mental-health', label: 'Mental health condition' },
          { value: 'none', label: 'None of the above' },
        ],
      },
    ],
  },
  {
    id: 'medications',
    section: 'Health background',
    title: 'Are you currently taking any medications?',
    subtitle: 'This includes prescriptions, over-the-counter medicines and supplements.',
    fields: [
      {
        name: 'medicationStatus',
        label: 'Current medications',
        type: 'cards',
        required: true,
        options: [
          { value: 'none', label: 'No medications', description: 'Not taking anything regularly.', icon: 'ri-check-line' },
          { value: 'prescription', label: 'Prescription medications', description: 'Taking one or more prescriptions.', icon: 'ri-capsule-line' },
          { value: 'supplements', label: 'Supplements only', description: 'Vitamins or other supplements.', icon: 'ri-leaf-line' },
        ],
      },
      {
        name: 'medicationList',
        label: 'List them here',
        type: 'textarea',
        optional: true,
        maxLength: 500,
        placeholder: 'Medication or supplement, dose and how often.',
        wide: true,
      },
    ],
  },
  {
    id: 'allergies',
    section: 'Health background',
    title: 'Do you have any known allergies?',
    fields: [
      {
        name: 'allergyStatus',
        label: 'Allergies',
        type: 'cards',
        required: true,
        options: [
          { value: 'none', label: 'No known allergies', icon: 'ri-check-line' },
          { value: 'medication', label: 'Medication allergies', icon: 'ri-capsule-line' },
          { value: 'other', label: 'Other allergies', icon: 'ri-alert-line' },
        ],
      },
      {
        name: 'allergyDetails',
        label: 'Please describe',
        type: 'textarea',
        optional: true,
        maxLength: 500,
        placeholder: 'Optional details about your allergies.',
        wide: true,
      },
    ],
  },
  {
    id: 'previous',
    section: 'Health background',
    title: 'Have you tried treatments like these before?',
    fields: [
      {
        name: 'previousTreatments',
        label: 'Previous treatments',
        type: 'multiselect',
        required: true,
        options: [
          { value: 'new', label: 'No, this is new to me' },
          { value: 'topical', label: 'Prescription topical' },
          { value: 'injectable', label: 'Injectable therapy' },
          { value: 'oral', label: 'Oral prescription' },
          { value: 'metabolic', label: 'Weight or metabolic program' },
          { value: 'other', label: 'Something else' },
        ],
      },
    ],
  },
  {
    id: 'contraindications',
    section: 'Safety questions',
    title: 'A few important safety questions.',
    subtitle: 'These help a clinician decide whether treatment is safe for you.',
    fields: [
      {
        name: 'pregnancy',
        label: 'Are you currently pregnant, breastfeeding, or planning pregnancy?',
        type: 'cards',
        required: true,
        options: [
          { value: 'no', label: 'No' },
          { value: 'yes', label: 'Yes' },
          { value: 'na', label: 'Not applicable' },
        ],
      },
      {
        name: 'reaction',
        label: 'Have you ever had a serious reaction to a prescription treatment?',
        type: 'cards',
        required: true,
        options: [
          { value: 'no', label: 'No' },
          { value: 'yes', label: 'Yes' },
          { value: 'unsure', label: 'Unsure' },
        ],
      },
      {
        name: 'hospitalized',
        label: 'Have you been hospitalized in the last 12 months?',
        type: 'cards',
        required: true,
        options: [
          { value: 'no', label: 'No' },
          { value: 'yes', label: 'Yes' },
        ],
      },
    ],
  },
  {
    id: 'preferences',
    section: 'Preferences',
    title: 'How would you prefer to receive treatment?',
    fields: [
      {
        name: 'preferredFormat',
        label: 'Preferred format',
        type: 'cards',
        required: true,
        options: [
          { value: 'injection', label: 'Injection', description: 'A subcutaneous treatment, clinician-directed.', icon: 'ri-drop-line' },
          { value: 'topical', label: 'Topical', description: 'Applied to skin or scalp.', icon: 'ri-hand-sanitizer-line' },
          { value: 'oral', label: 'Oral', description: 'A tablet or capsule.', icon: 'ri-capsule-line' },
          { value: 'clinician', label: 'Let my clinician decide', description: 'Recommend what is appropriate.', icon: 'ri-user-star-line' },
        ],
      },
    ],
  },
  {
    id: 'contact',
    section: 'Your details',
    title: 'Where should we send your clinical updates?',
    subtitle: 'Your information is private and reviewed only by your care team.',
    fields: [
      { name: 'firstName', label: 'First name', type: 'text', required: true, placeholder: 'Jordan' },
      { name: 'lastName', label: 'Last name', type: 'text', required: true, placeholder: 'Ellis' },
      { name: 'email', label: 'Email address', type: 'email', required: true, placeholder: 'you@example.com' },
      { name: 'phone', label: 'Mobile number', type: 'tel', required: true, placeholder: '(555) 010-2030' },
    ],
  },
  {
    id: 'verification',
    section: 'Your details',
    title: 'Verify your identity.',
    subtitle: 'A licensed clinician must be able to confirm who they are treating.',
    fields: [
      { name: 'dob', label: 'Date of birth', type: 'text', required: true, placeholder: 'MM / DD / YYYY' },
      { name: 'addressLine', label: 'Street address', type: 'text', required: true, placeholder: '1201 Congress Ave' },
      { name: 'city', label: 'City', type: 'text', required: true, placeholder: 'Austin' },
      { name: 'zip', label: 'ZIP code', type: 'text', required: true, placeholder: '78701' },
    ],
  },
  {
    id: 'consent',
    section: 'Consent',
    title: 'Telehealth consent.',
    subtitle: 'Please review and agree before continuing.',
    fields: [
      {
        name: 'telehealthConsent',
        label: 'Telehealth consent',
        type: 'consent',
        required: true,
        consentText:
          'I agree to receive care through telehealth. I understand that a licensed clinician will review my information and independently decide whether treatment is appropriate. I understand that completing this assessment does not guarantee a prescription, and that a clinician may decline treatment, request more information, laboratory testing or a video visit. I understand that compounded medications are not FDA-approved. I understand that I may withdraw consent at any time and that urgent medical needs should be directed to emergency services.',
      },
    ],
  },
  {
    id: 'payment',
    section: 'Payment',
    title: 'Payment authorization.',
    subtitle: 'You are not charged for treatment unless a clinician approves it.',
    fields: [
      {
        name: 'paymentConsent',
        label: 'Authorization',
        type: 'consent',
        required: true,
        consentText:
          'I authorize EVOLV Today to securely place a temporary hold on my payment method when I submit this assessment. I understand the treatment charge is captured only after clinical approval, according to the policy shown before checkout. I understand that if I am not prescribed treatment, no treatment charge is captured. I understand I can pause or cancel from my patient portal subject to the terms shown at checkout.',
      },
    ],
  },
  {
    id: 'review',
    section: 'Review',
    title: 'Review and submit your assessment.',
    subtitle: 'Check your answers, then send them for clinical review.',
    isReview: true,
    fields: [],
  },
];

export const TOTAL_STEPS = assessmentSteps.length;