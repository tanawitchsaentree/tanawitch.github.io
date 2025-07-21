import { useState, useEffect, useRef } from 'react';
import profileData from '../../profile_data.json';
import '../index.css';

interface Message {
  from: 'user' | 'bot';
  text: string;
  displayingText?: string;
}

function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const outputRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Helper function to display messages with typing effect
  const displayMessage = async (text: string, from: 'user' | 'bot' = 'bot') => {
    return new Promise<void>((resolve) => {
      const newMsg: Message = { from, text, displayingText: '' };
      setMessages(prev => [...prev, newMsg]);
      
      let charIndex = 0;
      const typingInterval = setInterval(() => {
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last?.from === from && last.text === text) {
            return prev.map((msg, i) => 
              i === prev.length - 1
                ? { ...msg, displayingText: text.slice(0, charIndex + 1) }
                : msg
            );
          }
          return prev;
        });
        
        charIndex++;
        if (charIndex >= text.length) {
          clearInterval(typingInterval);
          resolve();
        }
      }, 30);
    });
  };

  // Get a random response based on user input
  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase().trim();
    
    // Check for matching intents
    for (const [intentName, intent] of Object.entries(profileData.intents)) {
      if (intent.keywords.some(keyword => input.includes(keyword.toLowerCase()))) {
        const responses = intent.response;
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
    
    // Fallback to a random fact
    const randomFact = profileData.fact_snippets[
      Math.floor(Math.random() * profileData.fact_snippets.length)
    ];
    return randomFact.text;
  };

  // Initial welcome message
  useEffect(() => {
    const startConversation = async () => {
      // Get a random conversation starter
      const starter = profileData.conversation_starters[
        Math.floor(Math.random() * profileData.conversation_starters.length)
      ];
      
      // Display welcome messages
      await displayMessage(profileData.bot.lumo_intro);
      await new Promise(resolve => setTimeout(resolve, 500)); // Small delay
      await displayMessage(starter.greeting);
      await new Promise(resolve => setTimeout(resolve, 300));
      await displayMessage(starter.follow_up);
      
      setIsTyping(false);
    };

    startConversation();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    // Add user message
    const userMsg: Message = { from: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Simulate thinking time
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get bot response from local data
      const botResponse = getBotResponse(input);
      await displayMessage(botResponse);
      
    } catch (err) {
      console.error("Error:", err);
      const fallback = "Hmm, I'm having trouble thinking right now. Could you try again?";
      await displayMessage(fallback);
    } finally {
      setIsTyping(false);
    }
  };

  // Auto scroll and focus
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="chatbox-container">
      <div ref={outputRef} className="chatbox-output">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`chatbox-message ${msg.from === 'user' ? 'chatbox-message-user' : 'chatbox-message-bot'}`}
          >
            {msg.from === 'bot' && (
              <div className="chatbox-avatar">
                <img 
                  src="/lumo_favicon.svg" 
                  alt="Lumo Avatar" 
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
            )}
            <div className="chatbox-message-content">
              {msg.displayingText || msg.text}
              {msg.from === 'bot' && msg.displayingText && msg.displayingText.length < msg.text.length && (
                <span className="animate-pulse">_</span>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="chatbox-typing-indicator">
            <span className="animate-pulse">...</span>
          </div>
        )}
      </div>

      <div className="chatbox-input-container">
        <form onSubmit={handleFormSubmit} className="chatbox-input-wrapper">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            disabled={isTyping}
            className="chatbox-input"
            placeholder="Ask me about Nate's skills, experience, or projects..."
          />
        </form>
      </div>
    </div>
  );
}

export default ChatBox;
