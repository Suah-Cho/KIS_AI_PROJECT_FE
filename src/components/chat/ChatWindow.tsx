// 전체 채팅 레이아웃

import { useState } from "react";
import type { Message } from "../../types/chat";
import MessageList from '../message/MessageList';
import ChatInput from './ChatInput';
import SideBar from "../sideBar/SideBar";

interface Props{
    messages: Message[];
    onSend: (text: string) => void;
}

export default function ChatWindow({ messages, onSend }: Props) {
    const [ isOpen, setIsOpen ] = useState(true);

    return (
        <div className="flex h-screen">
            <SideBar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} onNewChat={() => alert("새 채팅 시작")}/>
            <div className="flex-1">
                <div className="flex flex-col h-screen bg-gray-100">
                    <MessageList messages={messages} />
                    <ChatInput onSend={onSend} />
                </div>
            </div>
        </div>
    )
}