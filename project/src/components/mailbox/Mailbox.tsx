import { useState } from 'react';
import { useMailboxStore } from '../../store/mailboxStore';
import { Sidebar } from './Sidebar';
import { EmailList } from './EmailList';
import { EmailView } from './EmailView';
import { ComposeEmail } from './ComposeEmail';
import { FolderView } from './FolderView';
import { Profile } from './Profile';

export function Mailbox() {
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const selectedEmail = useMailboxStore((state) => state.selectedEmail);
  const selectedFolder = useMailboxStore((state) => state.selectedFolder);
  const emails = useMailboxStore((state) => 
    state.emails.filter((email) => email.folder === selectedFolder)
  );

  const renderContent = () => {
    if (selectedFolder === 'profile') {
      return <Profile />;
    }

    if (selectedEmail) {
      return <EmailView email={selectedEmail} />;
    }

    return (
      <div className="flex flex-1 overflow-hidden">
        <EmailList emails={emails} />
        <FolderView folder={selectedFolder as 'inbox' | 'sent' | 'drafts' | 'trash' | 'spam'} />
      </div>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar onCompose={() => setIsComposeOpen(true)} />
      {renderContent()}
      {isComposeOpen && <ComposeEmail onClose={() => setIsComposeOpen(false)} />}
    </div>
  );
}