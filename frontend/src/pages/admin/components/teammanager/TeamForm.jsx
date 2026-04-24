import FormInput from "./FormInput";
import ImageUpload from "./ImageUpload";
import { designations } from "./constants";

export default function TeamForm({
  form,
  setForm,
  editing,
  onSubmit,
  onCancel,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-6 rounded-xl shadow-md mb-6"
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        {editing ? "Edit Member" : "Add New Member"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormInput
          label="Full Name"
          required
          type="text"
          placeholder="e.g., John Doe"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <FormInput
          label="Email Address"
          required
          type="email"
          placeholder="e.g., john@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Designation *
          </label>

          <select
            value={form.designation}
            onChange={(e) =>
              setForm({ ...form, designation: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            required
          >
            <option value="">Select Designation</option>

            {designations.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>

        <FormInput
          label="Contact Number"
          type="tel"
          placeholder="e.g., +1 234 567 8900"
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
        />

        <FormInput
          label="Address"
          type="text"
          placeholder="Street, City, Country"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <ImageUpload form={form} setForm={setForm} />

        <div className="space-y-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Bio / Description
          </label>

          <textarea
            placeholder="Write a short bio about the member..."
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            rows="3"
          />

          <p className="text-xs text-gray-500">
            Maximum 500 characters recommended
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium shadow-sm"
        >
          {editing ? "Update Member" : "Create Member"}
        </button>
      </div>
    </form>
  );
}