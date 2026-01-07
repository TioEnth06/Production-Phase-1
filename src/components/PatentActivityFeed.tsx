import { Search, SlidersHorizontal, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDevice } from "@/hooks/use-device";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const patents = [
  {
    id: "QE-2847",
    title: "Quantum Encryption Protocol",
    owner: "0x742d...4f2e",
    category: "Cybersecurity",
    status: "Tokenized",
    funded: "$250,000",
    time: "5 minutes ago",
  },
  {
    id: "ND-1923",
    title: "Nano Drug Delivery System",
    owner: "0x742d...4f2e",
    category: "Cybersecurity",
    status: "Tokenized",
    funded: "$250,000",
    time: "5 minutes ago",
  },
  {
    id: "BS-4562",
    title: "Bio-sensor Chip Technology",
    owner: "0x742d...4f2e",
    category: "Cybersecurity",
    status: "Tokenized",
    funded: "$250,000",
    time: "5 minutes ago",
  },
];

export const PatentActivityFeed = () => {
  const { width } = useDevice();
  const isSmallScreen = width <= 440;
  const feedRef = useScrollAnimation({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    start: "top 80%",
  });
  
  return (
    <div ref={feedRef} className="stat-card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground">Patent Activity Feed</h3>
          <p className="text-sm text-muted-foreground">Current rates and market performance metrics</p>
        </div>
        <Button variant="ghost" className="text-accent gap-1 text-sm hover:bg-transparent">
          View All
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex flex-row items-center gap-2 sm:gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={isSmallScreen ? "Search Patent..." : "Search Patent by Title, ID or Description"}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-muted rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-accent/30 placeholder:text-muted-foreground"
          />
        </div>
        <Button variant="outline" className="h-10 w-10 p-0 flex-shrink-0">
          <SlidersHorizontal className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {patents.map((patent, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-foreground">
                {patent.title} #{patent.id}
              </h4>
              <span className="text-xs text-muted-foreground">{patent.time}</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-sm">
              <div>
                <p className="text-muted-foreground text-xs mb-1">By</p>
                <p className="font-medium text-foreground break-words">{patent.owner}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-1">Patent Category</p>
                <p className="font-medium text-accent break-words">{patent.category}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-1">Status</p>
                <span className="badge-tokenized inline-flex">
                  <CheckCircle className="w-3 h-3" />
                  {patent.status}
                </span>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-1">Funded</p>
                <p className="font-semibold text-success break-words">{patent.funded}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
