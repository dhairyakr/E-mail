import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Twitter, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { AuthLayout } from './AuthLayout';
import { FloatingLabelInput } from './FloatingLabelInput';
import { SocialButton } from './SocialButton';
import { loginSchema, type LoginFormData } from '../../lib/validations/auth';

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add your authentication logic here
      console.log('Login:', data);
      
      toast.success('Successfully logged in!');
    } catch (err) {
      setError('root', { 
        message: 'Invalid email or password' 
      });
      toast.error('Failed to log in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      image="https://images.unsplash.com/photo-1554147090-e1221a04a025?q=80&w=2848&auto=format&fit=crop"
      title="Welcome back!"
      subtitle="Log in to your account to continue"
    >
      <div className="space-y-6">
        <div className="text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-gray-900 dark:text-gray-100"
          >
            Sign in to your account
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-sm text-gray-600 dark:text-gray-400"
          >
            Or{' '}
            <a href="/signup" className="text-primary hover:text-primary/90 font-medium">
              create a new account
            </a>
          </motion.p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FloatingLabelInput
            id="email"
            type="email"
            label="Email address"
            error={errors.email?.message}
            {...register('email')}
          />

          <FloatingLabelInput
            id="password"
            type="password"
            label="Password"
            error={errors.password?.message}
            {...register('password')}
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('rememberMe')}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Remember me
              </span>
            </label>

            <a
              href="/forgot-password"
              className="text-sm text-primary hover:text-primary/90"
            >
              Forgot password?
            </a>
          </div>

          {errors.root && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-500 text-center"
            >
              {errors.root.message}
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`
              w-full px-4 py-3 text-white bg-primary rounded-lg
              hover:bg-primary/90 transition-colors flex items-center justify-center gap-2
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
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
            onClick={() => {
              toast.info('GitHub authentication coming soon!');
            }}
          />
          <SocialButton
            icon={Twitter}
            label="Twitter"
            onClick={() => {
              toast.info('Twitter authentication coming soon!');
            }}
          />
        </div>
      </div>
    </AuthLayout>
  );
}