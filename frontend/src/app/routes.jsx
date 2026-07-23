import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";

const Home = lazy(() => import("../pages/public/Home"));
const TeamsPage = lazy(() => import("../pages/public/teams/Teams"));
const EventsPage = lazy(() => import("../pages/public/Events"));
const EventDetails = lazy(() => import("../pages/public/EventDetails"));
const NewsPage = lazy(() => import("../pages/public/News"));
const NewsDetails = lazy(() => import("../pages/public/NewsDetails"));
const ContactPage = lazy(() => import("../pages/public/Contact"));
const AdminLogin = lazy(() => import("../pages/admin/Login"));
const AdminDashboard = lazy(() => import("../pages/admin/Dashboard"));
const ModalQuestion = lazy(() => import("../pages/public/model-question/ModalQuestion"));
const SemesterPage = lazy(() => import("../pages/public/model-question/SemesterPage"));
const ModalOptions = lazy(() => import("../pages/public/model-question/ModalOptions"));
const Entrance = lazy(() => import("../pages/public/model-question/Entrance"));

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/teams" element={<TeamsPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/event/:id" element={<EventDetails />} />
      <Route path="/news" element={<NewsPage />} />
      <Route path="/news/:id" element={<NewsDetails />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/modal-questions" element={<ModalOptions />} />
      <Route path="/entrance" element={<Entrance />} />
      <Route path="/yearly-modal-questions" element={<ModalQuestion />} />
      <Route path="/semester/:id" element={<SemesterPage />} />
      <Route path="/secret-admin-login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
