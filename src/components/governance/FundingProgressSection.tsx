import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, CheckCircle2, Clock, FileCheck, DollarSign } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

interface ReviewStage {
  name: string;
  progress: number;
  current: number;
  total: number;
  color: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
}

const reviewStages: ReviewStage[] = [
  {
    name: "Technical Review",
    progress: 66.67, // 2/3
    current: 2,
    total: 3,
    color: "bg-blue-500",
    bgColor: "bg-gray-100 dark:bg-gray-800/50",
    textColor: "text-gray-700 dark:text-gray-300",
    icon: <FileCheck className="w-5 h-5" />,
  },
  {
    name: "Legal Review",
    progress: 50, // 1/2
    current: 1,
    total: 2,
    color: "bg-teal-500",
    bgColor: "bg-gray-100 dark:bg-gray-800/50",
    textColor: "text-gray-700 dark:text-gray-300",
    icon: <CheckCircle2 className="w-5 h-5" />,
  },
  {
    name: "Financial Review",
    progress: 0, // 0/2
    current: 0,
    total: 2,
    color: "bg-gray-300",
    bgColor: "bg-gray-100 dark:bg-gray-800/50",
    textColor: "text-gray-700 dark:text-gray-300",
    icon: <DollarSign className="w-5 h-5" />,
  },
];

const selectedPatent = {
  title: "Carbon Nanofiber Composite Material",
  patentId: "US-2024-002456",
};

export function FundingProgressSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const overallProgressRef = useRef<HTMLDivElement>(null);

  const overallProgress = Math.round(
    reviewStages.reduce((sum, stage) => sum + stage.progress, 0) / reviewStages.length
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Animate container
      gsap.fromTo(
        container,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Animate overall progress bar
      if (overallProgressRef.current) {
        const progressBar = overallProgressRef.current.querySelector('.progress-bar-fill') as HTMLElement;
        if (progressBar) {
          gsap.fromTo(
            progressBar,
            { width: "0%" },
            {
              width: `${overallProgress}%`,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: overallProgressRef.current,
                start: "top 85%",
                once: true,
              },
            }
          );
        }
      }

      // Stagger animate stage cards
      const cards = Array.from(cardsRef.current?.children || []);
      if (cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );

        // Animate individual progress bars in cards
        cards.forEach((card) => {
          const progressBar = card.querySelector('.stage-progress-bar') as HTMLElement;
          if (progressBar) {
            const widthValue = progressBar.getAttribute('data-width') || "0%";
            gsap.fromTo(
              progressBar,
              { width: "0%" },
              {
                width: widthValue,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  once: true,
                },
              }
            );
          }
        });
      }
    });

    return () => {
      ctx.revert();
    };
  }, [overallProgress]);

  return (
    <div ref={containerRef} className="bg-card rounded-xl border border-border p-6 shadow-sm">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Funding Progress</h2>
            <div className="space-y-1">
              <p className="font-medium text-foreground">{selectedPatent.title}</p>
              <p className="text-sm text-muted-foreground">{selectedPatent.patentId}</p>
            </div>
          </div>
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
            In Review
          </Badge>
        </div>

        {/* Overall Progress */}
        <div ref={overallProgressRef} className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Overall Progress</span>
            <span className="text-sm font-semibold text-primary">{overallProgress}%</span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="progress-bar-fill h-full bg-gradient-to-r from-blue-500 via-teal-500 to-blue-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Review Stages Grid */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {reviewStages.map((stage, index) => (
          <div
            key={index}
            className="rounded-lg p-4 border border-border/50"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="text-gray-600 dark:text-gray-400 p-2 rounded-lg bg-white/50 dark:bg-black/20">
                {stage.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground">{stage.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {stage.current} of {stage.total} completed
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/50 dark:bg-black/20">
                <div
                  className={`stage-progress-bar h-full ${
                    stage.progress > 0 ? stage.color : 'bg-gray-300'
                  }`}
                  style={{ width: `${stage.progress}%` }}
                  data-width={`${stage.progress}%`}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {Math.round(stage.progress)}%
                </span>
                {stage.current === stage.total && (
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                )}
                {stage.current > 0 && stage.current < stage.total && (
                  <Clock className="w-4 h-4 text-yellow-600" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end pt-4">
        <Button variant="outline" size="sm" className="gap-2" asChild>
          <Link to={`/governance/funding-progress/${selectedPatent.patentId}`}>
            <Eye className="w-4 h-4" />
            View Details
          </Link>
        </Button>
      </div>
    </div>
  );
}
