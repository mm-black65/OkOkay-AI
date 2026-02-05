import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Chat = () => {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! I am your AI Mentor. How can I help you with your career today?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const { user } = useAuth();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            // API call to backend would go here
            // const res = await axios.post('/ai/chat', { message: input });
            // const aiMessage = { role: 'assistant', content: res.data.message };

            // Simulating response for now
            setTimeout(() => {
                const aiMessage = {
                    role: 'assistant',
                    content: `This is a simulated response to "${input}". The backend AI integration isn't fully connected yet, but the UI work!`
                };
                setMessages(prev => [...prev, aiMessage]);
                setLoading(false);
            }, 1000);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-surface p-4 flex items-center justify-between">
                <h1 className="text-xl font-bold text-primary">AI Mentor Chat</h1>
                <button onClick={() => window.history.back()} className="text-text-secondary hover:text-text">Exit</button>
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-lg p-3 ${msg.role === 'user'
                                    ? 'bg-primary text-white'
                                    : 'bg-surface text-text'
                                }`}
                        >
                            <p>{msg.content}</p>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-surface text-text rounded-lg p-3 animate-pulse">
                            Thinking...
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border bg-surface p-4">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        className="input flex-1"
                        placeholder="Ask about your career..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        className="btn btn-primary px-6"
                        disabled={loading}
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
