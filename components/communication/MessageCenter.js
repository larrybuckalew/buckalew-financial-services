import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

export default function MessageCenter() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = async () => {
    try {
      const response = await fetch('/api/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newMessage })
      });

      if (response.ok) {
        const message = await response.json();
        setMessages([...messages, message]);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Message Center</h2>
      
      <div className="h-96 overflow-y-auto mb-4 border rounded p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 p-3 rounded ${message.fromClient ? 'bg-blue-100 ml-8' : 'bg-gray-100 mr-8'}`}
          >
            <div className="flex justify-between mb-1">
              <span className="font-semibold">{message.from}</span>
              <span className="text-sm text-gray-500">
                {new Date(message.timestamp).toLocaleString()}
              </span>
            </div>
            <p>{message.content}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </Card>
  );
}
