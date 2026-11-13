import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { FaDownload } from "react-icons/fa";
import "../AdminDashboard.css";
import jsPDF from "jspdf";
import { CloudRecord } from '@/lib/cloud';

interface AlertRecord {
  id: string;
  timestamp: Date;
  emergency: string;
  message: string;
}

interface OutletContext {
  darkMode: boolean;
  alertHistory: AlertRecord[];
  alerts: CloudRecord[];
  results: CloudRecord[];
  drillResults: CloudRecord[];
  average: number;
  schoolId: string;
}

const Compliance: React.FC = () => {
  const { alertHistory, alerts, results, drillResults, average, schoolId } = useOutletContext<OutletContext>();
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = () => {
    setIsGenerating(true);
    
    try {
      const doc = new jsPDF();
      
      // Report header
      doc.setFontSize(20);
      doc.text("DISASTER PREPAREDNESS REPORT", 105, 20, { align: "center" });
      
      doc.setFontSize(14);
      doc.text(schoolId || "School", 105, 30, { align: "center" });
      doc.text(`Report Date: ${new Date().toLocaleDateString()}`, 105, 40, { align: "center" });
      
      // Separator line
      doc.line(20, 45, 190, 45);
      
      // Key metrics
      doc.setFontSize(16);
      doc.text("KEY METRICS", 20, 60);
      doc.setFontSize(12);
      
      doc.text(`Drill completions (latest 100): ${drillResults.length}`, 20, 70);
      doc.text(`Average quiz score (latest 100): ${average}%`, 20, 80);
      doc.text(`Quiz attempts (latest 100): ${results.length}`, 20, 90);
      doc.text(`Mass Alerts Sent: ${alerts.length}`, 20, 100);
      
      // Alert history
      if (alertHistory.length > 0) {
        doc.setFontSize(16);
        doc.text("ALERT HISTORY", 20, 120);
        doc.setFontSize(10);
        
        let yPos = 130;
        alertHistory.forEach(alert => {
          if (yPos > 270) {
            doc.addPage();
            yPos = 20;
          }
          
          doc.text(`${alert.timestamp.toLocaleDateString()} - ${alert.emergency}`, 20, yPos);
          yPos += 7;
          doc.text(`Message: ${alert.message}`, 20, yPos, { maxWidth: 170 });
          yPos += 10;
        });
      }
      
      // Save the PDF
      doc.save(`Disaster_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
      
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="compliance-container">
      <div className="compliance-header">
        <h2>Compliance Reports</h2>
        <p>Download a school activity report from the latest 100 records</p>
      </div>

      <div className="compliance-card">
        <h3>Generate PDF Report</h3>
        <p>Create a formal disaster preparedness report with all key metrics and alert history.</p>
        
        <button 
          className="download-btn"
          onClick={generatePDF}
          disabled={isGenerating}
        >
          <FaDownload /> 
          {isGenerating ? "Generating..." : "Download Report"}
        </button>
        
        <div className="report-info">
          <h4>Report includes:</h4>
          <ul>
            <li>School information and report date</li>
            <li>Key preparedness metrics</li>
            <li>Alert history ({alertHistory.length} alerts)</li>
            <li>School activity summary (not an official compliance certification)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Compliance;
