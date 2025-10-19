'use client';

export default function SortSelect({ currentSort }: { currentSort: string }) {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(window.location.search);
    params.set('sort', e.target.value);
    window.location.search = params.toString();
  };

  return (
    <select
      id="sort"
      className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      onChange={handleSortChange}
      defaultValue={currentSort}
    >
      <option value="name">İsme Göre</option>
      <option value="price-asc">Fiyat (Düşükten Yükseğe)</option>
      <option value="price-desc">Fiyat (Yüksekten Düşüğe)</option>
      <option value="newest">En Yeniler</option>
    </select>
  );
}

