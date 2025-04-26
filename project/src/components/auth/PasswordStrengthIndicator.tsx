import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import zxcvbn from 'zxcvbn';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (!password) {
      setStrength(0);
      setFeedback('');
      return;
    }

    const result = zxcvbn(password);
    setStrength(result.score);
    setFeedback(result.feedback.warning || result.feedback.suggestions[0] || '');
  }, [password]);

  const getColor = (score: number) => {
    switch (score) {
      case 0: return 'bg-gray-200 dark:bg-gray-700';
      case 1: return 'bg-red-500';
      case 2: return 'bg-orange-500';
      case 3: return 'bg-yellow-500';
      case 4: return 'bg-green-500';
      default: return 'bg-gray-200 dark:bg-gray-700';
    }
  };

  const segments = [0, 1, 2, 3];

  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {segments.map((segment) => (
          <motion.div
            key={segment}
            className={`h-1 flex-1 rounded-full ${
              segment <= strength ? getColor(strength) : 'bg-gray-200 dark:bg-gray-700'
            }`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.2, delay: segment * 0.1 }}
          />
        ))}
      </div>
      {feedback && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          {feedback}
        </motion.p>
      )}
    </div>
  );
}