import { Play } from "lucide-react";
import { TwoColumnMedia } from "@/components/TwoColumnMedia";

type LandingHeroProps = {
  onGetStarted: () => void;
  onWatchHowItWorks: () => void;
};

export function LandingHero({
  onGetStarted,
  onWatchHowItWorks,
}: LandingHeroProps) {
  return (
    <TwoColumnMedia
      title="Your Journey to Tertiary Education Starts Here"
      description="Welcome to Future Student - the comprehensive platform designed to guide secondary students through every step of the tertiary application process. Simplify your future, one application at a time."
      actions={
        <>
          <button
            onClick={onGetStarted}
            className="rounded-lg bg-primary-blue px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
          >
            Get Started Free
          </button>

          <button
            onClick={onWatchHowItWorks}
            className="rounded-lg border-2 border-primary-blue bg-white px-4 py-2 text-sm font-medium text-primary-blue transition-colors hover:bg-gray-50"
          >
            Watch How It Works
          </button>
        </>
      }
      media={
        <div
          className="relative overflow-hidden rounded-[20px] shadow-[0_10px_40px_0_rgba(49,133,252,0.20)]"
          style={{
            background:
              "linear-gradient(318deg, #B3D8FF 0.42%, #3185FC 97.26%)",
          }}
        >
          <div className="flex aspect-[540/460] items-center justify-center p-8">
            <div className="relative w-full max-w-[241px] rounded-[20px] bg-white/90 p-8">
              <div className="mb-8 space-y-2">
                <div className="h-2.5 w-full rounded-full bg-primary-blue" />
                <div className="h-2.5 w-4/5 rounded-full bg-[#B3D8FF]" />
                <div className="h-2.5 w-[87%] rounded-full bg-[#B3D8FF]" />
              </div>

              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-blue">
                  <Play className="ml-1 h-6 w-6 fill-bg-soft text-bg-soft" />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}
