// src/components/ChatGPTChat.tsx
import React, { useState } from 'react';
import './AIChat.css';

interface Message {
  sender: 'user' | 'chatgpt';
  text: string;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userMessage, setUserMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return; 

    setMessages([...messages, { sender: 'user', text: userMessage }]);
    setUserMessage('');
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/analyze-financials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: { message: userMessage }, 
        }),
      });


      if (!response.ok) {
        throw new Error('Error with backend request');
      }


      const data = await response.json();


      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'chatgpt', text: data.analysis },
      ]);
    } catch (error) {
      console.error('Error communicating with the backend:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'chatgpt', text: 'Sorry, there was an error processing your request.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === 'user' ? 'user-message' : 'chatgpt-message'}>
            <p>{msg.text}</p>
          </div>
        ))}
        {loading && <div className="loading">ChatGPT is analyzing your data...</div>}
      </div>

      <div className="input-container">
        <textarea
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          rows={4}
          placeholder="Enter your financial data or query here"
        />
        <button onClick={handleSendMessage} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChat;