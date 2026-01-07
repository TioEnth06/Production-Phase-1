import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VaultCardProps {
  name: string;
  deposited: string;
  tvl: string;
  apy: string;
  earnings: string;
  riskLevel: "Standard" | "Medium" | "High";
}

const VaultCard = ({ name, deposited, tvl, apy, earnings, riskLevel }: VaultCardProps) => {
  return (
    <div className="group rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-card-hover hover:border-primary/20">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <span className="text-lg font-bold text-primary">∞</span>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{name}</h4>
            <p className="text-sm text-muted-foreground">{deposited} deposited</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          Manage
        </Button>
      </div>

      {/* Stats */}
      <div className="mt-5 grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-muted-foreground">TVL</p>
          <p className="mt-1 text-lg font-semibold text-foreground">{tvl}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">APY</p>
          <p className="mt-1 text-lg font-semibold text-foreground">{apy}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Earnings</p>
          <p className="mt-1 text-lg font-semibold text-foreground">{earnings}</p>
        </div>
      </div>

      {/* Risk Badge */}
      <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
        <ShieldCheck className="h-3.5 w-3.5" />
        <span>{riskLevel} risk</span>
      </div>
    </div>
  );
};

export default VaultCard;
