import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter } from 'lucide-react';
import { AuthLayout } from './AuthLayout';
import { FloatingLabelInput } from './FloatingLabelInput';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';
import { SocialButton } from './SocialButton';

export function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!acceptTerms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add your registration logic here
      console.log('Register:', formData);
      
    } catch (err) {
      setErrors({
        submit: 'An error occurred during registration',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      image="https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?q=80&w=2839&auto=format&fit=crop"
      title="Create an account"
      subtitle="Join us today and get started"
    >
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Sign up for free
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <a href="/login" className="text-primary hover:text-primary/90 font-medium">
              Sign in
            </a>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FloatingLabelInput
            id="username"
            label="Username"
            value={formData.username}
            onChange={(value) => setFormData({ ...formData, username: value })}
            error={errors.username}
          />

          <FloatingLabelInput
            id="email"
            type="email"
            label="Email address"
            value={formData.email}
            onChange={(value) => setFormData({ ...formData, email: value })}
            error={errors.email}
          />

          <div className="space-y-2">
            <FloatingLabelInput
              id="password"
              type="password"
              label="Password"
              value={formData.password}
              onChange={(value) => setFormData({ ...formData, password: value })}
              error={errors.password}
            />
            <PasswordStrengthIndicator password={formData.password} />
          </div>

          <FloatingLabelInput
            id="confirmPassword"
            type="password"
            label="Confirm password"
            value={formData.confirmPassword}
            onChange={(value) => setFormData({ ...formData, confirmPassword: value })}
            error={errors.confirmPassword}
          />

          <div className="space-y-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                I agree to the{' '}
                <a href="/terms" className="text-primary hover:text-primary/90">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-primary hover:text-primary/90">
                  Privacy Policy
                </a>
              </span>
            </label>
            {errors.terms && (
              <p className="text-sm text-red-500">{errors.terms}</p>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`
              w-full px-4 py-3 text-white bg-primary rounded-lg
              hover:bg-primary/90 transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </motion.button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SocialButton
            icon={Github}
            label="GitHub"
            onClick={() => console.log('GitHub signup')}
          />
          <SocialButton
            icon={Twitter}
            label="Twitter"
            onClick={() => console.log('Twitter signup')}
          />
        </div>
      </div>
    </AuthLayout>
  );
}