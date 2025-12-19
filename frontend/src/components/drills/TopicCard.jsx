// src/features/drills/TopicCard.jsx
import React from "react";
import { all_drills_timeline } from "./all_drills_timeline";

function formatTime(ts) {
  const d = new Date(ts);
  return isNaN(d.getTime()) ? String(ts) : d.toLocaleString();
}

export function TopicCard({ disaster_type }) {
  const key = (disaster_type || "").toString().toLowerCase();
  const drillsObj = all_drills_timeline[key] || {};
  const drills = Object.values(drillsObj).sort((a, b) => new Date(a.time_start) - new Date(b.time_start));

  return (
    <article className="topic-card" aria-label={`${disaster_type} topic card`}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h3 style={{ margin: 0 }}>{disaster_type}</h3>
          <p className="hint">{drills.length ? `${drills.length} scheduled` : "No drills scheduled"}</p>
        </div>
      </div>

      {drills.length === 0 ? (
        <p style={{ marginTop: 8 }}>No drills scheduled.</p>
      ) : (
        <div className="drills-list" style={{ marginTop: 8 }}>
          {drills.map((d, idx) => (
            <article key={d.drill_name + idx} className="drill-item" style={{ marginBottom: 8 }}>
              <h4 style={{ margin: "0 0 4px 0" }}>{d.drill_name}</h4>
              <div style={{ fontSize: 12, color: "#d3c7f9" }}>
                <div><strong>Type:</strong> {d.disaster_type}</div>
                <div><strong>Starts:</strong> {formatTime(d.time_start)}</div>
              </div>
            </article>
          ))}
        </div>
      )}
    </article>
  );
}
