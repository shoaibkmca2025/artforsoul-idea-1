"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2, Star, EyeOff, Eye, X, Users } from "lucide-react";
import { formatINR } from "@/lib/utils";

type Enrollment = { id: string; name: string; email: string; phone: string; status: string };
type Course = {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  coverImage: string;
  price: number;
  originalPrice: number | null;
  duration: string;
  level: string;
  modules: string;
  outcomes: string;
  featured: boolean;
  published: boolean;
  enrollments: Enrollment[];
};

const empty = {
  title: "",
  tagline: "",
  description: "",
  coverImage: "",
  price: 0,
  originalPrice: 0,
  duration: "",
  level: "Beginner",
  modules: [{ title: "Module 1", lessons: ["Lesson 1"] }],
  outcomes: ["Outcome 1"],
  featured: false,
  published: true,
};

async function uploadFile(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: fd });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Upload failed");
  return data.url as string;
}

export default function CoursesAdmin({ initialCourses }: { initialCourses: Course[] }) {
  const [courses, setCourses] = useState(initialCourses);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState<any>({ ...empty });
  const [openEnroll, setOpenEnroll] = useState<string | null>(null);

  async function onCover(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      const url = await uploadFile(f);
      setForm({ ...form, coverImage: url });
    } catch (err: any) { toast.error(err.message); }
  }

  async function onSave() {
    if (!form.title || !form.coverImage || !form.description) {
      toast.error("Title, cover and description are required");
      return;
    }
    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success("Saved");
      const c = { ...data.course, enrollments: [] } as Course;
      setCourses((p) => [c, ...p]);
      setForm({ ...empty });
      setShow(false);
    } catch (err: any) { toast.error(err.message); }
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this course?")) return;
    try {
      const res = await fetch(`/api/courses/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCourses((p) => p.filter((i) => i.id !== id));
      toast.success("Deleted");
    } catch (err: any) { toast.error(err.message); }
  }

  async function patch(id: string, payload: any) {
    try {
      const res = await fetch(`/api/courses/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCourses((p) => p.map((c) => (c.id === id ? { ...c, ...data.course } : c)));
    } catch (err: any) { toast.error(err.message); }
  }

  function setModule(i: number, key: "title", val: string) {
    setForm((p: any) => {
      const next = [...p.modules];
      next[i] = { ...next[i], [key]: val };
      return { ...p, modules: next };
    });
  }
  function setLesson(mi: number, li: number, val: string) {
    setForm((p: any) => {
      const next = [...p.modules];
      const lessons = [...next[mi].lessons];
      lessons[li] = val;
      next[mi] = { ...next[mi], lessons };
      return { ...p, modules: next };
    });
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="heading-display text-3xl">Courses</h1>
          <p className="body-soft text-sm">Add and manage your online courses.</p>
        </div>
        <button onClick={() => setShow(true)} className="btn-primary"><Plus className="h-4 w-4" /> New course</button>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {courses.map((c) => (
          <div key={c.id} className="card-journal overflow-hidden p-0">
            <div className="relative aspect-[5/3] overflow-hidden">
              <img src={c.coverImage} alt={c.title} className="h-full w-full object-cover" />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl">{c.title}</h3>
                <div className="flex items-center gap-1">
                  <button title="Featured" onClick={() => patch(c.id, { featured: !c.featured })} className="grid h-8 w-8 place-items-center rounded-full bg-cream-100">
                    <Star className={`h-3.5 w-3.5 ${c.featured ? "fill-rose-dusty text-rose-dusty" : "text-earth-500"}`} />
                  </button>
                  <button title="Published" onClick={() => patch(c.id, { published: !c.published })} className="grid h-8 w-8 place-items-center rounded-full bg-cream-100">
                    {c.published ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5 text-earth-500" />}
                  </button>
                  <button title="Delete" onClick={() => onDelete(c.id)} className="grid h-8 w-8 place-items-center rounded-full bg-rose-soft/60">
                    <Trash2 className="h-3.5 w-3.5 text-earth-900" />
                  </button>
                </div>
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-earth-700/80">{c.tagline}</p>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="font-display text-xl">{formatINR(c.price)}</span>
                <button onClick={() => setOpenEnroll(openEnroll === c.id ? null : c.id)} className="inline-flex items-center gap-1 text-earth-700 hover:text-earth-900">
                  <Users className="h-3.5 w-3.5" /> {c.enrollments.length} enrolled
                </button>
              </div>
              {openEnroll === c.id && (
                <div className="mt-3 rounded-2xl bg-cream-100/70 p-3">
                  {c.enrollments.length === 0 ? (
                    <p className="text-xs text-earth-700/70">No enrollments yet.</p>
                  ) : (
                    <ul className="divide-y divide-earth-300/40 text-xs">
                      {c.enrollments.map((e) => (
                        <li key={e.id} className="py-1.5">
                          <span className="font-medium">{e.name}</span> · {e.email} · {e.phone} · <span className="uppercase tracking-[0.2em] text-earth-500">{e.status}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {show && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overscroll-contain bg-earth-900/60 p-3 backdrop-blur-sm sm:p-4" onClick={() => setShow(false)}>
          <div className="my-6 w-full max-w-3xl rounded-3xl bg-cream-50 p-5 shadow-journal sm:my-8 sm:p-6" onClick={(e) => e.stopPropagation()}>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="heading-display text-2xl">New course</h2>
              <button onClick={() => setShow(false)} className="grid h-9 w-9 place-items-center rounded-full bg-cream-100"><X className="h-4 w-4" /></button>
            </div>

            <div className="grid gap-3">
              <input className="afs-input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <input className="afs-input" placeholder="Tagline" value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
              <textarea className="afs-input resize-none" rows={3} placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />

              <div className="grid gap-3 sm:grid-cols-3">
                <input className="afs-input" placeholder="Duration (e.g. 6 weeks)" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
                <select className="afs-input" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}>
                  <option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>All levels</option>
                </select>
                <div />
                <input className="afs-input" type="number" placeholder="Price (INR)" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                <input className="afs-input" type="number" placeholder="Original price (optional)" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} />
              </div>

              <div className="rounded-2xl border border-earth-300/40 bg-cream-100/60 p-4">
                <div className="mb-2 text-sm font-medium">Cover image</div>
                <input type="file" accept="image/*" onChange={onCover} />
                {form.coverImage && <img src={form.coverImage} alt="" className="mt-3 h-28 w-full rounded-xl object-cover" />}
              </div>

              <div className="rounded-2xl border border-earth-300/40 bg-cream-100/60 p-4">
                <div className="mb-2 flex items-center justify-between text-sm font-medium">
                  Modules
                  <button onClick={() => setForm({ ...form, modules: [...form.modules, { title: `Module ${form.modules.length + 1}`, lessons: ["Lesson 1"] }] })} className="text-xs text-earth-700 hover:text-earth-900">+ add module</button>
                </div>
                <div className="space-y-3">
                  {form.modules.map((m: any, mi: number) => (
                    <div key={mi} className="rounded-xl bg-cream-50 p-3">
                      <input className="afs-input" value={m.title} onChange={(e) => setModule(mi, "title", e.target.value)} />
                      <div className="mt-2 space-y-1">
                        {m.lessons.map((l: string, li: number) => (
                          <input key={li} className="afs-input" placeholder={`Lesson ${li + 1}`} value={l} onChange={(e) => setLesson(mi, li, e.target.value)} />
                        ))}
                        <button onClick={() => setForm({ ...form, modules: form.modules.map((x: any, i: number) => i === mi ? { ...x, lessons: [...x.lessons, ""] } : x) })} className="text-xs text-earth-700 hover:text-earth-900">+ add lesson</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-earth-300/40 bg-cream-100/60 p-4">
                <div className="mb-2 flex items-center justify-between text-sm font-medium">
                  Outcomes
                  <button onClick={() => setForm({ ...form, outcomes: [...form.outcomes, ""] })} className="text-xs text-earth-700 hover:text-earth-900">+ add</button>
                </div>
                <div className="space-y-2">
                  {form.outcomes.map((o: string, i: number) => (
                    <input key={i} className="afs-input" value={o} onChange={(e) => setForm({ ...form, outcomes: form.outcomes.map((x: string, k: number) => k === i ? e.target.value : x) })} />
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <label className="inline-flex items-center gap-2"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured</label>
                <label className="inline-flex items-center gap-2"><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} /> Published</label>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setShow(false)} className="btn-ghost text-sm">Cancel</button>
                <button onClick={onSave} className="btn-primary text-sm">Save course</button>
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
