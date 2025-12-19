//drill_runner.jsx

import React, { useEffect, useMemo, useState, useRef } from "react";

/**
 * DrillRunner
 * Props:
 *  - drill: object (expects at least .id and .title or .name). Optional: drill.steps = [{id, instruction, durationSec, media, ...}, ...]
 *  - onFinish: callback when user finishes the drill
 *
 * Behavior:
 *  - If drill.steps is defined & non-empty, use it.
 *  - Else generate a small set of placeholder steps derived from drill.title.
 *  - Support step item as object with `instruction` or a plain string.
 */

function makePlaceholderSteps(drill) {
  const title = drill?.title || drill?.name || "Drill";
  // produce 3 sensible placeholder steps with short instructions
  return [
    { id: "s1", instruction: `${title} — Step 1: Read instructions and prepare.` },
    { id: "s2", instruction: `${title} — Step 2: Perform required action carefully.` },
    { id: "s3", instruction: `${title} — Step 3: Confirm completion and report.` },
  ];
}

function normalizeSteps(rawSteps, drill) {
  // If rawSteps is falsy -> generate placeholder
  if (!rawSteps || !Array.isArray(rawSteps) || rawSteps.length === 0) {
    return makePlaceholderSteps(drill);
  }

  // Map different shapes into { id, instruction, ... }
  return rawSteps.map((s, i) => {
    if (typeof s === "string") {
      return { id: `s${i + 1}`, instruction: s };
    }
    // object case; ensure instruction exists
    return {
      id: s.id ?? `s${i + 1}`,
      instruction: s.instruction ?? s.text ?? s.title ?? "No instruction provided",
      durationSec: typeof s.durationSec === "number" ? s.durationSec : undefined,
      media: s.media ?? null,
      choices: s.choices ?? null,
    };
  });
}

