// src/features/drills/TeacherDashboard.jsx
import React, { useMemo } from "react";
import { useDrills } from "./DrillContext";

/**
 * TeacherDashboard — uses CSS classes from App.css for consistent styling
 */
export default function TeacherDashboard() {
  const { data } = useDrills();
  const now = new Date();

  const drills = useMemo(
    () =>
      Object.keys(data).flatMap((topic) =>
        (data[topic] || []).map((d) => ({ ...d, topic }))
      ),
    [data]
  );

  const fmt = (ts) => (ts ? new Date(ts).toLocaleString() : "-");

  return (
    <div className="teacher-panel">
      <div className="teacher-dashboard" role="region" aria-label="Teacher dashboard">
        <h2>Drill Analytics (Live)</h2>

        <div className="analytics-wrap" aria-hidden={drills.length === 0}>
          <table className="analytics-table" role="table" aria-label="Drill analytics table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Drill Name</th>
                <th>Topic</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Marked Safe Time</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {drills.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: 14 }}>No drills available.</td>
                </tr>
              ) : (
                drills.map((d) => {
                  const isMarked = !!d.marked_safe;
                  const isOngoing = !isMarked && new Date(d.completion_time) > now;
                  const rowClass = `${isOngoing ? "ongoing" : ""}${isMarked ? " marked" : ""}`.trim();
                  const statusLabel = isMarked ? "MARKED SAFE" : isOngoing ? "ONGOING" : "COMPLETED";

                  return (
                    <tr key={d.id} className={rowClass}>
                      <td>{d.id}</td>
                      <td>{d.title}</td>
                      <td style={{ textTransform: "capitalize" }}>{d.topic}</td>
                      <td>{fmt(d.startedAt)}</td>
                      <td>{fmt(d.completion_time)}</td>
                      <td>{d.marked_safe ? fmt(d.marked_safe) : "-"}</td>
                      <td>
                        <span
                          className={`drill-badge${isMarked ? " marked" : ""}`}
                          aria-label={`status-${statusLabel}`}
                        >
                          {statusLabel}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
