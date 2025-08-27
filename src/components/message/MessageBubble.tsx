import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { MessageBubbleProps } from "../../type/message";

export default function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === "human";

  return (
    <div
      className={`flex w-full my-2 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`px-4 py-2 rounded-lg max-w-[70%] break-words ${
          isUser
            ? "bg-gray-200 text-gray-900 rounded-br-none"
            : "bg-gray-100 text-gray-900"
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