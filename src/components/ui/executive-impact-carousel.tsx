"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import React, { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

interface ExecutiveImpactCarouselProps {
  members: TeamMember[];
}

const styles = `
  .members-carousel {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }
  
  .col-scroll {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    height: 100%;
    width: 100%;
    gap: 1rem;
  }

  @media (max-width: 768px) {
    .col-scroll {
      gap: 0.5rem;
    }
  }

  .col-scroll__box {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden; 
  }

  .col-scroll__list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    /* Important for seamless loop calculation */
    padding-bottom: 1rem; 
  }
  
  @media (min-width: 1024px) {
    .col-scroll__list {
      gap: 4rem;
      padding-bottom: 4rem;
    }
  }

  .member-card {
    display: flex;
    flex-direction: column;
    width: 100%;
    background: transparent;
    border-radius: 0.5rem;
    overflow: hidden;
    flex-shrink: 0; 
  }

  .member-img-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 3/4;
    overflow: hidden;
    background: #fff;
    border-radius: 0.5rem;
  }

  .member-img-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: bottom;
    mix-blend-mode: multiply; 
  }
`;

export default function ExecutiveImpactCarousel({
  members,
}: ExecutiveImpactCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024); // treating < 1024 as mobile/tablet for 2 cols
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Prepare columns based on screen size
  // Mobile/Tablet (<1024px): 2 Columns. Desktop (>=1024px): 3 Columns.

  const safeMembers = [...members];

  let col1Members: TeamMember[] = [],
    col2Members: TeamMember[] = [],
    col3Members: TeamMember[] = [];

  // Distribute into 3 columns for both desktop and mobile
  col1Members = safeMembers.filter((_, i) => i % 3 === 0);
  col2Members = safeMembers.filter((_, i) => i % 3 === 1);
  col3Members = safeMembers.filter((_, i) => i % 3 === 2);

  // Strategy: [Set1 (Buffer), Set2 (Visible), Set3 (Buffer)]
  const multiply = (arr: TeamMember[]) => [...arr, ...arr, ...arr];

  const col1 = multiply(col1Members);
  const col2 = multiply(col2Members);
  const col3 = multiply(col3Members);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Entrance: slide up and fade in
      gsap.from(".col-scroll__box", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.2,
      });

      const setHeight = 100 / 3; // 33.33%

      // -- INITIAL POSITIONS --
      gsap.set(".col-1 .col-scroll__list", { yPercent: -setHeight });
      gsap.set(".col-3 .col-scroll__list", { yPercent: -setHeight });

      // Col 2 Offset
      gsap.set(".col-2 .col-scroll__list", { yPercent: -setHeight + 5 });

      // -- SCROLL ANIMATIONS --

      // Move UP
      const upTargets = [
        ".col-1 .col-scroll__list",
        ".col-3 .col-scroll__list",
      ];

      gsap.to(upTargets, {
        yPercent: -2 * setHeight,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Move DOWN
      gsap.to(".col-2 .col-scroll__list", {
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [members, isMobile]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="members-carousel" ref={containerRef}>
        <div
          className="col-scroll"
          style={{
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
        >
          {/* Column 1 */}
          <div className="col-scroll__box col-1">
            <div className="col-scroll__list">
              {col1.map((member, i) => (
                <MemberCard key={`c1-${i}`} member={member} />
              ))}
            </div>
          </div>

          {/* Column 2 */}
          <div className="col-scroll__box col-2">
            <div className="col-scroll__list">
              {col2.map((member, i) => (
                <MemberCard key={`c2-${i}`} member={member} />
              ))}
            </div>
          </div>

          {/* Column 3 */}
          <div className="col-scroll__box col-3">
            <div className="col-scroll__list">
              {col3.map((member, i) => (
                <MemberCard key={`c3-${i}`} member={member} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <figure className="member-card">
      <div className="member-img-wrapper">
        <img className="product-img" src={member.image} alt={member.name} />
      </div>
    </figure>
  );
}
