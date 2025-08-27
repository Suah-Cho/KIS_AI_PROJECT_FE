import type { MessageBubbleProps } from "../../type/message";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { useEffect, useState } from "react";
import { getLLMMessages, sendLLMMessage } from "../../api/llm";
import { useNavigate, useParams } from "react-router-dom";

export default function MessageWindow() {
    const navigate = useNavigate();

    const [ messages, setMessages ] = useState<MessageBubbleProps[]>([]);
    const [ isLoding, setIsLoding ] = useState(false);
    const [isLoadingHistory, setIsLoadingHistory] = useState(false);

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
        setIsLoadingHistory(true);
        (async () => {
            try {
                const resp = await getLLMMessages(routeChatId);
                if (cancelled) return;
                if (resp.data?.response) {
                    setMessages(resp.data.response);
                }
            } catch (error) {
                if (!cancelled) setMessages([]);
                console.error(`메시지 기록 불러오기 실패: ${error}`);
            } finally {
                if (!cancelled) setIsLoadingHistory(false);
            }
        })();
        
    }, [routeChatId]);

    const ensureChatId = () => {
        if (chatId) return chatId;
        const newId = crypto?.randomUUID?.() ?? String(Date.now());
        setChatId(newId);
        // /{uuid} 로 이동 (히스토리 추가)
        navigate(`/${newId}`, { replace: false });
        return newId;
    };

    const handleSend = async (text: string) => {
        const id = ensureChatId();
        setMessages(prev => [...prev, { role: "human", content: text }]);
        setIsLoding(true);

        try {
            const resp = await sendLLMMessage(text, id);
            console.log("LLM 응답 데이터:", resp);
            // 서버 응답이 전체 대화 배열이면 그대로 세팅
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
                <MessageInput onSend={handleSend} />
            </div>
        </div>
    );

    const chatState = (
        <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 min-h-0 overflow-y-auto p-4 w-full max-w-4xl mx-auto">
                {/* {isLoadingHistory && (
                    <div className="text-gray-500 text-sm py-2">이전 대화를 불러오는 중...</div>
                )} */}
                {messages.map((m, i) => (
                    <MessageBubble key={i} role={m.role} content={m.content} />
                ))}
                {isLoding && <MessageBubble role="ai" content="답변 생성 중..." />}
            </div>
            <div className="w-full max-w-4xl mx-auto py-2 shrink-0">
                <MessageInput onSend={handleSend} />
            </div>
        </div>
    );

    return (
        <div className="flex flex-col flex-1 bg-gray-100 overflow-hidden">
            {messages.length === 0 && !chatId && !isLoadingHistory
                ? emptyState
                : chatState}
        </div>
    );
}