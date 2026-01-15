import { useEffect, useRef, useState } from "react";

export default function Cool() {
  const pathRef = useRef<SVGPathElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return;

      const rect = wrapperRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // start 300px before component enters
      const start = viewportHeight - 200;
      // end 300px after component leaves
      const end = -rect.height + 200;

      const rawProgress = (start - rect.top) / (start - end);
      const clamped = Math.min(Math.max(rawProgress, 0), 1);

      setProgress(clamped);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!pathRef.current) return;

    const length = pathRef.current.getTotalLength();
    pathRef.current.style.strokeDasharray = `${length}`;
    pathRef.current.style.strokeDashoffset = `${length * (1 - progress)}`;
  }, [progress]);

  return (
    <div ref={wrapperRef}>
      <svg
        viewBox="0 0 1000 200"
        preserveAspectRatio="none"
        className="h-48 w-full"
      >
        <defs>
          <linearGradient
            id="scroll-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#ff6ec4" />
            <stop offset="50%" stopColor="#7873f5" />
            <stop offset="100%" stopColor="#4ade80" />
          </linearGradient>
        </defs>

        <path
          ref={pathRef}
          d="M 0 100 Q 250 20 500 100 T 1000 100"
          fill="none"
          stroke="url(#scroll-gradient)"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
