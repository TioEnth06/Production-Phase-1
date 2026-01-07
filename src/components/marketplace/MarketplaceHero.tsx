import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const MarketplaceHero = () => {
  const heroRef = useScrollAnimation({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    start: "top 85%",
  });

  return (
    <div ref={heroRef} className="relative h-40 w-full overflow-hidden rounded-xl">
      {/* Gradient overlay cityscape effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80')] bg-cover bg-center opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
    </div>
  );
};

export default MarketplaceHero;
