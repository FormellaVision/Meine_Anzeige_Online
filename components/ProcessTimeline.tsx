"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useScroll, useTransform, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Handshake,
  FileText,
  Coffee,
  ClipboardCheck,
  Star,
  PartyPopper,
  type LucideProps,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type TimelineIconName =
  | "Handshake"
  | "FileText"
  | "Coffee"
  | "ClipboardCheck"
  | "Star"
  | "PartyPopper";

export interface TimelineStep {
  id: string;
  step: number;
  iconName: TimelineIconName;
  label: string;
  title: string;
  description: string;
  detail?: string;
}

const iconMap: Record<TimelineIconName, React.FC<LucideProps>> = {
  Handshake,
  FileText,
  Coffee,
  ClipboardCheck,
  Star,
  PartyPopper,
};

interface ProcessTimelineProps {
  steps: TimelineStep[];
}

function TimelineCard({
  step,
  index,
  isActive,
  onEnter,
  onLeave,
  mousePosition,
  scrollProgress,
  totalSteps,
}: {
  step: TimelineStep;
  index: number;
  isActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
  mousePosition: { x: number; y: number };
  scrollProgress: number;
  totalSteps: number;
}) {
  const isEven = index % 2 === 1;
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const controls = useAnimation();

  const stepFraction = (index + 0.5) / totalSteps;
  const isFilled = scrollProgress >= stepFraction;
  const dotProgress = Math.max(0, Math.min(1, (scrollProgress - (index / totalSteps)) / (1 / totalSteps)));

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  const Icon = iconMap[step.iconName];

  return (
    <motion.li
      ref={ref}
      className={cn(
        "relative flex flex-col items-center gap-6",
        "lg:flex-row lg:gap-0",
        isEven ? "lg:flex-row-reverse" : ""
      )}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, x: isEven ? 40 : -40, y: 16 },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut", delay: index * 0.08 },
        },
      }}
    >
      <div
        className={cn(
          "w-full lg:w-5/12",
          isEven ? "lg:pl-16" : "lg:pr-16 lg:text-right"
        )}
      >
        <motion.div
          className={cn(
            "relative inline-block w-full rounded-2xl border bg-white p-6 shadow-sm transition-shadow duration-300",
            isActive
              ? "border-brand-blue/20 shadow-md shadow-brand-blue/8"
              : "border-brand-blue/10",
            isEven ? "" : "lg:ml-auto"
          )}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          style={{
            transformStyle: "preserve-3d",
            transform: isActive
              ? `perspective(900px) rotateY(${mousePosition.x * (isEven ? 3 : -3)}deg) rotateX(${mousePosition.y * -2}deg) translateY(-4px)`
              : "perspective(900px) rotateY(0deg) rotateX(0deg) translateY(0px)",
            transition: "transform 0.35s ease, box-shadow 0.3s ease",
          }}
        >
          <div
            className={cn(
              "mb-4 flex items-center gap-3",
              isEven ? "" : "lg:flex-row-reverse"
            )}
          >
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-sm transition-all duration-500"
              style={{
                background: isFilled
                  ? "rgb(37, 99, 235)"
                  : `linear-gradient(135deg, rgb(37,99,235) ${dotProgress * 100}%, rgb(203,213,225) ${dotProgress * 100}%)`,
              }}
            >
              <Icon size={19} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">
              {step.label}
            </span>
          </div>

          <h3
            className={cn(
              "mb-2 text-lg font-bold leading-snug text-stone-900",
              isEven ? "" : "lg:text-right"
            )}
          >
            {step.title}
          </h3>
          <p
            className={cn(
              "text-sm leading-relaxed text-stone-500",
              isEven ? "" : "lg:text-right"
            )}
          >
            {step.description}
          </p>

          {step.detail && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: isActive ? "auto" : 0,
                opacity: isActive ? 1 : 0,
              }}
              transition={{ duration: 0.28 }}
              className="overflow-hidden"
            >
              <p
                className={cn(
                  "mt-3 border-t border-stone-100 pt-3 text-xs leading-relaxed text-stone-400",
                  isEven ? "" : "lg:text-right"
                )}
              >
                {step.detail}
              </p>
            </motion.div>
          )}

          <motion.div
            className="absolute bottom-0 left-0 h-0.5 rounded-b-2xl bg-brand-blue"
            initial={{ width: "0%" }}
            animate={{ width: isActive ? "100%" : "0%" }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      </div>

      <div className="relative z-10 hidden lg:flex lg:mx-auto lg:items-center">
        <div
          className="h-px transition-all duration-700 ease-out"
          style={{
            width: "48px",
            background: isFilled ? "rgb(37,99,235)" : "rgb(203,213,225)",
            opacity: isFilled ? 1 : 0.4,
          }}
        />
        <div
          className="relative flex h-4 w-4 shrink-0 items-center justify-center rounded-full ring-4 ring-white transition-all duration-700"
          style={{
            background: isFilled ? "rgb(37,99,235)" : "rgb(203,213,225)",
            transform: isFilled ? "scale(1.2)" : "scale(1)",
            boxShadow: isFilled ? "0 0 0 4px white, 0 0 10px rgba(37,99,235,0.4)" : undefined,
          }}
        >
          {isFilled && (
            <motion.div
              className="h-1.5 w-1.5 rounded-full bg-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, type: "spring" }}
            />
          )}
        </div>
        <div
          className="h-px transition-all duration-700 ease-out"
          style={{
            width: "48px",
            background: isFilled ? "rgb(37,99,235)" : "rgb(203,213,225)",
            opacity: isFilled ? 1 : 0.4,
          }}
        />
      </div>

      <div className="hidden lg:block lg:w-5/12" />
    </motion.li>
  );
}

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 30%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = smoothProgress.onChange((v) => setScrollProgress(v));
    return unsubscribe;
  }, [smoothProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
      });
    };
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div
        className="absolute left-1/2 hidden h-full w-px -translate-x-1/2 bg-slate-200/70 lg:block"
        aria-hidden="true"
      />

      <motion.div
        className="absolute left-1/2 top-0 hidden w-px -translate-x-1/2 origin-top lg:block"
        style={{
          height: lineHeight,
          background: "linear-gradient(to bottom, rgb(37,99,235), rgb(96,165,250))",
          boxShadow: "0 0 6px rgba(37,99,235,0.4)",
        }}
        aria-hidden="true"
      />

      <ol className="space-y-10 lg:space-y-0">
        {steps.map((step, index) => (
          <TimelineCard
            key={step.id}
            step={step}
            index={index}
            isActive={activeId === step.id}
            onEnter={() => setActiveId(step.id)}
            onLeave={() => setActiveId(null)}
            mousePosition={mousePosition}
            scrollProgress={scrollProgress}
            totalSteps={steps.length}
          />
        ))}
      </ol>
    </div>
  );
}
