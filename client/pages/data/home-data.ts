import type { ActionCard, JourneyStep } from "@/types/types";

export const actionCards: ActionCard[] = [
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
];

export const journeySteps: JourneyStep[] = [
  { label: "Start Journey", active: true },
  { label: "Check Eligibility", active: false },
  { label: "Choose Courses", active: false },
  { label: "Upload Docs", active: false },
  { label: "Apply", active: false },
  { label: "Track Offers", active: false },
];
