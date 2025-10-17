import { useCallback, useEffect, useRef, useState } from "react";
import { useClickStats } from "../../hooks/useClickStats";
import Doge from "../../assets/doge.png";
import ClickSound from "../../assets/click-sfx.mp3"; 
import "./clickParticles.css";

export const ClickableImage = ({
  alt = "Doge",
  className = "",
  onStatsChange,
  pointsPerClick = 1,
  size = "w-128 h-128",
  enableSound = true,
  soundSrc = ClickSound,
  volume = 0.35, 
}) => {
  const { count, points, set } = useClickStats();
  const [particles, setParticles] = useState([]);
  const idRef = useRef(0);
  const containerRef = useRef(null);

  const SOUND_POOL_SIZE = 6;
  const poolRef = useRef([]);
  const soundIndexRef = useRef(0);

  useEffect(() => {
    if (!enableSound) return;

    poolRef.current = Array.from({ length: SOUND_POOL_SIZE }, () => {
      const a = new Audio(soundSrc);
      a.preload = "auto";
      a.volume = volume;
      return a;
    });

    return () => {
      poolRef.current.forEach((a) => {
        try {
          a.pause();
          a.src = "";
        } catch {}
      });
      poolRef.current = [];
    };
  }, [soundSrc, volume, enableSound]);

  const playClickSound = useCallback(() => {
    if (!enableSound || poolRef.current.length === 0) return;
    const i = soundIndexRef.current++ % poolRef.current.length;
    const a = poolRef.current[i];
    try {
      a.currentTime = 0;
      a.volume = volume;
      a.play?.();
    } catch {
    }
  }, [enableSound, volume]);

  const spawnParticles = useCallback((x, y, count = 14) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const localX = x - rect.left;
    const localY = y - rect.top;

    const newOnes = Array.from({ length: count }).map(() => {
      const id = idRef.current++;
      const angle = Math.random() * Math.PI * 2;
      const distance = rect.width * (0.25 + Math.random() * 0.35);
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      const size = 5 + Math.random() * 6;
      const dur = 450 + Math.random() * 350;
      const delay = Math.random() * 40;

      return { id, dx, dy, size, dur, delay, x: localX, y: localY };
    });

    setParticles((prev) => [...prev, ...newOnes]);
    newOnes.forEach((p) =>
      setTimeout(
        () => setParticles((prev) => prev.filter((x) => x.id !== p.id)),
        p.dur + p.delay + 20
      )
    );
  }, []);

  const handleClick = useCallback(
    (e) => {
      const next = { count: count + 1, points: points + pointsPerClick };
      set(next);
      onStatsChange?.(next);
      playClickSound();
      spawnParticles(e.clientX, e.clientY);
    },
    [count, points, pointsPerClick, set, onStatsChange, playClickSound, spawnParticles]
  );

  return (
    <div className={`inline-flex flex-col items-center gap-2 ${className}`}>
      <div className="relative" style={{ lineHeight: 0 }}>
        <div
          ref={containerRef}
          onClick={handleClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleClick(e)}
          className={`
            ${size} rounded-full overflow-hidden cursor-pointer
            transition-transform active:scale-95
            focus:outline-none focus-visible:ring focus-visible:ring-offset-2
          `}
          aria-label={alt}
        >
          <img
            src={Doge}
            alt={alt}
            draggable={false}
            className="w-full h-full object-cover select-none"
          />
        </div>

        <div className="pointer-events-none absolute inset-0">
          {particles.map((p) => (
            <span
              key={p.id}
              className="doge-particle"
              style={{
                left: `${p.x - p.size / 2}px`,
                top: `${p.y - p.size / 2}px`,
                width: p.size,
                height: p.size,
                "--dx": `${p.dx}px`,
                "--dy": `${p.dy}px`,
                "--dur": `${p.dur}ms`,
                "--delay": `${p.delay}ms`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="text-sm font-medium tabular-nums text-gray-700 flex gap-3">
        <span title="Total Clicks">Clicks: {count}</span>
        <span title="Total Points">Points: {points}</span>
      </div>
    </div>
  );
};
