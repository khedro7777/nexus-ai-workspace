
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building, Calendar, DollarSign, Truck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface SupplierOffersProps {
  groupId: string;
}

interface SupplierOffer {
  id: string;
  company_name: string;
  offer_description: string;
  price_details: any;
  delivery_terms: string;
  payment_terms: string;
  valid_until: string;
  status: string;
  created_at: string;
}

const SupplierOffers: React.FC<SupplierOffersProps> = ({ groupId }) => {
  const { user } = useAuth();
  const [offers, setOffers] = useState<SupplierOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffers();
  }, [groupId]);

  const fetchOffers = async () => {
    try {
      const { data, error } = await supabase
        .from('supplier_offers')
        .select('*')
        .eq('group_id', groupId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOffers(data || []);
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { label: 'قيد المراجعة', variant: 'secondary' as const },
      accepted: { label: 'مقبول', variant: 'default' as const },
      rejected: { label: 'مرفوض', variant: 'destructive' as const },
      withdrawn: { label: 'محذوف', variant: 'outline' as const }
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.pending;
  };

  if (loading) {
    return <div className="text-center py-4">جاري تحميل العروض...</div>;
  }

  return (
    <div className="space-y-4">
      {offers.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <Building className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">لا توجد عروض من الموردين حالياً</p>
          </CardContent>
        </Card>
      ) : (
        offers.map((offer) => {
          const statusInfo = getStatusBadge(offer.status);
          
          return (
            <Card key={offer.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="w-5 h-5" />
                      {offer.company_name || 'مورد'}
                    </CardTitle>
                    <CardDescription>{offer.offer_description}</CardDescription>
                  </div>
                  <Badge variant={statusInfo.variant}>
                    {statusInfo.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {offer.price_details && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="font-medium">
                        السعر: {JSON.stringify(offer.price_details)}
                      </span>
                    </div>
                  )}

                  {offer.delivery_terms && (
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-blue-600" />
                      <span>شروط التسليم: {offer.delivery_terms}</span>
                    </div>
                  )}

                  {offer.payment_terms && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-purple-600" />
                      <span>شروط الدفع: {offer.payment_terms}</span>
                    </div>
                  )}

                  {offer.valid_until && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-orange-600" />
                      <span>صالح حتى: {new Date(offer.valid_until).toLocaleDateString('ar-SA')}</span>
                    </div>
                  )}

                  <div className="text-sm text-gray-500">
                    تم الإرسال في: {new Date(offer.created_at).toLocaleDateString('ar-SA')}
                  </div>

                  {offer.status === 'pending' && (
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="default">
                        قبول العرض
                      </Button>
                      <Button size="sm" variant="outline">
                        رفض العرض
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default SupplierOffers;
