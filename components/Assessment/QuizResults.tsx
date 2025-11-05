"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  IconAlertCircle,
  IconInfoCircle,
  IconPhone,
} from "@tabler/icons-react";
import type { QuizResults } from "@/lib/quiz-scoring";

interface QuizResultsProps {
  results: QuizResults;
  businessName: string;
  phone: string;
  customerName: string;
}

export const QuizResultsComponent: React.FC<QuizResultsProps> = ({
  results,
  businessName,
  phone,
  customerName,
}) => {
  const { score, insights, recommendation } = results;

  // Determine badge styling based on urgency
  const getBadgeVariant = () => {
    if (score.urgency === 'emergency') return 'destructive';
    if (score.urgency === 'maintenance') return 'default';
    return 'secondary';
  };

  // Get CTA button styling based on recommendation
  const getButtonClass = () => {
    if (recommendation.ctaStyle === 'emergency') {
      return 'bg-destructive hover:bg-destructive/90 text-destructive-foreground text-lg py-6';
    }
    return 'text-lg py-6';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          {customerName ? `${customerName}, here are` : 'Here are'} your results
        </h1>
        <p className="text-xl text-muted-foreground">
          Based on your answers, here's what we found
        </p>
      </div>

      {/* Score Card */}
      <Card className="mb-8 border-2">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <Badge variant={getBadgeVariant()} className="text-lg px-4 py-2">
              {score.urgencyLabel}
            </Badge>
          </div>
          <CardTitle className="text-3xl">Your System Score</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="inline-block relative">
            <div className="text-7xl font-bold text-primary mb-2">
              {score.percentage}
            </div>
            <div className="text-sm text-muted-foreground absolute -right-8 top-4">
              /100
            </div>
          </div>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            {score.percentage >= 60
              ? 'Your system shows signs of problems that need attention.'
              : score.percentage >= 30
              ? 'Your system has some issues but nothing critical right now.'
              : 'Your system seems to be in good shape.'}
          </p>
        </CardContent>
      </Card>

      {/* Insights */}
      {insights.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            3 Things You Should Know
          </h2>
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <Card
                key={index}
                className={`${
                  insight.severity === 'high'
                    ? 'border-destructive/30 bg-destructive/5'
                    : insight.severity === 'medium'
                    ? 'border-yellow-500/30 bg-yellow-500/5'
                    : 'border-green-500/30 bg-green-500/5'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {insight.severity === 'high' ? (
                        <IconAlertCircle className="h-6 w-6 text-destructive" />
                      ) : (
                        <IconInfoCircle className="h-6 w-6 text-foreground/60" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">
                        {insight.title}
                      </h3>
                      <p className="text-foreground/80">{insight.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Recommendation / CTA */}
      <Card className="border-2 bg-primary/5">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">{recommendation.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-lg text-muted-foreground max-w-2xl mx-auto">
            {recommendation.description}
          </p>

          {/* CTA Button */}
          <div className="flex flex-col items-center gap-4">
            <Button
              size="lg"
              className={getButtonClass()}
              asChild
            >
              <a href={`tel:${phone.replace(/\D/g, '')}`}>
                <IconPhone className="mr-2 h-5 w-5" />
                {recommendation.cta}
              </a>
            </Button>

            <div className="text-center">
              <p className="font-semibold text-xl text-foreground">{phone}</p>
              <p className="text-sm text-muted-foreground mt-1">{businessName}</p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              {score.urgency === 'emergency'
                ? 'Available 24/7 for emergencies. Call now.'
                : score.urgency === 'maintenance'
                ? 'Most appointments available within 48 hours.'
                : 'No pressure. We\'re here when you need us.'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Footer Note */}
      <p className="text-center text-sm text-muted-foreground mt-8">
        This assessment is based on your answers. A technician can give you a complete evaluation.
      </p>
    </div>
  );
};
