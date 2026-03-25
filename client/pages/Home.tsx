import { useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useWishlist } from "@/context/WishlistContext";

import { Hero } from "@/sections/Hero";
import { ApplicationJourney } from "@/sections/ApplicationJourney";
import { StatsGrid } from "@/sections/StatsGrid";
import { QuickActions } from "@/sections/QuickActions";

import { actionCards, journeySteps } from "./data/home-data";
import { getUpcomingDeadlines } from "@/lib/utils";

export default function Home() {
  const { wishlist } = useWishlist();

  const upcomingDeadlines = useMemo(() => {
    return getUpcomingDeadlines(wishlist);
  }, [wishlist]);

  return (
    <div className="min-h-screen bg-bg-soft">
      <Navigation />

      <Hero
        title="Welcome back, Lachlan!"
        description="Let’s continue planning your path to University. You’re doing great!"
        cta={{
          label: "Find Your Perfect Course",
          href: "/course-finder",
        }}
      />

      <ApplicationJourney savedCourses={wishlist.length} steps={journeySteps} />

      <StatsGrid
        savedCourses={wishlist.length}
        upcomingDeadlines={upcomingDeadlines}
        stepsCompleted="1/6"
      />

      <QuickActions cards={actionCards} />

      <Footer />
    </div>
  );
}
