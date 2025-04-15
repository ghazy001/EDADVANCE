import { useState, useEffect, useRef } from "react";
import "./Chatbot.scss"; // Adjust the path if necessary

const Chatbot = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: "chatbot", text: "Hello! How can I assist you with this course today?" },
  ]);
  const [userMessage, setUserMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleUserMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!userMessage.trim()) return;

    // Prepare the user's message
    const newUserMessage = { sender: "user", text: userMessage };

    // Clear input immediately
    setUserMessage("");

    // Add user message and fetch bot response in sequence
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    try {
      const response = await fetch("http://localhost:3000/chatbot/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const botReply = { sender: "chatbot", text: data.reply || "I got your message!" };

      // Append bot response after user message
      setMessages((prevMessages) => [...prevMessages, botReply]);
    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage = {
        sender: "chatbot",
        text: "Oops! I couldn’t connect to the server. Try again later.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot">
        <div className="chatbot__messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <p>{msg.text}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="chatbot__input">
          <form onSubmit={handleUserMessage}>
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Ask me anything about this course..."
              autoFocus
            />
            <button type="submit" className="chatbot__send-btn">
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;