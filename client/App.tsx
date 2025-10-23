import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WishlistProvider } from "@/context/WishlistContext";
import Index from "./pages/Index";
import Calendar from "./pages/Calendar";
import CourseFinder from "./pages/CourseFinder";
import Profile from "./pages/Profile";
import LandingPage from "./pages/LandingPage";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/course-finder" element={<CourseFinder />} />
          <Route path="/Landing-Page" element={<LandingPage />} />
          <Route path="/wishlist" element={<Placeholder pageName="My Wishlist" />} />
          <Route path="/profile" element={<Profile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
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
;(window as any).__fusion_app_root = root;
root.render(<App />);
