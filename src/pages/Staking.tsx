import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import StakingHero from "@/components/staking/StakingHero";
import StakingOverviewCard from "@/components/staking/StakingOverviewCard";
import VaultsSection from "@/components/staking/VaultsSection";
import FAQSection from "@/components/staking/FAQSection";

const Staking = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar activePage="staking" />
      <main className="p-6">
        <div className="max-w-[1400px] mx-auto space-y-6">
          <StakingHero />
          <StakingOverviewCard />
          <VaultsSection />
          <FAQSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Staking;

