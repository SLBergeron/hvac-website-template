import { HeroWithGrid } from "@/components/HeroWithGrid";
import { PricingTransparency } from "@/components/PricingTransparency";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { WhatToExpect } from "@/components/WhatToExpect";
import { Services } from "@/components/Services";
import { FAQ } from "@/components/FAQ";
import { About } from "@/components/About";
import { ContactForm } from "@/components/ContactForm";
import { generateAboutContent } from "@/lib/variables";
import {
  getBusinessInfo,
  getContactInfo,
  getFormattedPhone,
  getHours,
  getBusinessType,
} from "@/lib/template-config";
import type { NextPage } from "next";

export default function Home() {
  // Get business data from centralized config
  const business = getBusinessInfo();
  const contact = getContactInfo();
  const phone = getFormattedPhone();
  const hours = getHours();
  const businessType = getBusinessType();

  // Generate about content using the template
  const aboutContent = generateAboutContent({
    businessName: business.name,
    phone: phone,
    city: contact.address.city,
    state: contact.address.stateCode,
    businessType: businessType,
    hours: hours.formatted,
    services: [], // Services come from service-descriptions.ts
    domain: "", // Not needed for about content
  });

  return (
    <div className="w-full">
      {/* Hero with integrated navbar */}
      <HeroWithGrid />

      {/* Psychology-driven section order */}
      <PricingTransparency businessType={businessType} />
      <WhyChooseUs licenseNumber={business.licenseNumber} />
      <WhatToExpect businessType={businessType} />

      <div className="max-w-7xl mx-auto px-4">
        <Services />
      </div>

      <FAQ
        phone={phone}
        city={contact.address.city}
        businessType={businessType}
      />

      <div className="max-w-7xl mx-auto px-4">
        <About content={aboutContent} hours={hours.formatted} />
        <ContactForm
          phone={phone}
          businessName={business.name}
        />
      </div>
    </div>
  );
}
