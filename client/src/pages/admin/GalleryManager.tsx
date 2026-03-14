import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Trash2,
  Loader2,
  Image as ImageIcon,
  Eye,
  EyeOff,
  Upload,
  Film,
  Star,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../../api.js";
import type { GalleryImage } from "../../types/index.js";
import { useTranslation } from "react-i18next";

const GalleryManager: React.FC = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [previews, setPreviews] = React.useState<
    { file: File; url: string; id: string }[]
  >([]);

  const { data: images, isLoading } = useQuery<GalleryImage[]>({
    queryKey: ["admin-gallery"],
    queryFn: async () => {
      const resp = await api.get("/admin/gallery");
      return Array.isArray(resp.data) ? resp.data : [];
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const resp = await api.post("/admin/gallery/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return resp.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gallery"] });
      toast.success(t("admin.gallery.success.added"));
      setUploading(false);
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast.error(
        error.response?.data?.message || t("admin.gallery.error.upload"),
      );
      setUploading(false);
    },
  });

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newPreviews = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file), // Fixed: Use URL.createObjectURL for previews
      id: Math.random().toString(36).substring(7),
    }));

    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleUploadAll = async () => {
    if (previews.length === 0) return;

    setUploading(true);
    for (const preview of previews) {
      const formData = new FormData();
      formData.append("file", preview.file);
      formData.append("title", preview.file.name.split(".")[0]);
      formData.append(
        "type",
        preview.file.type.startsWith("video") ? "video" : "image",
      );

      try {
        await uploadMutation.mutateAsync(formData);
        // Remove successfully uploaded preview
        setPreviews((prev) => prev.filter((p) => p.id !== preview.id));
        URL.revokeObjectURL(preview.url);
      } catch (err) {
        console.error("Upload failed for file:", preview.file.name, err);
        // We stop on first error to let user retry or fix
        setUploading(false);
        return;
      }
    }
    setUploading(false);
    toast.success(
      t("admin.gallery.success.allUploaded") ||
        "All files uploaded successfully",
    );
  };

  const removePreview = (id: string) => {
    setPreviews((prev) => {
      const filtered = prev.filter((p) => p.id !== id);
      const removed = prev.find((p) => p.id === id);
      if (removed) URL.revokeObjectURL(removed.url);
      return filtered;
    });
  };

  const clearPreviews = () => {
    previews.forEach((p) => URL.revokeObjectURL(p.url));
    setPreviews([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    // Reset input so same file can be selected again
    if (e.target) e.target.value = "";
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<GalleryImage>;
    }) => {
      await api.patch(`/admin/gallery/${id}`, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gallery"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/admin/gallery/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gallery"] });
      toast.success(t("admin.gallery.success.deleted"));
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
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`space-y-8 animate-in fade-in duration-500 min-h-[400px] relative rounded-[2rem] transition-all ${isDragging ? "bg-primary/5 ring-4 ring-primary ring-dashed ring-offset-8" : ""}`}
    >
      {isDragging && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-primary/10 rounded-[2rem] backdrop-blur-sm pointer-events-none border-4 border-primary border-dashed">
          <div className="flex flex-col items-center gap-4 p-12 bg-white rounded-3xl shadow-2xl scale-110 transition-transform">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <Upload size={40} className="animate-bounce" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
              {t("admin.gallery.dropZone") || "Drop to Upload"}
            </h3>
            <p className="text-slate-500 font-medium">
              {t("admin.gallery.dropSubtitle") ||
                "Release to add media to gallery"}
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900">
            {t("admin.gallery.title")}
          </h2>
          <p className="text-slate-500 font-medium">
            {t("admin.gallery.subtitle")} •{" "}
            <span className="text-primary font-black uppercase text-xs tracking-widest">
              {t("admin.gallery.dragHint") || "Drag & Drop Supported"}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          {previews.length > 0 && (
            <button
              onClick={clearPreviews}
              disabled={uploading}
              className="px-6 py-4 text-slate-400 font-black hover:text-red-500 transition-colors disabled:opacity-50"
            >
              {t("admin.common.clear")}
            </button>
          )}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-100 text-slate-600 font-black rounded-2xl hover:bg-slate-50 transition-all shadow-sm disabled:opacity-50"
          >
            <Upload size={20} />
            {t("admin.gallery.form.select")}
          </button>
          {previews.length > 0 && (
            <button
              onClick={handleUploadAll}
              disabled={uploading}
              className="flex items-center gap-2 px-8 py-4 bg-primary text-white font-black rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
            >
              {uploading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Upload size={20} />
              )}
              {uploading
                ? `${t("admin.gallery.form.uploading") || "Uploading"}...`
                : `${t("admin.gallery.form.uploadAll") || "Upload All"} (${previews.length})`}
            </button>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*,video/*"
          multiple
          className="hidden"
        />
      </div>

      {previews.length > 0 && (
        <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 animate-in slide-in-from-top duration-500">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">
              {t("admin.gallery.pending.title") || "Pending Uploads"}
            </h3>
            <span className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase">
              {previews.length}{" "}
              {t("admin.gallery.pending.count") || "files ready"}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {previews.map((preview) => (
              <div
                key={preview.id}
                className="group relative aspect-square bg-slate-200 rounded-2xl overflow-hidden border-2 border-white shadow-sm"
              >
                {preview.file.type.startsWith("image") ? (
                  <img
                    src={preview.url}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-white/40">
                    <Film size={32} />
                    <span className="text-[10px] font-bold mt-2 truncate max-w-full px-2">
                      Video
                    </span>
                  </div>
                )}
                <button
                  onClick={() => removePreview(preview.id)}
                  disabled={uploading}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                >
                  <Trash2 size={14} />
                </button>
                {uploading && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                    <Loader2 size={20} className="animate-spin text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images?.map((item) => (
          <div
            key={item._id}
            className="group relative bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
          >
            <div className="aspect-square relative overflow-hidden bg-slate-900">
              {item.type === "video" ? (
                <div className="w-full h-full flex items-center justify-center bg-slate-800">
                  <Film size={48} className="text-slate-600" />
                  <video
                    src={
                      item.url.startsWith("/uploads")
                        ? item.url
                        : `/uploads/${item.url}`
                    }
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              ) : (
                <img
                  src={
                    item.url.startsWith("/uploads")
                      ? item.url
                      : `/uploads/${item.url}`
                  }
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              )}

              {item.isFeatured && (
                <div className="absolute top-4 left-4 p-2 bg-amber-400 text-white rounded-xl shadow-lg">
                  <Star size={16} fill="currentColor" />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        updateMutation.mutate({
                          id: item._id,
                          updates: { isFeatured: !item.isFeatured },
                        })
                      }
                      className={`p-3 rounded-xl transition-all ${item.isFeatured ? "bg-amber-400 text-white" : "bg-white/20 text-white backdrop-blur-md hover:bg-white/40"}`}
                      title={t("admin.gallery.actions.toggleFeatured")}
                    >
                      <Star
                        size={18}
                        fill={item.isFeatured ? "currentColor" : "none"}
                      />
                    </button>
                    <button
                      onClick={() =>
                        updateMutation.mutate({
                          id: item._id,
                          updates: { isPublished: !item.isPublished },
                        })
                      }
                      className="p-3 bg-white/20 text-white backdrop-blur-md rounded-xl hover:bg-white/40 transition-all"
                    >
                      {item.isPublished ? (
                        <Eye size={18} />
                      ) : (
                        <EyeOff size={18} />
                      )}
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(t("admin.gallery.actions.confirmDelete"))
                      ) {
                        deleteMutation.mutate(item._id);
                      }
                    }}
                    className="p-3 bg-red-500/80 text-white backdrop-blur-md rounded-xl hover:bg-red-600 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-slate-900 truncate">
                {item.title}
              </h4>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                {item.type} • {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}

        {images?.length === 0 && (
          <div className="col-span-full py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <ImageIcon size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 font-bold">
              {t("admin.gallery.empty")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryManager;
