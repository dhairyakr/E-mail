import { Mail, Send, Archive, Trash2, AlertOctagon, Plus, Moon, Sun, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMailboxStore } from '../../store/mailboxStore';
import { cn } from '../../lib/utils';

interface SidebarProps {
  onCompose: () => void;
}

export function Sidebar({ onCompose }: SidebarProps) {
  const selectedFolder = useMailboxStore((state) => state.selectedFolder);
  const setSelectedFolder = useMailboxStore((state) => state.setSelectedFolder);
  const darkMode = useMailboxStore((state) => state.darkMode);
  const toggleDarkMode = useMailboxStore((state) => state.toggleDarkMode);
  const emails = useMailboxStore((state) => state.emails);

  const getFolderCount = (folder: string) => {
    return emails.filter(email => email.folder === folder && !email.read).length;
  };

  const folders = [
    { id: 'inbox', label: 'Inbox', icon: Mail },
    { id: 'sent', label: 'Sent', icon: Send },
    { id: 'drafts', label: 'Drafts', icon: Archive },
    { id: 'trash', label: 'Trash', icon: Trash2 },
    { id: 'spam', label: 'Spam', icon: AlertOctagon },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 flex flex-col h-full">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onCompose}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg mb-6 flex items-center justify-center gap-2 shadow-sm"
      >
        <Plus size={20} />
        <span>Compose</span>
      </motion.button>

      <nav className="space-y-1 flex-1">
        {folders.map((folder) => {
          const Icon = folder.icon;
          const unreadCount = getFolderCount(folder.id);
          return (
            <motion.button
              key={folder.id}
              whileHover={{ x: 4 }}
              onClick={() => setSelectedFolder(folder.id)}
              className={cn(
                'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                selectedFolder === folder.id
                  ? 'bg-primary/10 text-primary dark:bg-primary/20'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
              )}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} />
                <span>{folder.label}</span>
              </div>
              {unreadCount > 0 && (
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
                  {unreadCount}
                </span>
              )}
            </motion.button>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        <button 
          onClick={() => setSelectedFolder('profile')}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
            selectedFolder === 'profile'
              ? 'bg-primary/10 text-primary dark:bg-primary/20'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
          )}
        >
          <User size={18} />
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
}