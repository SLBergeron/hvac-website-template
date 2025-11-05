"use client";
import React from "react";
import Link from "next/link";
import { IconPhone, IconMail, IconMapPin, IconClock } from "@tabler/icons-react";
import {
  getBusinessInfo,
  getContactInfo,
  getHours,
  getFormattedPhone,
  getPhoneLink,
  getEmailLink,
  getPrimaryColor,
  getPrimaryHoverColor,
} from "@/lib/template-config";

export const Footer = () => {
  const business = getBusinessInfo();
  const contact = getContactInfo();
  const hours = getHours();
  const phone = getFormattedPhone();
  const phoneLink = getPhoneLink();
  const emailLink = getEmailLink();
  const primaryColor = getPrimaryColor();
  const primaryHoverColor = getPrimaryHoverColor();

  return (
    <footer className="border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <style jsx>{`
        .footer-link:hover {
          color: ${primaryHoverColor};
        }
        .footer-icon {
          color: ${primaryColor};
        }
      `}</style>
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-zinc-900 dark:text-white">
              {business.name}
            </h3>
            <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
              {business.description}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              License #: {business.licenseNumber}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-white">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/assessment"
                  className="footer-link text-sm text-zinc-600 dark:text-zinc-400"
                >
                  Free Assessment
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="footer-link text-sm text-zinc-600 dark:text-zinc-400"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="footer-link text-sm text-zinc-600 dark:text-zinc-400"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="footer-link text-sm text-zinc-600 dark:text-zinc-400"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-white">
              Our Services
            </h4>
            <ul className="space-y-2">
              <li className="text-sm text-zinc-600 dark:text-zinc-400">AC Repair & Installation</li>
              <li className="text-sm text-zinc-600 dark:text-zinc-400">Heating Repair & Service</li>
              <li className="text-sm text-zinc-600 dark:text-zinc-400">System Maintenance</li>
              <li className="text-sm text-zinc-600 dark:text-zinc-400">Emergency Repairs</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-white">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <IconPhone className="footer-icon h-4 w-4" />
                <a
                  href={phoneLink}
                  className="footer-link text-sm text-zinc-600 dark:text-zinc-400"
                >
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <IconMail className="footer-icon h-4 w-4" />
                <a
                  href={emailLink}
                  className="footer-link text-sm text-zinc-600 dark:text-zinc-400"
                >
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <IconMapPin className="footer-icon h-4 w-4" />
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  {contact.address.full}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <IconClock className="footer-icon h-4 w-4 mt-0.5" />
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  {hours.formatted.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-neutral-200 pt-8 dark:border-neutral-800">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              © {new Date().getFullYear()} {business.name}. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
