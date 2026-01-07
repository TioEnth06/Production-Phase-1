import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PatentCardProps {
  title: string;
  patentId: string;
  price: string;
  lastSale: string;
  imageUrl: string;
}

const PatentCard = ({ title, patentId, price, lastSale, imageUrl }: PatentCardProps) => {
  return (
    <div className="group rounded-xl border border-border bg-card overflow-hidden shadow-card transition-all hover:shadow-lg hover:border-primary/30">
      {/* Image */}
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground mb-3">{patentId}</p>

        <div className="flex items-center gap-6 mb-4">
          <div>
            <p className="text-xs text-muted-foreground">Price</p>
            <p className="font-semibold text-primary">{price}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Last Sale</p>
            <p className="font-semibold text-muted-foreground">{lastSale}</p>
          </div>
        </div>

        <Button variant="outline" className="w-full group/btn">
          Buy Now
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export default PatentCard;
