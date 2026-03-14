import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./i18n/config";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import History from "./components/History";
import Lineup from "./components/Lineup";
import Schedule from "./components/Schedule";
import Gallery from "./components/Gallery";
import ArtistPortal from "./components/ArtistPortal";
import VisitorInfo from "./components/VisitorInfo";
import Footer from "./components/Footer";

import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ArtistManager from "./pages/admin/ArtistManager";
import ScheduleManager from "./pages/admin/ScheduleManager";
import GalleryManager from "./pages/admin/GalleryManager";
import HistoryManager from "./pages/admin/HistoryManager";
import HowItWorks from "./pages/admin/HowItWorks";

// Public Landing Page Component
const LandingPage: React.FC = () => (
  <div className="min-h-screen">
    <Navbar />
    <main>
      <Hero />
      <History />
      <Lineup />
      <Schedule />
      <Gallery />
      <ArtistPortal />
      <VisitorInfo />
    </main>
    <Footer />
  </div>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Admin Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/admin"
            element={
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/artists"
            element={
              <AdminLayout>
                <ArtistManager />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/schedule"
            element={
              <AdminLayout>
                <ScheduleManager />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/gallery"
            element={
              <AdminLayout>
                <GalleryManager />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/history"
            element={
              <AdminLayout>
                <HistoryManager />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/how-it-works"
            element={
              <AdminLayout>
                <HowItWorks />
              </AdminLayout>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
