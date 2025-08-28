import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { MessageBubbleProps } from "../../type/message";

export default function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === "human";

  return (
    <div
      className={`flex w-full my-6 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`px-4 py-3 rounded-lg break-words ${
          isUser
            ? "max-w-[70%] bg-gray-200 text-gray-900 rounded-br-none"
            : "w-full text-gray-900"
        }`}
      >
        {/* 마크다운 렌더링 */}
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}      
        </ReactMarkdown>
      </div>
    </div>
  );
}