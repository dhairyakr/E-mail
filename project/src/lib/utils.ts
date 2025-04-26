import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow, isToday, isYesterday, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatEmailDate(date: Date | string): string {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  
  if (isToday(parsedDate)) {
    return format(parsedDate, 'h:mm a');
  }
  if (isYesterday(parsedDate)) {
    return 'Yesterday';
  }
  if (new Date().getFullYear() === parsedDate.getFullYear()) {
    return format(parsedDate, 'MMM d');
  }
  return format(parsedDate, 'MMM d, yyyy');
}

export function formatDetailedDate(date: Date | string): string {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, 'EEEE, MMMM d, yyyy h:mm a');
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function generateAvatarColor(email: string): string {
  const colors = [
    'bg-red-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500',
  ];
  
  const hash = email.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  return colors[Math.abs(hash) % colors.length];
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function generateMessageId(): string {
  return 'msg_' + Math.random().toString(36).substr(2, 9);
}

export function extractEmailDomain(email: string): string {
  return email.split('@')[1] || '';
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const KEYBOARD_SHORTCUTS = {
  COMPOSE: 'c',
  REPLY: 'r',
  FORWARD: 'f',
  ARCHIVE: 'e',
  DELETE: 'backspace',
  MARK_UNREAD: 'u',
  MARK_IMPORTANT: 'i',
  SEARCH: '/',
  NEXT_EMAIL: 'j',
  PREVIOUS_EMAIL: 'k',
  SEND_EMAIL: 'mod+enter',
  SAVE_DRAFT: 'mod+s',
} as const;

export const EMAIL_FOLDERS = {
  INBOX: 'inbox',
  SENT: 'sent',
  DRAFTS: 'drafts',
  TRASH: 'trash',
  SPAM: 'spam',
  ARCHIVE: 'archive',
} as const;

export const FILE_ICONS = {
  pdf: '📄',
  doc: '📝',
  docx: '📝',
  xls: '📊',
  xlsx: '📊',
  ppt: '📽️',
  pptx: '📽️',
  jpg: '🖼️',
  jpeg: '🖼️',
  png: '🖼️',
  gif: '🖼️',
  zip: '📦',
  rar: '📦',
  txt: '📝',
  default: '📎',
} as const;

export function getFileIcon(filename: string): string {
  const extension = filename.split('.').pop()?.toLowerCase();
  return FILE_ICONS[extension as keyof typeof FILE_ICONS] || FILE_ICONS.default;
}

export const PRIORITY_LEVELS = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
} as const;

export function getPriorityColor(priority: keyof typeof PRIORITY_LEVELS): string {
  const colors = {
    [PRIORITY_LEVELS.HIGH]: 'text-red-500',
    [PRIORITY_LEVELS.MEDIUM]: 'text-yellow-500',
    [PRIORITY_LEVELS.LOW]: 'text-green-500',
  };
  return colors[priority];
}