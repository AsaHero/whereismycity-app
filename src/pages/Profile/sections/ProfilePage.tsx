import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Key,
  Mail,
  Edit,
  Copy,
  Check,
  AlertCircle,
  Clock,
  ChevronRight,
  ShieldCheck,
  BarChart3,
  EyeOff,
  Eye,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useTranslation } from "../../../context/TranslationContext";
import { Link, Navigate } from "react-router-dom";

export const ProfilePage = () => {
  const { currentUser, updateProfile, isAuthenticated, loading, error } =
    useAuth();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("account");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [copiedApiKey, setCopiedApiKey] = useState(false);
  const [usagePlan, setUsagePlan] = useState("Free");
  const [apiPassword, setApiPassword] = useState("");
  const [showApiPassword, setShowApiPassword] = useState(false);

  // Redirect if not authenticated
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        username: currentUser.username || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [currentUser]);

  const copyApiCredentials = () => {
    if (!apiPassword.trim()) {
      // Alert user that password is needed
      setFormErrors({
        ...formErrors,
        apiPassword: "Please enter your API password to generate credentials",
      });
      return;
    }

    // Clear any previous errors
    setFormErrors({
      ...formErrors,
      apiPassword: null,
    });

    // Generate the Authorization header with the actual password provided
    const apiCredentials = `${currentUser.username}:${apiPassword}`;
    const base64Credentials = btoa(apiCredentials);
    navigator.clipboard.writeText(`Authorization: Basic ${base64Credentials}`);

    setCopiedApiKey(true);
    setTimeout(() => setCopiedApiKey(false), 2000);
  };

  const handleApiPasswordChange = (e) => {
    setApiPassword(e.target.value);
    // Clear error when user starts typing
    if (formErrors.apiPassword) {
      setFormErrors({
        ...formErrors,
        apiPassword: null,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear specific error when user starts typing
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: null });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = t("profile.errors.nameRequired");
    }

    if (!formData.email.trim()) {
      errors.email = t("profile.errors.emailRequired");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = t("profile.errors.emailInvalid");
    }

    if (formData.newPassword && formData.newPassword.length < 8) {
      errors.newPassword = t("profile.errors.passwordLength");
    }

    if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = t("profile.errors.passwordMismatch");
    }

    if (formData.newPassword && !formData.currentPassword) {
      errors.currentPassword = t("profile.errors.currentPasswordRequired");
    }

    if (!formData.username.trim()) {
      errors.username = t("profile.errors.usernameRequired");
    }

    return errors;
  };

  const toggleShowApiPassword = () => {
    setShowApiPassword(!showApiPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setSuccessMessage("");

    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      // Prepare update data
      const updateData = {
        name: formData.name,
        email: formData.email,
        username: formData.username,
      };

      // Add password fields if user is updating password
      if (formData.newPassword) {
        updateData.old_password = formData.currentPassword;
        updateData.new_password = formData.newPassword;
      }

      await updateProfile(updateData);
      setSuccessMessage(t("profile.updateSuccess"));
      setIsEditing(false);

      // Clear password fields after update
      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      // Handle API errors
      setFormErrors({
        api: err.message || t("profile.errors.updateFailed"),
      });
    }
  };

  const handleCancel = () => {
    // Reset form data to current user data
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        username: currentUser.username || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }

    // Clear errors and success message
    setFormErrors({});
    setSuccessMessage("");
    setIsEditing(false);
  };

  // Dummy usage data for the future usage dashboard
  const usageData = {
    totalRequests: 125,
    limit: 1000,
    remainingRequests: 875,
    resetDate: new Date(Date.now() + 86400000 * 7), // 7 days from now
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-20 pt-32 bg-gray-50 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:w-64 flex-shrink-0"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="relative w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 text-center truncate">
                  {currentUser?.name}
                </h3>
                <p className="text-sm text-gray-500 text-center truncate">
                  {currentUser?.email}
                </p>
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => setActiveTab("account")}
                      className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${
                        activeTab === "account"
                          ? "bg-yellow-50 text-yellow-700"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <User
                        className={`mr-3 ${activeTab === "account" ? "text-yellow-500" : "text-gray-500"}`}
                        size={18}
                      />
                      <span className="font-medium">
                        {t("profile.tabs.account")}
                      </span>
                      {activeTab === "account" && (
                        <motion.div
                          layoutId="activeProfileTab"
                          className="ml-auto w-1.5 h-5 bg-yellow-500 rounded-full"
                        />
                      )}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("api")}
                      className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${
                        activeTab === "api"
                          ? "bg-yellow-50 text-yellow-700"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Key
                        className={`mr-3 ${activeTab === "api" ? "text-yellow-500" : "text-gray-500"}`}
                        size={18}
                      />
                      <span className="font-medium">
                        {t("profile.tabs.api")}
                      </span>
                      {activeTab === "api" && (
                        <motion.div
                          layoutId="activeProfileTab"
                          className="ml-auto w-1.5 h-5 bg-yellow-500 rounded-full"
                        />
                      )}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab("usage")}
                      className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${
                        activeTab === "usage"
                          ? "bg-yellow-50 text-yellow-700"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <BarChart3
                        className={`mr-3 ${activeTab === "usage" ? "text-yellow-500" : "text-gray-500"}`}
                        size={18}
                      />
                      <span className="font-medium">
                        {t("profile.tabs.usage")}
                      </span>
                      {activeTab === "usage" && (
                        <motion.div
                          layoutId="activeProfileTab"
                          className="ml-auto w-1.5 h-5 bg-yellow-500 rounded-full"
                        />
                      )}
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Account Settings Tab */}
              {activeTab === "account" && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                      {t("profile.accountSettings")}
                    </h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 flex items-center text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <Edit size={16} className="mr-2" />
                        {t("profile.edit")}
                      </button>
                    ) : null}
                  </div>

                  {/* Success Message */}
                  {successMessage && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-lg text-green-700 flex items-start">
                      <Check size={20} className="mr-3 mt-0.5 flex-shrink-0" />
                      <p>{successMessage}</p>
                    </div>
                  )}

                  {/* API Error */}
                  {formErrors.api && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg text-red-700 flex items-start">
                      <AlertCircle
                        size={20}
                        className="mr-3 mt-0.5 flex-shrink-0"
                      />
                      <p>{formErrors.api}</p>
                    </div>
                  )}

                  {/* User Form */}
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      {/* Name Field */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          {t("profile.fields.name")}
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2.5 rounded-lg border ${
                              formErrors.name
                                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                            } focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:bg-gray-50 disabled:text-gray-500`}
                          />
                          {formErrors.name && (
                            <p className="mt-1 text-sm text-red-600">
                              {formErrors.name}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Email Field */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          {t("profile.fields.email")}
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2.5 rounded-lg border ${
                              formErrors.email
                                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                            } focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:bg-gray-50 disabled:text-gray-500`}
                          />
                          {formErrors.email && (
                            <p className="mt-1 text-sm text-red-600">
                              {formErrors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Username Field */}
                      <div>
                        <label
                          htmlFor="username"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          {t("profile.fields.username")}
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="username"
                            id="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2.5 rounded-lg border ${
                              formErrors.username
                                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                            } focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:bg-gray-50 disabled:text-gray-500`}
                          />
                          {formErrors.username && (
                            <p className="mt-1 text-sm text-red-600">
                              {formErrors.username}
                            </p>
                          )}
                          {isEditing && (
                            <p className="mt-1 text-sm text-gray-500">
                              {t("profile.usernameHelp")}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Password Fields - Only shown when editing */}
                      {isEditing && (
                        <div className="pt-2 border-t border-gray-200">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">
                            {t("profile.changePassword")}
                          </h3>

                          {/* Current Password */}
                          <div className="mb-4">
                            <label
                              htmlFor="currentPassword"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              {t("profile.fields.currentPassword")}
                            </label>
                            <div className="relative">
                              <input
                                type="password"
                                name="currentPassword"
                                id="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2.5 rounded-lg border ${
                                  formErrors.currentPassword
                                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                                } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                              />
                              {formErrors.currentPassword && (
                                <p className="mt-1 text-sm text-red-600">
                                  {formErrors.currentPassword}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* New Password */}
                          <div className="mb-4">
                            <label
                              htmlFor="newPassword"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              {t("profile.fields.newPassword")}
                            </label>
                            <div className="relative">
                              <input
                                type="password"
                                name="newPassword"
                                id="newPassword"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2.5 rounded-lg border ${
                                  formErrors.newPassword
                                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                                } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                              />
                              {formErrors.newPassword && (
                                <p className="mt-1 text-sm text-red-600">
                                  {formErrors.newPassword}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Confirm Password */}
                          <div>
                            <label
                              htmlFor="confirmPassword"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              {t("profile.fields.confirmPassword")}
                            </label>
                            <div className="relative">
                              <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2.5 rounded-lg border ${
                                  formErrors.confirmPassword
                                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                                } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                              />
                              {formErrors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600">
                                  {formErrors.confirmPassword}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Form Buttons - Only shown when editing */}
                      {isEditing && (
                        <div className="flex space-x-4 pt-4">
                          <button
                            type="submit"
                            className="px-5 py-2.5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-sm font-medium"
                          >
                            {t("profile.saveChanges")}
                          </button>
                          <button
                            type="button"
                            onClick={handleCancel}
                            className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium"
                          >
                            {t("profile.cancel")}
                          </button>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              )}

              {/* API Credentials Tab */}
              {activeTab === "api" && (
                <div className="p-6">
                  {/* Heading */}
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    {t("profile.apiKey")}
                  </h2>

                  {/* Explanation */}
                  <p className="mb-6 text-sm text-gray-600">
                    {t("profile.apiKeyDescription")} (Base64{" "}
                    <code>username:password</code>). {t("profile.apiKeyNote")}
                  </p>

                  {/* Generator */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                    <h3 className="font-medium text-gray-800 mb-4">
                      {t("profile.generateAuthHeader")}
                    </h3>

                    {/* Username (read‑only) */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("profile.fields.username")}
                      </label>
                      <input
                        type="text"
                        value={currentUser?.username || ""}
                        readOnly
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-700"
                      />
                    </div>

                    {/* Password input */}
                    <div className="mb-6">
                      <label
                        htmlFor="apiPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {t("profile.fields.password")}
                      </label>
                      <div className="relative">
                        <input
                          id="apiPassword"
                          type={showApiPassword ? "text" : "password"}
                          value={apiPassword}
                          onChange={handleApiPasswordChange}
                          placeholder={t("profile.placeholderPassword")}
                          className={`w-full px-4 py-2 pr-10 rounded-lg border ${
                            formErrors.apiPassword
                              ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                          } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                        />
                        <button
                          type="button"
                          onClick={toggleShowApiPassword}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                        >
                          {showApiPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                      {formErrors.apiPassword && (
                        <p className="mt-1 text-sm text-red-600">
                          {formErrors.apiPassword}
                        </p>
                      )}
                    </div>

                    {/* Generated header + Copy */}
                    <div className="flex items-center justify-between">
                      <code className="flex-1 font-mono text-sm bg-white p-2 rounded border overflow-x-auto mr-4">
                        Authorization: Basic{" "}
                        {apiPassword
                          ? btoa(`${currentUser?.username}:${apiPassword}`)
                          : t("profile.placeholderAuth")}
                      </code>
                      <button
                        onClick={copyApiCredentials}
                        disabled={!apiPassword}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          apiPassword
                            ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        {copiedApiKey ? t("profile.copied") : t("profile.copy")}
                      </button>
                    </div>
                  </div>

                  {/* Manual instructions & docs link */}
                  <div className="text-xs text-gray-500">
                    <p className="mb-2">
                      <strong>{t("profile.apiManual")}</strong>{" "}
                      {t("profile.apiManualDescription")}
                    </p>
                    <p>
                      <Link
                        to="/docs"
                        className="text-yellow-600 hover:underline"
                      >
                        {t("profile.viewDocs")}
                      </Link>{" "}
                      {t("profile.apiManualNote")}
                    </p>
                  </div>
                </div>
              )}

              {/* Usage Tab */}
              {activeTab === "usage" && (
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    {t("profile.usageStats")}
                  </h2>

                  {/* Coming Soon Message */}
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8 flex items-start">
                    <Clock
                      size={20}
                      className="mr-3 mt-0.5 text-blue-600 flex-shrink-0"
                    />
                    <div>
                      <p className="text-blue-800 font-medium">
                        {t("profile.comingSoon")}
                      </p>
                      <p className="text-blue-700 text-sm mt-1">
                        {t("profile.usageDashboardSoon")}
                      </p>
                    </div>
                  </div>

                  {/* Current Plan */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      {t("profile.currentPlan")}
                    </h3>
                    <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <ShieldCheck
                          size={24}
                          className="mr-4 text-yellow-600"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {usagePlan} Plan
                          </h4>
                          <p className="text-sm text-gray-600">
                            {usageData.limit} requests per month
                          </p>
                        </div>
                      </div>
                      <Link
                        to="/pricing"
                        className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium text-sm transition-colors shadow-sm"
                      >
                        {t("profile.upgradePlan")}
                      </Link>
                    </div>
                  </div>

                  {/* Usage Statistics Preview */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      {t("profile.usageOverview")}
                    </h3>
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                      <div className="p-4 border-b border-gray-200">
                        <h4 className="font-medium text-gray-700">
                          {t("profile.requestsThisMonth")}
                        </h4>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-3xl font-bold text-gray-900">
                            {usageData.totalRequests}
                          </div>
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">
                              {usageData.remainingRequests}
                            </span>{" "}
                            {t("profile.remaining")}
                          </div>
                        </div>

                        {/* Usage Progress Bar */}
                        <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden mb-2">
                          <div
                            className="h-full bg-yellow-500 rounded-full"
                            style={{
                              width: `${(usageData.totalRequests / usageData.limit) * 100}%`,
                            }}
                          ></div>
                        </div>

                        <div className="text-xs text-gray-500">
                          {t("profile.usageReset")}{" "}
                          {new Intl.DateTimeFormat(undefined, {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }).format(usageData.resetDate)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
