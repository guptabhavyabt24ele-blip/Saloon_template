import { NextResponse } from 'next/server';
import { getPublicServices } from '@/app/api/_lib/supabase';

export async function GET() {
  try {
    return NextResponse.json({ services: await getPublicServices() });
  } catch (error) {
    console.error('Services request failed', error);
    return NextResponse.json({ error: 'We could not load services right now.' }, { status: 500 });
  }
}
