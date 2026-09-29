import { Bell, Menu, Search } from "lucide-react";
import { useLocation } from "react-router-dom";

const pageInfo = {
  "/": {
    title: "Dashboard",
    subtitle: "Overview of your business",
  },
  "/customers": {
    title: "Customers",
    subtitle: "Manage your customers and their information",
  },
  "/products": {
    title: "Products",
    subtitle: "Manage your products and services",
  },
  "/orders": {
    title: "Orders",
    subtitle: "Manage customer orders and their status",
  },
  "/tasks": {
    title: "Tasks",
    subtitle: "Manage your team's work and deadlines",
  },
  "/settings": {
    title: "Settings",
    subtitle: "Manage your profile and account settings",
  },
};

function Navbar({ onMenuClick }) {
  const location = useLocation();

  const currentPage =
    pageInfo[location.pathname] || {
      title: "BizFlow",
      subtitle: "Business Operations Management",
    };

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white md:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold text-white">
            {currentPage.title}
          </h2>

          <p className="hidden truncate text-xs text-slate-500 sm:block">
            {currentPage.subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          className="text-slate-400 transition hover:text-white"
          aria-label="Search"
        >
          <Search size={20} />
        </button>

        <button
          type="button"
          className="relative text-slate-400 transition hover:text-white"
          aria-label="Notifications"
        >
          <Bell size={20} />

          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-blue-500" />
        </button>

        <div className="flex items-center gap-3 border-l border-slate-800 pl-3 sm:pl-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
            S
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-medium text-white">
              Shahzaib
            </p>

            <p className="text-xs text-slate-500">
              Admin
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;