import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, 
  Wallet, 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle,
  Star,
  Shield,
  Clock
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import PayPalButton from '@/components/payment/PayPalButton';
import { useAuth } from '@/hooks/useAuth';
import { useSupabaseTable } from '@/hooks/useSupabase';
import { SupabaseService } from '@/lib/supabase';

const Payment = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [userPoints, setUserPoints] = useState(0);

  // Mock order data - replace with real data from Supabase
  const [orderData, setOrderData] = useState({
    id: orderId || '1',
    groupName: 'مجموعة شراء أجهزة كمبيوتر',
    productName: 'جهاز كمبيوتر مكتبي - مواصفات عالية',
    quantity: 2,
    unitPrice: 800.00,
    totalAmount: 1600.00,
    currency: 'USD',
    supplierName: 'شركة التقنية المتطورة',
    supplierRating: 4.8,
    estimatedDelivery: '15-20 يوم عمل',
    description: 'دفع مقابل طلبية أجهزة كمبيوتر مكتبية من مجموعة الشراء الجماعي'
  });

  useEffect(() => {
    // Load user points
    if (user) {
      loadUserPoints();
    }

    // Check for payment success/cancel from URL params
    const status = searchParams.get('status');
    if (status === 'success') {
      setPaymentSuccess(true);
    }
  }, [user, searchParams]);

  const loadUserPoints = async () => {
    if (!user) return;
    
    try {
      const points = await SupabaseService.getUserPoints(user.id);
      setUserPoints(points?.balance || 0);
    } catch (error) {
      console.error('Error loading user points:', error);
    }
  };

  const handlePaymentSuccess = async (paymentDetails: any) => {
    try {
      setIsProcessing(true);
      
      // Save payment record to database
      if (user) {
        await SupabaseService.trackEvent('payment_success', {
          orderId: orderData.id,
          paypalOrderId: paymentDetails.id,
          amount: orderData.totalAmount,
          currency: orderData.currency,
          paymentMethod: 'paypal'
        }, user.id);
      }

      setPaymentSuccess(true);
      
      // Redirect to success page after a delay
      setTimeout(() => {
        navigate(`/orders/${orderData.id}?payment=success`);
      }, 3000);
    } catch (error) {
      console.error('Error processing payment success:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment error:', error);
    // Handle payment error
  };

  const handlePaymentCancel = () => {
    console.log('Payment cancelled');
    // Handle payment cancellation
  };

  const handlePointsPayment = async () => {
    if (!user || userPoints < orderData.totalAmount) return;

    try {
      setIsProcessing(true);
      
      // Deduct points and create payment record
      await SupabaseService.addPointTransaction({
        user_id: user.id,
        type: 'spent',
        amount: Math.round(orderData.totalAmount),
        description: `دفع مقابل الطلبية ${orderData.id}`,
        reference_id: orderData.id,
        reference_type: 'order'
      });

      await SupabaseService.trackEvent('payment_success', {
        orderId: orderData.id,
        amount: orderData.totalAmount,
        currency: 'points',
        paymentMethod: 'points'
      }, user.id);

      setPaymentSuccess(true);
      
      // Redirect to success page
      setTimeout(() => {
        navigate(`/orders/${orderData.id}?payment=success`);
      }, 2000);
    } catch (error) {
      console.error('Error processing points payment:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              تم الدفع بنجاح!
            </h2>
            <p className="text-gray-600 mb-6">
              تم استلام دفعتك وسيتم معالجة طلبك قريباً
            </p>
            <Button 
              onClick={() => navigate('/orders')}
              className="w-full"
            >
              عرض طلباتي
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        
        <main className="flex-1 p-6 pb-32 overflow-y-auto max-h-screen">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="w-4 h-4 ml-2" />
                العودة
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  إتمام الدفع
                </h1>
                <p className="text-gray-600">
                  اختر طريقة الدفع المناسبة لك
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      ملخص الطلب
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {orderData.groupName}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {orderData.productName}
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{orderData.supplierRating}</span>
                        <span className="text-gray-500">{orderData.supplierName}</span>
                      </div>
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>الكمية:</span>
                        <span>{orderData.quantity}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>السعر للوحدة:</span>
                        <span>${orderData.unitPrice}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg border-t pt-2">
                        <span>المجموع:</span>
                        <span>${orderData.totalAmount}</span>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-blue-800">
                        <Clock className="w-4 h-4" />
                        <span>موعد التسليم المتوقع: {orderData.estimatedDelivery}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Payment Methods */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wallet className="w-5 h-5" />
                      طرق الدفع
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="paypal">PayPal</TabsTrigger>
                        <TabsTrigger value="points">النقاط ({userPoints})</TabsTrigger>
                      </TabsList>

                      <TabsContent value="paypal" className="mt-6">
                        <div className="space-y-4">
                          <Alert>
                            <Shield className="h-4 w-4" />
                            <AlertDescription>
                              دفع آمن ومحمي بواسطة PayPal. يمكنك الدفع باستخدام حساب PayPal أو بطاقة ائتمان.
                            </AlertDescription>
                          </Alert>

                          <PayPalButton
                            amount={orderData.totalAmount}
                            currency={orderData.currency}
                            description={orderData.description}
                            orderId={orderData.id}
                            userId={user?.id}
                            onSuccess={handlePaymentSuccess}
                            onError={handlePaymentError}
                            onCancel={handlePaymentCancel}
                            disabled={isProcessing}
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="points" className="mt-6">
                        <div className="space-y-4">
                          <Alert>
                            <Wallet className="h-4 w-4" />
                            <AlertDescription>
                              استخدم نقاطك المكتسبة للدفع. رصيدك الحالي: {userPoints} نقطة
                            </AlertDescription>
                          </Alert>

                          {userPoints >= orderData.totalAmount ? (
                            <div className="space-y-4">
                              <div className="bg-green-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 text-green-800 mb-2">
                                  <CheckCircle className="w-5 h-5" />
                                  <span className="font-semibold">يمكنك الدفع بالنقاط!</span>
                                </div>
                                <p className="text-sm text-green-700">
                                  سيتم خصم {Math.round(orderData.totalAmount)} نقطة من رصيدك
                                </p>
                              </div>
                              
                              <Button 
                                onClick={handlePointsPayment}
                                disabled={isProcessing}
                                className="w-full"
                                size="lg"
                              >
                                {isProcessing ? 'جاري المعالجة...' : 'ادفع بالنقاط'}
                              </Button>
                            </div>
                          ) : (
                            <Alert variant="destructive">
                              <AlertCircle className="h-4 w-4" />
                              <AlertDescription>
                                رصيدك من النقاط غير كافي. تحتاج إلى {Math.round(orderData.totalAmount - userPoints)} نقطة إضافية.
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Payment;

