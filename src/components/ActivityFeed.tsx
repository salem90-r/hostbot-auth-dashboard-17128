import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle, AlertCircle, CreditCard, Wifi, Clock } from "lucide-react";

interface Activity {
  id: string;
  type: 'login' | 'payment' | 'connection' | 'notification';
  title: string;
  description: string;
  time: string;
  status: 'success' | 'warning' | 'info';
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'login',
    title: 'تسجيل دخول جديد',
    description: 'تم تسجيل الدخول بنجاح',
    time: 'منذ 5 دقائق',
    status: 'success'
  },
  {
    id: '2',
    type: 'payment',
    title: 'تم الدفع',
    description: 'تم شحن الكارت بمبلغ 25 جنيه',
    time: 'منذ 30 دقيقة',
    status: 'success'
  },
  {
    id: '3',
    type: 'connection',
    title: 'اتصال بالشبكة',
    description: 'تم الاتصال بشبكة Hotspot-Premium',
    time: 'منذ ساعة',
    status: 'info'
  },
  {
    id: '4',
    type: 'notification',
    title: 'تنبيه الرصيد',
    description: 'الرصيد المتبقي أقل من 20 جنيه',
    time: 'منذ ساعتين',
    status: 'warning'
  }
];

export const ActivityFeed = () => {
  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'login':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'payment':
        return <CreditCard className="w-4 h-4 text-blue-500" />;
      case 'connection':
        return <Wifi className="w-4 h-4 text-primary" />;
      case 'notification':
        return <Bell className="w-4 h-4 text-orange-500" />;
    }
  };

  const getStatusColor = (status: Activity['status']) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'info':
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <Card className="hover-lift transition-fast">
      <CardHeader>
        <CardTitle className="arabic-text flex items-center">
          <Bell className="w-5 h-5 ml-3 text-primary" />
          الأنشطة الأخيرة
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div 
            key={activity.id} 
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-fast animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex-shrink-0 mt-1">
              {getIcon(activity.type)}
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="font-semibold arabic-text text-sm">{activity.title}</h4>
              <p className="text-muted-foreground arabic-text text-xs">{activity.description}</p>
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground arabic-text">{activity.time}</span>
              </div>
            </div>
            <Badge className={`${getStatusColor(activity.status)} text-xs`}>
              {activity.status === 'success' && 'مكتمل'}
              {activity.status === 'warning' && 'تحذير'}
              {activity.status === 'info' && 'معلومة'}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};