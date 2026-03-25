import { cn } from "@/lib/utils";
import { SectionWrapper } from "@/components/SectionWrapper";

type CardGridSectionProps = {
  title: string;
  children: React.ReactNode;
  innerClassName?: string;
  gridClassName?: string;
};

export function CardGridSection({
  title,
  children,
  innerClassName,
  gridClassName,
}: CardGridSectionProps) {
  return (
    <SectionWrapper innerClassName={cn("py-20", innerClassName)}>
      <h2 className="mb-12 text-center text-3xl font-bold text-primary-blue">
        {title}
      </h2>

      <div
        className={cn(
          "grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3",
          gridClassName,
        )}
      >
        {children}
      </div>
    </SectionWrapper>
  );
}
