import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between w-full mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div className="relative">
            <motion.div
              initial={false}
              animate={{
                backgroundColor: index <= currentStep ? 'var(--primary)' : 'transparent',
                borderColor: index <= currentStep ? 'var(--primary)' : 'var(--border)',
              }}
              className={`
                w-8 h-8 rounded-full border-2 flex items-center justify-center
                ${index <= currentStep ? 'bg-primary border-primary' : 'border-gray-300 dark:border-gray-600'}
              `}
            >
              {index < currentStep ? (
                <Check className="w-4 h-4 text-white" />
              ) : (
                <span className={index === currentStep ? 'text-white' : 'text-gray-500 dark:text-gray-400'}>
                  {index + 1}
                </span>
              )}
            </motion.div>
            {index < steps.length - 1 && (
              <div className="absolute top-1/2 left-full w-full h-[2px] -translate-y-1/2">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ 
                    scaleX: index < currentStep ? 1 : 0,
                    backgroundColor: index < currentStep ? 'var(--primary)' : 'var(--border)',
                  }}
                  className="w-full h-full origin-left"
                />
              </div>
            )}
          </div>
          <span className="hidden sm:block ml-12 text-sm text-gray-500 dark:text-gray-400">
            {step}
          </span>
        </div>
      ))}
    </div>
  );
}