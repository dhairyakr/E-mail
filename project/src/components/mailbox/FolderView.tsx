import { motion } from 'framer-motion';
import { Mail, Star, Trash2 } from 'lucide-react';
import { useMailboxStore } from '../../store/mailboxStore';
import type { Email } from '../../store/mailboxStore';
import { formatEmailDate } from '../../lib/utils';

interface FolderViewProps {
  folder: 'inbox' | 'sent' | 'drafts' | 'trash' | 'spam';
}

export function FolderView({ folder }: FolderViewProps) {
  const emails = useMailboxStore((state) => 
    state.emails.filter((email) => email.folder === folder)
  );
  const toggleStarred = useMailboxStore((state) => state.toggleStarred);
  const moveToFolder = useMailboxStore((state) => state.moveToFolder);
  const setSelectedEmail = useMailboxStore((state) => state.setSelectedEmail);

  const getFolderTitle = (folder: string) => {
    return folder.charAt(0).toUpperCase() + folder.slice(1);
  };

  const getEmptyStateMessage = (folder: string) => {
    switch (folder) {
      case 'inbox':
        return 'Your inbox is empty';
      case 'sent':
        return 'No sent emails';
      case 'drafts':
        return 'No saved drafts';
      case 'trash':
        return 'Trash is empty';
      case 'spam':
        return 'No spam emails';
      default:
        return 'No emails to display';
    }
  };

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
  };

  return (
    <div className="flex-1 overflow-hidden">
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6">{getFolderTitle(folder)}</h1>
        
        {emails.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center p-8 text-gray-500 dark:text-gray-400"
          >
            <Mail className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-lg">{getEmptyStateMessage(folder)}</p>
          </motion.div>
        ) : (
          <div className="space-y-2">
            {emails.map((email) => (
              <motion.div
                key={email.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleEmailClick(email)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`font-medium truncate ${email.read ? 'text-gray-600 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}>
                        {email.from}
                      </p>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formatEmailDate(email.date)}
                      </span>
                    </div>
                    <p className={`truncate mt-1 ${email.read ? 'text-gray-500 dark:text-gray-500' : 'text-gray-800 dark:text-gray-200'}`}>
                      {email.subject}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStarred(email.id);
                      }}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          email.starred
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-400 dark:text-gray-600'
                        }`}
                      />
                    </button>
                    {folder !== 'trash' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          moveToFolder(email.id, 'trash');
                        }}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                      >
                        <Trash2 className="w-5 h-5 text-gray-400 dark:text-gray-600" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}