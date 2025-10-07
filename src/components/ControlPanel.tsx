import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Building2, 
  Zap, 
  Phone, 
  MapPin, 
  Save,
  Download,
  Upload,
  CreditCard,
  Settings,
  Plus,
  Trash2
} from "lucide-react";

interface ControlPanelProps {
  onSave?: () => void;
}

export interface Package {
  id: string;
  name: string;
  speed: string;
  price: string;
}

export interface AppSettings {
  siteName: string;
  supportPhone: string;
  supportPhone2: string;
  packages: Package[];
  salesPoints: string[];
  cardInfo: {
    downloadSpeed: string;
    uploadSpeed: string;
    packagePrice: string;
  };
  welcomeTexts: {
    text1: string;
    text2: string;
    text3: string;
  };
  features: {
    feature1: { icon: string; text: string };
    feature2: { icon: string; text: string };
    feature3: { icon: string; text: string };
  };
  copyright: {
    ideaCreator: string;
    designer: string;
    year: string;
  };
  defaultCardData: {
    cardNumber: string;
    balance: string;
    expiryDate: string;
  };
  dashboardWelcome: {
    mainText: string;
    subText: string;
  };
}

const defaultSettings: AppSettings = {
  siteName: "خنفر نت",
  supportPhone: "778881677",
  supportPhone2: "739149005",
  packages: [
    { id: "1", name: "أساسي", speed: "1 Mbps", price: "50 ريال" },
    { id: "2", name: "متوسط", speed: "5 Mbps", price: "100 ريال" },
    { id: "3", name: "سريع", speed: "10 Mbps", price: "150 ريال" },
    { id: "4", name: "فائق السرعة", speed: "25 Mbps", price: "200 ريال" }
  ],
  salesPoints: [
    "نقطة بيع 1",
    "نقطة بيع 2",
    "نقطة بيع 3"
  ],
  cardInfo: {
    downloadSpeed: "25 Mbps",
    uploadSpeed: "12 Mbps",
    packagePrice: "200 ريال"
  },
  welcomeTexts: {
    text1: "سجل دخولك واستمتع بخدمات خنفر نت للاسلكية",
    text2: "توصيل إنترنت للمنازل مجاناً للتواصل معنا 778881677ـ739149005",
    text3: "الشكاوي و المقترحات تواصل معنا عبر المساعدة ودعم"
  },
  features: {
    feature1: { icon: "Shield", text: "آمن" },
    feature2: { icon: "Globe", text: "سريع" },
    feature3: { icon: "Wifi", text: "موثوق" }
  },
  copyright: {
    ideaCreator: "محمد الحوشبي",
    designer: "محمد الحوشبي",
    year: "2024"
  },
  defaultCardData: {
    cardNumber: "123456789",
    balance: "5000 MB",
    expiryDate: "2024/12/31"
  },
  dashboardWelcome: {
    mainText: "مرحباً",
    subText: "يرجى الاحتفاظ بالكارت حتى انتهاء الرصيد"
  }
};

