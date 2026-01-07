import { Search, CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Proposal {
  id: number;
  title: string;
  subtitle: string;
  voted: boolean;
  status: "completed" | "minted" | "pending";
  result: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

const proposals: Proposal[] = [
  {
    id: 1,
    title: "Reduce Platform Fees by...",
    subtitle: "Standard DAO Proposal",
    voted: true,
    status: "completed",
    result: "$450,000",
    startDate: "25 November 2025",
    startTime: "07:00 AM",
    endDate: "25 November 2025",
    endTime: "07:00 AM",
  },
  {
    id: 2,
    title: "Fund Quantum Computin...",
    subtitle: "Option Voting Proposal",
    voted: true,
    status: "minted",
    result: "$450,000",
    startDate: "25 November 2025",
    startTime: "07:00 AM",
    endDate: "25 November 2025",
    endTime: "07:00 AM",
  },
  {
    id: 3,
    title: "Add New Category: Clima...",
    subtitle: "Standard DAO Proposal",
    voted: true,
    status: "minted",
    result: "$450,000",
    startDate: "25 November 2025",
    startTime: "07:00 AM",
    endDate: "25 November 2025",
    endTime: "07:00 AM",
  },
  {
    id: 4,
    title: "Increase Staking Reward...",
    subtitle: "Standard DAO Proposal",
    voted: true,
    status: "minted",
    result: "$450,000",
    startDate: "25 November 2025",
    startTime: "07:00 AM",
    endDate: "25 November 2025",
    endTime: "07:00 AM",
  },
];

const statusStyles = {
  completed: {
    bg: "bg-success/10",
    text: "text-success",
    icon: CheckCircle2,
    label: "Completed",
  },
  minted: {
    bg: "bg-primary/10",
    text: "text-primary",
    icon: Clock,
    label: "Minted",
  },
  pending: {
    bg: "bg-warning/10",
    text: "text-warning",
    icon: Clock,
    label: "Pending",
  },
};

export function ProposalTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const tbodyRef = useRef<HTMLTableSectionElement>(null);

  const filteredProposals = proposals.filter(
    (proposal) =>
      proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const rows = tbodyRef.current?.children;
    if (!rows) return;

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

      // Stagger animate rows
      gsap.fromTo(
        Array.from(rows),
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: tbodyRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, [filteredProposals]);

  return (
    <div ref={containerRef} className="rounded-xl border border-border bg-card shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-5">
        <h2 className="text-lg font-semibold text-foreground">Proposal</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search Proposal"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-64 rounded-lg border border-border bg-background pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">No</th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Title</th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Voted</th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Result</th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Start</th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">End</th>
            </tr>
          </thead>
          <tbody ref={tbodyRef} className="divide-y divide-border">
            {filteredProposals.map((proposal) => {
              const StatusIcon = statusStyles[proposal.status].icon;
              return (
                <tr
                  key={proposal.id}
                  className="transition-colors hover:bg-muted/30"
                >
                  <td className="whitespace-nowrap px-5 py-4 text-sm text-muted-foreground">
                    {proposal.id}.
                  </td>
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">{proposal.title}</p>
                      <p className="text-xs text-muted-foreground">{proposal.subtitle}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    {proposal.voted && (
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span className="text-sm text-foreground">Yes</span>
                      </div>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                      statusStyles[proposal.status].bg,
                      statusStyles[proposal.status].text
                    )}>
                      <StatusIcon className="h-3.5 w-3.5" />
                      {statusStyles[proposal.status].label}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-foreground">
                      <TrendingUp className="h-4 w-4 text-success" />
                      {proposal.result}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <div>
                      <p className="text-sm text-foreground">{proposal.startDate}</p>
                      <p className="text-xs text-muted-foreground">{proposal.startTime}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <div>
                      <p className="text-sm text-foreground">{proposal.endDate}</p>
                      <p className="text-xs text-muted-foreground">{proposal.endTime}</p>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

