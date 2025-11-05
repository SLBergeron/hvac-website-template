import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  phone: string;
  city: string;
  businessType: string;
}

export function FAQ({ phone, city, businessType }: FAQProps) {
  const faqs = [
    {
      question: `How do I know you won't overcharge me?`,
      answer: `We explain the problem. We give you the price before we start. You decide. That's it.`,
    },
    {
      question: "What if it breaks again?",
      answer: `If the same problem comes back within 30 days, we'll come back and make it right. No charge.`,
    },
    {
      question: "Do I really need a tune-up?",
      answer: `Honest answer: Most people skip them and are fine. But a tune-up catches small problems before they become big repairs. Your call.`,
    },
    {
      question: "Can I just text you instead of calling?",
      answer: `Yes. ${phone}. We'll text back fast.`,
    },
    {
      question: `Do you serve ${city}?`,
      answer: `Yes. We serve ${city} and surrounding areas.`,
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Questions We Get
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-medium hover:no-underline hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
