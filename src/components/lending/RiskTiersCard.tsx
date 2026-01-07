import { useEffect, useRef } from "react";
import { Info, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RiskTier {
  name: string;
  color: "green" | "yellow" | "red";
  items: string[];
}

const riskTiers: RiskTier[] = [
  {
    name: "Low Risk",
    color: "green",
    items: [
      "Lower APR (6-7%)",
      "Stricter requirements",
      "Highly-valued collateral",
      "Lower LTV (≤ 70)"
    ]
  },
  {
    name: "Medium Risk",
    color: "yellow",
    items: [
      "Balanced APR (7-10%)",
      "Moderate requirements",
      "Standard LTV (50-60%)",
      "Flexible terms"
    ]
  },
  {
    name: "High Risk",
    color: "red",
    items: [
      "Higher APR (10-15%)",
      "Flexible requirements",
      "Higher LTV (60-70%)",
      "Faster approvals"
    ]
  }
];

const colorStyles = {
  green: {
    bg: "bg-success/10",
    text: "text-success",
    bullet: "bg-success"
  },
  yellow: {
    bg: "bg-warning/10",
    text: "text-warning",
    bullet: "bg-warning"
  },
  red: {
    bg: "bg-destructive/10",
    text: "text-destructive",
    bullet: "bg-destructive"
  }
};

export function RiskTiersCard() {
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
    <div ref={cardRef} className="rounded-xl bg-gradient-to-br from-primary via-primary/90 to-accent p-6 text-primary-foreground shadow-md h-auto md:h-[300px]">
      <div className="mb-6 flex flex-col items-center gap-3 text-center">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-foreground/20">
          <Info className="h-4 w-4 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-primary-foreground">Understanding Risk Tiers</h3>
          <p className="text-xs text-primary-foreground/70">
            Choose the right pool based on your risk tolerance and lending needs
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 place-items-center mx-4 md:mx-20">
        {riskTiers.map((tier) => (
          <div key={tier.name}>
            <h4 className={cn("mb-3 font-medium", colorStyles[tier.color].text)}>
              {tier.name}
            </h4>
            <ul className="space-y-2">
              {tier.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-xs text-primary-foreground/80">
                  <div className={cn(
                    "mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0",
                    colorStyles[tier.color].bullet
                  )} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

