import { IoSettingsSharp } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DefaultModal from "../modal/DefaultModal";
import SettingsContent, { type SettingsValues } from "../modal/SettingModal";
import SettingsSideTabs, { type SettingsTabKey } from "../modal/SettingsSideTabs";
import AccountModal from "../modal/AccountModal";

export default function SideProfilePanel() {
  const navigate = useNavigate();
  const [openSettings, setOpenSettings] = useState(false);
  const [tab, setTab] = useState<SettingsTabKey>("settings");

  const [settings, setSettings] = useState<SettingsValues>({ speed: 3, theme: "light" });

  const onLogout = () => {
    // localStorage.removeItem("accessToken");
    // localStorage.removeItem("UserId");
    localStorage.clear();
    navigate("/login", { replace: true });
  }

  const onClickSettings = () => {
    setOpenSettings(true);
  }

  return (
    <>
      <div className="absolute bottom-14 left-2 w-48 bg-gray-200 text-gray-800 rounded shadow-lg p-2 dark:bg-gray-700 dark:text-white">
        <ul>
          <li onClick={onClickSettings} className="flex items-center px-4 py-2 hover:bg-gray-300 cursor-pointer dark:hover:bg-gray-600">
            <IoSettingsSharp className="mr-2"/>설정</li>
          <li onClick={onLogout} className="flex items-center px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer">
            <MdLogout className="mr-2" />로그아웃</li>
        </ul>
      </div>

      <DefaultModal open={openSettings} onClose={()=>setOpenSettings(false)} title="설정">
        <div className="flex gap-4 min-w-[560px]">
          <SettingsSideTabs value={tab} onChange={setTab} />

          <section className="flex-1">
            {tab === "settings" ? (
                <SettingsContent
                  initialSpeed={settings.speed}
                  initialTheme={settings.theme}
                  onClose={()=>setOpenSettings(false)}
                  onApply={(v)=>{
                    setSettings(v);
                    setOpenSettings(false);
                  }}
                />
              ) : (
                <AccountModal />
              )}
          </section>
        </div>
      </DefaultModal>
    </>
  );
}