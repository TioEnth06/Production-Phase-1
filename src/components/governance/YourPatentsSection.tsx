import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PatentCard {
  id: string;
  title: string;
  patentId: string;
  trl: string;
  status: "not-submitted" | "under-review" | "approved";
  statusLabel: string;
  backgroundImage: string;
}

const mockPatents: PatentCard[] = [
  {
    id: "1",
    title: "Quantum Dot Solar Panel Technology",
    patentId: "US-2024-001234",
    trl: "TRL 6",
    status: "not-submitted",
    statusLabel: "Not Submitted",
    backgroundImage: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "2",
    title: "Carbon Nanofiber Composite Material",
    patentId: "US-2024-002456",
    trl: "TRL 5",
    status: "under-review",
    statusLabel: "Under ERB Review",
    backgroundImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "3",
    title: "Graphene Water Filtration System",
    patentId: "US-2024-003789",
    trl: "TRL 7",
    status: "approved",
    statusLabel: "Approved",
    backgroundImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80",
  },
];

const getStatusBadgeClass = (status: PatentCard["status"]) => {
  switch (status) {
    case "not-submitted":
      return "bg-muted text-muted-foreground";
    case "under-review":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "approved":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export function YourPatentsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = Array.from(cardsRef.current?.children || []);
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      // Animate title
      gsap.fromTo(
        containerRef.current?.querySelector('h2'),
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Stagger animate cards
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
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
    <div ref={containerRef} className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Your Patents (IP-NFTs)</h2>
      
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockPatents.map((patent) => (
          <div
            key={patent.id}
            className="bg-card rounded-xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Card Header with Gradient */}
            <div 
              className="p-6 relative min-h-[160px] bg-cover bg-center overflow-hidden"
              style={{
                backgroundImage: `url('${patent.backgroundImage}')`
              }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/25 to-background/80"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="absolute top-0 right-0">
                  <Badge className={getStatusBadgeClass(patent.status)}>
                    {patent.statusLabel}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground leading-6 overflow-hidden" style={{ 
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  wordBreak: 'break-word'
                }}>
                  {patent.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {patent.patentId}
                </p>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400">
                  {patent.trl}
                </Badge>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                {patent.status === "not-submitted" ? (
                  <Button
                    asChild
                    className="w-full gap-2 bg-primary hover:bg-primary/90"
                  >
                    <Link to="/governance/funding-application">
                      Apply Funding
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    asChild
                  >
                    <Link to={`/governance/funding-progress/${patent.id}`}>
                      <Eye className="w-4 h-4" />
                      View Review Progress
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
