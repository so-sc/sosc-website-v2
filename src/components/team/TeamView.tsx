import { Github, Linkedin } from "lucide-react";
import React, { useState } from "react";
import { type TeamMember } from "@/data/team/type";
import { cn } from "@/lib/utils";

const MemberCard = ({ member }: { member: TeamMember }) => {
  const { image, name, designation, username, linkedin } = member;
  const isNoBg = image.includes("team-nobg");

  return (
    <div className="group relative flex aspect-[3/4] w-full flex-col items-center justify-between overflow-hidden rounded-none bg-[#F0FFF4] pb-4 text-center transition-all md:aspect-[4/5] md:pb-6">
      {/* Social Icons */}
      <div className="absolute top-2 right-2 z-50 flex flex-col gap-1.5 md:top-4 md:right-4 md:gap-2">
        {username && (
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-none bg-[#3ce56e] text-white transition-colors hover:bg-[#2dc45e] md:h-8 md:w-8"
          >
            <Github className="h-4 w-4 md:h-5 md:w-5" />
          </a>
        )}
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-none bg-[#3ce56e] text-white transition-colors hover:bg-[#2dc45e] md:h-8 md:w-8"
          >
            <Linkedin className="h-4 w-4 md:h-5 md:w-5" />
          </a>
        )}
      </div>

      {/* Image Container */}
      <div className="relative flex h-[75%] w-full items-end justify-center overflow-hidden">
        <img
          src={image}
          alt={name}
          className={cn(
            "h-full w-full rounded-none object-cover",
            isNoBg && "object-contain object-bottom mix-blend-multiply",
          )}
        />
      </div>

      <div className="z-20 flex w-full flex-1 flex-col justify-center space-y-0.5 px-4 pt-2 md:space-y-1">
        <h3 className="text-sm font-bold text-[#3ce56e] md:text-base">
          {name}
        </h3>
        <p className="text-[10px] font-medium text-gray-600 md:text-xs">
          {designation}
        </p>
      </div>
    </div>
  );
};

export default function TeamView({ team }: { team: TeamMember[] }) {
  // Defaulting to "2024-25"
  const [selectedYear, setSelectedYear] = useState("2025-26");

  const tabs = [
    "Team 2025-26",
    "Team 2024-25",
    "Team 2023-24",
    "Older Communities",
  ];

  const filteredMembers = team.filter((m) => {
    if (selectedYear === "Older Communities") return m.year === "-";
    return m.year.includes(selectedYear);
  });

  const coordinatorMembers = filteredMembers.filter(
    (m) => m.status === "coordinator",
  );
  const alumniMembers = filteredMembers.filter((m) => {
    if (selectedYear === "Older Communities")
      return m.status === "alumni" || m.status === "active";
    return m.status === "alumni";
  });

  const communityLeads = filteredMembers.filter(
    (m) => m.status === "active" && m.designation === "Community Lead",
  );

  const executiveMembers = filteredMembers.filter(
    (m) =>
      m.status === "active" &&
      (m.designation === "Executive Member" ||
        m.designation === "SOSWC Representative"),
  );

  const communityMembers = filteredMembers.filter(
    (m) =>
      selectedYear !== "Older Communities" &&
      m.status === "active" &&
      m.designation !== "Community Lead" &&
      m.designation !== "Executive Member" &&
      m.designation !== "SOSWC Representative",
  );

  const themeGreen = "text-[#3ce56e]";

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap md:justify-center md:gap-4">
        {tabs.map((tab) => {
          const year =
            tab === "Older Communities"
              ? "Older Communities"
              : tab.replace("Team ", "");
          return (
            <button
              key={tab}
              onClick={() => setSelectedYear(year)}
              className={cn(
                "cursor-pointer rounded-none border-2 px-3 py-2 text-xs font-bold transition-all md:px-6 md:text-base",
                selectedYear === year
                  ? "border-[#3ce56e] bg-[#3ce56e] text-white"
                  : "border-gray-300 bg-transparent text-gray-600 hover:border-[#3ce56e] hover:text-[#3ce56e]",
              )}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <section className="text-foreground mx-auto max-w-7xl space-y-16 px-4 md:px-8">
        {filteredMembers.length === 0 && (
          <div className="py-20 text-center text-gray-500">
            <p className="text-xl">No members found for {selectedYear}</p>
            <p className="mt-2 text-sm">(Data defaults to 2024-25)</p>
          </div>
        )}

        {(coordinatorMembers.length > 0 || communityLeads.length > 0) && (
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 md:grid md:grid-cols-2 md:gap-8 lg:gap-16">
            {coordinatorMembers.length > 0 && (
              <div className="flex flex-col items-center">
                <div className="mb-8 flex h-16 items-end justify-center sm:h-20 md:h-24 lg:h-28">
                  <h2 className="text-center text-2xl font-extrabold tracking-wide uppercase sm:text-3xl lg:text-4xl">
                    <span className={themeGreen}>CO-ORDINATOR</span>
                    <br className="hidden md:block" /> FACULTY
                  </h2>
                </div>
                <div className="w-[85%] max-w-[280px] sm:w-[50%] md:w-full md:max-w-[260px] lg:max-w-[280px]">
                  {coordinatorMembers.map((member) => (
                    <MemberCard key={member.username} member={member} />
                  ))}
                </div>
              </div>
            )}
            {communityLeads.length > 0 && (
              <div className="flex flex-col items-center">
                <div className="mb-8 flex h-16 items-end justify-center sm:h-20 md:h-24 lg:h-28">
                  <h2 className="text-center text-2xl font-extrabold tracking-wide uppercase sm:text-3xl lg:text-4xl">
                    <span className={themeGreen}>COMMUNITY</span>
                    <br className="hidden md:block" /> LEAD
                  </h2>
                </div>
                <div className="w-[85%] max-w-[280px] sm:w-[50%] md:w-full md:max-w-[260px] lg:max-w-[280px]">
                  {communityLeads.map((member) => (
                    <MemberCard key={member.username} member={member} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {executiveMembers.length > 0 && (
          <div>
            <h2 className="mb-8 text-base font-black tracking-wide uppercase md:text-3xl">
              <span className={themeGreen}>EXECUTIVE</span> MEMBER
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-8 lg:grid-cols-4">
              {executiveMembers.map((member) => (
                <MemberCard key={member.username} member={member} />
              ))}
            </div>
          </div>
        )}

        {communityMembers.length > 0 && (
          <div>
            <h2 className="mb-8 text-base font-black tracking-wide uppercase md:text-3xl">
              <span className={themeGreen}>COMMUNITY</span> MEMBER
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-8 lg:grid-cols-4">
              {communityMembers.map((member) => (
                <MemberCard key={member.username} member={member} />
              ))}
            </div>
          </div>
        )}

        {alumniMembers.length > 0 && (
          <div>
            <h2 className="mb-8 text-base font-black tracking-wide uppercase md:text-3xl">
              <span className={themeGreen}>
                {selectedYear === "Older Communities" ? "OLDER" : "ALUMNI"}
              </span>{" "}
              {selectedYear === "Older Communities" ? "COMMUNITIES" : ""}
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-8 lg:grid-cols-4">
              {alumniMembers.map((member) => (
                <MemberCard key={member.username} member={member} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
