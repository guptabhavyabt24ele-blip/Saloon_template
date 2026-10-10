export type GalleryItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  serviceSlug?: string;
};

export type Service = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  duration: number;
  image: string;
  featured?: boolean;
};

export type Stylist = {
  id: string;
  name: string;
  role: string;
  biography: string;
  specialties: string[];
  experience: string;
  photo: string;
};

export const services: Service[] = [
  {
    id: 'cut-classic',
    name: 'Signature Precision Cut',
    slug: 'signature-precision-cut',
    category: 'Haircuts',
    description: 'A tailored cut designed around your face shape, texture, and styling goals.',
    price: 1800,
    duration: 45,
    image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80',
    featured: true
  },
  {
    id: 'color-gloss',
    name: 'Gloss & Tone Refresh',
    slug: 'gloss-tone-refresh',
    category: 'Hair Coloring',
    description: 'A luminous colour refresh with shine-enhancing gloss to revive your tone.',
    price: 3200,
    duration: 90,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
    featured: true
  },
  {
    id: 'balayage',
    name: 'Balayage Artistry',
    slug: 'balayage-artistry',
    category: 'Hair Coloring',
    description: 'Dimensional colour placement for a soft, blended, sun-kissed finish.',
    price: 4800,
    duration: 120,
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'beard-shaping',
    name: 'Beard Sculpt & Groom',
    slug: 'beard-sculpt-groom',
    category: 'Beard Grooming',
    description: 'Precision shaping and finishing for a clean, defined beard profile.',
    price: 1200,
    duration: 30,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'bridal',
    name: 'Bridal Styling Signature',
    slug: 'bridal-styling-signature',
    category: 'Bridal Makeup',
    description: 'A bespoke bridal look with styling, finish, and trial consultation included.',
    price: 9000,
    duration: 150,
    image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'repair',
    name: 'Repair Ritual Treatment',
    slug: 'repair-ritual-treatment',
    category: 'Hair Treatments',
    description: 'Deep repair with nourishment and hydration to restore softness and shine.',
    price: 2200,
    duration: 60,
    image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80'
  }
];

export const galleryItems: GalleryItem[] = [
  { id: 'g1', title: 'Soft Layered Bob', category: 'Women\'s Haircuts', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80', serviceSlug: 'signature-precision-cut' },
  { id: 'g2', title: 'Clean Fade', category: 'Men\'s Haircuts', image: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=900&q=80', serviceSlug: 'signature-precision-cut' },
  { id: 'g3', title: 'Balayage Melt', category: 'Balayage', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80', serviceSlug: 'balayage-artistry' },
  { id: 'g4', title: 'Gloss Refresh', category: 'Hair Coloring', image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80', serviceSlug: 'gloss-tone-refresh' }
];

export const stylists: Stylist[] = [
  {
    id: 'rhea',
    name: 'Rhea Kapoor',
    role: 'Senior Stylist',
    biography: 'Rhea creates polished, wearable looks that balance softness, movement, and modern structure.',
    specialties: ['Precision cuts', 'Balayage', 'Styling'],
    experience: '8 years',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'aryan',
    name: 'Aryan Mehta',
    role: 'Men’s Grooming Expert',
    biography: 'Aryan focuses on refined male grooming, textural finishes, and sculpted beard artistry.',
    specialties: ['Fades', 'Beard grooming', 'Skin fades'],
    experience: '6 years',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80'
  }
];
