import { services as fallbackServices, stylists as fallbackStylists } from '@/lib/data';
import { getPublicServices as loadPublicServices } from '@/lib/data-access';
import { getSupabaseServerClient } from '@/lib/supabase/server';

export type PublicService = (typeof fallbackServices)[number];

export const hasSupabase = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
);

export function getSupabaseAdmin() {
  return getSupabaseServerClient();
}

export async function getPublicServices(): Promise<PublicService[]> {
  return loadPublicServices();
}

export function findFallbackStylist(id: string) {
  return fallbackStylists.find((stylist) => stylist.id === id);
}

export function makeReference() {
  return `VELORA-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}
