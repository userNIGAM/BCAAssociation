/* eslint-disable no-unused-vars */

import { motion } from "framer-motion";

export default function TeamMemberCard({
  member,
  onClick,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick(member)}
      className="group cursor-pointer"
    >
      <div className="bg-white border border-blue-100 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center">
        <div className="flex justify-center">
          <div className="relative">
            <img
              src={member.image || "/association.png"}
              alt={member.name}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-blue-100 group-hover:scale-105 transition duration-500"
            />

            <div className="absolute inset-0 rounded-full border-2 border-blue-700/10" />
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-lg sm:text-xl font-bold text-blue-700">
            {member.name}
          </h3>

          <p className="mt-2 text-sm font-medium text-slate-600">
            {member.designation}
          </p>

          {member.batch && (
            <p className="mt-2 text-sm text-slate-400">
              Batch {member.batch}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}