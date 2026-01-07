import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  getVaultApplications,
  updateVaultApplicationStatus,
  VaultApplication,
  initializeDummyData
} from "@/lib/vaultStorage";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, XCircle, FileText, Calendar, Eye, Plus, Filter, ChevronRight, Clock, DollarSign, ArrowDown, ArrowUp, TrendingUp } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SPVSidebar } from "@/components/spv/SPVSidebar";
import { SPVHeader } from "@/components/spv/SPVHeader";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const SPVDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  const [allApplications, setAllApplications] = useState<VaultApplication[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"pending" | "approved" | "rejected">("pending");

  useEffect(() => {
    if (user?.role !== "spv") {
      navigate("/");
      return;
    }
    // Initialize dummy data if no data exists
    initializeDummyData();
    loadApplications();
  }, [user, navigate]);

  const loadApplications = () => {
    const apps = getVaultApplications();
    setAllApplications(apps);
  };

  const filteredApplications = allApplications.filter((app) => {
    let matchesStatus = false;
    if (statusFilter === "pending") {
      matchesStatus = app.status === "pending";
    } else if (statusFilter === "approved") {
      matchesStatus = app.status === "approved";
    } else if (statusFilter === "rejected") {
      matchesStatus = app.status === "rejected";
    }

    if (!matchesStatus) return false;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const searchableText = [
        app.id,
        app.submittedBy,
        app.formData?.patent?.patentTitle || "",
        app.formData?.inventor?.fullName || "",
      ].join(" ").toLowerCase();
      
      return searchableText.includes(query);
    }

    return true;
  });

  const pendingCount = allApplications.filter(app => app.status === "pending").length;
  const approvedCount = allApplications.filter(app => app.status === "approved").length;
  const rejectedCount = allApplications.filter(app => app.status === "rejected").length;
  const totalCount = allApplications.length;

  // Calculate additional stats
  const totalValuation = allApplications.reduce((sum, app) => {
    const valuation = app.formData?.valuation?.proposedValuation || "0";
    const numValue = typeof valuation === "string" 
      ? parseFloat(valuation.replace(/[^0-9.]/g, "")) || 0 
      : valuation || 0;
    return sum + numValue;
  }, 0);

  // Calculate documents count (assuming each application has documents)
  const totalDocuments = allApplications.length * 3; // Approximate
  
  // Calculate this month's approved
  const thisMonthApproved = allApplications.filter(app => {
    if (app.status !== "approved" || !app.reviewedAt) return false;
    const reviewedDate = new Date(app.reviewedAt);
    const now = new Date();
    return reviewedDate.getMonth() === now.getMonth() && reviewedDate.getFullYear() === now.getFullYear();
  }).length;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        container,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const handleApprove = (applicationId: string) => {
    if (!user) return;

    const success = updateVaultApplicationStatus(
      applicationId,
      "approved",
      user.email,
      "Application approved by SPV reviewer"
    );

    if (success) {
      toast({
        title: "Application Approved",
        description: "The vault application has been approved successfully.",
        icon: <CheckCircle2 className="w-5 h-5 text-success" />,
      });
      loadApplications();
    } else {
      toast({
        title: "Error",
        description: "Failed to update application status.",
        variant: "destructive",
      });
    }
  };

  const handleReject = (applicationId: string) => {
    if (!user) return;

    const success = updateVaultApplicationStatus(
      applicationId,
      "rejected",
      user.email,
      "Application rejected by SPV reviewer"
    );

    if (success) {
      toast({
        title: "Application Rejected",
        description: "The vault application has been rejected.",
        variant: "destructive",
      });
      loadApplications();
    } else {
      toast({
        title: "Error",
        description: "Failed to update application status.",
        variant: "destructive",
      });
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    return `about ${Math.floor(diffInSeconds / 31536000)} year${Math.floor(diffInSeconds / 31536000) > 1 ? 's' : ''} ago`;
  };

  if (!user || user?.role !== "spv") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <SPVSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Header */}
        <SPVHeader searchValue={searchQuery} onSearchChange={setSearchQuery} />

        {/* Main Content Area */}
        <main className="flex-1 bg-gray-50">
          <div ref={containerRef} className="p-6">
            <div className="space-y-6">
              {/* Dashboard Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                  <p className="text-sm text-gray-500 mt-1">Manage proposals, vaults, and funding requests</p>
                </div>
                <Button className="gap-2 bg-primary hover:bg-primary/90 w-full sm:w-auto">
                  <Plus className="w-4 h-4" />
                  New Case
                </Button>
              </div>

              {/* Stats Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4" style={{ gap: '16px' }}>
                {/* Pending Cases Card */}
                <Card className="p-4 bg-white border border-gray-200">
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-500">Pending Cases</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-2xl font-bold text-gray-900">{pendingCount}</h3>
                      <div className="flex items-center gap-1 text-xs text-red-600">
                        <ArrowDown className="w-3 h-3" />
                        <span>12%</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">from last month</p>
                  </div>
                </Card>

                {/* Documents to Review Card */}
                <Card className="p-4 bg-white border border-gray-200">
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-500">Documents to Review</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-2xl font-bold text-gray-900">{totalDocuments}</h3>
                    </div>
                    <p className="text-xs text-gray-500">Total documents</p>
                  </div>
                </Card>

                {/* Active Milestones Card */}
                <Card className="p-4 bg-white border border-gray-200">
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-500">Active Milestones</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-2xl font-bold text-gray-900">{approvedCount}</h3>
                    </div>
                    <p className="text-xs text-gray-500">Approved applications</p>
                  </div>
                </Card>

                {/* Funds Managed Card */}
                <Card className="p-4 bg-white border border-gray-200">
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-500">Funds Managed</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-2xl font-bold text-gray-900">
                        ${totalValuation >= 1000000 
                          ? (totalValuation / 1000000).toFixed(1) + "M"
                          : totalValuation >= 1000
                          ? (totalValuation / 1000).toFixed(1) + "K"
                          : totalValuation.toFixed(0)}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <ArrowUp className="w-3 h-3" />
                        <span>8%</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">from last month</p>
                  </div>
                </Card>

                {/* Approved This Month Card */}
                <Card className="p-4 bg-white border border-gray-200">
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-500">Approved This Month</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-2xl font-bold text-gray-900">{thisMonthApproved}</h3>
                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <ArrowUp className="w-3 h-3" />
                        <span>25%</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">from last month</p>
                  </div>
                </Card>

                {/* Pending Escrow Card */}
                <Card className="p-4 bg-white border border-gray-200">
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-500">Pending Escrow</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-2xl font-bold text-gray-900">
                        ${(totalValuation * 0.1).toFixed(1)}M
                      </h3>
                    </div>
                    <p className="text-xs text-gray-500">Awaiting release</p>
                  </div>
                </Card>
              </div>

              {/* Case Management Card */}
              <Card className="border border-gray-200 shadow-sm bg-white">
                <div className="p-6">
                  {/* Header with Filter */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Case Management</h2>
                    <Button variant="outline" size="sm" className="gap-2 border-gray-300 hover:bg-gray-50">
                      <Filter className="w-4 h-4" />
                      Filter
                    </Button>
                  </div>

                  {/* Tabs */}
                  <Tabs 
                    value={statusFilter} 
                    onValueChange={(value) => setStatusFilter(value as typeof statusFilter)}
                    className="w-full"
                  >
                    <TabsList className="inline-flex h-10 items-center justify-center rounded-lg bg-gray-100 p-1 mb-6">
                      <TabsTrigger 
                        value="pending"
                        className={cn(
                          "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-white transition-all",
                          "data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm",
                          "data-[state=inactive]:text-gray-600"
                        )}
                      >
                        Pending ({pendingCount})
                      </TabsTrigger>
                      <TabsTrigger 
                        value="approved"
                        className={cn(
                          "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-white transition-all",
                          "data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm",
                          "data-[state=inactive]:text-gray-600"
                        )}
                      >
                        Active ({approvedCount})
                      </TabsTrigger>
                      <TabsTrigger 
                        value="rejected"
                        className={cn(
                          "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-white transition-all",
                          "data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm",
                          "data-[state=inactive]:text-gray-600"
                        )}
                      >
                        Completed ({rejectedCount})
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value={statusFilter} className="mt-0">
                      {filteredApplications.length === 0 ? (
                        <div className="text-center py-12">
                          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                          <h3 className="text-sm font-medium text-gray-900 mb-1">
                            {statusFilter === "pending" 
                              ? "No Pending Applications"
                              : statusFilter === "approved"
                              ? "No Active Applications"
                              : "No Completed Applications"}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {searchQuery 
                              ? "Try adjusting your search query."
                              : `There are currently no ${statusFilter === "pending" ? "pending" : statusFilter === "approved" ? "active" : "completed"} applications.`}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {filteredApplications.map((application) => {
                            const patentTitle = application.formData?.patent?.patentTitle || "Untitled Patent";
                            const valuation = application.formData?.valuation?.proposedValuation || "N/A";
                            const submittedDate = new Date(application.submittedAt);
                            
                            return (
                              <div
                                key={application.id}
                                className="group p-4 rounded-lg border border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer"
                                onClick={() => {
                                  navigate(`/spv/applications/${application.id}`);
                                }}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1 min-w-0">
                                    {/* Case ID and Type */}
                                    <div className="flex items-center gap-3 mb-2">
                                      <span className="text-xs font-medium text-gray-500">
                                        {application.id}
                                      </span>
                                      <span className="text-xs text-gray-400">•</span>
                                      <span className="text-xs text-gray-500">
                                        Vault Application
                                      </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-base font-semibold text-gray-900 mb-2">
                                      {patentTitle}
                                    </h3>

                                    {/* Details Row */}
                                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                      <span>{application.submittedBy}</span>
                                      {valuation !== "N/A" && (
                                        <>
                                          <span className="text-gray-300">•</span>
                                          <span className="flex items-center gap-1">
                                            <DollarSign className="w-3 h-3" />
                                            {valuation}
                                          </span>
                                        </>
                                      )}
                                    </div>

                                    {/* Metadata Row */}
                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                      <span className="flex items-center gap-1">
                                        <FileText className="w-3 h-3" />
                                        Documents
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {getTimeAgo(application.submittedAt)}
                                      </span>
                                      {application.status === "pending" && (
                                        <span className="text-teal-600 font-medium">
                                          Document Verification
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {/* Arrow Icon */}
                                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0 ml-4" />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SPVDashboard;
