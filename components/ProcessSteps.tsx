import {
  UserPlus,
  FileText,
  Coffee,
  CheckCircle,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcessStep {
  icon: string;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps: ProcessStep[];
  variant?: "horizontal" | "vertical";
}

const stepIconMap: Record<string, LucideIcon> = {
  UserPlus,
  FileText,
  Coffee,
  CheckCircle,
};

export default function ProcessSteps({
  steps,
  variant = "horizontal",
}: ProcessStepsProps) {
  if (variant === "vertical") {
    return (
      <ol className="relative space-y-0">
        {steps.map((step, index) => {
          const Icon = stepIconMap[step.icon] ?? CheckCircle;
          const isLast = index === steps.length - 1;

          return (
            <li key={index} className="relative flex gap-5 pb-10 last:pb-0">
              <div className="flex flex-col items-center">
                <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-blue shadow-md shadow-brand-blue/20">
                  <Icon size={18} className="text-white" />
                </div>
                {!isLast && (
                  <div className="mt-1 w-px flex-1 bg-gradient-to-b from-brand-blue/40 to-brand-blue/10" />
                )}
              </div>
              <div className="pt-1.5 pb-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold uppercase tracking-widest text-brand-blue">
                    Schritt {index + 1}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-stone-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-stone-500">
                  {step.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <ol className="flex flex-col gap-10 md:flex-row md:gap-0">
      {steps.map((step, index) => {
        const Icon = stepIconMap[step.icon] ?? CheckCircle;
        const isLast = index === steps.length - 1;

        return (
          <li key={index} className="relative flex flex-1 flex-col items-center text-center">
            {!isLast && (
              <span
                aria-hidden
                className="absolute left-1/2 top-7 hidden h-px w-full translate-x-7 bg-gradient-to-r from-brand-blue/30 to-brand-blue/05 md:block"
              />
            )}
            <div className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-blue shadow-lg shadow-brand-blue/25 transition-transform duration-200 hover:scale-105">
              <Icon size={22} className="text-white" strokeWidth={1.75} />
            </div>
            <div className="px-4 md:px-6">
              <h3 className="mb-1.5 text-base font-semibold text-stone-900">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-stone-500">
                {step.description}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
