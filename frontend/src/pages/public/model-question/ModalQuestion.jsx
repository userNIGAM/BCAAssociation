import { useNavigate } from "react-router-dom";
import { FileText, ChevronRight } from "lucide-react";
import BackButton from "../components/BackButton";

const semesters = [
  { id: 1, name: "Semester 1" },
  { id: 2, name: "Semester 2" },
  { id: 3, name: "Semester 3" },
  { id: 4, name: "Semester 4" },
  { id: 5, name: "Semester 5" },
  { id: 6, name: "Semester 6" },
  { id: 7, name: "Semester 7" },
  { id: 8, name: "Semester 8" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 p-6 mt-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          TU BCA Question Papers
        </h1>

        <p className="text-slate-500 mb-8">
          Previous Year Question Papers (Semester 1 - 8)
        </p>
          <BackButton />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {semesters.map((semester) => (
            <button
              key={semester.id}
              onClick={() => navigate(`/semester/${semester.id}`)}
              className="group bg-white rounded-2xl border border-slate-200 p-6 text-left hover:border-blue-500 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <FileText className="text-blue-600" size={24} />
                </div>

                <ChevronRight
                  className="text-slate-400 group-hover:translate-x-1 transition"
                  size={20}
                />
              </div>

              <h2 className="mt-5 text-xl font-semibold text-slate-900">
                {semester.name}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                View Previous Year Papers
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}