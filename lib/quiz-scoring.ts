/**
 * Quiz Scoring Logic for HVAC Assessment
 * Calculates scores, generates insights, and recommends next steps
 */

import { HVAC_QUIZ_QUESTIONS } from './quiz-questions';

export type UrgencyLevel = 'emergency' | 'maintenance' | 'planning';

export interface QuizScore {
  totalScore: number;
  maxScore: number;
  percentage: number;
  urgency: UrgencyLevel;
  urgencyLabel: string;
  urgencyColor: string;
}

export interface QuizInsight {
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
}

export interface QuizResults {
  score: QuizScore;
  insights: QuizInsight[];
  recommendation: {
    title: string;
    description: string;
    cta: string;
    ctaStyle: 'emergency' | 'standard' | 'planning';
  };
}

/**
 * Calculate quiz score from answers
 */
export function calculateScore(answers: Record<string, string>): QuizScore {
  let totalScore = 0;
  let maxScore = 0;

  HVAC_QUIZ_QUESTIONS.forEach((question) => {
    if (question.options) {
      const answer = answers[question.id];
      const selectedOption = question.options.find((opt) => opt.value === answer);

      if (selectedOption && selectedOption.score !== undefined) {
        totalScore += selectedOption.score;
      }

      // Calculate max possible score for this question
      const maxQuestionScore = Math.max(...question.options.map((opt) => opt.score || 0));
      maxScore += maxQuestionScore;
    }
  });

  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
  const urgency = determineUrgency(answers, percentage);

  return {
    totalScore,
    maxScore,
    percentage,
    urgency: urgency.level,
    urgencyLabel: urgency.label,
    urgencyColor: urgency.color,
  };
}

/**
 * Determine urgency level based on answers and score
 */
function determineUrgency(
  answers: Record<string, string>,
  percentage: number
): { level: UrgencyLevel; label: string; color: string } {
  // Check for explicit emergency markers
  if (
    answers.urgency === 'emergency' ||
    answers.timeline === 'asap' ||
    answers.issues === 'not_working'
  ) {
    return {
      level: 'emergency',
      label: 'Immediate Attention Needed',
      color: 'red',
    };
  }

  // High score (60%+) or urgent problem
  if (
    percentage >= 60 ||
    answers.urgency === 'problem' ||
    answers.issues === 'leaks' ||
    answers.issues === 'smells'
  ) {
    return {
      level: 'maintenance',
      label: 'Service Recommended',
      color: 'yellow',
    };
  }

  // Lower score or proactive planning
  return {
    level: 'planning',
    label: 'Planning Ahead',
    color: 'green',
  };
}

/**
 * Generate personalized insights based on answers
 */
export function generateInsights(answers: Record<string, string>): QuizInsight[] {
  const insights: QuizInsight[] = [];

  // System age insight
  if (answers.system_age === '16+') {
    insights.push({
      title: 'Your system is past its expected lifespan',
      description:
        'Most HVAC systems last 15-20 years. Older systems are less efficient and more likely to fail. Plan for replacement soon.',
      severity: 'high',
    });
  } else if (answers.system_age === '11-15') {
    insights.push({
      title: 'Your system is nearing the end of its life',
      description:
        'Systems in this age range often need more repairs. Start planning for replacement in the next 2-3 years.',
      severity: 'medium',
    });
  }

  // Maintenance insight
  if (answers.last_maintenance === 'never' || answers.last_maintenance === '2+yr') {
    insights.push({
      title: 'Lack of maintenance reduces system life',
      description:
        'Systems without regular maintenance fail sooner and cost more to repair. Annual tune-ups catch small problems before they become big ones.',
      severity: 'medium',
    });
  }

  // Comfort insight
  if (answers.comfort !== 'yes') {
    insights.push({
      title: 'Comfort problems indicate system issues',
      description:
        'Uneven temperatures or inability to cool/heat properly mean your system isn\'t working right. This could be a simple fix or a sign of bigger problems.',
      severity: answers.comfort === 'both' ? 'high' : 'medium',
    });
  }

  // Energy bill insight
  if (answers.energy_bills === 'significant') {
    insights.push({
      title: 'High energy bills mean lost money',
      description:
        'A struggling system uses more energy. You might save 20-40% on bills with a more efficient system or proper repairs.',
      severity: 'medium',
    });
  }

  // Issues insight
  if (answers.issues === 'not_working') {
    insights.push({
      title: 'System failure requires immediate attention',
      description:
        'A non-working system is an emergency, especially in extreme weather. The longer you wait, the more uncomfortable (and potentially dangerous) it gets.',
      severity: 'high',
    });
  } else if (answers.issues === 'leaks') {
    insights.push({
      title: 'Leaks can cause serious damage',
      description:
        'Water leaks can damage your home, cause mold, and indicate refrigerant problems. These should be addressed quickly.',
      severity: 'high',
    });
  } else if (answers.issues === 'smells') {
    insights.push({
      title: 'Strange smells can indicate safety issues',
      description:
        'Burning smells might mean electrical problems. Musty smells suggest mold. Both need professional inspection.',
      severity: 'high',
    });
  } else if (answers.issues === 'noises' || answers.issues === 'cycling') {
    insights.push({
      title: 'Unusual behavior means something is wrong',
      description:
        'Strange noises or frequent cycling indicate wear and tear. Catching these early can prevent expensive failures.',
      severity: 'medium',
    });
  }

  // Return top 3 insights by severity
  const sortedInsights = insights.sort((a, b) => {
    const severityOrder = { high: 3, medium: 2, low: 1 };
    return severityOrder[b.severity] - severityOrder[a.severity];
  });

  return sortedInsights.slice(0, 3);
}

/**
 * Generate recommendation based on urgency and answers
 */
function generateRecommendation(
  urgency: UrgencyLevel,
  answers: Record<string, string>
): QuizResults['recommendation'] {
  if (urgency === 'emergency') {
    return {
      title: 'Call Us Now',
      description:
        'Your system needs immediate attention. The longer you wait, the worse it gets. We handle emergencies 24/7.',
      cta: 'Call for Emergency Service',
      ctaStyle: 'emergency',
    };
  }

  if (urgency === 'maintenance') {
    return {
      title: 'Schedule Service Soon',
      description:
        'Your system has issues that should be addressed before they become emergencies. Most appointments available within 48 hours.',
      cta: 'Schedule Service Call',
      ctaStyle: 'standard',
    };
  }

  // Planning
  return {
    title: 'Let\'s Plan Ahead',
    description:
      'Your system seems okay for now. We can help you plan for maintenance or future replacement. No pressure, just good advice.',
    cta: 'Get Free Consultation',
    ctaStyle: 'planning',
  };
}

/**
 * Generate complete quiz results
 */
export function generateQuizResults(answers: Record<string, string>): QuizResults {
  const score = calculateScore(answers);
  const insights = generateInsights(answers);
  const recommendation = generateRecommendation(score.urgency, answers);

  return {
    score,
    insights,
    recommendation,
  };
}
