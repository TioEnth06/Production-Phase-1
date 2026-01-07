import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function DualVerificationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current?.children;
    if (!cards) return;

    const ctx = gsap.context(() => {
      // Animate title
      gsap.fromTo(
        containerRef.current?.querySelector("h2"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: containerRef.current,
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
          stagger: 0.2,
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
    <div ref={containerRef} className="mb-8 rounded-xl bg-transparent p-0">
      <div className="mb-8 text-center">
        <h2 className="text-xl font-semibold text-foreground">Dual Verification System</h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
          NanoFi employs a unique dual verification governance model combining expert SPV (Special Purpose Vehicle) review with community DAO voting. This ensures nanotech proposals are both technically sound and community-approved.
        </p>
      </div>

      <div ref={cardsRef} className="flex flex-col md:flex-row gap-4 mx-auto justify-center items-center">
        {/* SPV Review Card */}
        <div className="group rounded-xl border border-border bg-white p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-md w-full max-w-full sm:max-w-sm md:w-[400px]">
          <div className="mb-6 flex h-auto min-h-[200px] items-center justify-center rounded-lg overflow-hidden relative p-4" style={{ backgroundColor: '#F4F4F4' }}>
            <img 
              src="/daocheck.png" 
              alt="SPV Review" 
              className="h-full max-h-[300px] w-auto object-contain rounded-lg"
            />
          </div>
          <h3 className="mb-2 text-center text-lg font-semibold text-foreground">SPV Review</h3>
          <p className="text-center text-sm text-muted-foreground">
            Expert advisors validate technical feasibility, financial viability, and risk assessment before proposals open to community vote.
          </p>
        </div>

        {/* DAO Voting Card */}
        <div className="group rounded-xl border border-border bg-white p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-md w-full max-w-full sm:max-w-sm md:w-[400px]">
          <div className="mb-6 flex h-auto min-h-[200px] items-center justify-center rounded-lg overflow-hidden relative p-4" style={{ backgroundColor: '#F4F4F4' }}>
            <img 
              src="/votingsss.png" 
              alt="DAO Voting" 
              className="h-full max-h-[300px] w-auto object-contain rounded-lg"
            />
          </div>
          <h3 className="mb-2 text-center text-lg font-semibold text-foreground">DAO Voting</h3>
          <p className="text-center text-sm text-muted-foreground">
            Token holders vote on-chain with voting power based on stake and participation. Decisions are executed automatically via smart contracts.
          </p>
        </div>
      </div>
    </div>
  );
}

