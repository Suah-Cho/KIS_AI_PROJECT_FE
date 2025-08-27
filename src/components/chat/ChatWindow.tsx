
// 전체 채팅 레이아웃
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SideBar from "../sideBar/SideBar";
import MessageWindow from "../message/MessageWindow";
import TopBar from "../model/TopBar";

export default function ChatWindow() {
    const [ isOpen, setIsOpen ] = useState(true);
    const [ mwKey, setMwKey ] = useState(() => crypto?.randomUUID?.() ?? String(Date.now()));

    const handleNewChat = () => {
        setMwKey(crypto?.randomUUID?.() ?? String(Date.now()));
    };
    
    return (
        <BrowserRouter>
            <div className="flex h-screen">
                <div className="h-full flex overflow-hidden">
                    <SideBar 
                        isOpen={isOpen} 
                        onToggle={() => setIsOpen(!isOpen)} 
                        onNewChat={handleNewChat}
                    />
                </div>
                <div className="flex flex-col flex-1">
                    <div className="sticky top-0 z-10 bg-white shadow">
                        <TopBar />
                    </div>
                    <Routes>
                        <Route path="/" element={<MessageWindow key={mwKey}/>} />
                        <Route path="/:chatId" element={<MessageWindow key={mwKey}/>} />
                    </Routes>

                </div>
            </div>
        </BrowserRouter>
        
    );
}
