"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.8,
  yOffset = 20,
}: FadeInProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx: gsap.Context | undefined;

    (async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.from(containerRef.current!, {
          opacity: 0,
          y: yOffset,
          duration,
          ease: "power2.out",
          delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });
    })();

    return () => ctx?.revert();
  }, [delay, duration, yOffset]);

  return <div ref={containerRef}>{children}</div>;
}
