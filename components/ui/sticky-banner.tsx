"use client";

import { cn } from "@/lib/utils";
import React from "react";

export const StickyBanner = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="fixed inset-x-0 bottom-4 z-[70] flex justify-center px-4">
      <div
        className={cn(
          "flex items-center justify-center rounded-full px-4 py-3 text-center text-sm font-medium shadow-lg sm:whitespace-nowrap sm:px-12 sm:py-5 sm:text-base",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
