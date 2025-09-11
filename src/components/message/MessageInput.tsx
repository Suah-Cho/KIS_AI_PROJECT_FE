import { useEffect, useRef, useState } from "react";
import {  FiPlus } from "react-icons/fi";
import { LuSend } from "react-icons/lu";
import { type CategoryOption } from "../../constants/categories";

export default function MessageInput({ 
    onSend, selectedModel, selectedCategory
} : { 
    onSend: (text: string, model: string, category: string) => void;
    selectedModel: string;
    selectedCategory: CategoryOption;
}) {
    const [ inputValue, setInputValue ] = useState("");
    const taRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        autoResize();
    }, [inputValue]);

    const handleSend = async () => {
        if (!inputValue.trim()) return ;

        onSend(inputValue, selectedModel, selectedCategory.id);
        setInputValue("");
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            const text = inputValue.trim();
            if (text) onSend(text, selectedModel, selectedCategory.id);
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
            <div className="flex items-center w-full max-w-4xl m<x-auto bg-white shadow-lg rounded-2xl px-4 py-3 dark:bg-gray-200">
                <button className="text-gray-500 hover:text-gray-700 mr-3 dark:text-gray-800 dark:hover:text-gray-600">
                    <FiPlus size={22} />
                </button>

                <textarea
                    ref={taRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="메시지를 입력하세요..."
                    rows={1}
                    className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 dark:placeholder-gray-800 text-base
                                resize-none max-h-40 overflow-y-auto leading-6 transition-none"
                    style={{ height: "auto" }}
                />

                <div className="flex items-center space-x-3 ml-3">
                    <button className="text-gray-500 hover:text-gray-700 dark:text-gray-800 dark:hover:text-gray-600" 
                            onClick={handleSend}>
                        <LuSend size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}