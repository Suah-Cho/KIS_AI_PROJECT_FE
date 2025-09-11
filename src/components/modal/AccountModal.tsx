export default function AccountPanel() {
    const userId = localStorage.getItem("UserId") ?? "알 수 없음";
    const userName = localStorage.getItem("UserName") ?? "";
    return (
      <div className="space-y-4">
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-200">계정</div>
          <div className="mt-1 text-base font-medium text-gray-900 dark:text-gray-100">
            {userName ? `${userName} (${userId})` : userId}
          </div>
        </div>
        <div className="pt-2">
          <button
            className="px-3 py-1.5 text-sm rounded bg-rose-600 text-white hover:bg-rose-500"
          >
            로그아웃
          </button>
        </div>
      </div>
    );
  }