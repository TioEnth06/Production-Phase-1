import { Search, Bell, User, Settings, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface SPVHeaderProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export function SPVHeader({ searchValue = "", onSearchChange }: SPVHeaderProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const userDisplayName = user?.email 
    ? user.email.split('@')[0].split('.').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
    : "SPV Reviewer";

  const initials = userDisplayName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-gray-200">
      <div className="flex h-full items-center gap-4 px-6">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search cases, documents..."
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="pl-9 h-9 bg-gray-50 border-gray-200 focus:bg-white focus:border-gray-300 rounded-lg"
          />
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3 ml-auto">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative h-9 w-9 text-gray-600 hover:bg-gray-100"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-green-500 border-2 border-white"></span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="gap-3 h-auto py-2 px-3 hover:bg-gray-50"
              >
                <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold text-white">{initials}</span>
                </div>
                <div className="flex flex-col items-start hidden md:flex">
                  <span className="text-sm font-medium text-gray-900 leading-tight">{userDisplayName}</span>
                  <span className="text-xs text-gray-500 leading-tight">SPV Reviewer</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>My Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
