import { SectionWrapper } from "@/components/SectionWrapper";
import type { JourneyStep } from "@/types/types";

type ApplicationJourneyProps = {
  savedCourses: number;
  steps: JourneyStep[];
};

export function ApplicationJourney({
  savedCourses,
  steps,
}: ApplicationJourneyProps) {
  return (
    <SectionWrapper padded={false} innerClassName="mt-8">
      <div className="rounded-2xl border border-[#B3D8FF] bg-bg-soft p-6 shadow-[0_0_15px_0_rgba(49,133,252,0.15)]">
        <div className="mb-4 flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="mb-1 text-[33px] font-bold text-black">
              Your Application Journey
            </h2>
            <p className="text-[18px] text-[#777]">
              Track your progress through each step
            </p>
          </div>

          <div className="mt-4 text-right lg:mt-0">
            <div className="text-[33px] font-bold text-primary-blue">
              {savedCourses}
            </div>
            <div className="text-[18px] text-[#777]">Courses Saved</div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
            {steps.map((step, index) => (
              <div
                key={step.label}
                className="flex w-full flex-1 items-center gap-2 lg:w-auto"
              >
                <div className="flex min-w-[110px] flex-col items-center gap-1">
                  {step.active ? <ActiveStep /> : <LockedStep />}

                  <div className="text-center whitespace-nowrap text-[18px] text-primary-blue">
                    {step.label}
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="mx-2 hidden h-[3px] flex-1 rounded-full bg-[#B3D8FF] opacity-25 lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

function ActiveStep() {
  return (
    <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-primary-blue">
      <span className="text-xl font-bold text-white">1</span>
    </div>
  );
}

function LockedStep() {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      className="shrink-0"
    >
      <circle
        cx="26"
        cy="26"
        r="24.5"
        fill="#B3D8FF"
        stroke="#F5F9FF"
        strokeWidth="3"
      />
      <path
        d="M21 26V21C21 19.34 21.66 17.8 22.83 16.63C24 15.45 25.52 14.79 27.18 14.79C28.84 14.79 30.36 15.45 31.53 16.63C32.7 17.8 33.37 19.34 33.37 21V26M18.5 26H35.87C37.25 26 38.37 27.18 38.37 28.56V37.33C38.37 38.71 37.25 39.83 35.87 39.83H18.5C17.17 39.83 16.05 38.71 16.05 37.33V28.56C16.05 27.18 17.17 26 18.5 26Z"
        stroke="#F5F9FF"
        strokeWidth="2.73"
        strokeLinejoin="round"
      />
    </svg>
  );
}
