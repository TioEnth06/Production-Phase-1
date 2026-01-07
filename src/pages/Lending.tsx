import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StatsCard } from "@/components/lending/StatsCard";
import { LTVCalculator } from "@/components/lending/LTVCalculator";
import { LendingPoolCard } from "@/components/lending/LendingPoolCard";
import { RiskTiersCard } from "@/components/lending/RiskTiersCard";
import { PositionCard } from "@/components/lending/PositionCard";
import { FeaturesSection } from "@/components/lending/FeaturesSection";
import { Wallet, FileCheck, CreditCard, Users, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const stats = [
  { icon: Wallet, value: "$45.M", label: "Total Borrowed" },
  { icon: FileCheck, value: "2", label: "Active Loans" },
  { icon: CreditCard, value: "$850K", label: "Available Credit" },
  { icon: Users, value: "84", label: "Active Lenders" },
];

const lendingPools = [
  {
    name: "Conservative IP Fund",
    status: "low risk" as const,
    poolId: "POOL-001",
    fixedTerm: "12 month",
    collateralCoverage: "1.5x",
    apr: "6.5%",
    totalLiquidity: "$5,200,000",
    availableLiquidity: "$3,600,000",
    loanRange: "$50,000 - $500,000",
    activeLoans: 24,
    utilization: 80,
  },
  {
    name: "Conservative IP Fund",
    status: "low risk" as const,
    poolId: "POOL-001",
    fixedTerm: "12 month",
    collateralCoverage: "1.5x",
    apr: "6.5%",
    totalLiquidity: "$5,200,000",
    availableLiquidity: "$3,600,000",
    loanRange: "$50,000 - $500,000",
    activeLoans: 24,
    utilization: 80,
  },
  {
    name: "Conservative IP Fund",
    status: "low risk" as const,
    poolId: "POOL-001",
    fixedTerm: "12 month",
    collateralCoverage: "1.5x",
    apr: "6.5%",
    totalLiquidity: "$5,200,000",
    availableLiquidity: "$3,100,000",
    loanRange: "$50,000 - $500,000",
    activeLoans: 24,
    utilization: 80,
  },
];

const positions = [
  {
    tokenIcon: "qTEK",
    tokenName: "qTEK",
    projectName: "QUANTUM COMPUTING",
    description: "Quantum Computation R&D Credit Line",
    collateral: "$450,000.00",
    collateralApy: "5.5%",
    borrowed: "$250,000.00",
    borrowApy: "3.5%",
    ltvRatio: 80,
  },
  {
    tokenIcon: "qTEK",
    tokenName: "qTEK",
    projectName: "QUANTUM COMPUTING",
    description: "Quantum Computation R&D Credit Line",
    collateral: "$450,000.00",
    collateralApy: "5.5%",
    borrowed: "$250,000.00",
    borrowApy: "3.5%",
    ltvRatio: 60,
  },
  {
    tokenIcon: "qTEK",
    tokenName: "qTEK",
    projectName: "QUANTUM COMPUTING",
    description: "Quantum Computation R&D Credit Line",
    collateral: "$450,000.00",
    collateralApy: "5.5%",
    borrowed: "$250,000.00",
    borrowApy: "3.5%",
    ltvRatio: 80,
  },
];

const Lending = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar activePage="lending" />
      <main className="p-6">
        <div className="max-w-[1400px] mx-auto space-y-6">
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold text-foreground">Patent-Backed Lending</h1>
              <p className="mt-1 text-muted-foreground">
                Manage, tokenize, and trade your nanotechnology intellectual property portfolio
              </p>
            </div>
            <Button 
              onClick={() => navigate("/lending/request-loan")}
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 w-full md:w-auto"
            >
              <FileText className="h-4 w-4" />
              Request Loan
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <StatsCard
                key={index}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-[300px_1fr] items-start">
            {/* LTV Calculator */}
            <LTVCalculator />

            {/* Available Lending Pools */}
            <div>
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-foreground">Available Lending Pools</h2>
                <p className="text-sm text-muted-foreground">Choose a pool that matches your borrowing needs</p>
              </div>
              <div className="space-y-4">
                {lendingPools.map((pool, index) => (
                  <LendingPoolCard
                    key={index}
                    {...pool}
                    animationDelay={index * 100}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Risk Tiers */}
          <div>
            <RiskTiersCard />
          </div>

          {/* Your Positions */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-foreground">Your Positions</h2>
            <div className="space-y-4">
              {positions.map((position, index) => (
                <PositionCard
                  key={index}
                  {...position}
                  animationDelay={index * 100}
                />
              ))}
            </div>
          </div>

          {/* Features Section */}
          <FeaturesSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Lending;

