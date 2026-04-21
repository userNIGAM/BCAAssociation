import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Hero from "./components/Hero";
import Event from "./components/Event";
import Contact from "./components/Contact";

import TeamsPage from "./pages/teams/Teams";
import Events from "./pages/events/Events";
import EventDetails from "./pages/events/EventDetails";

// Admin pages
import AdminLogin from "../admin/pages/auth/AdminLogin";
import AdminHome from "../admin/pages/Home";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Pages */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Event />
              <Contact />
            </>
          }
        />

        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/events" element={<Events />} />
        <Route path="/event/:id" element={<EventDetails />} />

        {/* Admin Routes */}
        <Route path="/secret-admin-login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminHome />} />
      </Routes>

      <Footer />
    </>
  );
}