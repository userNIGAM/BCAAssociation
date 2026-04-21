/* eslint-disable no-unused-vars */
import { X, Mail, Phone, MapPin, Globe } from "lucide-react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function MemberModal({ member, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-md rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl p-6"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-100"
          >
            <X size={18} />
          </button>
          <div className="flex justify-center">
            <img
              src={member.image || "/association.png"}
              alt={member.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-600"
            />
          </div>
          <div className="text-center mt-4">
            <h2 className="text-2xl font-bold">{member.name}</h2>
            <span className="text-sm text-blue-600">{member.designation}</span>
            {member.bio && (
              <p className="text-gray-600 text-sm mt-2">{member.bio}</p>
            )}
            <div className="mt-4 space-y-1">
              {member.email && (
                <div className="flex justify-center gap-2">
                  <Mail size={16} />
                  <a href={`mailto:${member.email}`}>{member.email}</a>
                </div>
              )}
              {member.contact && (
                <div className="flex justify-center gap-2">
                  <Phone size={16} />
                  <a href={`tel:${member.contact}`}>{member.contact}</a>
                </div>
              )}
              {member.address && (
                <div className="flex justify-center gap-2">
                  <MapPin size={16} />
                  <span>{member.address}</span>
                </div>
              )}
            </div>
            {(member.social_links?.instagram ||
              member.social_links?.linkedin) && (
              <div className="flex justify-center gap-4 mt-4">
                {member.social_links.instagram && (
                  <a href={member.social_links.instagram} target="_blank">
                    <FaInstagram />
                  </a>
                )}
                {member.social_links.linkedin && (
                  <a href={member.social_links.linkedin} target="_blank">
                    <FaLinkedin />
                  </a>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
