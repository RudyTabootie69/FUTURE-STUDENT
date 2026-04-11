import { SectionWrapper } from "./SectionWrapper";

type InputCardProps = {
  title: string;
  children: React.ReactNode;
};

export function ProfileSectionCard({ title, children }: InputCardProps) {
  return (
    <SectionWrapper>
      <div className="rounded-xl bg-white p-8 lg:p-12">
        <h2 className="mb-6 text-2xl font-bold text-black">{title}</h2>
        {children}
      </div>
    </SectionWrapper>
  );
}
