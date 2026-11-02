import Table from "@/components/common/Table";
export default function AdminTable({ columns, data }) {

    const extendedColumns = [
        ...columns,
        { key: "actions", label: "Actions" },
    ];


    const tableData = data.map((item, index) => ({
        ...item,
        id: item.id || item._id || `item-${index}`, // Ensure each item has a unique id
        actions: item.actions ?? (
            <div className="flex gap-2">
                <button className="rounded-md bg-blue-500 px-3 py-1 text-white transition hover:bg-blue-400">
                    Sửa
                </button>
                <button className="rounded-md bg-rose-500 px-3 py-1 text-white transition hover:bg-rose-400">
                    Xóa
                </button>
            </div>
        ),
    }));


    return <Table columns={extendedColumns} data={tableData} />;
}