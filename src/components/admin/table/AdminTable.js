"use client";

export default function AdminTable({ columns, data, onDelete, onEdit }) {
  return (
    <table style={{
      width: "100%",
      borderCollapse: "collapse",
      background: "#fff",
      borderRadius: 10,
      overflow: "hidden"
    }}>
      <thead style={{ background: "#007bff", color: "#fff" }}>
        <tr>
          {columns.map(col => (
            <th key={col.key} style={{ padding: 12 }}>
              {col.label}
            </th>
          ))}
          <th>Hành động</th>
        </tr>
      </thead>

      <tbody>
        {data.map((item, index) => (
          <tr key={item.product_id ?? item.id ?? index} style={{ textAlign: "center" }}>
            {columns.map(col => (
              <td key={col.key} style={{ padding: 10 }}>
                {item[col.key]}
              </td>
            ))}

            <td>
              <button
                onClick={() => onEdit?.(item, index)}
                style={{
                  background: "orange",
                  color: "#fff",
                  border: "none",
                  padding: "5px 10px",
                  marginRight: 5,
                  borderRadius: 5
                }}
              >
                Sửa
              </button>

              <button
                onClick={() => onDelete?.(item, index)}
                style={{
                  background: "red",
                  color: "#fff",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: 5
                }}
              >
                Xoá
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}