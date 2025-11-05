/**
 * Quiz Question Library for HVAC Assessment Landing Page
 * Based on Daniel Priestley's "$1M Landing Page" framework
 */

export type QuestionType =
  | 'text'
  | 'email'
  | 'phone'
  | 'radio'
  | 'textarea';

export interface QuizOption {
  value: string;
  label: string;
  score?: number; // For scoring logic
}

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  description?: string; // Helper text below question
  placeholder?: string; // For text inputs
  options?: QuizOption[]; // For radio questions
  required: boolean;
}

/**
 * HVAC Assessment Questions
 *
 * Structure:
 * 1. Contact Info (Steps 1-2)
 * 2. System Assessment / Best Practices (Steps 3-7)
 * 3. Qualifying Questions (Steps 8-9)
 * 4. Open Text (Step 10)
 */
export const HVAC_QUIZ_QUESTIONS: QuizQuestion[] = [
  // CONTACT INFO
  {
    id: 'name',
    type: 'text',
    question: 'What\'s your name?',
    placeholder: 'John Smith',
    required: true,
  },
  {
    id: 'contact',
    type: 'text', // Special type - will render email + phone fields
    question: 'How can we reach you?',
    description: 'We\'ll send your results and next steps',
    required: true,
  },

  // SYSTEM AGE
  {
    id: 'system_age',
    type: 'radio',
    question: 'How old is your HVAC system?',
    description: 'Check your outside unit or indoor furnace for a manufacturing date',
    required: true,
    options: [
      { value: '0-5', label: '0-5 years old', score: 10 },
      { value: '6-10', label: '6-10 years old', score: 20 },
      { value: '11-15', label: '11-15 years old', score: 40 },
      { value: '16+', label: '16+ years old', score: 60 },
      { value: 'unknown', label: 'I don\'t know', score: 30 },
    ],
  },

  // LAST MAINTENANCE
  {
    id: 'last_maintenance',
    type: 'radio',
    question: 'When was your last professional maintenance?',
    description: 'Tune-ups, inspections, or filter changes by a technician',
    required: true,
    options: [
      { value: '0-6mo', label: 'Within 6 months', score: 5 },
      { value: '6-12mo', label: '6-12 months ago', score: 15 },
      { value: '1-2yr', label: '1-2 years ago', score: 25 },
      { value: '2+yr', label: '2+ years ago', score: 40 },
      { value: 'never', label: 'Never had maintenance', score: 50 },
    ],
  },

  // COMFORT LEVEL
  {
    id: 'comfort',
    type: 'radio',
    question: 'Are you comfortable in your home?',
    required: true,
    options: [
      { value: 'yes', label: 'Yes, comfortable year-round', score: 0 },
      { value: 'hot_summer', label: 'Too hot in summer', score: 30 },
      { value: 'cold_winter', label: 'Too cold in winter', score: 30 },
      { value: 'both', label: 'Both - hot AND cold', score: 50 },
      { value: 'inconsistent', label: 'Some rooms good, some bad', score: 40 },
    ],
  },

  // ENERGY BILLS
  {
    id: 'energy_bills',
    type: 'radio',
    question: 'Have your energy bills increased?',
    description: 'Compared to last year or similar homes',
    required: true,
    options: [
      { value: 'no', label: 'No, bills seem normal', score: 0 },
      { value: 'slight', label: 'Slightly higher', score: 20 },
      { value: 'significant', label: 'Significantly higher', score: 40 },
      { value: 'unsure', label: 'I\'m not sure', score: 10 },
    ],
  },

  // ISSUES
  {
    id: 'issues',
    type: 'radio',
    question: 'Any strange noises, smells, or other issues?',
    required: true,
    options: [
      { value: 'no', label: 'No, everything seems fine', score: 0 },
      { value: 'noises', label: 'Strange noises (grinding, squealing, banging)', score: 50 },
      { value: 'smells', label: 'Strange smells (burning, musty)', score: 60 },
      { value: 'leaks', label: 'Leaks or moisture', score: 70 },
      { value: 'cycling', label: 'System cycling on/off frequently', score: 40 },
      { value: 'not_working', label: 'System not working at all', score: 100 },
    ],
  },

  // URGENCY (QUALIFYING QUESTION)
  {
    id: 'urgency',
    type: 'radio',
    question: 'What\'s your situation right now?',
    required: true,
    options: [
      { value: 'emergency', label: 'Emergency - system not working', score: 100 },
      { value: 'problem', label: 'Problem - working poorly', score: 60 },
      { value: 'proactive', label: 'Proactive - planning ahead', score: 20 },
      { value: 'exploring', label: 'Just exploring options', score: 0 },
    ],
  },

  // TIMELINE (QUALIFYING QUESTION)
  {
    id: 'timeline',
    type: 'radio',
    question: 'When do you need help?',
    required: true,
    options: [
      { value: 'asap', label: 'ASAP - today or tomorrow', score: 100 },
      { value: 'this_week', label: 'This week', score: 70 },
      { value: 'this_month', label: 'Within this month', score: 40 },
      { value: 'planning', label: 'Just planning for later', score: 10 },
    ],
  },

  // OPEN TEXT
  {
    id: 'additional_info',
    type: 'textarea',
    question: 'Anything else we should know?',
    description: 'Tell us more about your situation (optional)',
    placeholder: 'e.g., "AC broke last night, house is 85 degrees" or "Looking to replace before next summer"',
    required: false,
  },
];

/**
 * Get total number of questions
 */
export const getTotalQuestions = () => HVAC_QUIZ_QUESTIONS.length;

/**
 * Get question by index
 */
export const getQuestion = (index: number): QuizQuestion | undefined => {
  return HVAC_QUIZ_QUESTIONS[index];
};

/**
 * Validate answer based on question type
 */
export const validateAnswer = (question: QuizQuestion, answer: string): boolean => {
  if (!question.required && !answer) return true;
  if (question.required && !answer) return false;

  switch (question.type) {
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answer);
    case 'phone':
      return /^\d{10,}$/.test(answer.replace(/\D/g, ''));
    default:
      return answer.length > 0;
  }
};
