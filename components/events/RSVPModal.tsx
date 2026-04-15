"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import type { Event } from "@/lib/data";

interface RSVPModalProps {
  event: Event | null;
  onClose: () => void;
}

export default function RSVPModal({ event, onClose }: RSVPModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    year: "",
    branch: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;

    const rsvps = JSON.parse(localStorage.getItem("aws-vjit-rsvps") || "{}");
    rsvps[event.id] = { ...form, timestamp: Date.now() };
    localStorage.setItem("aws-vjit-rsvps", JSON.stringify(rsvps));

    setSubmitted(true);
  };

  useEffect(() => {
    setSubmitted(false);
    setForm({ name: "", email: "", year: "", branch: "", phone: "" });
  }, [event]);

  return (
    <AnimatePresence>
      {event && (
        <motion.div
          className="fixed inset-0 z-70 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur-[28px] shadow-2xl"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-lg p-1 text-text-muted hover:text-text-primary"
            >
              <X className="h-5 w-5" />
            </button>

            {submitted ? (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <motion.div
                  className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-green/20"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1 }}
                >
                  <Check className="h-8 w-8 text-accent-green" />
                </motion.div>
                <h3 className="mb-2 font-heading text-xl font-bold text-text-primary">
                  You&apos;re Registered!
                </h3>
                <p className="text-sm text-text-secondary">
                  We&apos;ll send you a reminder before the event.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 rounded-xl bg-primary px-6 py-2 text-sm font-bold text-text-on-primary shadow-[0_10px_30px_rgba(88,101,242,0.18)] transition-shadow hover:shadow-[0_12px_40px_rgba(88,101,242,0.24)]"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6">
                <h3 className="mb-1 font-heading text-lg font-bold text-text-primary">
                  RSVP for Event
                </h3>
                <p className="mb-6 text-sm text-text-secondary">
                  {event.title}
                </p>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      required
                      value={form.year}
                      onChange={(e) =>
                        setForm({ ...form, year: e.target.value })
                      }
                      className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-text-primary focus:border-primary focus:outline-none"
                    >
                      <option value="">Year</option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                    </select>
                    <select
                      required
                      value={form.branch}
                      onChange={(e) =>
                        setForm({ ...form, branch: e.target.value })
                      }
                      className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-text-primary focus:border-primary focus:outline-none"
                    >
                      <option value="">Branch</option>
                      <option value="CSE">CSE</option>
                      <option value="IT">IT</option>
                      <option value="ECE">ECE</option>
                      <option value="EEE">EEE</option>
                      <option value="MECH">MECH</option>
                      <option value="CIVIL">CIVIL</option>
                    </select>
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full rounded-xl bg-primary py-3 font-bold text-text-on-primary transition-shadow hover:shadow-[0_0_20px_rgba(88,101,242,0.24)]"
                >
                  Confirm RSVP
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
