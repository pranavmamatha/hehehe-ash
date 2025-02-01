'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  text: string;
  isUser: boolean;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm your security assistant. How can I help you analyze security threats and vulnerabilities?", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ message: input }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, {
          text: data.response || data.message,
          isUser: false
        }]);
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        isUser: false
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 p-0 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <MessageCircle className="h-7 w-7" />
        </Button>
      ) : (
        <Card className="w-[450px] h-[600px] flex flex-col shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 border-b bg-primary/5">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <div className="font-semibold">Security Assistant</div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-primary/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent 
            className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
            style={{ scrollBehavior: 'smooth' }}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!message.isUser && <Bot className="h-6 w-6 mt-1" />}
                <div
                  className={`rounded-lg px-4 py-2 max-w-[85%] ${
                    message.isUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/50 border border-muted-foreground/10'
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm">
                    {message.text}
                  </div>
                </div>
                {message.isUser && <User className="h-6 w-6 mt-1" />}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-2 justify-start">
                <Bot className="h-6 w-6 mt-1" />
                <div className="bg-muted/50 rounded-lg px-4 py-2 border border-muted-foreground/10">
                  <div className="flex gap-1 items-center">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="p-4 pt-2 border-t bg-primary/5">
            <form onSubmit={handleSend} className="flex w-full gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about security threats..."
                className="flex-1 bg-background"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={isLoading}
                className="hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </div>
  );
} 