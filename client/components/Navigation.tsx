import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Course Finder", path: "/course-finder" },
    { label: "My Wishlist", path: "/wishlist" },
    { label: "Calendar", path: "/calendar" },
    { label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="w-full bg-bg-soft shadow-[0_2px_10px_0_rgba(49,133,252,0.10)]">
      <div className="w-full flex items-center justify-between px-6 py-2">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/4ce197ac521043188bace792d233ddbb851baa51?width=240"
          alt="Logo"
          className="h-[74px] w-[120px] rounded-2xl object-cover"
        />
        <div className="flex items-center gap-4 px-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-2.5 py-2.5 text-sm font-normal transition-colors ${
                  isActive
                    ? "text-primary-blue font-medium"
                    : "text-grey-400 hover:text-primary-blue"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
