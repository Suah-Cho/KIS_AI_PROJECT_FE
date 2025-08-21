import { useRef, useState } from "react";
import { FiMenu, FiX, FiHome, FiUser, FiSettings} from "react-icons/fi";
import { HiPencilSquare } from "react-icons/hi2";
import SideProfile from "./sideProfile";
import SideBody from "./sideBody";
import SideNewChat from "./sideNewChat";
import SideProfilePanel from "./SideProfilePanel";
import SideBarCategoryDropdown from "./SideBarCategoryDropdown";

export default function SideBar({
    isOpen, onToggle, onNewChat
}: {
    isOpen: boolean;
    onToggle: () => void;
    onNewChat: () => void;
}) {
    const [panelOpen, setPanelOpen] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);

    return (
        <div
            className={`bg-gray-800 text-white h-screen transition-all duration-300
                flex flex-col
                ${isOpen ? "w-64" : "w-14"
            }`}
            >
            {/* 상단 헤더 */}
            <SideNewChat
                isOpen={isOpen}
                onNewChat={onNewChat}
                onToggle={onToggle}
            />

            {/* 메뉴 목록 */}
            <SideBody isOpen={isOpen} />

            {/* 카테고리 드롭다운*/}
            <div className="px-2 py-4">
                <SideBarCategoryDropdown />
            </div>
            
            <div className="mt-auto relative" ref={panelRef}>
                {/* 하단 프로필 */}
                <SideProfile onClick={() => { setPanelOpen(!panelOpen)} } isOpen={isOpen}  />
                {/* 프로필 패널 */}
                {panelOpen && <SideProfilePanel />}
            </div>
        </div>
    )
}