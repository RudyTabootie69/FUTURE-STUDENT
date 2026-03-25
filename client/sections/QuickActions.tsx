import { Link } from "react-router-dom";
import { SectionWrapper } from "@/components/SectionWrapper";
import type { ActionCard } from "@/types/types";

type QuickActionsProps = {
  cards: ActionCard[];
};

export function QuickActions({ cards }: QuickActionsProps) {
  return (
    <SectionWrapper>
      <h2 className="mb-6 text-2xl font-bold text-black">Jump into it!</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.title}
            to={card.path}
            className="group flex flex-col gap-4 rounded-xl border-2 border-[#B3D8FF] bg-bg-soft p-6 transition-all hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="h-8 w-8 shrink-0 rounded-full bg-primary-blue" />
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M12 8.5L19.5 16L12 23.5"
                  stroke="#6E7491"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h3 className="text-center text-2xl font-bold text-[#1A1A1A]">
              {card.title}
            </h3>

            <p className="whitespace-pre-line text-[13px] text-[#777]">
              {card.description}
            </p>
          </Link>
        ))}
      </div>
    </SectionWrapper>
  );
}
