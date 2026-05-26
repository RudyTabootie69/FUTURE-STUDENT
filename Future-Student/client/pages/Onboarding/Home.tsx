import { useMemo, useState, useEffect } from "react";
import OnboardingNavigation from "@/components/OnboardingNavigation";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
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
import { useOnboardingProfile } from "@/context/OnboardingProfileContext";
import { onboardingsteps, homesteps, coursesteps, calendarsteps, wishliststeps, profilesteps } from "../data/onboardingsteps";
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


export default function OnboardingHome() {
  const navigate = useNavigate();
  const { onboardingprogress, increment, decrement, setProgress } = useOnboardingProfile();
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [openSignUp, setOpenSignUp] = useState(false);
  const { register } = useAuth();
  const { wishlist } = useWishlist();
  const upcomingDeadlines = useMemo(() => {
    return getUpcomingDeadlines(wishlist);
  }, [wishlist]);

  const currentStep = onboardingsteps[onboardingprogress];
  const [target, setTarget] = useState<HTMLElement | null>(null);
  
  const { refs, floatingStyles, update } = useFloating({
    open: !!target,
    placement: currentStep.placement || "bottom",
    middleware: [offset(5), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  useEffect(() => {
    const step = onboardingsteps[onboardingprogress];
    const el = document.querySelector(step.target) as HTMLElement | null;

    refs.setReference(el);
    setTarget(el);
    requestAnimationFrame(() => {
      update();
    });
  }, [onboardingprogress, onboardingsteps, refs]);
  

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
  function handleNextClick() {
      switch (onboardingprogress) {
        case 0:
          increment()
          break;

        case 1:
          increment();
          navigate("/onboarding/course-finder")
          break;

        case 4:
          increment();
          navigate("/onboarding/calendar")
          break;
        
        case 6:
          increment();
          navigate("/onboarding/wishlist")
          break;
        
        case 8:
          increment();
          break;
        
        case 9:
          increment();
          navigate("/onboarding/profile")
          break;
        
        case 11:
          setOpenSignUp(true)
          break;

        default:
          console.log("Unknown action: " + onboardingprogress);
          setProgress(0)
      }
      return;
  };

  function handlePrevClick() {
      switch (onboardingprogress) {
        case 1:
          decrement();
          break;

        case 4:
          decrement();
          navigate("/onboarding/course-finder")
          break;
        
        case 6:
          decrement();
          navigate("/onboarding/calendar")
          break;
        
        case 8:
          decrement();
          navigate("/onboarding/wishlist")
          break;
        
        case 9:
          decrement();
          break;
        
        case 11:
          decrement()
          navigate("/onboarding/profile")
          break;

        default:
          console.log("Unknown action: " + onboardingprogress);
          setProgress(0)
      }
      return;

  };

  useEffect(() => {
    if (!homesteps.includes(onboardingprogress)) {
      if (coursesteps.includes(onboardingprogress)) {
        setProgress(4);
      }
      else if(calendarsteps.includes(onboardingprogress)){
        setProgress(6);
      }
      else if(wishliststeps.includes(onboardingprogress)){
        setProgress(8);
      }
      else if(profilesteps.includes(onboardingprogress)){
        setProgress(11);
      }
      else{
      setProgress(0);
      }
    }
  }, [homesteps, onboardingprogress, setProgress]);

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

      <Footer />
      
      <Dialog open={openSignUp} onOpenChange={setOpenSignUp}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Account</DialogTitle>
            <DialogDescription>
              Join Future Student today!
            </DialogDescription>
          </DialogHeader>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              register(firstname, lastname, username, password);
              setOpenSignUp(false);
            }}
          >
            <div className="space-y-1">
              <label className="text-sm font-medium">First Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md bg-white"
                placeholder="Your first name"
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Last Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md bg-white"
                placeholder="Your last name"
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Username</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md bg-white"
                placeholder="JohnSmith12"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md bg-white"
                placeholder="Create a password"
                onChange={(e) => setPassword(e.target.value)}
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
        className="z-50 w-72 rounded-xl bg-white p-4 text-black shadow-xl"

      >
        <h2 className="text-lg font-bold">
          {currentStep.title}
        </h2>

        <p className="mt-2 text-sm text-[#777]">
          {currentStep.description}
        </p>

        <div className="mt-4 flex justify-between">
          <button
            onClick={handlePrevClick}
            disabled={onboardingprogress === 0}
            className="rounded bg-primary-blue text-white px-3 py-1"
          >
            Back
          </button>
          
          {onboardingprogress < onboardingsteps.length - 1 ? (
            <button
              onClick={handleNextClick}
              className="rounded bg-primary-blue text-white px-3 py-1"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleNextClick}
              className="rounded bg-green-500 text-white px-3 py-1"
            >
              Finish
            </button>
          )}
        </div>
    </div>
    </div>
  );
}
