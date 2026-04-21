import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/public/Home";
import TeamsPage from "./pages/public/Teams";
import EventsPage from "./pages/public/Events";
import EventDetails from "./pages/public/EventDetails";
import NewsPage from "./pages/public/News";
import NewsDetails from "./pages/public/NewsDetails";
import ContactPage from "./pages/public/Contact";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsDetails />} />
        <Route path="/contact" element={<ContactPage />} />
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
      <Footer />
    </AuthProvider>
  );
}

export default App;
