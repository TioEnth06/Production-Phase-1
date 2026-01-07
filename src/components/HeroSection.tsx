import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const stats = [
  { value: "$45.M", label: "Ecosystem TVL" },
  { value: "$28.7M", label: "IP-NFT Value" },
  { value: "$8.9M", label: "Lending Pool" },
  { value: "$7.6M", label: "Staked Assets" },
];

export const HeroSection = () => {
  const heroRef = useScrollAnimation({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    start: "top 85%",
  });

  return (
    <div ref={heroRef} className="relative overflow-hidden rounded-2xl hero-gradient p-4 sm:p-6 md:p-8 text-primary-foreground min-h-fit">
      {/* Abstract shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-30">
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-gradient-to-br from-teal/40 to-transparent blur-3xl" />
        <div className="absolute top-20 right-32 w-48 h-48 rounded-full bg-gradient-to-br from-accent/30 to-transparent blur-2xl" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 py-4 md:py-0">
        <div className="max-w-md w-full md:w-auto text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
            Transforming Scientific<br />IP into Investable Assets
          </h2>
          <p className="text-primary-foreground/70 mb-6 text-sm leading-relaxed">
            Tokenize, trade, and monetize cutting-edge nanotechnology intellectual property on the world's fastest blockchain.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Button variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              Explore Patents
            </Button>
            <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 gap-2">
              Learn More
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="bg-navy-light/50 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-primary-foreground/10 w-full flex-1">
          <p className="text-2xl font-semibold text-white mb-1">Ecosystem TVL</p>
          <p className="text-sm font-medium text-primary-foreground/80 mb-4">Total ValueLocker</p>
          <div className="grid grid-cols-2 gap-2">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4 h-[98px] flex flex-col justify-center gap-2">
                <p className="text-2xl font-bold text-primary-foreground">{stat.value}</p>
                <p className="text-xs text-primary-foreground/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
