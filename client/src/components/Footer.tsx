import React, { useState } from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  MapPin,
  Phone,
  X,
  Music,
  Hash as Threads,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  return (
    <>
      <footer className="bg-black border-t border-white/10 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Logo/Description */}
            <div className="md:col-span-2">
              <span className="text-3xl font-display font-black text-primary block mb-6 uppercase">
                FESTI<span className="text-white">BIKUTSI</span>
              </span>
              <p className="text-gray-400 max-w-sm leading-relaxed mb-6 italic">
                {t("footer.quote")}
              </p>
              <div className="flex gap-4">
                {[
                  {
                    socialMediaName: Facebook,
                    socialMediaLink: "https://web.facebook.com/festibikutsicam",
                  },
                  {
                    socialMediaName: Instagram,
                    socialMediaLink:
                      "https://www.instagram.com/festibikutsicameroun/",
                  },
                  {
                    socialMediaName: Twitter,
                    socialMediaLink: "https://x.com/festi_Bikutsi",
                  },
                  {
                    socialMediaName: Youtube,
                    socialMediaLink:
                      "https://www.youtube.com/channel/UCMCra19DbcbcwVR0Q4CKf5Q",
                  },
                  {
                    socialMediaName: Threads,
                    socialMediaLink:
                      "https://www.threads.com/@festibikutsicameroun",
                  },
                  {
                    socialMediaName: Music,
                    socialMediaLink: "https://www.tiktok.com/@festibikutsi",
                  },
                ].map((icon, i) => (
                  <a
                    key={i}
                    href={icon.socialMediaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/5 rounded-full hover:bg-primary transition-colors hover:text-white text-gray-400"
                  >
                    <icon.socialMediaName size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">
                {t("footer.linksTitle")}
              </h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li>
                  <a
                    href="#festival"
                    className="hover:text-primary transition-colors"
                  >
                    {t("footer.links.festival")}
                  </a>
                </li>
                <li>
                  <a
                    href="#lineup"
                    className="hover:text-primary transition-colors"
                  >
                    {t("footer.links.lineup")}
                  </a>
                </li>
                <li>
                  <a
                    href="#schedule"
                    className="hover:text-primary transition-colors"
                  >
                    {t("footer.links.schedule")}
                  </a>
                </li>
                <li>
                  <a
                    href="#registration"
                    className="hover:text-primary transition-colors"
                  >
                    {t("footer.links.registration")}
                  </a>
                </li>
                <li>
                  <a
                    href="/admin"
                    className="hover:text-primary transition-colors"
                  >
                    {t("footer.links.admin")}
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">
                {t("footer.contactTitle")}
              </h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="flex items-center gap-3">
                  <MapPin size={16} className="text-primary" /> Yaoundé, CMR
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-primary" /> +237 6XX XXX XXX
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-primary" />{" "}
                  info@festibikustsi.cm
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 text-center text-gray-500 text-xs tracking-widest uppercase flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-1">
            <span>&copy; 2026 Festibikutsi Festival. {t("footer.rights")}</span>
            <span className="hidden sm:inline">|</span>
            <button
              onClick={() => setIsPrivacyModalOpen(true)}
              className="hover:text-white transition-colors uppercase"
            >
              {t("footer.privacy")}
            </button>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {isPrivacyModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setIsPrivacyModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-zinc-900 border border-white/10 rounded-2xl p-8 max-w-2xl w-full relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsPrivacyModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <h3 className="text-2xl font-black mb-6 uppercase text-primary">
                {t("footer.privacyModal.title")}
              </h3>

              <div className="space-y-4 text-gray-300 text-sm leading-relaxed max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                {(
                  t("footer.privacyModal.content", {
                    returnObjects: true,
                  }) as string[]
                ).map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setIsPrivacyModalOpen(false)}
                  className="px-6 py-2 rounded-full border border-white/20 text-sm font-bold hover:bg-white/10 transition-colors"
                >
                  {t("footer.privacyModal.close")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;
