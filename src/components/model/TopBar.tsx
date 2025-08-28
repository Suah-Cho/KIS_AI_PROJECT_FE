import ModelSelector from "../model/ModelSelector";
import { FiShare2 } from "react-icons/fi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

export default function TopBar({
    modelValue, onModelChange
}:{
    modelValue: string;
    onModelChange: (id: string) => void;
}) {
    return (
        <div className="w-full flex items-center justify-between px-6 py-3 border-b bg-white shadow-sm">
            <div className="flex items-center space-x-4">
                <ModelSelector modelValue={modelValue} onModelChange={onModelChange} />
            </div>

            <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-gray-800 flex items-center space-x-1">
                    <FiShare2 />
                    <span className="text-sm">공유하기</span>
                </button>
                <button className="text-gray-600 hover:text-gray-800">
                    <HiOutlineDotsHorizontal size={20} />
                </button>
            </div>
        </div>


    );
}