/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../../api/axios";
import SectionHeader from "../../components/SectionHeader";
import MemberModal from "./teams/MemberModal";

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

  const groupByDesignation = (members) => {
    const groups = {};
    members.forEach((m) => {
      if (!groups[m.designation]) groups[m.designation] = [];
      groups[m.designation].push(m);
    });
    return groups;
  };

  const groups = groupByDesignation(members);
  if (loading) return <div className="text-center py-20">Loading team...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 pt-20 pb-10">
      <SectionHeader
        title="Our Leadership"
        subtitle="Meet the team behind BCA Association"
      />
      {Object.entries(groups).map(([designation, membersList]) => (
        <div key={designation} className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6">
            {designation}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {membersList.map((member) => (
              <motion.div
                key={member._id}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedMember(member)}
                className="cursor-pointer group"
              >
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={member.image || "/association.png"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center mt-3">
                  <p className="font-semibold">{member.name}</p>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                    {member.designation}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
      {selectedMember && (
        <MemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </div>
  );
}
