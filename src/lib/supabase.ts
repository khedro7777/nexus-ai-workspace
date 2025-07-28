import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://zzykyjvjchocuxtxfvok.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6eWt5anZqY2hvY3V4dHhmdm9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1NjE1NDAsImV4cCI6MjA2OTEzNzU0MH0.HmqppN32EAFraAiww4Y5oh9wzkXU4Px9FPPXsZtN6Wo';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Database table names
export const TABLES = {
  USERS: 'users',
  GROUPS: 'groups',
  GROUP_MEMBERS: 'group_members',
  SUPPLIERS: 'suppliers',
  PRODUCTS: 'products',
  ORDERS: 'orders',
  ORDER_ITEMS: 'order_items',
  NEGOTIATIONS: 'negotiations',
  CONTRACTS: 'contracts',
  PAYMENTS: 'payments',
  NOTIFICATIONS: 'notifications',
  AUTOMATION_WORKFLOWS: 'automation_workflows',
  WORKFLOW_EXECUTIONS: 'workflow_executions',
  AI_CONVERSATIONS: 'ai_conversations',
  TRANSLATIONS: 'translations',
  ANALYTICS: 'analytics',
  POINTS: 'points',
  POINT_TRANSACTIONS: 'point_transactions'
} as const;

// Type definitions for database tables
export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: 'admin' | 'user' | 'supplier' | 'freelancer';
  company_name?: string;
  phone?: string;
  address?: string;
  points: number;
  created_at: string;
  updated_at: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'active' | 'closed' | 'pending';
  creator_id: string;
  target_quantity: number;
  current_quantity: number;
  target_price: number;
  current_price?: number;
  deadline: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface GroupMember {
  id: string;
  group_id: string;
  user_id: string;
  quantity: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  joined_at: string;
}

export interface Supplier {
  id: string;
  user_id: string;
  company_name: string;
  business_license: string;
  categories: string[];
  rating: number;
  total_orders: number;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  supplier_id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  min_quantity: number;
  max_quantity?: number;
  unit: string;
  images: string[];
  specifications: Record<string, any>;
  status: 'active' | 'inactive' | 'out_of_stock';
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  group_id: string;
  supplier_id: string;
  user_id: string;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  shipping_address: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Negotiation {
  id: string;
  group_id: string;
  supplier_id: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  initial_price: number;
  final_price?: number;
  messages: any[];
  deadline: string;
  created_at: string;
  updated_at: string;
}

export interface Contract {
  id: string;
  negotiation_id: string;
  group_id: string;
  supplier_id: string;
  terms: Record<string, any>;
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  order_id: string;
  user_id: string;
  amount: number;
  currency: string;
  payment_method: 'paypal' | 'credit_card' | 'bank_transfer' | 'points';
  payment_id?: string; // PayPal payment ID
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  data?: Record<string, any>;
  created_at: string;
}

export interface AutomationWorkflow {
  id: string;
  user_id: string;
  name: string;
  description: string;
  trigger_type: string;
  trigger_config: Record<string, any>;
  action_type: string;
  action_config: Record<string, any>;
  status: 'active' | 'paused' | 'inactive';
  last_execution?: string;
  execution_count: number;
  success_rate: number;
  created_at: string;
  updated_at: string;
}

export interface WorkflowExecution {
  id: string;
  workflow_id: string;
  status: 'success' | 'failed' | 'running';
  input_data: Record<string, any>;
  output_data?: Record<string, any>;
  error_message?: string;
  execution_time: number;
  created_at: string;
}

export interface AIConversation {
  id: string;
  user_id: string;
  agent_type: string;
  messages: any[];
  context?: string;
  created_at: string;
  updated_at: string;
}

export interface Translation {
  id: string;
  user_id: string;
  source_text: string;
  target_text: string;
  source_language: string;
  target_language: string;
  service: 'deepl' | 'openai';
  created_at: string;
}

export interface Analytics {
  id: string;
  user_id?: string;
  event_type: string;
  event_data: Record<string, any>;
  timestamp: string;
}

export interface Points {
  id: string;
  user_id: string;
  balance: number;
  total_earned: number;
  total_spent: number;
  updated_at: string;
}

export interface PointTransaction {
  id: string;
  user_id: string;
  type: 'earned' | 'spent' | 'refunded';
  amount: number;
  description: string;
  reference_id?: string;
  reference_type?: string;
  created_at: string;
}

// Helper functions for database operations
export class SupabaseService {
  // User operations
  static async getUser(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }
    
    return data;
  }

  static async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const { data, error } = await supabase
      .from(TABLES.USERS)
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating user:', error);
      return null;
    }
    
    return data;
  }

  // Group operations
  static async getGroups(filters?: any): Promise<Group[]> {
    let query = supabase.from(TABLES.GROUPS).select('*');
    
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    
    if (filters?.category) {
      query = query.eq('category', filters.category);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching groups:', error);
      return [];
    }
    
    return data || [];
  }

  static async createGroup(group: Omit<Group, 'id' | 'created_at' | 'updated_at'>): Promise<Group | null> {
    const { data, error } = await supabase
      .from(TABLES.GROUPS)
      .insert({
        ...group,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating group:', error);
      return null;
    }
    
    return data;
  }

  // Supplier operations
  static async getSuppliers(filters?: any): Promise<Supplier[]> {
    let query = supabase.from(TABLES.SUPPLIERS).select('*');
    
    if (filters?.verified !== undefined) {
      query = query.eq('verified', filters.verified);
    }
    
    if (filters?.category) {
      query = query.contains('categories', [filters.category]);
    }
    
    const { data, error } = await query.order('rating', { ascending: false });
    
    if (error) {
      console.error('Error fetching suppliers:', error);
      return [];
    }
    
    return data || [];
  }

  // Analytics operations
  static async trackEvent(eventType: string, eventData: Record<string, any>, userId?: string): Promise<void> {
    const { error } = await supabase
      .from(TABLES.ANALYTICS)
      .insert({
        user_id: userId,
        event_type: eventType,
        event_data: eventData,
        timestamp: new Date().toISOString()
      });
    
    if (error) {
      console.error('Error tracking event:', error);
    }
  }

  // Points operations
  static async getUserPoints(userId: string): Promise<Points | null> {
    const { data, error } = await supabase
      .from(TABLES.POINTS)
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching user points:', error);
      return null;
    }
    
    return data;
  }

  static async addPointTransaction(transaction: Omit<PointTransaction, 'id' | 'created_at'>): Promise<PointTransaction | null> {
    const { data, error } = await supabase
      .from(TABLES.POINT_TRANSACTIONS)
      .insert({
        ...transaction,
        created_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error adding point transaction:', error);
      return null;
    }
    
    return data;
  }

  // Real-time subscriptions
  static subscribeToTable(table: string, callback: (payload: any) => void) {
    return supabase
      .channel(`${table}_changes`)
      .on('postgres_changes', { event: '*', schema: 'public', table }, callback)
      .subscribe();
  }
}

export default supabase;

