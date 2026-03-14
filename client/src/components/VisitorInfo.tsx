import React, { useState } from "react";
import { HelpCircle, Plane, Tent, MapPin, ChevronRight } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";

const VisitorInfo: React.FC = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: t("visitor.faqs.q1.q"), a: t("visitor.faqs.q1.a") },
    { q: t("visitor.faqs.q2.q"), a: t("visitor.faqs.q2.a") },
    {
      q: t("visitor.faqs.q3.q"),
      a: (
        <Trans
          i18nKey="visitor.faqs.q3.a"
          components={{ span: <span className="text-primary font-bold" /> }}
        />
      ),
    },
  ];

  return (
    <section id="visitor-info" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-4">
            {t("visitor.title")}{" "}
            <span className="text-secondary">{t("visitor.span")}</span>
          </h2>
          <p className="text-gray-400 font-medium tracking-widest uppercase">
            {t("visitor.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* FAQ & Tips */}
          <div className="space-y-8">
            <div className="glass-card">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary">
                <HelpCircle size={24} /> {t("visitor.faqTitle")}
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="border-b border-white/5 pb-4 last:border-0"
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      className="flex items-center justify-between w-full text-left font-bold group"
                    >
                      {faq.q}
                      <ChevronRight
                        size={18}
                        className={`text-primary transition-transform ${openIndex === i ? "rotate-90" : "group-hover:translate-x-1"}`}
                      />
                    </button>
                    {openIndex === i && (
                      <p className="text-gray-400 text-sm mt-2">{faq.a}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <Plane className="text-secondary mb-4" size={32} />
                <h4 className="font-bold mb-2">{t("visitor.travel.title")}</h4>
                <p className="text-gray-400 text-sm">
                  {t("visitor.travel.desc")}
                </p>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <Tent className="text-primary mb-4" size={32} />
                <h4 className="font-bold mb-2">{t("visitor.lodging.title")}</h4>
                <p className="text-gray-400 text-sm">
                  {t("visitor.lodging.desc")}
                </p>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="relative group rounded-3xl overflow-hidden h-[500px] border border-white/10 shadow-2xl">
            <img
              src="/images/camp-artistique.png"
              alt="Map Placeholder"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="bg-black/80 backdrop-blur-md p-8 rounded-2xl text-center border border-primary max-w-sm">
                <MapPin
                  size={48}
                  className="text-primary mx-auto mb-4 animate-bounce"
                />
                <h3 className="text-2xl font-black mb-2 uppercase">
                  {t("visitor.mapLocation")}
                </h3>
                <p className="text-gray-300 text-sm mb-6 italic">
                  {t("visitor.mapCity")}
                </p>
                <a
                  href="https://maps.app.goo.gl/8cjXD2eYobe5WpXdA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-clay text-sm w-full block text-center"
                >
                  {t("visitor.mapBtn")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitorInfo;
