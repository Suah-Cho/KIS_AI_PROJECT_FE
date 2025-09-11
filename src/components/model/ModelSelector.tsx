import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

import { models } from "../../constants/model";

export default function ModelSelector({
    modelValue, onModelChange
}: {
    modelValue: string;
    onModelChange: (id: string) => void;
}) {
    const selected = models.find(m => m.id === modelValue) ?? models[0];
    const [ isOpen, setIsOpen ] = useState(false);

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-48 px-4 py-2 bg-white rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600">
                    <span className="mr-2">{selected.name}</span>
                    <FiChevronDown className="w-4 h-4 text-gray-500"/>
                </button>
            {/* 드롭다운 메뉴 */}
            {isOpen && (
                <ul className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
                {models.map((model) => (
                    <li
                    key={model.id}
                    onClick={() => {
                        if (typeof onModelChange !== "function") {
                            console.warn("onModelChange 없음:", onModelChange);
                            return;
                          }
                        onModelChange(model.id);
                        setIsOpen(false);
                    }}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        modelValue === model.id ? "bg-gray-200 dark:bg-gray-800 font-semibold" : ""
                    }`}
                    >
                    {model.name}
                    </li>
                ))}
                </ul>
            )}
        </div>
    );
}