import type {Placement} from '@floating-ui/react';

type floatui = {
  target: string,
  title: string,
  description: string,
  placement: Placement
} 

export const onboardingsteps : floatui[] = [
    {
      target: '#start',
      title: 'Welcome to Future Student!',
      description: 'Here you will be assisted and guided through the University Application process! Click "Next" to continue.',
      placement:'top'
    },
    {
      target: '#nav-course-finder',
      title: "Let's go to the Course Finder",
      description: "There you will be able to choose course(s) that best fit your needs and career path, or even to decide on a career path if you haven't!",
      placement: 'top'
    },
    {
      target: '#course-finder',
      title: "Welcome to the Course Finder!",
      description: "Here you can find all courses, and sort and filter them to what you need, then wishlist them to use later in your Application Journey.",
      placement: 'bottom'
    },
    {
      target: '#nav-home',
      title: "Click here to continue your tour!",
      description: "",
      placement: 'top'
    },
    {
      target: '#nav-calendar',
      title: "Now let's go to the Calendar!",
      description: "There you can view upcoming events that relate to you. This is the largest determinor of success for applying to universities, so don't ignore it!",
      placement: 'top'
    },
    {
      target: '#calendar',
      title: "The Event Calendar",
      description: "This tool enables you to view upcoming events that are relevant to courses you've saved and events that universities attend.",
      placement: 'right'
    },
    {
      target: '#nav-wishlist',
      title: 'Go to Wishlist',
      description: "On the wishlist you can see courses you've marked previously that you're interested in.",
      placement: 'top'
    },
    {
      target: '#wishlist',
      title: 'This is the Course Wishlist',
      description: "Here you can view courses you have previously wishlisted on the Course Finder",
      placement: 'top'
    },
    {
      target: '#application-journey',
      title: "This is your Application Journey",
      description: "This dashboard here will be able to track your stats, get recommendations for future tasks and notify of upcoming events.",
      placement: 'right'
    },
    {
      target: '#nav-profile',
      title: 'Profile',
      description: "This will display your information and give you an opportunity to modify your data.",
      placement: 'top'
    },
    {
      target: '#profile',
      title: "This is your profile page",
      description: "Here you can feel free to modify your info which is used to curate your Application Journey",
      placement: 'top'
    },
    {
      target: '#start',
      title: "You've now finished the tour!",
      description: 'Ready to begin your Application Journey? Click "Finish" to sign up!',
      placement: 'top'
    },
] as const;

export const homesteps = [0, 1, 4, 6, 8, 9, 11]
export const coursesteps = [2, 3]
export const calendarsteps = [5]
export const wishliststeps = [7]
export const profilesteps = [10]
