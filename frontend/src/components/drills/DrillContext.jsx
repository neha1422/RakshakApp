import React, { createContext, useContext, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCloud } from '@/hooks/useCloud';
import { create, db } from '@/lib/cloud';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'sonner';
const DrillContext = createContext();
export function DrillProvider({ children }) {
  const { user, schoolId, role } = useAuth();
  const { rows, error } = useCloud('drills');
  const { rows: results, error: resultsError } = useCloud('drillResults', role === 'student');
  const [busy, setBusy] = useState(false);
  const data = { earthquake: [], flood: [], fire: [] };
  rows.forEach(r => { (data[r.topic] ||= []).push({ ...r, marked_safe: results.find(x => x.drillId === r.id && x.userId === user?.uid)?.completedAt }); });
  async function addDrill(topic) {
    if (!schoolId || role === 'student') return;
    setBusy(true);
    try { await create('drills', schoolId, { topic, title: `${topic} school drill`, startedAt: new Date().toISOString(), completion_time: new Date(Date.now() + 120000).toISOString() }); }
    catch (e) { toast.error(e.message); } finally { setBusy(false); }
  }
  async function markSafe(topic, id, durationSeconds) {
    const drill = rows.find(r => r.id === id);
    if (!drill || !schoolId || !user) return;
    setBusy(true);
    try { await setDoc(doc(db, 'drillResults', `${user.uid}_${id}`), { schoolId, userId: user.uid, drillId: id, completedAt: new Date().toISOString(), durationSeconds: Math.min(86400, Math.max(0, durationSeconds ?? Math.round((Date.now() - new Date(drill.startedAt).getTime()) / 1000))), createdAt: serverTimestamp(), updatedAt: serverTimestamp() }); }
    catch (e) { toast.error(e.message); throw e; } finally { setBusy(false); }
  }
  return <DrillContext.Provider value={{ data, results, markSafe, addDrill, busy }}>{(error || resultsError) && <p role="alert">{error || resultsError}</p>}{children}</DrillContext.Provider>;
}
export const useDrills = () => useContext(DrillContext);
