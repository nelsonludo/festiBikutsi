import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import {
  ExternalLink,
  Save,
  Users,
  CheckCircle,
  Calendar,
  Image as ImageIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../../api.js";
import type { ServerError } from "../../types.js";

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const resp = await api.get("/admin/artists/stats");
      return resp.data;
    },
  });

  const { data: settings, refetch: refetchSettings } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      const resp = await api.get("/admin/settings");
      return resp.data;
    },
  });

  const [festivalDate, setFestivalDate] = React.useState(
    settings?.festivalDate,
  );

  React.useEffect(() => {
    if (settings?.festivalDate) {
      setFestivalDate(
        new Date(settings.festivalDate).toISOString().split("T")[0],
      );
    }
  }, [settings]);

  const handleUpdateDate = async () => {
    try {
      await api.patch("/admin/settings", { festivalDate });
      toast.success(t("admin.dashboard.countdown.success"));
      refetchSettings();
    } catch (error) {
      const err = error as ServerError;
      toast.error(
        err.response?.data?.message ||
          t("admin.dashboard.countdown.error") ||
          "Failed to update date",
      );
    }
  };

  const daysToFestival = useMemo(() => {
    if (!festivalDate) return 0;
    const target = new Date(festivalDate).getTime();
    const now = new Date().setHours(0, 0, 0, 0);
    return Math.max(0, Math.ceil((target - now) / (1000 * 60 * 60 * 24)));
  }, [festivalDate]);

  const statCards = [
    {
      label: t("admin.dashboard.stats.totalArtists"),
      value: stats?.total || 0,
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: t("admin.dashboard.stats.pending"),
      value: (stats?.total || 0) - (stats?.approved || 0),
      icon: CheckCircle,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      label: t("admin.dashboard.stats.daysToFestival"),
      value: daysToFestival,
      icon: Calendar,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      label: t("admin.dashboard.stats.gallery"),
      icon: ImageIcon,
      value: "Active",
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900">
            {t("admin.dashboard.title")}
          </h2>
          <p className="text-slate-500 font-medium">
            {t("admin.dashboard.subtitle")}
          </p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 w-fit"
        >
          <ExternalLink size={20} />
          {t("admin.dashboard.viewSite")}
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4`}
            >
              <stat.icon size={24} />
            </div>
            <div className="text-2xl font-black text-slate-900">
              {stat.value}
            </div>
            <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
            <Calendar size={22} className="text-primary" />
            {t("admin.dashboard.countdown.title")}
          </h3>
          <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider">
              {t("admin.dashboard.countdown.label")}
            </label>
            <div className="flex gap-4">
              <input
                type="date"
                value={festivalDate}
                onChange={(e) => setFestivalDate(e.target.value)}
                className="flex-1 bg-slate-50 border-none rounded-2xl p-4 font-bold text-slate-900 focus:ring-2 focus:ring-primary/20"
              />
              <button
                onClick={handleUpdateDate}
                className="px-6 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all flex items-center gap-2"
              >
                <Save size={20} />
                {t("admin.dashboard.countdown.save")}
              </button>
            </div>
            <p className="text-sm text-slate-500 italic">
              {t("admin.dashboard.countdown.hint")}
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-6">
            {t("admin.dashboard.actions.title")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/admin/artists")}
              className="p-4 rounded-2xl border-2 border-dashed border-slate-200 text-slate-500 font-bold hover:border-primary hover:text-primary transition-all flex items-center gap-3 text-left"
            >
              <Users size={20} /> {t("admin.dashboard.actions.review")}
            </button>
            <button
              onClick={() => navigate("/admin/schedule")}
              className="p-4 rounded-2xl border-2 border-dashed border-slate-200 text-slate-500 font-bold hover:border-primary hover:text-primary transition-all flex items-center gap-3 text-left"
            >
              <Calendar size={20} /> {t("admin.dashboard.actions.update")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
