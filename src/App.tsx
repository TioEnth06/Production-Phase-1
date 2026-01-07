import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Vault from "./pages/Vault";
import Lending from "./pages/Lending";
import Governance from "./pages/Governance";
// Hidden: Marketplace and Staking
// import Marketplace from "./pages/Marketplace";
// import Staking from "./pages/Staking";
import TokenizePatent from "./pages/TokenizePatent";
import RequestLoan from "./pages/RequestLoan";
import Launchpad from "./pages/Launchpad";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Notifications from "./pages/Notifications";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FundingApplication from "./pages/FundingApplication";
import SPVDashboard from "./pages/SPVDashboard";
import SPVProposals from "./pages/spv/SPVProposals";
import SPVApplicants from "./pages/spv/SPVApplicants";
import SPVFundingRequest from "./pages/spv/SPVFundingRequest";
import SPVApplication from "./pages/spv/SPVApplication";
import SPVApplicationDetail from "./pages/spv/SPVApplicationDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Protected routes */}
              <Route path="/vault" element={<ProtectedRoute><Vault /></ProtectedRoute>} />
              <Route path="/vault/tokenize" element={<ProtectedRoute><TokenizePatent /></ProtectedRoute>} />
              <Route path="/lending" element={<ProtectedRoute><Lending /></ProtectedRoute>} />
              <Route path="/lending/request-loan" element={<ProtectedRoute><RequestLoan /></ProtectedRoute>} />
              <Route path="/governance" element={<ProtectedRoute><Governance /></ProtectedRoute>} />
              <Route path="/governance/funding-application" element={<ProtectedRoute><FundingApplication /></ProtectedRoute>} />
              {/* Hidden: Marketplace and Staking */}
              {/* <Route path="/marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} /> */}
              {/* <Route path="/staking" element={<ProtectedRoute><Staking /></ProtectedRoute>} /> */}
              <Route path="/launchpad" element={<ProtectedRoute><Launchpad /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/profile/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
              <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
              <Route path="/spv" element={<ProtectedRoute><SPVDashboard /></ProtectedRoute>} />
              <Route path="/spv/proposals" element={<ProtectedRoute><SPVProposals /></ProtectedRoute>} />
              <Route path="/spv/applicants" element={<ProtectedRoute><SPVApplicants /></ProtectedRoute>} />
              <Route path="/spv/funding-request" element={<ProtectedRoute><SPVFundingRequest /></ProtectedRoute>} />
              <Route path="/spv/application" element={<ProtectedRoute><SPVApplication /></ProtectedRoute>} />
              <Route path="/spv/applications/:id" element={<ProtectedRoute><SPVApplicationDetail /></ProtectedRoute>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
