import React, { useState, useMemo, useEffect } from "react";
import { Header } from "./Header";
import { LatestDrill } from "./LatestDrill";
import { Active_Drills } from "./Active_Drills";
import { useDrills } from "./DrillContext";
import { useAuth } from "@/context/AuthContext";
// import "./App.css";

export default function StudentDrillDashboard() {
  const { data, addDrill, markSafe, busy } = useDrills();
  const { role } = useAuth();
  const [selectedTopic, setSelectedTopic] = useState(null);

  function timeAgo(iso) {
    const diff = Date.now() - new Date(iso).getTime();
    const sec = Math.floor(diff / 1000);
    if (sec < 60) return `${sec}s ago`;
    const min = Math.floor(sec / 60);
    if (min < 60) return `${min}m ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h ago`;
    const day = Math.floor(hr / 24);
    return `${day}d ago`;
  }

  function openTopic(t) {
    setSelectedTopic(prev => (prev === t ? null : t));
  }

  const topics = [
    { key: "earthquake", label: "Earthquake", hint: "Drop • Cover • Hold On" },
    { key: "flood", label: "Flood", hint: "Move to higher ground" },
    { key: "fire", label: "Fire", hint: "Evacuate calmly" },
  ];

  const latestDrill = useMemo(() => {
    const all = Object.values(data).flat();
    if (!all.length) return null;
    all.sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt));
    const top = all[0];
    return { ...top, topic: Object.keys(data).find(k => data[k].some(d => d.id === top.id)), timeAgo: timeAgo(top.startedAt) };
  }, [data]);

  // Auto-close empty topic
  useEffect(() => {
    if (!selectedTopic) return;
    const list = data[selectedTopic];
    if (!list || list.length === 0) setSelectedTopic(null);
  }, [data, selectedTopic]);

  return (
    <div className="spd-root" role="main">
      <div className="spd-container">
        <Header />
        <LatestDrill latestDrill={latestDrill} onComplete={duration => markSafe(latestDrill.topic, latestDrill.id, duration)} />

        <section className="topic-grid" aria-label="topic grid">
          {topics.map(t => {
            const visibleDrills = (data[t.key] || []).filter(
              d => !d.marked_safe && new Date(d.completion_time) > new Date()
            );

            return (
              <article
                key={t.key}
                className="topic-card"
                onClick={() => openTopic(t.key)}
                aria-expanded={selectedTopic === t.key}
                aria-controls={`drill-list-${t.key}`}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h3>{t.label}</h3>
                    <p className="hint">{t.hint}</p>
                  </div>
                  <div style={{ textAlign: "right", color: "#d8cfff" }}>
                    <div>{visibleDrills.length} drills</div>
                    <div style={{ marginTop: 8, fontSize: 12 }}>
                      Latest: {visibleDrills.length ? timeAgo(visibleDrills[0].startedAt) : "—"}
                    </div>
                  </div>
                </div>

                {role !== "student" && <div className="topic-actions">
                  <button
                    disabled={busy} className="btn btn-primary btn-sm"
                    onClick={e => {
                      e.stopPropagation();
                      addDrill(t.key);
                    }}
                  >
                    Schedule Drill
                  </button>
                </div>}

                {selectedTopic === t.key && (
                  <div id={`drill-list-${t.key}`} className="drill-list">
                    <h4 style={{ margin: "0 0 10px 0", color: "#efe7ff" }}>Drills (latest → oldest)</h4>
                    {visibleDrills.map(d => (
                      <div key={d.id} className="drill-item">
                        <div>
                          <div className="drill-title">#{d.id} {d.title}</div>
                          <div className="drill-meta">{timeAgo(d.startedAt)}</div>
                        </div>
                        <div>
                          <button disabled={busy} className="mark-safe" onClick={() => void markSafe(t.key, d.id).catch(() => {})}>Mark Safe</button>
                        </div>
                      </div>
                    ))}
                    {visibleDrills.length === 0 && <div style={{ color: "#d7c8ff" }}>No drills yet for {t.label}.</div>}
                  </div>
                )}
              </article>
            );
          })}
        </section>

        <Active_Drills active={Object.values(data).flat().filter(d => !d.marked_safe && new Date(d.completion_time) > new Date())} />
      </div>
    </div>
  );
}
