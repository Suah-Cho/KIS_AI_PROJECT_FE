import { useState } from "react";
import type { Message } from "../types/chat";
// import { sendMessageToServer } from "../services/api";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    // { role: "assistant", content: "안녕하세요! 무엇을 도와드릴까요?" },
  ]);

  const sendMessage = async (text: string) => {
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const reply = `Hello World`;
      const botMsg: Message = { role: "assistant", content: reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "에러가 발생했어요 😢" },
      ]);
    }
  };

  return { messages, sendMessage };
}
