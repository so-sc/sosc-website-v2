"use client";

import React, { useLayoutEffect, useRef } from "react";

import { type TeamMember } from "@/data/team/type";

interface ExecutiveImpactCarouselProps {
  members: TeamMember[];
  [key: string]: any;
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

  /* Target Tall-Desktop viewports (like phones in desktop mode) */
  @media (min-width: 1024px) and (max-aspect-ratio: 3/4) {
    .col-scroll {
      gap: 1rem !important;
    }
    .member-img-wrapper {
      aspect-ratio: 9/16 !important;
    }
    .col-scroll__list {
      gap: 1rem !important;
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
    gap: 0.4rem;
    width: 100%;
    /* Important for seamless loop calculation */
    padding-bottom: 0.4rem; 
  }
  
  @media (min-width: 768px) {
    .col-scroll__list {
      gap: 1rem;
      padding-bottom: 1rem;
    }
  }

  @media (min-width: 1024px) {
    .col-scroll__list {
      gap: 2rem;
      padding-bottom: 2rem;
    }
  }

  @media (min-width: 1280px) {
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
    border-radius: 0;
    overflow: hidden;
    flex-shrink: 0; 
  }

  .member-img-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 3/5;
    overflow: hidden;
    background: #fff;
    border-radius: 0;
  }

  @media (min-width: 768px) {
    .member-img-wrapper {
      aspect-ratio: 2/3;
    }
  }

  .member-img-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 20%;
    mix-blend-mode: normal;
  }

  @media (min-width: 768px) {
    .member-img-wrapper img {
      mix-blend-mode: multiply;
    }
    /* Clean Masonry Stagger - no more padding hacks */
    .col-2 {
      padding-top: 0;
    }
  }
`;

export default function ExecutiveImpactCarousel({
  members,
}: ExecutiveImpactCarouselProps) {
  const columnCount = 3;

  const containerRef = useRef<HTMLDivElement>(null);
  const safeMembers = [...members];

  const col1Members = safeMembers.filter((_, i) => i % columnCount === 0);
  const col2Members = safeMembers.filter((_, i) => i % columnCount === 1);
  const col3Members = safeMembers.filter((_, i) => i % columnCount === 2);

  const multiply = (arr: TeamMember[]) => [...arr, ...arr, ...arr, ...arr];

  const col1 = multiply(col1Members);
  const col2 = multiply(col2Members);
  const col3 = multiply(col3Members);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    if (typeof window === "undefined") return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any;

    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.from(".col-scroll__box", {
          y: 100,
          opacity: 0,
          duration: 1.5,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.2,
        });

        const sets = 4;
        const setHeight = 100 / sets;
        const itemsPerSet = 2;
        const itemHeight = setHeight / itemsPerSet;
        const staggerHeight = itemHeight * 0.75;

        gsap.set(".col-1 .col-scroll__list, .col-3 .col-scroll__list", {
          yPercent: -setHeight,
        });

        gsap.set(".col-2 .col-scroll__list", {
          yPercent: -setHeight + staggerHeight,
        });

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

        gsap.to(".col-2 .col-scroll__list", {
          yPercent: -setHeight + staggerHeight + setHeight,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }, containerRef);
    })();

    return () => ctx?.revert();
  }, [members]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="members-carousel" ref={containerRef}>
        <div
          className="col-scroll"
          style={{
            gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
          }}
        >
          {/* Column 1 */}
          <div className="col-scroll__box col-1">
            <div className="col-scroll__list">
              {col1.map((member, i) => (
                <MemberCard key={`col1-${member.id}-${i}`} member={member} />
              ))}
            </div>
          </div>

          {/* Column 2 */}
          <div className="col-scroll__box col-2">
            <div className="col-scroll__list">
              {col2.map((member, i) => (
                <MemberCard key={`col2-${member.id}-${i}`} member={member} />
              ))}
            </div>
          </div>

          {/* Column 3 (Only visible when columnCount is 3) */}
          {columnCount === 3 && (
            <div className="col-scroll__box col-3">
              <div className="col-scroll__list">
                {col3.map((member, i) => (
                  <MemberCard key={`col3-${member.id}-${i}`} member={member} />
                ))}
              </div>
            </div>
          )}
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
