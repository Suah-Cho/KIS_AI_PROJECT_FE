import { IoSettingsSharp } from "react-icons/io5";
import { MdPerson } from "react-icons/md";

export type SettingsTabKey = "settings" | "account";

export default function SettingsSideTabs({
  value,
  onChange,
  className
}:{
  value: SettingsTabKey;
  onChange: (k: SettingsTabKey) => void;
  className?: string;
}) {
  return (
    <aside className={`w-36 shrink-0 ${className ?? ""}`}>
      <ul className="space-y-1">
        <li>
          <button
            className={`w-full text-left px-3 py-2 rounded-md text-sm inline-flex items-center gap-2 ${
              value==="settings"
                ? "bg-indigo-50 text-indigo-700 dark:text-indigo-900 dark:bg-indigo-100"
                : "hover:bg-gray-100 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            }`}
            onClick={() => onChange("settings")}
          >
            <IoSettingsSharp /> 설정
          </button>
        </li>
        <li>
          <button
            className={`w-full text-left px-3 py-2 rounded-md text-sm inline-flex items-center gap-2 ${
              value==="account"
                ? "bg-indigo-50 text-indigo-700 dark:text-indigo-900 dark:bg-indigo-100"
                : "hover:bg-gray-100 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            }`}
            onClick={() => onChange("account")}
          >
            <MdPerson /> 계정
          </button>
        </li>
      </ul>
    </aside>
  );
}