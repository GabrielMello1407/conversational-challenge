'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { GoogleGenAI } from '@google/genai';
import { marked } from 'marked';

type Message = {
  sender: 'user' | 'ai';
  text: string;
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  // Carrega histórico salvo no localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('furia-chat-history');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    // Envia a mensagem de boas-vindas logo após o carregamento
    if (savedMessages === null || JSON.parse(savedMessages).length === 0) {
      const welcomeMessage: Message = {
        sender: 'ai',
        text: '🔥 Bem-vindo(a) ao chat da FURIA! 🔥\nAqui você encontra tudo sobre o time, o CS2 e muito mais! Como posso te ajudar hoje? 💬',
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Atualiza e salva mensagens no localStorage
  const updateMessages = (newMessages: Message[]) => {
    setMessages(newMessages);
    localStorage.setItem('furia-chat-history', JSON.stringify(newMessages));
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', text: input };
    const updated = [...messages, userMessage];
    updateMessages(updated);

    setInput('');
    setStreamingMessage('');
    setLoading(true);

    const ai = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
    });

    const config = {
      responseMimeType: 'text/plain',
    };

    const contents = [
      {
        role: 'model',
        parts: [
          {
            text: `Você é a FURIA.AI, a inteligência artificial oficial da FURIA Esports, criada para ser a assistente definitiva dos fãs de CS2 (Counter-Strike 2). Sua missão é informar, engajar e fortalecer a conexão entre o time e sua torcida. Sua linguagem é firme, confiante e empolgada, refletindo a intensidade, paixão e ousadia da FURIA. Você sempre fala com clareza, com toques de emoção e orgulho quando menciona a FURIA.
            \n\n... [restante da configuração do modelo] ...`,
          },
        ],
      },
      ...updated.map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      })),
    ];

    try {
      const model = 'gemini-2.0-pro-exp-02-05';
      const response = await ai.models.generateContentStream({
        model,
        config,
        contents,
      });

      let aiResponse = '';
      for await (const chunk of response) {
        aiResponse += chunk.text;
        setStreamingMessage(aiResponse);
      }

      updateMessages([...updated, { sender: 'ai', text: aiResponse }]);
    } catch (err) {
      console.error('Erro ao chamar a IA:', err);
    } finally {
      setStreamingMessage('');
      setLoading(false);
    }
  };

  const renderMessage = (msg: Message, i: number) => {
    const isUser = msg.sender === 'user';

    return (
      <div
        key={i}
        className={`flex items-start gap-3 ${
          isUser ? 'justify-end' : 'justify-start'
        }`}
      >
        {!isUser && (
          <Image
            src="/furia-icone.png"
            alt="Furia Icon"
            width={36}
            height={36}
            className="rounded-full"
          />
        )}
        <div
          className={`px-4 py-2 rounded-xl max-w-[75%] text-sm whitespace-pre-wrap ${
            isUser ? 'bg-gray-800 text-white' : 'bg-gray-700 text-white'
          }`}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: isUser ? msg.text : marked.parse(msg.text),
            }}
          />
        </div>
        {isUser && (
          <Image
            src="/user.png"
            alt="User"
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col border border-gray-700 bg-[#0f0f0f] rounded-none shadow-lg overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-white scrollbar-thin scrollbar-thumb-gray-700">
        {messages.map(renderMessage)}
        {streamingMessage && (
          <div className="flex items-start gap-3 justify-start">
            <Image
              src="/furia.png"
              alt="Furia Icon"
              width={32}
              height={32}
              className="rounded-full"
            />
            <div className="px-4 py-2 rounded-xl bg-gray-700 text-gray-300 italic max-w-[75%] text-sm whitespace-pre-wrap">
              {streamingMessage}
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="border-t border-gray-700 p-3 bg-[#121212] flex flex-wrap gap-2 w-full">
        <input
          type="text"
          placeholder="Fale com a FURIA..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none w-full sm:w-auto"
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 cursor-pointer transition-colors duration-200 w-full sm:w-auto"
        >
          Enviar
        </button>

        <button
          onClick={() => {
            localStorage.removeItem('furia-chat-history');
            setMessages([]);
          }}
          className="flex items-center justify-center bg-transparent text-sm text-gray-400 hover:text-red-500 hover:bg-gray-700 px-4 py-2 rounded-lg border border-gray-600 transition-all duration-200 ease-in-out w-full sm:w-auto"
        >
          🗑️ Limpar histórico
        </button>
      </div>
    </div>
  );
};

export default Chat;
