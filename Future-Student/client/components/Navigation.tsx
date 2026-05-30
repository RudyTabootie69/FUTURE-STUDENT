import { Link, useLocation, useNavigate } from "react-router-dom";
import { useProfile } from "@/context/ProfileContext";
import {User, Student, Parent, SecondaryRep, TertiaryRep, isStudent, isParent, isSecStaff, isTertStaff, indigenous, firstInFamily, getUserType} from "@shared/types/user";
export default function Navigation() {
  const location = useLocation();

  const { profile, logout } = useProfile();

  const navItemsStudent = [
    { label: "Home", path: "/home", id:"nav-profile" },
    { label: "Course Finder", path: "/course-finder", id:"nav-course-finder"  },
    { label: "My Wishlist", path: "/wishlist", id:"nav-wishlist" },
    { label: "Calendar", path: "/calendar", id:"nav-calendar" },
    { label: "Profile", path: "/profile", id:"nav-profile" },
  ];

  const navItemsElse = [
    { label: "Home", path: "/home", id:"nav-profile" },
    { label: "Student Tracker", path: "/student-finder", id:"nav-student-finder"  },
    { label: "Calendar", path: "/calendar", id:"nav-calendar" },
    { label: "Profile", path: "/profile", id:"nav-profile" },
  ];


  if(isParent(profile) || isSecStaff(profile) || isTertStaff(profile)){
    return(
    <nav className="w-full bg-bg-soft shadow-[0_2px_10px_0_rgba(49,133,252,0.10)]">
      <div className="w-full flex items-center justify-between px-6 py-2">
        <img
          src="/logos/widelogo.png"
          alt="Logo"
          className="h-[74px] w-[120px] rounded-2xl object-cover"
        />
        <div className="flex items-center gap-4 px-4">

          {navItemsElse.map((item) => {
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
  else {
    return(
    <nav className="w-full bg-bg-soft shadow-[0_2px_10px_0_rgba(49,133,252,0.10)]">
      <div className="w-full flex items-center justify-between px-6 py-2">
        <img
          src="/logos/widelogo.png"
          alt="Logo"
          className="h-[74px] w-[120px] rounded-2xl object-cover"
        />
        <div className="flex items-center gap-4 px-4">

          {navItemsStudent.map((item) => {
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
}
