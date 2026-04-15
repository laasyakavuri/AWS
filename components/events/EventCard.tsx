"use client";

import { Clock, MapPin, Users } from "lucide-react";
import type { Event } from "@/lib/data";

const levelColors: Record<string, string> = {
  Beginner: "#10B981",
  Intermediate: "#FBBF24",
  Advanced: "#EF4444",
  "All Levels": "#4DA6FF",
};

const typeColors: Record<Event["type"], string> = {
  Workshop: "#58A6FF",
  Hackathon: "#EF4444",
  "Guest Talk": "#8B5CF6",
  "Study Group": "#3FB950",
  "Community Day": "#FF9900",
};

export default function EventCard({
  event,
  onRSVP,
}: {
  event: Event;
  onRSVP: (event: Event) => void;
}) {
  const seatPercent = (event.registeredSeats / event.totalSeats) * 100;
  const dateObj = new Date(event.date);
  const typeColor = typeColors[event.type] || "#FF9900";

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-elevated p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_70px_rgba(15,21,32,0.14)] hover:border-border-hover">
      {/* Background accent */}
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-[0.05]"
        style={{
          background: `radial-gradient(circle, ${typeColor}, transparent 70%)`,
        }}
      />

      {/* Top badges */}
      <div className="mb-4 flex items-start justify-between">
        <span
          className="rounded-lg px-3 py-1 text-xs font-bold"
          style={{ backgroundColor: `${typeColor}15`, color: typeColor }}
        >
          {event.type}
        </span>
        <div className="flex flex-col items-center rounded-xl border border-border bg-background px-3 py-2">
          <span className="text-[10px] font-bold uppercase text-primary">
            {dateObj.toLocaleDateString("en-US", { month: "short" })}
          </span>
          <span className="text-xl font-bold leading-tight text-text-primary">
            {dateObj.getDate()}
          </span>
        </div>
      </div>

      <h3 className="mb-2 text-base font-semibold leading-tight text-text-primary">
        {event.title}
      </h3>
      <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-text-secondary">
        {event.description}
      </p>

      <div className="mb-3">
        <span
          className="inline-flex items-center gap-1.5 text-xs font-semibold"
          style={{ color: levelColors[event.level] }}
        >
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: levelColors[event.level] }}
          />
          {event.level}
        </span>
      </div>

      <div className="mb-4 space-y-2 text-xs text-text-muted">
        <div className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5" />
          {event.time}
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5" />
          {event.venue}
        </div>
      </div>

      <div className="flex-1" />

      <div className="mb-4">
        <div className="mb-1.5 flex justify-between text-xs">
          <span className="flex items-center gap-1 text-text-muted">
            <Users className="h-3 w-3" />
            {event.registeredSeats}/{event.totalSeats}
          </span>
          <span className="font-medium" style={{ color: typeColor }}>
            {Math.round(seatPercent)}%
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-background">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${seatPercent}%`,
              background: typeColor,
            }}
          />
        </div>
      </div>

      <button
        type="button"
        className="w-full rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200"
        style={{
          backgroundImage: `linear-gradient(90deg, ${typeColor}CC, ${typeColor})`,
          boxShadow: `0 18px 40px ${typeColor}40`,
        }}
        onClick={() => onRSVP(event)}
      >
        RSVP Now
      </button>
    </div>
  );
}
