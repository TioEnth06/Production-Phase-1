import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FileText, Clock, CheckCircle2, AlertTriangle, Search, Filter, Plus, DollarSign, ChevronRight } from "lucide-react";
import { SPVSidebar } from "@/components/spv/SPVSidebar";
import { SPVHeader } from "@/components/spv/SPVHeader";
import { cn } from "@/lib/utils";

interface Proposal {
  id: string;
  title: string;
  company: string;
  amount: string;
  documents: number;
  pendingDocuments: number;
  submittedAt: string;
  status: "pending" | "approved" | "revision-requested";
}

const dummyProposals: Proposal[] = [
  {
    id: "SPV-2024-003",
    title: "BioMed Research Proposal",
    company: "BioMed Innovations",
    amount: "$1.2M",
    documents: 3,
    pendingDocuments: 1,
    submittedAt: "2024-01-15T10:00:00Z",
    status: "revision-requested",
  },
];

const SPVProposals = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [proposals] = useState<Proposal[]>(dummyProposals);

  useEffect(() => {
    if (user?.role !== "spv") {
      navigate("/");
      return;
    }
  }, [user, navigate]);

  const filteredProposals = proposals.filter((proposal) => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return (
        proposal.id.toLowerCase().includes(query) ||
        proposal.title.toLowerCase().includes(query) ||
        proposal.company.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const totalProposals = proposals.length;
  const pendingReview = proposals.filter(p => p.status === "pending").length;
  const approved = proposals.filter(p => p.status === "approved").length;
  const needsRevision = proposals.filter(p => p.status === "revision-requested").length;

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

  const getStatusBadge = (status: Proposal["status"]) => {
    switch (status) {
      case "pending":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
            Pending Review
          </span>
        );
      case "approved":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            Approved
          </span>
        );
      case "revision-requested":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
            Revision Requested
          </span>
        );
    }
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
              {/* Page Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Proposals</h1>
                  <p className="text-sm text-gray-500 mt-1">Review and manage research and project proposals</p>
                </div>
                <Button className="gap-2 bg-primary hover:bg-primary/90 w-full sm:w-auto">
                  <Plus className="w-4 h-4" />
                  New Proposal
                </Button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-4 bg-white border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-500">Total Proposals</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">{totalProposals}</h3>
                    </div>
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                </Card>

                <Card className="p-4 bg-white border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-500">Pending Review</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">{pendingReview}</h3>
                    </div>
                    <Clock className="w-8 h-8 text-gray-400" />
                  </div>
                </Card>

                <Card className="p-4 bg-white border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-500">Approved</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">{approved}</h3>
                    </div>
                    <CheckCircle2 className="w-8 h-8 text-gray-400" />
                  </div>
                </Card>

                <Card className="p-4 bg-white border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-500">Needs Revision</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">{needsRevision}</h3>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-gray-400" />
                  </div>
                </Card>
              </div>

              {/* Search and Filter */}
              <Card className="border border-gray-200 shadow-sm bg-white">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Proposal Management</h2>
                    <Button variant="outline" size="sm" className="gap-2 border-gray-300 hover:bg-gray-50">
                      <Filter className="w-4 h-4" />
                      Filter
                    </Button>
                  </div>

                  {/* Search Bar */}
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search proposals..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-gray-300"
                    />
                  </div>

                  {/* Proposal List */}
                  {filteredProposals.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <h3 className="text-sm font-medium text-gray-900 mb-1">No Proposals Found</h3>
                      <p className="text-sm text-gray-500">
                        {searchQuery ? "Try adjusting your search query." : "There are currently no proposals."}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredProposals.map((proposal) => (
                        <div
                          key={proposal.id}
                          className="group p-4 rounded-lg border border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              {/* ID and Type */}
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-xs font-medium text-gray-500">{proposal.id}</span>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-teal-600 font-medium">Proposal</span>
                              </div>

                              {/* Title */}
                              <h3 className="text-base font-semibold text-gray-900 mb-2">
                                {proposal.title}
                              </h3>

                              {/* Company */}
                              <p className="text-sm text-gray-600 mb-2">{proposal.company}</p>

                              {/* Details Row */}
                              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                <span className="flex items-center gap-1">
                                  <DollarSign className="w-3 h-3" />
                                  {proposal.amount}
                                </span>
                                <span className="text-gray-300">•</span>
                                <span>
                                  {proposal.documents} docs
                                  {proposal.pendingDocuments > 0 && (
                                    <span className="text-orange-600 ml-1">
                                      ({proposal.pendingDocuments} pending)
                                    </span>
                                  )}
                                </span>
                                <span className="text-gray-300">•</span>
                                <span>{getTimeAgo(proposal.submittedAt)}</span>
                              </div>
                            </div>

                            {/* Status Badge and Arrow */}
                            <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                              {getStatusBadge(proposal.status)}
                              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SPVProposals;


