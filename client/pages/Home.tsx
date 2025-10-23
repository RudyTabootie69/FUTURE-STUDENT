import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useWishlist } from "@/context/WishlistContext";

export default function Home() {
  const { wishlist } = useWishlist();
  
  const actionCards = [
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

  const journeySteps = [
    { label: "Start Journey", active: true },
    { label: "Check Eligibility", active: false },
    { label: "Choose Courses", active: false },
    { label: "Upload Docs", active: false },
    { label: "Apply", active: false },
    { label: "Track Offers", active: false },
  ];

  return (
    <div className="min-h-screen bg-bg-soft">
      <Navigation />

      {/* Hero Section - Blue Background */}
      <div className="w-full bg-primary-blue pt-12 pb-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[134px]">
          <h1 className="text-white text-center text-[32px] font-bold mb-2">
            Welcome back, Lachlan!
          </h1>
          <p className="text-white text-center text-[13px] font-normal mb-8">
            Let's continue planning your path to University. You're doing great!
          </p>

          {/* Search Button */}
          <div className="flex justify-center">
            <Link
              to="/course-finder"
              className="flex items-center gap-2 px-3 py-2 bg-primary-blue rounded border border-white/20 shadow-[0_4px_8px_3px_rgba(0,0,0,0.15),0_1px_3px_0_rgba(0,0,0,0.30)] hover:bg-blue-600 transition-colors w-[258px] h-12"
            >
              <Search className="w-8 h-8 text-bg-soft" />
              <span className="text-bg-soft text-sm font-medium">Find Your Perfect Course</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[134px] -mt-16 relative z-10">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="flex items-start gap-3 p-4 bg-bg-soft border-2 border-[#B3D8FF] rounded-xl shadow-[0_0_14px_0_rgba(49,133,252,0.15)]">
            <div className="w-8 h-8 rounded-full bg-[#28C76F] flex-shrink-0 mt-3" />
            <div>
              <div className="text-2xl font-bold text-[#1A1A1A]">{wishlist.length}</div>
              <div className="text-base text-[#1A1A1A]">Courses Saved</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-bg-soft border-2 border-[#B3D8FF] rounded-xl shadow-[0_0_14px_0_rgba(49,133,252,0.15)]">
            <div className="w-8 h-8 rounded-full bg-[#F04438] flex-shrink-0 mt-3" />
            <div>
              <div className="text-2xl font-bold text-[#1A1A1A]">0</div>
              <div className="text-base text-[#1A1A1A]">Upcoming Deadlines</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-bg-soft border-2 border-[#B3D8FF] rounded-xl shadow-[0_0_14px_0_rgba(49,133,252,0.15)]">
            <div className="w-8 h-8 rounded-full bg-[#FFE55C] flex-shrink-0 mt-3" />
            <div>
              <div className="text-2xl font-bold text-[#1A1A1A]">1/6</div>
              <div className="text-base text-[#1A1A1A]">Steps Completed</div>
            </div>
          </div>
        </div>

        {/* Application Journey */}
        <div className="bg-bg-soft border border-[#B3D8FF] rounded-2xl p-6 mb-12 shadow-[0_0_15px_0_rgba(49,133,252,0.15)]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
            <div>
              <h2 className="text-[33px] font-bold text-black mb-1">Your Application Journey</h2>
              <p className="text-[18px] text-[#777]">Track your progress through each step</p>
            </div>
            <div className="mt-4 lg:mt-0">
              <div className="text-[33px] font-bold text-primary-blue">17%</div>
              <div className="text-[18px] text-[#777]">Complete</div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mt-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              {journeySteps.map((step, index) => (
                <div key={index} className="flex items-center gap-2 flex-1 w-full lg:w-auto">
                  <div className="flex flex-col items-center gap-1 min-w-[110px]">
                    {step.active ? (
                      <div className="w-[52px] h-[52px] rounded-full bg-primary-blue flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xl font-bold">1</span>
                      </div>
                    ) : (
                      <svg width="52" height="52" viewBox="0 0 52 52" fill="none" className="flex-shrink-0">
                        <circle cx="26" cy="26" r="24.5" fill="#B3D8FF" stroke="#F5F9FF" strokeWidth="3" />
                        <path
                          d="M21 26V21C21 19.34 21.66 17.8 22.83 16.63C24 15.45 25.52 14.79 27.18 14.79C28.84 14.79 30.36 15.45 31.53 16.63C32.7 17.8 33.37 19.34 33.37 21V26M18.5 26H35.87C37.25 26 38.37 27.18 38.37 28.56V37.33C38.37 38.71 37.25 39.83 35.87 39.83H18.5C17.17 39.83 16.05 38.71 16.05 37.33V28.56C16.05 27.18 17.17 26 18.5 26Z"
                          stroke="#F5F9FF"
                          strokeWidth="2.73"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    <div className="text-[18px] text-primary-blue text-center whitespace-nowrap">{step.label}</div>
                  </div>
                  {index < journeySteps.length - 1 && (
                    <div className="hidden lg:block flex-1 h-[3px] bg-[#B3D8FF] opacity-25 rounded-full mx-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Jump into it! Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-black mb-6">Jump into it!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {actionCards.map((card, index) => (
              <Link
                key={index}
                to={card.path}
                className="group flex flex-col gap-4 p-6 bg-bg-soft border-2 border-[#B3D8FF] rounded-xl hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-full bg-primary-blue flex-shrink-0" />
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path
                      d="M12 8.5L19.5 16L12 23.5"
                      stroke="#6E7491"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#1A1A1A] text-center">{card.title}</h3>
                <p className="text-[13px] text-[#777] whitespace-pre-line">{card.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
