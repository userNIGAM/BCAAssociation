import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../../../api/axios";

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
      toast.error("Failed to load team", error);
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
        toast.error("Delete failed", error);
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
          className="bg-white p-6 rounded-xl shadow-md mb-6"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            {editing ? "Edit Member" : "Add New Member"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Basic Information */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="e.g., John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Email Address *
              </label>
              <input
                type="email"
                placeholder="e.g., john@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                required
              />
            </div>

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

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <input
                type="tel"
                placeholder="e.g., +1 234 567 8900"
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                placeholder="Street, City, Country"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              />
            </div>

            {/* Image upload section with preview */}
            <div className="space-y-3 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Profile Image
              </label>

              {/* Preview current image */}
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

              {/* Image URL input */}
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

              {/* Choose file option */}
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

            {/* Bio */}
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

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={() => setShowForm(false)}
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
                <td className="p-3">{m.name || "No Name"}</td>
                <td>{m.designation || "No Designation"}</td>
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

// import { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import api from "../../../../api/axios";
// import TeamForm from "./TeamForm";
// import TeamTable from "./TeamTable";

// export default function TeamManager() {
//   const [members, setMembers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [editing, setEditing] = useState(null);

//   const emptyForm = {
//     name: "",
//     email: "",
//     designation: "",
//     bio: "",
//     address: "",
//     contact: "",
//     image: "",
//   };

//   const [form, setForm] = useState(emptyForm);

//   useEffect(() => {
//     fetchMembers();
//   }, []);

//   const fetchMembers = async () => {
//     try {
//       const { data } = await api.get("/team");
//       setMembers(data);
//     } catch {
//       toast.error("Failed to load team");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editing) {
//         await api.put(`/team/${editing}`, form);
//         toast.success("Member updated");
//       } else {
//         await api.post("/team", form);
//         toast.success("Member added");
//       }
//       resetForm();
//       fetchMembers();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Operation failed");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Delete this member?")) {
//       try {
//         await api.delete(`/team/${id}`);
//         toast.success("Member deleted");
//         fetchMembers();
//       } catch {
//         toast.error("Delete failed");
//       }
//     }
//   };

//   const editMember = (member) => {
//     setEditing(member._id);
//     setForm(member);
//     setShowForm(true);
//   };

//   const resetForm = () => {
//     setForm(emptyForm);
//     setEditing(null);
//     setShowForm(false);
//   };

//   if (loading) return <div>Loading team...</div>;

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold">Manage Team Members</h2>
//         <button
//           onClick={() => {
//             resetForm();
//             setShowForm(true);
//           }}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg"
//         >
//           Add Member
//         </button>
//       </div>

//       {showForm && (
//         <TeamForm
//           form={form}
//           setForm={setForm}
//           editing={editing}
//           onSubmit={handleSubmit}
//           onCancel={() => setShowForm(false)}
//         />
//       )}

//       <TeamTable
//         members={members}
//         onEdit={editMember}
//         onDelete={handleDelete}
//       />
//     </div>
//   );
// }