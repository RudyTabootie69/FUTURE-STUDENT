import { useState } from "react";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { LandingHero } from "@/sections/LandingHero";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { LandingFeatures } from "@/sections/LandingFeatureCards";

export default function LandingPage() {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();
  const { login } = useAuth();

  return (
    <div className="min-h-screen bg-bg-soft">
      <LandingHero
        onGetStarted={() => setOpenSignUp(true)}
        onWatchHowItWorks={() => setOpenSignIn(true)}
      />

      <LandingFeatures />

      {/* CTA Section */}
      <section className="w-full bg-primary-blue py-16 relative z-10">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-white text-3xl font-bold mb-4">
            Ready To Control Your Future?
          </h2>
          <p className="text-white text-base mb-8">
            Join thousands of other students who have found their perfect fit
            with Future Student
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setOpenSignUp(true)}
              className="px-4 py-2 text-sm font-bold text-primary-blue border-2 border-primary-blue bg-white rounded-lg hover:bg-gray-50 transition-colors"
            >
              Create Your Free Account
            </button>
            <button
              onClick={() => setOpenSignIn(true)}
              className="px-4 py-2 text-sm font-medium text-white border-2 border-white bg-primary-blue rounded-lg hover:bg-blue-600 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Sign In Modal */}
      <Dialog open={openSignIn} onOpenChange={setOpenSignIn}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
            <DialogDescription>
              Welcome back. Enter your details to continue.
            </DialogDescription>
          </DialogHeader>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              login(e);
              setOpenSignIn(false);
              navigate("/home", { replace: true });
            }}
          >
            <div className="space-y-1">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md bg-white"
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md bg-white"
                placeholder="••••••••"
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

      {/* Sign Up Modal */}
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
              e.preventDefault();
              register(e);
              setOpenSignUp(false);
              navigate("/onboarding", { replace: true });
            }}
          >
            <div className="space-y-1">
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md bg-white"
                placeholder="Your name"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md bg-white"
                placeholder="you@example.com"
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
    </div>
  );
}
