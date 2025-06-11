
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, Package, TrendingUp, Users, Plus, Eye, Edit, Truck } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { useSuppliersData } from '@/hooks/useSuppliersData';

const SupplierDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { suppliers, loading } = useSuppliersData();

  const supplierStats = {
    totalEarnings: 125000,
    activeOrders: 8,
    completedOrders: 156,
    pendingQuotes: 12
  };

  const recentOrders = [
    {
      id: 'ORD-001',
      groupName: 'مجموعة تطوير الأنظمة',
      amount: 35000,
      status: 'active',
      deadline: '2024-01-25'
    },
    {
      id: 'ORD-002',
      groupName: 'مجموعة الأثاث المكتبي',
      amount: 25000,
      status: 'delivered',
      deadline: '2024-01-20'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-500';
      case 'delivered': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex">
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
          <main className="flex-1 p-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">جارٍ تحميل لوحة التحكم...</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">لوحة تحكم المورد</h1>
                <p className="text-gray-600 mt-2">إدارة طلباتك وعروضك والعملاء</p>
              </div>
              <Button>
                <Plus className="w-4 h-4 ml-1" />
                إضافة عرض جديد
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">إجمالي الأرباح</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${supplierStats.totalEarnings.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+12% من الشهر الماضي</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">الطلبات النشطة</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{supplierStats.activeOrders}</div>
                  <p className="text-xs text-muted-foreground">+2 طلبات جديدة</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">الطلبات المكتملة</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{supplierStats.completedOrders}</div>
                  <p className="text-xs text-muted-foreground">معدل نجاح 98%</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">عروض الأسعار المعلقة</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{supplierStats.pendingQuotes}</div>
                  <p className="text-xs text-muted-foreground">تحتاج مراجعة</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="orders">الطلبات</TabsTrigger>
                <TabsTrigger value="quotes">عروض الأسعار</TabsTrigger>
                <TabsTrigger value="products">منتجاتي</TabsTrigger>
                <TabsTrigger value="analytics">التحليلات</TabsTrigger>
              </TabsList>

              <TabsContent value="orders" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>الطلبات الحديثة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4 space-x-reverse">
                            <div>
                              <p className="font-medium">{order.groupName}</p>
                              <p className="text-sm text-gray-500">رقم الطلب: {order.id}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 space-x-reverse">
                            <Badge className={`text-white ${getStatusColor(order.status)}`}>
                              {order.status === 'active' ? 'نشط' : 'مُسلم'}
                            </Badge>
                            <span className="font-bold">${order.amount.toLocaleString()}</span>
                            <div className="flex space-x-2 space-x-reverse">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Truck className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="quotes" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>عروض الأسعار المعلقة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد عروض أسعار معلقة</h3>
                      <p className="text-gray-600">ستظهر عروض الأسعار الجديدة هنا</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="products" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>كتالوج المنتجات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">ابدأ بإضافة منتجاتك</h3>
                      <p className="text-gray-600 mb-4">أضف منتجاتك وخدماتك لتسهيل العثور عليها</p>
                      <Button>
                        <Plus className="w-4 h-4 ml-1" />
                        إضافة منتج
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>أداء المبيعات</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-600">ستظهر تحليلات المبيعات هنا</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>تقييمات العملاء</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-600">ستظهر تقييمات العملاء هنا</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SupplierDashboard;
