import { useEffect, useRef } from "react";
import { Store, TrendingUp, Gift, Clock, HelpCircle } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MarketplaceOverviewCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            once: true,
          },
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={cardRef} className="rounded-xl border border-border bg-card p-6 shadow-card">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Store className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Marketplace</h2>
            <p className="text-sm text-muted-foreground">
              Discover and trade IP-NFTs in the NanoFi marketplace.
            </p>
          </div>
        </div>
        <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <HelpCircle className="h-4 w-4" />
          How it works
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Total Deposits */}
        <div className="rounded-lg border border-border bg-background p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Total Deposits</span>
            <div className="flex items-center gap-1 text-xs text-emerald-500">
              <TrendingUp className="h-3 w-3" />
              +3.4%
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">$301.18K</p>
          <p className="text-xs text-muted-foreground mt-1">Across all active vaults</p>
        </div>

        {/* Total Earned */}
        <div className="rounded-lg border border-border bg-background p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Total Earned</span>
            <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
              <Gift className="h-3 w-3" />
              Claimable
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">$2.14K</p>
          <p className="text-xs text-muted-foreground mt-1">Net rewards to date</p>
        </div>

        {/* Projected Annual Yield */}
        <div className="rounded-lg border border-border bg-background p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Projected Annual Yield</span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              Next 12min
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">$25.63K</p>
          <p className="text-xs text-muted-foreground mt-1">Assuming current rates</p>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceOverviewCard;
