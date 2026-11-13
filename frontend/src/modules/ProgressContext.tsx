// src/modules/ProgressContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from '@/context/AuthContext';
import { useCloud } from '@/hooks/useCloud';
import { saveProgress } from '@/lib/cloud';
import { toast } from 'sonner';

interface ProgressContextType {
  completedModules: number[];
  completeModule: (id: number) => void;
  markComplete: (id: number) => void; // alias
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { schoolId } = useAuth();
  const { rows, error } = useCloud('learningProgress', true);
  const completedModules = rows.filter(r => r.completed).map(r => r.moduleId);

  const completeModule = (id: number) => {
    if (!schoolId) { toast.error('School assignment required.'); return; }
    void saveProgress(schoolId, id).catch(e => toast.error(e.message));
  };

  // alias for backwards compat / developer preference
  const markComplete = completeModule;


  return (
    <ProgressContext.Provider value={{ completedModules, completeModule, markComplete }}>
      {error && <p role="alert" className="p-3 text-red-600">Progress: {error}</p>}
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = (): ProgressContextType => {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress must be used inside a <ProgressProvider />");
  }
  return ctx;
};
