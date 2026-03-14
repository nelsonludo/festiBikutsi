import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Loader2, MapPin, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import api from "../../api.js";
import type { ScheduleItem, Artist } from "../../types/index.js";
import { useTranslation } from "react-i18next";

type ScheduleFormData = Omit<ScheduleItem, "_id" | "isPublished">;

const ScheduleManager: React.FC = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [activeDay, setActiveDay] = React.useState(1);

  const { data: schedule, isLoading: isScheduleLoading } = useQuery<
    ScheduleItem[]
  >({
    queryKey: ["admin-schedule"],
    queryFn: async () => {
      const resp = await api.get("/admin/schedule");
      return Array.isArray(resp.data) ? resp.data : [];
    },
  });

  const { data: artists } = useQuery<Artist[]>({
    queryKey: ["admin-artists"],
    queryFn: async () => {
      const resp = await api.get("/admin/artists");
      return Array.isArray(resp.data) ? resp.data : [];
    },
  });

  const { register, handleSubmit, reset, watch } = useForm<ScheduleFormData>({
    defaultValues: {
      day: 1,
      stage: "Main Stage",
      type: "Performance",
    },
  });

  const addItem = useMutation({
    mutationFn: async (data: ScheduleFormData) => {
      const resp = await api.post("/admin/schedule", data);
      return resp.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-schedule"] });
      toast.success(t("admin.schedule.success.added"));
      reset({ day: activeDay, stage: watch("stage"), type: watch("type") });
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      const msg =
        error.response?.data?.message || "Conflict detected or invalid data";
      toast.error(msg);
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({
      id,
      isPublished,
    }: {
      id: string;
      isPublished: boolean;
    }) => {
      const resp = await api.patch(`/admin/schedule/${id}`, { isPublished });
      return resp.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-schedule"] });
      toast.success(t("admin.schedule.success.updated"));
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || "Error updating status");
    },
  });

  const deleteItem = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/admin/schedule/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-schedule"] });
      toast.success(t("admin.schedule.success.deleted"));
    },
  });

  const filteredSchedule =
    schedule?.filter((item) => item.day === activeDay) || [];

  if (isScheduleLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-black text-slate-900">
          {t("admin.schedule.title")}
        </h2>
        <p className="text-slate-500 font-medium">
          {t("admin.schedule.subtitle")}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl w-fit">
        {[1, 2, 3].map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`px-8 py-3 rounded-xl font-black transition-all ${
              activeDay === day
                ? "bg-white text-primary shadow-sm"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {t("schedule.days.day" + day)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm sticky top-8">
            <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <Plus size={22} className="text-primary" />
              {t("admin.schedule.form.add")}
            </h3>
            <form
              onSubmit={handleSubmit((data) =>
                addItem.mutate({ ...data, day: activeDay }),
              )}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                  {t("admin.schedule.form.stage")}
                </label>
                <select
                  {...register("stage", { required: true })}
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-primary/20"
                >
                  <option value="Main Stage">Main Stage</option>
                  <option value="Acoustic Stage">Acoustic Stage</option>
                  <option value="Vibe Stage">Vibe Stage</option>
                  <option value="Workshop Area">Workshop Area</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                  {t("admin.schedule.form.type")}
                </label>
                <select
                  {...register("type", { required: true })}
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-primary/20"
                >
                  <option value="Performance">Performance</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Ceremony">Ceremony</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                  {t("admin.schedule.form.artist")} /{" "}
                  {t("admin.schedule.form.activity") || "Activity"}
                </label>
                {watch("type") === "Performance" ? (
                  <select
                    {...register("artist", { required: true })}
                    className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">
                      {t("admin.schedule.form.selectArtist")}
                    </option>
                    {artists
                      ?.filter((a) => a.isApproved)
                      .map((artist) => (
                        <option key={artist._id} value={artist.stageName}>
                          {artist.stageName}
                        </option>
                      ))}
                    <option value="Special Guest">Special Guest</option>
                  </select>
                ) : (
                  <input
                    {...register("artist", { required: true })}
                    placeholder={
                      t("admin.schedule.form.activityPlaceholder") ||
                      "Enter activity name..."
                    }
                    className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-primary/20"
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                  {t("admin.schedule.form.time")}
                </label>
                <input
                  {...register("time", { required: true })}
                  type="time"
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-primary text-white font-black rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                <Plus size={20} /> {t("admin.schedule.form.add")}
              </button>
            </form>
          </div>
        </div>

        {/* List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm">
                {t("admin.schedule.list.title", { day: activeDay })}
              </h3>
              <span className="px-3 py-1 bg-white text-slate-400 text-[10px] font-black rounded-full border border-slate-100 uppercase">
                {t("admin.schedule.list.slots", {
                  count: filteredSchedule.length,
                })}
              </span>
            </div>
            {filteredSchedule.length === 0 ? (
              <div className="p-12 text-center text-slate-400 font-medium italic">
                {t("admin.schedule.list.empty")}
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {filteredSchedule
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((item) => (
                    <div
                      key={item._id}
                      className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors group"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-16 text-center">
                          <div className="text-primary font-black text-lg">
                            {item.time}
                          </div>
                          <div className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">
                            UTC+1
                          </div>
                        </div>
                        <div className="w-px h-8 bg-slate-100" />
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <div className="font-black text-slate-900 text-lg group-hover:text-primary transition-colors">
                              {item.artist}
                            </div>
                            <span
                              className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-widest rounded-full border ${
                                item.isPublished
                                  ? "bg-green-50 text-green-600 border-green-100"
                                  : "bg-slate-50 text-slate-400 border-slate-100"
                              }`}
                            >
                              {item.isPublished ? "Live" : "Draft"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
                            <MapPin size={12} className="text-secondary" />{" "}
                            {item.stage}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() =>
                            updateStatus.mutate({
                              id: item._id,
                              isPublished: !item.isPublished,
                            })
                          }
                          className={`p-3 rounded-xl transition-all ${
                            item.isPublished
                              ? "text-slate-400 hover:text-primary hover:bg-primary/5"
                              : "text-primary bg-primary/5 hover:bg-primary/10"
                          }`}
                          title={item.isPublished ? "Unpublish" : "Publish"}
                        >
                          {item.isPublished ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                        <button
                          onClick={() => {
                            if (
                              window.confirm(
                                t("admin.schedule.actions.confirmDelete"),
                              )
                            ) {
                              deleteItem.mutate(item._id);
                            }
                          }}
                          className="p-3 text-slate-200 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleManager;
