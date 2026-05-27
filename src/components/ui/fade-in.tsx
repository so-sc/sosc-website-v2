"use client";

import { useEffect, useRef } from "react";

interface FadeInProps {
  children?: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  [key: string]: any;
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
    if (typeof window === "undefined") return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any;

    (async () => {
      const gsap = (await import("gsap")).default;
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
