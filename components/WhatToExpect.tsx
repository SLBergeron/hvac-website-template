import React from "react";
import { Separator } from "@/components/ui/separator";
import { IconPhone, IconCalendar, IconTool, IconCurrencyDollar, IconCircleCheck } from "@tabler/icons-react";

interface WhatToExpectProps {
  businessType: string;
}

export function WhatToExpect({ businessType }: WhatToExpectProps) {
  const steps = [
    {
      number: 1,
      icon: <IconPhone className="h-6 w-6" />,
      title: "You call or text us",
      description: "We answer. We ask what's happening. We give you a rough idea of timeline.",
    },
    {
      number: 2,
      icon: <IconCalendar className="h-6 w-6" />,
      title: "We schedule you (often same-day for emergencies)",
      description: "We'll text you when we're 30 minutes away. No waiting around all day.",
    },
    {
      number: 3,
      icon: <IconTool className="h-6 w-6" />,
      title: "We diagnose the problem",
      description: "Usually takes 15-30 minutes. We explain what's wrong.",
    },
    {
      number: 4,
      icon: <IconCurrencyDollar className="h-6 w-6" />,
      title: "You get the price, you decide",
      description: "If you say yes, we fix it. If you say no, no hard feelings.",
    },
    {
      number: 5,
      icon: <IconCircleCheck className="h-6 w-6" />,
      title: "We fix it right",
      description: "Most repairs done same visit. If not, we explain why.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Never Called a {businessType} Company Before?
          </h2>
          <p className="text-lg text-muted-foreground">
            Here's what happens:
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={step.number}>
              <div className="flex gap-6 items-start">
                {/* Step Number Circle */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    {step.number}
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-primary">{step.icon}</div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Separator between steps (except last) */}
              {index < steps.length - 1 && (
                <div className="ml-6 my-6">
                  <Separator className="bg-border/50" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center">
          <p className="text-sm font-medium text-muted-foreground">
            Average time from call to fixed: <span className="text-foreground font-semibold">4-6 hours for emergencies</span>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Simple. Clear. No games.
          </p>
        </div>
      </div>
    </section>
  );
}
