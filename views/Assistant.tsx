
import React, { useState, useRef } from 'react';
import { getShoppingAdvice, identifyProductFromImage } from '../services/geminiService';
import { Product } from '../types';
import { Send, Camera, Sparkles, ShoppingBag, Loader2, Bot } from 'lucide-react';

interface AssistantProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
}

export const Assistant: React.FC<AssistantProps> = ({ products, onAddToCart }) => {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: "Namaste! I'm your Kirana AI assistant. Ask me for recipe ideas or upload a photo of a product to find it in our store!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const productNames = products.map(p => p.name);
      const advice = await getShoppingAdvice(userMsg, productNames);
      setMessages(prev => [...prev, { role: 'ai', text: advice || "I'm not sure, how else can I help?" }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setMessages(prev => [...prev, { role: 'user', text: "📷 Analyzing uploaded image..." }]);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = (reader.result as string).split(',')[1];
      try {
        const identified = await identifyProductFromImage(base64);
        const match = products.find(p => p.name.toLowerCase().includes(identified.toLowerCase()));

        let aiResponse = `I identified this as: **${identified}**. `;
        if (match) {
          aiResponse += `We have it in stock! I've found ${match.name} for ₹${match.price}. Would you like to add it to your cart?`;
        } else {
          aiResponse += `Unfortunately, we don't seem to have an exact match in our inventory.`;
        }
        setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
      } catch (err) {
        setMessages(prev => [...prev, { role: 'ai', text: "Failed to process image." }]);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4 flex items-center gap-3">
        <div className="bg-green-100 p-2 rounded-xl">
          <Bot className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h2 className="font-bold text-gray-800">Kirana Smart AI</h2>
          <p className="text-xs text-green-600 font-medium">Powered by Gemini 3</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 p-4 scrollbar-hide">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
              m.role === 'user' 
                ? 'bg-green-600 text-white rounded-tr-none' 
                : 'bg-white border border-gray-100 text-gray-700 shadow-sm rounded-tl-none'
            }`}>
              {m.text.split('\n').map((line, k) => (
                <p key={k} className={k > 0 ? 'mt-2' : ''}>{line}</p>
              ))}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 p-4 rounded-2xl flex items-center gap-3">
              <Loader2 className="w-4 h-4 text-green-600 animate-spin" />
              <span className="text-xs text-gray-400">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white rounded-2xl shadow-lg border border-gray-100 mt-4">
        <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-2 no-scrollbar">
          {[
            "Suggest items for Paneer Tikka",
            "What fruits are good for health?",
            "Make a grocery list for 1 week",
            "Find milk alternatives"
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => setInput(prompt)}
              className="px-3 py-1.5 bg-gray-50 text-gray-500 rounded-lg text-xs whitespace-nowrap hover:bg-green-50 hover:text-green-600 transition-colors border border-transparent hover:border-green-100"
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-3 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all"
          >
            <Camera className="w-6 h-6" />
          </button>
          <input 
            type="file" 
            className="hidden" 
            ref={fileInputRef} 
            accept="image/*" 
            onChange={handleImageUpload} 
          />
          <input
            type="text"
            className="flex-1 py-3 px-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="p-3 bg-green-600 text-white rounded-xl hover:bg-green-700 shadow-lg shadow-green-200 transition-all disabled:opacity-50"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
