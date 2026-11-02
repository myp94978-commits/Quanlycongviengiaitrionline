import Link from "next/link";

export default function UserEditFallbackPage() {
  return (
    <div style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, marginBottom: 16 }}>Chỉnh sửa người dùng không khả dụng</h1>
      <p style={{ marginBottom: 16 }}>
        Trang sửa người dùng hiện tại không được sử dụng. Vui lòng quay lại trang danh sách người dùng để chỉnh sửa trực tiếp từ đó.
      </p>
      <Link href="/admin/users" style={{ color: "#2563eb", textDecoration: "underline" }}>
        Quay lại danh sách người dùng
      </Link>
    </div>
  );
}
