import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant: 'primary' | 'secondary' | 'dark';
  highlighted?: boolean;
}

export const PricingCard = ({
  title,
  price,
  description,
  features,
  buttonText,
  buttonVariant,
  highlighted = false,
}: PricingCardProps) => {
  const buttonStyles = {
    primary: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    dark: 'bg-gray-800 hover:bg-gray-900 text-white',
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={`p-6 rounded-xl ${
        highlighted
          ? 'border-2 border-yellow-500 shadow-xl'
          : 'border border-gray-200 shadow-lg'
      } bg-white relative`}
    >
      {highlighted && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <span className="bg-yellow-500 text-white text-xs px-3 py-1 rounded-full uppercase font-semibold tracking-wide">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <div className="mt-4">
          <span className="text-4xl font-bold text-gray-900">{price}</span>
          <span className="text-gray-500">/month</span>
        </div>
        <p className="mt-2 text-gray-600">{description}</p>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-600">
            <Check className="text-green-500 mr-2" size={20} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
          buttonStyles[buttonVariant]
        }`}
      >
        {buttonText}
      </button>
    </motion.div>
  );
};