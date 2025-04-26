import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  StarOff,
  Trash2,
  Reply,
  Forward,
  MoreVertical,
  Download,
  Archive,
  Flag,
  Tag,
  AlertCircle,
  Share2,
  Printer,
  Copy,
  CornerUpRight,
} from 'lucide-react';
import { useMailboxStore } from '../../store/mailboxStore';
import { formatEmailDate, formatFileSize } from '../../lib/utils';
import { ComposeEmail } from './ComposeEmail';
import type { Email } from '../../store/mailboxStore';

interface EmailViewProps {
  email: Email;
}

interface ComposeState {
  isOpen: boolean;
  type: 'reply' | 'forward' | null;
  prefillData: {
    to: string;
    subject: string;
    body: string;
  } | null;
}

export function EmailView({ email }: EmailViewProps) {
  const [composeState, setComposeState] = useState<ComposeState>({
    isOpen: false,
    type: null,
    prefillData: null,
  });
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showLabelMenu, setShowLabelMenu] = useState(false);
  const toggleStarred = useMailboxStore((state) => state.toggleStarred);
  const toggleImportant = useMailboxStore((state) => state.toggleImportant);
  const moveToFolder = useMailboxStore((state) => state.moveToFolder);
  const addLabel = useMailboxStore((state) => state.addLabel);
  const removeLabel = useMailboxStore((state) => state.removeLabel);
  const labels = useMailboxStore((state) => state.labels);

  const handleReply = () => {
    const replyPrefix = `Re: ${email.subject.startsWith('Re: ') ? email.subject.slice(4) : email.subject}`;
    const replyBody = `
      <br/><br/>
      <p>On ${formatEmailDate(email.date)}, ${email.from} wrote:</p>
      <blockquote style="border-left: 2px solid #e5e7eb; padding-left: 1rem; margin: 1rem 0; color: #6b7280;">
        ${email.body}
      </blockquote>
    `;

    setComposeState({
      isOpen: true,
      type: 'reply',
      prefillData: {
        to: email.from,
        subject: replyPrefix,
        body: replyBody,
      },
    });
  };

  const handleForward = () => {
    const forwardPrefix = `Fwd: ${email.subject.startsWith('Fwd: ') ? email.subject.slice(5) : email.subject}`;
    const forwardBody = `
      <br/><br/>
      <p>---------- Forwarded message ----------</p>
      <p>From: ${email.from}</p>
      <p>Date: ${formatEmailDate(email.date)}</p>
      <p>Subject: ${email.subject}</p>
      <p>To: ${email.to}</p>
      <br/>
      ${email.body}
    `;

    setComposeState({
      isOpen: true,
      type: 'forward',
      prefillData: {
        to: '',
        subject: forwardPrefix,
        body: forwardBody,
      },
    });
  };

  const handlePrint = () => {
    window.print();
    setShowMoreMenu(false);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email.body);
    setShowMoreMenu(false);
  };

  const toggleLabel = (label: string) => {
    if (email.labels?.includes(label)) {
      removeLabel(email.id, label);
    } else {
      addLabel(email.id, label);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex-1 overflow-y-auto bg-white dark:bg-gray-800"
    >
      <div className="p-6">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {email.subject}
            </h1>
            {email.labels && email.labels.length > 0 && (
              <div className="flex gap-2">
                {email.labels.map((label) => (
                  <span
                    key={label}
                    className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleStarred(email.id)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              {email.starred ? (
                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
              ) : (
                <StarOff className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:text-gray-600 dark:hover:text-gray-400" />
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleImportant(email.id)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <Flag className={`w-5 h-5 ${email.important ? 'text-red-500' : 'text-gray-400 dark:text-gray-600'}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => moveToFolder(email.id, 'trash')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <Trash2 className="w-5 h-5" />
            </motion.button>
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <MoreVertical className="w-5 h-5" />
              </motion.button>
              <AnimatePresence>
                {showMoreMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
                  >
                    <button
                      onClick={() => {
                        setShowLabelMenu(true);
                        setShowMoreMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 flex items-center gap-2"
                    >
                      <Tag className="w-4 h-4" />
                      Add Label
                    </button>
                    <button
                      onClick={() => {
                        moveToFolder(email.id, 'archive');
                        setShowMoreMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 flex items-center gap-2"
                    >
                      <Archive className="w-4 h-4" />
                      Archive
                    </button>
                    <button
                      onClick={() => {
                        toggleImportant(email.id);
                        setShowMoreMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4" />
                      Mark as Important
                    </button>
                    <button
                      onClick={handlePrint}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 flex items-center gap-2"
                    >
                      <Printer className="w-4 h-4" />
                      Print
                    </button>
                    <button
                      onClick={handleCopyEmail}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy to Clipboard
                    </button>
                    <button
                      onClick={() => {
                        window.location.href = `mailto:?subject=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body)}`;
                        setShowMoreMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 flex items-center gap-2"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {showLabelMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
                  >
                    <div className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                      Select Labels
                    </div>
                    {labels.map((label) => (
                      <button
                        key={label}
                        onClick={() => toggleLabel(label)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 flex items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          checked={email.labels?.includes(label)}
                          onChange={() => {}}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        {label}
                      </button>
                    ))}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                      <button
                        onClick={() => setShowLabelMenu(false)}
                        className="w-full px-4 py-2 text-left text-sm text-primary hover:bg-gray-100 dark:hover:bg-gray-700/50"
                      >
                        Done
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={`https://ui-avatars.com/api/?name=${email.from.split('@')[0]}&background=random`}
                alt="Sender"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {email.from}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  To: {email.to}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatEmailDate(email.date)}
            </p>
          </div>
        </div>

        <div className="py-6">
          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: email.body }}
          />
        </div>

        {email.attachments && email.attachments.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
              Attachments ({email.attachments.length})
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {email.attachments.map((attachment, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {attachment.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatFileSize(attachment.size)}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open(attachment.url, '_blank')}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <Download className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </motion.button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700 mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReply}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            <Reply className="w-4 h-4" />
            Reply
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleForward}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <Forward className="w-4 h-4" />
            Forward
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setComposeState({
                isOpen: true,
                type: 'reply',
                prefillData: {
                  to: email.to,
                  subject: `Re: ${email.subject}`,
                  body: '',
                },
              });
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <CornerUpRight className="w-4 h-4" />
            Reply All
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {composeState.isOpen && composeState.prefillData && (
          <ComposeEmail
            onClose={() => setComposeState({ isOpen: false, type: null, prefillData: null })}
            initialData={composeState.prefillData}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}