import { useAuth } from '@/context/AuthContext';
import { useCloud } from '@/hooks/useCloud';
import { create } from '@/lib/cloud';
import { SchoolAdminTools } from '@/components/SchoolAdminTools';
import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import {
  BsPeopleFill,
 BsFileEarmarkTextFill,
  BsFillBellFill,
  BsMoon,
  BsSun
} from "react-icons/bs";
import "../AdminDashboard.css";
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

interface AlertRecord {
  id: string;
  timestamp: Date;
  emergency: string;
  message: string;
}

interface AdminDashboardProps {
  alerts: AlertRecord[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ alerts: initialAlerts }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { schoolId, role } = useAuth();
  const { rows: alerts, error: alertError } = useCloud('alerts');
  const { rows: results, error: resultError } = useCloud('quizResults');
  const alertHistory = alerts.map(r => ({ ...r, timestamp: r.createdAt?.toDate() || new Date(0) }));
  const average = results.length ? Math.round(results.reduce((n, r) => n + r.percent, 0) / results.length) : 0;

  const location = useLocation();
  const isMassAlertsPage = location.pathname.includes("/dashboard/admin/alerts");
  const isHistoryPage = location.pathname.includes("/dashboard/admin/alerts/history");


  useEffect(() => {
    document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(darkMode ? "dark-theme" : "light-theme");
  }, [darkMode]);

  const incrementAlertCount = async (emergency: string, message: string) => {
    if (!schoolId) throw new Error('School assignment required');
    await create('alerts', schoolId, { emergency, message: message.trim(), active: true });
  };

  const toggleSidebar = () => setOpenSidebar(!openSidebar);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const preparednessData = Object.entries(results.reduce((groups, r) => { const key = `Module ${r.quizId}`; (groups[key] ||= []).push(r.percent); return groups; }, {} as Record<string, number[]>)).map(([label, scores]) => ({ class: label, score: Math.round(scores.reduce((a,b) => a+b, 0) / scores.length) }));

  return (
    <div className="grid-container">
      <Sidebar openSidebarToggle={openSidebar} OpenSidebar={toggleSidebar} darkMode={darkMode} />

      <header className="header">
        <span className="menu-icon" onClick={toggleSidebar}>☰</span>
        <h1>Admin Dashboard</h1>
        <button className="darkmode-toggle" onClick={toggleDarkMode}>
          {darkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
        </button>
      </header>

      <main className="main-container">
        <p>Live statistics from the latest 100 school records per collection.</p>
        {(alertError || resultError) && <p role="alert">{alertError || resultError}</p>}
        <SchoolAdminTools />
        {!isMassAlertsPage && !isHistoryPage && (
          <>
            <div className='main-title'>
              <h3>Welcome, Head Faculty!</h3>
            </div>
            <div className='main-cards'>
              <div className='card'>
                <div className='card-inner'>
                  <h3>AVERAGE PREPAREDNESS</h3>
                  <BsPeopleFill className='card_icon'/>
                </div>
                <h1>{average}%</h1>
              </div>
              <div className='card'>
                <div className='card-inner'>
                  <h3>QUIZ ATTEMPTS</h3>
                  <BsFileEarmarkTextFill className='card_icon'/>
                </div>
                <h1>{results.length}</h1>
              </div>
              <div className='card'>
                <div className='card-inner'>
                  <h3>MASS ALERTS</h3>
                  <BsFillBellFill className='card_icon'/>
                </div>
                <h1>{alerts.length}</h1>
              </div>
            </div>

            <div className="charts-row">
              <div className="chart-box">
                <h4 className="chart-title">AVERAGE QUIZ SCORE BY MODULE</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={preparednessData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="class" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
        {/* Pass the functions, darkMode state, and alertHistory to the Outlet */}
        <Outlet context={{ 
            incrementAlertCount, 
            darkMode, 
            alertHistory, alerts, results, average, schoolId,

        }} />
        
      </main>
    </div>
  );
};

export default AdminDashboard;
