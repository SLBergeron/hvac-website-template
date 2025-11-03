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
        <h2 className="text-3xl font-bold text-zinc-900 mb-6">About Us</h2>

        <div className="text-lg text-zinc-700 leading-relaxed whitespace-pre-line mb-6">
          {content}
        </div>

        <div className="mt-8 p-6 bg-zinc-50 rounded-lg border border-zinc-200">
          <p className="text-sm font-medium text-zinc-600 mb-1">Hours</p>
          <p className="text-lg font-semibold text-zinc-900">{hours}</p>
        </div>
      </div>
    </div>
  );
};
