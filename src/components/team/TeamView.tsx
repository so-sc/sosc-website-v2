import React, { useState } from "react";
import { Github, Linkedin } from "lucide-react";
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
    <div className="group relative flex w-full aspect-square flex-col items-center justify-between overflow-hidden rounded bg-[#F0FFF4] pb-6 text-center transition-all hover:shadow-lg">
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
              : "h-32 w-32 rounded-full object-cover mb-4 z-10"
          )}
        />
      </div>

      <div className={cn("z-20 w-full space-y-1 px-4", !isNoBg && "-mt-4")}>
        <h3 className="text-lg font-bold tracking-wider text-[#3ce56e] uppercase truncate">
          {name}
        </h3>
        <p className="text-sm font-medium text-gray-600 truncate">{designation}</p>
      </div>
    </div>
  );
};

export default function TeamView({ team }: { team: TeamMember[] }) {
  // Defaulting to "2024-25"
  const [selectedYear, setSelectedYear] = useState("2024-25");

  const tabs = ["Team 2025-26", "Team 2024-25", "Team 2023-24", "Olde Teams"];

  const filteredMembers = team.filter((m) => {
    if (selectedYear === "Olde Teams") return m.year === "-";
    return m.year.includes(selectedYear);
  });

  const coordinatorMembers = filteredMembers.filter((m) => m.status === "coordinator");
  const alumniMembers = filteredMembers.filter((m) => m.status === "alumni");
  
  const communityLeads = filteredMembers.filter(
    (m) => m.status === "active" && m.designation === "Community Lead"
  );
  
  const executiveMembers = filteredMembers.filter(
    (m) =>
      m.status === "active" &&
      (m.designation === "Executive Member" ||
        m.designation === "SOSWC Representative")
  );
  
  const communityMembers = filteredMembers.filter(
    (m) =>
      m.status === "active" &&
      m.designation !== "Community Lead" &&
      m.designation !== "Executive Member" &&
      m.designation !== "SOSWC Representative"
  );

  const themeGreen = "text-[#3ce56e]";

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap justify-center gap-4">
        {tabs.map((tab) => {
            const year = tab === "Olde Teams" ? "Olde Teams" : tab.replace("Team ", "");
            return (
                <button
                    key={tab}
                    onClick={() => setSelectedYear(year)}
                    className={cn(
                    "px-6 py-2 rounded-full font-bold transition-all border-2 cursor-pointer",
                    selectedYear === year
                        ? "bg-[#3ce56e] text-white border-[#3ce56e]"
                        : "bg-transparent text-gray-600 border-gray-300 hover:border-[#3ce56e] hover:text-[#3ce56e]"
                    )}
                >
                    {tab}
                </button>
            )
        })}
      </div>

      <section className="text-foreground mx-auto max-w-7xl space-y-16 px-4 md:px-8">
        {filteredMembers.length === 0 && (
            <div className="text-center text-gray-500 py-20">
                <p className="text-xl">No members found for {selectedYear}</p>
                <p className="text-sm mt-2">(Data defaults to 2024-25)</p>
            </div>
        )}

        {(coordinatorMembers.length > 0 || communityLeads.length > 0) && (
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {coordinatorMembers.length > 0 && (
                <div>
                    <h2 className="mb-8 text-center text-3xl font-extrabold tracking-wide uppercase">
                    <span className={themeGreen}>CO-ORDINATOR</span> FACULTY
                    </h2>
                    <div className="flex flex-wrap justify-center gap-8">
                    {coordinatorMembers.map((member, idx) => (
                        <div key={idx} className="w-full max-w-sm">
                        <MemberCard member={member} />
                        </div>
                    ))}
                    </div>
                </div>
            )}
            {communityLeads.length > 0 && (
                <div>
                    <h2 className="mb-8 text-center text-3xl font-extrabold tracking-wide uppercase">
                    <span className={themeGreen}>COMMUNITY</span> LEAD
                    </h2>
                    <div className="flex flex-wrap justify-center gap-8">
                    {communityLeads.map((member, idx) => (
                        <div key={idx} className="w-full max-w-sm">
                        <MemberCard member={member} />
                        </div>
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
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {executiveMembers.map((member, idx) => <MemberCard key={idx} member={member} />)}
            </div>
            </div>
        )}

        {communityMembers.length > 0 && (
            <div>
            <h2 className="mb-8 text-3xl font-extrabold tracking-wide uppercase">
                <span className={themeGreen}>COMMUNITY</span> MEMBER
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {communityMembers.map((member, idx) => <MemberCard key={idx} member={member} />)}
            </div>
            </div>
        )}

        {alumniMembers.length > 0 && (
            <div>
            <h2 className="mb-8 text-3xl font-extrabold tracking-wide uppercase">
                <span className={themeGreen}>ALUMNI</span>
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {alumniMembers.map((member, idx) => <MemberCard key={idx} member={member} />)}
            </div>
            </div>
        )}
      </section>
    </div>
  );
}
