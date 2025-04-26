import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Paperclip, ChevronDown, Minimize2, Maximize2, Image, File, XCircle } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useMailboxStore } from '../../store/mailboxStore';

interface ComposeEmailProps {
  onClose: () => void;
  initialData?: {
    to: string;
    subject: string;
    body: string;
  };
}

interface Attachment {
  name: string;
  size: number;
  type: string;
}

export function ComposeEmail({ onClose, initialData }: ComposeEmailProps) {
  const [to, setTo] = useState(initialData?.to ?? '');
  const [subject, setSubject] = useState(initialData?.subject ?? '');
  const [body, setBody] = useState(initialData?.body ?? '');
  const [isMinimized, setIsMinimized] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addEmail = useMailboxStore((state) => state.addEmail);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newAttachments = Array.from(files).map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
      }));
      setAttachments([...attachments, ...newAttachments]);
    }
    setShowAttachmentMenu(false);
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleSend = () => {
    if (to && subject && body) {
      addEmail({
        from: 'me@example.com',
        to,
        subject,
        body,
        read: true,
        starred: false,
        folder: 'sent',
      });
      onClose();
    }
  };

  const handleSaveDraft = () => {
    if (to || subject || body) {
      addEmail({
        from: 'me@example.com',
        to,
        subject,
        body,
        read: true,
        starred: false,
        folder: 'drafts',
      });
      onClose();
    }
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1,
        y: 0,
        height: isMinimized ? '64px' : 'auto',
      }}
      exit={{ opacity: 0, y: 20 }}
      className={`fixed bottom-0 right-4 w-[32rem] bg-white dark:bg-gray-800 shadow-xl rounded-t-lg border border-gray-200 dark:border-gray-700 ${
        isMinimized ? 'h-16' : ''
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary/5 to-primary/10">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {isMinimized ? subject || 'New Message' : 'New Message'}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            {isMinimized ? <Maximize2 className="w-5 h-5" /> : <Minimize2 className="w-5 h-5" />}
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="To"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full px-3 py-2 bg-transparent border-b border-gray-200 dark:border-gray-700 focus:outline-none focus:border-primary dark:text-gray-100 dark:placeholder-gray-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-transparent border-b border-gray-200 dark:border-gray-700 focus:outline-none focus:border-primary dark:text-gray-100 dark:placeholder-gray-500"
                />
              </div>

              {attachments.length > 0 && (
                <div className="space-y-2">
                  {attachments.map((attachment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        {attachment.type.startsWith('image/') ? (
                          <Image className="w-4 h-4 text-primary" />
                        ) : (
                          <File className="w-4 h-4 text-primary" />
                        )}
                        <span className="text-sm text-gray-700 dark:text-gray-300">{attachment.name}</span>
                        <span className="text-xs text-gray-500">({formatFileSize(attachment.size)})</span>
                      </div>
                      <button
                        onClick={() => removeAttachment(index)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="h-64">
                <ReactQuill
                  theme="snow"
                  value={body}
                  onChange={setBody}
                  modules={quillModules}
                  formats={quillFormats}
                  className="h-full bg-white dark:bg-gray-800 [&_.ql-toolbar]:border-gray-200 [&_.ql-toolbar]:dark:border-gray-700 [&_.ql-container]:border-gray-200 [&_.ql-container]:dark:border-gray-700 [&_.ql-editor]:text-gray-900 [&_.ql-editor]:dark:text-gray-100"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary/5 to-primary/10">
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={!to || !subject || !body}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSaveDraft}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Save as Draft
              </motion.button>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <Paperclip className="w-5 h-5" />
                </motion.button>
                <AnimatePresence>
                  {showAttachmentMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-full right-0 mb-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2"
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        multiple
                        className="hidden"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                      >
                        Attach files
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <ChevronDown className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}