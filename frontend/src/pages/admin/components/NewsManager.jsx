import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../../api/axios";

import ConfirmModal from "../../../components/ConfirmModal";

import NewsHeader from "../news/NewsHeader";
import NewsForm from "../news/NewsForm";
import NewsList from "../news/NewsList";

import useNews from "../news/hooks/useNews";

export default function NewsManager() {
  const { news, loading, fetchNews } = useNews();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const initialForm = {
    title: "",
    content: "",
    image: "",
    imageFile: null,
    preview: "",
    isPublished: true,
  };

  const [form, setForm] = useState(initialForm);

  const resetForm = () => {
    setForm(initialForm);
    setEditing(null);
  };

  const handleCreateToggle = () => {
    resetForm();
    setShowForm(!showForm);
  };

  const handleEdit = (item) => {
    setEditing(item._id);

    setForm({
      title: item.title,
      content: item.content,
      image: item.image || "",
      isPublished: item.isPublished,
    });

    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("content", form.content);
      formData.append("isPublished", form.isPublished);

      if (form.imageFile) {
        formData.append("image", form.imageFile);
      }

      // fallback external URL
      else if (form.image) {
        formData.append("image", form.image);
      }

      if (editing) {
        await api.put(`/admin/news/${editing}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("News updated successfully");
      } else {
        await api.post("/admin/news", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("News created successfully");
      }

      resetForm();
      setShowForm(false);
      fetchNews();
    } catch (error) {
      console.log(error.response?.data || error);

      toast.error(editing ? "Failed to update" : "Failed to create");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/admin/news/${deleteTarget}`);

      toast.success("News deleted successfully");

      setDeleteTarget(null);

      fetchNews();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <NewsHeader onAddClick={handleCreateToggle} />

      <NewsForm
        showForm={showForm}
        form={form}
        setForm={setForm}
        editing={editing}
        onSubmit={handleSubmit}
        onCancel={() => setShowForm(false)}
      />

      <NewsList news={news} onEdit={handleEdit} onDelete={setDeleteTarget} />

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete News"
        message="Are you sure you want to delete this news? This action cannot be undone."
      />
    </div>
  );
}
