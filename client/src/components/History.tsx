import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import api from "../api.js";

interface HistoryItem {
  _id: string;
  year: string;
  title: string;
  description: string;
  order: number;
}

const History: React.FC = () => {
  const { t } = useTranslation();

  const { data: historyItems, isLoading } = useQuery<HistoryItem[]>({
    queryKey: ["public-history"],
    queryFn: async () => {
      const resp = await api.get("/history");
      return Array.isArray(resp.data) ? resp.data : [];
    },
  });

  return (
    <section
      id="festival"
      className="py-24 bg-beti-earth/10 relative overflow-hidden textured-section"
    >
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase">
            {t("history.title")}
            <span className="text-primary">{t("history.span")}</span>
          </h2>
          <div className="w-24 h-2 bg-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-white/10 rounded-full" />

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-primary" size={48} />
            </div>
          ) : (
            <div className="space-y-24">
              {historyItems?.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center justify-between w-full ${
                    index % 2 === 0
                      ? "flex-row-reverse text-right"
                      : "text-left"
                  }`}
                >
                  <div className="w-[45%]" />

                  {/* Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-black z-10" />

                  <div className="w-[45%] glass-card hover:bg-white/10 transition-colors cursor-default group">
                    <div className="text-2xl font-black text-secondary mb-2 group-hover:text-primary transition-colors">
                      {item.year}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-sm">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default History;
