"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  IconCheck,
  IconShieldCheck,
  IconClock,
  IconChartBar,
} from "@tabler/icons-react";

interface AssessmentHeroProps {
  businessName: string;
  onStart: () => void;
}

export const AssessmentHero: React.FC<AssessmentHeroProps> = ({
  businessName,
  onStart,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
      {/* Header */}
      <div className="text-center mb-12">
        {/* Hook Headline - Frustration-based */}
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          Is Your HVAC System Costing You Money?
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-4">
          Take our free 3-minute assessment
        </p>

        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <IconClock className="h-4 w-4" />
            <span>10 simple questions</span>
          </div>
          <div className="flex items-center gap-2">
            <IconChartBar className="h-4 w-4" />
            <span>Instant results</span>
          </div>
        </div>
      </div>

      {/* Value Proposition Card */}
      <Card className="mb-8 border-2">
        <CardContent className="p-8">
          <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
            We'll measure 3 key areas:
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <IconCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                System Health
              </h3>
              <p className="text-sm text-muted-foreground">
                How well your system is working
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <IconChartBar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                Efficiency
              </h3>
              <p className="text-sm text-muted-foreground">
                If you're wasting money on energy
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <IconShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                Risk Level
              </h3>
              <p className="text-sm text-muted-foreground">
                Chance of costly breakdown
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Button
              onClick={onStart}
              size="lg"
              className="w-full md:w-auto text-lg h-12 px-12"
            >
              Start Free Assessment
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-4">
            No credit card required. Results in 3 minutes.
          </p>
        </CardContent>
      </Card>

      {/* Trust Signals */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <IconShieldCheck className="h-5 w-5 text-primary" />
          <span>Licensed & Insured</span>
        </div>
        <div className="flex items-center gap-2">
          <IconCheck className="h-5 w-5 text-primary" />
          <span>Serving Your Community</span>
        </div>
        <div className="flex items-center gap-2">
          <IconCheck className="h-5 w-5 text-primary" />
          <span>Free, No Obligation</span>
        </div>
      </div>

      {/* What You'll Get */}
      <div className="mt-12 p-6 bg-muted/30 rounded-lg">
        <h3 className="font-semibold text-foreground mb-4 text-center">
          After you finish, you'll get:
        </h3>
        <ul className="space-y-3 max-w-2xl mx-auto">
          <li className="flex items-start gap-3">
            <IconCheck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-muted-foreground">
              Your personalized system score
            </span>
          </li>
          <li className="flex items-start gap-3">
            <IconCheck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-muted-foreground">
              3 specific insights about your HVAC system
            </span>
          </li>
          <li className="flex items-start gap-3">
            <IconCheck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-muted-foreground">
              Clear next steps (no pressure, just advice)
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
