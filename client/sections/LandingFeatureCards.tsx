import { CardGridSection } from "@/components/CardGrid";
import { FeatureCard } from "@/components/FeatureCard";
import { features } from "@/pages/data/landing-page-data";

export function LandingFeatures() {
  return (
    <CardGridSection title="Why Choose Future Student?">
      {features.map((feature) => (
        <FeatureCard
          key={feature.title}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </CardGridSection>
  );
}
