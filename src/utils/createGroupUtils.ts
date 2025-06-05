
export const getGroupTypeTitle = (groupType: string) => {
  switch (groupType) {
    case 'group_buying': return 'إنشاء مجموعة شراء تعاوني';
    case 'marketing': return 'إنشاء مجموعة تسويق تعاوني';
    case 'freelance_request': return 'طلب خدمة مستقلين';
    case 'supplier_request': return 'طلب عروض موردين';
    default: return 'إنشاء مجموعة جديدة';
  }
};
