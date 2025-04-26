import { useState, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

interface FloatingLabelInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
}

export const FloatingLabelInput = forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ id, label, type = 'text', error, className, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    return (
      <div className="relative">
        <div className="relative">
          <input
            ref={ref}
            id={id}
            type={isPassword && showPassword ? 'text' : type}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`
              peer w-full px-4 py-3 rounded-lg border bg-transparent transition-all
              placeholder-transparent focus:outline-none focus:ring-2
              ${error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : 'border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary/20'
              }
              ${focused ? 'border-primary' : ''}
              ${className}
            `}
            placeholder={label}
            {...props}
          />
          <label
            htmlFor={id}
            className={`
              absolute left-4 transition-all duration-200 cursor-text
              peer-placeholder-shown:text-base peer-placeholder-shown:top-3
              peer-focus:-top-2 peer-focus:text-sm
              ${(focused || props.value) && '-top-2 text-sm'}
              ${error 
                ? 'text-red-500' 
                : focused 
                  ? 'text-primary' 
                  : 'text-gray-500 dark:text-gray-400'
              }
              bg-white dark:bg-gray-900 px-1
            `}
          >
            {label}
          </label>

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          )}
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-red-500 mt-1"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

FloatingLabelInput.displayName = 'FloatingLabelInput';