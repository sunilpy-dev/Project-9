import React from 'react'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import './login.css'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from 'react';
import { loggedInContext } from '../context/context';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

const Login = () => {
  const value = useContext(loggedInContext);
  const [eyeClose, seteyeClose] = useState(false)
  const [loginForm, setloginForm] = useState({ email: "", password: "" })
  const navigate = useNavigate();
  const [isDisabled, setisDisabled] = useState(false)
  const handleRedirect = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  const formatFirstName = (name) => {
    if (!name || typeof name !== "string") return "User";
    const first = name.trim().split(" ")[0];
    return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
  };
  const handleEyeClose = () => {
    seteyeClose(true)
  }
  const handleEyeOpen = () => {
    seteyeClose(false)
  }
  function handleChange(e) {
    setloginForm({ ...loginForm, [e.target.name]: e.target.value })
  }
  const handleSubmission = async () => {
    setisDisabled(true)
    const id = toast.loading("Please wait...")
    let res = await fetch('https://snip-vault-backend.onrender.com/checkUser', { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...loginForm }), credentials: "include" })
    let success = await res.json()
    // console.log(success.Result.username)
    if (success.Success == true) {
      toast.update(id, {
        render: `Welcome ${formatFirstName(success.Result.username)} `,
        type: "success",
        isLoading: false,
        autoClose: 900,
      });
      setTimeout(() => {
        value.setusername(success.Result.username)
        value.setloggedIn(true)
        value.setregisterd(false)
        value.setemail(loginForm.email)
        setisDisabled(false)
        setloginForm({ email: "", password: "" })
        navigate('/', { replace: true })
      }, 1000);
      // navigate('/', { replace: true })
    }
    else if (success.Result == false) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // toast.error('Something went wrong!', {
      //   position: "top-right",
      //   autoClose: 2000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: false,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "dark",
      // });
      toast.update(id, {
        render: 'Something went wrong!',
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      setisDisabled(false)
    }
    else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // toast.error(`${success.Result}!`, {
      //   position: "top-right",
      //   autoClose: 2000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: false,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "dark",
      // });
      toast.update(id, {
        render: `${success.Result}!`,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      setisDisabled(false)
    }
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="main w-full flex flex-col justify-center items-center h-screen m-auto">
        {/* Intro Text */}
        <div className="mb-2 lg:mb-5 text-center max-w-xl">
          <h1 className="text-xl sm:text-3xl xl:text-5xl font-bold mb-4 text-white">Welcome Back!</h1>
          <p className="text-gray-200 text-sm text-center sm:text-lg xl:text-xl mb-4 sm:mb-2 w-[80%] sm:w-full m-auto">
            Log In to Your Account
          </p>
          <p className="text-gray-300 italic mb-1 text-sm sm:text-base xl:text-lg">
            Access your Snip-Vault, manage your codes, and stay connected.
          </p>
          <p className="text-gray-400 text-xs sm:text-base xl:text-lg w-[80%] sm:w-auto m-auto">
            Enter your credentials to continue.
          </p>
        </div>

        <div className="p-2 space-y-4 md:space-y-6 sm:p-8 flex flex-col justify-center items-center w-full xl:w-1/2  ">
          <div className=' flex flex-col justify-center items-start w-3/4 sm:w-2/3 md:w-1/2 xl:w-2/3'>
            <label className="block mb-2 text-sm sm:text-base md:text-lg lg:text-xl font-medium text-gray-100">
              Your email
            </label>
            <input value={loginForm.email} onChange={handleChange} placeholder="Enter your email" className="bg-gray-50 border border-gray-300 text-black text-xs sm:text-sm md:text-base rounded-lg block w-full p-2  md:p-2.5" id="email" type="email" name='email' />
          </div>
          <div className='flex flex-col justify-center items-start w-3/4 sm:w-2/3 md:w-1/2 xl:w-2/3'>
            <label className="mb-2 text-sm sm:text-base md:text-lg lg:text-xl font-medium text-gray-100 flex justify-center items-center gap-2">
              Password
              {!eyeClose && <IoMdEye onClick={handleEyeClose} className='text-lg md:text-xl lg:sm:text-2xl cursor-pointer' />}
              {eyeClose && <IoMdEyeOff onClick={handleEyeOpen} className='text-lg md:text-xl lg:text-2xl cursor-pointer' />}
            </label>
            <input value={loginForm.password} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-black text-xs sm:text-sm md:text-base rounded-lg block w-full p-2 md:p-2.5" placeholder="Enter password" id="password" type={`${!eyeClose ? 'password' : 'text'}`} name='password' />
          </div>
          <button onClick={handleSubmission} disabled={isDisabled} className={`w-3/4 sm:w-2/3 md:w-1/2 xl:w-2/3 ${isDisabled ? " bg-blue-800 cursor-not-allowed" : " bg-blue-600 hover:bg-blue-700 cursor-pointer"}   font-medium rounded-lg text-xs sm:text-sm md:text-base lg:text-lg px-2 sm:px-5 py-2 sm:py-2.5 text-center text-white`}>
            Login
          </button>
          <div className="redirectLogin flex justify-center items-center text-xs mt-3 sm:text-base md:text-lg lg:text-xl gap-2"><p>Didn't Registered yet!</p><NavLink onClick={handleRedirect} to='/register' className='text-blue-400 hover:underline cursor-pointer'>Register</NavLink></div>
        </div>
      </div>
    </>
  );
}

export default Login