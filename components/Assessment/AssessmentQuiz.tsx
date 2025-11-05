"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { AssessmentHero } from "./AssessmentHero";
import { QuizQuestionComponent } from "./QuizQuestion";
import { QuizResultsComponent } from "./QuizResults";
import {
  HVAC_QUIZ_QUESTIONS,
  getTotalQuestions,
  validateAnswer,
} from "@/lib/quiz-questions";
import { generateQuizResults } from "@/lib/quiz-scoring";

interface AssessmentQuizProps {
  businessName: string;
  phone: string;
  webhookUrl?: string; // Tier 2 customers only
}

type QuizStatus = "landing" | "quiz" | "submitting" | "results";

export const AssessmentQuiz: React.FC<AssessmentQuizProps> = ({
  businessName,
  phone,
  webhookUrl,
}) => {
  const [status, setStatus] = useState<QuizStatus>("landing");
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState<string>("");

  const totalQuestions = getTotalQuestions();
  const currentQuestion = HVAC_QUIZ_QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / totalQuestions) * 100;

  // Start quiz from landing page
  const handleStart = () => {
    setStatus("quiz");
    setCurrentStep(0);
  };

  // Handle answer change
  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
    setError("");
  };

  // Handle email/phone for contact question
  const handleEmailChange = (value: string) => {
    setEmail(value);
    setError("");
  };

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
    setError("");
  };

  // Validate current answer
  const isCurrentAnswerValid = (): boolean => {
    if (currentQuestion.id === 'contact') {
      // Special validation for contact question
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const phoneValid = /^\d{10,}$/.test(phoneNumber.replace(/\D/g, ''));
      return emailValid && phoneValid;
    }

    const answer = answers[currentQuestion.id] || "";
    return validateAnswer(currentQuestion, answer);
  };

  // Go to next question
  const handleNext = () => {
    if (!isCurrentAnswerValid()) {
      setError(
        currentQuestion.required
          ? "Please answer this question to continue"
          : "Please provide a valid answer"
      );
      return;
    }

    // Save contact info to answers if on contact question
    if (currentQuestion.id === 'contact') {
      setAnswers({
        ...answers,
        email,
        phone: phoneNumber,
      });
    }

    // If last question, submit
    if (currentStep === totalQuestions - 1) {
      handleSubmit();
    } else {
      setCurrentStep(currentStep + 1);
      setError("");
    }
  };

  // Go to previous question
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setError("");
    }
  };

  // Submit quiz
  const handleSubmit = async () => {
    setStatus("submitting");

    try {
      // Prepare payload
      const payload = {
        type: "quiz_submission",
        businessName,
        answers: {
          ...answers,
          email: currentQuestion.id === 'contact' ? email : answers.email,
          phone: currentQuestion.id === 'contact' ? phoneNumber : answers.phone,
        },
        submittedAt: new Date().toISOString(),
      };

      // Send to webhook if Tier 2
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      // Show results
      setStatus("results");
    } catch (err) {
      console.error("Quiz submission error:", err);
      // Show results anyway - the quiz is valuable even if webhook fails
      setStatus("results");
    }
  };

  // Landing page
  if (status === "landing") {
    return <AssessmentHero businessName={businessName} onStart={handleStart} />;
  }

  // Results page
  if (status === "results") {
    const results = generateQuizResults({
      ...answers,
      email: email || answers.email,
      phone: phoneNumber || answers.phone,
    });

    return (
      <QuizResultsComponent
        results={results}
        businessName={businessName}
        phone={phone}
        customerName={answers.name || ""}
      />
    );
  }

  // Quiz in progress
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary">
            Question {currentStep + 1} of {totalQuestions}
          </Badge>
          <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question */}
      <div className="mb-8">
        <QuizQuestionComponent
          question={currentQuestion}
          answer={answers[currentQuestion.id] || ""}
          emailAnswer={email}
          phoneAnswer={phoneNumber}
          onAnswerChange={handleAnswerChange}
          onEmailChange={handleEmailChange}
          onPhoneChange={handlePhoneChange}
        />

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-destructive/10 border border-destructive/50 rounded-lg">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={handleBack}
          disabled={currentStep === 0 || status === "submitting"}
        >
          <IconArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>

        <Button
          size="lg"
          onClick={handleNext}
          disabled={status === "submitting"}
        >
          {status === "submitting"
            ? "Calculating..."
            : currentStep === totalQuestions - 1
            ? "See Results"
            : "Next"}
          {currentStep < totalQuestions - 1 && (
            <IconArrowRight className="ml-2 h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Progress Indicator */}
      <p className="text-center text-sm text-muted-foreground mt-6">
        {totalQuestions - currentStep - 1 === 0
          ? "Last question!"
          : `${totalQuestions - currentStep - 1} more ${
              totalQuestions - currentStep - 1 === 1 ? "question" : "questions"
            }`}
      </p>
    </div>
  );
};
