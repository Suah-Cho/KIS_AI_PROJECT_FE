import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from "react-router-dom";
import ChatWindow from "./components/chat/ChatWindow";
import Login from "./components/login/Login";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { initTheme } from "./utils/Thema";

function App() {
  // console.log(!!localStorage.getItem("accessToken"))
  const isLoggedIn = !!localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    const off = initTheme();
    return off;
  }, []);

  useEffect(() => {
    const toStep = (e: KeyboardEvent) => {
      const mods = [e.ctrlKey && "Ctrl", e.shiftKey && "Shift", e.altKey && "Alt", e.metaKey && "Meta"]
        .filter(Boolean) as string[];
      const k = (() => {
        const key = e.key;
        if (["Control","Shift","Alt","Meta"].includes(key)) return "";
        if (key === " ") return "Space";
        const map: Record<string,string> = { Escape:"Esc", ArrowUp:"Up", ArrowDown:"Down", ArrowLeft:"Left", ArrowRight:"Right" };
        return map[key] ?? (key.length===1 ? key.toUpperCase() : key);
      })();
      const step = [...mods, k].filter(Boolean).join("+");
      return step || null;
    };
  
    const ignoreTarget = (t: EventTarget | null) => {
      if (!(t instanceof HTMLElement)) return false;
      const tag = t.tagName.toLowerCase();
      return tag === "input" || tag === "textarea" || t.isContentEditable;
    };
  
    let idx = 0;
    let timer: number | null = null;
    const GAP_MS = 900;
    const reset = () => { idx = 0; if (timer) { clearTimeout(timer); timer = null; } };
    const arm = () => { if (timer) clearTimeout(timer); timer = window.setTimeout(reset, GAP_MS) as unknown as number; };
  
    const onKey = (e: KeyboardEvent) => {
      if (localStorage.getItem("shortcut.recording") === "1") return;
      if (ignoreTarget(e.target)) return;
  
      const hk = (localStorage.getItem("shortcut.newChat") || "Ctrl+Shift+O").trim();
      const steps = hk.split(" ").filter(Boolean);
      if (steps.length === 0) return;
  
      const step = toStep(e);
      if (!step) return;
  
      if (step === steps[idx]) {
        e.preventDefault();
        e.stopPropagation();
        idx++;
        if (idx === steps.length) {
          reset();
          // 동일 경로여도 렌더 변화를 주기 위해 쿼리 추가
          navigate("/", { replace: false, state: { newChat: Date.now() } });
        } else {
          arm();
        }
      } else {
        reset();
        if (step === steps[0]) {
          e.preventDefault();
          e.stopPropagation();
          idx = 1;
          arm();
        }
      }
    };
  
    window.addEventListener("keydown", onKey, true); // 캡처 단계
    return () => { window.removeEventListener("keydown", onKey, true); reset(); };
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-neutral-900 dark:text-gray-100 transition-colors">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={isLoggedIn ? <ChatWindow /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />} />
      </Routes>

      <Toaster
        position="bottom-right"
        gutter={12}
        toastOptions={{
          duration: 4500,
          style: {
            background: "rgba(30,34,42,0.88)",
            color: "#f1f5f9",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: "18px",
            padding: "14px 18px",
            boxShadow: "0 6px 28px -6px rgba(0,0,0,0.55)",
            fontSize: "0.95rem",
            lineHeight: "1.35",
            minWidth: "320px",
            maxWidth: "420px"
          },
          success: { iconTheme: { primary: "#4ade80", secondary: "#0f172a" } },
          error:   { iconTheme: { primary: "#f87171", secondary: "#0f172a" } }
        }}
      />
    </div>
  );
}

export default App;
