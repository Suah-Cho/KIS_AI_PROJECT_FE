// import { useEffect } from "react";
import type { ModalProps, ModalSize } from "../../type/modal";

export default function DefaultModal({
    open, title, onClose, children, size = "md", panelClassName
}: ModalProps) {
    // useEffect(() => {
    //     if (!open) return;
    //     const onKey = (e: KeyboardEvent) => {
    //         if (e.key === "Escape") onClose();
    //     };
    //     document.addEventListener("keydown", onKey);
    //     return () => document.removeEventListener("keydown", onKey);
    // }, [open, onClose]);

    if (!open) return null;

    const sizeCls: Record<ModalSize, string> = {
        sm: "w-[440px] max-w-[92vw]",
        md: "w-[620px] max-w-[92vw]",
        lg: "w-[820px] max-w-[92vw]",
        xl: "w-[960px] max-w-[92vw]"
      };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div
            className={`relative ${panelClassName ?? sizeCls[size]} rounded-xl bg-white text-gray-900 shadow-xl border border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 max-h-[90vh] overflow-y-auto` }
            >
            <div className="flex items-center justify-between px-5 py-3 border-b">
                <h3 className="text-base font-semibold">{title ?? "설정"}</h3>
                <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-sm dark:text-gray-300 dark:hover:text-gray-300"  
                aria-label="닫기"
                >
                ✕
                </button>
            </div>
            <div className="p-5">{children}</div>
            </div>
        </div>
    )
}