type FeatureCardProps = {
  title: string;
  description: string;
};

export function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="rounded-xl border-2 border-[#B3D8FF] bg-bg-soft p-8 transition-shadow hover:shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div className="h-8 w-8 rounded-full bg-primary-blue" />

        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 8.5L19.5 16L12 23.5"
            stroke="#6E7491"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h3 className="mb-4 text-center text-2xl font-bold text-primary-blue">
        {title}
      </h3>

      <p className="text-center text-[#777]">{description}</p>
    </div>
  );
}

// NEEDS TOTAL RE-WORK - UGLY FEATURELESS CARDS THAT HAVE BEEN OVER-DESIGNED AND UNDER-DELIVER.
