import { useAuth } from '@/context/AuthContext';
import { create } from '@/lib/cloud';
import { toast } from 'sonner';
import React, { useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";

const GamePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { schoolId } = useAuth();

  useEffect(() => {
    let cancelled = false;
    let instance: { destroy: () => void } | undefined;
    const loadGame = async () => {
      const { initGame } = await import("../game/main.js");
      if (!cancelled && containerRef.current) instance = initGame(containerRef.current, result => {
        if (schoolId) void create("gameProgress", schoolId, { ...result, gameId: "disaster-quest", badge: result.score === result.total ? "safety-star" : "completed" }).catch(e => toast.error(e.message));
      });
    };
    void loadGame().catch(e => toast.error(e.message));
    return () => { cancelled = true; instance?.destroy(); };
  }, [schoolId]);

  return (
    <div className="relative min-h-screen bg-black flex flex-col">
      {/* Back Button top-right */}
      <button
        onClick={() => navigate("/dashboard")}
        className="absolute top-6 right-6 z-50 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        ← Back to Dashboard
      </button>
      {/* Outer container centers the game */}
   <div
    style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexGrow: 1, // fill remaining height
    }}
  >
    {/* Game container slightly shifted to center */}
    <div
      ref={containerRef}
      style={{
        width: "min(100%, 1024px)",
        minHeight: "600px",
        overflowX: "auto",// shift left or right
      }}
    />
  </div>
    </div>
  );
};

export default GamePage;