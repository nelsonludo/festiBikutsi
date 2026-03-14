import React from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Image as ImageIcon,
  Clock,
  Globe,
  CheckCircle2,
  Lightbulb,
  ChevronRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";

type SectionKey =
  | "dashboard"
  | "artists"
  | "schedule"
  | "gallery"
  | "history"
  | "language";

interface SectionConfig {
  key: SectionKey;
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
}

const SECTIONS: SectionConfig[] = [
  {
    key: "dashboard",
    icon: LayoutDashboard,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    key: "artists",
    icon: Users,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    key: "schedule",
    icon: Calendar,
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
  {
    key: "gallery",
    icon: ImageIcon,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  {
    key: "history",
    icon: Clock,
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-100",
  },
  {
    key: "language",
    icon: Globe,
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-100",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const HowItWorks: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-primary via-primary/90 to-secondary p-10 rounded-[2.5rem] overflow-hidden shadow-xl shadow-primary/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/4" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Lightbulb size={26} className="text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white tracking-tight">
                {t("admin.howItWorks.title")}
              </h2>
              <p className="text-white/70 font-medium text-sm">
                {t("admin.howItWorks.subtitle")}
              </p>
            </div>
          </div>
          <p className="text-white/80 leading-relaxed max-w-2xl text-sm">
            {t("admin.howItWorks.intro")}
          </p>
        </div>
      </div>

      {/* Section Cards */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {SECTIONS.map((section, index) => {
          const Icon = section.icon;
          const steps = t(`admin.howItWorks.sections.${section.key}.steps`, {
            returnObjects: true,
          }) as string[];

          return (
            <motion.div
              key={section.key}
              variants={itemVariants}
              className={`bg-white rounded-[2rem] border ${section.border} shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group`}
            >
              {/* Card Header */}
              <div
                className={`${section.bg} px-8 py-6 flex items-center gap-4 border-b ${section.border}`}
              >
                <div
                  className={`w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm ${section.color}`}
                >
                  <Icon size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-black uppercase tracking-widest ${section.color} opacity-60`}
                    >
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900">
                    {t(`admin.howItWorks.sections.${section.key}.title`)}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="px-8 py-6 space-y-5">
                <p className="text-slate-500 text-sm leading-relaxed">
                  {t(`admin.howItWorks.sections.${section.key}.desc`)}
                </p>

                <ul className="space-y-3">
                  {Array.isArray(steps) &&
                    steps.map((step: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <div
                          className={`mt-0.5 w-5 h-5 rounded-full ${section.bg} flex items-center justify-center flex-shrink-0`}
                        >
                          <ChevronRight size={12} className={section.color} />
                        </div>
                        <span className="text-slate-600 leading-relaxed">
                          {step}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Pro Tips */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-10 shadow-xl"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
            <Lightbulb size={24} className="text-primary" />
          </div>
          <h3 className="text-2xl font-black text-white">
            {t("admin.howItWorks.tip.title")}
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(
            t("admin.howItWorks.tip.items", { returnObjects: true }) as string[]
          ).map((tip: string, i: number) => (
            <div
              key={i}
              className="flex items-start gap-3 bg-white/5 rounded-2xl p-5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <CheckCircle2
                size={18}
                className="text-primary flex-shrink-0 mt-0.5"
              />
              <p className="text-white/80 text-sm leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HowItWorks;
