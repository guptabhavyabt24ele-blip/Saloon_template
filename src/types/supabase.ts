export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

type Timestamps = { created_at: string };

type Salon = {
  id: string;
  name: string;
  slug: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  currency: string;
  created_at: string;
};

type Staff = Timestamps & {
  id: string;
  salon_id: string;
  name: string;
  role: string;
  bio: string | null;
  avatar_url: string | null;
  is_active: boolean;
};

type Service = Timestamps & {
  id: string;
  salon_id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string;
  duration_minutes: number;
  price: number;
  is_featured: boolean;
  image_url: string | null;
};

type Customer = Timestamps & {
  id: string;
  salon_id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  notes: string | null;
};

type Appointment = Timestamps & {
  id: string;
  salon_id: string;
  customer_id: string | null;
  staff_id: string | null;
  service_id: string | null;
  booking_ref: string;
  scheduled_at: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  total_price: number;
  deposit_amount: number;
  notes: string | null;
};

type Payment = Timestamps & {
  id: string;
  appointment_id: string;
  amount: number;
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  provider: string | null;
  transaction_id: string | null;
};

type GalleryItem = Timestamps & {
  id: string;
  salon_id: string;
  title: string;
  image_url: string;
  category: string;
};

type ContactMessage = Timestamps & {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: 'unread' | 'read' | 'archived';
};

type Setting = Timestamps & {
  id: string;
  salon_id: string;
  key: string;
  value: Json;
};

type TableDefinition<Row, Insert = Partial<Omit<Row, 'id' | 'created_at'>>, Update = Partial<Insert>> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      salons: TableDefinition<Salon, Omit<Salon, 'id' | 'created_at'> & { id?: string; created_at?: string }>;
      staff: TableDefinition<Staff, Omit<Staff, 'id' | 'created_at'> & { id?: string; created_at?: string }>;
      services: TableDefinition<Service, Omit<Service, 'id' | 'created_at'> & { id?: string; created_at?: string }>;
      customers: TableDefinition<Customer, Omit<Customer, 'id' | 'created_at'> & { id?: string; created_at?: string }>;
      appointments: TableDefinition<Appointment, Omit<Appointment, 'id' | 'created_at'> & { id?: string; created_at?: string }>;
      payments: TableDefinition<Payment, Omit<Payment, 'id' | 'created_at'> & { id?: string; created_at?: string }>;
      gallery_items: TableDefinition<GalleryItem, Omit<GalleryItem, 'id' | 'created_at'> & { id?: string; created_at?: string }>;
      contact_messages: TableDefinition<ContactMessage, Omit<ContactMessage, 'id' | 'created_at'> & { id?: string; created_at?: string }>;
      settings: TableDefinition<Setting, Omit<Setting, 'id' | 'created_at'> & { id?: string; created_at?: string }>;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
