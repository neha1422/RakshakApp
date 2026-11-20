import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { ProgressProvider } from "@/modules/ProgressContext";
import GamePage from "./pages/GamePage";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import RiskMapPage from "./pages/RiskMapPage";
import AdminDashboard from "./pages/AdminDashboard";
import MassAlerts from "./pages/MassAlerts";
import MassAlertHistory from "./pages/MassAlertHistory";
import Compliance from "./pages/Compliance";
import { AuthProvider } from "./context/AuthContext";

// Learning Modules Pages
import ModulesPage from "@/modules/ModulesPage";
import ModuleDetail from "@/modules/ModuleDetail";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { CloudStatus } from "./components/CloudStatus";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>     
          {/* Wrap routes that need progress context inside ProgressProvider */}
          <ProgressProvider>
            <CloudStatus />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard/game" element={<ProtectedRoute><GamePage /></ProtectedRoute>} />

              {/* Dashboard Routes */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/dashboard/maps" element={<ProtectedRoute><RiskMapPage /></ProtectedRoute>} />

              {/* Learning Modules Routes */}
              <Route path="/dashboard/modules" element={<ProtectedRoute><ModulesPage /></ProtectedRoute>} />
              <Route path="/dashboard/modules/:id" element={<ProtectedRoute><ModuleDetail /></ProtectedRoute>} />

              {/* Admin Dashboard with nested routes */}
              <Route path="/dashboard/admin" element={<ProtectedRoute roles={["administrator", "teacher"]}><AdminDashboard alerts={[]} /></ProtectedRoute>}>
                <Route index element={<div></div>} />
                <Route path="alerts" element={<ProtectedRoute roles={["administrator"]}><MassAlerts /></ProtectedRoute>} />
                <Route path="alerts/history" element={<ProtectedRoute roles={["administrator"]}><MassAlertHistory /></ProtectedRoute>} />
                <Route path="compliance" element={<Compliance />} />
              </Route>

              {/* Catch-All */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ProgressProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
