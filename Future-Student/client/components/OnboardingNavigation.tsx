import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function OnboardingNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navItems = [
    { label: "Home", path: "/onboarding/home", id:"nav-home" },
    { label: "Course Finder", path: "/onboarding/course-finder", id:"nav-course-finder"  },
    { label: "My Wishlist", path: "/onboarding/wishlist", id:"nav-wishlist" },
    { label: "Calendar", path: "/onboarding/calendar", id:"nav-calendar" },
    { label: "Profile", path: "/onboarding/profile", id:"nav-profile" },
  ];

  return (
    <nav className="w-full bg-bg-soft shadow-[0_2px_10px_0_rgba(49,133,252,0.10)]">
      <div className="w-full flex items-center justify-between px-6 py-2">
        <img
          src="/logos/widelogo.png"
          alt="Logo"
          className="h-[74px] w-[120px] rounded-2xl object-cover"
        />
        <div className="flex items-center gap-4 px-4">

          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                id = {item.id}
                key={item.path}
                to={item.path}
                className={`px-2.5 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "text-primary-blue font-medium"
                    : "text-grey-400 hover:text-primary-blue font-normal"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <button
            onClick={() => {
              logout();
              navigate("/", { replace: true });
            }}
            className="ml-2 px-3 py-2 text-sm font-medium text-primary-blue border-2 border-primary-blue bg-white rounded-lg hover:bg-gray-50 transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
}
