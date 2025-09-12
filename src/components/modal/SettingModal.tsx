import { useState, useEffect, useRef } from "react";
import { applyTheme, getSavedTheme, previewTheme, type ThemeOption } from "../../utils/Thema";

export interface SettingsValues {
  speed: number;
  theme: ThemeOption;
}

export default function SettingsContent({
  initialSpeed = 0,
  initialTheme = "light",
  onApply,
  onClose
}:{
  initialSpeed?: number;
  initialTheme?: ThemeOption;
  onApply: (values: SettingsValues) => void;
  onClose: () => void;
}) {
  const [speed, setSpeed] = useState(initialSpeed);

  const saved = getSavedTheme();
  const openedThemeRef = useRef(saved);
  const [theme, setTheme] = useState<ThemeOption>(initialTheme);

  const DEFAULT_HOTKEY = "Ctrl+Shift+O";
  const [hotkey, setHotkey] = useState<string>(
    localStorage.getItem("shortcut.newChat") || DEFAULT_HOTKEY
  );
  const [recording, setRecording] = useState(false);

  // 속도 단계(-2..2)를 실제 지연(ms)로 변환하는 매핑
  const speedToDelayMs = (s: number): number => {
    switch (true) {
      case s <= -2: return 200;
      case s === -1: return 120;
      case s === 0: return 60; // 기본값 60ms
      case s === 1: return 30;
      case s >= 2: return 10;
      default: return 60;
    }
  };
  // 저장된 지연(ms)을 슬라이더 단계로 역매핑
  const delayMsToSpeed = (ms: number): number => {
    if (!Number.isFinite(ms)) return 0;
    if (ms <= 10) return 2;
    if (ms <= 30) return 1;
    if (ms <= 60) return 0;
    if (ms <= 120) return -1;
    return -2;
  };

  // 모달 오픈 시 저장값 로드(신규 키 우선, 구키 호환)
  useEffect(() => {
    const raw = (localStorage.getItem("settings.streamSpeed") ?? localStorage.getItem("streaming_speed") ?? "60").toString();
    const n = Number(raw.replace(/[^0-9.-]/g, ""));
    const ms = Number.isFinite(n) ? Math.max(0, n) : 60;
    setSpeed(delayMsToSpeed(ms));
  }, []);

  const toStep = (e: KeyboardEvent) => {
    const mods = [
      e.ctrlKey ? "Ctrl" : "",
      e.shiftKey ? "Shift" : "",
      e.altKey ? "Alt" : "",
      e.metaKey ? "Meta" : "",
    ].filter(Boolean);

    const key = (() => {
      const k = e.key;
      if (["Control", "Shift", "Alt", "Meta"].includes(k)) return "";
      if (k === " ") return "Space";
      const map: Record<string, string> = {
        Escape: "Esc",
        ArrowUp: "Up",
        ArrowDown: "Down",
        ArrowLeft: "Left",
        ArrowRight: "Right",
      };
      return map[k] ?? (k.length === 1 ? k.toUpperCase() : k);
    })();
  
    if (!key) return null;
    return [...mods, key].join("+");
  };

  // 단축키 기록(최대 3스텝, 스텝 간 900ms까지 허용)
  useEffect(() => {
    if (!recording) return;

    const MAX_STEPS = 3;
    const GAP_MS = 1500;

    let collected: string[] = [];
    let timer: number | null = null;

    const finish = () => {
      if (timer) {
        window.clearTimeout(timer);
        timer = null;
      }
      if (collected.length > 0) setHotkey(collected.join(" "));
      setRecording(false);
      localStorage.removeItem("shortcut.recording");
    };

    const armGapTimer = () => {
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(finish, GAP_MS) as unknown as number;
    };

    const onRecord = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.key === "Escape") {
        finish();
        return;
      }

      const step = toStep(e);
      if (!step) return; // 모디파이어만 누른 경우 무시

      collected = [...collected, step].slice(0, MAX_STEPS);
      if (collected.length >= MAX_STEPS) {
        finish();
      } else {
        armGapTimer();
      }
    };

    // 기록 중임을 전역에 알려, 다른 핫키 리스너가 무시하도록 할 때 사용 가능
    localStorage.setItem("shortcut.recording", "1");

    window.addEventListener("keydown", onRecord, true);
    armGapTimer(); // 첫 스텝 입력 대기 타이머

    return () => {
      window.removeEventListener("keydown", onRecord, true);
      if (timer) window.clearTimeout(timer);
      localStorage.removeItem("shortcut.recording");
    };
  }, [recording]);

  return (
    <>
      <div className="space-y-6">
      {/* 새 채팅 단축키 */}
      <section>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
          새 채팅 단축키
        </h3>
        <div className="flex items-center gap-3">
          <code className="px-2.5 py-1.5 rounded-md bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 text-xs">
            {hotkey}
          </code>
          <button
            type="button"
            onClick={() => setRecording(true)}
            disabled={recording}
            className={`px-2.5 py-1.5 text-xs rounded border ${
              recording
                ? "bg-yellow-50 border-yellow-200 text-yellow-700 dark:text-yellow-700"
                : "hover:bg-gray-50 border-gray-300 text-gray-700 dark:text-gray-200"
            }`}
            title="새 단축키 기록"
          >
            {recording ? "입력 대기 중… (ESC 취소)" : "새 단축키 기록"}
          </button>
          <button
            type="button"
            onClick={() => setHotkey(DEFAULT_HOTKEY)}
            className="px-2.5 py-1.5 text-xs rounded border hover:bg-gray-50 border-gray-300 text-gray-700 dark:text-gray-200"
          >
            기본값
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 dark:text-gray-200">
          예) Alt+Shift+P 또는 Ctrl+K Ctrl+S (최대 3스텝, 각 스텝 간 1.5초)
        </p>
      </section>

      {/* 스트리밍 속도 */}
      <section>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
          스트리밍 속도
        </h3>
        <input
          type="range"
          min={-2}
          max={2}
          value={speed}
          onChange={(e)=>setSpeed(Number(e.target.value))}
          className="w-full"
        />
        <p className="text-xs text-gray-500 mt-2 dark:text-gray-200">
          {(() => { const ms = speedToDelayMs(speed); return speed === 0 ? `Normal (${ms}ms)` : (speed > 0 ? `Fast x${speed} (${ms}ms)` : `Slow x${Math.abs(speed)} (${ms}ms)`); })()}
        </p>
      </section>

      {/* 테마 */}
      <section>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
          테마
        </h3>
        <div className="flex items-center gap-6 text-sm">
          <label className="flex items-center gap-1">
            <input type="radio" name="theme" checked={theme==="light"} onChange={() => { setTheme("light"); previewTheme("light"); applyTheme("light") }} /> Light
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" name="theme" checked={theme==="dark"} onChange={() => { setTheme("dark"); previewTheme("dark"); applyTheme("dark") }} /> Dark
          </label>
        </div>
      </section>

      {/* 하단 버튼 */}
      <div className="flex justify-end gap-2 pt-4">
        <button onClick={() => {
          const { option, customColor } = openedThemeRef.current;
          applyTheme(option, customColor);
          onClose();
        }} className="px-3 py-1.5 text-sm rounded border border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">
          닫기
        </button>
        <button
          onClick={() => {
            localStorage.setItem("shortcut.newChat", hotkey);
            const delayMs = speedToDelayMs(speed);
            localStorage.setItem("settings.streamSpeed", String(delayMs));
            onApply?.({ speed, theme });
            onClose();
          }}
          className="px-3 py-1.5 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-500 dark:bg-indigo-800 dark:hover:bg-indigo-700"
        >
          적용
        </button>
      </div>
    </div>
    </>
  );
}