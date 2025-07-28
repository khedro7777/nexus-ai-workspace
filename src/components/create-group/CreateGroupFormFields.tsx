
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreateGroupFormData } from '@/hooks/useCreateGroupForm';
import { countries, sectors } from '@/constants/createGroupConstants';

interface CreateGroupFormFieldsProps {
  formData: CreateGroupFormData;
  updateFormData: (updates: Partial<CreateGroupFormData>) => void;
}

const CreateGroupFormFields: React.FC<CreateGroupFormFieldsProps> = ({
  formData,
  updateFormData
}) => {
  return (
    <div className="space-y-6">
      {/* Contract Type Selection */}
      <div>
        <Label className="text-base font-medium">نوع العقد</Label>
        <RadioGroup 
          value={formData.contractType} 
          onValueChange={(value) => updateFormData({ contractType: value })}
          className="mt-2"
        >
          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="group" id="group" />
            <Label htmlFor="group">عقد جماعي - Group</Label>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <RadioGroupItem value="solo" id="solo" />
            <Label htmlFor="solo">عقد فردي - Solo</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Group Name */}
      <div>
        <Label htmlFor="name">اسم المجموعة *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.target.value })}
          required
          className="text-right"
        />
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">وصف تفصيلي للمجموعة *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
          required
          rows={4}
          className="text-right"
        />
      </div>

      {/* Country */}
      <div>
        <Label htmlFor="country">الدولة / المدينة *</Label>
        <Select value={formData.country} onValueChange={(value) => updateFormData({ country: value })}>
          <SelectTrigger>
            <SelectValue placeholder="اختر الدولة" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.value} value={country.value}>
                {country.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sector */}
      <div>
        <Label htmlFor="sector">الغرض / القطاع *</Label>
        <Select value={formData.sector} onValueChange={(value) => updateFormData({ sector: value })}>
          <SelectTrigger>
            <SelectValue placeholder="اختر القطاع" />
          </SelectTrigger>
          <SelectContent>
            {sectors.map((sector) => (
              <SelectItem key={sector} value={sector}>
                {sector}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Max Members - only for group contract */}
      {formData.contractType === 'group' && (
        <div>
          <Label htmlFor="maxMembers">عدد الأعضاء المستهدف</Label>
          <Input
            id="maxMembers"
            type="number"
            min="2"
            max="100"
            value={formData.maxMembers}
            onChange={(e) => updateFormData({ maxMembers: parseInt(e.target.value) })}
          />
        </div>
      )}

      {/* Negotiation Rounds */}
      <div>
        <Label htmlFor="negotiationRounds">عدد الجولات المخططة للتفاوض</Label>
        <Select value={formData.negotiationRounds.toString()} onValueChange={(value) => updateFormData({ negotiationRounds: parseInt(value) })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 جولة</SelectItem>
            <SelectItem value="2">2 جولات</SelectItem>
            <SelectItem value="3">3 جولات</SelectItem>
            <SelectItem value="4">أكثر من 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Min Entry Amount */}
      <div>
        <Label htmlFor="minEntryAmount">الحد الأدنى للدخول (بالريال السعودي)</Label>
        <Input
          id="minEntryAmount"
          type="number"
          min="0"
          value={formData.minEntryAmount}
          onChange={(e) => updateFormData({ minEntryAmount: parseFloat(e.target.value) })}
        />
      </div>
    </div>
  );
};

export default CreateGroupFormFields;
