/* eslint-disable no-unused-vars */
import { X, Mail, Phone, MapPin, Globe } from "lucide-react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

const MemberModal = ({ member, onClose }) => {
  // Lock scroll + ESC close
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <AnimatePresence mode="wait">
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
          transition={{ duration: 0.35 }}
          className="relative w-full max-w-md rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/30 p-6 max-h-[90vh] overflow-y-auto"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            <X size={18} />
          </button>

          {/* Image */}
          <div className="flex justify-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-600 shadow-lg">
              <img
                src={member.image || "/association.png"}
                alt={member.name}
                className="w-full h-full object-cover"
                onError={(e) => (e.target.src = "/association.png")}
              />
            </div>
          </div>

          {/* Info */}
          <div className="text-center mt-6 space-y-3">
            <h2 className="text-2xl font-bold text-gray-800">{member.name}</h2>

            <span className="text-sm font-medium text-blue-600">
              {member.designation}
            </span>

            {member.bio && (
              <p className="text-gray-600 text-sm leading-relaxed">
                {member.bio}
              </p>
            )}

            {/* Contact */}
            <div className="pt-4 border-t space-y-2">
              {member.email && (
                <div className="flex justify-center items-center gap-2 text-sm">
                  <Mail size={16} />
                  <a
                    href={`mailto:${member.email}`}
                    className="hover:underline"
                  >
                    {member.email}
                  </a>
                </div>
              )}

              {member.phone && (
                <div className="flex justify-center items-center gap-2 text-sm">
                  <Phone size={16} />
                  <a href={`tel:${member.phone}`}>{member.phone}</a>
                </div>
              )}

              {member.address && (
                <div className="flex justify-center items-center gap-2 text-sm">
                  <MapPin size={16} />
                  <span>{member.address}</span>
                </div>
              )}
            </div>

            {/* Social */}
            <div className="flex justify-center gap-4 pt-4">
              {member.instagram && (
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-pink-50 hover:bg-pink-100 transition"
                >
                  <FaInstagram size={18} />
                </a>
              )}

              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition"
                >
                  <FaLinkedin size={18} />
                </a>
              )}

              {member.website && (
                <a
                  href={member.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                >
                  <Globe size={18} />
                </a>
              )}
            </div>

            {/* Department */}
            {member.department && (
              <div className="pt-3">
                <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  {member.department}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MemberModal;
