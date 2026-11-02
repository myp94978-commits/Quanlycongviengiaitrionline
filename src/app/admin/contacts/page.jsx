"use client";

import { useEffect, useState } from "react";
import { getContacts, deleteContact } from "@/services/contactService";
import AdminTable from "@/components/admin/AdminTable";

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // load data
  const loadData = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const params = {};
      if (keyword) {
        params.search = keyword;
      }
      const res = await getContacts(params);
      setContacts(res.data || res || []);
    } catch (err) {
      console.error("Load contacts error:", err);
      const status = err?.status;
      let message = err?.message || "Lỗi khi tải dữ liệu";
      if (status === 401) {
        message = "Bạn chưa đăng nhập hoặc phiên đã hết hạn. Vui lòng đăng nhập lại.";
      } else if (status === 404) {
        message = "Không tìm thấy API liên hệ. Kiểm tra cấu hình backend hoặc đường dẫn API.";
      } else if (status === 500) {
        message = "Server gặp lỗi khi tải liên hệ. Vui lòng thử lại sau.";
      }
      setErrorMessage(message);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // search
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      loadData();
    }
  };

  // delete
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Bạn có chắc muốn xoá?");
    if (!confirmDelete) return;

    try {
      await deleteContact(id);
      setErrorMessage("");
      alert("Xoá thành công!");
      loadData();
    } catch (err) {
      console.error("Delete contact error:", err);
      const status = err?.status;
      let message = err?.message || "Lỗi xoá!";
      if (status === 401) {
        message = "Bạn chưa đăng nhập hoặc phiên đã hết hạn. Vui lòng đăng nhập lại.";
      } else if (status === 404) {
        message = "Không tìm thấy liên hệ. Vui lòng làm mới trang.";
      } else if (status === 500) {
        message = "Server gặp lỗi khi xoá liên hệ. Vui lòng thử lại sau.";
      }
      setErrorMessage(message);
    }
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Tên" },
    { key: "email", label: "Email" },
    { key: "phone", label: "SĐT" },
    { key: "message", label: "Nội dung" },
    { key: "created_at", label: "Ngày gửi" },
  ];

  const tableData = contacts.map(contact => ({
    ...contact,
    created_at: new Date(contact.created_at).toLocaleDateString("vi-VN"),
    actions: (
      <div className="flex gap-2">
        <button
          onClick={() => handleDelete(contact.id)}
          className="rounded-md bg-rose-500 px-3 py-1 text-white transition hover:bg-rose-400"
        >
          Xóa
        </button>
      </div>
    ),
  }));

  return (
    <div style={{ padding: 20 }}>
      <h2>📞 Quản lý liên hệ</h2>

      {/* SEARCH */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input
          placeholder="🔍 Tìm liên hệ..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleSearch}
          style={{ padding: "8px 12px", border: "1px solid #ccc", borderRadius: 4, flex: 1 }}
        />
      </div>

      {errorMessage && (
        <div style={{ marginBottom: 16, padding: 12, borderRadius: 8, background: "#fef2f2", border: "1px solid #fecaca", color: "#991b1b" }}>
          {errorMessage}
        </div>
      )}

      {loading ? (
        <div style={{ padding: 24, textAlign: "center", color: "#475569" }}>Đang tải dữ liệu liên hệ...</div>
      ) : (
        <>
          {contacts.length === 0 ? (
            <div style={{ padding: 24, textAlign: "center", color: "#475569" }}>
              Không có liên hệ nào.
            </div>
          ) : (
            <AdminTable columns={columns} data={tableData} />
          )}
        </>
      )}
    </div>
  );
}