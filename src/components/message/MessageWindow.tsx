import type { MessageBubbleProps } from "../../type/message";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { useEffect, useRef, useState } from "react";
import { getLLMMessages, sendLLMMessage } from "../../api/llm";
import { useNavigate, useParams } from "react-router-dom";
import { type CategoryOption } from "../../constants/categories";
import { toast } from "react-hot-toast";


export default function MessageWindow({
    selectedModel, selectedCategory
}:{
    selectedModel: string;
    selectedCategory: CategoryOption;
}) {
    const navigate = useNavigate();
    
    const scrollWrapRef = useRef<HTMLDivElement>(null);
    const endRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = (smooth = true) => {
        if (endRef.current) {
            endRef.current.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "end" });
        } else if (scrollWrapRef.current) {
            scrollWrapRef.current.scrollTop = scrollWrapRef.current.scrollHeight;
        }
    }

    const [ messages, setMessages ] = useState<MessageBubbleProps[]>([]);
    const [ isLoding, setIsLoding ] = useState(false);

    const { chatId: routeChatId } = useParams<{ chatId: string }>();
    const [ chatId, setChatId ] = useState<string | null>(routeChatId ?? null);
    
    useEffect(() => {

        let cancelled = false;

        if (!routeChatId) {
            setMessages([]);
            setChatId(null);
            return;
        }
        setChatId(routeChatId);
        (async () => {
            try {
                const resp = await getLLMMessages(routeChatId);
                if (cancelled) return;
                if (resp.status === 404) {
                    toast.error(`${resp.data.message}`);
                    return;
                  }
                if (resp.data.data?.response) {
                    setMessages(resp.data.data.response);
                }
            } catch (error) {
                if (!cancelled) setMessages([]);
                console.error(`메시지 기록 불러오기 실패: ${error}`);
            } finally {
                if (!cancelled) setIsLoding(false);
            }
        })();
        return () => { cancelled = true; }
    }, [routeChatId]);

    useEffect(() => {
        scrollToBottom(true);
    }, [messages, isLoding]);

    const ensureChatId = () => {
        if (chatId) return chatId;
        const newId = crypto?.randomUUID?.() ?? String(Date.now());
        setChatId(newId);
        navigate(`/${newId}`, { replace: false });
        return newId;
    };

    const handleSend = async (text: string, model: string, category: string) => {
        const id = ensureChatId();
        setMessages(prev => [...prev, { role: "human", content: text }]);
        setIsLoding(true);

        try {
            const resp = await sendLLMMessage(text, id, model, category);
            console.log("LLM 응답 데이터:", resp);
            if (resp.data?.response) {
                setMessages(resp.data.response);
            }
        } catch (error) {
            console.error(`api 호출 실패 : ${error}`);
            alert("메시지 전송에 실패했습니다. 다시 시도해주세요.");
        } finally {
            setIsLoding(false);
        }
    };
    
    const emptyState = (
        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
            <p className="text-gray-700 text-lg font-medium">
                환영합니다! 메시지를 입력하여 대화를 시작하세요.
            </p>
            <div className="w-full max-w-2xl">
                <MessageInput onSend={handleSend} selectedModel={selectedModel} selectedCategory={selectedCategory}/>
            </div>
        </div>
    );

    const chatState = (
        <div className="flex flex-col flex-1 overflow-hidden">
            {/* 전체 폭 스크롤 컨테이너 (스크롤바는 오른쪽 끝) */}
            <div
                ref={scrollWrapRef}
                className="flex-1 min-h-0 overflow-y-auto light-scroll"
            >
                {/* 가운데 제한 폭 래퍼 */}
                <div className="w-full max-w-4xl mx-auto px-6 py-4">
                    {messages.map((m, i) => (
                        <MessageBubble key={i} role={m.role} content={m.content} />
                    ))}
                    {isLoding && <MessageBubble role="ai" content="답변 생성 중..." />}
                    <div ref={endRef} />
                </div>
            </div>
            <div className="w-full max-w-4xl mx-auto py-2 shrink-0">
                <MessageInput onSend={handleSend} selectedModel={selectedModel} selectedCategory={selectedCategory} />
            </div>
        </div>
    );

    return (
        <div className="flex flex-col flex-1 bg-gray-100 overflow-hidden">
            {messages.length === 0 && !chatId && !isLoding
                ? emptyState
                : chatState}
        </div>
    );
}