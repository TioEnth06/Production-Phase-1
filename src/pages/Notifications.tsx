import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  X, 
  Trash2,
  CheckCheck,
  Filter,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type NotificationType = "info" | "success" | "warning" | "error";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

const Notifications = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "success",
      title: "Loan Application Approved",
      message: "Your loan application for $50,000 has been approved. Funds will be transferred within 24 hours.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
      actionUrl: "/lending",
      actionLabel: "View Details",
    },
    {
      id: "2",
      type: "info",
      title: "New Proposal Available",
      message: "A new governance proposal #42 is available for voting. Voting ends in 3 days.",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      read: false,
      actionUrl: "/governance",
      actionLabel: "Vote Now",
    },
    {
      id: "3",
      type: "warning",
      title: "Collateral Value Alert",
      message: "Your IP-NFT collateral value has dropped by 15%. Please review your position.",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      read: true,
      actionUrl: "/profile",
      actionLabel: "View Portfolio",
    },
    {
      id: "4",
      type: "success",
      title: "Staking Rewards Distributed",
      message: "Your staking rewards of 125 NANO tokens have been distributed to your wallet.",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      read: true,
      actionUrl: "/staking",
      actionLabel: "View Rewards",
    },
    {
      id: "5",
      type: "error",
      title: "Transaction Failed",
      message: "Your transaction to transfer 10 NANO tokens failed due to insufficient gas fees.",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      read: true,
    },
    {
      id: "6",
      type: "info",
      title: "Profile Verification Complete",
      message: "Your identity verification has been completed and approved. You now have full access to all features.",
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      read: true,
      actionUrl: "/profile",
      actionLabel: "View Profile",
    },
    {
      id: "7",
      type: "success",
      title: "IP-NFT Listed Successfully",
      message: "Your patent 'Nano Coating Technology' has been successfully listed on the marketplace.",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      read: true,
      actionUrl: "/marketplace",
      actionLabel: "View Listing",
    },
    {
      id: "8",
      type: "info",
      title: "New Message Received",
      message: "You have received a new message regarding your loan application from the lending team.",
      timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
      read: true,
    },
  ]);

  const [activeTab, setActiveTab] = useState<"all" | "unread" | "read">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-warning" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      default:
        return <Info className="w-5 h-5 text-primary" />;
    }
  };

  const getNotificationBadgeColor = (type: NotificationType) => {
    switch (type) {
      case "success":
        return "bg-success/10 text-success border-success/20";
      case "warning":
        return "bg-warning/10 text-warning border-warning/20";
      case "error":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
    return date.toLocaleDateString();
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    toast({
      title: "Notification marked as read",
    });
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast({
      title: "All notifications marked as read",
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast({
      title: "Notification deleted",
    });
  };

  const deleteAllRead = () => {
    setNotifications((prev) => prev.filter((n) => !n.read));
    toast({
      title: "All read notifications deleted",
    });
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "unread") return !notification.read;
    if (activeTab === "read") return notification.read;
    return true;
  });

  const headerRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );

      // Animate actions
      gsap.fromTo(
        actionsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.1,
          scrollTrigger: {
            trigger: actionsRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );

      // Animate tabs
      gsap.fromTo(
        tabsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.2,
          scrollTrigger: {
            trigger: tabsRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );

      // Animate notifications
      const notificationCards = notificationsRef.current?.children;
      if (notificationCards && notificationCards.length > 0) {
        gsap.fromTo(
          Array.from(notificationCards),
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: notificationsRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    });

    return () => {
      ctx.revert();
    };
  }, [filteredNotifications]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar activePage="overview" />
      <main className="p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
              <p className="text-muted-foreground text-sm mt-1">
                Stay updated with your account activity
              </p>
            </div>
          </div>
          
          {/* Actions */}
          <div ref={actionsRef} className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-4 mb-6">
            {unreadCount > 0 && (
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="gap-2">
                  <Bell className="w-3 h-3" />
                  {unreadCount} unread
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={markAllAsRead}
                  className="gap-2"
                >
                  <CheckCheck className="w-4 h-4" />
                  Mark all as read
                </Button>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div ref={tabsRef}>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
              <TabsList className="grid w-full sm:w-auto grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">
                Unread {unreadCount > 0 && `(${unreadCount})`}
              </TabsTrigger>
              <TabsTrigger value="read">Read</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {filteredNotifications.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Bell className="w-12 h-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-center">
                      {activeTab === "unread"
                        ? "No unread notifications"
                        : activeTab === "read"
                        ? "No read notifications"
                        : "No notifications"}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div ref={notificationsRef} className="space-y-3">
                  {filteredNotifications.map((notification) => (
                    <Card
                      key={notification.id}
                      className={cn(
                        "transition-colors",
                        !notification.read && "border-primary/50 bg-primary/5"
                      )}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 mt-0.5">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3
                                    className={cn(
                                      "text-sm font-semibold text-foreground",
                                      !notification.read && "font-bold"
                                    )}
                                  >
                                    {notification.title}
                                  </h3>
                                  {!notification.read && (
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {notification.message}
                                </p>
                                <div className="flex items-center gap-3 flex-wrap">
                                  <span className="text-xs text-muted-foreground">
                                    {formatTimestamp(notification.timestamp)}
                                  </span>
                                  <Badge
                                    variant="outline"
                                    className={cn(
                                      "text-xs",
                                      getNotificationBadgeColor(notification.type)
                                    )}
                                  >
                                    {notification.type}
                                  </Badge>
                                  {notification.actionUrl && notification.actionLabel && (
                                    <Button
                                      variant="link"
                                      size="sm"
                                      className="h-auto p-0 text-xs"
                                      asChild
                                    >
                                      <Link to={notification.actionUrl}>
                                        {notification.actionLabel}
                                      </Link>
                                    </Button>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                {!notification.read && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => markAsRead(notification.id)}
                                    title="Mark as read"
                                  >
                                    <CheckCircle2 className="w-4 h-4" />
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-destructive hover:text-destructive"
                                  onClick={() => deleteNotification(notification.id)}
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
          </div>

          {/* Actions */}
          {filteredNotifications.length > 0 && (
            <div className="flex justify-end gap-2 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={deleteAllRead}
                className="gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete all read
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Notifications;

