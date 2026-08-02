import { X, Mail, Phone, MapPin } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

// Define all possible social platforms with their icons and key names
const SOCIAL_PLATFORMS = [
  { key: "facebook", icon: FaFacebook, label: "Facebook" },
  { key: "instagram", icon: FaInstagram, label: "Instagram" },
  { key: "linkedin", icon: FaLinkedin, label: "LinkedIn" },
  { key: "twitter", icon: FaTwitter, label: "Twitter" },
  { key: "github", icon: FaGithub, label: "GitHub" },
];

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

  // Collect only the social links that actually have a value
  const activeSocialLinks = SOCIAL_PLATFORMS.filter(
    (platform) => member.social_links?.[platform.key],
  );

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

            <div className="mt-6 space-y-3">
              {member.email && (
                <div className="flex items-center justify-center gap-3 text-gray-700">
                  <Mail className="w-4 h-4 shrink-0" />
                  <a
                    href={`mailto:${member.email}`}
                    className="hover:text-blue-600 break-all"
                  >
                    {member.email}
                  </a>
                </div>
              )}

              {member.contact && (
                <div className="flex items-center justify-center gap-3 text-gray-700">
                  <Phone className="w-4 h-4 shrink-0" />
                  <a
                    href={`tel:${member.contact}`}
                    className="hover:text-blue-600"
                  >
                    {member.contact}
                  </a>
                </div>
              )}

              {member.address && (
                <div className="flex items-center justify-center gap-3 text-gray-700">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span className="text-center">{member.address}</span>
                </div>
              )}
            </div>

            {/* Social Links - Dynamically rendered */}
            {activeSocialLinks.length > 0 && (
              <div className="flex justify-center items-center gap-5 mt-6">
                {activeSocialLinks.map(({ key, icon: Icon, label }) => (
                  <a
                    key={key}
                    href={member.social_links[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-gray-500 hover:text-blue-600 transition-all duration-200 hover:scale-110"
                  >
                    <Icon size={24} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
