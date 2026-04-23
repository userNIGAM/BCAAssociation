import { designations } from "./constants";
import ImageUpload from "./ImageUpload";

export default function TeamForm({
  form,
  setForm,
  editing,
  onSubmit,
  onCancel,
}) {
  return (
    <form onSubmit={onSubmit} className="bg-white p-6 rounded-xl shadow mb-6">
      <h3 className="text-lg font-semibold mb-4">
        {editing ? "Edit Member" : "Add Member"}
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <select
          value={form.designation}
          onChange={(e) => setForm({ ...form, designation: e.target.value })}
          required
        >
          <option value="">Select Designation</option>
          {designations.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        <input
          type="tel"
          placeholder="Contact"
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
        />

        <input
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
      </div>

      <ImageUpload form={form} setForm={setForm} />

      <textarea
        placeholder="Bio"
        value={form.bio}
        onChange={(e) => setForm({ ...form, bio: e.target.value })}
        className="w-full mt-4"
      />

      <div className="flex justify-end gap-3 mt-4">
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit">{editing ? "Update" : "Create"}</button>
      </div>
    </form>
  );
}
