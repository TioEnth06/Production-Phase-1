import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StatsCard } from "@/components/lending/StatsCard";
import { DualVerificationSection } from "@/components/governance/DualVerificationSection";
import { ProposalTable } from "@/components/governance/ProposalTable";
import { HowToVote } from "@/components/governance/HowToVote";
import { CreateProposalInfo } from "@/components/governance/CreateProposalInfo";
import { YourPatentsSection } from "@/components/governance/YourPatentsSection";
import { FundingProgressSection } from "@/components/governance/FundingProgressSection";
import { FileText, Vote, Users, ShieldCheck, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const stats = [
  { icon: FileText, value: "154", label: "Total Proposals" },
  { icon: Vote, value: "8", label: "Active Loans" },
  { icon: Users, value: "2,358", label: "DAO Members" },
  { icon: ShieldCheck, value: "84%", label: "SPV Verified" },
];

const Governance = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar activePage="governance" />
      <main className="p-6">
        <div className="max-w-[1400px] mx-auto space-y-6">
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold text-foreground">Commercialization Funding</h1>
              <p className="mt-1 text-muted-foreground">
                Dapatkan pendanaan berbasis paten melalui sistem Expert Review Board (ERB)
              </p>
            </div>
            <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 w-full md:w-auto font-semibold" asChild>
              <Link to="/governance/funding-application">
                Submit Proposal
              </Link>
            </Button>
          </div>

          {/* Your Patents Section */}
          <YourPatentsSection />

          {/* Funding Progress Section */}
          <FundingProgressSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Governance;

