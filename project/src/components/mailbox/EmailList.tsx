import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, StarOff, Search, X } from 'lucide-react';
import { useMailboxStore } from '../../store/mailboxStore';
import { formatEmailDate } from '../../lib/utils';
import type { Email } from '../../store/mailboxStore';

interface EmailListProps {
  emails: Email[];
}

export function EmailList({ emails }: EmailListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const setSelectedEmail = useMailboxStore((state) => state.setSelectedEmail);
  const toggleStarred = useMailboxStore((state) => state.toggleStarred);
  const markAsRead = useMailboxStore((state) => state.markAsRead);

  const filteredEmails = emails.filter(email => {
    const searchLower = searchQuery.toLowerCase();
    return (
      email.subject.toLowerCase().includes(searchLower) ||
      email.from.toLowerCase().includes(searchLower) ||
      email.to.toLowerCase().includes(searchLower) ||
      email.body.toLowerCase().includes(searchLower)
    );
  });

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
    if (!email.read) {
      markAsRead(email.id);
    }
  };

  return (
    <div className="w-96 border-r border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 sticky top-0 z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search emails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-8 py-2 bg-gray-100 dark:bg-gray-700/50 rounded-lg border-0 focus:ring-2 focus:ring-primary placeholder-gray-500 dark:placeholder-gray-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="overflow-y-auto flex-1">
        <AnimatePresence>
          {filteredEmails.map((email) => (
            <motion.div
              key={email.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="border-b border-gray-200 dark:border-gray-700 cursor-pointer group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div
                onClick={() => handleEmailClick(email)}
                className="p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${email.read ? 'text-gray-600 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}>
                      {email.from}
                    </p>
                    <p className={`text-sm truncate mt-1 ${email.read ? 'text-gray-500 dark:text-gray-500' : 'text-gray-800 dark:text-gray-200'}`}>
                      {email.subject}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {formatEmailDate(email.date)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStarred(email.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                  >
                    {email.starred ? (
                      <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                    ) : (
                      <StarOff className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:text-gray-600 dark:hover:text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}