import { Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const proposals = [
  { id: 1, name: "Carbon Nanofilter", type: "Biotech", prop: "PROP-45", forVotes: 3289, against: 439, apy: "30%", funded: 80 },
  { id: 2, name: "Carbon Nanofilter", type: "Biotech", prop: "PROP-45", forVotes: 3289, against: 439, apy: "30%", funded: 80 },
  { id: 3, name: "Carbon Nanofilter", type: "Biotech", prop: "PROP-45", forVotes: 3289, against: 439, apy: "30%", funded: 80 },
  { id: 4, name: "Carbon Nanofilter", type: "Biotech", prop: "PROP-45", forVotes: 3289, against: 439, apy: "30%", funded: 80 },
  { id: 5, name: "Carbon Nanofilter", type: "Biotech", prop: "PROP-45", forVotes: 3289, against: 439, apy: "30%", funded: 80 },
  { id: 6, name: "Carbon Nanofilter", type: "Biotech", prop: "PROP-45", forVotes: 3289, against: 439, apy: "30%", funded: 80 },
];

// Countdown hook for dummy review
const useCountdown = (initialDays: number, initialHours: number, initialMinutes: number) => {
  const [timeLeft, setTimeLeft] = useState({
    days: initialDays,
    hours: initialHours,
    minutes: initialMinutes,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              } else {
                // Countdown reached zero, reset to initial values for demo
                return {
                  days: initialDays,
                  hours: initialHours,
                  minutes: initialMinutes,
                  seconds: 0,
                };
              }
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [initialDays, initialHours, initialMinutes]);

  return `${timeLeft.days}d, ${timeLeft.hours}h, ${timeLeft.minutes}m`;
};

const CircularProgress = ({ value }: { value: number }) => {
  const circumference = 2 * Math.PI * 16;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative w-8 h-8">
      <svg className="w-8 h-8 -rotate-90" viewBox="0 0 36 36">
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-muted"
          strokeWidth="3"
        />
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-accent"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export const VotingWindow = () => {
  const countdown = useCountdown(5, 12, 36);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current?.children;
    if (!cards) return;

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

      // Stagger animate cards
      gsap.fromTo(
        Array.from(cards),
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
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
    <div ref={containerRef} className="stat-card">
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs text-muted-foreground">Top Governance Proposal</p>
        <Button variant="ghost" className="text-accent gap-1 text-sm h-auto p-0">
          View All
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
      <h3 className="font-semibold text-foreground mb-1">Voting Window</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Total Vault Value <span className="font-semibold text-success">$6.2M</span>
      </p>

      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {proposals.map((proposal, index) => (
          <div
            key={proposal.id}
            className="vote-card w-full"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>Vote ended</span>
              </div>
              <span className="text-xs text-muted-foreground">{countdown}</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 mb-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal to-accent flex items-center justify-center flex-shrink-0">
                <span className="text-xs text-primary-foreground font-medium">CN</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground truncate">{proposal.type}</p>
                <p className="text-sm font-medium text-foreground truncate">{proposal.name}</p>
              </div>
              <span className="text-xs text-muted-foreground rounded-full px-2 py-1 flex-shrink-0" style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}>{proposal.prop}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-6 text-center">
              <div>
                <p className="text-xs text-muted-foreground">For</p>
                <p className="text-sm font-semibold text-foreground">{proposal.forVotes.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Against</p>
                <p className="text-sm font-semibold text-foreground">{proposal.against}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">APY</p>
                <p className="text-sm font-semibold text-success">{proposal.apy}</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2 flex-shrink-0">
                <CircularProgress value={proposal.funded} />
                <div>
                  <p className="text-xs text-muted-foreground">Funded</p>
                  <p className="text-sm font-semibold text-accent">{proposal.funded}%</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                className="text-foreground gap-1 text-sm h-10 flex-shrink-0"
                style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
              >
                Vote Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
