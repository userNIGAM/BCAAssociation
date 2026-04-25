import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import api from "../../../../api/axios";

import TeamForm from "./TeamForm";
import TeamTable from "./TeamTable";

import { emptyForm } from "./constants";

export default function TeamManager() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showForm]);

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

  const resetForm = () => {
    setForm(emptyForm);
    setEditing(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // extra safety

    setIsSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("designation", form.designation);
      formData.append("bio", form.bio);
      formData.append("address", form.address);
      formData.append("contact", form.contact);
      formData.append("order", form.order || 0);

      if (form.image instanceof File) {
        formData.append("image", form.image);
      }

      if (editing) {
        await api.put(`/team/${editing}`, formData);
        toast.success("Member updated");
      } else {
        await api.post("/team", formData);
        toast.success("Member added");
      }

      resetForm();
      setShowForm(false);
      fetchMembers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    } finally {
      setIsSubmitting(false);
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

    setForm({
      ...member,
      image: member.image || "", // keep URL preview
    });

    setShowForm(true);
  };

  const handleAddNew = () => {
    resetForm();

    setShowForm(!showForm);
  };

  if (loading) {
    return <div>Loading team...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Team Members</h2>

        <button
          onClick={handleAddNew}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          Add Member
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6 relative max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <TeamForm
              form={form}
              setForm={setForm}
              editing={editing}
              onSubmit={handleSubmit}
              onCancel={() => setShowForm(false)}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      )}

      <TeamTable
        members={members}
        onEdit={editMember}
        onDelete={handleDelete}
      />
    </div>
  );
}
