import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <motion.div
      whileHover={{
        y: -5,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      transition={{ duration: 0.3 }}
      className="p-8 bg-white rounded-xl shadow-md border border-gray-100 hover:border-yellow-500 transition-all relative overflow-hidden group"
    >
      {/* Subtle background gradient that appears on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Accent corner */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-5 group-hover:-translate-y-5 transition-transform duration-500"></div>

      <div className="relative z-10">
        <div className="p-3 bg-yellow-50 rounded-xl inline-block mb-5 text-yellow-500">
          {icon}
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>

        <p className="text-gray-600 leading-relaxed">{description}</p>

        <div className="mt-6 w-12 h-1 bg-yellow-500/30 group-hover:w-20 transition-all duration-300"></div>
      </div>
    </motion.div>
  );
};
