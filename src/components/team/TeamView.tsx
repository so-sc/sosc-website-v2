import { Github, Linkedin } from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface TeamMember {
  username?: string;
  name: string;
  designation?: string;
  email?: string | null;
  linkedin?: string | null;
  skills?: string[];
  status: "coordinator" | "alumni" | "active";
  image: string;
  year: string;
}

const MemberCard = ({ member }: { member: TeamMember }) => {
  const { image, name, designation, username, linkedin } = member;
  const isNoBg = image.includes("team-nobg");

  return (
    <div className="group relative flex aspect-square w-full flex-col items-center justify-between overflow-hidden rounded bg-[#F0FFF4] pb-6 text-center transition-all hover:shadow-lg">
      {/* Social Icons */}
      <div className="absolute top-4 right-4 z-50 flex flex-col gap-2">
        {username && (
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded bg-[#3ce56e] text-white transition-colors hover:bg-[#2dc45e]"
          >
            <Github className="h-5 w-5" />
          </a>
        )}
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded bg-[#3ce56e] text-white transition-colors hover:bg-[#2dc45e]"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        )}
      </div>

      {/* Image Container */}
      <div className="relative flex w-full flex-1 items-end justify-center overflow-hidden">
        <img
          src={image}
          alt={name}
          className={cn(
            isNoBg
              ? "h-full w-full object-contain object-bottom mix-blend-multiply"
              : "z-10 mb-4 h-32 w-32 rounded-full object-cover",
          )}
        />
      </div>

      <div className={cn("z-20 w-full space-y-1 px-4", !isNoBg && "-mt-4")}>
        <h3 className="truncate text-lg font-bold tracking-wider text-[#3ce56e] uppercase">
          {name}
        </h3>
        <p className="truncate text-sm font-medium text-gray-600">
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
      <div className="flex flex-wrap justify-center gap-4">
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
                "cursor-pointer rounded-full border-2 px-6 py-2 font-bold transition-all",
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
                  {coordinatorMembers.map((member, idx) => (
                    <MemberCard key={idx} member={member} />
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
                  {communityLeads.map((member, idx) => (
                    <MemberCard key={idx} member={member} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {executiveMembers.length > 0 && (
          <div>
            <h2 className="mb-8 text-3xl font-extrabold tracking-wide uppercase">
              <span className={themeGreen}>EXECUTIVE</span> MEMBER
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-8 lg:grid-cols-4">
              {executiveMembers.map((member, idx) => (
                <MemberCard key={idx} member={member} />
              ))}
            </div>
          </div>
        )}

        {communityMembers.length > 0 && (
          <div>
            <h2 className="mb-8 text-3xl font-extrabold tracking-wide uppercase">
              <span className={themeGreen}>COMMUNITY</span> MEMBER
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-8 lg:grid-cols-4">
              {communityMembers.map((member, idx) => (
                <MemberCard key={idx} member={member} />
              ))}
            </div>
          </div>
        )}

        {alumniMembers.length > 0 && (
          <div>
            <h2 className="mb-8 text-3xl font-extrabold tracking-wide uppercase">
              <span className={themeGreen}>
                {selectedYear === "Older Communities" ? "OLDER" : "ALUMNI"}
              </span>{" "}
              {selectedYear === "Older Communities" ? "COMMUNITIES" : ""}
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-8 lg:grid-cols-4">
              {alumniMembers.map((member, idx) => (
                <MemberCard key={idx} member={member} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
