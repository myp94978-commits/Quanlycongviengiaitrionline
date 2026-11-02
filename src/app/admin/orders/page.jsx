"use client";

import { useEffect, useState } from "react";
import {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from "@/services/orderService";

const statusLabels = {
  pending: "Đang xử lý",
  confirmed: "Đã xác nhận",
  shipped: "Đã gửi",
  delivered: "Đã giao",
  cancelled: "Đã hủy",
  0: "Đang xử lý",
  1: "Đã xác nhận",
  2: "Đã gửi",
  3: "Đã giao",
  4: "Đã hủy",
};

const statusToBackend = {
  pending: 0,
  confirmed: 1,
  shipped: 2,
  delivered: 3,
  cancelled: 4,
};

const badgeColors = {
  pending: "bg-amber-500/20 text-amber-200",
  confirmed: "bg-sky-500/20 text-sky-200",
  shipped: "bg-indigo-500/20 text-indigo-200",
  delivered: "bg-emerald-500/20 text-emerald-200",
  cancelled: "bg-rose-500/20 text-rose-200",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    user: "",
    total: "",
    status: "pending",
  });
  const [userId, setUserId] = useState("");
  const [editId, setEditId] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [keyword, setKeyword] = useState("");

  const loadData = async () => {
    try {
      const res = await getOrders();
      setOrders(res.data || res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async () => {
    if (!form.user || !form.total) {
      alert("Nhập đủ thông tin!");
      return;
    }

    try {
      const resolvedUserId = userId || form.user;
      const numericUserId = Number(resolvedUserId);
      const dataSend = {
        total: Number(form.total),
        status: statusToBackend[form.status] !== undefined ? statusToBackend[form.status] : form.status,
      };

      if (resolvedUserId !== "") {
        if (!isNaN(numericUserId)) {
          dataSend.user_id = numericUserId;
        } else if (editItem?.user_id !== undefined && editId) {
          dataSend.user_id = editItem.user_id;
        }
      }

      if (dataSend.user_id === undefined || dataSend.user_id === null) {
        alert("Vui lòng nhập user_id hợp lệ");
        return;
      }

      if (editId) {
        await updateOrder(editId, dataSend);
        alert("Cập nhật thành công!");
      } else {
        await createOrder(dataSend);
        alert("Thêm thành công!");
      }

      setForm({ user: "", total: "", status: "pending" });
      setUserId("");
      setEditId(null);
      setEditItem(null);
      loadData();
    } catch (err) {
      console.error("❌ Order operation failed:", err);
      const errorMessage = err?.data?.error || err?.data?.message || err?.message || "Lỗi không xác định";
      alert(errorMessage);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Bạn có chắc muốn xoá?");
    if (!confirmDelete) return;

    try {
      await deleteOrder(id);
      alert("Xoá thành công!");
      loadData();
    } catch (err) {
      alert("Lỗi xoá!");
    }
  };

  const handleEdit = (item) => {
    setForm({
      user: item.user || item.user_name || String(item.user_id || ""),
      total:
        item.total !== undefined && item.total !== null
          ? String(item.total)
          : item.total_price !== undefined && item.total_price !== null
          ? String(item.total_price)
          : "",
      status: item.status !== undefined ? String(item.status) : "pending",
    });
    setUserId(item.user_id !== undefined ? String(item.user_id) : item.user || item.user_name || "");
    setEditItem(item);
    setEditId(item.id ?? item.order_id ?? null);
  };

  const filtered = orders.filter((o) => {
    const name = o.user || o.user_name || "";
    return name.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-slate-700 bg-slate-950/90 p-6 shadow-2xl shadow-black/20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-white">Quản lý đơn hàng</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">Tạo, sửa và xem danh sách đơn hàng. Tìm kiếm bằng user hoặc ID để thao tác nhanh hơn.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-4 text-sm text-slate-300">
              <p className="text-slate-400">Tổng đơn</p>
              <p className="mt-3 text-2xl font-semibold text-white">{orders.length}</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-4 text-sm text-slate-300">
              <p className="text-slate-400">Chờ xử lý</p>
              <p className="mt-3 text-2xl font-semibold text-white">{orders.filter((o) => o.status === "pending" || o.status === 0).length}</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-4 text-sm text-slate-300">
              <p className="text-slate-400">Đã giao</p>
              <p className="mt-3 text-2xl font-semibold text-white">{orders.filter((o) => o.status === "delivered" || o.status === 3).length}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.3fr]">
        <div className="rounded-[2rem] border border-slate-700 bg-slate-950/90 p-6 shadow-2xl shadow-black/20">
          <h3 className="text-xl font-semibold text-white">Thêm / Cập nhật đơn hàng</h3>
          <p className="mt-2 text-sm text-slate-400">Nhập đầy đủ thông tin để tạo hoặc sửa đơn hàng.</p>

          <div className="mt-6 grid gap-4">
            <label className="block text-sm text-slate-300">
              ID người dùng
              <input
                value={form.user}
                onChange={(e) => setForm({ ...form, user: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                placeholder="Nhập user_id hoặc user name"
              />
            </label>
            <label className="block text-sm text-slate-300">
              Tổng tiền
              <input
                value={form.total}
                onChange={(e) => setForm({ ...form, total: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                placeholder="Nhập tổng tiền"
              />
            </label>
            <label className="block text-sm text-slate-300">
              Trạng thái
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              >
                <option value="pending">Đang xử lý</option>
                <option value="confirmed">Đã xác nhận</option>
                <option value="shipped">Đã gửi</option>
                <option value="delivered">Đã giao</option>
                <option value="cancelled">Đã hủy</option>
              </select>
            </label>
            <button
              onClick={handleSubmit}
              className="rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
            >
              {editId ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-700 bg-slate-950/90 p-6 shadow-2xl shadow-black/20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">Danh sách đơn hàng</h3>
              <p className="mt-2 text-sm text-slate-400">Tìm kiếm theo tên người dùng hoặc user id.</p>
            </div>
            <div className="w-full sm:w-72">
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="🔍 Tìm kiếm người dùng..."
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>
          </div>

          <div className="mt-6 overflow-x-auto rounded-[1.75rem] border border-slate-800 bg-slate-900/80">
            <table className="min-w-full divide-y divide-slate-700 text-left text-sm text-slate-200">
              <thead className="bg-slate-950/90 text-slate-400">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Người dùng</th>
                  <th className="px-6 py-4">Tổng tiền</th>
                  <th className="px-6 py-4">Trạng thái</th>
                  <th className="px-6 py-4">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-950/80">
                {filtered.length > 0 ? (
                  filtered.map((item, index) => {
                    const statusKey = String(item.status);
                    return (
                      <tr key={item.id ?? item.order_id ?? index} className="hover:bg-slate-900/70 transition-colors">
                        <td className="px-6 py-4">{item.id ?? item.order_id}</td>
                        <td className="px-6 py-4">{item.user || item.user_name}</td>
                        <td className="px-6 py-4">{item.total}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeColors[statusKey] || badgeColors.pending}`}>
                            {statusLabels[statusKey] || statusLabels[item.status] || "Đang xử lý"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            <button onClick={() => handleEdit(item)} className="rounded-2xl bg-emerald-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-400">
                              Sửa
                            </button>
                            <button onClick={() => handleDelete(item.id ?? item.order_id)} className="rounded-2xl bg-rose-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-rose-400">
                              Xoá
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-slate-400">
                      Không tìm thấy đơn hàng.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

// STYLE
const input = {
  padding: 8,
  borderRadius: 6,
  border: "1px solid #ccc",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  background: "#fff",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
};

const th = {
  padding: 10,
  borderBottom: "1px solid #ddd",
};

const td = {
  padding: 10,
  borderBottom: "1px solid #eee",
};

const btnAdd = {
  background: "#28a745",
  color: "#fff",
  border: "none",
  padding: "8px 15px",
  borderRadius: 6,
};

const btnEdit = {
  background: "orange",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: 5,
  marginRight: 5,
};

const btnDelete = {
  background: "red",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: 5,
};