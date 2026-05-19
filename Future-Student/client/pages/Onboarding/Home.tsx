import { useMemo, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useWishlist } from "@/context/WishlistContext";

import { Hero } from "@/sections/Hero";
import { ApplicationJourney } from "@/sections/ApplicationJourney";
import { StatsGrid } from "@/sections/StatsGrid";
import { QuickActions } from "@/sections/QuickActions";

import { actionCards } from "../data/home-data";
import { getUpcomingDeadlines } from "@/lib/utils";

import type { JourneyStep } from "shared/types/types";

function getStepStatus(
  tasks: { completed: boolean }[],
  hasPreviousIncompleteStep: boolean,
): JourneyStep["status"] {
  if (hasPreviousIncompleteStep) return "locked";

  const allComplete = tasks.length > 0 && tasks.every((task) => task.completed);

  return allComplete ? "complete" : "active";
}

export default function Home() {
  const [openSignUp, setOpenSignUp] = useState(false);
  const { wishlist } = useWishlist();

  const upcomingDeadlines = useMemo(() => {
    return getUpcomingDeadlines(wishlist);
  }, [wishlist]);

  const journeySteps: JourneyStep[] = useMemo(() => {
    const hasSavedEnoughCourses = wishlist.length >= 3;

    const shortlistTasks = [
      {
        label: "Complete your student profile",
        description: "Tell us about your study goals and preferences.",
        completed: true,
      },
      {
        label: "Save at least 3 courses",
        description: `${wishlist.length}/3 courses saved.`,
        completed: hasSavedEnoughCourses,
      },
      {
        label: "Review your saved courses",
        description: "Compare entry requirements, campuses, and pathways.",
        completed: false,
      },
    ];

    const compareTasks = [
      {
        label: "Compare your top course options",
        description: "Look at ATAR, location, pathway options, and deadlines.",
        completed: false,
      },
      {
        label: "Choose your preferred courses",
        description: "Narrow your shortlist into your strongest preferences.",
        completed: false,
      },
    ];

    const applicationTasks = [
      {
        label: "Check application deadlines",
        description: "Make sure you know when preferences and offers are due.",
        completed: false,
      },
      {
        label: "Prepare supporting information",
        description: "Gather any details you may need before applying.",
        completed: false,
      },
    ];

    const shortlistStatus = getStepStatus(shortlistTasks, false);
    const compareStatus = getStepStatus(
      compareTasks,
      shortlistStatus !== "complete",
    );
    const applicationStatus = getStepStatus(
      applicationTasks,
      compareStatus !== "complete",
    );

    return [
      {
        title: "Build Your Course Shortlist",
        description:
          "Start shaping your future by saving courses you are interested in. This helps us track deadlines and compare your options later.",
        status: shortlistStatus,
        actionLabel: "Explore Courses",
        actionHref: "/course-finder",
        tasks: shortlistTasks,
      },
      {
        title: "Compare Your Options",
        description:
          "Review your shortlisted universities and narrow your preferences.",
        status: compareStatus,
        actionLabel: "Review Wishlist",
        actionHref: "/wishlist",
        tasks: compareTasks,
      },
      {
        title: "Prepare Your Application",
        description:
          "Gather your documents and prepare for preference submission.",
        status: applicationStatus,
        actionLabel: "View Deadlines",
        actionHref: "/calendar",
        tasks: applicationTasks,
      },
    ];
  }, [wishlist.length]);

  return (
    <div className="min-h-screen bg-bg-soft">
      <Navigation />

      <Hero
        title="Welcome, Student!"
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
