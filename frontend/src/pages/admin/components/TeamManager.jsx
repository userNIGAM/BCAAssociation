import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../../api/axios";

const designations = [
  "President",
  "Vice President",
  "Secretary",
  "Vice Secretary",
  "Treasurer",
  "Tech Lead",
  "Tech Member",
  "Graphics Lead",
  "Graphics Member",
  "Executive Member",
];

export default function TeamManager() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    designation: "",
    bio: "",
    address: "",
    contact: "",
    image: "",
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const { data } = await api.get("/team");
      setMembers(data);
    } catch (error) {
      toast.error("Failed to load team",error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/team/${editing}`, form);
        toast.success("Member updated");
      } else {
        await api.post("/team", form);
        toast.success("Member added");
      }
      setShowForm(false);
      setEditing(null);
      setForm({
        name: "",
        email: "",
        designation: "",
        bio: "",
        address: "",
        contact: "",
        image: "",
      });
      fetchMembers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this member?")) {
      try {
        await api.delete(`/team/${id}`);
        toast.success("Member deleted");
        fetchMembers();
      } catch (error) {
        toast.error("Delete failed",error);
      }
    }
  };

  const editMember = (member) => {
    setEditing(member._id);
    setForm(member);
    setShowForm(true);
  };

  if (loading) return <div>Loading team...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Team Members</h2>
        <button
          onClick={() => {
            setEditing(null);
            setForm({
              name: "",
              email: "",
              designation: "",
              bio: "",
              address: "",
              contact: "",
              image: "",
            });
            setShowForm(!showForm);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} /> Add Member
        </button>
      </div>
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded-xl shadow mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <select
            value={form.designation}
            onChange={(e) => setForm({ ...form, designation: e.target.value })}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Designation</option>
            {designations.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Contact"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="border p-2 rounded"
          />
          <textarea
            placeholder="Bio"
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="border p-2 rounded col-span-2"
            rows="3"
          />
          <div className="col-span-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              {editing ? "Update" : "Create"}
            </button>
          </div>
        </form>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Name</th>
              <th>Designation</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m._id} className="border-t">
                <td className="p-3">{m.name}</td>
                <td>{m.designation}</td>
                <td>{m.email}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => editMember(m)}
                    className="text-blue-600"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(m._id)}
                    className="text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
