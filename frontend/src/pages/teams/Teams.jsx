/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "../../components/SectionHeader";
import ContactSection from "../../components/ContactSection";
import Logo from "/association.png";
import teamData from "./teamData";
import MemberModal from "./MemberModal";

const TeamsPage = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 pt-20">
        <SectionHeader
          title="Meet Our Team"
          subtitle="The leadership behind BCA Association MMC"
        />

        {teamData.map((team, index) => (
          <div key={index} className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 text-center">
              {team.position}
            </h2>

            <div
              className={`mt-8 grid gap-8 ${
                index === 0
                  ? "grid-cols-1 place-items-center"
                  : "grid-cols-2 md:grid-cols-4"
              }`}
            >
              {team.members.map((member, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedMember(member)}
                  className="cursor-pointer group"
                >
                  <div className="relative w-40 h-40 mx-auto">
                    <img
                      src={member.image || Logo}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl group-hover:shadow-2xl transition"
                      onError={(e) => (e.target.src = Logo)}
                    />

                    {/* Glow ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-blue-500 opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  </div>

                  <div className="text-center mt-4">
                    <p className="text-lg font-semibold text-gray-800">
                      {member.name}
                    </p>
                    <p className="text-sm text-blue-600">
                      {member.designation}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <ContactSection />

      {selectedMember && (
        <MemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </>
  );
};

export default TeamsPage;
