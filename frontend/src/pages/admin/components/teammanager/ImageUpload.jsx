export default function ImageUpload({ form, setForm }) {
  return (
    <div className="space-y-3 md:col-span-2">
      <label className="block text-sm font-medium text-gray-700">
        Profile Image
      </label>

      {form.image && (
        <div className="flex items-center gap-3 mb-2">
          <img
            src={form.image}
            alt="preview"
            className="w-16 h-16 rounded-full object-cover border"
          />

          <button
            type="button"
            onClick={() => setForm({ ...form, image: "" })}
            className="text-red-600 text-sm"
          >
            Remove
          </button>
        </div>
      )}

      {/* FILE UPLOAD (REAL FIX) */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (!file) return;

          setForm({ ...form, image: file }); // 🔥 store FILE, not base64
        }}
        className="w-full text-sm"
      />

      <p className="text-xs text-gray-500 mt-1">
        Upload JPG, PNG, WEBP (max 5MB)
      </p>
    </div>
  );
}