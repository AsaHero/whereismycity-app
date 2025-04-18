import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Database,
  Languages,
  Code2,
  Shield,
  BarChart3,
} from "lucide-react";
import { useTranslation } from "../../../context/TranslationContext";

export const Features = () => {
  const { t } = useTranslation();
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <Search className="text-yellow-500" size={24} />,
      title: t("features.sematic.title"),
      description: t("features.sematic.description"),
      color: "from-yellow-500 to-yellow-600",
      bgLight: "bg-yellow-50",
      bgDark: "bg-yellow-600",
      animation: { delay: 0.1 },
    },
    {
      icon: <Languages className="text-blue-500" size={24} />,
      title: t("features.multilingual.title"),
      description: t("features.multilingual.description"),
      color: "from-blue-500 to-blue-600",
      bgLight: "bg-blue-50",
      bgDark: "bg-blue-600",
      animation: { delay: 0.2 },
    },
    {
      icon: <Database className="text-purple-500" size={24} />,
      title: t("features.comprehensive.title"),
      description: t("features.comprehensive.description"),
      color: "from-purple-500 to-purple-600",
      bgLight: "bg-purple-50",
      bgDark: "bg-purple-600",
      animation: { delay: 0.3 },
    },
    {
      icon: <Code2 className="text-green-500" size={24} />,
      title: t("features.development.title"),
      description: t("features.development.description"),
      color: "from-green-500 to-green-600",
      bgLight: "bg-green-50",
      bgDark: "bg-green-600",
      animation: { delay: 0.4 },
    },
  ];

  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      {/* Abstract design elements */}
      <div className="absolute right-0 top-40 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl"></div>
      <div className="absolute left-0 bottom-40 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center mb-6 px-4 py-2 bg-gray-100 border border-gray-200 rounded-full"
          >
            <Database className="text-yellow-500 mr-2" size={16} />
            <span className="text-sm text-gray-700 font-medium">
              {t("features.badge")}
            </span>
          </motion.div>

          <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {t("features.title")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
              {t("features.titleColored")}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("features.subtitle")}
          </p>
        </motion.div>

        {/* Interactive features showcase */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Feature Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/3 space-y-3"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: feature.animation.delay }}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 flex items-center ${
                  activeFeature === index
                    ? `${feature.bgLight} shadow-md`
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div
                  className={`p-3 rounded-lg ${activeFeature === index ? feature.bgLight : "bg-gray-100"} mr-4`}
                >
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  {activeFeature === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="lg:hidden mt-2 text-sm text-gray-600"
                    >
                      {feature.description}
                    </motion.div>
                  )}
                </div>
                {activeFeature === index && (
                  <motion.div
                    className="ml-auto w-2 h-6 rounded-full bg-gradient-to-b"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      backgroundImage: `linear-gradient(to bottom, ${feature.bgDark.replace("bg-", "")}, ${feature.bgDark.replace("bg-", "")})`,
                    }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Feature Details */}
          <motion.div
            className="lg:w-2/3 relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-full">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`absolute inset-0 rounded-2xl overflow-hidden ${
                    activeFeature === index ? "z-10" : "z-0"
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: activeFeature === index ? 1 : 0,
                    scale: activeFeature === index ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="h-full flex flex-col">
                    {/* Feature visual */}
                    <div
                      className={`h-64 relative bg-gradient-to-r ${feature.color}`}
                    >
                      <div className="absolute inset-0 opacity-20">
                        <div
                          className="absolute top-10 right-10 w-40 h-40 rounded-full blur-2xl"
                          style={{
                            backgroundColor: feature.bgDark.replace("bg-", ""),
                          }}
                        ></div>
                        <div
                          className="absolute bottom-10 left-10 w-40 h-40 rounded-full blur-2xl"
                          style={{
                            backgroundColor: feature.bgDark.replace("bg-", ""),
                          }}
                        ></div>
                      </div>
                      <div className="relative z-10 h-full flex items-center justify-center p-8">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                          className="text-white text-center"
                        >
                          <div className="mb-4 inline-flex p-5 rounded-full bg-white/20 backdrop-blur-sm">
                            {React.cloneElement(
                              feature.icon as React.ReactElement,
                              {
                                className: "text-white",
                                size: 48,
                              }
                            )}
                          </div>
                          <h2 className="text-3xl font-bold mb-2">
                            {feature.title}
                          </h2>
                        </motion.div>
                      </div>
                    </div>

                    {/* Feature description */}
                    <div className={`p-8 ${feature.bgLight} flex-grow`}>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {feature.description}
                      </p>

                      <motion.div
                        className="mt-6 flex"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <a
                          href={`#learn-${feature.title.toLowerCase().replace(/\s+/g, "-")}`}
                          className={`px-5 py-2 text-white rounded-lg bg-gradient-to-r ${feature.color} hover:shadow-lg transition-all flex items-center`}
                        >
                          Learn more
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </a>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Static container to maintain height */}
              <div className="opacity-0 pointer-events-none rounded-2xl overflow-hidden">
                <div className="h-64"></div>
                <div className="p-8">
                  <p className="text-lg leading-relaxed">
                    {features[0].description}
                  </p>
                  <div className="mt-6">
                    <a href="#" className="px-5 py-2 rounded-lg">
                      {t("button.learnMore")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
