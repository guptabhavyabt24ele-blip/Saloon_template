import { galleryItems as fallbackGallery, services as fallbackServices, stylists as fallbackStylists, type GalleryItem, type Service, type Stylist } from '@/lib/data';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import type { Tables } from '@/types/supabase';

export type PublicService = Service;
export type PublicStylist = Stylist;
export type PublicGalleryItem = GalleryItem;

const DEFAULT_SALON_SLUG = 'velora';

function toService(row: Tables<'services'>): Service {
  return {
    id: row.id,
    name: row.title,
    slug: row.slug,
    category: row.category,
    description: row.description ?? '',
    price: row.price,
    duration: row.duration_minutes,
    image: row.image_url ?? ''
  };
}

function toStylist(row: Tables<'staff'>): Stylist {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    biography: row.bio ?? '',
    specialties: [],
    experience: '',
    photo: row.avatar_url ?? ''
  };
}

function toGalleryItem(row: Tables<'gallery_items'>): GalleryItem {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    image: row.image_url
  };
}

async function getSalonId(client: NonNullable<ReturnType<typeof getSupabaseServerClient>>): Promise<string | null> {
  const { data, error } = await client.from('salons').select('id').eq('slug', DEFAULT_SALON_SLUG).maybeSingle();
  if (error || !data) return null;
  return data.id;
}

export async function getPublicServices(): Promise<PublicService[]> {
  const client = getSupabaseServerClient();
  if (!client) return fallbackServices;

  try {
    const salonId = await getSalonId(client);
    if (!salonId) return fallbackServices;
    const { data, error } = await client.from('services').select('*').eq('salon_id', salonId).order('title');
    if (error || !data?.length) return fallbackServices;
    return data.map(toService);
  } catch {
    return fallbackServices;
  }
}

export async function getPublicStylists(): Promise<PublicStylist[]> {
  const client = getSupabaseServerClient();
  if (!client) return fallbackStylists;

  try {
    const salonId = await getSalonId(client);
    if (!salonId) return fallbackStylists;
    const { data, error } = await client.from('staff').select('*').eq('salon_id', salonId).eq('is_active', true).order('name');
    if (error || !data?.length) return fallbackStylists;
    return data.map(toStylist);
  } catch {
    return fallbackStylists;
  }
}

export async function getPublicGallery(): Promise<PublicGalleryItem[]> {
  const client = getSupabaseServerClient();
  if (!client) return fallbackGallery;

  try {
    const salonId = await getSalonId(client);
    if (!salonId) return fallbackGallery;
    const { data, error } = await client.from('gallery_items').select('*').eq('salon_id', salonId).order('created_at', { ascending: false });
    if (error || !data?.length) return fallbackGallery;
    return data.map(toGalleryItem);
  } catch {
    return fallbackGallery;
  }
}

export type CreateAppointmentInput = {
  fullName: string;
  email?: string;
  phone: string;
  staffId?: string;
  serviceId?: string;
  scheduledAt: string;
  totalPrice: number;
  depositAmount?: number;
  notes?: string;
};

export async function createAppointment(input: CreateAppointmentInput): Promise<{ id: string } | null> {
  const client = getSupabaseServerClient();
  if (!client) return null;

  try {
    const salonId = await getSalonId(client);
    if (!salonId) return null;

    const { data: customer, error: customerError } = await client.from('customers').insert({
      salon_id: salonId,
      full_name: input.fullName,
      email: input.email || null,
      phone: input.phone,
      notes: input.notes || null
    }).select('id').single();
    if (customerError || !customer) return null;

    const bookingRef = `VLR-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const { data: appointment, error: appointmentError } = await client.from('appointments').insert({
      salon_id: salonId,
      customer_id: customer.id,
      staff_id: input.staffId || null,
      service_id: input.serviceId || null,
      booking_ref: bookingRef,
      scheduled_at: input.scheduledAt,
      status: 'pending',
      total_price: input.totalPrice,
      deposit_amount: input.depositAmount ?? 0,
      notes: input.notes || null
    }).select('id').single();
    if (appointmentError || !appointment) return null;
    return appointment;
  } catch {
    return null;
  }
}
