import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Hero from "./components/Hero";
import Event from "./components/Event";
import Contact from "./components/Contact";

import TeamsPage from "./pages/teams/Teams";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Home Page */}
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

        {/* Teams Page */}
        <Route path="/teams" element={<TeamsPage />} />
      </Routes>

      <Footer />
    </>
  );
}