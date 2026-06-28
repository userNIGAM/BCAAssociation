import { useNavigate } from "react-router-dom";
import { FileText, GraduationCap } from "lucide-react";
import BackButton from "../components/BackButton";

export default function ModalOptions() {
  const navigate = useNavigate();

  const options = [
    {
      title: "Entrance",
      description: "Entrance Preparation Materials",
      icon: <GraduationCap className="text-blue-600" size={28} />,
      path: "/entrance",
    },
    {
      title: "Yearly Modal Questions",
      description: "Previous Year Question Papers",
      icon: <FileText className="text-blue-600" size={28} />,
      path: "/yearly-modal-questions",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-28 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900">
          Model Questions
        </h1>

        <p className="text-slate-500 mt-2 mb-8">
          Choose one of the options below
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {options.map((item) => (
            <button
              key={item.title}
              onClick={() => navigate(item.path)}
              className="bg-white border rounded-2xl p-6 text-left hover:border-blue-500 hover:shadow-lg transition"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
                {item.icon}
              </div>

              <h2 className="mt-5 text-xl font-semibold">
                {item.title}
              </h2>

              <p className="mt-2 text-gray-500">
                {item.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}