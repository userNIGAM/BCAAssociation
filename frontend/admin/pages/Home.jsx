/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  MessageSquare,
  Calendar,
  Newspaper,
} from "lucide-react";

import TeamSection from "../components/TeamSection";
import MessagesSection from "../components/MessagesSection";
import EventsSection from "../components/EventsSection";
import NewsSection from "../components/NewsSection";

function Home() {
  const [activeTab, setActiveTab] = useState("team");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { id: "team", label: "Team Members", icon: Users, color: "text-blue-500" },
    { id: "messages", label: "Incoming Messages", icon: MessageSquare, color: "text-purple-500" },
    { id: "events", label: "Events", icon: Calendar, color: "text-green-500" },
    { id: "news", label: "News", icon: Newspaper, color: "text-amber-500" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "team":
        return <TeamSection />;
      case "messages":
        return <MessagesSection />;
      case "events":
        return <EventsSection />;
      case "news":
        return <NewsSection />;
      default:
        return <TeamSection />;
    }
  };

  return (
    <div className="flex min-h-screen py-6">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden bg-white/80 backdrop-blur p-2 rounded-xl shadow-lg"
      >
        <Menu className="w-6 h-6 text-slate-700" />
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        className="fixed top-0 left-0 h-full w-72 glass-sidebar z-50 md:relative md:translate-x-0"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="text-white" />
            <h1 className="text-white font-bold">Admin Panel</h1>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-white">
            <X />
          </button>
        </div>

        {/* Nav */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                activeTab === item.id ? "bg-white/20 text-white" : "text-white/60"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </motion.aside>

      {/* Content */}
      <main className="flex-1 p-6">{renderContent()}</main>
    </div>
  );
}

export default Home;