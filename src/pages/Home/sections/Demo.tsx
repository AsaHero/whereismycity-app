import React from "react";
import { motion } from "framer-motion";
import { SearchDemo } from "../../../components/home/SearchDemo";
import { Globe2 } from "lucide-react";
import { useTranslation } from "../../../context/TranslationContext";

export const Demo = () => {
  const { t } = useTranslation();

  return (
    <section
      id="demo"
      className="py-24 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden"
    >
      {/* Abstract background elements */}
      <div className="absolute left-0 top-0 w-full h-24 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute -right-24 top-1/3 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -left-32 bottom-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>

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
            <Globe2 className="text-yellow-500 mr-2" size={16} />
            <span className="text-sm text-gray-700 font-medium">
              {t("demo.badge")}
            </span>
          </motion.div>

          <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {t("demo.title")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
            {t("demo.titleColored")}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("demo.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        >
          <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100 backdrop-blur-sm">
            <SearchDemo />
          </div>
        </motion.div>

        {/* Bottom decorative element */}
        <div className="mt-20 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="inline-block"
          >
            <span className="text-sm text-gray-500 font-medium flex items-center justify-center">
              <span className="w-12 h-px bg-gray-300 mr-4"></span>
                {t("demo.bottomText")}
              <span className="w-12 h-px bg-gray-300 ml-4"></span>
            </span>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave effect */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};
