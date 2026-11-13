// src/features/drills/LatestDrill.jsx
import React, { useState, useRef } from "react";
import { DrillStart } from "./DrillStart";
import DrillRunner from "./drill_runner";
import { drillStepsData } from "./all_drills_data";

function capitalize(s) {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function LatestDrill({ latestDrill, onComplete }) {
  const startedAt = useRef(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentDrill, setCurrentDrill] = useState(null);

  const handleStart = () => {
    if (latestDrill) {
      // Get the drill data based on the topic
      const drillData = drillStepsData[latestDrill.topic];
      if (drillData) {
        setCurrentDrill(drillData);
        startedAt.current = Date.now();
        setIsRunning(true);
        // Call the original onStart callback if provided

      }
    }
  };

  const handleFinish = async () => {
    try { if (onComplete) await onComplete(Math.round((Date.now() - startedAt.current) / 1000)); } catch { return; }
    setIsRunning(false);
    setCurrentDrill(null);
  };

  // If drill is running, show ONLY the drill runner (full screen)
  if (isRunning && currentDrill) {
    return (
      <div style={{ 
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1000,
        background: "linear-gradient(180deg, #020617 0%, #051129 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <DrillRunner drill={currentDrill} onFinish={handleFinish} />
      </div>
    );
  }

  if (!latestDrill) {
    // case: no drills available
    return (
      <section className="spd-banner" aria-live="polite">
        <div>No drills yet</div>
      </section>
    );
  }

  // case: latest drill exists
  return (
    <section className="spd-banner" aria-live="polite">
      <div className="meta">
        {/* Left side: drill info */}
        <div className="left">
          <div className="label">Latest drill</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginTop: 6,
            }}
          >
            <h2 style={{ margin: 0 }}>{latestDrill.title}</h2>
            <span className="spd-badge">{capitalize(latestDrill.topic)}</span>
          </div>
          <div
            style={{
              marginTop: 6,
              color: "#cfc1ff",
              fontSize: 13,
            }}
          >
            Started {latestDrill.timeAgo}
          </div>
        </div>

        {/* Right side: button + status */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap", // wrap gracefully if screen too small
          }}
        >
          <DrillStart onStart={handleStart} />

          {/* Only show status from latestDrill */}
          {latestDrill.status && (
            <span
              className="status"
              aria-hidden
              style={{
                whiteSpace: "nowrap",
                fontSize: "14px",
              }}
            >
              Status:
              <strong style={{ marginLeft: 6 }}>{latestDrill.status}</strong>
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
