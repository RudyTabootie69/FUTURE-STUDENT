import { useMemo, useState} from "react";
import OnboardingNavigation from "@/components/OnboardingNavigation";
import OnboardingFooter from "@/components/OnboardingFooter";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate
} from '@floating-ui/react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Hero } from "@/sections/Hero";
import { ApplicationJourney } from "@/sections/ApplicationJourney";
import { StatsGrid } from "@/sections/StatsGrid";
import { QuickActions } from "@/sections/QuickActions";
import { actionCards } from "@/pages/data/home-data";
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


export default function LogIn() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [openSignIn, setOpenSignIn] = useState(true);
  const { login } = useAuth();
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
        actionHref: "/onboarding/course-finder",
        tasks: shortlistTasks,
      },
      {
        title: "Compare Your Options",
        description:
          "Review your shortlisted universities and narrow your preferences.",
        status: compareStatus,
        actionLabel: "Review Wishlist",
        actionHref: "/onboarding/wishlist",
        tasks: compareTasks,
      },
      {
        title: "Prepare Your Application",
        description:
          "Gather your documents and prepare for preference submission.",
        status: applicationStatus,
        actionLabel: "View Deadlines",
        actionHref: "/onboarding/calendar",
        tasks: applicationTasks,
      },
    ];
  }, [wishlist.length]);



  return (
    <div className="min-h-screen bg-bg-soft">
      <OnboardingNavigation />
      <div id = "start">
        
      <Hero
        title='Welcome, Student!'
        description="Let’s continue planning your path to University. You’re doing great!"
        cta={{
          label: "Find Your Perfect Course",
          href: "/onboarding/course-finder",
        }}
      />
      </div>

      <ApplicationJourney savedCourses={wishlist.length} steps={journeySteps}/>

      <StatsGrid
        savedCourses={wishlist.length}
        upcomingDeadlines={upcomingDeadlines}
        stepsCompleted="1/6"
      />

      <QuickActions cards={actionCards} />

      <OnboardingFooter />
      
            {/* Sign In Modal */}
      <Dialog open={openSignIn} onOpenChange={setOpenSignIn}>
        <DialogContent className="sm:max-w-md" onInteractOutside={(e) => { e.preventDefault(); } } onEscapeKeyDown={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
            <DialogDescription>
              Welcome! Enter your details to continue.
            </DialogDescription>
          </DialogHeader>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              login(username, password);
            }}
          >
            <div className="space-y-1">
              <label className="text-sm font-medium">Username</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md bg-white"
                placeholder="you@example.com"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md bg-white"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full mt-2 px-4 py-2 bg-primary-blue text-white rounded-md"
            >
              Sign In
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
