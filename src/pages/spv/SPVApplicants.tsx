import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Users, Building2, CheckCircle2, Clock, Search, Filter, Plus, Mail, Phone, MapPin, MoreVertical } from "lucide-react";
import { SPVSidebar } from "@/components/spv/SPVSidebar";
import { SPVHeader } from "@/components/spv/SPVHeader";
import { cn } from "@/lib/utils";

interface Applicant {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  status: "active" | "pending";
  cases: number;
  totalFunding: string;
}

const dummyApplicants: Applicant[] = [
  {
    id: "1",
    name: "Sarah Chen",
    company: "TechVenture Inc.",
    email: "sarah@techventure.com",
    phone: "+1 555-0101",
    location: "San Francisco, CA",
    status: "active",
    cases: 3,
    totalFunding: "$2.5M",
  },
  {
    id: "2",
    name: "Michael Torres",
    company: "GreenEnergy Solutions Ltd.",
    email: "michael@greenenergy.com",
    phone: "+1 555-0102",
    location: "Austin, TX",
    status: "active",
    cases: 2,
    totalFunding: "$5.0M",
  },
  {
    id: "3",
    name: "Dr. Emily Watson",
    company: "BioMed Innovations",
    email: "emily@biomed.com",
    phone: "+1 555-0103",
    location: "Boston, MA",
    status: "active",
    cases: 1,
    totalFunding: "$1.8M",
  },
  {
    id: "4",
    name: "James Park",
    company: "SmartProperty Co.",
    email: "james@smartproperty.com",
    phone: "+1 555-0104",
    location: "Seattle, WA",
    status: "active",
    cases: 2,
    totalFunding: "$3.2M",
  },
  {
    id: "5",
    name: "Lisa Anderson",
    company: "InnovateTech Solutions",
    email: "lisa@innovatetech.com",
    phone: "+1 555-0105",
    location: "New York, NY",
    status: "pending",
    cases: 0,
    totalFunding: "$0",
  },
];

const SPVApplicants = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [applicants] = useState<Applicant[]>(dummyApplicants);

  useEffect(() => {
    if (user?.role !== "spv") {
      navigate("/");
      return;
    }
  }, [user, navigate]);

  const filteredApplicants = applicants.filter((applicant) => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return (
        applicant.name.toLowerCase().includes(query) ||
        applicant.company.toLowerCase().includes(query) ||
        applicant.email.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const totalApplicants = applicants.length;
  const companies = new Set(applicants.map(a => a.company)).size;
  const active = applicants.filter(a => a.status === "active").length;
  const pendingVerification = applicants.filter(a => a.status === "pending").length;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 3);
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
                  <h1 className="text-2xl font-bold text-gray-900">Applicants</h1>
                  <p className="text-sm text-gray-500 mt-1">Manage applicant profiles and contact information</p>
                </div>
                <Button className="gap-2 bg-primary hover:bg-primary/90 w-full sm:w-auto">
                  <Plus className="w-4 h-4" />
                  Add Applicant
                </Button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-4 bg-white border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-500">Total Applicants</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">{totalApplicants}</h3>
                    </div>
                    <Users className="w-8 h-8 text-gray-400" />
                  </div>
                </Card>

                <Card className="p-4 bg-white border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-500">Companies</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">{companies}</h3>
                    </div>
                    <Building2 className="w-8 h-8 text-gray-400" />
                  </div>
                </Card>

                <Card className="p-4 bg-white border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-500">Active</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">{active}</h3>
                    </div>
                    <CheckCircle2 className="w-8 h-8 text-gray-400" />
                  </div>
                </Card>

                <Card className="p-4 bg-white border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-500">Pending Verification</p>
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">{pendingVerification}</h3>
                    </div>
                    <Clock className="w-8 h-8 text-gray-400" />
                  </div>
                </Card>
              </div>

              {/* Search and Filter */}
              <Card className="border border-gray-200 shadow-sm bg-white">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Applicant Management</h2>
                    <Button variant="outline" size="sm" className="gap-2 border-gray-300 hover:bg-gray-50">
                      <Filter className="w-4 h-4" />
                      Filter
                    </Button>
                  </div>

                  {/* Search Bar */}
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search applicants..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-gray-300"
                    />
                  </div>

                  {/* Applicant Grid */}
                  {filteredApplicants.length === 0 ? (
                    <div className="text-center py-12">
                      <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <h3 className="text-sm font-medium text-gray-900 mb-1">No Applicants Found</h3>
                      <p className="text-sm text-gray-500">
                        {searchQuery ? "Try adjusting your search query." : "There are currently no applicants."}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredApplicants.map((applicant) => (
                        <Card
                          key={applicant.id}
                          className="p-4 bg-white border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-12 h-12">
                                <AvatarFallback className="bg-teal-500 text-white font-semibold">
                                  {getInitials(applicant.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold text-gray-900">{applicant.name}</h3>
                                <p className="text-sm text-gray-500">{applicant.company}</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>

                          {/* Status Badge */}
                          <div className="mb-4">
                            {applicant.status === "active" ? (
                              <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                                Pending Verification
                              </span>
                            )}
                          </div>

                          {/* Contact Info */}
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span className="truncate">{applicant.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span>{applicant.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span>{applicant.location}</span>
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                            <div className="text-sm">
                              <span className="text-gray-500">Cases</span>
                              <span className="font-semibold text-gray-900 ml-2">{applicant.cases}</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-500">Total Funding</span>
                              <span className="font-semibold text-gray-900 ml-2">{applicant.totalFunding}</span>
                            </div>
                          </div>
                        </Card>
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

export default SPVApplicants;


