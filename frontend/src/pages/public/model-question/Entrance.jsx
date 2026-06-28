import BackButton from "../components/BackButton";

export default function Entrance() {
  return (
    <div className="min-h-screen bg-slate-50 pt-28 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold">
          Entrance Materials
        </h1>

        <p className="mt-3 text-gray-500">
          Add entrance model questions, syllabus, notes, PDFs, etc. here.
        </p>
        <BackButton />
      </div>
    </div>
  );
}