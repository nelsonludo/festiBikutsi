import React, { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "fr" : "en";
    i18n.changeLanguage(newLang);
  };

  const navLinks = [
    { name: t("nav.home"), href: "#" },
    { name: t("nav.festival"), href: "#festival" },
    { name: t("nav.lineup"), href: "#lineup" },
    { name: t("nav.schedule"), href: "#schedule" },
    { name: t("nav.gallery"), href: "#gallery" },
    { name: t("nav.registration"), href: "#registration" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-md py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <LogoContainer />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-widest"
              >
                {link.name}
              </a>
            ))}
          </div>
          <button
            onClick={toggleLanguage}
            className="hidden md:flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <Globe size={16} />
            <span className="text-xs font-bold uppercase">{i18n.language}</span>
          </button>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={toggleLanguage} className="p-2">
              <Globe size={20} />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl absolute top-full left-0 w-full border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-4 text-base font-medium hover:bg-white/5 border-b border-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

interface LogoContainerProps {
  variant?: boolean;
}

const LogoContainer: React.FC<LogoContainerProps> = ({ variant = false }) => {
  return (
    <div className="flex-shrink-0 flex items-center">
      <img
        src={
          variant
            ? "/images/festiBikutsiLogoVariant1NoBg.png"
            : "/images/festiBikutsiLogoNoBg-.png"
        }
        alt="logo"
        className="w-24"
      />
    </div>
  );
};

export { LogoContainer };

export default Navbar;
