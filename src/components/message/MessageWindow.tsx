import type { MessageBubbleProps } from "../../type/message";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { useEffect, useRef, useState } from "react";
import { getLLMMessages, sendLLMMessage } from "../../api/llm";
import { useNavigate, useParams } from "react-router-dom";
import { type CategoryOption } from "../../constants/categories";
import { toast } from "react-hot-toast";
import { flushSync } from "react-dom"; // 실시간 렌더 강제 플러시
import { getStreamSpeed } from "../../utils/Stream";

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
    const streamingRef = useRef(false);
    const [ startedStream, setStartedStream ] = useState(false); // 첫 토큰 도착 전 상태 표시용
    const firstTokenSeenRef = useRef(false);

    const appendToLastAssistant = (chunk: string) => {
        setMessages(prev => {
          const next = [...prev];
          const i = next.length - 1;
          if (i >= 0 && next[i].role === "ai") {
            next[i] = { ...next[i], content: (next[i].content || "") + chunk };
          }
          return next;
        });
        if (!firstTokenSeenRef.current) {
          firstTokenSeenRef.current = true;
          setStartedStream(true);
        }
      };

    const { chatId: routeChatId } = useParams<{ chatId: string }>();
    const [ chatId, setChatId ] = useState<string | null>(routeChatId ?? null);
    
    useEffect(() => {

        let cancelled = false;

        if (!routeChatId) {
            // setMessages([]);
            setChatId(null);
            return;
        }
        if (streamingRef.current) return;
        
        setChatId(routeChatId);
        (async () => {
            try {
                const userId = localStorage.getItem("UserId") || "dev";
                if (!userId) {
                    toast.error("사용자 정보가 없습니다. 다시 로그인 해주세요.");
                    navigate("/login", { replace: true });
                    return;
                }
                const resp = await getLLMMessages(routeChatId, userId);
                if (cancelled) return;
                if (resp.status === 404) {
                    toast.error(`${resp.data.message}`);
                    // setMessages([]);
                    navigate("/", { replace: true });
                    return;
                  }
                //   setMessages(resp.data?.data?.response ?? []);
                const data = resp.data?.data?.response ?? [];
                if (data.length > 0) setMessages(data);
            } catch (error) {
                if (!cancelled) {
                    console.error("메시지 기록 불러오기 실패:", error);
                    // setMessages([]);
                }
            } finally {
                if (!cancelled) setIsLoding(false);
                console.log("[getLLMMessages] fetch end");
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
        // 새 요청 시작: 플레이스홀더 표시를 위해 초기화
        startedStream && setStartedStream(false);
        firstTokenSeenRef.current = false;
        streamingRef.current = true;
        const id = ensureChatId();
        setMessages(prev => [...prev, { role: "human", content: text }, { role: "ai", content: "" }]);
        setIsLoding(true);

        try {
            const userId = localStorage.getItem("UserId") || "dev";
            if (!userId) {
              toast.error("로그인 정보가 없어 메세지를 보낼 수 없습니다.");
            }
            const resp = await sendLLMMessage(text, id, model, category, userId);

            // 서버 응답에서 "마지막 ai 메시지" 내용을 우선 추출
            const tryPickLastAi = (v: any): string | null => {
              const arr = Array.isArray(v?.data?.response)
                ? v.data.response
                : Array.isArray(v?.response)
                ? v.response
                : null;
              if (!arr) return null;
              for (let i = arr.length - 1; i >= 0; i--) {
                const it = arr[i];
                if (it?.role === "ai" && typeof it?.content === "string") return it.content;
              }
              return null;
            };

            const pickString = (v: any): string | null => {
              if (typeof v === "string") return v;
              if (!v || typeof v !== "object") return null;
              const direct = v.answer ?? v.text ?? v.message ?? v.content ?? null;
              if (typeof direct === "string" && direct.length) return direct;
              const nested = v.data?.answer ?? v.data?.text ?? v.data?.message ?? v.data?.content ?? null;
              if (typeof nested === "string" && nested.length) return nested;
              return null;
            };

            let fullText =
              tryPickLastAi(resp) ??
              tryPickLastAi((resp as any)?.data) ??
              pickString(resp) ??
              pickString((resp as any)?.data) ??
              "";
            if (!fullText) {
              try { fullText = JSON.stringify(resp); } catch { /* no-op */ }
            }

            // 글자(또는 그래프림) 단위로 끊어서 표시
            const delay = getStreamSpeed(); // 설정의 스트림 속도(ms)
            if (delay === 0) {
              flushSync(() => {
                appendToLastAssistant(fullText);
              });
              scrollToBottom(false);
            } else {
              for (const ch of fullText) {
                await new Promise(r => setTimeout(r, delay));
                flushSync(() => {
                  appendToLastAssistant(ch);
                });
                scrollToBottom(false);
              }
            }
        } catch (error) {
            console.error(`api 호출 실패 : ${error}`);
            appendToLastAssistant("\n[오류가 발생했습니다. 다시 시도해주세요.]");
        } finally {
            streamingRef.current = false;
            setIsLoding(false);
        }
    };
    
    const emptyState = (
        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
            <p className="text-gray-700 text-lg font-medium dark:text-gray-200">
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
                    {messages
                      // 로딩 중 첫 토큰 전에는 비어 있는 AI 버블을 숨겨 중복 표시 방지
                      .filter(m => !(m.role === "ai" && (!m.content || m.content.length === 0) && isLoding && !startedStream))
                      .map((m, i) => (
                        <MessageBubble key={i} role={m.role} content={m.content} source={m.source} />
                      ))}
                    {!startedStream && isLoding && <MessageBubble role="ai" content="답변 생성 중..." />}
                    <div ref={endRef} />
                </div>
            </div>
            <div className="w-full max-w-4xl mx-auto py-2 shrink-0">
                <MessageInput onSend={handleSend} selectedModel={selectedModel} selectedCategory={selectedCategory} />
            </div>
        </div>
    );

    return (
        <div className="flex flex-col flex-1 overflow-hidden bg-gray-50 dark:bg-gray-800">
            {messages.length === 0 && !chatId && !isLoding
                ? emptyState
                : chatState}
        </div>
    );
}