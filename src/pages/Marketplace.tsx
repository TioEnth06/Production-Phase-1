import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import MarketplaceHero from "@/components/marketplace/MarketplaceHero";
import MarketplaceOverviewCard from "@/components/marketplace/MarketplaceOverviewCard";
import PatentsSection from "@/components/marketplace/PatentsSection";

const Marketplace = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar activePage="marketplace" />
      <main className="p-6">
        <div className="max-w-[1400px] mx-auto space-y-6">
          <MarketplaceHero />
          <MarketplaceOverviewCard />
          <PatentsSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Marketplace;
