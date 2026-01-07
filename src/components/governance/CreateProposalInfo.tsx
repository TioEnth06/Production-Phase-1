import { useEffect, useRef } from "react";
import { Coins, ShieldCheck, Zap } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const infoItems = [
  {
    icon: Coins,
    title: "Any Token Holder Can Propose",
    description: "Minimum 1,000 NANO tokens required",
  },
  {
    icon: ShieldCheck,
    title: "SPV Review Recommended",
    description: "Increases credibility and approval rate",
  },
  {
    icon: Zap,
    title: "On-Chain Execution",
    description: "Passed proposals execute automatically",
  },
];

export function CreateProposalInfo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = itemsRef.current?.children;
    if (!items) return;

    const ctx = gsap.context(() => {
      // Animate container
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Stagger animate items
      gsap.fromTo(
        Array.from(items),
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: itemsRef.current,
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
    <div ref={containerRef} className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-foreground">Creating Proposals</h3>
      <div ref={itemsRef} className="space-y-4">
        {infoItems.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <item.icon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

