import {useState } from 'react'
import api from "./api"
import { useNavigate } from 'react-router-dom'

const Register = () => {
const [name,setname]=useState("")
const [email,setemail]=useState("")
const [password,setpassword]=useState("")
const navigate=useNavigate()

const handleregister=async(e)=>{
e.preventDefault();
try{
     await api.post("/auth/register", {name, email, password })
        alert("account created")
        navigate("/login")
}
catch{
alert("User already exists or invalid details")
}
}


  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleregister}
        className="bg-white shadow-lg rounded-xl p-8 w-80 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-semibold text-center">Register</h2>

        <input
          className="border rounded p-2"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />

        <input
          className="border rounded p-2"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />

        <input
          className="border rounded p-2"
          placeholder="Set your password"
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />

        <button className="bg-green-600 hover:bg-green-700 text-white py-2 rounded">
          Create Account
        </button>

        <p className="text-sm text-center">
          Already have an account?
          <span
            className="text-blue-600 cursor-pointer ml-1"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
    </>
    
  )
}

export default Register