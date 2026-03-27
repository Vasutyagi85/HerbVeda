import React, { useState, useRef, useEffect } from 'react';

const AskVedaChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Namaste! I am AskVeda. Ask me anything about Ayurvedic herbs.", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/askveda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMessage.text }),
      });
      
      const data = await response.json();
      
      // Add bot response
      setMessages((prev) => [...prev, { text: data.answer, sender: 'bot' }]);
    } catch (error) {
      setMessages((prev) => [...prev, { text: "Sorry, I am having trouble connecting to the herbal wisdom right now.", sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white width-80 md:w-96 h-[500px] rounded-2xl shadow-2xl flex flex-col mb-4 border border-green-100 overflow-hidden">
          {/* Header */}
          <div className="bg-green-800 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧘</span>
              <h3 className="font-bold">AskVeda</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-green-200">
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-grow p-4 overflow-y-auto bg-green-50">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  msg.sender === 'user' 
                    ? 'bg-green-600 text-white rounded-br-none' 
                    : 'bg-white text-gray-800 border border-green-200 rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-white p-3 rounded-lg border border-green-200 text-sm text-gray-500 italic">
                  Meditating on your answer...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a herb or ailment..."
              className="flex-grow px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-green-600 text-sm"
            />
            <button 
              type="submit" 
              disabled={isLoading}
              className="bg-green-800 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-green-900 disabled:opacity-50"
            >
              ➤
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-green-700 hover:bg-green-800 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center gap-2"
        >
          <span className="text-2xl">🌿</span>
          <span className="font-bold hidden md:inline">AskVeda</span>
        </button>
      )}
    </div>
  );
};

export default AskVedaChat;