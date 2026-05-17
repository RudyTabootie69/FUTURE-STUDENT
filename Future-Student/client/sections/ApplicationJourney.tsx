import { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { Check, Lock, Circle } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { SectionWrapper } from "@/components/SectionWrapper";
import type { JourneyStep, JourneyTask } from "@/types/types";

gsap.registerPlugin(ScrollTrigger);

type ApplicationJourneyProps = {
  savedCourses: number;
  steps: JourneyStep[];
};

export function ApplicationJourney({
  savedCourses,
  steps,
}: ApplicationJourneyProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);

  const currentStepIndex = useMemo(() => {
    const activeIndex = steps.findIndex((step) => step.status === "active");

    if (activeIndex !== -1) return activeIndex;

    const firstLockedIndex = steps.findIndex(
      (step) => step.status === "locked",
    );

    return firstLockedIndex === -1 ? steps.length - 1 : firstLockedIndex;
  }, [steps]);

  const currentStep = steps[currentStepIndex];

  const completedSteps = steps.filter((step) => step.status === "complete");

  const upcomingSteps = steps.filter((step) => step.status === "locked");

  useEffect(() => {
    const section = sectionRef.current;
    const rail = railRef.current;

    if (!section || !rail) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rail,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom 70%",
            scrub: true,
          },
        },
      );

      gsap.from("[data-journey-item]", {
        y: 48,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 65%",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper innerClassName="mt-8">
      <section
        ref={sectionRef}
        className="relative overflow-hidden rounded-[32px] border border-[#B3D8FF] bg-white px-6 py-10 lg:px-12 lg:py-14"
      >
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary-blue">
              Application Progress
            </p>

            <h2 className="text-[36px] font-bold leading-tight text-black lg:text-[52px]">
              Your Application Journey
            </h2>

            <p className="mt-3 max-w-[620px] text-[18px] text-[#777]">
              Focus on your current stage. Complete the tasks below to unlock
              the next part of your university application journey.
            </p>
          </div>

          <div className="rounded-2xl bg-bg-soft px-6 py-5 lg:text-right">
            <div className="text-[40px] font-bold leading-none text-primary-blue">
              {savedCourses}
            </div>
            <div className="mt-1 text-[16px] text-[#777]">Courses Saved</div>
          </div>
        </div>

        <div className="relative grid gap-10 lg:grid-cols-[120px_1fr]">
          <div className="relative hidden lg:block">
            <div className="absolute left-1/2 top-0 h-full w-[4px] -translate-x-1/2 rounded-full bg-[#E5F2FF]" />

            <div
              ref={railRef}
              className="absolute left-1/2 top-0 h-full w-[4px] -translate-x-1/2 rounded-full bg-primary-blue"
            />
          </div>

          <div className="space-y-10">
            {completedSteps.length > 0 && (
              <div data-journey-item className="space-y-4">
                {completedSteps.map((step) => (
                  <div
                    key={step.title}
                    className="flex items-center gap-4 opacity-70"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-blue text-white">
                      <Check size={20} strokeWidth={3} />
                    </div>

                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#777]">
                        Completed
                      </p>

                      <h4 className="text-[20px] font-bold text-black">
                        {step.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div data-journey-item className="relative">
              <div className="mb-5 inline-flex items-center gap-3 rounded-full bg-primary-blue px-5 py-2 text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-primary-blue">
                  {currentStepIndex + 1}
                </span>
                <span className="text-sm font-bold uppercase tracking-[0.16em]">
                  Current Step
                </span>
              </div>

              <div className="max-w-[760px]">
                <h3 className="text-[34px] font-bold leading-tight text-black lg:text-[48px]">
                  {currentStep.title}
                </h3>

                <p className="mt-4 text-[20px] leading-relaxed text-[#555]">
                  {currentStep.description}
                </p>
              </div>

              <div className="mt-8 max-w-[760px] rounded-3xl bg-bg-soft p-6">
                <p className="mb-5 text-[18px] font-bold text-black">
                  Here’s what to focus on next:
                </p>

                <div className="space-y-4">
                  {currentStep.tasks.map((task) => (
                    <div
                      key={task.label}
                      className="flex items-start gap-4 rounded-2xl bg-white p-4"
                    >
                      <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E5F2FF] text-primary-blue">
                        {task.completed ? (
                          <Check size={18} strokeWidth={3} />
                        ) : (
                          <Circle size={14} strokeWidth={3} />
                        )}
                      </div>

                      <div>
                        <p className="text-[17px] font-semibold text-black">
                          {task.label}
                        </p>

                        {task.description && (
                          <p className="mt-1 text-[15px] text-[#777]">
                            {task.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {currentStep.actionHref && currentStep.actionLabel && (
                  <Link
                    to={currentStep.actionHref}
                    className="mt-6 inline-flex rounded-full bg-primary-blue px-6 py-3 text-[16px] font-bold text-white transition-colors hover:bg-blue-600"
                  >
                    {currentStep.actionLabel}
                  </Link>
                )}
              </div>
            </div>

            <div className="space-y-5">
              {upcomingSteps.map((step, index) => (
                <div
                  key={step.title}
                  data-journey-item
                  className="flex max-w-[760px] items-center gap-5 rounded-3xl border border-[#DCEEFF] bg-white/70 p-5 opacity-70"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E5F2FF] text-primary-blue">
                    <Lock size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#777]">
                      Step {currentStepIndex + index + 2} Locked
                    </p>

                    <h4 className="mt-1 text-[22px] font-bold text-black">
                      {step.title}
                    </h4>

                    <p className="mt-1 text-[15px] text-[#777]">
                      Complete your current tasks to unlock this stage.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}
