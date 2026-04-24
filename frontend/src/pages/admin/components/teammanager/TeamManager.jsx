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

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState(emptyForm);

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

  const resetForm = () => {
    setForm(emptyForm);
    setEditing(null);
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

      resetForm();
      setShowForm(false);

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
        <h2 className="text-2xl font-bold">
          Manage Team Members
        </h2>

        <button
          onClick={handleAddNew}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          Add Member
        </button>
      </div>

      {showForm && (
        <TeamForm
          form={form}
          setForm={setForm}
          editing={editing}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      <TeamTable
        members={members}
        onEdit={editMember}
        onDelete={handleDelete}
      />
    </div>
  );
}