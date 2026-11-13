import { editRecord, removeRecord } from '@/lib/cloud';
import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { FaSearch, FaTrash, FaFilter } from "react-icons/fa";
import "../AdminDashboard.css";

interface AlertRecord {
  id: string;
  timestamp: Date;
  emergency: string;
  message: string;
}

interface OutletContext {
  darkMode: boolean;
  alertHistory: AlertRecord[];
  setAlertHistory: React.Dispatch<React.SetStateAction<AlertRecord[]>>;
  clearAllAlerts: () => void;
}

export default function MassAlertHistory() {
  const { darkMode, alertHistory } = useOutletContext<OutletContext>();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEmergency, setFilterEmergency] = useState("All");
  const [filteredAlerts, setFilteredAlerts] = useState<AlertRecord[]>([]);

  // Get unique emergency types for filter dropdown
  const emergencyTypes = ["All", ...new Set(alertHistory.map(alert => alert.emergency))];

  // Filter alerts based on search term and emergency type
  useEffect(() => {
    let results = alertHistory;
    
    // Filter by emergency type
    if (filterEmergency !== "All") {
      results = results.filter(alert => alert.emergency === filterEmergency);
    }
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(alert => 
        alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.emergency.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort by timestamp (newest first)
    results = [...results].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    setFilteredAlerts(results);
  }, [alertHistory, searchTerm, filterEmergency]);

  const formatDate = (date: Date) => {
    return date.toLocaleString();
  };

  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const deleteAlert = async (id: string) => {
    setBusy(true);
    try { await removeRecord('alerts', id); } catch (e) { setError(e.message); } finally { setBusy(false); }
  };
  const updateAlert = async (id: string) => {
    const message = window.prompt('Updated alert message');
    if (!message?.trim()) return;
    setBusy(true);
    try { await editRecord('alerts', id, { message: message.trim() }); } catch (e) { setError(e.message); } finally { setBusy(false); }
  };

  return (
    <div className="massalert-history-container">
      <div className="history-header">
        <h2>Mass Alert History</h2>
        {error && <p role="alert">{error}</p>}
      </div>

      <div className="history-filters">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search alerts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-box">
          <FaFilter />
          <select
            value={filterEmergency}
            onChange={(e) => setFilterEmergency(e.target.value)}
          >
            {emergencyTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredAlerts.length > 0 ? (
        <div className="alerts-table-container">
          <table className="alerts-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Emergency Type</th>
                <th>Alert Message</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlerts.map(alert => (
                <tr key={alert.id}>
                  <td>{formatDate(alert.timestamp)}</td>
                  <td>
                    <span className="emergency-badge">{alert.emergency}</span>
                  </td>
                  <td className="alert-message">{alert.message}</td>
                  <td>
                    <button 
                      className="delete-alert-btn"
                      disabled={busy}
                      onClick={() => void deleteAlert(alert.id)}
                      title="Delete this alert"
                    >
                      <FaTrash />
                    </button>
                    <button disabled={busy} onClick={() => void updateAlert(alert.id)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-alerts">
          {alertHistory.length === 0 ? (
            <p>No alerts have been sent yet.</p>
          ) : (
            <p>No alerts match your search criteria.</p>
          )}
        </div>
      )}
    </div>
  );
}