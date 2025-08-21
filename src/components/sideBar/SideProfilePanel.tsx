import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";

export default function SideProfilePanel() {
    return (
        <div className="absolute bottom-14 left-2 w-48 bg-gray-700 text-white rounded shadow-lg p-2">
          <ul>
            <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">설정</li>
            <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">로그아웃</li>
          </ul>
        </div>
      );
}