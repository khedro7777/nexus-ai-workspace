
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  Filter, 
  Plus,
  ShoppingBag,
  User,
  Star,
  MessageCircle,
  Eye,
  Heart,
  MapPin,
  Calendar
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: 'new' | 'like-new' | 'good' | 'fair';
  seller: {
    id: string;
    name: string;
    rating: number;
    location: string;
  };
  images: string[];
  createdAt: string;
  tags: string[];
  views: number;
  likes: number;
  groupRelated?: boolean;
}

const C2CStore = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: 'good',
    tags: ''
  });

  // Sample products data
  const [products] = useState<Product[]>([
    {
      id: '1',
      title: 'MacBook Pro M1 14-inch',
      description: 'Excellent condition MacBook Pro with M1 chip. Perfect for development work. Includes original charger and box.',
      price: 1800,
      category: 'Electronics',
      condition: 'like-new',
      seller: {
        id: 'seller1',
        name: 'Ahmed Hassan',
        rating: 4.8,
        location: 'Dubai, UAE'
      },
      images: ['/placeholder.svg'],
      createdAt: '2024-01-15',
      tags: ['laptop', 'apple', 'programming'],
      views: 245,
      likes: 18,
      groupRelated: false
    },
    {
      id: '2',
      title: 'Office Furniture Set',
      description: 'Complete office furniture set from our group buying project. Includes desk, chair, and storage unit.',
      price: 650,
      category: 'Furniture',
      condition: 'new',
      seller: {
        id: 'seller2',
        name: 'Sarah Al-Zahra',
        rating: 4.9,
        location: 'Riyadh, KSA'
      },
      images: ['/placeholder.svg'],
      createdAt: '2024-01-12',
      tags: ['office', 'furniture', 'group-buying'],
      views: 189,
      likes: 25,
      groupRelated: true
    },
    {
      id: '3',
      title: 'Professional Camera Kit',
      description: 'Canon EOS R5 with multiple lenses. Great for photography professionals. Barely used.',
      price: 2200,
      category: 'Photography',
      condition: 'like-new',
      seller: {
        id: 'seller3',
        name: 'Mohamed Abdel',
        rating: 4.7,
        location: 'Cairo, Egypt'
      },
      images: ['/placeholder.svg'],
      createdAt: '2024-01-10',
      tags: ['camera', 'photography', 'professional'],
      views: 156,
      likes: 12,
      groupRelated: false
    }
  ]);

  const categories = ['Electronics', 'Furniture', 'Photography', 'Books', 'Sports', 'Fashion', 'Home & Garden'];
  const conditions = ['new', 'like-new', 'good', 'fair'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesCondition = !selectedCondition || product.condition === selectedCondition;
    
    return matchesSearch && matchesCategory && matchesCondition;
  });

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new': return 'bg-green-100 text-green-800';
      case 'like-new': return 'bg-blue-100 text-blue-800';
      case 'good': return 'bg-yellow-100 text-yellow-800';
      case 'fair': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateProduct = () => {
    // Here you would typically send the data to your backend
    console.log('Creating product:', newProduct);
    setIsCreateDialogOpen(false);
    setNewProduct({
      title: '',
      description: '',
      price: '',
      category: '',
      condition: 'good',
      tags: ''
    });
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
                <ShoppingBag className="w-8 h-8 text-blue-600" />
                C2C Marketplace
              </h1>
              <p className="text-gray-600">
                Buy and sell products directly with other platform users
              </p>
            </div>
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
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
                    Create a new listing for other users to discover and purchase
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Product Title</Label>
                      <Input
                        id="title"
                        value={newProduct.title}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter product title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Price (USD)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={newProduct.category} onValueChange={(value) => setNewProduct(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="condition">Condition</Label>
                      <Select value={newProduct.condition} onValueChange={(value) => setNewProduct(prev => ({ ...prev, condition: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          {conditions.map(condition => (
                            <SelectItem key={condition} value={condition}>
                              {condition.charAt(0).toUpperCase() + condition.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe your product in detail..."
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input
                      id="tags"
                      value={newProduct.tags}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, tags: e.target.value }))}
                      placeholder="e.g. laptop, apple, programming"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateProduct}>
                      Create Listing
                    </Button>
                  </div>
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
                  placeholder="Search products, sellers, or tags..."
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
                    <SelectItem key={condition} value={condition}>
                      {condition.charAt(0).toUpperCase() + condition.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                {product.groupRelated && (
                  <Badge className="absolute top-2 left-2 bg-blue-600">
                    Group Related
                  </Badge>
                )}
              </div>

              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg line-clamp-1">{product.title}</h3>
                  <Badge className={getConditionColor(product.condition)}>
                    {product.condition}
                  </Badge>
                </div>

                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-blue-600">
                    ${product.price}
                  </span>
                  <Badge variant="outline">{product.category}</Badge>
                </div>

                {/* Seller Info */}
                <div className="flex items-center gap-2 mb-3 p-2 bg-gray-50 rounded-lg">
                  <User className="w-4 h-4 text-gray-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{product.seller.name}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-gray-600">{product.seller.rating}</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {product.seller.location}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {product.views} views
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {product.likes} likes
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(product.createdAt).toLocaleDateString()}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {product.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button className="flex-1">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or be the first to list a product!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default C2CStore;
