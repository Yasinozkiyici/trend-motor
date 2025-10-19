type SpecItem = {
  group_name: string | null;
  key_name: string;
  value_text: string;
  sort_order: number;
};

export default function SpecsTable({ specs }: { specs: SpecItem[] }) {
  // Grup bazında organize et
  const groupedSpecs = specs.reduce((acc, spec) => {
    const group = spec.group_name || 'Genel';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(spec);
    return acc;
  }, {} as Record<string, SpecItem[]>);
  
  return (
    <div className="space-y-8">
      {Object.entries(groupedSpecs).map(([groupName, items]) => (
        <div key={groupName}>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {groupName}
          </h3>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                {items.map((spec, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 w-1/3">
                      {spec.key_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {spec.value_text}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}


