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
      
      <main className="main-content flex flex-col lg:flex-row gap-8">
        {/* Profile Content comes first on small screens */}
        <section className="profile-section order-1 lg:order-none w-full lg:w-1/2">
          <div className="profile-container">
            <Index />
          </div>
        </section>

        {/* Chat Interface appears below on small, side by side on large */}
        <section className="chat-section order-2 lg:order-none w-full lg:w-1/2">
          <div className="chat-container">
            <ChatBox />
          </div>
        </section>
      </main>
    </div>
  );
}
