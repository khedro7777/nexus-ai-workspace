import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CreditCard, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  Loader2 
} from 'lucide-react';
import { paypalService, loadPayPalSDK, PayPalPaymentRequest } from '@/lib/paypal';
import { SupabaseService } from '@/lib/supabase';

interface PayPalButtonProps {
  amount: number;
  currency?: string;
  description: string;
  orderId?: string;
  userId?: string;
  onSuccess?: (orderDetails: any) => void;
  onError?: (error: any) => void;
  onCancel?: () => void;
  disabled?: boolean;
  className?: string;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({
  amount,
  currency = 'USD',
  description,
  orderId,
  userId,
  onSuccess,
  onError,
  onCancel,
  disabled = false,
  className = ''
}) => {
  const paypalRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!paypalRef.current || disabled) return;

    const initializePayPal = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Load PayPal SDK
        const paypal = await loadPayPalSDK();

        // Validate amount
        if (!paypalService.validateAmount(amount)) {
          throw new Error('مبلغ الدفع غير صالح');
        }

        // Clear previous buttons
        if (paypalRef.current) {
          paypalRef.current.innerHTML = '';
        }

        const paymentRequest: PayPalPaymentRequest = {
          amount,
          currency,
          description,
          orderId,
          userId,
          returnUrl: `${window.location.origin}/payment/success`,
          cancelUrl: `${window.location.origin}/payment/cancel`
        };

        // Render PayPal button
        paypal.Buttons({
          style: {
            layout: 'vertical',
            color: 'blue',
            shape: 'rect',
            label: 'paypal',
            height: 45,
            tagline: false
          },
          createOrder: async () => {
            try {
              setIsProcessing(true);
              const order = await paypalService.createOrder(paymentRequest);
              
              // Track payment initiation
              if (userId) {
                await SupabaseService.trackEvent('payment_initiated', {
                  orderId: order.id,
                  amount,
                  currency,
                  paymentMethod: 'paypal'
                }, userId);
              }
              
              return order.id;
            } catch (error: any) {
              console.error('Order creation failed:', error);
              setError('فشل في إنشاء الطلب. يرجى المحاولة مرة أخرى.');
              setIsProcessing(false);
              throw error;
            }
          },
          onApprove: async (data: any) => {
            try {
              const orderDetails = await paypalService.captureOrder(data.orderID);
              
              // Save payment to database
              if (userId && orderId) {
                await SupabaseService.trackEvent('payment_completed', {
                  paypalOrderId: data.orderID,
                  orderId,
                  amount,
                  currency,
                  status: orderDetails.status
                }, userId);
              }
              
              setIsProcessing(false);
              onSuccess?.(orderDetails);
            } catch (error: any) {
              console.error('Payment capture failed:', error);
              setError('فشل في معالجة الدفع. يرجى التواصل مع الدعم.');
              setIsProcessing(false);
              onError?.(error);
            }
          },
          onError: (err: any) => {
            console.error('PayPal payment error:', err);
            setError('حدث خطأ في عملية الدفع. يرجى المحاولة مرة أخرى.');
            setIsProcessing(false);
            onError?.(err);
          },
          onCancel: (data: any) => {
            console.log('Payment cancelled:', data);
            setIsProcessing(false);
            onCancel?.();
          }
        }).render(paypalRef.current);

        setIsLoading(false);
      } catch (error: any) {
        console.error('PayPal initialization error:', error);
        setError('فشل في تحميل خدمة الدفع. يرجى إعادة تحميل الصفحة.');
        setIsLoading(false);
      }
    };

    initializePayPal();
  }, [amount, currency, description, orderId, userId, disabled]);

  if (disabled) {
    return (
      <Card className={`opacity-50 ${className}`}>
        <CardContent className="p-4">
          <div className="text-center text-gray-500">
            الدفع غير متاح حالياً
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-blue-200 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <CreditCard className="w-5 h-5 text-blue-600" />
          الدفع الآمن
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {paypalService.formatAmount(amount)} {currency}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Shield className="w-4 h-4" />
            محمي بواسطة PayPal
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isProcessing && (
          <Alert>
            <Loader2 className="h-4 w-4 animate-spin" />
            <AlertDescription>
              جاري معالجة الدفع... يرجى عدم إغلاق هذه الصفحة.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-3">
          <div className="text-sm text-gray-600">
            <p className="font-medium mb-1">تفاصيل الدفع:</p>
            <p>{description}</p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <span className="mr-2 text-gray-600">جاري تحميل خيارات الدفع...</span>
            </div>
          ) : (
            <div ref={paypalRef} className="paypal-button-container" />
          )}

          <div className="text-xs text-gray-500 space-y-1">
            <div className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span>دفع آمن ومشفر</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span>حماية المشتري من PayPal</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span>لا توجد رسوم إضافية</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PayPalButton;

