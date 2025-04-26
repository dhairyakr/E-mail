import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

interface AuthLayoutProps {
  children: React.ReactNode;
  image: string;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, image, title, subtitle }: AuthLayoutProps) {
  const { isDark, toggle } = useTheme();

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Image */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${image})`,
            backgroundBlendMode: 'overlay',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 backdrop-blur-sm" />
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-bold mb-4"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-lg text-white/90"
          >
            {subtitle}
          </motion.p>
        </div>
      </motion.div>

      {/* Right Panel - Form */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex flex-col justify-center items-center p-8 lg:p-12 relative"
      >
        <button
          onClick={toggle}
          className="absolute top-8 right-8 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>

        <div className="w-full max-w-md space-y-8">
          {children}
        </div>
      </motion.div>
    </div>
  );
}