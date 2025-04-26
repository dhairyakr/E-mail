import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface SocialButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

export function SocialButton({ icon: Icon, label, onClick }: SocialButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
    >
      <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      <span className="text-gray-700 dark:text-gray-300">{label}</span>
    </motion.button>
  );
}