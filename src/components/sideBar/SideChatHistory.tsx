import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ChatHistoryItem } from "../../type/history";
import { getLLMChatList } from "../../api/llm";


export default function SideChatHistory() {
    const navigate = useNavigate();

    const [history, setHistory] = useState<ChatHistoryItem[]>([]);
    const trimTitle = (t: string) => (t.length > 18 ? t.slice(0, 18) + "…" : t);

    useEffect(() => {
        loadHistory();
      }, [location.pathname]);

    const openChat = (id: string) => {
        navigate(`/${id}`);
    };

    const loadHistory = async () => {
        // setLoading(true);
        try {
          const list = await getLLMChatList();
          console.log("히스토리 불러오기 성공:", list);
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
                <li key={h.chat_id}>
                <button
                    title={h.title}
                    onClick={() => openChat(h.chat_id)}
                    className="w-full text-left rounded-md px-2.5 py-2 text-sm hover:bg-gray-700 focus:bg-gray-700 focus:outline-none flex items-start"
                >
                    <span className="block flex-1 whitespace-nowrap overflow-hidden text-white">
                    {trimTitle(h.title)}
                    </span>
                </button>
                </li>
            ))}
            </ul>
        </div>
    );
}