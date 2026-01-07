import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  {
    label: "Current Staking APR",
    value: "24.5%",
    badge: "1,823 Investors",
    badgeColor: "bg-muted text-foreground",
  },
  {
    label: "Lending Interest Rate",
    value: "8.2%",
    badge: "+$340 30 days",
    badgeColor: "bg-success/10 text-success",
  },
  {
    label: "Marketplace Volume (24h)",
    value: "$1.2M",
    badge: "$50K - $2.1M",
    badgeColor: "bg-muted text-foreground",
  },
];

export const YieldOverview = () => {
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
          duration: 0.5,
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
    <div ref={containerRef} className="stat-card">
      <h3 className="font-semibold text-foreground mb-1">Yield & APR Overview</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Current rates and market performance metrics
      </p>

      <div ref={itemsRef} className="space-y-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            style={{ 
              padding: '16px',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              boxShadow: '0 33px 9px 0 rgba(0, 0, 0, 0.00), 0 21px 8px 0 rgba(0, 0, 0, 0.01), 0 12px 7px 0 rgba(0, 0, 0, 0.02), 0 5px 5px 0 rgba(0, 0, 0, 0.03), 0 1px 3px 0 rgba(0, 0, 0, 0.04)'
            }}
          >
            <p className="text-sm text-muted-foreground mb-12">{metric.label}</p>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-foreground">{metric.value}</span>
              <span className={`text-xs font-medium px-2 py-1 rounded-lg ${metric.badgeColor}`}>
                {metric.badge}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
