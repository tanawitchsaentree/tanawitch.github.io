import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import Index from "./pages/index";
import ChatBox from "./components/ChatBox";
import './index.css';

function DarkModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="dark-mode-toggle"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}

export default function App() {
  return (
    <div className="app">
      <DarkModeToggle />
      
      <main className="main-content">
        {/* Left Column - Chat Interface */}
        <section className="chat-section">
          <div className="chat-container">
            <ChatBox />
          </div>
        </section>
        
        {/* Right Column - Profile Content */}
        <section className="profile-section">
          <div className="profile-container">
            <Index />
          </div>
        </section>
      </main>
    </div>
  );
}
