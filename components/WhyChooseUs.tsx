"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Marquee from "react-fast-marquee";

interface WhyChooseUsProps {
  licenseNumber?: string;
}

export function WhyChooseUs({ licenseNumber }: WhyChooseUsProps) {

  const firstRow = [
    "My AC died at 2 AM and you answered",
    "You showed up exactly when you said you would",
    "You didn't try to sell me a new system when I just needed a repair",
    "I knew what I was paying before you started",
    "You explained everything so I could understand it",
    "Fixed it right the first time",
  ];

  const secondRow = [
    "You gave me options, not pressure",
    "Your technician was respectful of my home",
    "You called back within 15 minutes",
    "No hidden fees or surprise charges",
    "You worked around my schedule",
    "Honest about what I actually needed",
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why People Call Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real reasons customers choose us over the competition
          </p>
        </div>

        {/* Marquee Grid */}
        <div className="relative mb-12">
          <div className="relative overflow-hidden">
            <div className="relative [mask-image:linear-gradient(to_right,transparent_0%,white_10%,white_90%,transparent_100%)]">
              <Marquee direction="right" pauseOnHover speed={40}>
                {firstRow.map((reason, index) => (
                  <Card key={`reason-first-${index}`}>
                    <Quote>{reason}</Quote>
                  </Card>
                ))}
              </Marquee>
              <Marquee className="mt-6" direction="left" pauseOnHover speed={50}>
                {secondRow.map((reason, index) => (
                  <Card key={`reason-second-${index}`}>
                    <Quote>{reason}</Quote>
                  </Card>
                ))}
              </Marquee>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-3">
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            Licensed & Insured
          </Badge>
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            Background-checked technicians
          </Badge>
          {licenseNumber && (
            <Badge variant="outline" className="px-4 py-2 text-sm">
              License #{licenseNumber}
            </Badge>
          )}
        </div>
      </div>
    </section>
  );
}

const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-4 min-h-[100px] max-w-sm rounded-xl bg-gray-50 p-6 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] dark:bg-neutral-900",
        className,
      )}
    >
      {children}
    </div>
  );
};

const Quote = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-base font-medium text-black dark:text-white",
        className,
      )}
    >
      {children}
    </p>
  );
};
