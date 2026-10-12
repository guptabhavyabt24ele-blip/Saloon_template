import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseAdmin } from '@/app/api/_lib/supabase';

const schema = z.object({ reference: z.string().trim().min(6).max(40) });

export async function GET(request: Request) {
  const reference = new URL(request.url).searchParams.get('reference') ?? '';
  const parsed = schema.safeParse({ reference });
  if (!parsed.success) return NextResponse.json({ error: 'Enter a valid booking reference.' }, { status: 400 });
  const client = getSupabaseAdmin();
  if (!client) return NextResponse.json({ booking: null });
  const { data, error } = await client.from('appointments').select('booking_ref,status,scheduled_at,total_price,notes,customers(full_name,name),services(name,title),staff(name)').eq('booking_ref', parsed.data.reference.toUpperCase()).maybeSingle();
  if (error) return NextResponse.json({ error: 'We could not look up that booking.' }, { status: 500 });
  if (!data) return NextResponse.json({ booking: null });
  return NextResponse.json({ booking: data });
}
