"use client";

import React from "react";
import { getCompleteHeroContent } from "@/lib/seasonal-hero";
import {
  getContactInfo,
  getFormattedPhone,
  getPhoneLink,
  getBusinessType,
  getStateCode,
  getPrimaryColor,
  getPrimaryHoverColor,
} from "@/lib/template-config";

const Hero = () => {
  // Get data from centralized config
  const contact = getContactInfo();
  const phone = getFormattedPhone();
  const phoneLink = getPhoneLink();
  const primaryColor = getPrimaryColor();
  const primaryHoverColor = getPrimaryHoverColor();

  // Get seasonal hero content based on current date and location
  const heroContent = getCompleteHeroContent(
    getBusinessType(),
    getStateCode()
  );

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div className="relative pb-20 pt-10 flex flex-col items-center justify-center px-4 md:px-8 overflow-hidden">
      <div className="relative flex flex-col items-center justify-center max-w-4xl mx-auto">
        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 relative text-center text-zinc-800 leading-tight dark:text-white">
          {heroContent.headline}
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl font-normal text-zinc-600 mb-8 text-center max-w-2xl dark:text-zinc-300">
          {heroContent.subheadline}
        </p>

        {/* Business name and location */}
        <p className="text-base text-zinc-500 mb-10 text-center dark:text-zinc-400">
          Serving {contact.address.city} and surrounding areas
        </p>

        {/* Call to Action Button */}
        <a
          href={phoneLink}
          className="inline-block px-8 py-4 text-white text-lg font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl mb-4"
          style={{
            backgroundColor: isHovered ? primaryHoverColor : primaryColor,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Call {phone}
        </a>

        {/* Secondary CTA */}
        <a
          href="#contact"
          className="text-zinc-600 hover:text-zinc-800 text-base font-medium underline"
        >
          Or send us a message
        </a>
      </div>
    </div>
  );
};

export default Hero;
