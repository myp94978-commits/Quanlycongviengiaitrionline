"use client";

import { useEffect, useState } from "react";
import { getUsers, createUser, deleteUser, updateUser } from "@/services/userService";
import AdminTable from "@/components/admin/AdminTable";
import Pagination from "@/components/common/Pagination";

export default function UsersPage() {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user");
  const [editId, setEditId] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: "",
  });

  const getUserId = (user) => user.id ?? user.user_id ?? user._id;

  const getErrorMessage = (err) => {
    if (!err) return "Lỗi khi lưu dữ liệu!";
    if (typeof err === "string") return err;
    if (err.message) return err.message;
    if (err.data?.message) return err.data.message;
    if (err.data?.error) return err.data.error;
    if (err.fullError?.response?.data?.message) return err.fullError.response.data.message;
    if (err.fullError?.response?.data?.error) return err.fullError.response.data.error;
    return JSON.stringify(err);
  };

  // load data
  const loadData = async () => {
    try {
      setLoadingTable(true);
      const res = await getUsers({ search: params.search });
      const rawData = res?.data ?? res;
      const usersData = Array.isArray(rawData)
        ? rawData
        : rawData?.data ?? rawData;

      const normalizedUsers = Array.isArray(usersData)
        ? usersData.map((user) => ({
            ...user,
            id: getUserId(user),
            user_id: getUserId(user),
            username: user.username ?? user.user_name ?? "",
            email: user.email ?? "",
            user_type: user.user_type ?? user.type ?? "user",
          }))
        : [];

      setAllUsers(normalizedUsers);
      setTotalItems(normalizedUsers.length);
      setTotalPages(Math.max(1, Math.ceil(normalizedUsers.length / params.limit)));
    } catch (err) {
      console.error("Load users error:", err);
      alert("Lỗi khi tải dữ liệu!");
    } finally {
      setLoadingTable(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [params.search]);

  useEffect(() => {
    const startIndex = (params.page - 1) * params.limit;
    setUsers(allUsers.slice(startIndex, startIndex + params.limit));
  }, [allUsers, params.page, params.limit]);

  // search
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setParams((prev) => ({ ...prev, search: keyword, page: 1 }));
    }
  };

  // save / update user
  const handleSubmit = async () => {
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedEmail) {
      setMessage("Nhập đầy đủ tên đăng nhập và email!");
      return;
    }

    if (!editId && !trimmedPassword) {
      setMessage("Nhập mật khẩu khi tạo người dùng mới!");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const payload = {
        username: trimmedUsername,
        user_name: trimmedUsername,
        email: trimmedEmail,
        user_type: userType,
        type: userType,
      };

      if (trimmedPassword) {
        payload.pass = trimmedPassword;
        payload.password = trimmedPassword;
        payload.hashedPass = trimmedPassword;
        payload.hashed_password = trimmedPassword;
      }

      if (editId) {
        await updateUser(editId, payload);
        setMessage("Cập nhật người dùng thành công.");
      } else {
        await createUser(payload);
        setMessage("Thêm người dùng thành công.");
      }

      setUsername("");
      setEmail("");
      setPassword("");
      setUserType("user");
      setEditId(null);
      await loadData();
    } catch (err) {
      console.warn('Submit user error:', err);
      setMessage(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // delete
  const handleDelete = async (user) => {
    const id = getUserId(user);
    if (!id) {
      setMessage("Không tìm thấy ID người dùng để xóa.");
      return;
    }

    const confirmDelete = confirm("Bạn có chắc muốn xoá?");
    if (!confirmDelete) return;

    try {
      await deleteUser(id);
      setMessage("Xoá người dùng thành công.");
      await loadData();
    } catch (err) {
      console.error("Delete user error:", err);
      setMessage("Lỗi xoá người dùng!");
    }
  };

  // edit
  const handleEdit = (user) => {
    const id = getUserId(user);
    if (!id) {
      setMessage("Không tìm thấy ID người dùng để chỉnh sửa.");
      return;
    }

    setUsername(user.username ?? "");
    setEmail(user.email ?? "");
    setUserType(user.user_type ?? "user");
    setPassword("");
    setEditId(id);
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "username", label: "Tên đăng nhập" },
    { key: "email", label: "Email" },
    { key: "user_type", label: "Loại" },
  ];

  const tableData = users.map(user => ({
    ...user,
    actions: (
      <div className="flex gap-2">
        <button
          onClick={() => handleEdit(user)}
          className="rounded-md bg-blue-500 px-3 py-1 text-white transition hover:bg-blue-400"
        >
          Sửa
        </button>
        <button
          onClick={() => handleDelete(user)}
          className="rounded-md bg-rose-500 px-3 py-1 text-white transition hover:bg-rose-400"
        >
          Xóa
        </button>
      </div>
    ),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-10 px-4 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-xl shadow-slate-950">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-sky-300/80">Admin</p>
              <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Quản lý người dùng</h1>
              <p className="mt-2 max-w-2xl text-slate-400">
                Quản lý danh sách người dùng, sửa thông tin, tìm kiếm nhanh và xóa tài khoản.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-300 shadow-inner shadow-slate-950/30">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Tổng người dùng</p>
              <p className="mt-2 text-3xl font-semibold text-white">{totalItems}</p>
            </div>
          </div>
        </header>

        <div className="grid gap-8 xl:grid-cols-2">
        <section className="rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-xl shadow-slate-950">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-sky-300/80">Form</p>
              <h2 className="mt-2 text-xl font-semibold text-white">{editId ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}</h2>
            </div>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
              {editId ? "Edit mode" : "Create"}
            </span>
          </div>

          <label className="block text-sm font-medium text-slate-300">
            Tên đăng nhập
          </label>
          <input
            placeholder="Tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
          />
          <label className="block text-sm font-medium text-slate-300">
            Email
          </label>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
          />

          <label className="block text-sm font-medium text-slate-300">
            Mật khẩu{editId ? " (để trống nếu không đổi)" : ""}
          </label>
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
          />

          <label className="block text-sm font-medium text-slate-300">
            Loại người dùng
          </label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </section>

        <section className="rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-xl shadow-slate-950">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-sky-300/80">Hành động</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Hành động nhanh</h2>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="inline-flex items-center justify-center rounded-3xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Đang lưu..." : editId ? "Cập nhật người dùng" : "Thêm người dùng"}
            </button>

            {editId ? (
              <button
                onClick={() => {
                  setUsername("");
                  setEmail("");
                  setPassword("");
                  setUserType("user");
                  setEditId(null);
                  setMessage("");
                }}
                className="inline-flex items-center justify-center rounded-3xl border border-slate-700 bg-slate-950 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
              >
                Huỷ chỉnh sửa
              </button>
            ) : null}
          </div>

          <div className="mt-8 rounded-3xl border border-slate-700 bg-slate-950 p-4">
            <label className="text-sm font-medium text-slate-300">Tìm kiếm</label>
            <input
              placeholder="Tìm người dùng..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleSearch}
              className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {message ? (
            <div
              className="mt-6 rounded-3xl p-4 text-sm font-medium bg-emerald-500 text-emerald-200 border border-emerald-500"
            >
              {message}
            </div>
          ) : null}
        </section>
      </div>

        <section className="space-y-6">
          <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-xl shadow-slate-950">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Danh sách</p>
                <h2 className="mt-2 text-xl font-semibold text-white">Người dùng hiện có</h2>
              </div>
              <div className="rounded-3xl bg-slate-950 px-4 py-3 text-sm text-slate-300">
                Tổng: <span className="font-semibold text-white">{users.length}</span>
              </div>
              <div className="rounded-3xl bg-slate-950 px-4 py-3 text-sm text-slate-300">
                Trang {params.page} / {totalPages}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-700 bg-slate-950 p-4 shadow-xl shadow-slate-950">
            <AdminTable columns={columns} data={tableData} />
          </div>

          <div className="rounded-3xl border border-slate-700 bg-slate-900 p-4 shadow-xl shadow-slate-950">
            <Pagination
              totalPages={totalPages}
              totalItems={totalItems}
              params={params}
              onChangeParams={setParams}
            />
          </div>
        </section>
      </div>
    </div>
  );
}