"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2, Star, Image as ImageIcon, X } from "lucide-react";
import { safeJson } from "@/lib/utils";

type Item = {
  id: string;
  title: string;
  slug: string;
  category: string;
  location: string | null;
  year: string | null;
  description: string;
  coverImage: string;
  images: string;
  featured: boolean;
  order: number;
};

const empty = {
  title: "",
  category: "Living Room",
  location: "",
  year: "",
  description: "",
  coverImage: "",
  images: [] as string[],
  featured: false,
  order: 0,
};

async function uploadFile(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: fd });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Upload failed");
  return data.url as string;
}

export default function PortfolioAdmin({ initialItems }: { initialItems: Item[] }) {
  const [items, setItems] = useState(initialItems);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ ...empty });

  async function onCover(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      const url = await uploadFile(f);
      setForm((p) => ({ ...p, coverImage: url }));
    } catch (err: any) { toast.error(err.message); }
  }

  async function onImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    try {
      const urls = await Promise.all(Array.from(files).map(uploadFile));
      setForm((p) => ({ ...p, images: [...p.images, ...urls] }));
    } catch (err: any) { toast.error(err.message); }
  }

  async function onSave() {
    if (!form.title || !form.coverImage || !form.description) {
      toast.error("Title, cover and description are required");
      return;
    }
    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success("Saved");
      setItems((p) => [data.item, ...p]);
      setForm({ ...empty });
      setShow(false);
    } catch (err: any) { toast.error(err.message); }
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this item?")) return;
    try {
      const res = await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setItems((p) => p.filter((i) => i.id !== id));
      toast.success("Deleted");
    } catch (err: any) { toast.error(err.message); }
  }

  async function onToggleFeatured(it: Item) {
    try {
      const res = await fetch(`/api/portfolio/${it.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !it.featured }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setItems((p) => p.map((x) => (x.id === it.id ? data.item : x)));
    } catch (err: any) { toast.error(err.message); }
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="heading-display text-3xl">Art Studioz</h1>
          <p className="body-soft text-sm">Add and curate art images, wall art & mix-media paintings.</p>
        </div>
        <button onClick={() => setShow(true)} className="btn-primary"><Plus className="h-4 w-4" /> Add work</button>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <div key={it.id} className="card-journal overflow-hidden p-0">
            <div className="relative aspect-[5/4] overflow-hidden">
              <img src={it.coverImage} alt={it.title} className="h-full w-full object-cover" />
              <button
                onClick={() => onToggleFeatured(it)}
                title="Toggle featured"
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-cream-50/90"
              >
                <Star className={`h-4 w-4 ${it.featured ? "fill-rose-dusty text-rose-dusty" : "text-earth-500"}`} />
              </button>
            </div>
            <div className="p-4">
              <div className="text-[10px] uppercase tracking-[0.25em] text-earth-500">{it.category}</div>
              <h3 className="font-display text-xl">{it.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-earth-700/80">{it.description}</p>
              <div className="mt-3 text-xs text-earth-500">
                {it.location} {it.year && `· ${it.year}`} · {safeJson<string[]>(it.images, []).length} extra image(s)
              </div>
              <div className="mt-3 flex justify-end">
                <button onClick={() => onDelete(it.id)} className="text-xs text-rose-dusty hover:text-earth-900">
                  <Trash2 className="inline h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {show && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overscroll-contain bg-earth-900/60 p-3 backdrop-blur-sm sm:p-4" onClick={() => setShow(false)}>
          <div className="my-6 w-full max-w-2xl rounded-3xl bg-cream-50 p-5 shadow-journal sm:my-10 sm:p-6" onClick={(e) => e.stopPropagation()}>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="heading-display text-2xl">Add healing artwork</h2>
              <button onClick={() => setShow(false)} className="grid h-9 w-9 place-items-center rounded-full bg-cream-100"><X className="h-4 w-4" /></button>
            </div>

            <div className="grid gap-3">
              <input className="afs-input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <div className="grid gap-3 sm:grid-cols-2">
                <input className="afs-input" placeholder="Category (Living Room, Kitchen…)" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                <input className="afs-input" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              </div>
              <input className="afs-input" placeholder="Year (e.g. 2025)" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
              <textarea className="afs-input resize-none" rows={3} placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />

              <div className="rounded-2xl border border-earth-300/40 bg-cream-100/60 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-earth-900"><ImageIcon className="h-4 w-4" /> Cover image</div>
                <input type="file" accept="image/*" onChange={onCover} />
                {form.coverImage && <img src={form.coverImage} alt="" className="mt-3 h-28 w-full rounded-xl object-cover" />}
              </div>

              <div className="rounded-2xl border border-earth-300/40 bg-cream-100/60 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-earth-900"><ImageIcon className="h-4 w-4" /> Extra images</div>
                <input type="file" accept="image/*" multiple onChange={onImages} />
                {form.images.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {form.images.map((img, i) => (
                      <img key={i} src={img} alt="" className="h-20 w-full rounded-xl object-cover" />
                    ))}
                  </div>
                )}
              </div>

              <label className="inline-flex items-center gap-2 text-sm text-earth-700">
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
                Feature on home page
              </label>

              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setShow(false)} className="btn-ghost text-sm">Cancel</button>
                <button onClick={onSave} className="btn-primary text-sm">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        :global(.afs-input) {
          width: 100%;
          border-radius: 1rem;
          border: 1px solid rgba(176, 137, 104, 0.4);
          background: rgba(251, 247, 240, 0.85);
          padding: 0.7rem 0.9rem;
          font-size: 0.9rem;
          color: #3a2a20;
          outline: none;
        }
        :global(.afs-input:focus) {
          border-color: #8c6a4f;
          box-shadow: 0 0 0 4px rgba(140, 106, 79, 0.15);
        }
      `}</style>
    </div>
  );
}
