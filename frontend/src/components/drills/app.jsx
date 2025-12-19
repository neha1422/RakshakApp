import React, { useState, useEffect } from "react";

// Example drill template (can later fetch from Firestore or LocalForage)
const exampleDrill = {
  id: "chemical-spill-001",
  name: "Chemical Spill Drill",
  steps: [
    { id: 1, instruction: "Alert your team and don PPE." },
    { id: 2, instruction: "Identify chemical type." },
    { id: 3, instruction: "Evacuate to safe area." },
    { id: 4, instruction: "Use containment measures if safe." },
    { id: 5, instruction: "Report status to admin." },
  ],
};

export default function DrillRunner({ drill = exampleDrill, onFinish }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (currentStep >= drill.steps.length) {
      setCompleted(true);
    }
  }, [currentStep, drill.steps.length]);

  const nextStep = () => {
    if (currentStep < drill.steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>{drill.name}</h1>

      {completed ? (
        <div style={styles.completed}>
          <p>✅ Drill Completed!</p>
          <button style={styles.button} onClick={onFinish}>
            Return to Dashboard
          </button>
        </div>
      ) : (
        <div style={styles.stepCard}>
          <p style={styles.stepIndicator}>
            Step {currentStep + 1} of {drill.steps.length}
          </p>
          <p style={styles.instruction}>{drill.steps[currentStep].instruction}</p>
          <div style={styles.buttonRow}>
            <button style={styles.navButton} onClick={prevStep} disabled={currentStep === 0}>
              Previous
            </button>
            <button style={styles.navButton} onClick={nextStep}>
              Next
            </button>
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
    maxWidth: "600px",
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
  },
  navButton: {
    padding: "10px 20px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    background: "#222",
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
