import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, Star, Music, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import api from "../api.js";
import type { ScheduleItem } from "../types/index.js";
import { formatImageUrl } from "../utils/imageUtils.js";

const Schedule: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("1");

  const { data: rawSchedule, isLoading } = useQuery<ScheduleItem[]>({
    queryKey: ["public-schedule"],
    queryFn: async () => {
      const resp = await api.get("/schedule");
      return Array.isArray(resp.data) ? resp.data : [];
    },
    staleTime: 5 * 60 * 1000,
  });

  const scheduleByDay = useMemo(() => {
    if (!Array.isArray(rawSchedule)) return {};
    return rawSchedule.reduce(
      (acc: Record<string, ScheduleItem[]>, item: ScheduleItem) => {
        const dayKey = item.day.toString();
        if (!acc[dayKey]) acc[dayKey] = [];
        acc[dayKey].push(item);
        return acc;
      },
      {},
    );
  }, [rawSchedule]);

  const days = ["1", "2", "3"];

  if (isLoading) {
    return (
      <section
        id="schedule"
        className="py-24 bg-zinc-950 flex items-center justify-center"
      >
        <Loader2 className="animate-spin text-secondary" size={40} />
      </section>
    );
  }

  const eventsForActiveDay = scheduleByDay[activeTab] || [];

  const getIconForType = (type: string) => {
    switch (type?.toLowerCase()) {
      case "performance":
        return <Star size={14} className="text-secondary" />;
      case "workshop":
        return <Music size={14} className="text-primary" />;
      case "ceremony":
        return <Star size={14} className="text-amber-500" />;
      default:
        return <MapPin size={14} className="text-gray-400" />;
    }
  };

  return (
    <section
      id="schedule"
      className="py-24 bg-zinc-950 textured-section"
      style={
        {
          "--bg-texture":
            "url('https://www.transparenttextures.com/patterns/dark-leather.png')",
        } as React.CSSProperties
      }
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-4">
            {t("schedule.title")}
            <span className="text-secondary">{t("schedule.span")}</span>
          </h2>
          <p className="text-gray-400 font-medium uppercase tracking-widest">
            {t("schedule.subtitle")}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveTab(day)}
              className={`px-8 py-3 rounded-full font-bold transition-all duration-300 ${
                activeTab === day
                  ? "bg-primary text-white scale-110 shadow-xl"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              Day {day}
            </button>
          ))}
        </div>

        {/* Schedule List */}
        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {eventsForActiveDay.length > 0 ? (
                eventsForActiveDay.map((event, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-primary/50 hover:bg-white/[0.05] transition-all group"
                  >
                    <div className="flex flex-col items-center justify-center min-w-[100px] md:border-r md:border-white/10 md:pr-6 gap-1">
                      <div className="text-2xl font-black text-primary flex items-center gap-2">
                        <Clock size={20} />
                        {event.time}
                      </div>
                      <div className="text-[10px] font-black text-white/20 uppercase tracking-widest italic">
                        UTC+1
                      </div>
                    </div>

                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-zinc-800 border border-white/5 flex-shrink-0">
                      {event.artistImage ? (
                        <img
                          src={formatImageUrl(event.artistImage)}
                          alt={event.artist}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/5 font-black text-[10px] -rotate-12 bg-zinc-900 uppercase">
                          Festi
                        </div>
                      )}
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors uppercase italic tracking-tight">
                        {event.artist}
                      </h3>
                      <div className="flex items-center justify-center md:justify-start gap-4 text-gray-500 text-sm font-medium uppercase tracking-tighter">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} className="text-secondary" />{" "}
                          {event.stage}
                        </span>
                        <span className="flex items-center gap-1.5 font-black text-white/40">
                          {getIconForType(event.type)}{" "}
                          {event.type || t("common.performance")}
                        </span>
                      </div>
                    </div>

                    <div className="hidden md:block">
                      <button className="px-5 py-2 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/30 hover:bg-primary hover:text-white hover:border-primary transition-all">
                        {t("schedule.reminder") || "Set Reminder"}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="mt-20 text-center py-20 px-6 rounded-[3rem] bg-white/[0.02] border border-white/5 border-dashed">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock size={40} className="text-white/10 animate-pulse" />
                  </div>
                  <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-xs mb-3">
                    {t("schedule.noEvents") || "Program for Day " + activeTab}
                  </p>
                  <h4 className="text-3xl font-black text-white/20 uppercase italic tracking-tighter">
                    {t("schedule.comingSoon") || "Program Coming Soon"}
                  </h4>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
