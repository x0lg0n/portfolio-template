"use client";

import { motion, useScroll, type MotionProps } from "motion/react";

import { cn } from "@/lib/utils";

interface ScrollProgressProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  keyof MotionProps
> {
  ref?: React.Ref<HTMLDivElement>;
}

export function ScrollProgress({
  className,
  ref,
  ...props
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-linear-to-r from-primary via-primary/80 to-primary/40 shadow-[0_1px_12px] shadow-primary/40",
        className
      )}
      style={{
        scaleX: scrollYProgress,
      }}
      {...props}
    />
  );
}
