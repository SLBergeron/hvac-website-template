"use client";
import { IconMenu2, IconX, IconSnowflake, IconFlame, IconClock } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { getCompleteHeroContent } from "@/lib/seasonal-hero";
import {
  getBusinessInfo,
  getContactInfo,
  getFormattedPhone,
  getPhoneLink,
  getBusinessType,
  getStateCode,
  getPrimaryColor,
  getPrimaryHoverColor,
  getAccentColdColors,
  getAccentHotColors,
  getColors,
} from "@/lib/template-config";
import { ThemeToggle } from "./ThemeToggle";

export function HeroWithGrid() {
  // Get data from centralized config
  const business = getBusinessInfo();
  const contact = getContactInfo();
  const phone = getFormattedPhone();
  const phoneLink = getPhoneLink();
  const primaryColor = getPrimaryColor();
  const primaryHoverColor = getPrimaryHoverColor();
  const coldColors = getAccentColdColors();
  const hotColors = getAccentHotColors();

  // Get seasonal hero content based on current date and location
  const heroContent = getCompleteHeroContent(
    getBusinessType(),
    getStateCode()
  );

  const isColdSeason = heroContent.version === 'cold';

  // State for button hover
  const [callButtonHovered, setCallButtonHovered] = React.useState(false);
  const [assessmentButtonHovered, setAssessmentButtonHovered] = React.useState(false);

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-neutral-950 dark:to-neutral-900">
      <Navbar />
      <div className="relative flex flex-col items-center justify-center overflow-hidden px-4 pb-8 md:px-8 md:pb-12">
        {/* Seasonal Badge */}
        <div className="relative mt-16 mb-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
            style={{
              backgroundColor: isColdSeason ? coldColors.light : hotColors.light,
              color: isColdSeason ? coldColors.dark : hotColors.dark,
            }}
          >
            {isColdSeason ? (
              <>
                <IconSnowflake className="h-4 w-4" />
                <span>Winter {business.type} Service</span>
              </>
            ) : (
              <>
                <IconFlame className="h-4 w-4" />
                <span>Cooling Season Service</span>
              </>
            )}
          </motion.div>
        </div>

        {/* Main Headline */}
        <div className="relative flex flex-col items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 relative mx-auto max-w-4xl text-center text-4xl font-bold tracking-tight text-zinc-800 md:text-5xl lg:text-6xl dark:text-white"
          >
            {heroContent.headline}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-regular relative mx-auto mb-6 max-w-2xl text-center text-lg tracking-wide text-zinc-600 antialiased md:text-xl dark:text-zinc-300"
          >
            {heroContent.subheadline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base text-zinc-500 mb-8 text-center dark:text-zinc-400"
          >
            Serving {contact.address.city} and surrounding areas
          </motion.p>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="group relative z-10 mb-8 flex flex-col sm:flex-row gap-4"
        >
          <a
            href={phoneLink}
            className="rounded-lg px-8 py-3 font-semibold text-white shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.4)_inset] transition-all hover:shadow-lg hover:scale-105 text-center"
            style={{
              backgroundColor: callButtonHovered ? primaryHoverColor : primaryColor,
            }}
            onMouseEnter={() => setCallButtonHovered(true)}
            onMouseLeave={() => setCallButtonHovered(false)}
          >
            Call {phone}
          </a>
          <Link
            href="/assessment"
            className="rounded-lg border-2 px-8 py-3 font-semibold transition-all hover:shadow-lg text-center"
            style={{
              borderColor: primaryColor,
              color: primaryColor,
              backgroundColor: assessmentButtonHovered ? `${primaryColor}10` : 'transparent',
            }}
            onMouseEnter={() => setAssessmentButtonHovered(true)}
            onMouseLeave={() => setAssessmentButtonHovered(false)}
          >
            Free System Assessment
          </Link>
        </motion.div>

        <TrustBadges />
      </div>
      <ImagesGrid />
    </div>
  );
}

