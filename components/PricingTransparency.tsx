import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PricingTransparencyProps {
  businessType: string;
}

export function PricingTransparency({ businessType }: PricingTransparencyProps) {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="border-2">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl mb-4">
              What Will This Cost?
            </CardTitle>
            <CardDescription className="text-base md:text-lg text-foreground/80">
              We get it. {businessType} repairs can be expensive.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Here's how we work:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">•</span>
                  <span>We explain what's wrong (in plain English)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">•</span>
                  <span>We give you the price before we start</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">•</span>
                  <span>You decide if you want to proceed</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="font-semibold text-center text-lg mb-2">
                No hidden fees. No surprises.
              </p>
              <p className="text-center text-muted-foreground">
                Common repairs: $150-$500 | Bigger jobs: Call for quote
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
