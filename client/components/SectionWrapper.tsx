import { cn } from "@/lib/utils";

type SectionWrapperProps = {
  children: React.ReactNode;
  background?: string;
  className?: string;
  innerClassName?: string;
};

export function SectionWrapper({
  children,
  background,
  className,
  innerClassName,
}: SectionWrapperProps) {
  return (
    <section
      className={className}
      style={background ? { background } : undefined}
    >
      <div className={cn("constrain layout-px layout-py", innerClassName)}>
        {children}
      </div>
    </section>
  );
}
