// /* eslint-disable no-unused-vars */
// import { useEffect, useMemo, useState } from "react";
// import { motion } from "framer-motion";

// import api from "../../../api/axios";
// import MemberModal from "./MemberModal";

// // ─────────────────────────────────────────────
// // SECTION CONFIGURATION (rules in priority order)
// // ─────────────────────────────────────────────

// const SECTION_RULES = [
//   {
//     name: "President",
//     match: (d) => d.includes("president") && !d.includes("vice"),
//   },
//   { name: "Vice President", match: (d) => d.includes("vice president") },
//   { name: "Secretary", match: (d) => d.includes("secretary") },
//   { name: "Treasurer", match: (d) => d.includes("treasurer") },
//   {
//     name: "Tech Team",
//     match: (d) => d.includes("tech") || d.includes("developer"),
//   },
//   {
//     name: "Graphics Team",
//     match: (d) => d.includes("graphic") || d.includes("designer"),
//   },
//   { name: "Executive Members", match: (d) => true }, // catch-all
// ];

// const SECTION_ORDER = SECTION_RULES.map((rule) => rule.name);

// // ─────────────────────────────────────────────
// // CARD
// // ─────────────────────────────────────────────

// function TeamMemberCard({ member, onClick }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 25 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       whileHover={{
//         y: -6,
//         scale: 1.02,
//       }}
//       transition={{ duration: 0.3 }}
//       onClick={() => onClick(member)}
//       className="group cursor-pointer"
//     >
//       <div className="bg-white border border-blue-100 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center">
//         {/* image */}
//         <div className="flex justify-center">
//           <div className="relative">
//             <img
//               src={member.image || "/association.png"}
//               alt={member.name}
//               className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-blue-100 group-hover:scale-105 transition duration-500"
//             />

//             <div className="absolute inset-0 rounded-full border-2 border-blue-700/10" />
//           </div>
//         </div>

//         {/* content */}
//         <div className="mt-5">
//           <h3 className="text-lg sm:text-xl font-bold text-blue-700">
//             {member.name}
//           </h3>

//           <p className="mt-2 text-sm font-medium text-slate-600">
//             {member.designation}
//           </p>

//           {member.batch && (
//             <p className="mt-2 text-sm text-slate-400">Batch {member.batch}</p>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// // ─────────────────────────────────────────────
// // SECTION
// // ─────────────────────────────────────────────

// function TeamSection({ title, members, onClick, centered = false }) {
//   if (!members?.length) return null;

//   return (
//     <section className="mb-20">
//       {/* title */}
//       <motion.div
//         initial={{ opacity: 0, y: 15 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         className="text-center mb-10"
//       >
//         <h2 className="text-2xl sm:text-3xl font-bold text-blue-700">
//           {title}
//         </h2>

//         <div className="w-20 h-1 bg-blue-700 mx-auto mt-3 rounded-full" />
//       </motion.div>

//       {/* cards */}
//       <div
//         className={`
//           grid gap-6
//           ${
//             centered
//               ? "grid-cols-1 place-items-center"
//               : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
//           }
//         `}
//       >
//         {members.map((member) => (
//           <div key={member._id} className={centered ? "w-full max-w-xs" : ""}>
//             <TeamMemberCard member={member} onClick={onClick} />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// // ─────────────────────────────────────────────
// // MAIN PAGE
// // ─────────────────────────────────────────────

// export default function TeamsPage() {
//   const [members, setMembers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedMember, setSelectedMember] = useState(null);

//   // fetch members
//   useEffect(() => {
//     const fetchMembers = async () => {
//       try {
//         const { data } = await api.get("/team");
//         setMembers(data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMembers();
//   }, []);

//   // organize members into sections using rule-based approach
//   const groupedSections = useMemo(() => {
//     // initialize empty arrays for each section
//     const sections = Object.fromEntries(
//       SECTION_RULES.map((rule) => [rule.name, []]),
//     );

//     members.forEach((member) => {
//       const designation = member.designation?.toLowerCase() || "";
//       // find the first matching rule (priority order)
//       const matchedRule = SECTION_RULES.find((rule) => rule.match(designation));
//       if (matchedRule) {
//         sections[matchedRule.name].push(member);
//       } else {
//         // fallback (should never happen because catch-all exists)
//         sections["Executive Members"].push(member);
//       }
//     });

//     // sort tech team: leads first
//     sections["Tech Team"].sort((a, b) => {
//       const aLead = a.designation.toLowerCase().includes("lead");
//       const bLead = b.designation.toLowerCase().includes("lead");
//       return bLead - aLead;
//     });

//     // sort graphics team: leads first
//     sections["Graphics Team"].sort((a, b) => {
//       const aLead = a.designation.toLowerCase().includes("lead");
//       const bLead = b.designation.toLowerCase().includes("lead");
//       return bLead - aLead;
//     });

//     return sections;
//   }, [members]);

//   // loading
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{
//             duration: 1,
//             repeat: Infinity,
//             ease: "linear",
//           }}
//           className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-700"
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         {/* header */}
//         <motion.div
//           initial={{ opacity: 0, y: 25 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-24"
//         >
//           <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-blue-700">
//             Meet Our Team
//           </h1>

//           <p className="mt-4 text-slate-500 text-base sm:text-lg">
//             The people behind the BCA Association
//           </p>
//         </motion.div>

//         {/* sections - automatically center any section with exactly one member */}
//         {SECTION_ORDER.map((section) => (
//           <TeamSection
//             key={section}
//             title={section}
//             members={groupedSections[section]}
//             onClick={setSelectedMember}
//             centered={groupedSections[section]?.length === 1}
//           />
//         ))}
//       </div>

//       {/* modal */}
//       {selectedMember && (
//         <MemberModal
//           member={selectedMember}
//           onClose={() => setSelectedMember(null)}
//         />
//       )}
//     </div>
//   );
// }

// /* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";

import api from "../../../api/axios";

import MemberModal from "./MemberModal";

import TeamSection from "./TeamSection";
// import Loader from "./Loader";
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
