
// 전체 채팅 레이아웃
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import SideBar from "../sideBar/SideBar";
import MessageWindow from "../message/MessageWindow";
import TopBar from "../model/TopBar";

export default function ChatWindow() {
    const [ isOpen, setIsOpen ] = useState(true);
    const [ mwKey, setMwKey ] = useState(() => crypto?.randomUUID?.() ?? String(Date.now()));
    const [ modelValue, setModelValue ] = useState("gemma3:27b");

    const handleNewChat = () => {
        setMwKey(crypto?.randomUUID?.() ?? String(Date.now()));

        const base = (import.meta.env.BASE_URL?.replace(/\/+$/,"") || "");
        const rootPath = base || "/";
        if (window.location.pathname !== rootPath) {
            // 기존 chatId 제거 → emptyState 조건 만족
            window.history.pushState({}, "", rootPath);
        }
    };

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            // macOS: metaKey, Windows/Linux: ctrlKey
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "o" || e.key === "O")) {
                e.preventDefault();
                handleNewChat();
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);
    
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
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
                        <TopBar modelValue={modelValue} onModelChange={setModelValue} />
                    </div>
                    <Routes>
                        <Route path="/" element={<MessageWindow key={mwKey} selectedModel={modelValue}/>} />
                        <Route path="/:chatId" element={<MessageWindow key={mwKey} selectedModel={modelValue}/>} />
                    </Routes>

                </div>
            </div>
        </BrowserRouter>
        
    );
}
