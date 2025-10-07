import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  User, 
  Lock, 
  Wifi, 
  Shield, 
  Globe,
  Phone, 
  MapPin, 
  Package,
  Download,
  Upload,
  TrendingUp,
  Star,
  Zap,
  AlertTriangle
} from "lucide-react";
import teamIllustration from "@/assets/team-illustration.png";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getSettings } from "./ControlPanel";

interface EnhancedLoginPageProps {
  onLogin: (username: string) => void;
}

export const EnhancedLoginPage = ({ onLogin }: EnhancedLoginPageProps) => {
  const [username, setUsername] = useState("");
  const [selectedSpeed, setSelectedSpeed] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [savedCards, setSavedCards] = useState<string[]>([]);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTextAnimating, setIsTextAnimating] = useState(false);
  const [currentSupportPhone, setCurrentSupportPhone] = useState("778881677");
  const { toast } = useToast();
  const settings = getSettings();

  const supportPhones = ["778881677", "739149005"];

  const rotatingTexts = [
    settings.welcomeTexts.text1.replace('${siteName}', settings.siteName),
    settings.welcomeTexts.text2.replace('${supportPhone}', settings.supportPhone).replace('${supportPhone2}', settings.supportPhone2),
    settings.welcomeTexts.text3
  ];

  useEffect(() => {
    setMounted(true);
    // Load saved cards from localStorage
    const saved = localStorage.getItem('khanfar-saved-cards');
    if (saved) {
      setSavedCards(JSON.parse(saved));
    }

    // Rotating text animation
    const textInterval = setInterval(() => {
      setIsTextAnimating(true);
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
        setIsTextAnimating(false);
      }, 500);
    }, 4000);

    // Rotating support phone every 3 seconds
    const phoneInterval = setInterval(() => {
      setCurrentSupportPhone((prev) => 
        prev === supportPhones[0] ? supportPhones[1] : supportPhones[0]
      );
    }, 3000);

    return () => {
      clearInterval(textInterval);
      clearInterval(phoneInterval);
    };
  }, []);

  const handleSpeedChange = (speed: string) => {
    setSelectedSpeed(speed);
    
    // Find the selected package
    const selectedPackage = settings.packages.find(pkg => pkg.id === speed);
    
    // Show warning for high speeds (speed greater than 10 Mbps)
    if (selectedPackage) {
      const speedValue = parseInt(selectedPackage.speed);
      if (speedValue >= 10) {
        setShowWarning(true);
        toast({
          title: "تحذير - استنزاف الرصيد",
          description: "السرعات العالية تستنزف الرصيد بسرعة أكبر. يرجى مراقبة استهلاكك.",
          variant: "destructive",
        });
      } else {
        setShowWarning(false);
      }
    }
  };

  const handleSavedCardSelect = (selectedCard: string) => {
    if (selectedCard && selectedCard !== "select") {
      setUsername(selectedCard);
    }
  };

  const saveCardToStorage = (cardName: string) => {
    const existing = savedCards.filter(card => card !== cardName);
    const updated = [cardName, ...existing].slice(0, 5); // Keep last 5 cards
    setSavedCards(updated);
    localStorage.setItem('khanfar-saved-cards', JSON.stringify(updated));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setIsLoading(true);
      // Save card to storage
      saveCardToStorage(username.trim());
      // Simulate loading for better UX
      setTimeout(() => {
        onLogin(username.trim());
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle" dir="rtl">
      {/* Login Container - Centered */}
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full animate-float blur-xl"></div>
          <div className="absolute bottom-32 left-16 w-24 h-24 bg-accent/10 rounded-full animate-float animation-delay-1000 blur-lg"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary-light/20 rounded-full animate-pulse blur-sm"></div>
        </div>

        <Card className={`w-full max-w-md shadow-glow hover-lift relative z-10 ${mounted ? 'animate-slide-up' : 'opacity-0'}`}>
          <CardContent className="p-8">
            {/* Logo/Header Section */}
            <div className="text-center mb-8">
              <div className="relative mb-6">
                <img 
                  src={teamIllustration} 
                  alt="فريق العمل" 
                  className={`w-56 h-36 mx-auto object-cover rounded-xl shadow-card ${mounted ? 'animate-bounce-in' : ''}`}
                />
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-button animate-pulse-glow">
                  <Wifi className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="relative mb-4">
                <div className="absolute inset-0 blur-2xl opacity-30 bg-gradient-primary animate-pulse-glow"></div>
                <h1 className="relative text-5xl font-extrabold arabic-text mb-3 font-cairo">
                  <span className="bg-gradient-to-r from-primary via-accent to-primary-light bg-clip-text text-transparent drop-shadow-lg animate-fade-in">
                    {settings.siteName}
                  </span>
                </h1>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                  <Wifi className="w-5 h-5 text-primary animate-pulse" />
                  <div className="h-px w-12 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                </div>
              </div>
              <div className="h-16 flex items-center justify-center overflow-hidden">
                <p 
                  className={`text-muted-foreground arabic-text text-lg font-medium transition-all duration-500 ${
                    isTextAnimating ? 'translate-y-[-100%] opacity-0' : 'translate-y-0 opacity-100'
                  }`}
                >
                  {rotatingTexts[currentTextIndex]}
                </p>
              </div>
            </div>

          {/* Features Grid */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="text-center p-3 rounded-lg bg-primary/5 hover-lift transition-fast">
              <Shield className="w-5 h-5 text-primary mx-auto mb-1" />
              <span className="text-xs arabic-text text-primary font-medium">{settings.features.feature1.text}</span>
            </div>
            <div className="text-center p-3 rounded-lg bg-accent/5 hover-lift transition-fast">
              <Globe className="w-5 h-5 text-accent mx-auto mb-1" />
              <span className="text-xs arabic-text text-accent font-medium">{settings.features.feature2.text}</span>
            </div>
            <div className="text-center p-3 rounded-lg bg-primary-light/5 hover-lift transition-fast">
              <Wifi className="w-5 h-5 text-primary-light mx-auto mb-1" />
              <span className="text-xs arabic-text text-primary-light font-medium">{settings.features.feature3.text}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Speed Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold arabic-text text-primary">
                اختر السرعة المطلوبة
              </Label>
              <Select value={selectedSpeed} onValueChange={handleSpeedChange}>
                <SelectTrigger className="h-12 arabic-text text-lg border-2 focus:border-primary focus:shadow-button transition-fast rounded-xl">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    <SelectValue placeholder="اختر السرعة" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-background border border-primary/20 shadow-glow">
                  {settings.packages.map((pkg, index) => (
                    <SelectItem key={pkg.id} value={pkg.id} className="arabic-text text-lg py-3">
                      <div className="flex items-center gap-2">
                        <Download className="w-4 h-4 text-primary" />
                        {pkg.speed} - {pkg.name} - {pkg.price}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {/* Speed Warning */}
              {showWarning && (
                <Alert className="mt-3 border-orange-200 bg-orange-50 animate-fade-in">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="arabic-text text-orange-800">
                    <span className="font-semibold">تحذير:</span> السرعات العالية تستنزف الرصيد بسرعة أكبر. تأكد من مراقبة استهلاكك بانتظام.
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-semibold arabic-text text-primary">
                اسم المستخدم
              </Label>
              <div className="relative group">
                <User className="absolute right-4 top-4 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-fast" />
                <Input
                  type="text"
                  placeholder="أدخل اسم المستخدم"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pr-12 h-12 arabic-text text-lg border-2 focus:border-primary focus:shadow-button transition-fast rounded-xl"
                  required
                  dir="rtl"
                  disabled={isLoading}
                />
              </div>
              
              {/* Saved Cards Dropdown */}
              {savedCards.length > 0 && (
                <div className="mt-4 space-y-2 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-primary" />
                    <Label className="text-sm font-semibold arabic-text text-primary">
                      الكروت المحفوظة
                    </Label>
                    <Badge variant="secondary" className="text-xs">
                      {savedCards.length}
                    </Badge>
                  </div>
                  <Select onValueChange={handleSavedCardSelect}>
                    <SelectTrigger className="h-11 arabic-text text-base border-2 border-primary/30 hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 rounded-xl bg-gradient-to-l from-primary/5 to-transparent backdrop-blur-sm shadow-sm hover:shadow-md group">
                      <div className="flex items-center gap-3 w-full">
                        <div className="p-1.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <Package className="w-4 h-4 text-primary" />
                        </div>
                        <SelectValue placeholder="اختر من الكروت المحفوظة" className="flex-1" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-background/95 backdrop-blur-md border-2 border-primary/20 shadow-2xl z-[100] rounded-xl">
                      {savedCards.map((card, index) => (
                        <SelectItem 
                          key={index} 
                          value={card} 
                          className="arabic-text text-base py-3 px-4 hover:bg-gradient-to-l hover:from-primary/10 hover:to-transparent cursor-pointer transition-all duration-200 rounded-lg my-1 mx-1 group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                              <User className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                            </div>
                            <span className="font-medium">{card}</span>
                            <Star className="w-3 h-3 text-accent mr-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground arabic-text flex items-center gap-1.5 pr-1">
                    <TrendingUp className="w-3 h-3 text-primary" />
                    آخر {savedCards.length} كروت تم استخدامها
                  </p>
                </div>
              )}
            </div>

            <Button 
              type="submit" 
              variant="gradient"
              className="w-full arabic-text font-semibold text-lg h-14 shadow-button hover:shadow-glow transition-slow rounded-xl"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  جاري التحقق...
                </div>
              ) : (
                <>
                  <Lock className="ml-2 h-5 w-5" />
                  تسجيل الدخول
                </>
              )}
            </Button>
          </form>

          {/* Help and Support */}
          <div className="mt-6 text-center space-y-3">
            <div className="flex items-center justify-center gap-2 p-3 bg-primary/5 rounded-xl border border-primary/20">
              <Phone className="w-5 h-5 text-primary animate-pulse" />
              <span className="arabic-text font-semibold text-primary transition-all duration-500">المساعدة ودعم: {currentSupportPhone}</span>
            </div>
          </div>

          {/* Enhanced Copyright Section */}
          <div className="mt-4 text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse animation-delay-300"></div>
              <div className="w-2 h-2 bg-primary-light rounded-full animate-pulse animation-delay-600"></div>
            </div>
            
            <div className="relative p-4 bg-gradient-to-r from-primary/5 via-accent/5 to-primary-light/5 rounded-xl border border-primary/20 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl opacity-50"></div>
              <div className="relative space-y-2">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-sm font-bold arabic-text text-primary">{settings.siteName} للاتصالات اللاسلكية</span>
                  <Star className="w-4 h-4 text-primary animate-pulse" />
                </div>
                <p className="text-xs text-muted-foreground arabic-text font-medium">
                  💡 فكرة وإبداع: <span className="text-primary font-bold">{settings.copyright.ideaCreator}</span>
                </p>
                <p className="text-xs text-muted-foreground arabic-text font-medium">
                  🎨 تصميم وتطوير: <span className="text-accent font-bold">{settings.copyright.designer}</span>
                </p>
                <div className="flex items-center justify-center gap-1 mt-2 pt-2 border-t border-primary/20">
                  <span className="text-xs text-primary/70 arabic-text">جميع الحقوق محفوظة</span>
                  <span className="text-xs text-accent">©</span>
                  <span className="text-xs text-primary/70">{settings.copyright.year}</span>
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