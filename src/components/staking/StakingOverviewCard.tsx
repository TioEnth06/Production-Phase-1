import { useEffect, useRef } from "react";
import { TrendingUp, Clock, HelpCircle, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const StakingOverviewCard = () => {
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
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Your staking overview</h3>
            <p className="text-sm text-muted-foreground">
              Passively get yield using NanoFi's Staking Vaults.
            </p>
          </div>
        </div>
        <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <HelpCircle className="h-4 w-4" />
          How it works
        </button>
      </div>

      {/* Stats Grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {/* Total Deposits */}
        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Deposits</span>
            <span className="flex items-center gap-1 text-xs font-medium text-success">
              <TrendingUp className="h-3 w-3" />
              +3.4%
            </span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-foreground">$301.18K</p>
          <p className="mt-1 text-xs text-muted-foreground">Across all active vaults</p>
        </div>

        {/* Total Earned */}
        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Earned</span>
            <Button variant="success" size="sm" className="h-6 px-2 text-xs">
              Claimable
            </Button>
          </div>
          <p className="mt-2 text-2xl font-semibold text-foreground">$2.14K</p>
          <p className="mt-1 text-xs text-muted-foreground">Net rewards to date</p>
        </div>

        {/* Projected Yield */}
        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Projected Annual Yield</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              Next 12min
            </span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-foreground">$25.63K</p>
          <p className="mt-1 text-xs text-muted-foreground">Assuming current rates</p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" />
          <span className="text-sm text-muted-foreground">Last 30 days performance</span>
          <span className="text-sm font-medium text-success">+$418 realized</span>
          <span className="text-sm text-muted-foreground">+7.1% average APY</span>
        </div>
        <button className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          View full analytics
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default StakingOverviewCard;
