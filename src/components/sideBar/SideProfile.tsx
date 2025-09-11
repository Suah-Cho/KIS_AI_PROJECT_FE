import { FiUser } from "react-icons/fi";

export default function SideProfile(
    { isOpen, onClick, username } : { isOpen: boolean; onClick: () => void; username: string | null }
) {
    return (
        <div className="px-2 py-4 border-t border-gray-300 dark:border-gray-700">
            <button
                className={`flex items-center w-full hover:bg-gray-200 dark:hover:bg-gray-700 py-2 px-3 rounded transition-all duration-300
                    ${isOpen ? "justify-start" : "justify-center"}`}
                onClick={onClick}
                >
                <FiUser className="text-xl flex-shrink-0 text-black dark:text-white" />
                <span
                    className={`overflow-hidden transition-all duration-300 whitespace-nowrap text-black dark:text-white
                    ${isOpen ? "ml-3 w-auto opacity-100" : "w-0 opacity-0"}
                    `}>{username ?? "Guest"}
                </span>
            </button>
        </div>
    )
}