export const ControlPanel = ({ onSave }: ControlPanelProps) => {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('khanfar-settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading settings:', e);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('khanfar-settings', JSON.stringify(settings));
    toast({
      title: "تم الحفظ بنجاح",
      description: "تم حفظ جميع التعديلات",
    });
    onSave?.();
  };

  const updateSetting = (path: string, value: string) => {
    setSettings(prev => {
      const newSettings = { ...prev };
      const keys = path.split('.');
      let current: any = newSettings;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newSettings;
    });
  };

  const addPackage = () => {
    const newPackage: Package = {
      id: Date.now().toString(),
      name: "باقة جديدة",
      speed: "1 Mbps",
      price: "50 ريال"
    };
    setSettings(prev => ({
      ...prev,
      packages: [...prev.packages, newPackage]
    }));
  };

  const removePackage = (id: string) => {
    setSettings(prev => ({
      ...prev,
      packages: prev.packages.filter(pkg => pkg.id !== id)
    }));
  };

  const updatePackage = (id: string, field: keyof Package, value: string) => {
    setSettings(prev => ({
      ...prev,
      packages: prev.packages.map(pkg => 
        pkg.id === id ? { ...pkg, [field]: value } : pkg
      )
    }));
  };

  const addSalesPoint = () => {
    setSettings(prev => ({
      ...prev,
      salesPoints: [...prev.salesPoints, `نقطة بيع ${prev.salesPoints.length + 1}`]
    }));
  };

  const removeSalesPoint = (index: number) => {
    setSettings(prev => ({
      ...prev,
      salesPoints: prev.salesPoints.filter((_, i) => i !== index)
    }));
  };

  const updateSalesPoint = (index: number, value: string) => {
    setSettings(prev => ({
      ...prev,
      salesPoints: prev.salesPoints.map((point, i) => i === index ? value : point)
    }));
  };

  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto" dir="rtl">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 arabic-text gap-1">
          <TabsTrigger value="general">عام</TabsTrigger>
          <TabsTrigger value="packages">الباقات</TabsTrigger>
          <TabsTrigger value="sales">نقاط البيع</TabsTrigger>
          <TabsTrigger value="card">بيانات الكرت</TabsTrigger>
          <TabsTrigger value="welcome">النصوص</TabsTrigger>
          <TabsTrigger value="features">الميزات</TabsTrigger>
          <TabsTrigger value="other">أخرى</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="arabic-text flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                الإعدادات العامة
              </CardTitle>
              <CardDescription className="arabic-text">
                تعديل معلومات الموقع الأساسية
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName" className="arabic-text">اسم الموقع</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => updateSetting('siteName', e.target.value)}
                  className="arabic-text"
                  dir="rtl"
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="arabic-text flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  أرقام المساعدة والدعم
                </Label>
                <Input
                  value={settings.supportPhone}
                  onChange={(e) => updateSetting('supportPhone', e.target.value)}
                  placeholder="رقم الدعم الأول"
                  className="arabic-text"
                  dir="ltr"
                />
                <Input
                  value={settings.supportPhone2}
                  onChange={(e) => updateSetting('supportPhone2', e.target.value)}
                  placeholder="رقم الدعم الثاني"
                  className="arabic-text"
                  dir="ltr"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Packages Settings */}
        <TabsContent value="packages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="arabic-text flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  إعدادات الباقات
                </div>
                <Button onClick={addPackage} size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  إضافة باقة
                </Button>
              </CardTitle>
              <CardDescription className="arabic-text">
                تعديل وإضافة وحذف الباقات والسرعات والأسعار
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {settings.packages.map((pkg) => (
                <div key={pkg.id} className="space-y-3 p-4 bg-muted/30 rounded-lg border border-muted relative">
                  <div className="flex items-center justify-between">
                    <Label className="arabic-text font-bold">باقة {pkg.name}</Label>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => removePackage(pkg.id)}
                      disabled={settings.packages.length <= 1}
                      className="gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      حذف
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="space-y-2">
                      <Label className="arabic-text text-xs">الاسم</Label>
                      <Input
                        value={pkg.name}
                        onChange={(e) => updatePackage(pkg.id, 'name', e.target.value)}
                        className="arabic-text"
                        dir="rtl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="arabic-text text-xs">السرعة</Label>
                      <Input
                        value={pkg.speed}
                        onChange={(e) => updatePackage(pkg.id, 'speed', e.target.value)}
                        className="arabic-text"
                        dir="ltr"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="arabic-text text-xs">السعر</Label>
                      <Input
                        value={pkg.price}
                        onChange={(e) => updatePackage(pkg.id, 'price', e.target.value)}
                        className="arabic-text"
                        dir="rtl"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sales Points Settings */}
        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="arabic-text flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  نقاط البيع
                </div>
                <Button onClick={addSalesPoint} size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  إضافة نقطة بيع
                </Button>
              </CardTitle>
              <CardDescription className="arabic-text">
                إضافة وتعديل وحذف نقاط البيع
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {settings.salesPoints.map((point, index) => (
                <div key={index} className="flex items-end gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="flex-1 space-y-2">
                    <Label className="arabic-text">نقطة البيع {index + 1}</Label>
                    <Input
                      value={point}
                      onChange={(e) => updateSalesPoint(index, e.target.value)}
                      className="arabic-text"
                      dir="rtl"
                    />
                  </div>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => removeSalesPoint(index)}
                    disabled={settings.salesPoints.length <= 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Card Info Settings */}
        <TabsContent value="card" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="arabic-text flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                بيانات الكرت الافتراضية
              </CardTitle>
              <CardDescription className="arabic-text">
                تعديل البيانات التي تظهر في صفحة الكرت
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="arabic-text flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  سرعة التحميل
                </Label>
                <Input
                  value={settings.cardInfo.downloadSpeed}
                  onChange={(e) => updateSetting('cardInfo.downloadSpeed', e.target.value)}
                  className="arabic-text"
                  dir="ltr"
                />
              </div>

              <div className="space-y-2">
                <Label className="arabic-text flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  سرعة الرفع
                </Label>
                <Input
                  value={settings.cardInfo.uploadSpeed}
                  onChange={(e) => updateSetting('cardInfo.uploadSpeed', e.target.value)}
                  className="arabic-text"
                  dir="ltr"
                />
              </div>

              <div className="space-y-2">
                <Label className="arabic-text">سعر الباقة</Label>
                <Input
                  value={settings.cardInfo.packagePrice}
                  onChange={(e) => updateSetting('cardInfo.packagePrice', e.target.value)}
                  className="arabic-text"
                  dir="rtl"
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="arabic-text">رقم الكرت الافتراضي</Label>
                <Input
                  value={settings.defaultCardData.cardNumber}
                  onChange={(e) => updateSetting('defaultCardData.cardNumber', e.target.value)}
                  className="arabic-text"
                  dir="ltr"
                />
              </div>

              <div className="space-y-2">
                <Label className="arabic-text">الرصيد الافتراضي</Label>
                <Input
                  value={settings.defaultCardData.balance}
                  onChange={(e) => updateSetting('defaultCardData.balance', e.target.value)}
                  className="arabic-text"
                  dir="rtl"
                />
              </div>

              <div className="space-y-2">
                <Label className="arabic-text">تاريخ الانتهاء الافتراضي</Label>
                <Input
                  value={settings.defaultCardData.expiryDate}
                  onChange={(e) => updateSetting('defaultCardData.expiryDate', e.target.value)}
                  className="arabic-text"
                  dir="ltr"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Welcome Texts Settings */}
        <TabsContent value="welcome" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="arabic-text flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                النصوص الترحيبية
              </CardTitle>
              <CardDescription className="arabic-text">
                تعديل النصوص المتحركة في صفحة الدخول ورسائل الترحيب
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="arabic-text">النص الأول (متحرك)</Label>
                <Input
                  value={settings.welcomeTexts.text1}
                  onChange={(e) => updateSetting('welcomeTexts.text1', e.target.value)}
                  className="arabic-text"
                  dir="rtl"
                />
              </div>

              <div className="space-y-2">
                <Label className="arabic-text">النص الثاني (متحرك)</Label>
                <Input
                  value={settings.welcomeTexts.text2}
                  onChange={(e) => updateSetting('welcomeTexts.text2', e.target.value)}
                  className="arabic-text"
                  dir="rtl"
                />
              </div>

              <div className="space-y-2">
                <Label className="arabic-text">النص الثالث (متحرك)</Label>
                <Input
                  value={settings.welcomeTexts.text3}
                  onChange={(e) => updateSetting('welcomeTexts.text3', e.target.value)}
                  className="arabic-text"
                  dir="rtl"
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="arabic-text">نص الترحيب الرئيسي (لوحة التحكم)</Label>
                <Input
                  value={settings.dashboardWelcome.mainText}
                  onChange={(e) => updateSetting('dashboardWelcome.mainText', e.target.value)}
                  className="arabic-text"
                  dir="rtl"
                />
              </div>

              <div className="space-y-2">
                <Label className="arabic-text">النص الفرعي (لوحة التحكم)</Label>
                <Input
                  value={settings.dashboardWelcome.subText}
                  onChange={(e) => updateSetting('dashboardWelcome.subText', e.target.value)}
                  className="arabic-text"
                  dir="rtl"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Features Settings */}
        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="arabic-text flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                الميزات الثلاثة
              </CardTitle>
              <CardDescription className="arabic-text">
                تعديل الميزات التي تظهر في صفحة الدخول
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(settings.features).map(([key, feature]) => (
                <div key={key} className="space-y-3 p-4 bg-muted/30 rounded-lg">
                  <Label className="arabic-text font-bold">الميزة {key.slice(-1)}</Label>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="space-y-2">
                      <Label className="arabic-text text-xs">الأيقونة (Shield, Globe, Wifi, etc.)</Label>
                      <Input
                        value={feature.icon}
                        onChange={(e) => updateSetting(`features.${key}.icon`, e.target.value)}
                        className="arabic-text"
                        dir="ltr"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="arabic-text text-xs">النص</Label>
                      <Input
                        value={feature.text}
                        onChange={(e) => updateSetting(`features.${key}.text`, e.target.value)}
                        className="arabic-text"
                        dir="rtl"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other Settings */}
        <TabsContent value="other" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="arabic-text flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                إعدادات أخرى
              </CardTitle>
              <CardDescription className="arabic-text">
                حقوق النشر والمعلومات الإضافية
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="arabic-text">صاحب الفكرة والإبداع</Label>
                <Input
                  value={settings.copyright.ideaCreator}
                  onChange={(e) => updateSetting('copyright.ideaCreator', e.target.value)}
                  className="arabic-text"
                  dir="rtl"
                />
              </div>

              <div className="space-y-2">
                <Label className="arabic-text">المصمم والمطور</Label>
                <Input
                  value={settings.copyright.designer}
                  onChange={(e) => updateSetting('copyright.designer', e.target.value)}
                  className="arabic-text"
                  dir="rtl"
                />
              </div>

              <div className="space-y-2">
                <Label className="arabic-text">السنة</Label>
                <Input
                  value={settings.copyright.year}
                  onChange={(e) => updateSetting('copyright.year', e.target.value)}
                  className="arabic-text"
                  dir="ltr"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="sticky bottom-0 bg-background pt-4 border-t">
        <Button onClick={handleSave} className="w-full arabic-text gap-2" size="lg">
          <Save className="w-5 h-5" />
          حفظ جميع التعديلات
        </Button>
      </div>
    </div>
  );
};

export const getSettings = (): AppSettings => {
  const saved = localStorage.getItem('khanfar-settings');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return defaultSettings;
    }
  }
  return defaultSettings;
};