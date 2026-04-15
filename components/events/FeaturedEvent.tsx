"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Signal,
  Sparkles,
  Users,
} from "lucide-react";
import type { Event } from "@/lib/data";
import MagneticButton from "@/components/shared/MagneticButton";

const typeColors: Record<Event["type"], string> = {
  Workshop: "#58A6FF",
  Hackathon: "#EF4444",
  "Guest Talk": "#8B5CF6",
  "Study Group": "#3FB950",
  "Community Day": "#FF9900",
};

const seatStatus = (seatPercent: number) => {
  if (seatPercent >= 85) return "Almost full";
  if (seatPercent >= 55) return "Filling fast";
  return "Seats open";
};

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

export default function FeaturedEvent({
  event,
  onRSVP,
}: {
  event: Event;
  onRSVP: (event: Event) => void;
}) {
  const countdown = useCountdown(event.date);
  const seatPercent = (event.registeredSeats / event.totalSeats) * 100;
  const eventColor = typeColors[event.type];
  const eventDate = new Date(event.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const quickFacts = [
    { icon: Calendar, label: "Date", value: eventDate },
    { icon: Clock, label: "Time", value: event.time },
    { icon: MapPin, label: "Venue", value: event.venue },
    { icon: Signal, label: "Difficulty", value: event.level },
  ];

  return (
    <motion.div
      className="relative mb-12 overflow-hidden rounded-[28px] border border-[rgba(255,255,255,0.09)] bg-[rgba(255,255,255,0.05)] p-8 shadow-[0_32px_120px_rgba(15,21,32,0.12)] backdrop-blur-[38px] backdrop-saturate-150 md:p-10 dark:border-[rgba(255,255,255,0.08)] dark:bg-[rgba(255,255,255,0.06)] dark:shadow-[0_32px_120px_rgba(0,0,0,0.16)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.08)_20%,rgba(255,255,255,0.02)_45%,rgba(255,255,255,0)_100%)] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.06)_20%,rgba(255,255,255,0.015)_45%,rgba(255,255,255,0)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0))] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0))]" />
      <div
        className="pointer-events-none absolute -left-8 top-0 h-40 w-40 rounded-full blur-3xl"
        style={{ backgroundColor: `${eventColor}18` }}
      />
      <div className="pointer-events-none absolute right-0 top-10 h-48 w-48 rounded-full bg-white/12 blur-3xl dark:bg-white/10" />

      <div className="relative z-10 grid gap-8 xl:grid-cols-[minmax(0,1.45fr)_360px]">
        <div className="flex flex-col">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              <Sparkles className="h-3 w-3" />
              Featured Event
            </span>
            <span
              className="inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]"
              style={{
                color: eventColor,
                borderColor: `${eventColor}45`,
                backgroundColor: `${eventColor}12`,
              }}
            >
              {event.type}
            </span>
          </div>

          <h2 className="max-w-3xl font-heading text-3xl font-bold tracking-[-0.03em] text-text-primary md:text-4xl">
            {event.title}
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-8 text-text-secondary">
            {event.description}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {quickFacts.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="glass flex items-start gap-3 rounded-2xl border border-white/10 bg-white/12 px-4 py-3 shadow-[0_10px_24px_rgba(15,21,32,0.05)] backdrop-blur-2xl"
              >
                <div
                  className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: `${eventColor}18`,
                    color: eventColor,
                  }}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                    {label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-text-primary">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[24px] border border-white/10 bg-white/12 p-5 shadow-[0_18px_40px_rgba(15,21,32,0.08)] backdrop-blur-[44px] backdrop-saturate-150 dark:border-white/10 dark:bg-white/10 dark:shadow-[0_18px_40px_rgba(0,0,0,0.14)]">
            <div className="mb-3 flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                  Registration Status
                </p>
                <p className="mt-1 text-lg font-semibold text-text-primary">
                  {seatStatus(seatPercent)}
                </p>
              </div>
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold"
                style={{
                  backgroundColor: `${eventColor}15`,
                  color: eventColor,
                }}
              >
                {Math.round(seatPercent)}% filled
              </span>
            </div>

            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="flex items-center gap-1.5 text-text-secondary">
                <Users className="h-4 w-4" />
                {event.registeredSeats} / {event.totalSeats} seats claimed
              </span>
              <span className="font-medium text-text-primary">
                {event.totalSeats - event.registeredSeats} left
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface/80">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${seatPercent}%`,
                  background: `linear-gradient(90deg, ${eventColor}33, ${eventColor}AA)`,
                }}
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <MagneticButton
              onClick={() => onRSVP(event)}
              className="shimmer-btn rounded-2xl px-8 py-3.5 font-bold text-text-on-primary shadow-[0_18px_40px_rgba(15,21,32,0.16)]"
              style={{
                backgroundImage: `linear-gradient(90deg, ${eventColor}DD, ${eventColor}AA)`,
              }}
            >
              <span className="inline-flex items-center gap-2">
                Register Now
                <ArrowRight className="h-4 w-4" />
              </span>
            </MagneticButton>

            <div className="text-sm text-text-muted">
              Secure your seat now and get the full event details before
              kickoff.
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-white/4 p-6 shadow-[0_20px_50px_rgba(15,21,32,0.08)] backdrop-blur-[50px] backdrop-saturate-150 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_50px_rgba(0,0,0,0.14)]">
          <div
            className="pointer-events-none absolute inset-x-8 top-0 h-24 rounded-full blur-3xl"
            style={{ backgroundColor: `${eventColor}24` }}
          />

          <div className="relative z-10">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                  Countdown
                </p>
                <p className="mt-1 text-lg font-semibold text-text-primary">
                  Event starts soon
                </p>
              </div>
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold"
                style={{
                  color: eventColor,
                  backgroundColor: `${eventColor}12`,
                }}
              >
                {event.level}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {Object.entries(countdown).map(([label, value]) => (
                <motion.div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/12 px-4 py-4 text-center shadow-[0_10px_24px_rgba(15,21,32,0.06)] backdrop-blur-[42px] backdrop-saturate-150 dark:border-white/10 dark:bg-white/10 dark:shadow-[0_10px_24px_rgba(0,0,0,0.10)]"
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="font-mono text-3xl font-bold text-text-primary md:text-4xl">
                    {String(value).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.2em] text-text-primary">
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/4 p-4 shadow-[0_10px_24px_rgba(15,21,32,0.06)] backdrop-blur-[42px] backdrop-saturate-150 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_10px_24px_rgba(0,0,0,0.10)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-primary">
                Why this is featured
              </p>
              <p className="mt-2 text-sm leading-7 text-text-primary">
                High-interest session, limited seats, and a hands-on build
                format that makes it the best event to highlight first.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
