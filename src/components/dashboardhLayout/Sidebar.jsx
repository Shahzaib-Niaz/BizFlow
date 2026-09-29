import {
  CheckSquare,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const navigationItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    name: "Customers",
    icon: Users,
    path: "/customers",
  },
  {
    name: "Products",
    icon: Package,
    path: "/products",
  },
  {
    name: "Orders",
    icon: ShoppingCart,
    path: "/orders",
  },
  {
    name: "Tasks",
    icon: CheckSquare,
    path: "/tasks",
  },
];

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Overlay */}

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col border-r border-slate-800 bg-slate-950 p-4 transition-transform duration-200 md:static md:z-auto md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}

        <div className="mb-8 px-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">
              Biz<span className="text-blue-500">Flow</span>
            </h1>

            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white md:hidden"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Business Operations
          </p>
        </div>

        {/* Navigation */}

        <nav className="flex-1 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Settings */}

        <div className="border-t border-slate-800 pt-4">
          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <Settings size={18} />
            <span>Settings</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;