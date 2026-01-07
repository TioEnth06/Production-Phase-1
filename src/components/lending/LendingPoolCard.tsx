import { useEffect, useRef } from "react";
import { Shield, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface LendingPoolCardProps {
  name: string;
  status: "low risk" | "medium risk" | "high risk";
  poolId: string;
  fixedTerm: string;
  collateralCoverage: string;
  apr: string;
  totalLiquidity: string;
  availableLiquidity: string;
  loanRange: string;
  activeLoans: number;
  utilization: number;
  className?: string;
  animationDelay?: number;
}

const statusColors = {
  "low risk": "bg-success/10 text-success",
  "medium risk": "bg-warning/10 text-warning",
  "high risk": "bg-destructive/10 text-destructive",
};

export function LendingPoolCard({
  name,
  status,
  poolId,
  fixedTerm,
  collateralCoverage,
  apr,
  totalLiquidity,
  availableLiquidity,
  loanRange,
  activeLoans,
  utilization,
  className,
  animationDelay = 0,
}: LendingPoolCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
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
    <div 
      ref={cardRef}
      className={cn(
        "rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md",
        className
      )}
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground">{name}</h3>
              <span className={cn(
                "rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                statusColors[status]
              )}>
                {status}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Designed for established patents with stable licensing revenue and longer-term horizons.
            </p>
          </div>
        </div>
      </div>

      {/* Pool Info Tags */}
      <div className="mb-4 flex flex-wrap gap-2">
        <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
          Pool ID: {poolId}
        </span>
        <span className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          Fixed term: {fixedTerm}
        </span>
        <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
          Min. collateral coverage {collateralCoverage}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="mb-4 grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-muted-foreground">APR</p>
          <p className="mt-1 text-lg font-semibold text-foreground">{apr}</p>
          <p className="text-xs text-muted-foreground">Fixed, No origination fee</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Total liquidity</p>
          <p className="mt-1 text-lg font-semibold text-foreground">{totalLiquidity}</p>
          <p className="text-xs text-primary">Available now: {availableLiquidity}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Loan range</p>
          <p className="mt-1 text-lg font-semibold text-foreground">{loanRange}</p>
          <p className="text-xs text-muted-foreground">Active loans: {activeLoans}</p>
        </div>
      </div>

      {/* Utilization Bar */}
      <div className="mb-4">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Pool Utilization</span>
          <span className="text-xs font-medium text-primary">{utilization}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
            style={{ width: `${utilization}%` }}
          />
        </div>
      </div>

      {/* Action */}
      <div className="flex justify-end">
        <Button size="sm" className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90">
          Apply Now
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

