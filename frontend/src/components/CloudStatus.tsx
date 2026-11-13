import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
export function CloudStatus() {
  const { user, schoolId, authError } = useAuth();
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const change = () => setOnline(navigator.onLine);
    window.addEventListener('online', change); window.addEventListener('offline', change);
    return () => { window.removeEventListener('online', change); window.removeEventListener('offline', change); };
  }, []);
  const text = authError || (!online ? 'You are offline. Cloud changes may be pending; do not treat them as confirmed.' : user && !schoolId ? 'Your account needs a school assignment from the project administrator. Learning content remains available.' : '');
  return text ? <div role="status" className="p-3 bg-yellow-100 text-slate-900">{text}</div> : null;
}
