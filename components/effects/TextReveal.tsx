"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function TextReveal({
  text,
  className = "",
  wordClassName = "",
  tag: Tag = "h2",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  const words = text.split(" ");
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.12,
      },
    },
  };

  return (
    <div ref={ref}>
      <Tag className={className}>
        <motion.span
          className="inline-block"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
        {words.map((word, i) => {
          return (
            <Word
              key={`${word}-${i}`}
              className={wordClassName}
            >
              {word}
            </Word>
          );
        })}
        </motion.span>
      </Tag>
    </div>
  );
}

function Word({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 18,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.span
      variants={wordVariants}
      className={`mr-[0.25em] inline-block ${className}`}
    >
      {children}
    </motion.span>
  );
}
