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
            alt="Profile preview"
            className="w-16 h-16 rounded-full object-cover border border-gray-300"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/64?text=Invalid+URL";
            }}
          />

          <button
            type="button"
            onClick={() => setForm({ ...form, image: "" })}
            className="text-red-600 text-sm hover:text-red-800"
          >
            Remove Image
          </button>
        </div>
      )}

      <div>
        <input
          type="text"
          placeholder="image"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
        />

        <p className="text-xs text-gray-500 mt-1">
          Enter a valid image URL
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Or upload from device
        </label>

        <input
          type="file"
          accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
          onChange={(e) => {
            const file = e.target.files[0];

            if (file) {
              const reader = new FileReader();

              reader.onloadend = () => {
                setForm({ ...form, image: reader.result });
              };

              reader.readAsDataURL(file);
            }
          }}
          className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition"
        />

        <p className="text-xs text-gray-500 mt-1">
          Supported: JPG, PNG, GIF, WEBP (max 5MB recommended)
        </p>
      </div>
    </div>
  );
}