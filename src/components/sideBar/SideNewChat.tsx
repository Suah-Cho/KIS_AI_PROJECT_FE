import { HiPencilSquare } from "react-icons/hi2";
import { FiMenu } from "react-icons/fi";

export default function SideNewChat(
    { 
        isOpen, onNewChat, onToggle 
    } : {
        isOpen: boolean; 
        onToggle: () => void; 
        onNewChat: () => void;}
) {
    return (
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
            {/* 왼쪽: 새 채팅 버튼 */}
            {isOpen && (
                <button
                    onClick={onNewChat}
                    className="flex-1 mr-2 hover:bg-gray-600 text-white space-x-6 py-2 px-3 rounded text-sm text-left"
                    >
                        <div className="flex items-center">
                            <HiPencilSquare className="text-xl" />
                            <span className="text-base font-medium px-2">새 채팅</span>
                        </div>
                </button>
            )}

            {/* 오른쪽: 햄버거 */}
            <button onClick={onToggle} className="flex-shrink-0">
            <FiMenu size={20} />
            </button>
        </div>
    )
}