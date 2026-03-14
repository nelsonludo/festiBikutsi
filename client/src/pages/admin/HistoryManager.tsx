import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Loader2,
  Calendar,
  X,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import api from "../../api.js";

import type { HistoryItem } from "../../types";

const HistoryManager: React.FC = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = React.useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      year: "",
      title: "",
      description: "",
      order: 0,
    },
  });

  const { data: historyItems, isLoading } = useQuery<HistoryItem[]>({
    queryKey: ["admin-history"],
    queryFn: async () => {
      const resp = await api.get("/admin/history");
      return Array.isArray(resp.data) ? resp.data : [];
    },
  });

  const createItem = useMutation({
    mutationFn: async (data: Omit<HistoryItem, "_id">) => {
      const resp = await api.post("/admin/history", data);
      return resp.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-history"] });
      toast.success(t("admin.history.success.added"));
      setIsAdding(false);
      reset();
    },
  });

  const deleteItem = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/admin/history/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-history"] });
      toast.success(t("admin.history.success.deleted"));
    },
  });

  const updateItem = useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<HistoryItem>;
    }) => {
      const resp = await api.patch(`/admin/history/${id}`, updates);
      return resp.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-history"] });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900">
            {t("admin.history.title")}
          </h2>
          <p className="text-slate-500 font-medium">
            {t("admin.history.subtitle")}
          </p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="px-6 py-3 bg-primary text-white font-black rounded-2xl flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        >
          <Plus size={20} />
          {t("admin.history.form.add")}
        </button>
      </div>

      <div className="grid gap-6">
        <AnimatePresence mode="popLayout">
          {historyItems?.map((item) => (
            <motion.div
              key={item._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6 group hover:shadow-md transition-all"
            >
              <div className="flex flex-col items-center gap-1">
                <button
                  onClick={() =>
                    updateItem.mutate({
                      id: item._id,
                      updates: { order: item.order - 1 },
                    })
                  }
                  className="p-1 hover:bg-slate-50 rounded text-slate-400 hover:text-primary transition-colors"
                >
                  <ChevronUp size={20} />
                </button>
                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary font-black text-lg">
                  {item.order}
                </div>
                <button
                  onClick={() =>
                    updateItem.mutate({
                      id: item._id,
                      updates: { order: item.order + 1 },
                    })
                  }
                  className="p-1 hover:bg-slate-50 rounded text-slate-400 hover:text-primary transition-colors"
                >
                  <ChevronDown size={20} />
                </button>
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2 text-primary font-black uppercase text-xs tracking-widest">
                  <Calendar size={14} />
                  {item.year}
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">
                  {item.description}
                </p>
              </div>

              <button
                onClick={() => {
                  if (
                    window.confirm(t("admin.artists.actions.confirmDelete"))
                  ) {
                    deleteItem.mutate(item._id);
                  }
                }}
                className="p-4 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
              >
                <Trash2 size={24} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] flex items-center justify-center p-4"
            onClick={() => setIsAdding(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-10">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-black text-slate-900">
                    {t("admin.history.form.add")}
                  </h3>
                  <button
                    onClick={() => setIsAdding(false)}
                    className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form
                  onSubmit={handleSubmit((data) => createItem.mutate(data))}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                        {t("admin.history.form.year")}
                      </label>
                      <input
                        {...register("year", { required: true })}
                        className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="e.g. 1999"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                        {t("admin.history.form.order")}
                      </label>
                      <input
                        {...register("order", { valueAsNumber: true })}
                        type="number"
                        className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                      {t("admin.history.form.title")}
                    </label>
                    <input
                      {...register("title", { required: true })}
                      className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Milestone title..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                      {t("admin.history.form.description")}
                    </label>
                    <textarea
                      {...register("description", { required: true })}
                      rows={4}
                      className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      placeholder="Details about this event..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={createItem.isPending}
                    className="w-full py-5 bg-primary text-white font-black rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {createItem.isPending ? (
                      <Loader2 className="animate-spin" size={24} />
                    ) : (
                      <>
                        <Plus size={24} />
                        {t("admin.history.form.add")}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HistoryManager;
