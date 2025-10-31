import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Send, ChevronDown, Loader2 } from "lucide-react";
import heroImage from "@assets/generated_images/Ancient_library_hero_background_6d6f4c34.png";
import hourglassIcon from "@assets/generated_images/Traveler_avatar_hourglass_icon_8fafeba5.png";
import type { ChatMessage } from "@shared/schema";

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSectionRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToChat = () => {
    chatSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Streaming chat mutation using apiRequest
  const chatMutation = useMutation({
    mutationFn: async ({ message, history }: { message: string; history: ChatMessage[] }) => {
      const response = await apiRequest("POST", "/api/chat", {
        message,
        conversationHistory: history,
      });
      return response;
    },
    onSuccess: async (response) => {
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error("No reader available");

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunk = decoder.decode(value, { stream: true });

        setMessages((prev) => {
          const updated = [...prev];
          const lastMessage = updated[updated.length - 1];
          if (lastMessage.role === "assistant") {
            lastMessage.content += chunk;
          }
          return updated;
        });
      }
    },
    onError: (error) => {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          role: "assistant",
          content:
            "Apologies, traveler. The threads of time have become tangled. Please try your question again.",
          timestamp: Date.now(),
        },
      ]);
    },
  });

  const handleSend = async () => {
    if (!input.trim() || chatMutation.isPending) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input.trim();
    setInput("");

    chatMutation.mutate({
      message: currentInput,
      history: messages,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-background scroll-smooth">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-32 text-center">
          <div className="flex justify-center mb-8">
            <img
              src={hourglassIcon}
              alt="Ancient Traveler"
              className="w-20 h-20 md:w-24 md:h-24 opacity-90"
            />
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-wide text-white mb-6">
            The Ancient Traveler
          </h1>

          <p className="font-display text-xl md:text-2xl font-light tracking-widest text-white/90 mb-8 max-w-3xl mx-auto">
            A Keeper of Ages Past • A Guide Through Time's Mysteries
          </p>

          <p className="text-base md:text-lg leading-relaxed text-white/80 mb-12 max-w-2xl mx-auto">
            Greetings, seeker of knowledge. I have walked through the corridors of time,
            witnessed the rise and fall of empires, and gathered the wisdom of countless
            ages. Ask me of ancient civilizations, forgotten histories, or the secrets
            that time has tried to bury.
          </p>

          <Button
            size="lg"
            onClick={scrollToChat}
            variant="default"
            className="font-display tracking-wide"
            data-testid="button-begin-journey"
          >
            Begin Your Journey
          </Button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-white/60" />
          </div>
        </div>
      </section>

      {/* Chat Section */}
      <section ref={chatSectionRef} className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl rounded-2xl overflow-hidden border-card-border">
            <div className="p-6 md:p-8">
              {/* Messages Area */}
              <div className="mb-6 space-y-6 min-h-[400px] max-h-[600px] overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-[400px] text-center">
                    <img
                      src={hourglassIcon}
                      alt="Hourglass"
                      className="w-16 h-16 mb-6 opacity-40"
                    />
                    <p className="text-muted-foreground text-lg font-serif italic">
                      The sands of time await your first question...
                    </p>
                    <p className="text-muted-foreground text-sm mt-2 max-w-md">
                      Ask about any historical period, ancient civilization, or timeless wisdom
                    </p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                      data-testid={`message-${message.role}-${message.id}`}
                    >
                      {message.role === "assistant" && (
                        <div className="flex-shrink-0 mr-3">
                          <img
                            src={hourglassIcon}
                            alt="Traveler"
                            className="w-10 h-10 md:w-12 md:h-12"
                          />
                        </div>
                      )}

                      <div
                        className={`max-w-prose ${
                          message.role === "user"
                            ? "bg-secondary rounded-lg rounded-tr-none p-4"
                            : "bg-accent border-l-4 border-primary rounded-lg rounded-tl-none p-4 md:p-6"
                        }`}
                      >
                        <div
                          className={`${
                            message.role === "user"
                              ? "text-base leading-normal"
                              : "text-base md:text-lg leading-relaxed font-serif"
                          } whitespace-pre-wrap`}
                        >
                          {message.content}
                          {message.role === "assistant" &&
                            chatMutation.isPending &&
                            message.id === messages[messages.length - 1]?.id && (
                              <span className="inline-block w-2 h-4 ml-1 bg-foreground animate-pulse-slow"></span>
                            )}
                        </div>
                        <div className="text-xs tracking-wide text-muted-foreground mt-2">
                          {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t pt-6">
                <div className="flex gap-4 items-end">
                  <div className="flex-grow">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about ancient Rome, Egyptian pyramids, medieval times..."
                      className="w-full min-h-[60px] max-h-[160px] px-6 py-4 rounded-full border border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring text-base"
                      disabled={chatMutation.isPending}
                      data-testid="input-message"
                    />
                  </div>
                  <Button
                    size="icon"
                    onClick={handleSend}
                    disabled={!input.trim() || chatMutation.isPending}
                    className="rounded-full flex-shrink-0"
                    data-testid="button-send"
                  >
                    {chatMutation.isPending ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t">
        <p className="text-sm text-muted-foreground">
          Powered by Cerebras AI • Built with ancient wisdom and modern technology
        </p>
      </footer>
    </div>
  );
}
