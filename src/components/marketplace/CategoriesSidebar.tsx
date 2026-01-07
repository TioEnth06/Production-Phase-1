import { cn } from "@/lib/utils";

interface Category {
  name: string;
  count?: number;
}

interface CategoriesSidebarProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoriesSidebar = ({ categories, activeCategory, onCategoryChange }: CategoriesSidebarProps) => {
  return (
    <div className="w-48 shrink-0">
      <h3 className="font-semibold text-foreground mb-3">Categories</h3>
      <div className="space-y-1">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onCategoryChange(category.name)}
            className={cn(
              "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
              activeCategory === category.name
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <span>{category.name}</span>
            {category.count !== undefined && (
              <span className="text-xs">{category.count}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSidebar;
