import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Eye,
  Trash2,
  Loader2,
  UserCheck,
  EyeOff,
  X,
  Plus,
  Mail,
  Globe,
  Info,
  Upload,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import api from "../../api.js";
import type { Artist } from "../../types/index.js";

const ArtistManager: React.FC = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [selectedArtist, setSelectedArtist] = React.useState<Artist | null>(
    null,
  );
  const [isAddingArtist, setIsAddingArtist] = React.useState(false);

  interface ArtistFormValues {
    name: string;
    stageName: string;
    genre: string;
    email: string;
    bio: string;
    epkLink: string;
    image?: FileList;
  }

  const { register, handleSubmit, reset } = useForm<ArtistFormValues>();

  const { data: artists, isLoading } = useQuery<Artist[]>({
    queryKey: ["admin-artists"],
    queryFn: async () => {
      const resp = await api.get("/admin/artists");
      return Array.isArray(resp.data) ? resp.data : [];
    },
  });

  const createArtist = useMutation({
    mutationFn: async (formData: FormData) => {
      const resp = await api.post("/admin/artists", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return resp.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-artists"] });
      toast.success(t("admin.artists.success.created") || "Artist created");
      setIsAddingArtist(false);
      reset();
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message || "Error creating artist");
    },
  });

  const updateArtist = useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<Artist>;
    }) => {
      const resp = await api.patch(`/admin/artists/${id}`, updates);
      return resp.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-artists"] });
      // Update selected artist if it's the one being updated
      if (selectedArtist?._id === data._id) {
        setSelectedArtist(data);
      }
      toast.success(t("admin.artists.success.updated"));
    },
  });

  const deleteArtist = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/admin/artists/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-artists"] });
      setSelectedArtist(null);
      toast.success(t("admin.artists.success.removed"));
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
    <div className="relative min-h-[600px] animate-in fade-in duration-500">
      <div className="flex justify-between items-end my-8">
        <div>
          <h2 className="text-3xl font-black text-slate-900">
            {t("admin.artists.title")}
          </h2>
          <p className="text-slate-500 font-medium">
            {t("admin.artists.subtitle")}
          </p>
        </div>
        <button
          onClick={() => setIsAddingArtist(true)}
          className="px-6 py-3 bg-primary text-white font-black rounded-2xl flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        >
          <Plus size={20} />
          {t("admin.artists.actions.add") || "Add Artist"}
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-xs font-black uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-4">{t("admin.artists.table.name")}</th>
                <th className="px-6 py-4">{t("admin.artists.table.genre")}</th>
                <th className="px-6 py-4">{t("admin.artists.table.status")}</th>
                <th className="px-6 py-4">
                  {t("admin.artists.table.visibility")}
                </th>
                <th className="px-6 py-4 text-right">
                  {t("admin.artists.table.actions")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {artists?.map((artist) => (
                <tr
                  key={artist._id}
                  className={`hover:bg-slate-50/50 transition-colors cursor-pointer ${selectedArtist?._id === artist._id ? "bg-primary/5" : ""}`}
                  onClick={() => setSelectedArtist(artist)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 flex-shrink-0 flex items-center justify-center">
                        {artist.imageUrl ? (
                          <img
                            src={`/uploads/${artist.imageUrl}`}
                            alt={artist.stageName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <UserCheck className="text-slate-300" size={20} />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">
                          {artist.stageName}
                        </div>
                        <div className="text-xs text-slate-400 uppercase tracking-tighter">
                          {artist.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold whitespace-nowrap">
                      {artist.genre}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {artist.isApproved ? (
                      <span className="flex items-center gap-1 text-emerald-600 font-bold uppercase text-[10px] tracking-widest">
                        <UserCheck size={14} />{" "}
                        {t("admin.artists.status.approved")}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-amber-500 font-bold uppercase text-[10px] tracking-widest">
                        {t("admin.artists.status.pending")}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {artist.isPublished ? (
                      <span className="flex items-center gap-1 text-primary font-bold uppercase text-[10px] tracking-widest">
                        <Eye size={14} />{" "}
                        {t("admin.artists.visibility.published")}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                        <EyeOff size={14} />{" "}
                        {t("admin.artists.visibility.draft")}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div
                      className="flex justify-end gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {!artist.isApproved && (
                        <button
                          onClick={() => {
                            if (
                              window.confirm(
                                t("admin.artists.actions.confirmApprove"),
                              )
                            ) {
                              updateArtist.mutate({
                                id: artist._id,
                                updates: { isApproved: true },
                              });
                            }
                          }}
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title={t("admin.artists.actions.approve")}
                        >
                          <Check size={18} />
                        </button>
                      )}
                      <button
                        onClick={() =>
                          updateArtist.mutate({
                            id: artist._id,
                            updates: { isPublished: !artist.isPublished },
                          })
                        }
                        className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors"
                        title={
                          artist.isPublished
                            ? t("admin.artists.actions.setDraft")
                            : t("admin.artists.actions.publish")
                        }
                      >
                        {artist.isPublished ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              t("admin.artists.actions.confirmDelete"),
                            )
                          ) {
                            deleteArtist.mutate(artist._id);
                          }
                        }}
                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title={t("admin.artists.actions.delete")}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Side-panel */}
      <AnimatePresence>
        {selectedArtist && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setSelectedArtist(null)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-8 space-y-8">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                    <Info size={24} />
                  </div>
                  <button
                    onClick={() => setSelectedArtist(null)}
                    className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="w-full h-48 bg-slate-100 rounded-[2rem] overflow-hidden border border-slate-200 mb-8 flex items-center justify-center group relative">
                  {selectedArtist.imageUrl ? (
                    <img
                      src={`/uploads/${selectedArtist.imageUrl}`}
                      alt={selectedArtist.stageName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <UserCheck className="text-slate-300" size={48} />
                  )}
                </div>

                <div>
                  <h3 className="text-3xl font-black text-slate-900 mb-1">
                    {selectedArtist.stageName}
                  </h3>
                  <p className="text-primary font-bold uppercase text-xs tracking-widest">
                    {selectedArtist.genre}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="bg-slate-50 p-6 rounded-3xl space-y-4 text-sm font-medium">
                    <div className="flex items-center gap-3 text-slate-600">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <Check size={16} className="text-emerald-500" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-slate-400 uppercase tracking-tighter">
                          {t("admin.artists.details.status")}
                        </div>
                        <div className="font-bold underline">
                          {selectedArtist.isApproved
                            ? t("admin.artists.status.approved")
                            : t("admin.artists.status.pending")}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <Mail size={16} className="text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-slate-400 uppercase tracking-tighter">
                          {t("admin.artists.details.contact")}
                        </div>
                        <div className="font-bold">{selectedArtist.email}</div>
                      </div>
                    </div>
                    {selectedArtist.epkLink && (
                      <div className="flex items-center gap-3 text-slate-600">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          <Globe size={16} className="text-purple-500" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-slate-400 uppercase tracking-tighter">
                            {t("admin.artists.details.epk")}
                          </div>
                          <a
                            href={selectedArtist.epkLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-primary hover:underline truncate block max-w-[200px]"
                          >
                            {selectedArtist.epkLink}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-black text-slate-900 border-b border-slate-100 pb-2">
                      {t("admin.artists.details.bio")}
                    </h4>
                    <p className="text-slate-500 leading-relaxed text-sm">
                      {selectedArtist.bio}
                    </p>
                  </div>

                  <div className="pt-4 flex gap-3">
                    {!selectedArtist.isApproved && (
                      <button
                        onClick={() =>
                          updateArtist.mutate({
                            id: selectedArtist._id,
                            updates: { isApproved: true },
                          })
                        }
                        className="flex-1 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
                      >
                        <Check size={20} />{" "}
                        {t("admin.artists.actions.approveBtn")}
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            t("admin.artists.actions.confirmReject"),
                          )
                        ) {
                          deleteArtist.mutate(selectedArtist._id);
                        }
                      }}
                      className="px-6 py-4 bg-white border border-slate-200 text-red-500 font-bold rounded-2xl hover:bg-red-50 transition-all"
                    >
                      {t("admin.artists.actions.rejectBtn")}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add Artist Modal */}
      <AnimatePresence>
        {isAddingArtist && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] flex items-center justify-center p-4 overflow-y-auto"
              onClick={() => setIsAddingArtist(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden my-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-10">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-black text-slate-900">
                      {t("admin.artists.form.title") || "New Performer"}
                    </h3>
                    <button
                      onClick={() => setIsAddingArtist(false)}
                      className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <form
                    onSubmit={handleSubmit((data) => {
                      const formData = new FormData();
                      (
                        Object.keys(data) as Array<keyof ArtistFormValues>
                      ).forEach((key) => {
                        const value = data[key];
                        if (
                          key === "image" &&
                          value instanceof FileList &&
                          value[0]
                        ) {
                          formData.append("image", value[0]);
                        } else if (value !== undefined) {
                          formData.append(key, value as string);
                        }
                      });
                      formData.append("isApproved", "true");
                      formData.append("isPublished", "true");
                      createArtist.mutate(formData);
                    })}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                          {t("admin.artists.form.name") || "Full Name"}
                        </label>
                        <input
                          {...register("name", { required: true })}
                          className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all"
                          placeholder="e.g. Jean-Pierre"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                          {t("admin.artists.form.stageName") || "Stage Name"}
                        </label>
                        <input
                          {...register("stageName", { required: true })}
                          className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all"
                          placeholder="e.g. DJ Bikutsi"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                          {t("admin.artists.form.genre") || "Genre"}
                        </label>
                        <select
                          {...register("genre", { required: true })}
                          className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all"
                        >
                          <option value="Modern Bikutsi">Modern Bikutsi</option>
                          <option value="Traditional Bikutsi">
                            Traditional Bikutsi
                          </option>
                          <option value="Bikutsi Fusion">Bikutsi Fusion</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                          {t("admin.artists.form.email") || "Email"}
                        </label>
                        <input
                          {...register("email", { required: true })}
                          type="email"
                          className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all"
                          placeholder="artist@festival.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                        {t("admin.artists.form.bio") || "Description / Bio"}
                      </label>
                      <textarea
                        {...register("bio", { required: true })}
                        rows={3}
                        className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                        placeholder="Short artist presentation..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                        {t("admin.artists.form.image") || "Artist Photo"}
                      </label>
                      <div className="relative group/upload">
                        <input
                          type="file"
                          accept="image/*"
                          {...register("image", { required: true })}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="p-8 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center gap-3 group-hover/upload:border-primary/50 group-hover/upload:bg-primary/5 transition-all">
                          <Upload className="text-slate-300 group-hover/upload:text-primary transition-colors" />
                          <span className="text-sm font-bold text-slate-400 group-hover/upload:text-primary/70">
                            {t("admin.artists.form.uploadText") ||
                              "Click or drag photo to upload"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={createArtist.isPending}
                      className="w-full py-5 bg-primary text-white font-black rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {createArtist.isPending ? (
                        <Loader2 className="animate-spin" size={24} />
                      ) : (
                        <>
                          <Plus size={24} />
                          {t("admin.artists.form.submit") ||
                            "Create Artiste Profile"}
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArtistManager;
