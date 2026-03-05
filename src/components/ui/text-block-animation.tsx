"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef } from "react";

// Ensure plugins are registered
gsap.registerPlugin(ScrollTrigger);

interface TextBlockAnimationProps {
  children: React.ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
  blockColor?: string;
  duration?: number;
}

export default function TextBlockAnimation({
  children,
  animateOnScroll = true,
  delay = 0,
  blockColor = "#0ade4a", // Default to the site's green
  duration = 0.6,
}: TextBlockAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !blockRef.current || !contentRef.current)
        return;

      // Initial State
      gsap.set(contentRef.current, { opacity: 0 });
      gsap.set(blockRef.current, { scaleX: 0, transformOrigin: "left center" });

      // Create Timeline
      const tl = gsap.timeline({
        defaults: { ease: "expo.inOut" },
        scrollTrigger: animateOnScroll
          ? {
              trigger: containerRef.current,
              start: "top 85%", // Triggers when top of element hits 85% viewport height
              toggleActions: "play none none reverse",
            }
          : null,
        delay: delay,
      });

      // Animation Sequence
      // 1. Block scales IN from Left
      tl.to(blockRef.current, {
        scaleX: 1,
        duration: duration,
        transformOrigin: "left center",
      })
        // 2. Reveal Content (Instant)
        .set(contentRef.current, {
          opacity: 1,
        })
        // 3. Block scales OUT to Right
        .to(blockRef.current, {
          scaleX: 0,
          duration: duration,
          transformOrigin: "right center",
        });
    },
    {
      scope: containerRef,
      dependencies: [animateOnScroll, delay, blockColor, duration],
    },
  );

  return (
    <div
      ref={containerRef}
      className="relative inline-block overflow-hidden"
      style={{ verticalAlign: "bottom" }}
    >
      <div ref={contentRef} style={{ opacity: 0 }}>
        {children}
      </div>
      <div
        ref={blockRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: blockColor,
          zIndex: 2,
          transform: "scaleX(0)",
          transformOrigin: "left center",
        }}
      />
    </div>
  );
}
