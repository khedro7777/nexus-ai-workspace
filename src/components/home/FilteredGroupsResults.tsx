
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, MapPin, Building, Star, Calendar, ArrowRight } from 'lucide-react';

interface Group {
  id: string;
  name: string;
  description: string;
  phase: string;
  memberCount: number;
  maxMembers?: number;
  status: string;
  rating: number;
  category: string;
  country?: string;
  portalType?: string;
}

interface FilteredGroupsResultsProps {
  groups: Group[];
  onGroupClick: (group: Group) => void;
}

const FilteredGroupsResults: React.FC<FilteredGroupsResultsProps> = ({ groups, onGroupClick }) => {
  if (groups.length === 0) {
    return (
      <Card className="mt-8">
        <CardContent className="p-8 text-center">
          <div className="text-gray-500 mb-4">
            <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No groups found</h3>
            <p>Try adjusting your filters to find more groups.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">Search Results</h3>
        <Badge variant="outline">{groups.length} groups found</Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <Card key={group.id} className="hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={() => onGroupClick(group)}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2 line-clamp-1">{group.name}</CardTitle>
                  <Badge variant="outline" className="mb-2">{group.category}</Badge>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  <span>{group.rating.toFixed(1)}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4 line-clamp-2">{group.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>
                    {group.memberCount} members
                    {group.maxMembers && ` / ${group.maxMembers}`}
                  </span>
                </div>
                {group.country && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{group.country}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Building className="w-4 h-4" />
                  <span>{group.phase}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Badge 
                  variant={group.status === 'Active' ? 'default' : 'secondary'}
                  className={group.status === 'Active' ? 'bg-green-500' : ''}
                >
                  {group.status}
                </Badge>
                <Button size="sm" variant="outline">
                  View Details
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FilteredGroupsResults;
