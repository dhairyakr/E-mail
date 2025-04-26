import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Building, Globe, Camera } from 'lucide-react';

export function Profile() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 p-6 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="relative h-32 bg-gradient-to-r from-primary to-primary/80">
            <div className="absolute -bottom-12 left-6">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800"
                />
                <button className="absolute bottom-0 right-0 p-1 bg-gray-100 dark:bg-gray-700 rounded-full shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <Camera className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-16 pb-6 px-6">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">John Doe</h1>
            <p className="text-gray-500 dark:text-gray-400">Senior Software Engineer</p>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Contact Information</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <Mail className="w-5 h-5" />
                  <span>john.doe@example.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <Phone className="w-5 h-5" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <MapPin className="w-5 h-5" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <Building className="w-5 h-5" />
                  <span>TechCorp Inc.</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <Globe className="w-5 h-5" />
                  <span>www.johndoe.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4">
            <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}