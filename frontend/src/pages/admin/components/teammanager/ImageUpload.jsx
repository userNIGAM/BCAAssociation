/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

export default function ImageUpload({ form, setForm }) {
  const [preview, setPreview] = useState("");

  // create preview when file changes
  useEffect(() => {
    if (!form.image) {
      setPreview("");
      return;
    }

    // if it's a File object
    if (form.image instanceof File) {
      const objectUrl = URL.createObjectURL(form.image);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }

    // if it's URL (editing existing user)
    setPreview(form.image);
  }, [form.image]);

  return (
    <div className="space-y-3 md:col-span-2">
      <label className="block text-sm font-medium text-gray-700">
        Profile Image
      </label>

      {/* IMAGE PREVIEW */}
      {preview && (
        <div className="flex items-center gap-3">
          <img
            src={preview}
            alt="preview"
            className="w-16 h-16 rounded-full object-cover border"
          />

          <button
            type="button"
            onClick={() => setForm({ ...form, image: "" })}
            className="text-red-600 text-sm hover:text-red-800"
          >
            Remove
          </button>
        </div>
      )}

      {/* FILE INPUT (STYLED BUTTON) */}
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;

            setForm({ ...form, image: file });
          }}
          className="hidden"
          id="imageUpload"
        />

        <label
          htmlFor="imageUpload"
          className="inline-flex items-center justify-center px-4 py-2 border-2 border-green-600 text-green-700 rounded-lg cursor-pointer hover:bg-green-50 transition font-medium"
        >
          Choose Image
        </label>
      </div>

      <p className="text-xs text-gray-500">
        JPG, PNG, WEBP supported (max 5MB recommended)
      </p>
    </div>
  );
}
