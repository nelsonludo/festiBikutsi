import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import api from "../api";

const Hero: React.FC = () => {
  const { t } = useTranslation();

  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const resp = await api.get("/settings");
      return resp.data;
    },
  });

  const festivalDate = settings?.festivalDate;
  const targetDate = useMemo(() => {
    if (festivalDate) {
      return new Date(festivalDate).getTime();
    }
    return new Date("2026-11-25T00:00:00").getTime();
  }, [festivalDate]);

  function calculateTimeLeft(target: number) {
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));

  // Sync state with targetDate change immediately (prevents 1s lag)
  const [lastTarget, setLastTarget] = useState(targetDate);
  if (targetDate !== lastTarget) {
    setLastTarget(targetDate);
    setTimeLeft(calculateTimeLeft(targetDate));
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const countdownItems = [
    { label: t("hero.days"), value: timeLeft.days },
    { label: t("hero.hours"), value: timeLeft.hours },
    { label: t("hero.minutes"), value: timeLeft.minutes },
    { label: t("hero.seconds"), value: timeLeft.seconds },
  ];

  return (
    <section className="relative mb-10 flex items-center justify-center overflow-hidden">
      {/* Video/Image Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Festival Crowd"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight uppercase">
            <span className="text-primary italic">
              FESTI <span className="text-secondary">BIKUTSI</span>
            </span>{" "}
            <br />
            {t("hero.title")}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto font-medium">
            {t("hero.subtitle")}
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {countdownItems.map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl"
            >
              <div className="text-4xl md:text-6xl font-black text-secondary mb-1">
                {String(item.value).padStart(2, "0")}
              </div>
              <div className="text-xs uppercase tracking-widest font-bold text-gray-400">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a
            href="#registration"
            className="btn-clay w-full sm:w-auto text-center inline-block"
          >
            {t("hero.cta")}
          </a>
          <a
            href="#schedule"
            className="px-8 py-3 rounded-clay border-2 border-white/30 font-bold hover:bg-white/10 transition-all w-full sm:w-auto text-center inline-block"
          >
            {t("hero.explore")}
          </a>
        </motion.div>
      </div>

      {/* Rhythmic Bottom Wave (Decorative) */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
};

export default Hero;
