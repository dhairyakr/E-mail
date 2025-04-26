import { useEffect } from 'react';
import { useMailboxStore } from './store/mailboxStore';
import { LoginPage } from './components/auth/LoginPage';

function App() {
  const darkMode = useMailboxStore((state) => state.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <LoginPage />
    </div>
  );
}

export default App;