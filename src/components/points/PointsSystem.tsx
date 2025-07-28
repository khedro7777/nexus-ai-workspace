
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { 
  Coins, 
  TrendingUp, 
  ShoppingCart, 
  DollarSign,
  History,
  Plus,
  Minus
} from 'lucide-react';

interface UserPoints {
  total_points: number;
  held_points: number;
  available_points: number;
}

interface Transaction {
  id: string;
  amount: number;
  type: string;
  description: string;
  created_at: string;
}

const PointsSystem = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [userPoints, setUserPoints] = useState<UserPoints | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserPoints();
      fetchTransactions();
    }
  }, [user]);

  const fetchUserPoints = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_points')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (!data) {
        // Create initial points record
        const { data: newPoints, error: insertError } = await supabase
          .from('user_points')
          .insert({ user_id: user.id, total_points: 0, held_points: 0, available_points: 0 })
          .select()
          .single();
        
        if (insertError) throw insertError;
        setUserPoints(newPoints);
      } else {
        setUserPoints(data);
      }
    } catch (error: any) {
      console.error('Error fetching user points:', error);
      toast({
        title: "خطأ في جلب النقاط",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const fetchTransactions = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('point_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setTransactions(data || []);
    } catch (error: any) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleWithdraw = async () => {
    if (!user || !userPoints) return;
    
    const amount = parseInt(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "مبلغ غير صحيح",
        description: "يرجى إدخال مبلغ صحيح",
        variant: "destructive"
      });
      return;
    }

    if (amount > userPoints.available_points) {
      toast({
        title: "نقاط غير كافية",
        description: "ليس لديك نقاط كافية للسحب",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Calculate withdrawal amounts (1 point = 0.10 currency unit)
      const moneyAmount = amount * 0.10;
      const commissionRate = 5.00;
      const commissionAmount = (moneyAmount * commissionRate) / 100;
      const netAmount = moneyAmount - commissionAmount;

      const { error } = await supabase
        .from('point_withdrawals')
        .insert({
          user_id: user.id,
          points_amount: amount,
          money_amount: moneyAmount,
          commission_rate: commissionRate,
          commission_amount: commissionAmount,
          net_amount: netAmount
        });

      if (error) throw error;

      // Update user points
      const { error: pointsError } = await supabase.rpc('manage_user_points', {
        p_user_id: user.id,
        p_group_id: null,
        p_amount: amount,
        p_action: 'deduct',
        p_description: `سحب نقاط: ${amount} نقطة`
      });

      if (pointsError) throw pointsError;

      toast({
        title: "تم طلب السحب بنجاح",
        description: `سيتم تحويل ${netAmount.toFixed(2)} بعد خصم العمولة`
      });

      setWithdrawAmount('');
      fetchUserPoints();
      fetchTransactions();
    } catch (error: any) {
      toast({
        title: "خطأ في طلب السحب",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'earn':
        return <Plus className="w-4 h-4 text-green-500" />;
      case 'deduct':
        return <Minus className="w-4 h-4 text-red-500" />;
      case 'hold':
        return <ShoppingCart className="w-4 h-4 text-orange-500" />;
      case 'release':
        return <TrendingUp className="w-4 h-4 text-blue-500" />;
      default:
        return <Coins className="w-4 h-4 text-gray-500" />;
    }
  };

  if (!userPoints) {
    return <div className="flex justify-center items-center h-64">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* Points Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي النقاط</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userPoints.total_points.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">النقاط المتاحة</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{userPoints.available_points.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">النقاط المحجوزة</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{userPoints.held_points.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Withdrawal Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            سحب النقاط
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            معدل التحويل: 1 نقطة = 0.10 وحدة نقدية | عمولة السحب: 5%
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                type="number"
                placeholder="عدد النقاط للسحب"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                min="1"
                max={userPoints.available_points}
              />
            </div>
            <Button 
              onClick={handleWithdraw}
              disabled={loading || !withdrawAmount}
              className="px-6"
            >
              {loading ? 'جاري المعالجة...' : 'سحب'}
            </Button>
          </div>

          {withdrawAmount && !isNaN(parseInt(withdrawAmount)) && (
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <div className="flex justify-between">
                <span>المبلغ الإجمالي:</span>
                <span>{(parseInt(withdrawAmount) * 0.10).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>العمولة (5%):</span>
                <span className="text-red-500">-{((parseInt(withdrawAmount) * 0.10) * 0.05).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>المبلغ الصافي:</span>
                <span className="text-green-600">{((parseInt(withdrawAmount) * 0.10) * 0.95).toFixed(2)}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            سجل المعاملات
          </CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              لا توجد معاملات حتى الآن
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    {getTransactionIcon(transaction.type)}
                    <div>
                      <div className="font-medium">{transaction.description}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(transaction.created_at).toLocaleDateString('ar-SA')}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${
                      transaction.type === 'earn' || transaction.type === 'release' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {transaction.type === 'earn' || transaction.type === 'release' ? '+' : '-'}
                      {Math.abs(transaction.amount).toLocaleString()} نقطة
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {transaction.type === 'earn' ? 'كسب' : 
                       transaction.type === 'deduct' ? 'خصم' : 
                       transaction.type === 'hold' ? 'حجز' : 'إلغاء حجز'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PointsSystem;
