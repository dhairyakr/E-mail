import { useHotkeys } from 'react-hotkeys-hook';
import { useMailboxStore } from '../store/mailboxStore';
import { KEYBOARD_SHORTCUTS } from '../lib/utils';

export function useKeyboardShortcuts() {
  const {
    selectedEmail,
    setSelectedEmail,
    moveToFolder,
    toggleStarred,
    toggleImportant,
    markAsRead,
    markAsUnread,
  } = useMailboxStore();

  // Compose new email
  useHotkeys(KEYBOARD_SHORTCUTS.COMPOSE, (e) => {
    e.preventDefault();
    // Trigger compose modal
  });

  // Reply to email
  useHotkeys(KEYBOARD_SHORTCUTS.REPLY, (e) => {
    e.preventDefault();
    if (selectedEmail) {
      // Trigger reply
    }
  });

  // Forward email
  useHotkeys(KEYBOARD_SHORTCUTS.FORWARD, (e) => {
    e.preventDefault();
    if (selectedEmail) {
      // Trigger forward
    }
  });

  // Archive email
  useHotkeys(KEYBOARD_SHORTCUTS.ARCHIVE, (e) => {
    e.preventDefault();
    if (selectedEmail) {
      moveToFolder(selectedEmail.id, 'archive');
    }
  });

  // Delete email
  useHotkeys(KEYBOARD_SHORTCUTS.DELETE, (e) => {
    e.preventDefault();
    if (selectedEmail) {
      moveToFolder(selectedEmail.id, 'trash');
    }
  });

  // Mark as unread
  useHotkeys(KEYBOARD_SHORTCUTS.MARK_UNREAD, (e) => {
    e.preventDefault();
    if (selectedEmail) {
      markAsUnread(selectedEmail.id);
    }
  });

  // Mark as important
  useHotkeys(KEYBOARD_SHORTCUTS.MARK_IMPORTANT, (e) => {
    e.preventDefault();
    if (selectedEmail) {
      toggleImportant(selectedEmail.id);
    }
  });

  // Focus search
  useHotkeys(KEYBOARD_SHORTCUTS.SEARCH, (e) => {
    e.preventDefault();
    document.querySelector<HTMLInputElement>('[data-search-input]')?.focus();
  });

  // Navigation
  useHotkeys(KEYBOARD_SHORTCUTS.NEXT_EMAIL, (e) => {
    e.preventDefault();
    // Navigate to next email
  });

  useHotkeys(KEYBOARD_SHORTCUTS.PREVIOUS_EMAIL, (e) => {
    e.preventDefault();
    // Navigate to previous email
  });

  // Send email
  useHotkeys(KEYBOARD_SHORTCUTS.SEND_EMAIL, (e) => {
    e.preventDefault();
    // Send current draft
  });

  // Save draft
  useHotkeys(KEYBOARD_SHORTCUTS.SAVE_DRAFT, (e) => {
    e.preventDefault();
    // Save current draft
  });
}