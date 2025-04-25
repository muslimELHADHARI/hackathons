"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Mic, ImageIcon, PaperclipIcon, Bot, User, Loader2 } from "lucide-react";
import { FluidButton } from "@/components/fluid-button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
    id: string;
    content: string;
    sender: "user" | "assistant";
    timestamp: Date;
    attachments?: string[];
    suggestions?: string[];
}

function ChatMessage({ message }: { message: Message }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-4`}
        >
            {message.sender === "assistant" && (
                <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/images/assistant-avatar.png" alt="Assistant" />
                    <AvatarFallback>
                        <Bot className="h-4 w-4" />
                    </AvatarFallback>
                </Avatar>
            )}

            <div
                className={`max-w-[80%] ${message.sender === "user" ? "bg-emerald-500 text-white" : "bg-gray-100 dark:bg-gray-800"
                    } rounded-2xl p-3`}
            >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>

                {Array.isArray(message.attachments) && message.attachments.length > 0 && (
                    <div className="mt-2 grid grid-cols-2 gap-2">
                        {message.attachments.map((attachment, index) => (
                            <img
                                key={index}
                                src={attachment || "/placeholder.svg"}
                                alt="Attachment"
                                className="rounded-lg w-full h-auto object-cover"
                            />
                        ))}
                    </div>
                )}

                {Array.isArray(message.suggestions) && message.suggestions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                            <Badge
                                key={index}
                                variant="outline"
                                className="cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
                            >
                                {suggestion}
                            </Badge>
                        ))}
                    </div>
                )}

                <div className="text-xs text-right mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
            </div>

            {message.sender === "user" && (
                <Avatar className="h-8 w-8 ml-2">
                    <AvatarImage src="/images/avatars/user1.png" alt="User" />
                    <AvatarFallback>
                        <User className="h-4 w-4" />
                    </AvatarFallback>
                </Avatar>
            )}
        </motion.div>
    );
}

export default function AssistantPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            content: "Bonjour! Je suis votre assistant anti-gaspillage. Comment puis-je vous aider aujourd'hui?",
            sender: "assistant",
            timestamp: new Date(),
            suggestions: ["Que cuisiner avec mes restes?", "Comment conserver le pain?", "Astuces anti-gaspi"],
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [thinkingText, setThinkingText] = useState<string | null>(null);
    const [userMemory, setUserMemory] = useState<Message[]>([]); // Memory to store user interactions
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            content: inputValue,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsLoading(true);
        setThinkingText(null);

        // Add to memory
        setUserMemory((prevMemory) => [...prevMemory, userMessage]);

        const assistantId = (Date.now() + 1).toString();
        let currentResponse = "";

        const newAssistantMsg: Message = {
            id: assistantId,
            content: "",
            sender: "assistant",
            timestamp: new Date(),
            suggestions: [],
        };

        setMessages((prev) => [...prev, newAssistantMsg]);

        try {
            const res = await fetch("http://localhost:11434/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "deepseek-r1",
                    prompt: `You are a chatbot focused on reducing food waste. You should remember past queries to personalize responses. User's message: ${inputValue}. Past interactions: ${JSON.stringify(
                        userMemory
                    )}`,
                    stream: true,
                }),
            });

            if (!res.body) throw new Error("No stream returned");

            const reader = res.body.getReader();
            const decoder = new TextDecoder("utf-8");

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });

                chunk.split("\n").forEach((line) => {
                    try {
                        const parsed = JSON.parse(line);
                        const token = parsed.response;
                        if (!token) return;

                        currentResponse += token;

                        const match = currentResponse.match(/<think>([\s\S]*?)<\/think>/);
                        if (match && match[1]) {
                            setThinkingText(match[1]);
                        }

                        const display = currentResponse.replace(/<think>[\s\S]*?<\/think>/g, "");


                        setMessages((prev) =>
                            prev.map((msg) =>
                                msg.id === assistantId ? { ...msg, content: display } : msg
                            )
                        );
                    } catch (e) {
                        console.warn("Failed to parse stream chunk:", line);
                    }
                });
            }
        } catch (err) {
            console.error("Streaming error:", err);
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now().toString(),
                    content: "Une erreur est survenue lors de la communication avec le chatbot.",
                    sender: "assistant",
                    timestamp: new Date(),
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const toggleRecording = () => {
        setIsRecording(!isRecording);
        if (!isRecording) {
            setTimeout(() => {
                setIsRecording(false);
                setInputValue("Comment réduire le gaspillage de pain?");
            }, 3000);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            className="container mx-auto py-8 px-4 md:px-6 h-[calc(100vh-4rem)]"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
        >
            <motion.div className="flex flex-col h-full" variants={itemVariants}>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400">
                            Assistant Anti-Gaspi
                        </h1>
                        <p className="text-muted-foreground">Posez vos questions et obtenez des conseils personnalisés</p>
                    </div>
                </div>

                <Card className="flex-grow overflow-hidden fluid-card">
                    <CardContent className="p-0 flex flex-col h-full">
                        <ScrollArea className="flex-grow p-4">
                            <div className="space-y-4">
                                {thinkingText && (
                                    <div className="mb-4 p-3 rounded-lg border border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 text-sm text-yellow-800 dark:text-yellow-200">
                                        <strong>Réflexion de l'assistant :</strong> {thinkingText}
                                    </div>
                                )}

                                {messages.map((message) => (
                                    <ChatMessage key={message.id} message={message} />
                                ))}

                                {isLoading && (
                                    <div className="flex justify-start mb-4">
                                        <Avatar className="h-8 w-8 mr-2">
                                            <AvatarImage src="/images/assistant-avatar.png" alt="Assistant" />
                                            <AvatarFallback>
                                                <Bot className="h-4 w-4" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "600ms" }} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        </ScrollArea>

                        <div className="p-4 border-t dark:border-gray-700">
                            <div className="flex items-center space-x-2">
                                <button className="p-2 text-gray-500 hover:text-emerald-500 dark:text-gray-400 dark:hover:text-emerald-400">
                                    <PaperclipIcon className="h-5 w-5" />
                                </button>
                                <button className="p-2 text-gray-500 hover:text-emerald-500 dark:text-gray-400 dark:hover:text-emerald-400">
                                    <ImageIcon className="h-5 w-5" />
                                </button>
                                <div className="relative flex-grow">
                                    <Input
                                        placeholder="Écrivez votre message..."
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyPress}
                                        className="pr-10 fluid-input"
                                        disabled={isLoading}
                                    />
                                    <button
                                        className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${isLoading ? "opacity-50" : ""}`}
                                        onClick={handleSendMessage}
                                        disabled={isLoading}
                                    >
                                        <Send className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    </button>
                                </div>
                                <button
                                    className={`p-2 ${isRecording ? "text-red-500" : "text-gray-500"} hover:text-emerald-500 dark:text-gray-400 dark:hover:text-emerald-400`}
                                    onClick={toggleRecording}
                                >
                                    <Mic className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}
