"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import type { QuizQuestion } from "@/lib/quiz-questions";

interface QuizQuestionProps {
  question: QuizQuestion;
  answer: string;
  emailAnswer?: string;
  phoneAnswer?: string;
  onAnswerChange: (value: string) => void;
  onEmailChange?: (value: string) => void;
  onPhoneChange?: (value: string) => void;
}

export const QuizQuestionComponent: React.FC<QuizQuestionProps> = ({
  question,
  answer,
  emailAnswer = "",
  phoneAnswer = "",
  onAnswerChange,
  onEmailChange,
  onPhoneChange,
}) => {
  // Special handling for contact question (email + phone)
  if (question.id === 'contact') {
    return (
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl">{question.question}</CardTitle>
          {question.description && (
            <CardDescription className="text-base">{question.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-base mb-2 block">
              Email
            </Label>
            <input
              type="email"
              id="email"
              value={emailAnswer}
              onChange={(e) => onEmailChange?.(e.target.value)}
              placeholder="john@example.com"
              required={question.required}
              className="w-full px-4 py-3 border bg-background rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-foreground"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-base mb-2 block">
              Phone
            </Label>
            <input
              type="tel"
              id="phone"
              value={phoneAnswer}
              onChange={(e) => onPhoneChange?.(e.target.value)}
              placeholder="(555) 123-4567"
              required={question.required}
              className="w-full px-4 py-3 border bg-background rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-foreground"
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Text input
  if (question.type === 'text' || question.type === 'email' || question.type === 'phone') {
    return (
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl">{question.question}</CardTitle>
          {question.description && (
            <CardDescription className="text-base">{question.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <input
            type={question.type}
            value={answer}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder={question.placeholder}
            required={question.required}
            className="w-full px-4 py-3 border bg-background rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-foreground text-lg"
          />
        </CardContent>
      </Card>
    );
  }

  // Textarea
  if (question.type === 'textarea') {
    return (
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl">{question.question}</CardTitle>
          {question.description && (
            <CardDescription className="text-base">{question.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <textarea
            value={answer}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder={question.placeholder}
            required={question.required}
            rows={4}
            className="w-full px-4 py-3 border bg-background rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-foreground resize-none"
          />
        </CardContent>
      </Card>
    );
  }

  // Radio buttons
  if (question.type === 'radio' && question.options) {
    return (
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl">{question.question}</CardTitle>
          {question.description && (
            <CardDescription className="text-base">{question.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <RadioGroup value={answer} onValueChange={onAnswerChange} className="space-y-3">
            {question.options.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-3 p-4 rounded-lg border bg-card hover:bg-accent transition-colors cursor-pointer"
                onClick={() => onAnswerChange(option.value)}
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <Label
                  htmlFor={option.value}
                  className="flex-1 text-base cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    );
  }

  return null;
};
