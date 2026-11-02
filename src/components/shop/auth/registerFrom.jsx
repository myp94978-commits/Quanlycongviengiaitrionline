"use client"
import { register } from '@/services/authService';
import { validateRegister } from '@/utils/validator';
import React, { useState } from 'react';
import  {useRouter} from 'next/navigation';


/**
 * RegisterFrom component
 */


export const RegisterFrom = (props) => {
    const [ username,setUsername]=useState("");
    const [ fullname,setFullname]=useState("");
    const [ email,setEmail]=useState("");
    const [pass,setPass]=useState("");
    const [ confirm_password,setConfirm_password]=useState("");
    const [errors, setErrors] = useState({});
    const [loading,setLoading] = useState(false);
    const [success,setSuccess] = useState("");
    const router=useRouter();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        //validate du lieu
      const validateErrors = validateRegister({
            username, 
            fullname, 
            email, 
            pass, 
            confirm_password
    });
   if (Object.keys(validateErrors).length !== 0) {
        setErrors(validateErrors);
        return;
    }
    let data ={
       username,
        fullname,
        email,
       pass,
    }
    try{
        setLoading(true)
           let res =await register(data);
            console.log('ré',res);
                setSuccess("Register success");
                setTimeout(()=>{
                    router.push('/login')

                },2000);
    }
    catch (e){
        console.log('er',e)
        setErrors({message: e?.data?.error || e?.message || "Đăng ký thất bại"})
    }
    finally{
        setLoading(false);
    }
    }
    return (
        <>
            {errors.message && <p  className='text-red-500' >{errors.message}</p>}
            {success && <p className='text-green-500'>{success}</p>}
            <form onSubmit={handleSubmit}>

                <div>
                    <label>Tên người dùng:</label>
                    {errors.username && <p className='text-red-500'>{errors.username}</p>}
                    <input type="text" value={username} id="username" name="username" required onChange={(e) => setUsername(e.target.value)} /><br />
                </div><br />

                <div>
                    <label>Họ tên đầy đủ:</label>
                    {errors.fullname && <p className='text-red-500'>{errors.fullname}</p>}
                    <input type="text" value={fullname} id="fullname" name="fullname"  required onChange={(e) => setFullname(e.target.value)} /><br />
                </div><br />

                <div>
                    <label>Email:</label>
                    {errors.email && <p className='text-red-500'>{errors.email}</p>}
                    <input type="email"  value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" /><br />
                </div><br />

                <div>
                    <label>Mật khẩu:</label>
                    {errors.pass && <p className='text-red-500'>{errors.pass}</p>}
                    <input type="password"value={pass} onChange={(e) => setPass(e.target.value)} id="pass" name="pass"/><br />
                </div><br />

                <div>
                    <label>Nhập lại mật khẩu:</label>
                    {errors.confirm_password && <p className='text-red-500'>{errors.confirm_password}</p>}
                    <input type="password" value={confirm_password} onChange={(e) => setConfirm_password(e.target.value)} id="confirm_password" name="confirm_password" /><br />
                </div><br />

                <button type="submit" disabled={loading}>
                    {loading ? "Loading...": "Register"}
                </button>

            </form>
        </>
    );
};

export default RegisterFrom;