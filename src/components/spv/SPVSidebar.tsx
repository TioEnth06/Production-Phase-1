import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, FileText, Users, DollarSign, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";

interface SPVSidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/spv" },
  { id: "proposal", label: "Proposal", icon: FileText, href: "/spv/proposals" },
  { id: "applicant", label: "Applicant", icon: Users, href: "/spv/applicants" },
  { id: "funding-request", label: "Funding Request", icon: DollarSign, href: "/spv/funding-request" },
  { id: "application", label: "Application", icon: ClipboardList, href: "/spv/application" },
];


export function SPVSidebar({ collapsed = false, onToggleCollapse }: SPVSidebarProps) {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="h-16 px-6 border-b border-gray-200 flex items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center">
            <div className="w-4 h-4 rounded border-2 border-white"></div>
          </div>
          {!collapsed && <span className="text-lg font-semibold text-gray-900">SPV Legal</span>}
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          // For dashboard, match exactly. For other routes, match exact or paths starting with href + "/"
          const isActive = item.href === "/spv" 
            ? location.pathname === item.href
            : location.pathname === item.href || location.pathname.startsWith(item.href + "/");
          
          return (
            <Link
              key={item.id}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-teal-50 text-teal-700"
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <Icon className="w-5 h-5" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

    </aside>
  );
}
