import { useEffect, useRef } from "react";
import { Shield, BarChart3, Sliders, Bell, AlertTriangle, AlertOctagon } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const leftFeatures: Feature[] = [
  {
    icon: Shield,
    title: "Secure smart contracts",
    description: "Collateral is protected by continuously audited smart contracts and circuit-breaker mechanisms."
  },
  {
    icon: BarChart3,
    title: "Competitive, transparent rates",
    description: "Access diversified lending pools with real-time APR discovery and clear fee breakdowns."
  },
  {
    icon: Sliders,
    title: "Flexible terms & strategies",
    description: "Blend short-term and long-term credit lines, rebalance automatically, and simulate outcomes before committing."
  }
];

interface LiquidationZone {
  icon: React.ElementType;
  title: string;
  description: string;
  color: "green" | "yellow" | "red";
}

const liquidationZones: LiquidationZone[] = [
  {
    icon: Shield,
    title: "Safe Zone (LTV < 60%)",
    description: "Collateral is secure with comfortable buffer. No liquidation risk under current volatility assumptions.",
    color: "green"
  },
  {
    icon: AlertTriangle,
    title: "Warning Zone (60-75%)",
    description: "Monitor position closely. Consider adding collateral or repaying debt to restore a safety margin.",
    color: "yellow"
  },
  {
    icon: AlertOctagon,
    title: "Critical Zone (> 75%)",
    description: "Liquidation may trigger rapidly during volatility spikes. Automated deleveraging will attempt to reduce exposure, but manual action is strongly recommended.",
    color: "red"
  }
];

const colorStyles = {
  green: "text-success",
  yellow: "text-warning",
  red: "text-destructive"
};

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        container,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
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
    <div ref={containerRef} className="grid gap-6 lg:grid-cols-2">
      {/* Why Choose NanoFi */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-4 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2">
          <h3 className="text-lg font-semibold text-foreground text-center sm:text-left">Why Choose NanoFi Lending?</h3>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground whitespace-nowrap">
            Designed for asset-backed strategies
          </span>
        </div>
        <div className="space-y-4">
          {leftFeatures.map((feature, index) => (
            <div key={index} className="flex gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{feature.title}</h4>
                <p className="mt-0.5 text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Liquidation Protection */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-4 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2">
          <h3 className="text-lg font-semibold text-foreground text-center sm:text-left">Liquidation Protection</h3>
          <div className="flex items-center gap-1.5 rounded-full bg-success/10 px-2 py-0.5 whitespace-nowrap">
            <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse flex-shrink-0" />
            <span className="text-xs font-medium text-success">Active hedging enabled</span>
          </div>
        </div>
        <div className="space-y-4">
          {liquidationZones.map((zone, index) => (
            <div key={index} className="flex gap-3">
              <div className={cn(
                "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg",
                zone.color === "green" ? "bg-success/10" : 
                zone.color === "yellow" ? "bg-warning/10" : "bg-destructive/10"
              )}>
                <zone.icon className={cn("h-4 w-4", colorStyles[zone.color])} />
              </div>
              <div>
                <h4 className={cn("font-medium", colorStyles[zone.color])}>{zone.title}</h4>
                <p className="mt-0.5 text-sm text-muted-foreground">{zone.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
          <Bell className="h-4 w-4 text-primary" />
          <span className="text-xs text-muted-foreground">Real-time alerts via webhooks or email</span>
        </div>
      </div>
    </div>
  );
}

