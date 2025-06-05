
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface CreateSupplierOfferProps {
  groupId: string;
  onOfferCreated: () => void;
}

const CreateSupplierOffer: React.FC<CreateSupplierOfferProps> = ({ groupId, onOfferCreated }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company_name: '',
    offer_description: '',
    price: '',
    delivery_terms: '',
    payment_terms: '',
    valid_until: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      const { error } = await supabase
        .from('supplier_offers')
        .insert({
          group_id: groupId,
          supplier_id: user.id,
          company_name: formData.company_name,
          offer_description: formData.offer_description,
          price_details: formData.price ? { amount: formData.price } : null,
          delivery_terms: formData.delivery_terms,
          payment_terms: formData.payment_terms,
          valid_until: formData.valid_until || null,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "تم إرسال العرض",
        description: "تم إرسال عرضك بنجاح وسيتم مراجعته"
      });

      setFormData({
        company_name: '',
        offer_description: '',
        price: '',
        delivery_terms: '',
        payment_terms: '',
        valid_until: ''
      });

      onOfferCreated();
    } catch (error: any) {
      toast({
        title: "خطأ في إرسال العرض",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>تقديم عرض للمجموعة</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="company_name">اسم الشركة</Label>
            <Input
              id="company_name"
              value={formData.company_name}
              onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="offer_description">وصف العرض</Label>
            <Textarea
              id="offer_description"
              value={formData.offer_description}
              onChange={(e) => setFormData(prev => ({ ...prev, offer_description: e.target.value }))}
              required
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="price">السعر</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              placeholder="أدخل السعر"
            />
          </div>

          <div>
            <Label htmlFor="delivery_terms">شروط التسليم</Label>
            <Input
              id="delivery_terms"
              value={formData.delivery_terms}
              onChange={(e) => setFormData(prev => ({ ...prev, delivery_terms: e.target.value }))}
              placeholder="مثال: خلال 15 يوم عمل"
            />
          </div>

          <div>
            <Label htmlFor="payment_terms">شروط الدفع</Label>
            <Input
              id="payment_terms"
              value={formData.payment_terms}
              onChange={(e) => setFormData(prev => ({ ...prev, payment_terms: e.target.value }))}
              placeholder="مثال: 50% مقدم، 50% عند التسليم"
            />
          </div>

          <div>
            <Label htmlFor="valid_until">العرض صالح حتى</Label>
            <Input
              id="valid_until"
              type="date"
              value={formData.valid_until}
              onChange={(e) => setFormData(prev => ({ ...prev, valid_until: e.target.value }))}
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'جاري الإرسال...' : 'إرسال العرض'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateSupplierOffer;
