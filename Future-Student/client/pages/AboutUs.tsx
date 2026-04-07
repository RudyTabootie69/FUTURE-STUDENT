import Navigation from "@/components/Navigation";
import { Hero } from "@/sections/Hero";
import { TextSection } from "@/components/TextSection";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-bg-soft">
      <Navigation />

      <Hero
        title="About Us"
        description="We're a small passionate team that want to take the stress out of applying to Uni. With Future Student, the perfect path is waiting for you."
      />

      <TextSection
        title="Our Story"
        background="hsl(var(--bg-soft))"
        paragraphs={[
          "Future Student was born from a simple realization: the path to university shouldn't be overwhelming. Every year, thousands of Year 12 students navigate a complex maze of applications, deadlines, and requirements. We saw an opportunity to make this journey smoother, clearer, and more empowering.",
        ]}
      />

      <TextSection
        title="What We Believe"
        background="white"
        paragraphs={[
          "Our platform brings together everything students need in one place—from discovering courses that match their interests and ATAR to tracking application deadlines and managing their wishlist. We've designed every feature with the student experience at the forefront, ensuring that the application process becomes a journey of discovery rather than a source of stress.",
        ]}
      />

      <TextSection
        title="Why We Built Future Student"
        background="hsl(var(--bg-soft))"
        paragraphs={[
          "What sets Future Student apart is our commitment to personalization. We understand that every student's path is unique, influenced by their academic strengths, personal interests, and future aspirations. That's why we've built tools that adapt to each individual's needs, providing tailored recommendations and guidance throughout the entire application process.",
          "Our team consists of educators, technologists, and former university applicants who intimately understand the challenges students face. We've combined our expertise to create a platform that not only simplifies the application process but also empowers students to make informed decisions about their future.",
          "We believe that every student deserves access to quality guidance and support as they take this important step in their educational journey. With Future Student, we're democratizing access to university application resources and making the path to higher education clearer for everyone.",
        ]}
      />
    </div>
  );
}
