import React, { useState } from 'react';
import axios from 'axios';
import { marked } from 'marked';
import './Chatbot.css'; // Import the CSS file

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim() === '') return;
    const userMessage = { sender: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await axios.post(
        'https://flowiseai-railway-production-a00a.up.railway.app/api/v1/prediction/40213ceb-cd29-4483-8d98-bf77e70ac95a',
        { question: input },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const botMessage = { sender: 'bot', text: response.data.text };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
    setInput('');
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Text copied to clipboard');
      })
      .catch((error) => {
        console.error('Error copying text:', error);
      });
  };

  return (
    <div className="chat-container">
      <div className="chatbox">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
            <strong>{msg.sender === 'user' ? 'You' : 'Spring Garden Bot'}: </strong>
            <span className="markdown" dangerouslySetInnerHTML={{ __html: marked(msg.text) }} />
            {msg.sender === 'bot' && (
              <button onClick={() => handleCopy(msg.text)} className="copy-button">Copy</button>
            )}
          </div>
        ))}
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="input-box"
        placeholder="Type your message here..."
      />
      <button onClick={handleSend} className="send-button">Send</button>
    </div>
  );
};

export default Chatbot;
