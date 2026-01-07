import { useEffect, useRef } from "react";
import { FileText, Send, TrendingUp, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: FileText,
    color: "bg-accent/10 text-accent",
    title: "Token Patent",
    description: "Convert your IP into tradeable NFTs",
    action: "Explore More",
  },
  {
    icon: Send,
    color: "bg-accent/10 text-accent",
    title: "Apply for Funding",
    description: "Get funding for your research project",
    action: "Submit Proposal",
  },
  {
    icon: TrendingUp,
    color: "bg-warning/10 text-warning",
    title: "Stake Now",
    description: "Earn rewards by staking your assets",
    action: "View Strategies",
  },
  {
    icon: Store,
    color: "bg-success/10 text-success",
    title: "Explore Market",
    description: "Discover and trade IP-NFTs",
    action: "Browse Marketplace",
  },
];

export const FeatureCards = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = containerRef.current?.children;
    if (!cards) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        Array.from(cards),
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
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
    <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {features.map((feature, index) => (
        <div
          key={index}
          className="stat-card flex flex-col"
        >
          <div className={`w-10 h-10 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
            <feature.icon className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
          <p className="text-sm text-muted-foreground mb-4 flex-1">{feature.description}</p>
          <Button variant="outline" className="w-full text-sm">
            {feature.action}
          </Button>
        </div>
      ))}
    </div>
  );
};
