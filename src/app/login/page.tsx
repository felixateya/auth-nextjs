"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Fascinate_Inline } from "next/font/google";

export default function LoginPage() {
  const router = useRouter()
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const onLogin = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/users/login', user)
      console.log('Login successful', response.data);
      toast.success('Login successful')
      router.push('/profile')
      
    } catch (error:any) {
      console.log('Login failed', error);
      toast.error(error.message)
      
    } finally{
      setLoading(false)
    }
  };
  useEffect(()=>{
    if(user.email.length>0 && user.password.length > 0){
      setButtonDisabled(false)
    } else{
      setButtonDisabled(true)
    }
  },[user])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster position="top-center" reverseOrder={false}/>
      <h1 className="text-center text-2xl">Login</h1>
      <hr />
      
      <label htmlFor="Email">Email</label>
      <input
        className="p-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        id="Email"
        placeholder="Email"
      />
      <label htmlFor="password">Password</label>
      <input
        className="p-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        id="password"
        placeholder="password"
      />
      <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" onClick={onLogin}>Log In here</button>
      <Link href='/signup'>Visit Signup page</Link>
    </div>
  );
}
