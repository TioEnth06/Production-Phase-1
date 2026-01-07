import { useEffect, useRef } from "react";
import VaultCard from "./VaultCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VaultsSection = () => {
  const vaults = [
    {
      name: "NANO Single-Sided",
      deposited: "20,700 NANO",
      tvl: "$12.40M",
      apy: "15.5%",
      earnings: "$1.25K",
      riskLevel: "Standard" as const,
    },
    {
      name: "NANO Single-Sided",
      deposited: "20,700 NANO",
      tvl: "$12.40M",
      apy: "15.5%",
      earnings: "$1.25K",
      riskLevel: "Standard" as const,
    },
    {
      name: "NANO Single-Sided",
      deposited: "20,700 NANO",
      tvl: "$12.40M",
      apy: "15.5%",
      earnings: "$1.25K",
      riskLevel: "Standard" as const,
    },
    {
      name: "NANO Single-Sided",
      deposited: "20,700 NANO",
      tvl: "$12.40M",
      apy: "15.5%",
      earnings: "$1.25K",
      riskLevel: "Standard" as const,
    },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current?.children;
    if (!cards) return;

    const ctx = gsap.context(() => {
      // Animate section
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Stagger animate cards
      gsap.fromTo(
        Array.from(cards),
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
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
    <section ref={sectionRef}>
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-foreground">Your staking vaults</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage all active positions, yields, and rewards.
        </p>
      </div>

      <div ref={cardsRef} className="grid gap-4 sm:grid-cols-2">
        {vaults.map((vault, index) => (
          <VaultCard key={index} {...vault} />
        ))}
      </div>
    </section>
  );
};

export default VaultsSection;
