import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plane,
  Truck,
  ShoppingBag,
  BarChart3,
  Headphones,
  Building,
  ArrowRight,
} from "lucide-react";
import { useTranslation } from "../../../context/TranslationContext";

export const UseCases = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("travel");
  const [hoverTab, setHoverTab] = useState<string | null>(null);

  const useCases = {
    travel: {
      icon: <Plane size={32} />,
      title: t("useCases.travel.title"),
      color: "from-blue-500 to-blue-600",
      hoverColor: "group-hover:text-blue-500",
      activeColor: "bg-blue-500",
      lightBg: "bg-blue-50",
      description: t("useCases.travel.description"),
      benefits: t("useCases.travel.benefits"),
      image: "travel-app.jpg", // In a real implementation, you would use actual images
      cta: "See Travel API Documentation",
    },
    logistics: {
      icon: <Truck size={32} />,
      title: t("useCases.logistics.title"),
      color: "from-green-500 to-green-600",
      hoverColor: "group-hover:text-green-500",
      activeColor: "bg-green-500",
      lightBg: "bg-green-50",
      description: t("useCases.logistics.description"),
      benefits: t("useCases.logistics.benefits"),
      image: "logistics-app.jpg",
      cta: "Explore Logistics Solutions",
    },
    ecommerce: {
      icon: <ShoppingBag size={32} />,
      title: t("useCases.eCommerce.title"),
      color: "from-purple-500 to-purple-600",
      hoverColor: "group-hover:text-purple-500",
      activeColor: "bg-purple-500",
      lightBg: "bg-purple-50",
      description: t("useCases.eCommerce.description"),
      benefits: t("useCases.eCommerce.benefits"),
      image: "ecommerce-app.jpg",
      cta: "View E-commerce Integration",
    },
    analytics: {
      icon: <BarChart3 size={32} />,
      title: t("useCases.analytics.title"),
      color: "from-orange-500 to-orange-600",
      hoverColor: "group-hover:text-orange-500",
      activeColor: "bg-orange-500",
      lightBg: "bg-orange-50",
      description: t("useCases.analytics.description"),
      benefits: t("useCases.analytics.benefits"),
      image: "analytics-app.jpg",
      cta: "Discover Analytics Features",
    },
    support: {
      icon: <Headphones size={32} />,
      title: t("useCases.support.title"),
      color: "from-red-500 to-red-600",
      hoverColor: "group-hover:text-red-500",
      activeColor: "bg-red-500",
      lightBg: "bg-red-50",
      description: t("useCases.support.description"),
      benefits: t("useCases.support.benefits"),
      image: "support-app.jpg",
      cta: "Learn About Support Tools",
    },
  };

  const tabs = Object.entries(useCases).map(([key, value]) => ({
    id: key,
    ...value,
  }));

  const activeCase = useCases[activeTab as keyof typeof useCases];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute -left-32 top-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>
      <div className="absolute -right-32 bottom-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center mb-6 px-4 py-2 bg-gray-100 border border-gray-200 rounded-full"
          >
            <Building className="text-yellow-500 mr-2" size={16} />
            <span className="text-sm text-gray-700 font-medium">
              {t("useCases.badge")}
            </span>
          </motion.div>

          <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {t("useCases.title")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
              {t("useCases.titleColored")}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("useCases.subtitle")}
          </p>
        </motion.div>

        {/* Tab navigation */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center mb-12 gap-2"
          >
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                onMouseEnter={() => setHoverTab(tab.id)}
                onMouseLeave={() => setHoverTab(null)}
                className={`relative group px-5 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? `text-white bg-gradient-to-r ${tab.color} shadow-lg`
                    : "text-gray-600 hover:text-gray-900 bg-white border border-gray-200 hover:shadow"
                }`}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <span className="flex items-center">
                  <span
                    className={`mr-2 ${activeTab === tab.id ? "text-white" : tab.hoverColor}`}
                  >
                    {tab.icon}
                  </span>
                  {tab.title}
                </span>
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-white/30"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Content area with animated transitions */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div
                  className={`rounded-2xl overflow-hidden shadow-xl border border-gray-100`}
                >
                  <div
                    className={`p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center`}
                  >
                    {/* Left side: Content */}
                    <div>
                      <div
                        className={`inline-flex items-center mb-6 p-4 rounded-xl ${activeCase.lightBg}`}
                      >
                        <span
                          className={activeCase.color
                            .split(" ")[0]
                            .replace("from-", "text-")}
                        >
                          {activeCase.icon}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        <span
                          className={`text-transparent bg-clip-text bg-gradient-to-r ${activeCase.color}`}
                        >
                          {activeCase.title}
                        </span>
                      </h3>
                      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                        {activeCase.description}
                      </p>

                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">
                          {t("useCases.keyBenefits.title")}
                        </h4>
                        <ul className="space-y-3">
                          {activeCase.benefits.map((benefit, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="flex items-start"
                            >
                              <div
                                className={`p-1 mt-1 rounded-full ${activeCase.activeColor} mr-3`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3 w-3 text-white"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <span className="text-gray-700">{benefit}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <a
                          href={`#${activeTab}`}
                          className={`inline-flex items-center px-6 py-3 rounded-lg text-white bg-gradient-to-r ${activeCase.color} hover:shadow-lg transition-all group`}
                        >
                          {activeCase.cta}
                          <ArrowRight
                            size={16}
                            className="ml-2 transform group-hover:translate-x-1 transition-transform"
                          />
                        </a>
                      </motion.div>
                    </div>

                    {/* Right side: Visual demo/illustration */}
                    <div className="relative">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className={`rounded-xl overflow-hidden shadow-lg border border-gray-200 h-80 bg-gradient-to-br ${activeCase.color}`}
                      >
                        {/* This would be a real image in production */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-white text-center p-6">
                            <div className="mb-4 mx-auto bg-white/20 w-24 h-24 rounded-full flex items-center justify-center backdrop-blur-sm">
                              {React.cloneElement(
                                activeCase.icon as React.ReactElement,
                                {
                                  size: 48,
                                  className: "text-white",
                                }
                              )}
                            </div>
                            {/* <p className="font-medium text-xl mb-2">
                              Interactive Demo
                            </p>
                            <p className="text-sm opacity-80">
                              Visualization would appear here
                            </p> */}
                          </div>
                        </div>

                        {/* Abstract elements */}
                        <div className="absolute top-5 right-5 w-32 h-32 rounded-full blur-2xl bg-white opacity-20"></div>
                        <div className="absolute bottom-5 left-5 w-32 h-32 rounded-full blur-2xl bg-white opacity-20"></div>
                      </motion.div>

                      {/* Floating decorative elements */}
                      <motion.div
                        className="absolute -bottom-4 -right-4 w-12 h-12 rounded-lg"
                        animate={{
                          y: [0, -8, 0],
                          rotate: [0, 10, 0],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      >
                        <div
                          className={`w-full h-full rounded-lg ${activeCase.lightBg} flex items-center justify-center shadow-lg`}
                        >
                          {React.cloneElement(
                            activeCase.icon as React.ReactElement,
                            {
                              size: 24,
                              className: activeCase.color
                                .split(" ")[0]
                                .replace("from-", "text-"),
                            }
                          )}
                        </div>
                      </motion.div>

                      <motion.div
                        className="absolute -top-4 -left-4 w-8 h-8 rounded-full"
                        animate={{
                          y: [0, 8, 0],
                          x: [0, 5, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: 1,
                        }}
                      >
                        <div
                          className={`w-full h-full rounded-full shadow-lg bg-gradient-to-r ${activeCase.color}`}
                        ></div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
