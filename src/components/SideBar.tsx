import { useState } from "react";
import { FiMenu, FiX, FiHome, FiUser, FiSettings} from "react-icons/fi";

export default function SideBar() {
    const [ isOpen, setIsOpen ] = useState(false);

    return (
        <div className="h-screen flex">
            {/* 햄버거 버튼 */}
            <button onClick={() => setIsOpen(true)} className="absolute top-4 left-4 z-20 p-2 bg-gray-800 text-while-rounded">
                <FiMenu size={24} />
            </button>

            {/* 오버레이 */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={() => setIsOpen(false)} />
            )}

            {/* Drawer 본체 */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform transition-transform duration-300 z-20 ${
                isOpen ? "translate-x-0" : "-translate-x-full"
                }`}>
                    
            </div>
        </div>
    )
}