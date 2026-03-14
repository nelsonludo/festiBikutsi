import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  User,
  Music2,
  Mail,
  Link as LinkIcon,
  FileText,
  Send,
  Camera,
} from "lucide-react";
import api from "../api";
import toast from "react-hot-toast";
import type { ServerError } from "../types";

const artistSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  stageName: z.string().min(2, "Stage name is required"),
  genre: z.enum([
    "Modern Bikutsi",
    "Traditional Bikutsi",
    "Bikutsi Fusion",
    "Other",
  ]),
  email: z.string().email("Invalid email address"),
  bio: z.string().min(20, "Bio must be at least 20 characters"),
  epkLink: z.string().url("Invalid URL").optional().or(z.literal("")),
  image: z.any().optional(),
});

type ArtistFormValues = z.infer<typeof artistSchema>;

const ArtistPortal: React.FC = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ArtistFormValues>({
    resolver: zodResolver(artistSchema),
  });

  const onSubmit = async (data: ArtistFormValues) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "image" && value instanceof FileList) {
          if (value[0]) formData.append("image", value[0]);
        } else if (value !== undefined) {
          formData.append(key, value as string);
        }
      });

      const response = await api.post("/artists", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        toast.success(t("portal.success") || "Registration successful!");
        reset();
      } else {
        toast.error(t("portal.error") || "Registration failed.");
      }
    } catch (error) {
      const err = error as ServerError;
      console.error("Error submitting form:", err);
      if (err.response?.status === 503) {
        toast.error("Server Error: Database connection unavailable.");
      } else {
        toast.error(
          t("portal.networkError") || "Network error. Please try again.",
        );
      }
    }
  };

  return (
    <section
      id="registration"
      className="py-24 bg-beti-earth/5 textured-section"
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-4">
            {t("portal.title")}{" "}
            <span className="text-primary">{t("portal.span")}</span>
          </h2>
          <p className="text-gray-400 font-medium tracking-widest uppercase">
            {t("portal.subtitle")}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-zinc-900 border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden"
        >
          {/* Decorative Texture */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-texture-clay bg-repeat" />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 relative z-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-2">
                  <User size={14} className="text-primary" />{" "}
                  {t("portal.labels.name")}
                </label>
                <input
                  {...register("name")}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors"
                  placeholder={t("portal.placeholders.name")}
                />
                {errors.name && (
                  <p className="text-secondary text-xs mt-1 font-bold">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Stage Name */}
              <div>
                <label className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-2">
                  <Music2 size={14} className="text-primary" />{" "}
                  {t("portal.labels.stage")}
                </label>
                <input
                  {...register("stageName")}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors"
                  placeholder={t("portal.placeholders.stage")}
                />
                {errors.stageName && (
                  <p className="text-secondary text-xs mt-1 font-bold">
                    {errors.stageName.message}
                  </p>
                )}
              </div>

              {/* Genre */}
              <div>
                <label className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-2">
                  <Music2 size={14} className="text-primary" />{" "}
                  {t("portal.labels.genre")}
                </label>
                <select
                  {...register("genre")}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors appearance-none"
                >
                  <option value="Modern Bikutsi">
                    {t("portal.genres.modern")}
                  </option>
                  <option value="Traditional Bikutsi">
                    {t("portal.genres.trad")}
                  </option>
                  <option value="Bikutsi Fusion">
                    {t("portal.genres.fusion")}
                  </option>
                  <option value="Other">{t("portal.genres.other")}</option>
                </select>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-2">
                  <Mail size={14} className="text-primary" />{" "}
                  {t("portal.labels.email")}
                </label>
                <input
                  {...register("email")}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors"
                  placeholder={t("portal.placeholders.email")}
                />
                {errors.email && (
                  <p className="text-secondary text-xs mt-1 font-bold">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* EPK Link */}
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-2">
                <LinkIcon size={14} className="text-primary" />{" "}
                {t("portal.labels.epk")}
              </label>
              <input
                {...register("epkLink")}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors"
                placeholder={t("portal.placeholders.link")}
              />
              {errors.epkLink && (
                <p className="text-secondary text-xs mt-1 font-bold">
                  {errors.epkLink.message}
                </p>
              )}
            </div>

            {/* Profile Picture */}
            <div>
              <label className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-2">
                <Camera size={14} className="text-primary" />{" "}
                {t("portal.labels.profile")}
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  {...register("image")}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors file:bg-primary file:border-none file:rounded-lg file:px-3 file:py-1 file:text-white file:font-black file:text-xs file:mr-4 file:cursor-pointer hover:file:bg-primary/80"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-2">
                <FileText size={14} className="text-primary" />{" "}
                {t("portal.labels.bio")}
              </label>
              <textarea
                {...register("bio")}
                rows={4}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors resize-none"
                placeholder={t("portal.placeholders.bio")}
              ></textarea>
              {errors.bio && (
                <p className="text-secondary text-xs mt-1 font-bold">
                  {errors.bio.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-clay w-full flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isSubmitting ? (
                t("portal.labels.submitting")
              ) : (
                <>
                  <Send size={18} /> {t("portal.labels.submit")}
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ArtistPortal;
