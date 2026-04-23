/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../../api/axios";
import MemberModal from "./teams/MemberModal";

// ── Designation → color mapping (no icons) ─────────────────────────────────
const DESIGNATION_COLOR = {
  President:       "#f59e0b",
  "Vice President": "#6366f1",
  Secretary:       "#10b981",
  Treasurer:       "#f97316",
  Developer:       "#3b82f6",
  Designer:        "#ec4899",
  Marketing:       "#8b5cf6",
  Outreach:        "#14b8a6",
  Member:          "#64748b",
  Mentor:          "#a78bfa",
  Advisor:         "#fbbf24",
  "Community Lead": "#f43f5e",
};

function getDesignationColor(designation) {
  const key = Object.keys(DESIGNATION_COLOR).find(
    (k) => k.toLowerCase() === designation?.toLowerCase()
  );
  return DESIGNATION_COLOR[key] || "#94a3b8";
}

// ── Simple designation badge (text only) ───────────────────────────────────
function DesignationBadge({ designation }) {
  const color = getDesignationColor(designation);
  return (
    <span
      className="text-xs font-medium px-3 py-1 rounded-full"
      style={{
        color: color,
        backgroundColor: `${color}12`,
        border: `1px solid ${color}30`,
      }}
    >
      {designation}
    </span>
  );
}

// ── Simple member card (fixed width for centering) ─────────────────────────
function MemberCard({ member, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(member)}
      className="cursor-pointer w-40 sm:w-44"
    >
      <div className="rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
        <div className="p-4 flex flex-col items-center text-center gap-2">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-slate-100 shadow-sm">
            <img
              src={member.image || "/association.png"}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name & Batch */}
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">
              {member.name}
            </h3>
            {member.batch && (
              <p className="text-xs text-slate-400 mt-0.5">Batch {member.batch}</p>
            )}
          </div>

          {/* Designation badge */}
          <DesignationBadge designation={member.designation} />
        </div>
      </div>
    </motion.div>
  );
}

// ── Section heading (centered) ────────────────────────────────────────────
function SectionHeading({ designation, count }) {
  const color = getDesignationColor(designation);
  return (
    <div className="flex flex-col items-center text-center mb-6">
      <div
        className="w-12 h-0.5 rounded-full mb-2"
        style={{ backgroundColor: color }}
      />
      <h2 className="text-xl font-bold text-slate-800">{designation}</h2>
      <p className="text-xs text-slate-400 mt-0.5">
        {count} {count === 1 ? "member" : "members"}
      </p>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────
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

  // Group members by designation
  const groupByDesignation = (list) => {
    const groups = {};
    list.forEach((m) => {
      if (!groups[m.designation]) groups[m.designation] = [];
      groups[m.designation].push(m);
    });
    return groups;
  };

  const groups = groupByDesignation(members);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50">
        <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-blue-500 animate-spin" />
        <p className="text-slate-400 text-sm">Loading team...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        {/* Header - centered */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Our Team
          </h1>
          <p className="mt-2 text-slate-500 max-w-md mx-auto">
            Meet the dedicated members of the BCA Association
          </p>
        </div>

        {/* Team sections - cards centered using flex wrap */}
        {Object.keys(groups).length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            No team members found.
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groups).map(([designation, membersList]) => (
              <div key={designation}>
                <SectionHeading designation={designation} count={membersList.length} />
                <div className="flex flex-wrap justify-center gap-5">
                  {membersList.map((member) => (
                    <MemberCard
                      key={member._id}
                      member={member}
                      onClick={setSelectedMember}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Member modal */}
      {selectedMember && (
        <MemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </div>
  );
}