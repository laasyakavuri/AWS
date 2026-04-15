"use client";

import { motion } from "framer-motion";
import { eventCategories } from "@/lib/data";

const categoryColors: Record<string, string> = {
  All: "#94A3B8",
  Workshop: "#58A6FF",
  Hackathon: "#EF4444",
  "Guest Talk": "#8B5CF6",
  "Study Group": "#3FB950",
  "Community Day": "#FF9900",
};

interface EventFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function EventFilters({
  activeFilter,
  onFilterChange,
}: EventFiltersProps) {
  return (
    <div className="mb-10 flex flex-wrap justify-center gap-2">
      {eventCategories.map((cat) => {
        const isActive = activeFilter === cat;
        const color = categoryColors[cat] ?? "#94A3B8";
        return (
          <button
            key={cat}
            onClick={() => onFilterChange(cat)}
            className={`relative overflow-hidden rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
              isActive
                ? "text-text-on-primary"
                : "text-text-muted hover:text-text-primary"
            }`}
            style={{
              borderColor: isActive ? `${color}3d` : "rgba(148,163,184,0.2)",
            }}
          >
            {isActive && (
              <motion.div
                layoutId="eventFilter"
                className="absolute inset-0 rounded-full"
                style={{
                  background: `linear-gradient(135deg, ${color}22, ${color}18, ${color}12)`,
                }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        );
      })}
    </div>
  );
}
