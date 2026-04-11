import { cn } from "@/lib/utils";
import { SectionWrapper } from "@/components/SectionWrapper";

type TextSectionProps = {
  title: string;
  paragraphs: string[];
  align?: "left" | "center";
  innerClassName?: string;
  background?: string;
};

export function TextSection({
  title,
  paragraphs,
  align = "left",
  innerClassName,
  background,
}: TextSectionProps) {
  return (
    <SectionWrapper
      background={background}
      innerClassName={cn("py-16", innerClassName)}
    >
      <div
        className={cn(
          "mx-auto max-w-screen-md",
          align === "center" && "text-center",
          align === "left" && "text-left",
        )}
      >
        <h2 className="mb-6 text-[28px] font-bold text-primary-blue">
          {title}
        </h2>

        <div className="space-y-5">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-base leading-relaxed text-black/80">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
