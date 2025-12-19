// frontend/src/components/drills/drillResponses.jsx
import React, { useState, useEffect, useRef } from "react";
import { doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase"; // adjust path if your firebase client is elsewhere

// Example fallback drill (used if no drill or drillId provided)
const exampleDrill = {
  id: "chemical-spill-001",
  name: "Chemical Spill Drill",
  steps: [
    { id: "1", instruction: "Alert your team and don PPE." },
    { id: "2", instruction: "Identify chemical type." },
    { id: "3", instruction: "Evacuate to safe area." },
    { id: "4", instruction: "Use containment measures if safe." },
    { id: "5", instruction: "Report status to admin." },
  ],
};

/**
 * Props:
 *  - drill: optional object (complete drill)
 *  - drillId: optional string (if provided, component will fetch drill from Firestore)
 *  - onFinish: optional callback invoked when drill completes
 */
export default function DrillRunner({ drill: initialDrill = exampleDrill, drillId = null, onFinish = () => {} }) {
  const [drill, setDrill] = useState(initialDrill);
  const [loading, setLoading] = useState(Boolean(drillId));
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);

  // stepTimings holds objects { stepId, start: Date, end: Date|null, actionTaken }
  const stepTimingsRef = useRef([]);
  const startedAtRef = useRef(null);
  const responseDocIdRef = useRef(null); // keep if we need to update later (not used now)

  useEffect(() => {
    async function fetchDrill() {
      if (!drillId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const dref = doc(db, "drills", drillId);
        const snap = await getDoc(dref);
        if (!snap.exists()) {
          setError(`Drill "${drillId}" not found`);
        } else {
          const data = snap.data();
          // keep id
          setDrill({ id: snap.id, ...data });
        }
      } catch (err) {
        console.error("fetch drill error", err);
        setError("Failed to load drill");
      } finally {
        setLoading(false);
      }
    }
    fetchDrill();
  }, [drillId]);

  useEffect(() => {
    // mark completion
    if (!drill || !drill.steps) return;
    if (currentStep >= drill.steps.length) {
      setCompleted(true);
    } else {
      setCompleted(false);
    }
  }, [currentStep, drill]);

  // start the run: record startedAt and initial step timing when user first moves or presses start
  const ensureStarted = () => {
    if (!startedAtRef.current) {
      startedAtRef.current = new Date();
      // initiate first step timing
      const step = drill.steps[currentStep];
      stepTimingsRef.current.push({
        stepId: String(step.id ?? step.stepId ?? currentStep),
        start: new Date(),
        end: null,
        actionTaken: "no_response",
        actionDetail: null,
        note: null,
      });
    }
  };

  const nextStep = () => {
    ensureStarted();

    // mark end of current step timing
    const last = stepTimingsRef.current[stepTimingsRef.current.length - 1];
    if (last && !last.end) {
      last.end = new Date();
      if (last.actionTaken === "no_response") last.actionTaken = "marked_safe";
    }

    // add timing for next step if exists
    if (currentStep + 1 < drill.steps.length) {
      const next = drill.steps[currentStep + 1];
      stepTimingsRef.current.push({
        stepId: String(next.id ?? next.stepId ?? currentStep + 1),
        start: new Date(),
        end: null,
        actionTaken: "no_response",
        actionDetail: null,
        note: null,
      });
    }

    setCurrentStep((s) => Math.min(s + 1, drill.steps.length));
  };

  const prevStep = () => {
    if (currentStep === 0) return;
    // close current step timing
    const last = stepTimingsRef.current[stepTimingsRef.current.length - 1];
    if (last && !last.end) last.end = new Date();
    setCurrentStep((s) => Math.max(0, s - 1));
    // start a new timing for the previous step (optional) — here we will start a fresh timing
    const prev = drill.steps[currentStep - 1];
    stepTimingsRef.current.push({
      stepId: String(prev.id ?? prev.stepId ?? currentStep - 1),
      start: new Date(),
      end: null,
      actionTaken: "no_response",
      actionDetail: null,
      note: null,
    });
  };

  // user marks current step as safe / completed (explicit)
  const markSafe = () => {
    ensureStarted();
    const last = stepTimingsRef.current[stepTimingsRef.current.length - 1];
    if (last && !last.end) last.end = new Date();
    if (last) last.actionTaken = "marked_safe";
    nextStep();
  };

  // user requests help immediately — write a partial response with finalStatus "need_help"
  const requestHelp = async (note = null) => {
    try {
      ensureStarted();
      const last = stepTimingsRef.current[stepTimingsRef.current.length - 1];
      if (last && !last.end) last.end = new Date();
      if (last) {
        last.actionTaken = "need_help";
        last.note = note;
      }

      // create response doc in Firestore (partial)
      if (!drill?.id) {
        console.warn("cannot send help — missing drill id");
        return;
      }
      const responsesCol = collection(db, "drills", drill.id, "responses");
      const payload = {
        drillId: drill.id,
        userId: null, // client may set this if you have auth; left null for now or set from props/context
        schoolId: drill.schoolId || null,
        startedAt: serverTimestamp(),
        completedAt: null,
        finalStatus: "need_help",
        score: null,
        stepTimings: stepTimingsRef.current.map((s) => ({
          stepId: s.stepId,
          start: s.start ? s.start.toISOString() : null,
          end: s.end ? s.end.toISOString() : null,
          actionTaken: s.actionTaken,
          actionDetail: s.actionDetail || null,
          note: s.note || null,
        })),
        location: null,
        synced: true,
        createdAt: serverTimestamp(),
      };
      const docRef = await addDoc(responsesCol, payload);
      responseDocIdRef.current = docRef.id;
      // onCreate Cloud Function should pick this up and create an adminLog + send FCM
      // provide immediate UI feedback
      setCompleted(true);
      onFinish && onFinish({ drillId: drill.id, responseId: docRef.id, status: "need_help" });
    } catch (err) {
      console.error("requestHelp error", err);
      alert("Failed to send help request. Try again.");
    }
  };

  // when drill completes normally, write final response doc
  const finishDrill = async () => {
    try {
      ensureStarted();
      const last = stepTimingsRef.current[stepTimingsRef.current.length - 1];
      if (last && !last.end) last.end = new Date();
      // finalize stepTimings in simple serializable form
      const stepTimings = stepTimingsRef.current.map((s) => ({
        stepId: s.stepId,
        start: s.start ? s.start.toISOString() : null,
        end: s.end ? s.end.toISOString() : null,
        actionTaken: s.actionTaken || "marked_safe",
        actionDetail: s.actionDetail || null,
        note: s.note || null,
      }));

      if (!drill?.id) {
        // no drill id — this was an example run. just call onFinish
        setCompleted(true);
        onFinish && onFinish({ drillId: null, responseId: null, status: "safe", stepTimings });
        return;
      }

      const responsesCol = collection(db, "drills", drill.id, "responses");
      const payload = {
        drillId: drill.id,
        userId: null, // set to auth uid if you have auth (e.g., firebase auth)
        schoolId: drill.schoolId || null,
        startedAt: serverTimestamp(), // startedAtRef can be used if you prefer client-time
        completedAt: serverTimestamp(),
        finalStatus: "safe",
        score: null,
        stepTimings,
        location: null,
        synced: true,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(responsesCol, payload);
      responseDocIdRef.current = docRef.id;
      setCompleted(true);
      onFinish && onFinish({ drillId: drill.id, responseId: docRef.id, status: "safe" });
    } catch (err) {
      console.error("finishDrill error", err);
      alert("Failed to save drill result. Check network or try again.");
    }
  };

  // Render
  if (loading) {
    return <div style={styles.container}><div>Loading drill…</div></div>;
  }
  if (error) {
    return <div style={styles.container}><div style={{ color: "red" }}>{error}</div></div>;
  }

  // defensive: ensure drill and steps exist
  if (!drill || !Array.isArray(drill.steps) || drill.steps.length === 0) {
    return (
      <div style={styles.container}>
        <h1 style={styles.heading}>{drill?.name ?? "Drill"}</h1>
        <div style={styles.stepCard}>
          <p style={styles.instruction}>No steps defined for this drill.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>{drill.name}</h1>

      {completed ? (
        <div style={styles.completed}>
          <p>✅ Drill Completed!</p>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}>
            <button
              style={{ ...styles.button, background: "#28a745" }}
              onClick={() => {
                setCurrentStep(0);
                stepTimingsRef.current = [];
                startedAtRef.current = null;
                setCompleted(false);
                onFinish && onFinish({ drillId: drill.id, status: "completed" });
              }}
            >
              Run Again
            </button>
            <button style={styles.button} onClick={() => onFinish && onFinish({ drillId: drill.id, status: "done" })}>
              Return to Dashboard
            </button>
          </div>
        </div>
      ) : (
        <div style={styles.stepCard}>
          <p style={styles.stepIndicator}>
            Step {Math.min(currentStep + 1, drill.steps.length)} of {drill.steps.length}
          </p>

          <p style={styles.instruction}>{drill.steps[currentStep].instruction}</p>

          <div style={styles.buttonRow}>
            <div>
              <button style={styles.navButton} onClick={prevStep} disabled={currentStep === 0}>
                Previous
              </button>
              <button style={{ ...styles.navButton, marginLeft: 8 }} onClick={markSafe}>
                Mark Safe
              </button>
              <button style={{ ...styles.navButton, marginLeft: 8 }} onClick={nextStep}>
                Next
              </button>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                style={{ ...styles.needHelpButton }}
                onClick={() => {
                  const note = window.prompt("Optional note for help (e.g., 'smoke, trapped')") || null;
                  requestHelp(note);
                }}
              >
                Need Help
              </button>
              <button
                style={{ ...styles.finishButton }}
                onClick={() => {
                  if (window.confirm("Mark drill as completed and save results?")) {
                    finishDrill();
                  }
                }}
              >
                Finish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
  },
  heading: {
    fontSize: "26px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
  },
  stepCard: {
    background: "#f0f0f0",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  stepIndicator: {
    fontSize: "14px",
    marginBottom: "10px",
    color: "#555",
  },
  instruction: {
    fontSize: "18px",
    marginBottom: "20px",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  navButton: {
    padding: "10px 16px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    background: "#222",
    color: "#fff",
  },
  needHelpButton: {
    padding: "10px 14px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    background: "#dc3545",
    color: "#fff",
  },
  finishButton: {
    padding: "10px 14px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    background: "#007bff",
    color: "#fff",
  },
  completed: {
    textAlign: "center",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    background: "#007bff",
    color: "#fff",
    marginTop: "10px",
  },
};
