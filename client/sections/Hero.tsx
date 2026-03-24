import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionWrapper } from "@/components/SectionWrapper";

export function Hero() {
  return (
    <SectionWrapper
      background="var(--color-primary-blue)"
      innerClassName="pt-12 pb-24"
    >
      <div className="text-center">
        <h1 className="mb-2 text-[32px] font-bold text-white">
          Welcome back, Lachlan!
        </h1>

        <p className="mb-8 text-[13px] font-normal text-white">
          Let&apos;s continue planning your path to University. You&apos;re
          doing great!
        </p>

        <div className="flex justify-center">
          <Link
            to="/course-finder"
            className="flex h-12 w-[258px] items-center gap-2 rounded border border-white/20 bg-primary-blue px-3 py-2 shadow-[0_4px_8px_3px_rgba(0,0,0,0.15),0_1px_3px_0_rgba(0,0,0,0.30)] transition-colors hover:bg-blue-600"
          >
            <Search className="h-8 w-8 text-bg-soft" />
            <span className="text-sm font-medium text-bg-soft">
              Find Your Perfect Course
            </span>
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
