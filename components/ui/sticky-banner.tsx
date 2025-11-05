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
          "flex items-center justify-center whitespace-nowrap rounded-full px-12 py-5 text-center text-base font-medium shadow-lg",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
