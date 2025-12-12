"use client";
export default function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null;
  const arr = Array.from({ length: pages }, (_, i) => i + 1);
  return (
    <div className="flex gap-2 mt-4">
      {arr.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-3 py-1 border rounded ${p === page ? "font-bold" : ""}`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
