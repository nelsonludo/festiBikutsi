import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Image as ImageIcon,
  LogOut,
  Menu,
  X,
  History as Clock,
  Globe,
  HelpCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api.js";
import { LogoContainer } from "../components/Navbar.js";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      toast.success(t("admin.common.logoutSuccess"));
      navigate("/login");
    } catch {
      toast.error(t("admin.common.logoutError"));
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "fr" : "en";
    i18n.changeLanguage(newLang);
  };

  const menuItems = [
    {
      label: t("admin.common.dashboard"),
      icon: LayoutDashboard,
      path: "/admin",
    },
    { label: t("admin.artists.title"), icon: Users, path: "/admin/artists" },
    {
      label: t("admin.schedule.title"),
      icon: Calendar,
      path: "/admin/schedule",
    },
    {
      label: t("admin.gallery.title"),
      icon: ImageIcon,
      path: "/admin/gallery",
    },
    {
      label: t("admin.history.title"),
      icon: Clock,
      path: "/admin/history",
    },
    {
      label: t("admin.howItWorks.title"),
      icon: HelpCircle,
      path: "/admin/how-it-works",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex text-slate-900 font-sans relative">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LogoContainer />
          <span className="font-black text-sm tracking-tight text-secondary leading-tight">
            FESTI
            <span className="block text-slate-400 uppercase text-[10px] font-bold">
              {t("admin.common.dashboard")}
            </span>
          </span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-500"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Backdrop (Mobile Only) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-[55] backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0 lg:w-20"
        } bg-white border-r border-slate-200 transition-all duration-300 flex flex-col fixed inset-y-0 z-[60] lg:z-50 shadow-2xl lg:shadow-none`}
      >
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-between border-b border-slate-100 h-16 lg:h-auto">
          {isSidebarOpen || !isSidebarOpen ? ( // Simplified logic for consistency
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 group ${!isSidebarOpen && "lg:mx-auto"}`}
            >
              {isSidebarOpen ? (
                <>
                  <LogoContainer />
                  <span className="font-black text-base tracking-tight text-secondary transition-colors group-hover:text-primary/80 leading-tight">
                    FESTI
                    <span className="block text-slate-400 uppercase text-xs font-bold">
                      {t("admin.common.dashboard")}
                    </span>
                  </span>
                </>
              ) : (
                <img
                  src="/images/festiBikutsiLogoNoBg-.png"
                  alt="FestiBikutsi"
                  className="w-9 h-9 object-contain"
                />
              )}
            </Link>
          ) : null}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden lg:block p-2 hover:bg-slate-100 rounded-lg text-slate-500 flex-shrink-0"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 1024) setIsSidebarOpen(false);
              }}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                location.pathname === item.path
                  ? "bg-primary/10 text-secondary font-bold shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <item.icon size={22} className="flex-shrink-0" />
              <span className={`${!isSidebarOpen && "lg:hidden"}`}>
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-100 space-y-2">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-3 p-3 w-full rounded-xl text-slate-500 hover:bg-slate-50 transition-all"
            title={`Switch to ${i18n.language === "en" ? "Français" : "English"}`}
          >
            <Globe size={22} className="flex-shrink-0" />
            <span
              className={`${!isSidebarOpen && "lg:hidden"} font-bold uppercase text-sm`}
            >
              {i18n.language === "en" ? "🇫🇷 Français" : "🇬🇧 English"}
            </span>
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 w-full rounded-xl text-secondary hover:bg-secondary/10 transition-all"
          >
            <LogOut size={22} className="flex-shrink-0" />
            <span className={`${!isSidebarOpen && "lg:hidden"} font-bold`}>
              {t("admin.common.logout")}
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
        } pt-24 lg:pt-8 px-4 lg:px-8 pb-12`}
      >
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
