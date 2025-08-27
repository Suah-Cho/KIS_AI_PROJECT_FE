import { useEffect, useRef, useState } from "react";
import {  FiPlus } from "react-icons/fi";
import { LuSend } from "react-icons/lu";

export default function MessageInput({ onSend } : { onSend: (text: string) => void }) {
    const [ inputValue, setInputValue ] = useState("");
    const taRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        autoResize();
    }, [inputValue]);

    const handleSend = async () => {
        if (!inputValue.trim()) return ;

        onSend(inputValue);
        setInputValue("");
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            const text = inputValue.trim();
            if (text) onSend(text);
            setInputValue("");
            requestAnimationFrame(autoResize);
          }
    }

    const autoResize = () => {
        const ta = taRef.current;
        if (!ta) return;
        ta.style.height = "auto";
        ta.style.height = `${ta.scrollHeight}px`;
    }

    return (
        <div className="w-full px-4 py-3">
            <div className="flex items-center w-full max-w-4xl m<x-auto bg-white shadow-lg rounded-2xl px-4 py-3">
                <button className="text-gray-500 hover:text-gray-700 mr-3">
                    <FiPlus size={22} />
                </button>

                <textarea
                    ref={taRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="메시지를 입력하세요..."
                    rows={1}
                    className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-base
                                resize-none max-h-40 overflow-y-auto leading-6 transition-none"
                    style={{ height: "auto" }}
                />

                <div className="flex items-center space-x-3 ml-3">
                    <button className="text-gray-500 hover:text-gray-700" 
                            onClick={handleSend}>
                        <LuSend size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}