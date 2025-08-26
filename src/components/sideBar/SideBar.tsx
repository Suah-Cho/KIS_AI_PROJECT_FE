import { useRef, useState } from "react";
import SideProfile from "./SideProfile";
import SideNewChat from "./SideNewChat";
import SideProfilePanel from "./SideProfilePanel";
import SideBarCategoryDropdown from "./SideBarCategoryDropdown";
import { TbCategoryFilled } from "react-icons/tb";

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
            {/* <SideBody isOpen={isOpen} /> */}

            {/* 카테고리 드롭다운*/}
            { isOpen && 
                (
                    <div className="px-2 py-4 border-b border-gray-700">
                        <div className="flex items-center px-2 py-2 text-sm">
                            <TbCategoryFilled className="mr-2" />
                            <span className="">카테고리 선택</span>
                        </div>
                        <SideBarCategoryDropdown />
                    </div>
                )
            }

            { isOpen && (
                <div className="px-4 py-4 text-sm text-gray-400">
                채팅 기록
                {/* 채팅 기록 컴포넌트 */}
            </div>
            ) }
            
            <div className="mt-auto relative" ref={panelRef}>
                {/* 하단 프로필 */}
                <SideProfile onClick={() => { setPanelOpen(!panelOpen)} } isOpen={isOpen}  />
                {/* 프로필 패널 */}
                {panelOpen && <SideProfilePanel />}
            </div>
        </div>
    )
}