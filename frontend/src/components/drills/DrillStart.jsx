// frontend/src/components/drills/DrillStart.jsx
import React from "react";

export function DrillStart({ onStart }) {
  // simple presentational component with optional callback
  return (
    <div className="controls" role="group" aria-label="latest drill controls">
      <button
        className="btn btn-primary"
        onClick={() => {
          if (typeof onStart === "function") onStart();
        }}
      >
        Start Now
      </button>

      <div className="status" style={{ marginLeft: 12 }}>
        Status: <strong style={{ marginLeft: 6 }}>Ongoing</strong>
      </div>
    </div>
  );
}