export const ImagesGrid = () => {
  // Real HVAC service photos from Pexels
  const images = [
    {
      src: "/images/hvac/technician-32497161.jpg",
      alt: "Professional HVAC technician inspecting outdoor unit",
      className: "translate-y-10",
    },
    {
      src: "/images/hvac/ac-unit-6794925.jpg",
      alt: "Modern air conditioning unit installation",
      className: "translate-y-20",
    },
    {
      src: "/images/hvac/comfortable-home-279607.jpg",
      alt: "Comfortable home interior with proper climate control",
      className: "translate-y-4",
    },
    {
      src: "/images/hvac/technician-7347538.jpg",
      alt: "Expert HVAC technician performing maintenance",
      className: "translate-y-10",
    },
    {
      src: "/images/hvac/ac-unit-8146159.jpg",
      alt: "Quality HVAC system repair service",
      className: "translate-y-20",
    },
  ];
  return (
    <div className="relative mt-10 h-[20rem] w-full overflow-hidden border-b border-neutral-200 md:h-[30rem] dark:border-neutral-800">
      <div className="absolute inset-0 flex h-full w-full flex-shrink-0 justify-center gap-5">
        {images.map((image, idx) => (
          <div
            className={cn(
              "relative mt-0 rounded-lg border border-neutral-200 bg-gray-100 p-2 dark:border-neutral-900 dark:bg-neutral-800",
              image.className,
            )}
            key={image.src + idx}
          >
            <img
              src={image.src}
              alt={image.alt}
              width="500"
              height="500"
              className="h-full min-w-[15rem] flex-shrink-0 rounded-lg object-cover object-top"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export function TrustBadges() {
  const colors = getColors();
  const primaryColor = colors.primary.main;
  const successColor = colors.success;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="relative flex flex-wrap items-center justify-center gap-4 md:gap-6"
    >
      <div className="flex items-center gap-2 text-sm md:text-base text-neutral-700 dark:text-neutral-300">
        <span style={{ color: successColor }}>✓</span>
        <span className="font-medium">Licensed & Insured</span>
      </div>
      <div className="flex items-center gap-2 text-sm md:text-base text-neutral-700 dark:text-neutral-300">
        <span style={{ color: successColor }}>✓</span>
        <span className="font-medium">Same-Day Service</span>
      </div>
      <div className="flex items-center gap-2 text-sm md:text-base text-neutral-700 dark:text-neutral-300">
        <IconClock className="h-4 w-4" style={{ color: primaryColor }} />
        <span className="font-medium">24/7 Emergency Available</span>
      </div>
    </motion.div>
  );
}

const Navbar = () => {
  const phone = getFormattedPhone();
  const phoneLink = getPhoneLink();
  const primaryColor = getPrimaryColor();
  const primaryHoverColor = getPrimaryHoverColor();
  const [isHovered, setIsHovered] = React.useState(false);

  const navItems = [
    { name: "Free Assessment", link: "/assessment" },
    { name: "Services", link: "#services" },
    { name: "About", link: "#about" },
    { name: "Contact", link: "#contact" },
  ];

  return (
    <div className="relative z-[60] mx-auto flex w-full max-w-7xl flex-row items-center justify-between px-8 py-8">
      <Logo />
      <div className="hidden flex-1 flex-row items-center justify-center space-x-8 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-14 dark:text-zinc-400">
        <DesktopNav navItems={navItems} />
      </div>

      {/* Desktop: theme + phone */}
      <div className="hidden lg:flex items-center gap-3">
        <ThemeToggle />
        <a
          href={phoneLink}
          className="rounded-lg px-6 py-2 font-medium text-white shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.4)_inset] transition-colors"
          style={{
            backgroundColor: isHovered ? primaryHoverColor : primaryColor,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {phone}
        </a>
      </div>

      {/* Mobile/Tablet: theme + hamburger */}
      <div className="flex items-center gap-3 lg:hidden">
        <ThemeToggle />
        <MobileNav navItems={navItems} />
      </div>
    </div>
  );
};

const DesktopNav = ({ navItems }: any) => {
  return (
    <>
      {navItems.map((navItem: any, idx: number) => (
        <Link
          className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-300"
          key={`link=${idx}`}
          href={navItem.link}
        >
          <span>{navItem.name}</span>
        </Link>
      ))}
    </>
  );
};

const MobileNav = ({ navItems }: any) => {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const phone = getFormattedPhone();
  const phoneLink = getPhoneLink();
  const primaryColor = getPrimaryColor();
  const primaryHoverColor = getPrimaryHoverColor();

  return (
    <>
      <IconMenu2 onClick={() => setOpen(!open)} className="cursor-pointer" />
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 flex flex-col items-center justify-center space-y-10 bg-white dark:bg-neutral-950 text-xl font-bold text-zinc-600 transition duration-200 hover:text-zinc-800">
            <div className="absolute top-8 right-8 flex items-center gap-2">
              <ThemeToggle />
              <IconX
                className="h-5 w-5 cursor-pointer"
                onClick={() => setOpen(!open)}
              />
            </div>
            {navItems.map((navItem: any, idx: number) => (
              <Link
                key={`link=${idx}`}
                href={navItem.link}
                className="relative text-neutral-600 dark:text-neutral-300"
                onClick={() => setOpen(false)}
              >
                <motion.span className="block">{navItem.name}</motion.span>
              </Link>
            ))}
            <a
              href={phoneLink}
              className="rounded-lg px-8 py-2 font-medium text-white shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.4)_inset] transition-colors"
              style={{
                backgroundColor: isHovered ? primaryHoverColor : primaryColor,
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Call {phone}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Logo = () => {
  const business = getBusinessInfo();

  return (
    <Link
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      <span className="font-bold text-lg text-black dark:text-white">{business.name}</span>
    </Link>
  );
};
