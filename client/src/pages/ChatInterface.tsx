// src/components/ChatInterface.tsx

import React, { useState } from 'react';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import '../styles/ChatInterface.css';
import { useAuth } from '../contexts/AuthContext';


interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const userId = user?.userId || 'unknown_user_id'; // Use username or a default value

  const handleSend = async () => {
    if (!input.trim()) return;

    const newHistory = [...chatHistory, { role: 'user', content: input }];
    setChatHistory(newHistory);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: input,
          chat_history: newHistory.map(msg => ({ role: msg.role, content: msg.content })),
          user_id: userId
        })
      });

      const data = await response.json();
      const newAssistantMessage: Message = {
        role: 'assistant',
        content: data.generated_text
      };
      setChatHistory([...newHistory, newAssistantMessage]);
    } catch (err) {
      alert('Error sending message.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="chat-container">
      <div className="chat-box">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`chat-bubble ${msg.role}`}>
            <Markdown remarkPlugins={[remarkGfm]}>{msg.content}</Markdown>
          </div>
        ))}
        {loading && (
          <div className="chat-bubble assistant">
            <Spinner animation="border" size="sm" /> <span>Thinking...</span>
          </div>
        )}
      </div>
      <Form className="chat-form" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
        <Form.Control
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your research idea here..."
        />
        <Button type="submit" disabled={loading} className="ms-2">Send</Button>
      </Form>
    </Container>
  );
};

export default ChatInterface;
