//Active_Drills.jsx
import React from "react";

export function Active_Drills({ active = [] }) {
  // Pass in active drills array if you have one; this is a presentational placeholder.
  return (
    <aside aria-live="polite" style={{ marginTop: 18 }}>
      <h3 style={{ margin: "0 0 8px 0", color: "#efe7ff" }}>Active drills</h3>
      {active.length === 0 ? (
        <div style={{ color: "#d7c8ff" }}>No active drills</div>
      ) : (
        <ul>
          {active.map((a) => (
            <li key={a.id}>{a.title} — {a.status}</li>
          ))}
        </ul>
      )}
    </aside>
  );
}
