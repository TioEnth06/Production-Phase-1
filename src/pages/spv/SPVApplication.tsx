import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { SPVSidebar } from "@/components/spv/SPVSidebar";
import { SPVHeader } from "@/components/spv/SPVHeader";

const SPVApplication = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user?.role !== "spv") {
      navigate("/");
      return;
    }
  }, [user, navigate]);

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
        <SPVHeader searchValue="" onSearchChange={() => {}} />

        {/* Main Content Area */}
        <main className="flex-1 bg-gray-50">
          <div ref={containerRef} className="p-6">
            <div className="space-y-6">
              {/* Page Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
                  <p className="text-sm text-gray-500 mt-1">Review and manage all applications</p>
                </div>
                <Button className="gap-2 bg-primary hover:bg-primary/90 w-full sm:w-auto">
                  <Plus className="w-4 h-4" />
                  New Application
                </Button>
              </div>

              {/* Content Card */}
              <Card className="border border-gray-200 shadow-sm bg-white">
                <div className="p-6">
                  <div className="text-center py-12">
                    <p className="text-sm text-gray-500">Application management content will be displayed here.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SPVApplication;


