import { FiUser } from "react-icons/fi";

export default function SideProfile(
    { isOpen, onClick } : { isOpen: boolean; onClick: () => void; }
) {
    return (
        <div className="px-2 py-4 border-t border-gray-700">
            <button
                className={`flex items-center w-full hover:bg-gray-600 py-2 px-3 rounded transition-all duration-300
                    ${isOpen ? "justify-start" : "justify-center"}`}
                onClick={onClick}
                >
                <FiUser className="text-xl flex-shrink-0" />
                <span
                    className={`overflow-hidden transition-all duration-300 whitespace-nowrap
                    ${isOpen ? "ml-3 w-auto opacity-100" : "w-0 opacity-0"}
                    `}>사용자 이름
                </span>
            </button>
        </div>
    )
}