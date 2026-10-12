import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseAdmin } from '@/app/api/_lib/supabase';

const contactSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().min(7).optional().or(z.literal('')),
  message: z.string().trim().min(10).max(4000)
});

export async function POST(request: Request) {
  try {
    const parsed = contactSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: 'Please complete the form with valid details.' }, { status: 400 });

    const client = getSupabaseAdmin();
    if (client) {
      const { error } = await client.from('contact_messages').insert({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        message: parsed.data.message,
        status: 'unread'
      });
      if (error) {
        console.error('Contact message insert failed', error);
        return NextResponse.json({ error: 'We could not send your message right now.' }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true, message: 'Thank you. We will be in touch shortly.' });
  } catch (error) {
    console.error('Contact request failed', error);
    return NextResponse.json({ error: 'We could not send your message right now.' }, { status: 500 });
  }
}
