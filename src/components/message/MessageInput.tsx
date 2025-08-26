import {  FiPlus } from "react-icons/fi";
import { LuSend } from "react-icons/lu";

export default function MessageInput() {
    return (
        <div className="w-full px-4 py-3">
            <div className="flex items-center w-full max-w-3xl m<x-auto bg-white shadow-lg rounded-2xl px-4 py-3">
                <button className="text-gray-500 hover:text-gray-700 mr-3">
                    <FiPlus size={22} />
                </button>

                <input
                    type="text"
                    placeholder="메시지를 입력하세요..."
                    className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-base" />

                <div className="flex items-center space-x-3 ml-3">
                    <button className="text-gray-500 hover:text-gray-700" onClick={() => alert("메시지 전송")}>
                        <LuSend size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}