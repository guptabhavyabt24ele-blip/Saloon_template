'use client';

import { ChangeEvent, useMemo, useState } from 'react';

const hairOptions = [
  { id: 'lob', name: 'Soft lob', tone: '#2f2c2a' },
  { id: 'bob', name: 'Classic bob', tone: '#7a4d2a' },
  { id: 'pixie', name: 'Textured pixie', tone: '#4e4338' },
  { id: 'long', name: 'Soft waves', tone: '#d9a66b' }
];

export default function TryOnPage() {
  const [selected, setSelected] = useState(hairOptions[0]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const previewUrl = useMemo(() => uploadedImage ?? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80', [uploadedImage]);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUploadedImage(url);
  };

  return (
    <main className="container-shell py-20">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Virtual try-on</p>
        <h1 className="mt-3 font-serif text-5xl tracking-tight text-neutral-900">Preview your next look.</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="card-surface overflow-hidden">
          <div className="relative h-[540px] w-full bg-stone-200">
            <img src={previewUrl} alt="Try-on reference" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-stone-900/35" />
            <div className="absolute inset-x-8 bottom-8 rounded-[30px] border border-white/20 bg-white/15 p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between text-white">
                <span className="text-sm uppercase tracking-[0.22em]">Selected style</span>
                <span className="font-medium">{selected.name}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-surface p-6">
            <h2 className="text-xl font-semibold text-neutral-900">Upload photo</h2>
            <input type="file" accept="image/*" onChange={handleUpload} className="mt-4 block w-full text-sm text-neutral-600" />
          </div>
          <div className="card-surface p-6">
            <h2 className="text-xl font-semibold text-neutral-900">Hairstyle options</h2>
            <div className="mt-4 grid gap-3">
              {hairOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelected(option)}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left ${option.id === selected.id ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-stone-200 bg-stone-50 text-neutral-800'}`}>
                  <span>{option.name}</span>
                  <span className="h-5 w-5 rounded-full border border-current" style={{ backgroundColor: option.tone }} />
                </button>
              ))}
            </div>
          </div>
          <button type="button" className="btn-primary w-full">Use this style for booking</button>
        </div>
      </div>
    </main>
  );
}
