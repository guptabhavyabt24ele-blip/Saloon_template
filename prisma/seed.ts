import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.appointment.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.staff.deleteMany();
  await prisma.service.deleteMany();
  await prisma.galleryImage.deleteMany();
  await prisma.review.deleteMany();
  await prisma.user.deleteMany();
  await prisma.salon.deleteMany();

  const salon = await prisma.salon.create({
    data: {
      name: 'VELORA Hair & Beauty Studio',
      slug: 'velora',
      email: 'hello@velora.example',
      phone: '+91 98765 43210',
      address: '123 Signature Avenue, Demo City, 10001',
      timezone: 'Asia/Kolkata',
      currency: 'INR'
    }
  });

  await prisma.user.create({
    data: {
      name: 'Demo Admin',
      email: 'admin@velora.example',
      password: hashSync('change-me-in-production', 10),
      role: 'SALON_OWNER',
      salonId: salon.id
    }
  });

  await prisma.service.createMany({
    data: [
      {
        salonId: salon.id,
        name: 'Signature Precision Cut',
        slug: 'signature-precision-cut',
        category: 'Haircuts',
        description: 'A tailored cut designed around your face shape, texture, and styling goals.',
        price: 1800,
        duration: 45,
        image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80',
        active: true
      },
      {
        salonId: salon.id,
        name: 'Gloss & Tone Refresh',
        slug: 'gloss-tone-refresh',
        category: 'Hair Coloring',
        description: 'A luminous colour refresh with shine-enhancing gloss to revive your tone.',
        price: 3200,
        duration: 90,
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
        active: true
      },
      {
        salonId: salon.id,
        name: 'Balayage Artistry',
        slug: 'balayage-artistry',
        category: 'Hair Coloring',
        description: 'Dimensional colour placement for a soft, blended, sun-kissed finish.',
        price: 4800,
        duration: 120,
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
        active: true
      }
    ]
  });

  const stylist = await prisma.staff.create({
    data: {
      salonId: salon.id,
      name: 'Rhea Kapoor',
      role: 'Senior Stylist',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80',
      specialties: ['Precision cuts', 'Balayage', 'Styling'],
      biography: 'Rhea creates polished, wearable looks that balance softness, movement, and modern structure.',
      experience: '8 years',
      active: true
    }
  });

  await prisma.customer.create({
    data: {
      salonId: salon.id,
      name: 'Demo Guest',
      phone: '+91 90000 00000',
      email: 'guest@velora.example',
      consent: true,
      notes: 'Demo customer profile for local development.'
    }
  });

  await prisma.galleryImage.createMany({
    data: [
      {
        salonId: salon.id,
        title: 'Soft Layered Bob',
        category: "Women's Haircuts",
        imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80'
      },
      {
        salonId: salon.id,
        title: 'Clean Fade',
        category: "Men's Haircuts",
        imageUrl: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=900&q=80'
      }
    ]
  });

  await prisma.review.create({
    data: {
      salonId: salon.id,
      author: 'Aarav S.',
      rating: 5,
      message: 'Precise, warm, and beautifully styled. The team understands exactly what I want.'
    }
  });

  await prisma.appointment.create({
    data: {
      salonId: salon.id,
      staffId: stylist.id,
      bookingRef: 'VELORA-1001',
      startsAt: new Date('2026-10-15T10:30:00Z'),
      endsAt: new Date('2026-10-15T11:15:00Z'),
      status: 'CONFIRMED',
      totalPrice: 1800,
      deposit: 500
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Seed error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
