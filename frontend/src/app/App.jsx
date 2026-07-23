import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../pages/public/components/ScrollToTop";
import AppProviders from "./providers";
import AppRoutes from "./routes";

function App() {
  return (
    <AppProviders>
      <Toaster position="top-right" />
      <Navbar />
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <AppRoutes />
      </Suspense>
      <Footer />
    </AppProviders>
  );
}

export default App;
