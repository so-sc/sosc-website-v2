"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

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
  blockColor = "#0ade4a",
  duration = 0.6,
}: TextBlockAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !blockRef.current || !contentRef.current)
      return;

    let ctx: gsap.Context | undefined;

    (async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Initial State
        gsap.set(contentRef.current, { opacity: 0 });
        gsap.set(blockRef.current, {
          scaleX: 0,
          transformOrigin: "left center",
        });

        // Create Timeline
        const tl = gsap.timeline({
          defaults: { ease: "expo.inOut" },
          scrollTrigger: animateOnScroll
            ? {
                trigger: containerRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              }
            : undefined,
          delay,
        });

        // Animation Sequence
        tl.to(blockRef.current, {
          scaleX: 1,
          duration,
          transformOrigin: "left center",
        })
          .set(contentRef.current, { opacity: 1 })
          .to(blockRef.current, {
            scaleX: 0,
            duration,
            transformOrigin: "right center",
          });
      });
    })();

    return () => ctx?.revert();
  }, [animateOnScroll, delay, blockColor, duration]);

  return (
    <div
      ref={containerRef}
      className="relative inline-block overflow-hidden"
      style={{ verticalAlign: "bottom" }}
    >
      <div ref={contentRef}>{children}</div>
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
