export async function* localStreamFromText(text: string, delayMs = 0): AsyncGenerator<string> {
    // 필요 시 성능을 위해 2~3자씩 끊고 싶으면 chunkSize 조절
    const chunkSize = 1;
    for (let i = 0; i < text.length; i += chunkSize) {
      const piece = text.slice(i, i + chunkSize);
      if (delayMs > 0) await new Promise(r => setTimeout(r, delayMs));
      yield piece;
    }
  }
  export function getStreamSpeed(): number {
    // settings.streamSpeed(신규) 또는 streaming_speed(구키)에 저장된 ms 값을 그대로 사용
    const raw = (localStorage.getItem("settings.streamSpeed") ?? localStorage.getItem("streaming_speed") ?? "60").toString();
    const v = Number(raw.replace(/[^0-9.-]/g, ""));
    if (!Number.isFinite(v)) return 60;
    return Math.max(0, v);
  }