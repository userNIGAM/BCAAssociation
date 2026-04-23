import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Newspaper,
  Calendar,
  Mail,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import TeamManager from "./components/TeamManager";
import NewsManager from "./components/NewsManager";
import EventManager from "./components/EventManager";
import MessagesViewer from "./components/MessagesViewer";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("team");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/secret-admin-login");
  };

  const tabs = [
    { id: "team", label: "Team Members", icon: Users },
    { id: "news", label: "News", icon: Newspaper },
    { id: "events", label: "Events", icon: Calendar },
    { id: "messages", label: "Messages", icon: Mail },
  ];

  return (
    <div className="flex min-h-screen py-10">
      <aside className="w-64 bg-slate-900 text-white p-4">
        <div className="flex items-center gap-2 mb-8">
          <LayoutDashboard size={24} />
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 ${activeTab === tab.id ? "bg-white/20" : "hover:bg-white/10"}`}
            >
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 text-red-300 hover:bg-red-900/30"
          >
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-100">
        {activeTab === "team" && <TeamManager />}
        {activeTab === "news" && <NewsManager />}
        {activeTab === "events" && <EventManager />}
        {activeTab === "messages" && <MessagesViewer />}
      </main>
    </div>
  );
}
