"use client"
import { login }from '@/services/authService';
import { validateLogin } from '@/utils/validator';
import React, { useState } from 'react';
import  {useRouter} from 'next/navigation';
import { useContext } from 'react';
import {AuthContext} from "@/context/AuthProvider";
/**
 * RegisterFrom component
 */


export const LoginFrom = (props) => {
    const [ username,setUsername]=useState("");
    const [pass,setPass]=useState("");
    const [errors, setErrors] = useState({});
    const [loading,setLoading] = useState(false);
    const [success,setSuccess] = useState("");
    const router=useRouter();
    const {user,setUser} =useContext(AuthContext);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        //validate du lieu
      const validateErrors = validateLogin({
            username,  
            pass
           
    });
   if (Object.keys(validateErrors).length !== 0) {
    setErrors(validateErrors);
    return;
    }
    let data ={
       username,
       pass,
    }
    try {
      setLoading(true);
      const res = await login(data);
      if (!res?.token || !res?.user) {
        throw new Error("Dữ liệu đăng nhập không hợp lệ");
      }
      console.log(res);
      console.log("user_type:", res.user.user_type);
      setSuccess("Đăng nhập thành công");
      setUser(res.user);

      setTimeout(() => {
        if (
          res.user.user_type === "admin" ||
          res.user.user_type === "Admin" ||
          res.user.user_type === 1
        ) {
          router.push("/admin");
        } else {
          router.push("/");
        }
      }, 500);
    } catch (e) {
      console.log("Error response:", e);
      let errorMsg = e?.message || "Đăng nhập thất bại";
      if (e?.status === 401) {
        errorMsg = "Tên đăng nhập hoặc mật khẩu không đúng.";
      } else if (e?.status === 403) {
        errorMsg = "Bạn không có quyền truy cập vào trang này.";
      }
      setErrors({ message: errorMsg });
    } finally {
      setLoading(false);
    }
    }
   return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-xl border border-gray-200 p-9 w-full max-w-md">

            <h2 className="text-center text-xl font-medium mb-1">Đăng nhập</h2>
            

            {errors.message && <p className="bg-red-50 border border-red-200 rounded-lg px-4 py-2 text-sm text-red-500 mb-4">{errors.message}</p>}
            {success && <p className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-sm text-green-500 mb-4">{success}</p>}

            <form onSubmit={handleSubmit}>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Tên người dùng</label>
                    <input type="text" value={username} id="username" name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nhập username"
                        className="w-full h-10 border border-gray-300 rounded-lg px-3 text-sm focus:outline-none focus:border-blue-500" />
                    {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                </div>

                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Mật khẩu</label>
                    <input type="password" value={pass} id="pass" name="pass"
                        onChange={(e) => setPass(e.target.value)}
                        placeholder="Nhập mật khẩu"
                        className="w-full h-10 border border-gray-300 rounded-lg px-3 text-sm focus:outline-none focus:border-blue-500" />
                    {errors.pass && <p className="text-red-500 text-xs mt-1">{errors.pass}</p>}
                </div>

                <button type="submit" disabled={loading}
                    className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium mt-4 transition-colors disabled:opacity-60">
                    {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>

            </form>
        </div>
    </div>
);
};

export default LoginFrom;