"use client";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import {
  getBusinessInfo,
  getFormattedPhone,
  getPhoneLink,
  getPrimaryColor,
  getPrimaryHoverColor,
} from "@/lib/template-config";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "Free Assessment", link: "/assessment" },
  { name: "Services", link: "/#services" },
  { name: "About", link: "/#about" },
  { name: "Contact", link: "/#contact" },
];

export const Navbar = () => {
  const phone = getFormattedPhone();
  const phoneLink = getPhoneLink();
  const primaryColor = getPrimaryColor();
  const primaryHoverColor = getPrimaryHoverColor();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative z-[60] mx-auto flex w-full max-w-7xl flex-row items-center justify-between px-8 py-8 bg-background">
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
      <span className="font-bold text-lg text-black dark:text-white">
        {business.name}
      </span>
    </Link>
  );
};

export default Navbar;
