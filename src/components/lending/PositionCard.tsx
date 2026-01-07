import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PositionCardProps {
  tokenIcon: string;
  tokenName: string;
  projectName: string;
  description: string;
  collateral: string;
  collateralApy: string;
  borrowed: string;
  borrowApy: string;
  ltvRatio: number;
  className?: string;
  animationDelay?: number;
}

export function PositionCard({
  tokenIcon,
  tokenName,
  projectName,
  description,
  collateral,
  collateralApy,
  borrowed,
  borrowApy,
  ltvRatio,
  className,
  animationDelay = 0,
}: PositionCardProps) {
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

  const getLtvColor = (ltv: number) => {
    if (ltv < 50) return "text-success";
    if (ltv < 70) return "text-warning";
    return "text-destructive";
  };

  const getLtvBgColor = (ltv: number) => {
    if (ltv < 50) return "bg-success";
    if (ltv < 70) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <div 
      ref={cardRef}
      className={cn(
        "rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md",
        className
      )}
    >
      <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-0">
        {/* Left: Token Info */}
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {tokenIcon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
                {tokenName}
              </span>
              <span className="text-xs text-muted-foreground">{projectName}</span>
            </div>
            <h4 className="mt-1 font-semibold text-foreground">{description}</h4>
            <p className="mt-0.5 text-xs text-muted-foreground">Enterprises are collateralized by IP portfolios</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 text-left md:text-right w-full md:w-auto">
          <div className="pb-4 md:pb-0 border-b md:border-b-0 border-border">
            <p className="text-xs text-muted-foreground">Collateral</p>
            <p className="mt-1 font-semibold text-foreground">{collateral}</p>
            <p className="text-xs text-muted-foreground">Loan APY: <span className="text-primary">{collateralApy}</span></p>
          </div>
          <div className="pb-4 md:pb-0 border-b md:border-b-0 border-border">
            <p className="text-xs text-muted-foreground">Borrowed</p>
            <p className="mt-1 font-semibold text-foreground">{borrowed}</p>
            <p className="text-xs text-muted-foreground">Borrow APY: <span className="text-primary">{borrowApy}</span></p>
          </div>
          <div className="min-w-0 md:min-w-[120px]">
            <div className="flex items-center justify-start md:justify-end gap-2">
              <p className="text-xs text-muted-foreground">LTV Ratio</p>
              <span className={cn("text-sm font-bold", getLtvColor(ltvRatio))}>{ltvRatio}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
              <div 
                className={cn("h-full rounded-full transition-all duration-500", getLtvBgColor(ltvRatio))}
                style={{ width: `${ltvRatio}%` }}
              />
            </div>
            <Button variant="outline" size="sm" className="mt-2 h-7 text-xs">
              Info
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

