import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CLICK_COUNT_KEY,
  POINTS_KEY,
  getClickCount,
  getPoints,
  setClickCount,
  setPoints,
} from "../utils/clickStorage";

export function useClickStats() {
  const [count, setCount] = useState(() => getClickCount());
  const [points, setPts] = useState(() => getPoints());

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onStorage = (e) => {
      if (e.key === CLICK_COUNT_KEY) setCount(getClickCount());
      if (e.key === POINTS_KEY) setPts(getPoints());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const set = useCallback(
    (next) => {
      const c = next.count !== undefined ? next.count : count;
      const p = next.points !== undefined ? next.points : points;
      setCount(c);
      setPts(p);
      setClickCount(c);
      setPoints(p);
    },
    [count, points]
  );

  return useMemo(() => ({ count, points, set }), [count, points, set]);
}
