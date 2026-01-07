import { Search, LayoutDashboard, Wallet, Vote, HandCoins, ChevronDown, Bell, Plus, Menu, X, LogOut, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDevice } from "@/hooks/use-device";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  hasSubmenu?: boolean;
  href?: string;
}

interface NavItemWithDialogProps extends NavItemProps {
  onComingSoon?: () => void;
}

const NavItem = ({ icon, label, active, hasSubmenu, href = "#", onComingSoon }: NavItemWithDialogProps) => {
  const baseClasses = "flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap";
  const activeClasses = active ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground";

  const content = (
    <>
      {icon}
      <span>{label}</span>
      {hasSubmenu && <ChevronDown className="w-3 h-3" />}
    </>
  );

  const handleClick = (e: React.MouseEvent) => {
    if (onComingSoon) {
      e.preventDefault();
      onComingSoon();
    }
  };

  if (href && href !== "#" && !onComingSoon) {
    return (
      <Link to={href} className={cn(baseClasses, activeClasses)}>
        {content}
      </Link>
    );
  }

  return (
    <button className={cn(baseClasses, activeClasses)} onClick={handleClick}>
      {content}
    </button>
  );
};

interface NavbarProps {
  activePage?: "overview" | "vault" | "lending" | "governance";
}

export const Navbar = ({ activePage = "overview" }: NavbarProps) => {
  const { isMobile, isTablet, isDesktop } = useDevice();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileMenuOpen(false);
  };

  const navItems: NavItemWithDialogProps[] = [
    { icon: <LayoutDashboard className="w-4 h-4" />, label: "Overview", active: activePage === "overview", href: "/", hasSubmenu: false, onComingSoon: undefined },
    { icon: <Wallet className="w-4 h-4" />, label: "Vault", active: activePage === "vault", href: "/vault", hasSubmenu: false, onComingSoon: undefined },
    { icon: <HandCoins className="w-4 h-4" />, label: "Lending", active: activePage === "lending", href: "/lending", hasSubmenu: false, onComingSoon: undefined },
    { icon: <Vote className="w-4 h-4" />, label: "Funding", active: activePage === "governance", href: "/governance", hasSubmenu: false, onComingSoon: undefined },
    ...(isAuthenticated && user?.role === "spv" ? [
      { icon: <FileText className="w-4 h-4" />, label: "SPV Dashboard", active: activePage === "spv", href: "/spv", hasSubmenu: false, onComingSoon: undefined }
    ] : []),
  ];

  return (
    <header className="h-14 md:h-16 bg-card border-b border-border sticky top-0 z-50">
      <div className="h-full max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 flex items-center justify-between gap-2 md:gap-4">
        {/* Left: Logo + Nav + Live Badge + User */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 flex-1 min-w-0">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img 
              src="/nanofi-logo.png" 
              alt="NanoFi Logo" 
              className="h-10 sm:h-12 md:h-14 w-auto object-contain"
              style={{ maxHeight: '56px', maxWidth: '160px' }}
            />
          </Link>

          {/* Desktop & Tablet Navigation - Show above 1340px */}
          <nav className="hidden nav:flex items-center gap-0.5 lg:gap-1 overflow-x-auto scrollbar-hide">
            {navItems.map((item, index) => (
              <NavItem 
                key={index}
                icon={item.icon}
                label={item.label}
                active={item.active}
                hasSubmenu={item.hasSubmenu}
                href={item.href}
                onComingSoon={item.onComingSoon ? () => setComingSoonOpen(true) : undefined}
              />
            ))}
          </nav>

          {/* Live Badge - Show on tablet and desktop */}
          {!isMobile && (
            <span className="badge-live hidden sm:flex flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-slow" />
              LIVE
            </span>
          )}

        </div>

        {/* Right: Actions + Notifications + Mobile Menu */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 flex-shrink-0">
          {/* Search Icon - Mobile & Tablet */}
          {(isMobile || isTablet) && (
            <button className="p-1.5 sm:p-2 rounded-lg hover:bg-muted transition-colors">
              <Search className="w-5 h-5 text-muted-foreground" />
            </button>
          )}

          {/* Live Badge - Mobile only */}
          {isMobile && (
            <span className="badge-live flex flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-slow" />
              <span className="hidden xs:inline">LIVE</span>
            </span>
          )}

          {/* Desktop Actions - Full buttons on desktop, icon-only on tablet */}
          {!isMobile && (
            <>
              {!isAuthenticated ? (
                <Button 
                  variant="ghost" 
                  size={isTablet ? "icon" : "default"}
                  className={cn(
                    "gap-2",
                    isTablet ? "h-9 w-9" : "hidden lg:flex"
                  )}
                  asChild
                >
                  <Link to="/login">
                    {isDesktop && <span>Sign In</span>}
                    {isTablet && <span className="sr-only">Sign In</span>}
                  </Link>
                </Button>
              ) : (
                <Button 
                  variant="ghost" 
                  size={isTablet ? "icon" : "default"}
                  className={cn(
                    "gap-2",
                    isTablet ? "h-9 w-9" : "hidden lg:flex"
                  )}
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-5" />
                  {isDesktop && <span>Logout</span>}
                  {isTablet && <span className="sr-only">Logout</span>}
                </Button>
              )}
              <Button 
                variant="outline" 
                size={isTablet ? "icon" : "default"}
                className={cn(
                  "gap-2",
                  isTablet ? "h-9 w-9" : "hidden lg:flex"
                )}
                asChild
              >
                <Link to="/launchpad">
                  <Wallet className="w-5 h-5" />
                  {isDesktop && <span>Connect Wallet</span>}
                </Link>
              </Button>
              {isAuthenticated && (
                <Button 
                  size={isTablet ? "icon" : "default"}
                  className={cn(
                    "gap-2 bg-primary text-primary-foreground hover:bg-primary/90",
                    isTablet ? "h-9 w-9" : "hidden lg:flex"
                  )}
                  asChild
                >
                  <Link to="/vault/tokenize">
                    <Plus className="w-5 h-5" />
                    {isDesktop && <span>New Vault</span>}
                  </Link>
                </Button>
              )}
            </>
          )}

          {/* Notifications - Always visible */}
          <Button
            variant="ghost"
            size="icon"
            className="p-1.5 sm:p-2 rounded-lg hover:bg-muted transition-colors relative"
            asChild
          >
            <Link to="/notifications">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Link>
          </Button>

          {/* User Avatar - Show on tablet and desktop when authenticated */}
          {!isMobile && isAuthenticated && (
            <div className="hidden sm:flex items-center gap-2 pl-2 md:pl-3 border-l border-border flex-shrink-0">
              <Link to="/profile" className="cursor-pointer">
                <Avatar className="w-7 h-7 md:w-8 md:h-8 hover:opacity-80 transition-opacity">
                  <AvatarImage src="" alt={user?.email || "User"} />
                  <AvatarFallback className="bg-gradient-to-br from-rose-400 to-rose-600 text-primary-foreground text-xs font-medium">
                    {user?.email?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          )}

          {/* Hamburger Menu Toggle - Show below 1340px */}
          <div className="flex nav:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="p-1.5 sm:p-2 rounded-lg hover:bg-muted transition-colors">
                  <Menu className="w-5 h-5 text-muted-foreground" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                <div className="flex flex-col gap-4 mt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Link to="/" className="flex items-center flex-shrink-0" onClick={() => setMobileMenuOpen(false)}>
                      <img 
                        src="/nanofi-logo.png" 
                        alt="NanoFi Logo" 
                        className="h-10 sm:h-12 md:h-14 w-auto object-contain"
                        style={{ maxHeight: '56px', maxWidth: '160px' }}
                      />
                    </Link>
                  </div>
                  
                  {/* Navigation */}
                  <nav className="flex flex-col gap-1">
                    {navItems.map((item, index) => {
                      if (item.onComingSoon) {
                        return (
                          <button
                            key={index}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setComingSoonOpen(true);
                            }}
                            className={cn(
                              "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors w-full text-left",
                              item.active
                                ? "bg-muted text-foreground"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                          >
                            {item.icon}
                            <span>{item.label}</span>
                            {item.hasSubmenu && <ChevronDown className="w-4 h-4 ml-auto" />}
                          </button>
                        );
                      }
                      return (
                        <Link
                          key={index}
                          to={item.href || "#"}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                            item.active
                              ? "bg-muted text-foreground"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                          {item.hasSubmenu && <ChevronDown className="w-4 h-4 ml-auto" />}
                        </Link>
                      );
                    })}
                  </nav>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                    {!isAuthenticated ? (
                      <>
                        <Button variant="ghost" className="w-full gap-2 justify-start" asChild>
                          <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                            Sign In
                          </Link>
                        </Button>
                        <Button variant="outline" className="w-full gap-2 justify-start" asChild>
                          <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                            Sign Up
                          </Link>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button 
                          variant="ghost" 
                          className="w-full gap-2 justify-start text-destructive hover:text-destructive hover:bg-destructive/10" 
                          onClick={handleLogout}
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </Button>
                        <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 justify-start" asChild>
                          <Link to="/vault/tokenize" onClick={() => setMobileMenuOpen(false)}>
                            <Plus className="w-4 h-4" />
                            New Vault
                          </Link>
                        </Button>
                      </>
                    )}
                    <Button variant="outline" className="w-full gap-2 justify-start" asChild>
                      <Link to="/launchpad" onClick={() => setMobileMenuOpen(false)}>
                        <Wallet className="w-4 h-4" />
                        Connect Wallet
                      </Link>
                    </Button>
                    {isAuthenticated && (
                      <Button variant="outline" className="w-full gap-2 justify-start" asChild>
                        <Link to="/notifications" onClick={() => setMobileMenuOpen(false)}>
                          <Bell className="w-4 h-4" />
                          Notifications
                          <span className="ml-auto w-2 h-2 bg-destructive rounded-full" />
                        </Link>
                      </Button>
                    )}
                  </div>

                  {/* User Profile */}
                  {isAuthenticated && (
                    <Link 
                      to="/profile" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 mt-4 pt-4 border-t cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <Avatar className="w-10 h-10">
                        <AvatarImage src="" alt={user?.email || "User"} />
                        <AvatarFallback className="bg-gradient-to-br from-rose-400 to-rose-600 text-primary-foreground text-xs font-medium">
                          {user?.email?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium text-foreground">{user?.email || "User"}</div>
                        <div className="text-xs text-muted-foreground">Patent Verified</div>
                      </div>
                    </Link>
                  )}

                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Coming Soon Dialog */}
      <AlertDialog open={comingSoonOpen} onOpenChange={setComingSoonOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Coming Soon Update</AlertDialogTitle>
            <AlertDialogDescription>
              This feature is currently under development. We're working hard to bring you an amazing experience. Please check back soon!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setComingSoonOpen(false)}>
              Got it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
};
