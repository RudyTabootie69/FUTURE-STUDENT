import type { ActionCard, JourneyStep } from "@shared/types/types";

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

export const journeySteps = [
  {
    title: "Build Your Course Shortlist",
    description:
      "Start shaping your future by saving courses you are interested in. This helps us track deadlines, compare options, and guide your next steps.",
    status: "active",
    actionLabel: "Explore Courses",
    actionHref: "/course-finder",
    tasks: [
      {
        label: "Complete your student profile",
        description: "Tell us about your study goals and preferences.",
        completed: true,
      },
      {
        label: "Save at least 3 courses",
        description:
          "Add courses to your wishlist so you can compare them later.",
        completed: false,
      },
      {
        label: "Review entry requirements",
        description: "Check ATAR, prerequisites, and assumed knowledge.",
        completed: false,
      },
    ],
  },
  {
    title: "Compare Your Options",
    description:
      "Compare your saved courses by location, entry score, study area, and application deadlines.",
    status: "locked",
    tasks: [],
  },
  {
    title: "Prepare Your Application",
    description:
      "Gather the information you need before submitting preferences.",
    status: "locked",
    tasks: [],
  },
];
