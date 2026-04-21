import { useState, useEffect } from "react";
import { Trash2, MailOpen } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../../api/axios";

export default function MessagesViewer() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    fetchMessages();
  }, []);
  const fetchMessages = async () => {
    const { data } = await api.get("/messages");
    setMessages(data);
  };
  const handleDelete = async (id) => {
    if (confirm("Delete message?")) {
      await api.delete(`/messages/${id}`);
      toast.success("Deleted");
      fetchMessages();
    }
  };
  const markAsRead = async (id) => {
    await api.put(`/messages/${id}/read`);
    fetchMessages();
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Contact Messages</h2>
      <div className="space-y-3">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`bg-white p-4 rounded-xl shadow ${!msg.isRead ? "border-l-4 border-blue-500" : ""}`}
          >
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">
                  {msg.name}{" "}
                  <span className="text-sm text-gray-500">({msg.email})</span>
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(msg.createdAt).toLocaleString()}
                </p>
                <p className="mt-2">{msg.message}</p>
              </div>
              <div className="flex gap-2">
                {!msg.isRead && (
                  <button
                    onClick={() => markAsRead(msg._id)}
                    className="text-blue-600"
                  >
                    <MailOpen size={18} />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(msg._id)}
                  className="text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
