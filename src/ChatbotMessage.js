import React from 'react';

function ChatbotMessage({ message }) {
  return (
    <div className={`message ${message.sender}`}>
      {message.text}
    </div>
  );
}

export default ChatbotMessage;
