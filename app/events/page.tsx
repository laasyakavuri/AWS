"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "lucide-react";
import { events } from "@/lib/data";
import { fadeUp } from "@/lib/animations";
import EventFilters from "@/components/events/EventFilters";
import FeaturedEvent from "@/components/events/FeaturedEvent";
import EventCard from "@/components/events/EventCard";
import RSVPModal from "@/components/events/RSVPModal";
import Antigravity from "@/components/effects/Antigravity";
import TextReveal from "@/components/effects/TextReveal";
import type { Event } from "@/lib/data";

export default function EventsPage() {
  const [filter, setFilter] = useState("All");
  const [rsvpEvent, setRsvpEvent] = useState<Event | null>(null);
  const [view, setView] = useState<"upcoming" | "past">("upcoming");

  const featured = events.find((e) => e.isFeatured);
  const filtered = events.filter((e) => {
    if (filter !== "All" && e.type !== filter) return false;
    if (view === "past") return e.isPast;
    return !e.isPast;
  });

  return (
    <div className="relative min-h-screen overflow-hidden pt-24">
      <div className="absolute inset-0">
        <Antigravity
          intensity="strong"
          className="opacity-95 mix-blend-multiply dark:mix-blend-normal"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_28%,transparent_72%,rgba(13,17,23,0.02))] dark:bg-[linear-gradient(180deg,rgba(13,17,23,0.22),transparent_30%,transparent_72%,rgba(13,17,23,0.32))]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <section className="mb-16 py-10 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <motion.span
              className="mb-7 inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-text-secondary backdrop-blur-md dark:border-white/10"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              Events
            </motion.span>

            <div className="relative mx-auto max-w-4xl">
              <div className="pointer-events-none absolute inset-x-10 top-6 h-20 rounded-full bg-accent-blue/10 blur-3xl dark:bg-accent-blue/8" />
              <div className="pointer-events-none absolute inset-x-20 top-0 h-24 rounded-full bg-white/20 blur-3xl dark:bg-white/5" />
              <TextReveal
                text="Upcoming Events & Workshops"
                tag="h1"
                className="relative mx-auto max-w-3xl font-heading text-5xl font-extrabold tracking-[-0.04em] text-text-primary md:text-6xl lg:text-[72px] lg:leading-[0.95]"
              />
            </div>

            <motion.p
              className="mx-auto mt-8 max-w-3xl text-sm leading-7 text-text-secondary md:text-base md:leading-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Learn, build, and grow through hands-on workshops, hackathons, and
              community sessions crafted to make AWS Cloud Club VJIT feel
              active, ambitious, and impossible to ignore.
            </motion.p>
          </div>
        </section>

        {/* Featured Event */}
        {featured && !featured.isPast && (
          <FeaturedEvent event={featured} onRSVP={setRsvpEvent} />
        )}

        {/* Toggle */}
        <div className="mb-8 flex justify-center">
          <div className="relative inline-flex gap-1 rounded-full border border-border bg-surface/70 p-1 backdrop-blur-md">
            {(["upcoming", "past"] as const).map((v) => {
              const isActive = view === v;
              return (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className="relative rounded-full px-5 py-2 text-sm font-medium capitalize text-text-muted transition-colors duration-300 hover:text-text-primary"
                >
                  {isActive && (
                    <motion.div
                      layoutId="viewToggle"
                      className="absolute inset-0 rounded-full bg-primary shadow-[0_12px_32px_rgba(88,101,242,0.18)]"
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 28,
                      }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${isActive ? "text-text-on-primary" : ""}`}
                  >
                    {v}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filters */}
        <EventFilters activeFilter={filter} onFilterChange={setFilter} />

        {/* Event Grid */}
        <motion.div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" layout>
          <AnimatePresence mode="wait" initial={false}>
            {filtered.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                layout
              >
                <EventCard event={event} onRSVP={setRsvpEvent} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center py-20 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface">
              <Calendar className="h-8 w-8 text-text-muted" />
            </div>
            <p className="text-base font-medium text-text-secondary">
              No events found for this filter
            </p>
            <p className="mt-1 text-sm text-text-muted">
              Try selecting a different category or view
            </p>
          </div>
        )}
      </div>

      {/* RSVP Modal */}
      <RSVPModal event={rsvpEvent} onClose={() => setRsvpEvent(null)} />
    </div>
  );
}
