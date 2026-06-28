import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ label = "Back" }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 transition"
    >
      <ArrowLeft size={18} />
      <span>{label}</span>
    </button>
  );
}