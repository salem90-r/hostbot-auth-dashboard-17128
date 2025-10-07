import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ControlPanel, getSettings, type AppSettings } from "./ControlPanel";
import { ActivityFeed } from "./ActivityFeed";
import { 
  Phone, 
  MapPin, 
  Package, 
  CreditCard, 
  Zap, 
  LogOut,
  Users,
  Wifi,
  Signal,
  Clock,
  Download,
  Upload,
  Settings,
  Bell,
  Star,
  TrendingUp,
  Activity
} from "lucide-react";
import teamIllustration from "@/assets/team-illustration.png";

interface EnhancedDashboardProps {
  username: string;
  onLogout: () => void;
}

export const EnhancedDashboard = ({ username, onLogout }: EnhancedDashboardProps) => {
  const [mounted, setMounted] = useState(false);
  const [connectionTime, setConnectionTime] = useState(0);
  const [dataUsed, setDataUsed] = useState(65);
  const [notifications, setNotifications] = useState(3);
  const [isControlPanelOpen, setIsControlPanelOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [settings, setSettings] = useState<AppSettings>(getSettings());
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
    setSettings(getSettings());
    
    // Simulate connection timer
    const timer = setInterval(() => {
      setConnectionTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const refreshSettings = () => {
    setSettings(getSettings());
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === "123") {
      setIsAuthenticated(true);
      toast({
        title: "تم الدخول بنجاح",
        description: "مرحباً بك في لوحة التحكم",
      });
    } else {
      toast({
        title: "خطأ في الرمز",
        description: "الرمز السري غير صحيح",
        variant: "destructive",
      });
      setPasswordInput("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle" dir="rtl">
      {/* Enhanced Header */}
      <header className="bg-gradient-hero shadow-header sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-reverse space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -left-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-white font-bold arabic-text text-xl">مرحباً {username}</h1>
                <p className="text-white/90 text-sm arabic-text">{settings.siteName} للاتصالات اللاسلكية</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-white/20 relative"
                >
                  <Bell className="w-5 h-5" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce">
                      {notifications}
                    </span>
                  )}
                </Button>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onLogout}
                className="text-white hover:bg-white/20 transition-fast"
              >
                <LogOut className="w-4 h-4 ml-2" />
                خروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Enhanced Welcome Section */}
        <Card className={`bg-gradient-card text-white shadow-glow overflow-hidden relative ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
          <CardContent className="p-8">
            <div className="flex items-center justify-between relative z-10">
              <div className="space-y-3">
                <h2 className="text-2xl font-bold arabic-text">{settings.dashboardWelcome.mainText} {username}</h2>
                <p className="arabic-text opacity-90 text-lg">
                  {settings.dashboardWelcome.subText}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>متصل منذ: {formatTime(connectionTime)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Signal className="w-4 h-4" />
                    <span>إشارة قوية</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src={teamIllustration} 
                  alt="فريق العمل" 
                  className="w-24 h-16 object-cover rounded-xl opacity-90 animate-float"
                />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            {/* Floating background elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full blur-xl animate-float"></div>
          </CardContent>
        </Card>

        {/* Enhanced Quick Stats */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${mounted ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <Card className="hover-lift transition-fast">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3 shadow-button">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold arabic-text text-sm">سرعة التحميل</h3>
              <p className="text-xl font-bold text-primary">{settings.cardInfo.downloadSpeed}</p>
            </CardContent>
          </Card>

          <Card className="hover-lift transition-fast">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-3 shadow-button">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold arabic-text text-sm">سرعة الرفع</h3>
              <p className="text-xl font-bold text-accent">{settings.cardInfo.uploadSpeed}</p>
            </CardContent>
          </Card>

          <Card className="hover-lift transition-fast">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold arabic-text text-sm">البيانات المستخدمة</h3>
              <p className="text-xl font-bold text-primary">{dataUsed}%</p>
              <Progress value={dataUsed} className="mt-2 h-1" />
            </CardContent>
          </Card>
        </div>


        {/* Enhanced Card Information */}
        <Card className={`${mounted ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
          <CardHeader className="pb-4">
            <CardTitle className="arabic-text flex items-center justify-between text-xl">
              <div className="flex items-center">
                <CreditCard className="w-6 h-6 ml-3 text-primary" />
                معلومات الكارت المفصلة
              </div>
              <Dialog open={isControlPanelOpen} onOpenChange={(open) => {
                setIsControlPanelOpen(open);
                if (!open) {
                  setIsAuthenticated(false);
                  setPasswordInput("");
                }
              }}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Settings className="w-4 h-4" />
                    <span className="arabic-text">لوحة التحكم</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md" dir="rtl">
                  {!isAuthenticated ? (
                    <>
                      <DialogHeader>
                        <DialogTitle className="arabic-text">تسجيل الدخول إلى لوحة التحكم</DialogTitle>
                        <DialogDescription className="arabic-text">
                          أدخل الرمز السري للوصول إلى إعدادات الصفحة
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="password" className="arabic-text">الرمز السري</Label>
                          <Input
                            id="password"
                            type="password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                            placeholder="أدخل الرمز"
                            className="text-center text-lg"
                            dir="ltr"
                          />
                        </div>
                        <Button onClick={handlePasswordSubmit} className="w-full arabic-text">
                          دخول
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <DialogHeader>
                        <DialogTitle className="arabic-text flex items-center gap-2">
                          <Settings className="w-5 h-5 text-primary" />
                          لوحة التحكم الشاملة
                        </DialogTitle>
                        <DialogDescription className="arabic-text">
                          تحكم كامل في جميع خصائص الصفحة والإعدادات
                        </DialogDescription>
                      </DialogHeader>
                      <ControlPanel onSave={refreshSettings} />
                    </>
                  )}
                </DialogContent>
              </Dialog>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20">
                <span className="arabic-text font-semibold">رقم الكارت:</span>
                <Badge className="bg-primary text-primary-foreground font-mono text-lg px-4 py-1">{settings.defaultCardData.cardNumber}</Badge>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                <span className="arabic-text font-semibold">الرصيد المتبقي:</span>
                <Badge className="bg-green-600 text-white text-lg px-4 py-1">{settings.defaultCardData.balance}</Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <span className="arabic-text font-semibold">تاريخ الانتهاء:</span>
                <span className="text-blue-700 font-semibold">{settings.defaultCardData.expiryDate}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                <span className="arabic-text font-semibold">سعر الباقة:</span>
                <Badge className="bg-purple-600 text-white">{settings.cardInfo.packagePrice}</Badge>
              </div>
            </div>

            {/* Card Speed Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-accent/5 to-accent/10 rounded-xl border border-accent/20">
                <span className="arabic-text font-semibold">سرعة التحميل:</span>
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-accent" />
                  <Badge className="bg-accent text-accent-foreground text-lg px-3 py-1">{settings.cardInfo.downloadSpeed}</Badge>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-primary-light/5 to-primary-light/10 rounded-xl border border-primary-light/20">
                <span className="arabic-text font-semibold">سرعة الرفع:</span>
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-primary-light" />
                  <Badge className="bg-primary-light text-white text-lg px-3 py-1">{settings.cardInfo.uploadSpeed}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Network Status */}
        <Card className={`${mounted ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
          <CardHeader>
            <CardTitle className="arabic-text flex items-center text-xl">
              <Wifi className="w-6 h-6 ml-3 text-primary animate-pulse" />
              حالة الشبكة التفصيلية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                <span className="arabic-text font-semibold">حالة الاتصال</span>
                <Badge className="bg-green-600 text-white animate-pulse">نشط</Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                <span className="arabic-text font-semibold">قوة الإشارة</span>
                <div className="flex items-center gap-1">
                  <div className="flex gap-1">
                    <div className="w-2 h-4 bg-blue-500 rounded-sm"></div>
                    <div className="w-2 h-3 bg-blue-500 rounded-sm"></div>
                    <div className="w-2 h-5 bg-blue-500 rounded-sm"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};