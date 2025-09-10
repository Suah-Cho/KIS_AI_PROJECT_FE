import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FiFileText, FiDownload, FiExternalLink, FiChevronDown } from "react-icons/fi";
import type { MessageBubbleProps } from "../../type/message";

export default function MessageBubble({ role, content, source }: MessageBubbleProps) {
  const isUser = role === "human";
  const [ open, setOpen ] = useState(false);
  const hasSource = !isUser && Array.isArray(source) && source.length > 0;
  const userId = localStorage.getItem("UserId") || "";

  const handleDownload = async (name: string) => {
    try {
      console.log(`다운로드~~`)
      // const blob = await fetchSourceBlob(name, userId);
      // if (!(blob instanceof Blob)) {
      //   console.warn("다운로드 실패: 응답이 Blob이 아님");
      //   return;
      // }
      // const url = URL.createObjectURL(blob);
      // const a = document.createElement("a");
      // a.href = url;
      // a.download = name;
      // document.body.appendChild(a);
      // a.click();
      // a.remove();
      // URL.revokeObjectURL(url);
    } catch (e) {
      console.error("파일 다운로드 실패:", e);
    }
  };

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

        {/* 출처 버튼/패널 */}
        {hasSource && (
          <div className="mt-3">
            <button
              onClick={() => setOpen(v => !v)}
              className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition"
              title="출처 보기"
            >
              <FiFileText className="inline-block" />
              출처 {source!.length}
              <FiChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

            {open && (
              <div className="mt-2 rounded-lg border border-gray-200 bg-white p-2 shadow-sm">
                <ul className="space-y-1">
                  {source!.map((name) => (
                    <li key={name} className="flex items-center justify-between gap-3 text-xs text-gray-700">
                      <span className="truncate">{name}</span>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleDownload(name)}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded border border-gray-300 hover:bg-gray-50 text-gray-600"
                          title="다운로드"
                        >
                          <FiDownload /> 다운로드
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}