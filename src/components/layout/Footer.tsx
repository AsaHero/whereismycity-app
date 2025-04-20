import React from "react";
import { motion } from "framer-motion";
import { Globe2, Twitter, Linkedin, Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const footerLinksVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-black text-gray-400 pt-20 relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-yellow-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-gray-800">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400 rounded-full blur-md opacity-30"></div>
                <Globe2 className="text-yellow-500 relative z-10" size={32} />
              </div>
              <span className="text-2xl font-bold text-white">
                WhereIsMyCity
              </span>
            </div>

            <p className="mb-8 text-lg text-gray-400 max-w-md">
              The most comprehensive city search API with multilingual support,
              helping businesses connect with customers in any language,
              anywhere in the world.
            </p>

            <div className="flex items-center space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-500 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:asadbahtiyarov2002@gmail.com"
                className="text-gray-400 hover:text-yellow-500 transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={footerLinksVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-6">Product</h4>
            <ul className="space-y-4">
              <motion.li key={"demo"} variants={itemVariants}>
                <Link
                  to="/home#demo"
                  className="hover:text-yellow-500 transition-colors inline-block relative group"
                >
                  {"Demo"}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.li>
              <motion.li key={"pricing"} variants={itemVariants}>
                <Link
                  to="/pricing"
                  className="hover:text-yellow-500 transition-colors inline-block relative group"
                >
                  {"Pricing"}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          <motion.div
            variants={footerLinksVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-6">
              Developers
            </h4>
            <ul className="space-y-4">
              <motion.li key={"docs"} variants={itemVariants}>
                <Link
                  to="/docs"
                  className="hover:text-yellow-500 transition-colors inline-block relative group"
                >
                  {"Documentation"}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          <motion.div
            variants={footerLinksVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-6">Company</h4>
            <ul className="space-y-4">
              <motion.li key={"about"} variants={itemVariants}>
                <Link
                  to="/home"
                  className="hover:text-yellow-500 transition-colors inline-block relative group"
                >
                  {"About"}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.li>
              <motion.li key={"contacts"} variants={itemVariants}>
                <Link
                  to="/contacts"
                  className="hover:text-yellow-500 transition-colors inline-block relative group"
                >
                  {"Contacts"}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        <div className="py-8 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2025 WhereIsMyCity. All rights reserved.</p>

          <div className="flex space-x-8 mt-6 md:mt-0">
            <a
              href="#"
              className="hover:text-yellow-500 transition-colors relative inline-block group"
            >
              Privacy
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#"
              className="hover:text-yellow-500 transition-colors relative inline-block group"
            >
              Terms
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#"
              className="hover:text-yellow-500 transition-colors relative inline-block group"
            >
              Cookies
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom decorative wave */}
      <div className="h-2 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600"></div>
    </footer>
  );
};
