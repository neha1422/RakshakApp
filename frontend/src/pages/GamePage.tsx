import React, { useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";

const GamePage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadGame = async () => {
      const { initGame } = await import("../game/main.js");
      if (containerRef.current) initGame(containerRef.current);
    };
    loadGame();
  }, []);

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
        width: "1024px",
        height: "768px",
        transform: "translate(+130px,+40px)",// shift left or right
      }}
    />
  </div>
    </div>
  );
};

export default GamePage;