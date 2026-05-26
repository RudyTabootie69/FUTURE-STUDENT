import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";
import { ProfileProvider } from "@/context/ProfileContext";
import { OnboardingProfileProvider } from "@/context/OnboardingProfileContext";
import { SavedEventProvider } from "@/context/SavedEventContext";
import { EventProvider } from "@/context/EventContext";
import { TagProvider } from "@/context/TagContext";
import { StudentTrackerProvider } from "./context/StudentContext";
import Calendar from "./pages/Calendar";
import CourseFinder from "./pages/CourseFinder";
import Profile from "./pages/Profile";
import LandingPage from "./pages/LandingPage";
import Placeholder from "./pages/Placeholder";
import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import OnboardingHome from "./pages/Onboarding/Home";
import OnboardingCalendar from "./pages/Onboarding/Calendar";
import OnboardingCourseFinder from "./pages/Onboarding/CourseFinder";
import OnboardingWishlist from "./pages/Onboarding/Wishlist";
import OnboardingProfile from "./pages/Onboarding/Profile";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ContactUs from "./pages/ContactUs";
import EventPage from "./pages/EventPage";
import CoursePage from "./pages/CoursePage";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ProfileProvider>
            <OnboardingProfileProvider>
              <EventProvider>
                <SavedEventProvider>
                  <WishlistProvider>
                    <StudentTrackerProvider>
                      <TagProvider>
                        <Routes>
                          <Route path="/" element={<LandingPage />} />
                          <Route path="/onboarding" element={<Onboarding />} />
                          <Route path="/onboarding/home" element={<OnboardingHome />} />
                          <Route path="/onboarding/course-finder" element={<OnboardingCourseFinder />} />
                          <Route path="/onboarding/calendar" element={<OnboardingCalendar />} />
                          <Route path="/onboarding/wishlist" element={<OnboardingWishlist />} />
                          <Route path="/onboarding/profile" element={<OnboardingProfile />} />
                          <Route path="/home" element={<Home />} />
                          <Route path="/calendar" element={<Calendar />} />
                          <Route path="/course-finder" element={<CourseFinder />} />
                          <Route path="/wishlist" element={<Wishlist />} />
                          <Route path="/profile" element={<Profile />} />
                          <Route path="/about" element={<AboutUs />} />
                          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                          <Route path="/contact" element={<ContactUs />} />
                          <Route path="/course" element={<CoursePage />} />
                          <Route path="/event" element={<EventPage />} />
                        
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </TagProvider>
                    </StudentTrackerProvider>
                  </WishlistProvider>
                </SavedEventProvider>  
              </EventProvider>
            </OnboardingProfileProvider>
          </ProfileProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

const container = document.getElementById("root")!;
// Reuse existing root across HMR to avoid duplicate createRoot warnings
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const existingRoot = (window as any).__fusion_app_root;
const root = existingRoot ?? createRoot(container);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).__fusion_app_root = root;
root.render(<App />);
