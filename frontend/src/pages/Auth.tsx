// src/pages/Auth.tsx
import { useState } from "react"
import { ArrowLeft, Shield, Mail, Lock, User, School } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTranslation } from "react-i18next"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/hooks/use-toast"

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [school, setSchool] = useState("")
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { googleSignIn, emailSignUp, emailSignIn } = useAuth()
  const { toast } = useToast()

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      await googleSignIn()
      toast({
        title: t("auth.successTitle") || "Success!",
        description: t("auth.successGoogle") || "Signed in with Google successfully",
      })
      navigate("/dashboard")
    } catch (error: any) {
      toast({
        title: t("auth.errorTitle") || "Error",
        description: error.message || "Failed to sign in with Google",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      
      if (isLogin) {
        await emailSignIn(email, password)
        toast({
          title: t("auth.successTitle") || "Success!",
          description: t("auth.successLogin") || "Logged in successfully",
        })
      } else {
        if (!name.trim()) {
          toast({
            title: t("auth.errorTitle") || "Error",
            description: "Please enter your full name",
            variant: "destructive",
          })
          return
        }
        await emailSignUp(email, password, name)
        toast({
          title: t("auth.successTitle") || "Success!",
          description: t("auth.successSignup") || "Account created successfully",
        })
      }
      
      navigate("/dashboard")
    } catch (error: any) {
      let errorMessage = error.message || "Authentication failed"
      
      // User-friendly error messages
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered"
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password should be at least 6 characters"
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address"
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email"
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password"
      }
      
      toast({
        title: t("auth.errorTitle") || "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-surface flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-40 h-40 bg-primary/10 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-secondary-brand/10 rounded-full blur-2xl float-animation-delayed" />
      </div>

      {/* Navigation */}
      <div className="absolute top-6 left-6 flex items-center space-x-4 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="hover-lift"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-ocean rounded-lg">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold bg-gradient-to-r from-primary to-secondary-brand bg-clip-text text-transparent">
            RakshakApp
          </span>
        </div>
      </div>

      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>

      {/* Auth Form */}
      <Card className="w-full max-w-md glass-card animate-slide-up relative z-10">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto mb-4 p-3 bg-gradient-ocean rounded-2xl w-fit">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">
            {isLogin ? t("auth.welcomeBack") : t("auth.joinTitle")}
          </CardTitle>
          <p className="text-muted-foreground">
            {isLogin ? t("auth.loginSubtitle") : t("auth.registerSubtitle")}
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">{t("auth.fullName")}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("auth.fullNamePlaceholder") as string}
                    className="pl-10 h-12 rounded-xl"
                    required
                  />
                </div>
              </div>
            )}

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="school">{t("auth.school")}</Label>
                <div className="relative">
                  <School className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="school"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    placeholder={t("auth.schoolPlaceholder") as string}
                    className="pl-10 h-12 rounded-xl"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.email")}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("auth.emailPlaceholder") as string}
                  className="pl-10 h-12 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("auth.password")}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("auth.passwordPlaceholder") as string}
                  className="pl-10 h-12 rounded-xl"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="hero"
              className="w-full h-12 text-lg rounded-xl"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                isLogin ? t("auth.signIn") : t("auth.createAccount")
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 rounded-xl"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="text-muted-foreground hover:text-primary"
                disabled={loading}
              >
                {isLogin ? t("auth.noAccount") : t("auth.haveAccount")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}