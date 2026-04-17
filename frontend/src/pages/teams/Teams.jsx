import { useState } from "react";
import SectionHeader from "../../components/SectionHeader";
import ContactSection from "../../components/ContactSection";
import Logo from "/association.png";
import teamData from "./teamData";
import MemberModal from "./MemberModal";

const TeamsPage = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const handleOpen = (member) => setSelectedMember(member);
  const handleClose = () => setSelectedMember(null);

  return (
    <>
      <div className="max-w-6xl relative mx-auto text-center bg-white pt-20">
        <SectionHeader
          title="Meet Our Team"
          subtitle="The leadership behind BCA Association MMC"
        />

        {/* President Section */}
        <div className="mb-12">
          {teamData.slice(0, 1).map((team, index) => (
            <div key={index} className="mb-10">
              <h2 className="text-3xl font-bold text-blue-900">
                {team.position}
              </h2>
              <div className="flex justify-center gap-6 mt-6">
                {team.members.map((member, idx) => (
                  <div
                    key={idx}
                    className="text-center cursor-pointer"
                    onClick={() => handleOpen(member)}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="rounded-full w-40 h-40 object-cover mx-auto"
                    />
                    <p className="mt-2 text-lg font-medium text-blue-900">
                      {member.name}
                    </p>
                    <p className="text-md text-gray-600">
                      {member.designation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Vice Presidents & Secretaries Section */}
        <div className="mb-12">
          {teamData.slice(1, 2).map((team, index) => (
            <div key={index} className="mb-10">
              <h2 className="text-2xl font-bold text-blue-900">
                {team.position}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                {team.members.map((member, idx) => (
                  <div
                    key={idx}
                    className="text-center cursor-pointer"
                    onClick={() => handleOpen(member)}
                  >
                    <img
                      src={member.image || Logo}
                      alt={member.name}
                      className="rounded-full w-40 h-40 object-cover mx-auto"
                    />
                    <p className="mt-2 text-lg font-medium text-blue-900">
                      {member.name}
                    </p>
                    <p className="text-md text-gray-600">
                      {member.designation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Executive Members Section */}
        <div>
          {teamData.slice(2).map((team, index) => (
            <div key={index}>
              <h2 className="text-2xl font-bold text-blue-900 mt-8">
                {team.position}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                {team.members.map((member, idx) => (
                  <div
                    key={idx}
                    className="text-center cursor-pointer"
                    onClick={() => handleOpen(member)}
                  >
                    <img
                      src={member.image || Logo}
                      alt={member.name}
                      className="rounded-full w-40 h-40 object-cover mx-auto"
                    />
                    <p className="mt-2 text-lg font-medium text-blue-900">
                      {member.name}
                    </p>
                    <p className="text-md text-gray-600">
                      {member.designation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ContactSection />
      {selectedMember && (
        <MemberModal member={selectedMember} onClose={handleClose} />
      )}
    </>
  );
};

export default TeamsPage;
