import React from "react";
import { cn } from "../../utils/cn";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  children,
  variant = "default",
}: {
  className?: string;
  children: React.ReactNode;
  variant?: "default" | "wide" | "tall";
}) => {
  return (
    <div
      className={cn(
        "group relative rounded-xl transition-all duration-500 cursor-pointer overflow-hidden backdrop-blur-sm border border-[#1E2330]/50 hover:shadow-xl hover:shadow-gold/5",
        variant === "tall" && "hover:border-gold/30 md:row-span-2",
        variant === "wide" && "md:col-span-2",
        className
      )}
    >
      {children}
    </div>
  );
};