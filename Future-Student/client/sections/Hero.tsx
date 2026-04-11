import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionWrapper } from "@/components/SectionWrapper";

type HeroProps = {
  title: string;
  description: string;
  cta?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
  };
};

export function Hero({ title, description, cta }: HeroProps) {
  return (
    <SectionWrapper background="hsl(var(--primary-blue))">
      <div className="text-center">
        <h1 className="mb-2 text-[32px] font-bold text-white">{title}</h1>
        <p className="mb-8 text-[13px] font-normal text-white">{description}</p>

        {cta && (
          <div className="flex justify-center">
            <Link
              to={cta.href}
              className="flex h-12 w-[258px] items-center gap-2 rounded border border-white bg-primary-blue px-3 py-2 transition-colors hover:bg-blue-600"
            >
              {cta.icon ?? <Search className="h-8 w-8 text-bg-soft" />}
              <span className="text-sm font-medium text-bg-soft">
                {cta.label}
              </span>
            </Link>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
