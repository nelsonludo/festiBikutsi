import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mic2, Music, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import api from "../api.js";
import type { Artist } from "../types/index.js";

const Lineup: React.FC = () => {
  const { t } = useTranslation();
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  const {
    data: artists,
    isLoading,
    isError,
  } = useQuery<Artist[]>({
    queryKey: ["public-artists"],
    queryFn: async () => {
      const resp = await api.get("/artists");
      // Ensure we return an array even if the API response is unexpected
      return Array.isArray(resp.data) ? resp.data : [];
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <section
        id="lineup"
        className="py-24 bg-black flex items-center justify-center min-h-[400px]"
      >
        <Loader2 className="animate-spin text-primary" size={40} />
      </section>
    );
  }

  if (isError || !Array.isArray(artists) || artists.length === 0) return null;

  return (
    <section id="lineup" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-4">
            {t("lineup.title")}
            <span className="text-primary">{t("lineup.span")}</span>
          </h2>
          <p className="text-gray-400 font-medium tracking-widest uppercase">
            {t("lineup.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {artists.map((artist) => (
            <motion.div
              key={artist._id}
              whileHover={{ y: -10 }}
              className="relative group cursor-pointer overflow-hidden rounded-2xl bg-white/5 border border-white/10"
              onClick={() => setSelectedArtist(artist)}
            >
              <div className="aspect-[3/4] overflow-hidden bg-zinc-900 flex items-center justify-center relative border-b border-white/5">
                {artist.imageUrl ? (
                  <img
                    src={`/uploads/${artist.imageUrl}`}
                    alt={artist.stageName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                    <div className="text-white/10 uppercase font-black text-4xl -rotate-12 select-none group-hover:text-primary/20 transition-colors">
                      FESTI
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              </div>
              <div className="p-6 absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent">
                <h3 className="text-2xl font-black text-white mb-1 uppercase italic">
                  {artist.stageName}
                </h3>
                <p className="text-primary font-bold text-sm uppercase flex items-center gap-2">
                  <Music size={14} /> {artist.genre}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Artist Modal */}
      <AnimatePresence>
        {selectedArtist && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedArtist(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-zinc-900 w-full max-w-2xl rounded-3xl overflow-hidden relative border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-6 right-6 z-10 p-2 bg-black/50 rounded-full hover:bg-white/10 transition-colors"
                onClick={() => setSelectedArtist(null)}
              >
                <X size={24} />
              </button>

              <div className="p-8 md:p-12 flex flex-col justify-center text-center">
                <div className="flex items-center justify-center gap-2 text-primary mb-4 font-black uppercase text-sm tracking-widest">
                  <Mic2 size={16} /> {t("lineup.modal.featured")}
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase italic">
                  {selectedArtist.stageName}
                </h2>
                <div className="h-1 w-20 bg-primary mx-auto mb-8 rounded-full" />
                <p className="text-gray-400 text-lg leading-relaxed">
                  {selectedArtist.bio}
                </p>

                <div className="mt-10 pt-8 border-t border-white/5 flex justify-center items-center gap-8">
                  <div className="text-center">
                    <div className="text-primary font-black uppercase text-xs tracking-tighter">
                      Genre
                    </div>
                    <div className="text-white font-bold">
                      {selectedArtist.genre}
                    </div>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="text-center">
                    <div className="text-primary font-black uppercase text-xs tracking-tighter">
                      Status
                    </div>
                    <div className="text-white font-bold">Confirmed</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Lineup;
