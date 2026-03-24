import { SectionWrapper } from "@/components/SectionWrapper";

type StatsGridProps = {
  savedCourses: number;
  upcomingDeadlines: number;
  stepsCompleted: string;
};

export function StatsGrid({
  savedCourses,
  upcomingDeadlines,
  stepsCompleted,
}: StatsGridProps) {
  return (
    <SectionWrapper innerClassName="mt-12">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard
          value={savedCourses}
          label="Courses Saved"
          dotClassName="bg-[#28C76F]"
        />
        <StatCard
          value={upcomingDeadlines}
          label="Upcoming Deadlines"
          dotClassName="bg-[#F04438]"
        />
        <StatCard
          value={stepsCompleted}
          label="Steps Completed"
          dotClassName="bg-[#FFE55C]"
        />
      </div>
    </SectionWrapper>
  );
}

type StatCardProps = {
  value: string | number;
  label: string;
  dotClassName: string;
};

function StatCard({ value, label, dotClassName }: StatCardProps) {
  return (
    <div className="flex items-start gap-3 rounded-xl border-2 border-[#B3D8FF] bg-bg-soft p-4 shadow-[0_0_14px_0_rgba(49,133,252,0.15)]">
      <div className={`mt-3 h-8 w-8 shrink-0 rounded-full ${dotClassName}`} />
      <div>
        <div className="text-2xl font-bold text-[#1A1A1A]">{value}</div>
        <div className="text-base text-[#1A1A1A]">{label}</div>
      </div>
    </div>
  );
}
