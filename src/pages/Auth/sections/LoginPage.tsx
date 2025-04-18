import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useTranslation } from "../../../context/TranslationContext";
import {
  Mail,
  Lock,
  LogIn,
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";

export const LoginPage = () => {
  const { t } = useTranslation();
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    // Clear errors when user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    // Validate email
    if (!formState.email.trim()) {
      newErrors.email = t("auth.validation.emailRequired");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = t("auth.validation.emailInvalid");
      valid = false;
    }

    // Validate password
    if (!formState.password) {
      newErrors.password = t("auth.validation.passwordRequired");
      valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await login(formState.email, formState.password);
      setShowSuccessMessage(true);

      // Redirect after a short delay to show success message
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (err) {
      console.error("Login failed:", err);
      // The error will be handled by the auth context
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute right-0 top-40 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl"></div>
      <div className="absolute left-0 bottom-40 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-md mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center mb-6 px-4 py-2 bg-gray-100 border border-gray-200 rounded-full"
          >
            <LogIn className="text-yellow-500 mr-2" size={16} />
            <span className="text-sm text-gray-700 font-medium">
              {t("auth.welcome")}
            </span>
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t("auth.login.title")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
              {t("auth.login.titleColored")}
            </span>
          </h1>
          <p className="text-gray-600">{t("auth.login.subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
        >
          {showSuccessMessage ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t("auth.login.success")}
              </h3>
              <p className="text-gray-600 mb-4">
                {t("auth.login.redirecting")}
              </p>
              <div className="w-8 h-8 border-t-2 border-yellow-500 border-solid rounded-full animate-spin mx-auto"></div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start"
                >
                  <AlertCircle className="text-red-500 mr-3 mt-0.5" size={18} />
                  <div>
                    <h4 className="text-sm font-medium text-red-800">
                      {t("auth.error.title")}
                    </h4>
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                </motion.div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("auth.form.email")}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="text-gray-400" size={18} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      formErrors.email ? "border-red-300" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors`}
                    placeholder="your@email.com"
                  />
                </div>
                {formErrors.email && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1 text-sm text-red-600"
                  >
                    {formErrors.email}
                  </motion.p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t("auth.form.password")}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="text-gray-400" size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formState.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-10 py-3 rounded-lg border ${
                      formErrors.password ? "border-red-300" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff
                        className="text-gray-400 hover:text-gray-600"
                        size={18}
                      />
                    ) : (
                      <Eye
                        className="text-gray-400 hover:text-gray-600"
                        size={18}
                      />
                    )}
                  </button>
                </div>
                {formErrors.password && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1 text-sm text-red-600"
                  >
                    {formErrors.password}
                  </motion.p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    {t("auth.form.rememberMe")}
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-yellow-600 hover:text-yellow-500"
                >
                  {t("auth.form.forgotPassword")}
                </a>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-lg shadow-yellow-500/20 font-medium flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                      {t("auth.form.loggingIn")}
                    </>
                  ) : (
                    <>
                      {t("auth.form.login")}
                      <ArrowRight size={16} className="ml-2" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  {t("auth.form.noAccount")}{" "}
                  <Link
                    to="/register"
                    className="font-medium text-yellow-600 hover:text-yellow-500"
                  >
                    {t("auth.form.registerNow")}
                  </Link>
                </p>
              </div>
            </form>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-600">
            {t("auth.security.title")}{" "}
            <a
              href="#"
              className="text-yellow-600 font-medium hover:text-yellow-500"
            >
              {t("auth.security.learnMore")}
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
