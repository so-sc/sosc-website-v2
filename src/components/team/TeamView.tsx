import { Github, Linkedin } from "lucide-react";
import React, { useState } from "react";
import { type Coordinator } from "@/data/coordinatorType";
import { type TeamMember } from "@/data/team/type";

const MemberCard = ({ member }: { member: TeamMember }) => {
  const { name, designation, username, linkedin } = member;

  return (
    <div className="group relative flex aspect-[3/4] w-full flex-col items-center justify-between overflow-hidden rounded-none border border-gray-200 bg-white pb-4 text-center transition-all md:aspect-[4/5] md:pb-6">
      {/* Social Icons */}
      <div className="absolute top-2 right-2 z-50 flex flex-col gap-1.5 md:top-4 md:right-4 md:gap-2">
        {username && (
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on GitHub`}
            className="bg-primary text-primary-foreground hover:bg-primary/85 flex h-8 w-8 cursor-pointer items-center justify-center rounded-none transition-colors"
          >
            <Github className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
          </a>
        )}
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on LinkedIn`}
            className="bg-primary text-primary-foreground hover:bg-primary/85 flex h-8 w-8 cursor-pointer items-center justify-center rounded-none transition-colors"
          >
            <Linkedin className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
          </a>
        )}
      </div>

      {/* Image Container */}
      <div className="relative h-[75%] w-full overflow-hidden">
        <div
          className="absolute inset-0 animate-pulse bg-gray-200"
          aria-hidden="true"
        />
        <img
          src={`https://github.com/${username}.png?size=256`}
          alt={name}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/github_avatar.svg";
          }}
          // Pulse shows through until the photo paints; alt text never renders
          className="relative h-full w-full object-cover text-transparent"
        />
      </div>

      <div className="z-20 flex w-full flex-1 flex-col justify-center space-y-0.5 px-4 pt-2 md:space-y-1">
        <h3 className="text-primary-ink text-sm font-bold md:text-base">
          {name}
        </h3>
        <p className="text-xs font-medium text-gray-600">{designation}</p>
      </div>
    </div>
  );
};

const OLDER = "older";

type Group = { title: string; members: TeamMember[] };

// Leadership is any titled role, so new or renamed titles need no code change
function groupMembers(members: TeamMember[]): Group[] {
  const role = (m: TeamMember) => (m.designation ?? "").trim().toLowerCase();
  const isAlumni = (m: TeamMember) =>
    m.status === "alumni" || role(m) === "alumni";
  const isMember = (m: TeamMember) =>
    !isAlumni(m) && (role(m) === "" || role(m) === "community member");
  const isLead = (m: TeamMember) => !isAlumni(m) && !isMember(m);

  const groups: Group[] = [
    { title: "Leadership", members: members.filter(isLead) },
    { title: "Community", members: members.filter(isMember) },
    { title: "Alumni", members: members.filter(isAlumni) },
  ];
  return groups.filter((g) => g.members.length > 0);
}

// Every student not yet passed out, once each, as Leadership and Community
function currentTeam(team: TeamMember[], finalYearPassout: number): Group[] {
  const latest = new Map<string, TeamMember>();
  for (const m of team) {
    if (!m.graduation || m.graduation < finalYearPassout) continue;
    const seen = latest.get(m.username);
    if (!seen || m.year.localeCompare(seen.year) > 0) latest.set(m.username, m);
  }
  const students = [...latest.values()];
  const leaders = groupMembers(students).find((g) => g.title === "Leadership");
  const leaderSet = new Set(leaders?.members);

  const groups: Group[] = [
    ...(leaders ? [leaders] : []),
    {
      title: "Community",
      members: students.filter((m) => !leaderSet.has(m)),
    },
  ];
  return groups.filter((g) => g.members.length > 0);
}

