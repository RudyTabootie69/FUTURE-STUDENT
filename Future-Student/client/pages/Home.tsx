import { useMemo, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useWishlist } from "@/context/WishlistContext";
import { useProfile } from "@/context/ProfileContext";
import { Hero } from "@/sections/Hero";
import { ApplicationJourney } from "@/sections/ApplicationJourney";
import { StatsGrid } from "@/sections/StatsGrid";
import { QuickActions } from "@/sections/QuickActions";
import { useNavigate } from "react-router-dom";
import { getUpcomingDeadlines } from "@/lib/utils";
import { useCourseFinder } from "@/context/CourseContext";
import type { ActionCard, JourneyStep } from "@shared/types/types";
import { isParent, isSecStaff, isStudent } from "@shared/types/user";

function getStepStatus(
  tasks: { completed: boolean }[],
  hasPreviousIncompleteStep: boolean,
): JourneyStep["status"] {
  if (hasPreviousIncompleteStep) return "locked";

  const allComplete = tasks.length > 0 && tasks.every((task) => task.completed);

  return allComplete ? "complete" : "active";
}

export default function Home() {
  const { setSearch } = useCourseFinder();
  const navigate = useNavigate();
  const { wishlist } = useWishlist();
  const { profile } = useProfile();
  const upcomingDeadlines = useMemo(() => {
    return getUpcomingDeadlines(wishlist);
  }, [wishlist]);
  
  useEffect(() => {
    if(isStudent(profile)){
      setSearch("");
    }
  }, []);

  let actionCards: ActionCard[] 

  if(isParent(profile)){
    actionCards =[
      {
        title: "Student Finder",
        description: "View and track student's progress",
        path: "/student-finder",
      },
      {
        title: "Important Dates",
        description: "Never miss application deadlines and open\ndays",
        path: "/calendar",
      },
    ]
  }
  else if(isSecStaff(profile)){
      actionCards =[
      {
        title: "Student Finder",
        description: "View all your student's progress",
        path: "/student-finder",
      },
      {
        title: "Student Tracker",
        description: "See which students you've marked to track later",
        path: "/student-tracker",
      },
      {
        title: "Important Dates",
        description: "Never miss application deadlines and open\ndays",
        path: "/calendar",
      },
    ]
  }
  else{
    actionCards =[
      {
        title: "Course Finder",
        description: "Search thousands of courses and filter\nby your preferences",
        path: "/course-finder",
      },
      {
        title: "Check Eligibility",
        description: "See which courses match your ATAR\nand prerequisites",
        path: "/course-finder",
      },
      {
        title: "My Wishlist",
        description: "View and manage your saved courses\nand preferences",
        path: "/wishlist",
      },
      {
        title: "Important Dates",
        description: "Never miss application deadlines and open\ndays",
        path: "/calendar",
      },
    ]
  }
  
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

  if(isSecStaff(profile) || isParent(profile) || isSecStaff(profile)){
  return (
    <div className="min-h-screen bg-bg-soft">
      <Navigation />

      <Hero
        title={`Welcome, ${profile?.firstName || "Student"}!`}
        description="Let’s continue planning your path to University. You’re doing great!"
        cta={{
          label: "Track your Students",
          href: "/student-finder",
        }}
      />

      <QuickActions cards={actionCards} />

      <Footer />
    </div>
  );
  }
  else {
    return (
      <div className="min-h-screen bg-bg-soft">
      <Navigation />

      <Hero
        title={`Welcome, ${profile?.firstName || "Student"}!`}
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
}
