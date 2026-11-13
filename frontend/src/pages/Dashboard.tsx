import { LiveAlerts } from '@/components/LiveAlerts';
import { QuizHistory } from '@/components/QuizHistory';
import { useCloud } from '@/hooks/useCloud';
import { useProgress } from '@/modules/ProgressContext';
import { disasters } from '@/modules/data/disasters';
// src/pages/Dashboard.tsx
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import {
  Map,
  Award,
  Users,
  AlertTriangle,
  BookOpen,
  Shield,
  Bell,
  LogOut,
  Target,
  Zap,
  Trophy
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ThemeToggle } from "@/components/theme-toggle"
import { AppSidebar } from "@/components/sidebar"
import { useNavigate } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { EmergencyTools } from "./EmergencyTools"
import ChatWidget from "@/components/chatbot/ChatWidget"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/hooks/use-toast"

export default function Dashboard() {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState("overview")
  const { t } = useTranslation()
  const { user, logout, schoolId } = useAuth()
  const { rows: games } = useCloud("gameProgress", true)
  const { rows: drills } = useCloud("drillResults", true)
  const { completedModules } = useProgress()
  const { toast } = useToast()

  // Get user display name, fallback to email or "User"
  const userName = user?.displayName || user?.email?.split('@')[0] || "User"
  const userEmail = user?.email || ""

  const userStats = {
    name: userName,
    school: schoolId || "School assignment pending",
    level: t("dashboard.level"),
    points: games.reduce((sum, r) => sum + r.score, 0),
    badges: games.filter(r => r.badge === "safety-star").length,
    completedDrills: drills.length,
    learningProgress: Math.round(completedModules.length * 100 / disasters.length)
  }

  // Initialize speech synthesis voices
  useEffect(() => {
    if ("speechSynthesis" in window) {
      const loadVoices = () => {
        const voices = speechSynthesis.getVoices()
        console.log("Available voices:", voices.map(v => `${v.name} (${v.lang})`))
      }
      speechSynthesis.onvoiceschanged = loadVoices
      loadVoices()
    }
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      })
      navigate("/")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      })
    }
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-surface">
        {/* Sidebar */}
        <AppSidebar />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-card/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-40">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="hover:bg-muted/50 hover:text-primary" />
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary-brand bg-clip-text text-transparent">
                    {t("dashboard.title")}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {t("dashboard.subtitle")}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="hover-lift relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-emergency rounded-full" />
                </Button>
                <ThemeToggle />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="hover-lift"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 space-y-8">
            <LiveAlerts />
            <QuizHistory />
            {/* Welcome Section */}
            <div className="animate-slide-up-1">
              <Card className="glass-card hover-glow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">
                        {t("dashboard.welcomeBack", { name: userName })} 👋
                      </h2>
                      <p className="text-muted-foreground mb-1">{userEmail}</p>
                      <p className="text-sm text-muted-foreground mb-4">{userStats.school}</p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Trophy className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">{userStats.level}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Target className="h-4 w-4 text-secondary-brand" />
                          <span className="text-sm">
                            {userStats.points} {t("dashboard.points")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold gradient-text mb-2">
                        {userStats.learningProgress}%
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {t("dashboard.learningProgress")}
                      </p>
                      <Progress value={userStats.learningProgress} className="w-32" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="glass-card hover-glow animate-slide-up-1">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl mb-4">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold mb-1">{userStats.badges}</div>
                  <p className="text-sm text-muted-foreground">
                    {t("dashboard.badgesEarned")}
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card hover-glow animate-slide-up-2">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-secondary rounded-xl mb-4">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold mb-1">{userStats.completedDrills}</div>
                  <p className="text-sm text-muted-foreground">
                    {t("dashboard.drillsCompleted")}
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card hover-glow animate-slide-up-3">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-success rounded-xl mb-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold mb-1">—</div>
                  <p className="text-sm text-muted-foreground">
                    {t("dashboard.leaderboardRank")}
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card hover-glow animate-slide-up-1">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-emergency rounded-xl mb-4">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold mb-1">{completedModules.length}</div>
                  <p className="text-sm text-muted-foreground">
                    {t("dashboard.emergencyTrainings")}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Learning Modules */}
              <div className="lg:col-span-2">
                <Card className="glass-card animate-slide-up-2">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2" />
                      {t("dashboard.activeModules")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Flood */}
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover-lift cursor-pointer" onClick={() => navigate("/dashboard/modules")}>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <Map className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            {t("dashboard.moduleFloodSafety")}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {t("dashboard.moduleFloodSafetyDesc")}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-success">{completedModules.includes(1) ? "100%" : "0%"}</div>
                        <div className="text-xs text-muted-foreground">
                          {t("dashboard.complete")}
                        </div>
                      </div>
                    </div>

                    {/* Industrial */}
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover-lift cursor-pointer" onClick={() => navigate("/dashboard/modules")}>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
                          <AlertTriangle className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            {t("dashboard.moduleIndustrialSafety")}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {t("dashboard.moduleIndustrialSafetyDesc")}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-secondary-brand">{completedModules.includes(6) ? "100%" : "0%"}</div>
                        <div className="text-xs text-muted-foreground">
                          {t("dashboard.inProgress")}
                        </div>
                      </div>
                    </div>

                    {/* Earthquake Locked */}
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover-lift cursor-pointer opacity-60">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          <Shield className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            {t("dashboard.moduleEarthquake")}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {t("dashboard.moduleEarthquakeDesc")}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-muted-foreground">
                          {completedModules.includes(2) ? "Completed" : "Available"}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Achievements */}
                <Card className="glass-card animate-slide-up-3">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Trophy className="h-5 w-5 mr-2" />
                      {t("dashboard.recentAchievements")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {games.length ? games.slice(0, 3).map(r => <p key={r.id}>{r.badge}: {r.score}/{r.total}</p>) : <p>No game achievements yet.</p>}
                  </CardContent>
                </Card>

                {/* Emergency Tools */}
                <EmergencyTools />
              </div>
            </div>
          </main>
        </div>

        {/* ✅ Floating Rakshak Bot */}
        <div className="fixed bottom-6 right-6 z-50">
          <ChatWidget />
        </div>
      </div>
    </SidebarProvider>
  )
}