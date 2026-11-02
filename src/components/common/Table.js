export default function Table({ columns, data }) {
  return (
    <table className="min-w-full border border-slate-700 text-sm text-slate-100">

      <thead className="bg-slate-900">
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              className="px-4 py-2 text-left font-semibold border-b border-slate-700 text-slate-100"
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, index) => (
          <tr
            key={row.id || row._id || index}
            className="bg-slate-900"
          >
            {columns.map((col) => (
              <td
                key={col.key}
                className="px-4 py-2 border-b border-slate-700 text-slate-100"
              >
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>

    </table>
  );
}