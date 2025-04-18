import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Globe2, Menu, X, User } from "lucide-react";
import { useTranslation } from "../../context/TranslationContext";
import { useAuth } from "../../context/AuthContext";

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { language, changeLanguage, t } = useTranslation();
  const { currentUser, isAuthenticated, logout } = useAuth();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.pricing"), path: "/pricing" },
    { name: t("nav.documentation"), path: "/docs" },
    { name: t("nav.contacts"), path: "/contacts" },
  ];

  // Available languages for the dropdown
  const languages = [
    { code: "en", name: "🇺🇸 English" },
    { code: "ru", name: "🇷🇺 Русский" },
  ];

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLanguageMenuOpen) {
        setIsLanguageMenuOpen(false);
      }
      if (isUserMenuOpen) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLanguageMenuOpen, isUserMenuOpen]);

  const handleLanguageSelect = (langCode) => {
    if (langCode === "en" || langCode === "ru") {
      changeLanguage(langCode);
      setIsLanguageMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg"
          : isHomePage
            ? "bg-transparent"
            : "bg-white shadow-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2 z-10"
        >
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400 rounded-full blur-md opacity-30"></div>
              <Globe2 className="text-yellow-500 relative z-10" size={32} />
            </div>
            <span
              className={`text-xl font-bold ${scrolled || !isHomePage ? "text-gray-900" : "text-white"}`}
            >
              WhereIsMyCity
            </span>
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="hidden lg:flex space-x-8"
        >
          {navItems.map((item) => {
            const isExternal = item.path.startsWith("#");
            const isActive =
              item.path === location.pathname ||
              (isHomePage &&
                item.path.startsWith("#") &&
                location.hash === item.path);

            return isExternal ? (
              <a
                key={item.name}
                href={item.path}
                className={`relative group ${scrolled || !isHomePage ? "text-gray-700" : "text-gray-200"} hover:text-yellow-500 transition-colors`}
              >
                <span>{item.name}</span>
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            ) : (
              <Link
                key={item.name}
                to={item.path}
                className={`relative group ${scrolled || !isHomePage ? "text-gray-700" : "text-gray-200"} hover:text-yellow-500 transition-colors`}
              >
                <span>{item.name}</span>
                <span
                  className={`absolute left-0 bottom-0 h-0.5 bg-yellow-500 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                ></span>
              </Link>
            );
          })}
        </motion.div>

        {/* Desktop CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="hidden lg:flex items-center space-x-4"
        >
          {/* Language selector dropdown */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLanguageMenuOpen(!isLanguageMenuOpen);
              }}
              className={`px-3 py-2 rounded-lg flex items-center space-x-1 ${
                scrolled || !isHomePage
                  ? "text-gray-700 border border-gray-300 hover:bg-gray-100"
                  : "text-white border border-gray-600 hover:bg-gray-800/30"
              } transition-colors`}
              aria-expanded={isLanguageMenuOpen}
              aria-haspopup="true"
            >
              <span className="font-medium text-sm">
                {languages.find((lang) => lang.code === language)?.name ||
                  "English"}
              </span>
              <svg
                className={`w-4 h-4 ml-1 transition-transform ${isLanguageMenuOpen ? "transform rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            {/* Dropdown menu */}
            <AnimatePresence>
              {isLanguageMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                  role="menu"
                  aria-orientation="vertical"
                  tabIndex={-1}
                >
                  <div className="py-1" role="none">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className={`${
                          language === lang.code
                            ? "bg-yellow-50 text-yellow-700"
                            : "text-gray-700 hover:bg-gray-100"
                        } group flex items-center w-full px-4 py-2 text-sm`}
                        role="menuitem"
                        onClick={() => handleLanguageSelect(lang.code)}
                      >
                        {lang.name}
                        {language === lang.code && (
                          <span className="ml-auto">
                            <svg
                              className="w-4 h-4 text-yellow-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {isAuthenticated() ? (
            /* User is logged in - show profile menu */
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsUserMenuOpen(!isUserMenuOpen);
                }}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                  scrolled || !isHomePage
                    ? "text-gray-700 border border-gray-300 hover:bg-gray-100"
                    : "text-white border border-gray-600 hover:bg-gray-800/30"
                } transition-colors`}
                aria-expanded={isUserMenuOpen}
                aria-haspopup="true"
              >
                <User size={18} />
                <span className="font-medium text-sm max-w-[120px] truncate">
                  {currentUser?.name || t("nav.profile")}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform ${isUserMenuOpen ? "transform rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              {/* User dropdown menu */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                    role="menu"
                    aria-orientation="vertical"
                    tabIndex={-1}
                  >
                    <div className="py-1 border-b border-gray-100">
                      <div className="px-4 py-2">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {currentUser?.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {currentUser?.email}
                        </p>
                      </div>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="text-gray-700 hover:bg-gray-100 group flex items-center w-full px-4 py-2 text-sm"
                        role="menuitem"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        {t("nav.myProfile")}
                      </Link>
                      <button
                        className="text-gray-700 hover:bg-gray-100 group flex items-center w-full px-4 py-2 text-sm"
                        role="menuitem"
                        onClick={handleLogout}
                      >
                        {t("nav.signout")}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* User is not logged in - show login/register buttons */
            <>
              <Link
                to="/login"
                className={`${scrolled || !isHomePage ? "text-gray-700" : "text-gray-200"} hover:text-yellow-500 transition-colors font-medium`}
              >
                {t("nav.signin")}
              </Link>
              <Link
                to="/register"
                className="px-5 py-2.5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-md shadow-yellow-500/20 font-medium"
              >
                {t("nav.getApiKey")}
              </Link>
            </>
          )}
        </motion.div>

        {/* Mobile menu button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden z-10"
        >
          {mobileMenuOpen ? (
            <X
              className={
                scrolled || !isHomePage ? "text-gray-900" : "text-white"
              }
              size={24}
            />
          ) : (
            <Menu
              className={
                scrolled || !isHomePage ? "text-gray-900" : "text-white"
              }
              size={24}
            />
          )}
        </motion.button>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 top-0 z-0 bg-gray-900/95 backdrop-blur-md pt-20"
            >
              <div className="flex flex-col items-center space-y-6 p-6">
                {navItems.map((item) => {
                  const isExternal = item.path.startsWith("#");

                  return isExternal ? (
                    <a
                      key={item.name}
                      href={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-white text-xl hover:text-yellow-500 transition-colors"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="text-white text-xl hover:text-yellow-500 transition-colors"
                    >
                      {item.name}
                    </Link>
                  );
                })}

                {/* Language selection in mobile menu */}
                <div className="w-full max-w-xs border-t border-gray-700 pt-6 mt-2">
                  <p className="text-gray-400 text-sm mb-3 text-center">
                    {language === "en" ? "Select Language" : "Выберите язык"}
                  </p>
                  <div className="flex justify-center space-x-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageSelect(lang.code)}
                        className={`py-2 px-4 rounded ${
                          language === lang.code
                            ? "bg-yellow-500 text-white"
                            : "border border-gray-600 text-white hover:bg-gray-800"
                        } transition-colors flex items-center`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 w-full max-w-xs flex flex-col space-y-4">
                  {isAuthenticated() ? (
                    /* Mobile: User is logged in */
                    <>
                      <Link
                        to="/profile"
                        className="py-2.5 text-center text-white hover:text-yellow-500 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t("nav.myProfile")}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="py-2.5 text-center bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-lg shadow-yellow-500/20"
                      >
                        {t("nav.signout")}
                      </button>
                    </>
                  ) : (
                    /* Mobile: User is not logged in */
                    <>
                      <Link
                        to="/login"
                        className="py-2.5 text-center text-white hover:text-yellow-500 transition-colors"
                      >
                        {t("nav.signin")}
                      </Link>
                      <Link
                        to="/register"
                        className="py-2.5 text-center bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-lg shadow-yellow-500/20"
                      >
                        {t("nav.getApiKey")}
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
