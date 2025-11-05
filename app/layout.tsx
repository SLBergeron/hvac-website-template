import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/Footer";
import { StickyBanner } from "@/components/ui/sticky-banner";
import {
  getBusinessInfo,
  getContactInfo,
  getFormattedPhone,
  getSEO,
} from "@/lib/template-config";
import { Analytics } from "@vercel/analytics/next";

// Get business data for metadata
const business = getBusinessInfo();
const contact = getContactInfo();
const phone = getFormattedPhone();
const seo = getSEO();

// Build keywords from template + location
const keywords = [
  ...seo.keywords, // Keywords from template
  contact.address.city, // City name
  contact.address.state, // State name
  `${business.type} ${contact.address.city}`, // "HVAC Phoenix"
  `${business.type} ${contact.address.stateCode}`, // "HVAC AZ"
];

export const metadata: Metadata = {
  title: `${business.name} - AC & Heating Repair in ${contact.address.city}, ${contact.address.stateCode}`,
  description: `Need your AC or heater fixed? We help ${contact.address.city} homes stay comfortable. Fast service. Fair prices. Call ${phone} today.`,
  keywords,
  openGraph: {
    title: `${business.name} - ${business.tagline}`,
    description: `Need your AC or heater fixed? We help ${contact.address.city} homes stay comfortable. Fast service. Fair prices.`,
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured data for Google (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "name": business.name,
    "description": business.description,
    "telephone": contact.phone,
    "email": contact.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": contact.address.city,
      "addressRegion": contact.address.stateCode,
      "addressCountry": "US",
    },
    "areaServed": {
      "@type": "City",
      "name": contact.address.city,
    },
    "priceRange": "$$",
    "openingHours": "Mo-Fr 07:00-19:00, Sa 08:00-17:00, Su 09:00-15:00",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const storedTheme = localStorage.getItem('theme');
                const theme = storedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.classList.add(theme);
                localStorage.setItem('theme', theme);
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={cn("antialiased h-full w-full")}>
        {/* Template Preview Banner - appears on all pages */}
        <StickyBanner className="bg-gradient-to-r from-emerald-500 to-emerald-600">
          <p className="text-white drop-shadow-md">
            <span className="font-semibold">Template Preview:</span> This is what your business website could look like.{" "}
            <a
              href="https://getmywebsite.io"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline transition duration-200 hover:text-emerald-100"
            >
              Get yours for $249 →
            </a>
          </p>
        </StickyBanner>
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
