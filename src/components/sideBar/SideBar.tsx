import { useEffect, useRef, useState } from "react";
import SideProfile from "./SideProfile";
import SideNewChat from "./SideNewChat";
import SideProfilePanel from "./SideProfilePanel";
import SideBarCategoryDropdown from "./SideBarCategoryDropdown";
import { TbCategoryFilled } from "react-icons/tb";
import SideChatHistory from "./SideChatHistory";
import { type CategoryOption } from "../../constants/categories";
import { GetUserInfo } from "../../api/user";
import { deleteLLMChatAll } from "../../api/llm";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SideBar({
    isOpen, onToggle, onNewChat, categoryValue, onCategoryChange
}: {
    isOpen: boolean;
    onToggle: () => void;
    onNewChat: () => void;
    categoryValue: CategoryOption;
    onCategoryChange: (value: CategoryOption) => void;
}) {
    const [ panelOpen, setPanelOpen ] = useState(false);
    const [ username, setUsername ] = useState<string | null>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const run = async () => {
            const userId = localStorage.getItem("UserId");

            if (!userId) {
                return;
            }

            try {
                const resp = await GetUserInfo(userId);
                setUsername(resp.data.data.username);

            } catch (error) {
                console.error("Get User Info Error:", error);
            }
        };
        run();
    }, [])

    const handleClearAll = async () => {
        const userId = localStorage.getItem("UserId") || "";
        const resp = await deleteLLMChatAll(userId);

        if (resp.status != 200) {
            alert("채팅 삭제에 실패했습니다.");
            // loadHistory();
            return;
          }
        console.log(resp)
        toast.success(`모두 ${resp.data.data.chat_count} 채팅 기록이 삭제되었습니다.`);
        navigate("/", { replace: false, state: { cleared: Date.now() } });
    }

    return (
        <div
            className={`h-screen transition-all duration-300 flex flex-col bg-gray-100 text-black dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700
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
                    <div className="px-2 py-4 border-b border-gray-300 dark:border-gray-700">
                        <div className="flex items-center px-2 py-2 text-sm text-black dark:text-white">
                            <TbCategoryFilled className="mr-2" />
                            <span>카테고리 선택</span>
                        </div>
                        <SideBarCategoryDropdown categoryValue={categoryValue} onCategoryChange={onCategoryChange}/>
                    </div>
                )
            }

            {isOpen && (
                    <div className="px-4 py-4 text-sm text-gray-800 dark:text-gray-400">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="font-medium text-gray-900 dark:text-gray-100">채팅 기록</span>
                        <button
                        type="button"
                        onClick={handleClearAll}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs text-gray-800 hover:text-red-600 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-red-600 transition-colors"
                        title="전체 기록 삭제"
                        >
                        {/* <FiTrash2 className="text-sm" /> */}
                        전체 삭제
                        </button>
                    </div>
                    {/* 채팅 기록 컴포넌트 */}
                    <SideChatHistory />
                    </div>
                )}
            
            <div className="mt-auto relative" ref={panelRef}>
                {/* 하단 프로필 */}
                <SideProfile username={username} onClick={() => { setPanelOpen(!panelOpen)} } isOpen={isOpen}  />
                {/* 프로필 패널 */}
                {panelOpen && <SideProfilePanel />}
            </div>
        </div>
    )
}