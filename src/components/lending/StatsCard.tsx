import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StatsCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  iconBgColor?: string;
  className?: string;
}

export function StatsCard({ icon: Icon, value, label, iconBgColor = "bg-primary/10", className }: StatsCardProps) {
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
    <div ref={cardRef} className={cn(
      "rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md",
      className
    )}>
      <div className={cn("mb-4 flex h-10 w-10 items-center justify-center rounded-lg", iconBgColor)}>
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

