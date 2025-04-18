import React from "react";
import { motion } from "framer-motion";
import { CreditCard, Check, Star, Gift, Rocket } from "lucide-react";
import { useTranslation } from "../../../context/TranslationContext";
import { Link } from "react-router-dom";

export const Pricing = () => {
  const { t } = useTranslation();
  return (
    <section id="pricing" className="py-24 bg-white relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute right-0 top-40 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl"></div>
      <div className="absolute left-0 bottom-40 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>

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
            <Gift className="text-yellow-500 mr-2" size={16} />
            <span className="text-sm text-gray-700 font-medium">
              {t("pricing.badge")}
            </span>
          </motion.div>

          <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {t("pricing.title")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
              {t("pricing.titleColored")}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("pricing.subtitle")}
          </p>
        </motion.div>

        {/* Free Plan */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative">
            {/* Special tag */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-sm font-medium px-6 py-1.5 rounded-full shadow-lg">
                {t("pricing.free.tag")}
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border-2 border-yellow-500 shadow-xl relative bg-white">
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl -translate-x-1/4 -translate-y-1/4"></div>

              <div className="p-8 md:p-12 relative">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">
                      {t("pricing.free.title")}
                    </h3>
                    <p className="text-gray-600 mt-2">
                      {t("pricing.free.description")}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex rounded-lg bg-yellow-50 p-1.5">
                      <Star className="text-yellow-500" size={24} />
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-end">
                    <span className="text-5xl font-bold text-gray-900">$0</span>
                    <span className="text-xl text-gray-500 ml-2 mb-1">
                      {t("pricing.free.duration")}
                    </span>
                  </div>
                  <p className="text-green-600 font-medium mt-2 flex items-center">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    {t("pricing.free.noCreditCard")}
                  </p>
                </div>

                <div className="mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[...t("pricing.free.features")].map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="p-0.5 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 mr-3 mt-1.5">
                          <Check size={12} className="text-white" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to="/register"
                  className="block w-full py-4 text-center rounded-lg font-medium transition-all bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg hover:shadow-xl hover:from-yellow-600 hover:to-yellow-700"
                >
                  {t("pricing.free.cta")}
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Early Adopter Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 md:p-12 border border-gray-200 shadow-lg"
        >
          <div className="md:flex items-center justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center mb-4">
                <Rocket className="text-yellow-500 mr-3" size={24} />
                <h3 className="text-2xl font-bold text-gray-900">
                  {t("pricing.adopter.title")}
                </h3>
              </div>
              <p className="text-gray-700 max-w-xl">
                {t("pricing.adopter.description")}
              </p>
            </div>
            <div className="md:ml-8">
              <Link
                to="/register"
                className="inline-block px-8 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg hover:from-gray-900 hover:to-black transition-all shadow-lg font-medium"
              >
                {t("pricing.adopter.cta")}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
