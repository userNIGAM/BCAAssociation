import { useParams } from "react-router-dom";
import { FileText } from "lucide-react";

const papers = {
  1: ["2025", "2024", "2023", "2022", "2021"],
  2: ["2025", "2024", "2023", "2022", "2021"],
  3: ["2025", "2024", "2023", "2022", "2021"],
  4: ["2025", "2024", "2023", "2022", "2021"],
  5: ["2025", "2024", "2023", "2022", "2021"],
  6: ["2025", "2024", "2023", "2022", "2021"],
  7: ["2025", "2024", "2023", "2022", "2021"],
  8: ["2025", "2024", "2023", "2022", "2021"],
};

export default function ModalQuestion() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-slate-50 pt-28 px-6">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold">
          Semester {id}
        </h1>

        <p className="text-gray-500 mt-2 mb-8">
          Previous Year Question Papers
        </p>

        <div className="space-y-4">
          {papers[id]?.map((year) => (
            <a
              key={year}
              href={`/papers/semester-${id}/${year}.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-white rounded-xl border p-5 hover:border-blue-500 hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <FileText className="text-blue-600" />
                <span>{year} Question Paper</span>
              </div>

              <span className="text-blue-600 font-medium">
                Open
              </span>
            </a>
          ))}
        </div>

      </div>
    </div>
  );
}