export default function DrillRunner({ drill = null, onFinish = () => {} }) {
  // determine steps to use (memoized)
  const steps = useMemo(() => normalizeSteps(drill?.steps, drill || {}), [drill]);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationState, setAnimationState] = useState('idle');
  const [showAnimation, setShowAnimation] = useState(false);
  const timerRef = useRef(null);
  const audioRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    // When drill changes, reset runner
    setCurrentStepIndex(0);
    setCompleted(false);
    setTimeRemaining(0);
    setIsTimerActive(false);
    setIsPlaying(false);
    setAnimationState('idle');
    setShowAnimation(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (animationRef.current) {
      clearInterval(animationRef.current);
      animationRef.current = null;
    }
  }, [drill?.id]);

  useEffect(() => {
    if (steps && currentStepIndex >= steps.length) {
      setCompleted(true);
      setIsTimerActive(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    } else {
      setCompleted(false);
    }
  }, [currentStepIndex, steps]);

  // Timer effect for current step
  useEffect(() => {
    if (completed || !steps || currentStepIndex >= steps.length) return;
    
    const currentStep = steps[currentStepIndex];
    if (currentStep?.durationSec) {
      setTimeRemaining(currentStep.durationSec);
      setIsTimerActive(true);
      
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsTimerActive(false);
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setTimeRemaining(0);
      setIsTimerActive(false);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [currentStepIndex, steps, completed]);

  // Audio functions
  const playAudio = (text) => {
    if (!isAudioEnabled || !text) return;
    
    // Use Web Speech API for text-to-speech
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const toggleAudio = () => {
    if (isAudioEnabled) {
      stopAudio();
    }
    setIsAudioEnabled(!isAudioEnabled);
  };

  // Animation functions
  const startAnimation = (stepType) => {
    setShowAnimation(true);
    setAnimationState('running');
    
    // Different animations based on step type
    switch(stepType) {
      case 'earthquake':
        setAnimationState('earthquake');
        break;
      case 'fire':
        setAnimationState('fire');
        break;
      case 'flood':
        setAnimationState('flood');
        break;
      default:
        setAnimationState('generic');
    }
    
    // Auto-stop animation after 3 seconds
    animationRef.current = setTimeout(() => {
      setAnimationState('idle');
      setShowAnimation(false);
    }, 3000);
  };

  const stopAnimation = () => {
    setAnimationState('idle');
    setShowAnimation(false);
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
  };

  // Play audio when step changes
  useEffect(() => {
    if (steps && currentStepIndex < steps.length && isAudioEnabled) {
      const currentStep = steps[currentStepIndex];
      if (currentStep?.instruction) {
        // Small delay to ensure UI is updated
        setTimeout(() => {
          playAudio(currentStep.instruction);
        }, 500);
      }
    }
  }, [currentStepIndex, steps, isAudioEnabled]);

  // Start animation when step changes
  useEffect(() => {
    if (steps && currentStepIndex < steps.length) {
      const currentStep = steps[currentStepIndex];
      if (currentStep?.instruction) {
        // Determine animation type based on instruction content
        const instruction = currentStep.instruction.toLowerCase();
        let animationType = 'generic';
        
        if (instruction.includes('drop') || instruction.includes('knees') || instruction.includes('earthquake')) {
          animationType = 'earthquake';
        } else if (instruction.includes('fire') || instruction.includes('smoke') || instruction.includes('evacuate')) {
          animationType = 'fire';
        } else if (instruction.includes('flood') || instruction.includes('water') || instruction.includes('higher ground')) {
          animationType = 'flood';
        }
        
        // Start animation after a short delay
        setTimeout(() => {
          startAnimation(animationType);
        }, 1000);
      }
    }
  }, [currentStepIndex, steps]);

  const nextStep = () => {
    if (currentStepIndex < steps.length) {
      // Clear current timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setIsTimerActive(false);
      stopAudio();
      stopAnimation();
      setCurrentStepIndex((s) => s + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      // Clear current timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setIsTimerActive(false);
      stopAudio();
      stopAnimation();
      setCurrentStepIndex((s) => s - 1);
    }
  };

  // Safe guards
  if (!drill) {
    return (
      <div className="drill-runner spd-banner">
        <h2 className="drill-runner-heading">No drill selected</h2>
        <p style={{ color: "var(--muted)" }}>Please select a drill from the list to begin.</p>
      </div>
    );
  }

  // show UI
  return (
    <div className="drill-runner spd-banner">
      <div className="drill-runner-header">
        <h1 className="drill-runner-heading">{drill.title ?? drill.name ?? "Drill"}</h1>
        <div className="audio-controls">
          <button 
            className={`btn btn-sm ${isAudioEnabled ? 'btn-primary' : 'btn-ghost'}`}
            onClick={toggleAudio}
            title={isAudioEnabled ? "Disable audio" : "Enable audio"}
          >
            {isAudioEnabled ? "🔊" : "🔇"}
          </button>
          {isPlaying && (
            <button 
              className="btn btn-sm btn-ghost"
              onClick={stopAudio}
              title="Stop audio"
            >
              ⏹️
            </button>
          )}
        </div>
      </div>

      {completed ? (
        <div className="drill-runner-completed">
          <p>✅ Drill Completed!</p>
          <button 
            className="btn btn-primary mark-safe"
            onClick={() => { onFinish && onFinish(); }}
          >
            Return to Dashboard
          </button>
        </div>
      ) : (
        <div className="step-card topic-card">
          <p className="step-indicator">
            Step {Math.min(currentStepIndex + 1, steps.length)} of {steps.length}
          </p>

          <div className="step-instruction-container">
            <p className="step-instruction">
              {steps[currentStepIndex]?.instruction ?? "No instruction available for this step."}
            </p>
            <div className="step-controls">
              {isAudioEnabled && (
                <button 
                  className="btn btn-sm btn-ghost audio-play-btn"
                  onClick={() => playAudio(steps[currentStepIndex]?.instruction)}
                  title="Replay audio instruction"
                >
                  {isPlaying ? "⏸️" : "▶️"}
                </button>
              )}
              <button 
                className="btn btn-sm btn-ghost animation-btn"
                onClick={() => startAnimation('generic')}
                title="Show animation"
              >
                🎬
              </button>
            </div>
          </div>

          {/* Timer display */}
          {steps[currentStepIndex]?.durationSec ? (
            <div className={`timer-display ${isTimerActive ? 'timer-active' : ''}`}>
              <div className="timer-header">
                <span>Step Duration:</span>
                <span className={`timer-count ${isTimerActive ? 'timer-active-text' : ''}`}>
                  {timeRemaining}s
                </span>
              </div>
              {isTimerActive && (
                <div className="timer-progress">
                  <div 
                    className="timer-progress-bar"
                    style={{
                      width: `${(timeRemaining / steps[currentStepIndex].durationSec) * 100}%`
                    }}
                  />
                </div>
              )}
            </div>
          ) : null}

          {/* Animation Display */}
          {showAnimation && (
            <div className={`animation-container ${animationState}`}>
              <div className="animation-content">
                {animationState === 'earthquake' && (
                  <div className="earthquake-animation">
                    <div className="person">🧑</div>
                    <div className="shake-effect">💥</div>
                    <div className="instruction-text">Drop, Cover, Hold!</div>
                  </div>
                )}
                {animationState === 'fire' && (
                  <div className="fire-animation">
                    <div className="person">🧑</div>
                    <div className="fire-effect">🔥</div>
                    <div className="instruction-text">Evacuate Calmly!</div>
                  </div>
                )}
                {animationState === 'flood' && (
                  <div className="flood-animation">
                    <div className="person">🧑</div>
                    <div className="water-effect">🌊</div>
                    <div className="instruction-text">Move to Higher Ground!</div>
                  </div>
                )}
                {animationState === 'generic' && (
                  <div className="generic-animation">
                    <div className="person">🧑</div>
                    <div className="action-effect">⚡</div>
                    <div className="instruction-text">Follow Instructions!</div>
                  </div>
                )}
              </div>
              <button 
                className="btn btn-sm btn-ghost stop-animation-btn"
                onClick={stopAnimation}
                title="Stop animation"
              >
                ⏹️
              </button>
            </div>
          )}

          {Array.isArray(steps[currentStepIndex]?.choices) ? (
            <div className="step-choices">
              <div className="choices-label">Choices:</div>
              <ul>
                {steps[currentStepIndex].choices.map((c) => (
                  <li key={c.id ?? c.text}>{c.text ?? c}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="button-row">
            <button 
              className={`btn btn-ghost ${currentStepIndex === 0 ? 'btn-disabled' : ''}`}
              onClick={prevStep} 
              disabled={currentStepIndex === 0}
            >
              Previous
            </button>
            <button 
              className={`btn ${isTimerActive ? 'btn-success' : 'btn-primary'}`}
              onClick={nextStep}
            >
              {isTimerActive ? "Next (Skip)" : "Next"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

