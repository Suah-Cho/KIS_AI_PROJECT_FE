import { StrictMode } from 'react'
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'

// 앱 시작 시 스트리밍 속도 기본값 초기화
(() => {
  const NEW_KEY = "settings.streamSpeed";
  if (localStorage.getItem(NEW_KEY) == null) {
    const legacy = localStorage.getItem("streaming_speed");
    const raw = (legacy ?? "60").toString();
    const n = Number(raw.replace(/[^0-9.-]/g, ""));
    const ms = Number.isFinite(n) ? Math.max(0, n) : 60;
    localStorage.setItem(NEW_KEY, String(ms));
  }
})();

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
  
)
