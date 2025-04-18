import { motion } from "framer-motion";
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface UseCaseCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const UseCaseCard = ({ icon, title, description }: UseCaseCardProps) => {
  return (
    <motion.div
      whileHover={{
        y: -5,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      transition={{ duration: 0.3 }}
      className="flex flex-col p-8 bg-white rounded-xl shadow-md border border-gray-100 hover:border-yellow-500 transition-all relative overflow-hidden h-full group"
    >
      {/* Subtle background patterns */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-bl-full transform translate-x-16 -translate-y-16 group-hover:translate-x-10 group-hover:-translate-y-10 transition-transform duration-500"></div>

      <div className="relative z-10">
        <div className="p-3 bg-yellow-50 rounded-xl inline-block mb-5 text-yellow-500">
          {icon}
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>

        <p className="text-gray-600 leading-relaxed">{description}</p>

        <div className="mt-auto pt-6 flex items-center">
          <div className="w-8 h-0.5 bg-yellow-500/30 group-hover:w-12 transition-all duration-300 mr-3"></div>
          <span className="text-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
            Learn more <ArrowRight size={14} className="ml-1" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};
