import type { Message } from "../../types/chat";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function MessageWindow( { messages, onSend }: { messages: Message[]; onSend: (text: string) => void; } ) {
    
    console.log(`Message list length: ${messages.length}, messages: `, messages);
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex h-screen bg-gray-100">
                {messages.length === 0 ? (
                    // 메시지 없을 때 → 중앙 입력창
                    <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                        <p className="text-gray-700 text-lg font-medium">
                            환영합니다! 메시지를 입력하여 대화를 시작하세요.
                        </p>
                        <div className="w-full max-w-2xl">
                            <MessageInput />
                        </div>
                    </div>
                    // <ChatInput onSend={ onSend } />
                ) : (
                    <>
                    {/* 메시지 리스트 */}
                    <MessageList messages={messages} />

                    {/* 하단 입력창 */}
                    <div className="border-t p-2 bg-white">
                        <MessageInput />
                    </div>
                    </>
                )}
            </div>
            {/* <MessageList messages={messages} />
            <ChatInput onSend={onSend} /> */}
        </div>
        
    )
}