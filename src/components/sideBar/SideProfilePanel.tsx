import { IoSettingsSharp } from "react-icons/io5";
import { MdLogout } from "react-icons/md";

export default function SideProfilePanel() {
    return (
        <div className="absolute bottom-14 left-2 w-48 bg-gray-700 text-white rounded shadow-lg p-2">
          <ul>
            <li className="flex items-center px-4 py-2 hover:bg-gray-600 cursor-pointer">
              <IoSettingsSharp className="mr-2"/>설정</li>
            <li className="flex items-center px-4 py-2 hover:bg-gray-600 cursor-pointer">
              <MdLogout className="mr-2" />로그아웃</li>
          </ul>
        </div>
      );
}