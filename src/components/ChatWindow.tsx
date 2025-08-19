// 전체 채팅 레이아웃

import type { Message } from "../types/chat";
import MessageList from './MessageList';
import ChatInput from './ChatInput';

interface Props{
    messages: Message[];
    onSend: (text: string) => void;
}

export default function ChatWindow({ messages, onSend }: Props) {
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <MessageList messages={messages} />
            <ChatInput onSend={onSend} />
        </div>
    )
}