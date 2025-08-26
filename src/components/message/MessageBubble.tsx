import type { Message } from "../../types/chat";

interface Props extends Message {}

export default function MessageBubble({ role, content }: Props) {
  const isUser = role === "user";
  return (
    <div
      className={`p-2 rounded-lg max-w-xl ${
        isUser
          ? "ml-auto bg-blue-500 text-white"
          : "mr-auto bg-gray-300 text-black"
      }`}
    >
      {content}
    </div>
  );
}
