import type { ReactNode, CSSProperties, ElementType } from "react";
import { cn } from "@/lib/utils";

type SectionWrapperProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  background?: string;
  as?: ElementType;
  padded?: boolean;
};

export function SectionWrapper({
  children,
  className,
  innerClassName,
  background,
  as: Component = "section",
  padded = true,
}: SectionWrapperProps) {
  const style: CSSProperties | undefined = background
    ? { backgroundColor: background }
    : undefined;

  return (
    <Component className={cn("w-full", className)} style={style}>
      <div
        className={cn(
          "constrain layout-px",
          padded && "layout-py",
          innerClassName,
        )}
      >
        {children}
      </div>
    </Component>
  );
}
