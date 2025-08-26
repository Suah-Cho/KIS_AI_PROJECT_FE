// 전체 채팅 레이아웃

import { useState } from "react";
import type { Message } from "../../types/chat";
import SideBar from "../sideBar/SideBar";
import MessageWindow from "../message/MessageWindow";

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
                <MessageWindow messages={messages} onSend={ onSend } />
                {/* <MessageInput /> */}
            </div>
        </div>
    )
}