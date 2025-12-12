export default function ProfileTabs({ active = "posts", onChange }) {
  const tabs = [
    { key: "posts", label: "Posts" },
    { key: "bookmarks", label: "Bookmarks" },
    { key: "about", label: "About" },
  ];

  return (
    <div className="flex gap-2 border-b pb-2">
      {tabs.map(t => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`px-3 py-1 rounded ${active === t.key ? "bg-blue-500 text-white" : "bg-white"}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
