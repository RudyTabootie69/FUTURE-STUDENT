import { useState } from "react";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function LandingPage() {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const features = [
    { title: "Streamlined Applications", description: "Description of action" },
    { title: "Track Your Progress", description: "Description of action" },
    { title: "Personalised Guidance", description: "Description of action" },
    { title: "Course Discovery", description: "Description of action" },
    { title: "Resource Library", description: "Description of action" },
    { title: "Secure and Private", description: "Description of action" },
  ];

  return (
    <div className="min-h-screen bg-bg-soft relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute -left-20 top-[834px] w-[459px] h-[459px] rounded-full opacity-40 bg-gradient-to-b from-primary-blue to-[#B3D8FF] pointer-events-none" />
      <div
        className="absolute left-[633px] top-[81px] w-[279px] h-[279px] rounded-full opacity-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(49, 133, 252, 0.20) 0%, rgba(179, 216, 255, 0.20) 100%)",
        }}
      />
      <div className="absolute right-[24px] top-[657px] w-[150px] h-[150px] rounded-full bg-[#B3D8FF] opacity-40 pointer-events-none" />
      <div
        className="absolute right-0 bottom-[133px] w-[200px] h-[200px] rounded-full opacity-40 pointer-events-none"
        style={{ background: "linear-gradient(315deg, #B3D8FF 0.3%, #3185FC 99.7%)" }}
      />

      {/* Old custom Nav Bar with Sign In / Create Account */}
      <nav className="w-full bg-bg-soft shadow-[0_2px_10px_0_rgba(49,133,252,0.10)] relative z-10">
        <div className="w-full flex items-center justify-between px-6 py-2">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/4ce197ac521043188bace792d233ddbb851baa51?width=240"
            alt="Logo"
            className="h-[74px] w-[120px] rounded-2xl object-cover"
          />
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpenSignIn(true)}
              className="px-4 py-2 text-sm font-medium text-primary-blue border-2 border-primary-blue bg-white rounded-lg hover:bg-gray-50 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => setOpenSignUp(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-blue rounded-lg hover:bg-blue-600 transition-colors"
            >
              Create Account
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-[1200px] mx-auto px-6 pt-12 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-primary-blue text-4xl lg:text-5xl font-bold leading-tight">
              Your Journey to Tertiary Education Starts Here
            </h1>
            <p className="text-[#777] text-base leading-relaxed">
              Welcome to Future Student - the comprehensive platform designed to guide secondary students through every step of the tertiary application process. Simplify your future, one application at a time.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setOpenSignUp(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-primary-blue rounded-lg hover:bg-blue-600 transition-colors"
              >
                Get Started Free
              </button>
              <button
                onClick={() => setOpenSignIn(true)}
                className="px-4 py-2 text-sm font-medium text-primary-blue border-2 border-primary-blue bg-white rounded-lg hover:bg-gray-50 transition-colors"
              >
                Watch How It Works
              </button>
            </div>
          </div>

          {/* Right Column - Video Card */}
          <div className="relative">
            <div
              className="relative rounded-[20px] overflow-hidden shadow-[0_10px_40px_0_rgba(49,133,252,0.20)]"
              style={{ background: "linear-gradient(318deg, #B3D8FF 0.42%, #3185FC 97.26%)" }}
            >
              <div className="aspect-[540/460] p-8 flex items-center justify-center">
                <div className="bg-white/90 rounded-[20px] p-8 w-full max-w-[241px] relative">
                  <div className="space-y-2 mb-8">
                    <div className="h-2.5 bg-primary-blue rounded-full w-full" />
                    <div className="h-2.5 bg-[#B3D8FF] rounded-full w-4/5" />
                    <div className="h-2.5 bg-[#B3D8FF] rounded-full w-[87%]" />
                  </div>
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary-blue flex items-center justify-center">
                      <Play className="w-6 h-6 text-bg-soft fill-bg-soft ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="relative z-10 max-w-[1200px] mx-auto px-6 py-20">
        <h2 className="text-primary-blue text-center text-3xl font-bold mb-12">Why Choose Future Student?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <div key={i} className="p-8 border-2 border-[#B3D8FF] bg-bg-soft rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 rounded-full bg-primary-blue" />
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8.5L19.5 16L12 23.5" stroke="#6E7491" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-primary-blue text-2xl font-bold mb-4 text-center">{feature.title}</h3>
              <p className="text-[#777] text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-primary-blue py-16 relative z-10">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-white text-3xl font-bold mb-4">Ready To Control Your Future?</h2>
          <p className="text-white text-base mb-8">Join thousands of other students who have found their perfect fit with Future Student</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button onClick={() => setOpenSignUp(true)} className="px-4 py-2 text-sm font-bold text-primary-blue border-2 border-primary-blue bg-white rounded-lg hover:bg-gray-50 transition-colors">
              Create Your Free Account
            </button>
            <button onClick={() => setOpenSignIn(true)} className="px-4 py-2 text-sm font-medium text-white border-2 border-white bg-primary-blue rounded-lg hover:bg-blue-600 transition-colors">
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
            <DialogDescription>Welcome back. Enter your details to continue.</DialogDescription>
          </DialogHeader>
          <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); login(); setOpenSignIn(false); navigate("/home", { replace: true }); }}>
            <div className="space-y-1">
              <label className="text-sm font-medium">Email</label>
              <input type="email" className="w-full px-3 py-2 border rounded-md bg-white" placeholder="you@example.com" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Password</label>
              <input type="password" className="w-full px-3 py-2 border rounded-md bg-white" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full mt-2 px-4 py-2 bg-primary-blue text-white rounded-md">Sign In</button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Sign Up Modal */}
      <Dialog open={openSignUp} onOpenChange={setOpenSignUp}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Account</DialogTitle>
            <DialogDescription>Join Future Student. It only takes a minute.</DialogDescription>
          </DialogHeader>
          <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); login(); setOpenSignUp(false); navigate("/onboarding", { replace: true }); }}>
            <div className="space-y-1">
              <label className="text-sm font-medium">Name</label>
              <input type="text" className="w-full px-3 py-2 border rounded-md bg-white" placeholder="Your name" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Email</label>
              <input type="email" className="w-full px-3 py-2 border rounded-md bg-white" placeholder="you@example.com" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Password</label>
              <input type="password" className="w-full px-3 py-2 border rounded-md bg-white" placeholder="Create a password" />
            </div>
            <button type="submit" className="w-full mt-2 px-4 py-2 bg-primary-blue text-white rounded-md">Create Account</button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
