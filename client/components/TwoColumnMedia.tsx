import clsx from "clsx";
import { SectionWrapper } from "@/components/SectionWrapper";

type TwoColumnMediaSectionProps = {
  title: string;
  description: string;
  actions?: React.ReactNode;
  media: React.ReactNode;
  reverse?: boolean;
  innerClassName?: string;
};

export function TwoColumnMedia({
  title,
  description,
  actions,
  media,
  reverse = false,
  innerClassName,
}: TwoColumnMediaSectionProps) {
  return (
    <SectionWrapper innerClassName={clsx("pt-12 pb-20", innerClassName)}>
      <div
        className={clsx(
          "grid items-center gap-12 lg:grid-cols-2",
          reverse && "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1",
        )}
      >
        <div className="space-y-8">
          <h1 className="text-4xl font-bold leading-tight text-primary-blue lg:text-5xl">
            {title}
          </h1>

          <p className="text-base leading-relaxed text-[#777]">{description}</p>

          {actions && <div className="flex flex-wrap gap-4">{actions}</div>}
        </div>

        <div className="relative">{media}</div>
      </div>
    </SectionWrapper>
  );
}