function GroupGrids({
  groups,
  idPrefix,
}: {
  groups: Group[];
  idPrefix: string;
}) {
  return (
    <>
      {groups.map((group) => {
        const id = `${idPrefix}-${group.title.toLowerCase().replace(/\s+/g, "-")}`;
        return (
          <section
            key={group.title}
            className="border-b border-gray-200 py-10 last:border-b-0 md:py-12"
            aria-labelledby={id}
          >
            <div className="mb-6 flex items-baseline justify-between gap-4 md:mb-8">
              <h3
                id={id}
                className="text-2xl leading-none font-black tracking-tight text-gray-900 uppercase md:text-4xl"
              >
                {group.title}
              </h3>
              <span className="text-primary-ink font-mono text-sm font-bold tracking-widest uppercase">
                {group.members.length}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
              {group.members.map((member) => (
                <MemberCard
                  key={`${member.username}-${member.year}`}
                  member={member}
                />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}

function CoordinatorCard({ coordinator }: { coordinator: Coordinator }) {
  const { name, role, title, bio, image, linkedin } = coordinator;
  return (
    <article className="grid gap-6 border border-gray-200 bg-white p-5 md:grid-cols-12 md:gap-10 md:p-8">
      <div className="mx-auto aspect-[4/5] w-full max-w-60 overflow-hidden bg-gray-100 md:col-span-4 md:max-w-none lg:col-span-3">
        <img
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top text-transparent"
        />
      </div>
      <div className="flex flex-col justify-center md:col-span-8 lg:col-span-9">
        <p className="text-primary-ink font-mono text-xs font-bold tracking-widest uppercase">
          {role}
        </p>
        <h4 className="mt-2 text-2xl leading-tight font-black text-gray-900 md:text-4xl">
          {name}
        </h4>
        <p className="mt-1 text-sm font-medium text-gray-500 md:text-base">
          {title}
        </p>
        <p className="mt-5 max-w-3xl leading-relaxed text-gray-600">{bio}</p>
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:border-primary hover:text-primary-ink mt-6 inline-flex w-fit items-center gap-2 border border-gray-900 px-4 py-2 text-xs font-bold tracking-widest text-gray-900 uppercase transition-colors"
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" />
            LinkedIn
          </a>
        )}
      </div>
    </article>
  );
}

function SectionTitle({ title, accent }: { title: string; accent: string }) {
  return (
    <h2 className="text-4xl leading-none font-black tracking-tight text-gray-900 uppercase md:text-6xl">
      {title} <span className="text-primary-ink">{accent}</span>
    </h2>
  );
}

export default function TeamView({
  team,
  coordinators,
}: {
  team: TeamMember[];
  coordinators: Coordinator[];
}) {
  const years = [
    ...new Set(team.map((m) => m.year).filter((y) => y && y !== "-")),
  ].sort((a, b) => b.localeCompare(a));
  // Leading year is the newest roster with leaders; junior batches join the current team
  const leadingYear =
    years.find((year) =>
      groupMembers(team.filter((m) => m.year === year)).some(
        (g) => g.title === "Leadership",
      ),
    ) ?? years[0];
  // e.g. "2025-26" -> its 4th years pass out in 2027
  const finalYearPassout = leadingYear
    ? Number(leadingYear.split("-")[0]) + 2
    : 0;
  const current = leadingYear ? currentTeam(team, finalYearPassout) : [];
  const currentCount = current.reduce((n, g) => n + g.members.length, 0);
  const pastYears = years.filter((year) => year <= (leadingYear ?? ""));
  const [selected, setSelected] = useState(pastYears[0] ?? OLDER);
  const past = groupMembers(
    team.filter((m) =>
      selected === OLDER ? m.year === "-" : m.year === selected,
    ),
  );
  const pastCount = past.reduce((n, g) => n + g.members.length, 0);

  return (
    <div>
      <section aria-labelledby="current-team">
        <div
          id="current-team"
          className="flex flex-col gap-2 border-b border-gray-900 pb-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <SectionTitle title="Current" accent="Team" />
          <p className="font-mono text-xs font-bold tracking-widest text-gray-500 uppercase">
            {leadingYear} · {currentCount}{" "}
            {currentCount === 1 ? "person" : "people"}
          </p>
        </div>
        {current.length === 0 ? (
          <p className="py-16 text-center text-gray-500">
            The current team hasn't been added yet.
          </p>
        ) : (
          <GroupGrids groups={current} idPrefix="current" />
        )}

        {coordinators.length > 0 && (
          <section
            aria-labelledby="current-faculty"
            className="border-t border-gray-200 py-10 md:py-12"
          >
            <h3
              id="current-faculty"
              className="mb-6 text-2xl leading-none font-black tracking-tight text-gray-900 uppercase md:mb-8 md:text-4xl"
            >
              Faculty
            </h3>
            <div className="space-y-6">
              {coordinators.map((c) => (
                <CoordinatorCard key={c.name} coordinator={c} />
              ))}
            </div>
          </section>
        )}
      </section>

      <section aria-labelledby="past-teams" className="mt-16 md:mt-24">
        <div id="past-teams" className="border-b border-gray-900 pb-4">
          <SectionTitle title="Past" accent="Teams" />
        </div>
        <div className="flex flex-col gap-3 border-b border-gray-200 py-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex items-center gap-3">
            <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">
              Year
            </span>
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="border border-gray-300 bg-white px-3 py-2 font-mono text-sm font-bold text-gray-900 transition-colors hover:border-gray-900"
            >
              {pastYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
              <option value={OLDER}>Older alumni</option>
            </select>
          </label>
          <p
            className="text-xs font-bold tracking-widest text-gray-500 uppercase"
            aria-live="polite"
          >
            {pastCount} {pastCount === 1 ? "person" : "people"}
          </p>
        </div>
        {past.length === 0 ? (
          <p className="py-16 text-center text-gray-500">
            No members listed for this year.
          </p>
        ) : (
          <GroupGrids groups={past} idPrefix="past" />
        )}
      </section>
    </div>
  );
}
