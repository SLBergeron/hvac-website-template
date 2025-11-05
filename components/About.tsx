import React from "react";

interface AboutProps {
  content: string; // Generated from generateAboutContent()
  hours: string;
}

export const About: React.FC<AboutProps> = ({ content, hours }) => {
  return (
    <div
      id="about"
      className="max-w-3xl mx-auto px-4 py-16 md:py-20"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-6">About Us</h2>

        <div className="text-lg text-foreground/80 leading-relaxed whitespace-pre-line mb-6">
          {content}
        </div>

        <div className="mt-8 p-6 bg-muted/30 rounded-lg border">
          <p className="text-sm font-medium text-muted-foreground mb-1">Hours</p>
          <p className="text-lg font-semibold text-foreground">{hours}</p>
        </div>
      </div>
    </div>
  );
};
