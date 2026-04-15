"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
import { useTheme } from "@/components/providers/ThemeProvider";

interface AntigravityProps {
  className?: string;
  intensity?: "default" | "strong";
}

export default function Antigravity({
  className = "",
  intensity = "default",
}: AntigravityProps) {
  const [init, setInit] = useState(false);
  const { resolvedTheme } = useTheme();
  const isStrong = intensity === "strong";

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      particles: {
        number: {
          value: resolvedTheme === "light" && isStrong ? 56 : 40,
          density: { enable: true },
        },
        color: {
          value:
            resolvedTheme === "dark"
              ? ["#FF9900", "#4DA6FF", "#FFFFFF"]
              : isStrong
                ? ["#FF9900", "#58A6FF", "#232F3E"]
                : ["#FF9900", "#6C3FC5", "#232F3E"],
        },
        shape: { type: "circle" },
        opacity: {
          value:
            resolvedTheme === "light" && isStrong
              ? { min: 0.18, max: 0.55 }
              : { min: 0.1, max: 0.4 },
          animation: {
            enable: true,
            speed: 1,
            sync: false,
          },
        },
        size: {
          value:
            resolvedTheme === "light" && isStrong
              ? { min: 1.5, max: 5 }
              : { min: 1, max: 4 },
          animation: {
            enable: true,
            speed: 2,
            sync: false,
          },
        },
        move: {
          enable: true,
          speed: { min: 0.5, max: 1.5 },
          direction: "top", // Upward movement for "Antigravity"
          random: true,
          straight: false,
          outModes: { default: "out" },
        },
        links: {
          enable: true,
          distance: 150,
          color: resolvedTheme === "dark" ? "#ffffff" : "#232F3E",
          opacity: resolvedTheme === "light" && isStrong ? 0.1 : 0.05,
          width: resolvedTheme === "light" && isStrong ? 1.2 : 1,
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "bubble",
          },
          onClick: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          bubble: {
            distance: 200,
            size: 6,
            duration: 2,
            opacity: 0.8,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      detectRetina: true,
    }),
    [isStrong, resolvedTheme]
  );

  if (!init) return null;

  return (
    <Particles
      id={`antigravity-particles-${resolvedTheme}`}
      key={resolvedTheme}
      className={`absolute inset-0 z-0 pointer-events-none ${className}`}
      options={options}
    />
  );
}
