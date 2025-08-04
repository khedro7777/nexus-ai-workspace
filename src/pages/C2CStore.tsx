
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Search, 
  Filter, 
  Plus,
  Store,
  Heart,
  MessageCircle,
  Star,
  Eye,
  ShoppingCart,
  User
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

// Mock C2C products data
const mockProducts = [
  {
    id: '1',
    title: 'Professional Office Desk Setup',
    description: 'Complete ergonomic office desk with monitor stand, keyboard tray, and cable management',
    price: 450,
    currency: 'USD',
    condition: 'Like New',
    category: 'Office Equipment',
    seller: {
      name: 'John Smith',
      rating: 4.8,
      reviews: 24
    },
    images: ['/placeholder.svg'],
    location: 'New York, NY',
    postedDate: '2024-01-15',
    views: 128,
    likes: 15,
    tags: ['office', 'desk', 'ergonomic']
  },
  {
    id: '2',
    title: 'Industrial 3D Printer - Ultimaker S5',
    description: 'Professional grade 3D printer, barely used, includes extra filaments and accessories',
    price: 3200,
    currency: 'USD',
    condition: 'Excellent',
    category: 'Industrial Equipment',
    seller: {
      name: 'TechStart Solutions',
      rating: 4.9,
      reviews: 67
    },
    images: ['/placeholder.svg'],
    location: 'San Francisco, CA',
    postedDate: '2024-01-14',
    views: 89,
    likes: 23,
    tags: ['3d-printer', 'industrial', 'manufacturing']
  },
  {
    id: '3',
    title: 'Bulk Office Supplies Package',
    description: 'Large lot of office supplies including paper, pens, folders, and more. Perfect for startups',
    price: 125,
    currency: 'USD',
    condition: 'New',
    category: 'Office Supplies',
    seller: {
      name: 'Sarah Johnson',
      rating: 4.7,
      reviews: 12
    },
    images: ['/placeholder.svg'],
    location: 'Chicago, IL',
    postedDate: '2024-01-13',
    views: 234,
    likes: 8,
    tags: ['supplies', 'bulk', 'office']
  },
  {
    id: '4',
    title: 'Conference Room Furniture Set',
    description: 'Complete conference room set with table and 8 chairs, modern design, great condition',
    price: 850,
    currency: 'USD',
    condition: 'Good',
    category: 'Furniture',
    seller: {
      name: 'Office Liquidators',
      rating: 4.6,
      reviews: 43
    },
    images: ['/placeholder.svg'],
    location: 'Austin, TX',
    postedDate: '2024-01-12',
    views: 67,
    likes: 19,
    tags: ['furniture', 'conference', 'meeting']
  }
];

const C2CStore = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const categories = [...new Set(mockProducts.map(product => product.category))];
  const conditions = [...new Set(mockProducts.map(product => product.condition))];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesCondition = !selectedCondition || product.condition === selectedCondition;
    
    return matchesSearch && matchesCategory && matchesCondition;
  });

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'New':
        return 'bg-green-100 text-green-800';
      case 'Like New':
        return 'bg-blue-100 text-blue-800';
      case 'Excellent':
        return 'bg-purple-100 text-purple-800';
      case 'Good':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Store className="w-8 h-8 text-blue-600" />
                C2C Marketplace
              </h1>
              <p className="text-gray-600">
                Buy and sell products directly with other users in our community marketplace
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  List Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>List New Product</DialogTitle>
                  <DialogDescription>
                    Create a listing to sell your product to other users
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input placeholder="Product title" />
                  <textarea 
                    className="w-full p-3 border rounded-lg resize-none h-24" 
                    placeholder="Product description"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input type="number" placeholder="Price" />
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="like-new">Like New</SelectItem>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Create Listing</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Conditions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Conditions</SelectItem>
                  {conditions.map(condition => (
                    <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="relative">
                <img 
                  src={product.images[0]} 
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                >
                  <Heart className="w-4 h-4" />
                </Button>
                <Badge className={`absolute top-2 left-2 ${getConditionColor(product.condition)}`}>
                  {product.condition}
                </Badge>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-lg line-clamp-2">{product.title}</CardTitle>
                <p className="text-2xl font-bold text-blue-600">
                  ${product.price.toLocaleString()}
                  <span className="text-sm font-normal text-gray-500 ml-1">{product.currency}</span>
                </p>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{product.seller.name}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-500">
                        {product.seller.rating} ({product.seller.reviews})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{product.location}</span>
                  <span>{new Date(product.postedDate).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{product.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      <span>{product.likes}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-3 h-3 mr-1" />
                      Message
                    </Button>
                    <Button size="sm">
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      Buy
                    </Button>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {product.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Store className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or be the first to list a product!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default C2CStore;
