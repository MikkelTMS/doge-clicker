export const CLICK_COUNT_KEY = "clickableImage:count";
export const POINTS_KEY = "clickableImage:points";

const safeLocalStorage = {
  get(key, fallback = 0) {
    if (typeof window === "undefined") return fallback;
    const raw = window.localStorage.getItem(key);
    const num = Number(raw);
    return Number.isFinite(num) ? num : fallback;
  },
  set(key, value) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, String(value));
  },
};

export const getClickCount = () => safeLocalStorage.get(CLICK_COUNT_KEY, 0);
export const getPoints = () => safeLocalStorage.get(POINTS_KEY, 0);
export const setClickCount = (n) => safeLocalStorage.set(CLICK_COUNT_KEY, n);
export const setPoints = (n) => safeLocalStorage.set(POINTS_KEY, n);
export const resetClickStats = () => {
  setClickCount(0);
  setPoints(0);
};
