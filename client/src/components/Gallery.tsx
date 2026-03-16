import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import api from "../api.js";
import type { GalleryImage } from "../types/index.js";
import { formatImageUrl } from "../utils/imageUtils.js";

const ITEMS_PER_PAGE = 12;

const Gallery: React.FC = () => {
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<GalleryImage | null>(null);

  const {
    data: allImages,
    isLoading,
    isError,
  } = useQuery<GalleryImage[]>({
    queryKey: ["public-gallery"],
    queryFn: async () => {
      const resp = await api.get("/gallery");
      return Array.isArray(resp.data) ? resp.data : [];
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <section
        id="gallery"
        className="py-24 bg-black flex items-center justify-center min-h-[400px]"
      >
        <Loader2 className="animate-spin text-primary" size={40} />
      </section>
    );
  }

  if (isError || !Array.isArray(allImages) || allImages.length === 0)
    return null;

  const totalPages = Math.ceil(allImages.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const currentItems = allImages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <section id="gallery" className="py-24 bg-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-4">
            {t("gallery.title")}
            <span className="text-primary">{t("gallery.span")}</span>
          </h2>
          <p className="text-gray-400 font-medium uppercase tracking-widest">
            {t("gallery.subtitle")}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {currentItems.map((item, index) => (
            <motion.div
              key={item._id || index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="relative group overflow-hidden rounded-xl aspect-square cursor-pointer bg-white/5 border border-white/5"
              onClick={() => setSelectedItem(item)}
            >
              {item.type === "video" ? (
                <video
                  src={formatImageUrl(item.url)}
                  className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0"
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={formatImageUrl(item.url)}
                  alt={
                    item.alt ||
                    `${t("gallery.moment")} ${(currentPage - 1) * ITEMS_PER_PAGE + index + 1}`
                  }
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  loading="lazy"
                />
              )}

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center scale-0 group-hover:scale-100 transition-transform shadow-xl">
                  {item.type === "video" ? (
                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
                  ) : (
                    <Maximize2 size={20} className="text-white" />
                  )}
                </div>
              </div>

              {item.type === "video" && (
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-black text-white uppercase tracking-tighter">
                  Video
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Pagination UI */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 transition-colors border border-white/10 shadow-lg"
              aria-label="Previous Page"
            >
              <ChevronLeft size={24} className="text-white" />
            </button>
            <span className="text-white/60 font-bold tracking-widest uppercase text-sm">
              Page <span className="text-white">{currentPage}</span> /{" "}
              {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 transition-colors border border-white/10 shadow-lg"
              aria-label="Next Page"
            >
              <ChevronRight size={24} className="text-white" />
            </button>
          </div>
        )}
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
            onClick={() => setSelectedItem(null)}
          >
            <button
              className="absolute top-6 right-6 z-10 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white shadow-2xl"
              onClick={() => setSelectedItem(null)}
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative max-w-7xl max-h-[90vh] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 flex items-center justify-center bg-zinc-900"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedItem.type === "video" ? (
                <video
                  src={formatImageUrl(selectedItem.url)}
                  className="max-w-full max-h-[90vh]"
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <img
                  src={formatImageUrl(selectedItem.url)}
                  alt={selectedItem.alt || t("gallery.moment")}
                  className="max-w-full max-h-[90vh] object-contain"
                />
              )}

              {/* Info Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none">
                <h3 className="text-white font-black uppercase tracking-widest text-lg">
                  {selectedItem.title || t("gallery.moment")}
                </h3>
                <p className="text-white/60 text-sm font-bold mt-1">
                  Festibikutsi 2026 • {selectedItem.type.toUpperCase()}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
