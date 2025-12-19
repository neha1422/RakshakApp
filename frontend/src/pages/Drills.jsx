import React, { useState } from "react";
import { DrillProvider } from "../components/drills/DrillContext";
import StudentDrillDashboard from "../components/drills/StudentDrillDashboard";
import TeacherDashboard from "../components/drills/TeacherDashboard";
import "../components/drills/drills.css";
import DrillRunner from "../components/drills/drill_runner";

export default function App() {
  const [isTeacherView, setIsTeacherView] = useState(false);

  return (
    <div className="drills-page">
      <DrillProvider>
        <main className="drills-container">
          <div className="drills-toolbar">
            <button
              className="toggle-btn"
              onClick={() => setIsTeacherView(prev => !prev)}
              aria-pressed={isTeacherView}
            >
              {isTeacherView ? "Switch to Student View" : "Switch to Teacher View"}
            </button>
          </div>

          <section className="drills-content">
            {isTeacherView ? <TeacherDashboard /> : <StudentDrillDashboard />}
          </section>
        </main>
      </DrillProvider>

      {/* optional runner mount — keep commented if you mount runner elsewhere */}
      {/* <DrillRunner /> */}
    </div>
  );
}
