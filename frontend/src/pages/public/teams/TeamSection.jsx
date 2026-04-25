/* eslint-disable no-unused-vars */

import { motion } from "framer-motion";
import TeamMemberCard from "./TeamMemberCard";

export default function TeamSection({
  title,
  members,
  onClick,
  centered = false,
}) {
  if (!members?.length) return null;

  return (
    <section className="mb-20">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-700">
          {title}
        </h2>

        <div className="w-20 h-1 bg-blue-700 mx-auto mt-3 rounded-full" />
      </motion.div>

      <div
        className={`
          grid gap-6
          ${
            centered
              ? "grid-cols-1 place-items-center"
              : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
          }
        `}
      >
        {members.map((member) => (
          <div
            key={member._id}
            className={centered ? "w-full max-w-xs" : ""}
          >
            <TeamMemberCard
              member={member}
              onClick={onClick}
            />
          </div>
        ))}
      </div>
    </section>
  );
}