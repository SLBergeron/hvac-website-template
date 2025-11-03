import clsx from "clsx";
import React from "react";

export const Container = (props: any) => {
  const { children, className } = props;

  return (
    <main className={clsx("bg-white min-h-screen antialiased px-6", className)}>
      {children}
    </main>
  );
};
