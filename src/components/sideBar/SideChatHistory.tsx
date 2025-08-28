import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import type { ChatHistoryItem } from "../../type/history";
import { deleteLLMChat, getLLMChatList } from "../../api/llm";


export default function SideChatHistory() {
    const navigate = useNavigate();

    const [history, setHistory] = useState<ChatHistoryItem[]>([]);
    const [ deletingId, setDeletingId ] = useState<string | null>(null);
    const trimTitle = (t: string) => (t.length > 18 ? t.slice(0, 18) + "…" : t);

    useEffect(() => {
        loadHistory();
      }, [location.pathname]);

    const openChat = (id: string) => {
        navigate(`/${id}`);
    };

    const getLastSegment = (path: string) => {
      const parts = path.split("/").filter(Boolean);
      return parts[parts.length - 1] || "";
    };

    const handleDelete = async (id: string) => {
      if (deletingId) return;
      if (!confirm("해당 채팅을 삭제하시겠습니까?")) return;
      setDeletingId(id);

      setHistory((prev) => prev.filter(h => h.chat_id !== id));

      const resp = await deleteLLMChat(id);
      setDeletingId(null);

      if (resp != 204) {
        alert("채팅 삭제에 실패했습니다.");
        loadHistory();
        return;
      }

      if (getLastSegment(location.pathname) === `${id}`) {
        navigate("/");
      }
    }

    const loadHistory = async () => {
        // setLoading(true);
        try {
          const list = await getLLMChatList();
          setHistory(list);
        } catch (e) {
          console.error("히스토리 불러오기 실패:", e);
          setHistory([]);
        }
      };

    return (
        <div className="mt-1 flex-1 left-0 overflow-y-auto scrollbar-thin">
            <ul className="space-y-0.5 pb-4">
              {history.map(h => (
                <li key={h.chat_id} className="group relative">
                  <button
                    title={h.title}
                    onClick={() => openChat(h.chat_id)}
                    className="w-full text-left rounded-md px-2.5 py-2 pr-9 text-sm
                              hover:bg-gray-700 focus:bg-gray-700 focus:outline-none flex items-start"
                  >
                    <span className="flex-1 whitespace-nowrap overflow-hidden text-white">
                      {trimTitle(h.title)}
                    </span>
                  </button>

                  <button
                    type="button"
                    aria-label="삭제"
                    onClick={(e) => { e.stopPropagation(); handleDelete(h.chat_id); }}
                    className={`absolute right-1 top-1 p-1 rounded
                                text-gray-400 hover:text-red-500 hover:bg-red-500/10
                                opacity-0 group-hover:opacity-100 focus:opacity-100
                                transition-opacity duration-150
                                ${deletingId === h.chat_id ? "opacity-100 animate-pulse" : ""}`}
                    disabled={deletingId === h.chat_id}
                  >
                    <FiTrash2 size={14}/>
                  </button>
                </li>
              ))}
            </ul>
        </div>
    );
}