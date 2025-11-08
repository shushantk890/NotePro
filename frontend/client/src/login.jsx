import { useState } from 'react'
import {useNavigate} from "react-router-dom"
import api from "./api";

const Login = () => {
const [email,setemail]=useState("")
const [password,setpassword]=useState("")
const navigate=useNavigate()


const handlesubmit=async(e)=>{
e.preventDefault();
 try{
    await api.post("/auth/login", { email, password })
    navigate("/")

 }
 catch{
 alert("wrong credentails password or email")
 }
}





  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <form
    onSubmit={handlesubmit}
    className="bg-white p-8 shadow-md rounded-xl w-80 flex flex-col gap-4"
  >
    <h2 className="text-xl font-semibold text-center">Login</h2>

    <input
      className="border rounded p-2"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setemail(e.target.value)}
    />

    <input
      className="border rounded p-2"
      placeholder="Enter your password"
      type="password"
      value={password}
      onChange={(e) => setpassword(e.target.value)}
    />

    <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
      Submit
    </button>

    <p className="text-sm text-center">
      Don’t have an account?
      <span
        className="text-blue-600 cursor-pointer ml-1"
        onClick={() => navigate("/register")}
      >
        Register
      </span>
    </p>
  </form>
</div>

     </>
  )
  
}

export default Login