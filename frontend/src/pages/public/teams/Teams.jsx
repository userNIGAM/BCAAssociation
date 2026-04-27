import { useEffect, useMemo, useState } from "react";
import api from "../../../api/axios";
import MemberModal from "./MemberModal";
import TeamSection from "./TeamSection";
import TeamSkeletonSection from "./TeamSkeletonSection";
import { SECTION_RULES, SECTION_ORDER } from "./teamSections";

export default function TeamsPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const { data } = await api.get("/team");

        setMembers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const groupedSections = useMemo(() => {
    const sections = Object.fromEntries(
      SECTION_RULES.map((rule) => [rule.name, []]),
    );

    members.forEach((member) => {
      const designation = member.designation?.toLowerCase() || "";

      const matchedRule = SECTION_RULES.find((rule) => rule.match(designation));

      if (matchedRule) {
        sections[matchedRule.name].push(member);
      } else {
        sections["Executive Members"].push(member);
      }
    });

    sections["Tech Team"].sort((a, b) => {
      const aLead = a.designation.toLowerCase().includes("lead");

      const bLead = b.designation.toLowerCase().includes("lead");

      return bLead - aLead;
    });

    sections["Graphics Team"].sort((a, b) => {
      const aLead = a.designation.toLowerCase().includes("lead");

      const bLead = b.designation.toLowerCase().includes("lead");

      return bLead - aLead;
    });

    return sections;
  }, [members]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* header skeleton */}
          <div className="text-center mb-24 animate-pulse">
            <div className="h-14 w-80 bg-blue-100 rounded mx-auto" />

            <div className="h-5 w-64 bg-slate-100 rounded mx-auto mt-6" />
          </div>

          <TeamSkeletonSection />
          <TeamSkeletonSection />
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-24">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-blue-700">
            Meet Our Team
          </h1>

          <p className="mt-4 text-slate-500 text-base sm:text-lg">
            The people behind the BCA Association
          </p>
        </div>

        {SECTION_ORDER.map((section) => (
          <TeamSection
            key={section}
            title={section}
            members={groupedSections[section]}
            onClick={setSelectedMember}
            centered={groupedSections[section]?.length === 1}
          />
        ))}
      </div>

      {selectedMember && (
        <MemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </div>
  );
}
