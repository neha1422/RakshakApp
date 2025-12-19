// //// src/features/drills/DrillContext.jsx

import React, { createContext, useState, useContext } from "react";
import { initialData as initial } from "./all_drills_timeline";

const DrillContext = createContext();

export function DrillProvider({ children }) {
  const [data, setData] = useState(initial);

  const markSafe = (topic, id) => {
    setData(prev => {
      const list = prev[topic] || [];
      const updatedList = list.map(d => {
        if (d.id === id) return { ...d, marked_safe: new Date().toISOString() };
        return d;
      });
      return { ...prev, [topic]: updatedList };
    });
  };

  const addDrill = (topic) => {
    const newDrill = {
      id: Math.floor(Math.random() * 1000000) + Date.now(),
      title: `New ${topic} Drill - ${new Date().toLocaleTimeString()}`,
      startedAt: new Date().toISOString(),
      completion_time: new Date(Date.now() + 1000 * 60 * 2).toISOString(),
      marked_safe: null,
    };
    setData(prev => ({ ...prev, [topic]: [newDrill, ...(prev[topic] || [])] }));
  };

  return (
    <DrillContext.Provider value={{ data, setData, markSafe, addDrill }}>
      {children}
    </DrillContext.Provider>
  );
}

export const useDrills = () => useContext(DrillContext);
