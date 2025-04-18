import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useTranslation } from "../../../context/TranslationContext";
import {
  Mail,
  Lock,
  User,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";

export const RegisterPage = () => {
  const { t } = useTranslation();
  const { register, loading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [registrationStep, setRegistrationStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    // Clear errors when user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Calculate password strength
    if (name === "password") {
      const strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  const calculatePasswordStrength = (password) => {
    if (!password) return 0;

    let score = 0;

    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;

    // Complexity checks
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    // Normalize to 0-3 scale
    return Math.min(3, Math.floor(score / 2));
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0:
        return t("auth.validation.passwordWeak");
      case 1:
        return t("auth.validation.passwordFair");
      case 2:
        return t("auth.validation.passwordGood");
      case 3:
        return t("auth.validation.passwordStrong");
      default:
        return "";
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
        return "bg-red-500";
      case 1:
        return "bg-orange-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-green-500";
      default:
        return "bg-gray-200";
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    // Validate name
    if (!formState.name.trim()) {
      newErrors.name = t("auth.validation.nameRequired");
      valid = false;
    }

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
    } else if (formState.password.length < 8) {
      newErrors.password = t("auth.validation.passwordLength");
      valid = false;
    } else if (passwordStrength < 2) {
      newErrors.password = t("auth.validation.passwordTooWeak");
      valid = false;
    }

    // Validate confirm password
    if (formState.password !== formState.confirmPassword) {
      newErrors.confirmPassword = t("auth.validation.passwordMatch");
      valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await register({
        name: formState.name,
        email: formState.email,
        password: formState.password,
      });

      setShowSuccessMessage(true);

      // Redirect after a short delay to show success message
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (err) {
      console.error("Registration failed:", err);
      // The error will be handled by the auth context
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleNextStep = (e) => {
    e.preventDefault();

    // Validate first step fields
    let valid = true;
    const newErrors = { ...formErrors };

    if (!formState.name.trim()) {
      newErrors.name = t("auth.validation.nameRequired");
      valid = false;
    }

    if (!formState.email.trim()) {
      newErrors.email = t("auth.validation.emailRequired");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = t("auth.validation.emailInvalid");
      valid = false;
    }

    setFormErrors(newErrors);

    if (valid) {
      setRegistrationStep(2);
    }
  };

  if (isAuthenticated) {
    return navigate("/profile");
  }

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
            <User className="text-yellow-500 mr-2" size={16} />
            <span className="text-sm text-gray-700 font-medium">
              {t("auth.join")}
            </span>
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t("auth.register.title")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
              {t("auth.register.titleColored")}
            </span>
          </h1>
          <p className="text-gray-600">{t("auth.register.subtitle")}</p>
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
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t("auth.register.success")}
              </h3>
              <p className="text-gray-600 mb-4">
                {t("auth.register.redirecting")}
              </p>
              <div className="w-8 h-8 border-t-2 border-yellow-500 border-solid rounded-full animate-spin mx-auto"></div>
            </motion.div>
          ) : (
            <form
              onSubmit={registrationStep === 1 ? handleNextStep : handleSubmit}
            >
              {/* Step indicator */}
              <div className="mb-6 relative">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${registrationStep === 1 ? "bg-yellow-500 text-white" : "bg-green-500 text-white"}`}
                    >
                      {registrationStep > 1 ? <CheckCircle size={16} /> : "1"}
                    </div>
                    <span className="text-xs text-gray-600">
                      {t("auth.register.accountInfo")}
                    </span>
                  </div>

                  <div className="w-full max-w-[80px] h-1 bg-gray-200 mx-2">
                    <div
                      className={`h-full bg-yellow-500 ${registrationStep > 1 ? "w-full" : "w-0"} transition-all duration-500`}
                    ></div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${registrationStep === 2 ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-700"}`}
                    >
                      2
                    </div>
                    <span className="text-xs text-gray-600">
                      {t("auth.register.security")}
                    </span>
                  </div>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start mb-6"
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

              {registrationStep === 1 ? (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t("auth.form.name")}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="text-gray-400" size={18} />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                          formErrors.name ? "border-red-300" : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors`}
                        placeholder="John Doe"
                      />
                    </div>
                    {formErrors.name && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-1 text-sm text-red-600"
                      >
                        {formErrors.name}
                      </motion.p>
                    )}
                  </div>

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
                          formErrors.email
                            ? "border-red-300"
                            : "border-gray-300"
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
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-lg shadow-yellow-500/20 font-medium flex items-center justify-center"
                    >
                      {t("auth.form.next")}
                      <ArrowRight size={16} className="ml-2" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
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
                          formErrors.password
                            ? "border-red-300"
                            : "border-gray-300"
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

                    {/* Password strength indicator */}
                    {formState.password && (
                      <div className="mt-2">
                        <div className="flex items-center mb-1">
                          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden flex">
                            <div
                              className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                              style={{
                                width: `${(passwordStrength + 1) * 25}%`,
                              }}
                            ></div>
                          </div>
                          <span
                            className="ml-2 text-xs font-medium"
                            style={{
                              color:
                                passwordStrength > 0
                                  ? passwordStrength === 1
                                    ? "rgb(249 115 22)"
                                    : passwordStrength === 2
                                      ? "rgb(234 179 8)"
                                      : "rgb(34 197 94)"
                                  : "rgb(239 68 68)",
                            }}
                          >
                            {getPasswordStrengthText()}
                          </span>
                        </div>
                        <ul className="text-xs space-y-1 text-gray-600 mt-2">
                          <li className="flex items-center">
                            <div
                              className={`w-3 h-3 rounded-full mr-2 ${formState.password.length >= 8 ? "bg-green-500" : "bg-gray-300"}`}
                            ></div>
                            {t("auth.validation.min8Chars")}
                          </li>
                          <li className="flex items-center">
                            <div
                              className={`w-3 h-3 rounded-full mr-2 ${/[A-Z]/.test(formState.password) ? "bg-green-500" : "bg-gray-300"}`}
                            ></div>
                            {t("auth.validation.upperCase")}
                          </li>
                          <li className="flex items-center">
                            <div
                              className={`w-3 h-3 rounded-full mr-2 ${/[0-9]/.test(formState.password) ? "bg-green-500" : "bg-gray-300"}`}
                            ></div>
                            {t("auth.validation.numbers")}
                          </li>
                          <li className="flex items-center">
                            <div
                              className={`w-3 h-3 rounded-full mr-2 ${/[^A-Za-z0-9]/.test(formState.password) ? "bg-green-500" : "bg-gray-300"}`}
                            ></div>
                            {t("auth.validation.specialChar")}
                          </li>
                        </ul>
                      </div>
                    )}

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

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t("auth.form.confirmPassword")}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="text-gray-400" size={18} />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formState.confirmPassword}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-10 py-3 rounded-lg border ${
                          formErrors.confirmPassword
                            ? "border-red-300"
                            : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showConfirmPassword ? (
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
                    {formErrors.confirmPassword && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-1 text-sm text-red-600"
                      >
                        {formErrors.confirmPassword}
                      </motion.p>
                    )}
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setRegistrationStep(1)}
                      className="w-1/3 px-6 py-3 bg-transparent border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
                    >
                      {t("auth.form.back")}
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-2/3 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-lg shadow-yellow-500/20 font-medium flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                          {t("auth.form.registering")}
                        </>
                      ) : (
                        <>
                          {t("auth.form.createAccount")}
                          <ArrowRight size={16} className="ml-2" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 text-center">
                  {t("auth.form.haveAccount")}{" "}
                  <Link
                    to="/login"
                    className="font-medium text-yellow-600 hover:text-yellow-500"
                  >
                    {t("auth.form.loginNow")}
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
            {t("auth.terms.agreementPrefix")}{" "}
            <a
              href="#"
              className="text-yellow-600 font-medium hover:text-yellow-500"
            >
              {t("auth.terms.termsOfService")}
            </a>{" "}
            {t("auth.terms.and")}{" "}
            <a
              href="#"
              className="text-yellow-600 font-medium hover:text-yellow-500"
            >
              {t("auth.terms.privacyPolicy")}
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
