/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "../../components/SectionHeader";
import ContactSection from "../../components/ContactSection";
import MemberModal from "./MemberModal";
import teamData from "./teamData";
import Logo from "/association.png";

const TeamsPage = () => {
  const [activeYear, setActiveYear] = useState(teamData[0]);
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 pt-20 pb-10">
        <SectionHeader
          title="Our Leadership"
          subtitle="Explore current and past association teams"
        />
        {/* YEAR SWITCH */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          {teamData.map((year, idx) => (
            <button
              key={idx}
              onClick={() => setActiveYear(year)}
              className={`px-6 py-2 rounded-full border transition-all duration-300 ${
                activeYear.year === year.year
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white hover:bg-blue-50"
              }`}
            >
              {year.year}
            </button>
          ))}
        </div>

        {/* TIMELINE */}
        <div className="relative mt-16 border-l-2 border-blue-200 pl-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeYear.year}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                {activeYear.year}
                {activeYear.current && (
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                    Current
                  </span>
                )}
              </h2>

              {activeYear.teams.map((team, index) => (
                <div key={index} className="mb-12">
                  <h3 className="text-xl font-semibold text-blue-700 mb-6">
                    {team.title}
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {team.members.map((member, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedMember(member)}
                        className="cursor-pointer group"
                      >
                        <div className="relative w-32 h-32 mx-auto">
                          <img
                            src={member.image || Logo}
                            alt={member.name}
                            className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl group-hover:shadow-2xl"
                            onError={(e) => (e.target.src = Logo)}
                          />
                        </div>

                        <div className="text-center mt-3">
                          <p className="font-semibold text-gray-800">
                            {member.name}
                          </p>
                          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                            {member.designation}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
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
