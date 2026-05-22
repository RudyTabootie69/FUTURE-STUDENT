import { useMemo, useState, useEffect } from "react";
import OnboardingNavigation from "@/components/OnboardingNavigation";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { useWishlist } from "@/context/WishlistContext";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate
} from '@floating-ui/react';
import type {Placement} from '@floating-ui/react';
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
import { useOnboardingProfile } from "@/context/OnboardingProfileContext";
import { actionCards } from "../data/home-data";
import { getUpcomingDeadlines } from "@/lib/utils";

import type { JourneyStep } from "shared/types/types";

type floatui = {
  target: string,
  title: string,
  description: string,
  placement: Placement
} 

function getStepStatus(
  tasks: { completed: boolean }[],
  hasPreviousIncompleteStep: boolean,
): JourneyStep["status"] {
  if (hasPreviousIncompleteStep) return "locked";

  const allComplete = tasks.length > 0 && tasks.every((task) => task.completed);

  return allComplete ? "complete" : "active";
}

export default function OnboardingHome() {
  const navigate = useNavigate();
  
  const [openSignUp, setOpenSignUp] = useState(false);

  const { onboardingprogress, increment, decrement } = useOnboardingProfile();

  const { wishlist } = useWishlist();
  
  const upcomingDeadlines = useMemo(() => {
    return getUpcomingDeadlines(wishlist);
  }, [wishlist]);

  const onboardingsteps: floatui[] = [
    {
      target: '#start',
      title: 'Welcome to Future Student!',
      description: 'Here you will be assisted and guided through the University Application process! Click "Next" to continue.',
      placement:'bottom-start'
    },
    {
      target: '#course-finder',
      title: 'Go to Course Finder',
      description: "Here you will be able to choose course(s) that best fit your needs and career path, or even to decide on a career path if you haven't!",
      placement: 'right'
    },
    {
      target: '#nav-calendar',
      title: 'Go to Calendar',
      description: "Here you can view upcoming events that relate to and are beneficial to you. This is the largest determinor of success for applying to universities, so don't ignore it!",
      placement: 'right'
    },
    {
      target: '#nav-wishlist',
      title: 'Go to Wishlist',
      description: "On the wishlist you can see courses you've marked previously that you're interested in.",
      placement: 'right'
    },
    {
      target: '#nav-profile',
      title: 'Go to Profile',
      description: "Here's where you can find your profile information.",
      placement: 'right'
    },
  ];

  const currentStep = onboardingsteps[onboardingprogress];
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.querySelector(
      `[floatui="${currentStep.target}"]`
    ) as HTMLElement | null;

    setTarget(el);
  }, [currentStep]);

  const { refs, floatingStyles } = useFloating({
    placement: currentStep.placement || "bottom",
    middleware: [offset(16), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  useEffect(() => {
    if (target) {
      refs.setReference(target);
    }
  }, [target, refs]);

  if (!target) return null;

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

  function handleNextClick() {
  
      switch (onboardingprogress) {
        case 1:
          increment(onboardingprogress)
          break;

        case 2:
          increment(onboardingprogress);
          navigate("/onboarding/course-finder")
          break;

        case 3:
          increment(onboardingprogress);
          navigate("/onboarding/course-finder")
          break;
        
        case 4:
          increment(onboardingprogress);
          navigate("/onboarding/course-finder")
          break;
        
        case 5:
          increment(onboardingprogress);
          navigate("/onboarding/course-finder")
          break;
        
        case 6:
          
          navigate("/onboarding/course-finder")
          break;

        default:
          console.log("Unknown action");
      }

  };

  function handlePrevClick() {
  
      switch (onboardingprogress) {
        case 2:
          decrement(onboardingprogress);
          navigate("/onboarding/course-finder")
          break;

        case 3:
          decrement(onboardingprogress);
          navigate("/onboarding/course-finder")
          break;
        
        case 4:
          decrement(onboardingprogress);
          navigate("/onboarding/course-finder")
          break;
        
        case 5:
          decrement(onboardingprogress);
          navigate("/onboarding/course-finder")
          break;
        
        case 6:
          decrement(onboardingprogress);
          navigate("/onboarding/course-finder")
          break;

        default:
          console.log("Unknown action");
      }

  };

  return (
    <div className="min-h-screen bg-bg-soft">
      id = "start"
      <OnboardingNavigation />
      <div className="min-h-screen bg-bg-soft">
        id = "course-finder"
      <Hero
        title="Welcome, Student!"
        description="Let’s continue planning your path to University. You’re doing great!"
        cta={{
          label: "Find Your Perfect Course",
          href: "/course-finder",
        }}
      />
      </div>

      <ApplicationJourney savedCourses={wishlist.length} steps={journeySteps} />

      <StatsGrid
        savedCourses={wishlist.length}
        upcomingDeadlines={upcomingDeadlines}
        stepsCompleted="1/6"
      />

      <QuickActions cards={actionCards} />

      <Footer />

      <Dialog open={openSignUp} onOpenChange={setOpenSignUp}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Account</DialogTitle>
            <DialogDescription>
              Join Future Student. It only takes a minute.
            </DialogDescription>
          </DialogHeader>
          <form
            className="space-y-3"
            onSubmit={(e) => {

            }}
          >
            <div className="space-y-1">
              <label className="text-sm font-medium">First Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md bg-white"
                placeholder="Your first name"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Last Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md bg-white"
                placeholder="Your last name"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Username</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md bg-white"
                placeholder="JohnSmith12"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md bg-white"
                placeholder="Create a password"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-2 px-4 py-2 bg-primary-blue text-white rounded-md"
            >
              Create Account
            </button>
          </form>
        </DialogContent>
      </Dialog>


      <div
        ref={refs.setFloating}
        style={floatingStyles}
        className="z-50 w-72 rounded-xl bg-black p-4 text-white shadow-xl"
      >
        <h2 className="text-lg font-bold">
          {currentStep.title}
        </h2>

        <p className="mt-2 text-sm text-gray-300">
          {currentStep.description}
        </p>

        <div className="mt-4 flex justify-between">
          <button
            onClick={handlePrevClick}
            disabled={onboardingprogress === 0}
            className="rounded bg-gray-700 px-3 py-1"
          >
            Back
          </button>
          
          {onboardingprogress < onboardingsteps.length - 1 ? (
            <button
              onClick={handleNextClick}
              className="rounded bg-blue-500 px-3 py-1"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleNextClick}
              className="rounded bg-green-500 px-3 py-1"
            >
              Finish
            </button>
          )}
        </div>
    </div>
    </div>
  );
}
