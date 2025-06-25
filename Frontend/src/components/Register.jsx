import React from 'react'
import { useState, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { loggedInContext } from '../context/context';
import './register.css'

const Register = () => {
    function OTPGenerator() {
        return (100000 + Math.floor(Math.random() * 900000)).toString();
    }
    const navigate = useNavigate();
    const [isDisabled, setisDisabled] = useState(false)
    const value = useContext(loggedInContext);
    const [eyeClose, seteyeClose] = useState(false)
    const handleRedirect = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const [registerForm, setregisterForm] = useState({ username: "", email: "", password: "", verificationCode: "" })

    function handleChange(e) {
        setregisterForm({ ...registerForm, [e.target.name]: e.target.value })
    }
    const handleSubmit = async () => {
        setisDisabled(true)
        const id = toast.loading("Please wait...")
        let found = await fetch('https://snip-vault-backend.onrender.com/finduser', { method: "POST",credentials:"include", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...registerForm }) })
        // let emlrs = await fetch('https://snip-vault-backend.onrender.com/findemail', { method: "POST",credentials:"include", headers: { "content-type": "application/json" }, body: JSON.stringify({ email }) })
        let datafound = await found.text()
        // console.log(datafound)
        if (datafound == "true") {
            if (registerForm.email.length >= 11 && registerForm.email.endsWith('@gmail.com')) {
                let res = await fetch('https://snip-vault-backend.onrender.com/saveRegister', {
                    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...registerForm, id: uuidv4(), verificationCode: OTPGenerator(), isVerified: false })
                    , credentials: 'include'
                })
                let get = await res.json()
                // console.log(get.Success)
                if (get.Success == true) {
                    toast.update(id, {
                        render: "Moving to verify",
                        type: "success",
                        isLoading: false,
                        autoClose: 900,
                    });
                    // setisDisabled(false)
                    setTimeout(() => {
                        value.settempemail(registerForm.email)
                        value.setusername(registerForm.username)
                        value.setregisterd(true)
                        setisDisabled(false)
                        setregisterForm({ username: "", email: "", password: "" })  //used to reset the value setted by the user
                        navigate('/otp', { replace: true })
                    }, 1200);
                } else if (get.Success == false) {
                    // console.log("Enterd")
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    // toast.error(`${get.Result}`,id, {
                    //     position: "top-right",
                    //     autoClose: 2000,
                    //     hideProgressBar: false,
                    //     closeOnClick: true,
                    //     pauseOnHover: false,
                    //     delay: 0,
                    //     draggable: true,
                    //     progress: undefined,
                    //     theme: "dark",
                    // });
                    toast.update(id, {
                        render: `${get.Result}`,
                        type: "error",
                        isLoading: false,
                        autoClose: 2000,
                    });
                    setregisterForm({ username: "", email: "", password: "" })
                    setisDisabled(false)
                    // navigate('/register', { replace: true })
                }
                else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    // toast.error('Not registerde please try again!',id, {
                    //     position: "top-right",
                    //     autoClose: 2000,
                    //     hideProgressBar: false,
                    //     closeOnClick: true,
                    //     pauseOnHover: false,
                    //     delay: 0,
                    //     draggable: true,
                    //     progress: undefined,
                    //     theme: "dark",
                    // });
                    toast.update(id, {
                        render: 'Not registerde please try again!',
                        type: "error",
                        isLoading: false,
                        autoClose: 2000,
                    });
                    setisDisabled(false)
                }
            }
            else if (registerForm.email.length == 0 && registerForm.username.length == 0 && registerForm.password.length == 0) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                // toast.warn('All fields are required!',id, {
                //     position: "top-right",
                //     autoClose: 2000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: false,
                //     delay: 0,
                //     draggable: true,
                //     progress: undefined,
                //     theme: "dark",
                // });
                toast.update(id, {
                    render: 'All fields are required!',
                    type: "warning",
                    isLoading: false,
                    autoClose: 2000,
                });
                setisDisabled(false)
            }
        }
        else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // toast.error('Email already exits!', id, {
            //     position: "top-right",
            //     autoClose: 2000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: false,
            //     delay: 0,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "dark",
            // });
            toast.update(id, {
                render: 'Email already exits!',
                type: "error",
                isLoading: false,
                autoClose: 2000,
            });
            setregisterForm({ username: "", email: "", password: "" })
            setisDisabled(false)
        }
    }
    const handleEyeClose = () => {
        seteyeClose(true)
    }
    const handleEyeOpen = () => {
        seteyeClose(false)
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
            <div>
                <div className="flex flex-col items-center justify-center px-3 sm:px-6 py-8 mx-auto lg:py-0 min-h-screen w-full">
                    <div className="text-center text-white mb-5 w-full sm:max-w-2xl">
                        <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-4">Join the SnipVault Community</h1>
                        <p className="text-gray-400 text-xs sm:text-base md:text-lg ">
                            Create your free account today and start organizing, saving, and accessing your code snippets seamlessly.
                        </p>
                    </div>
                    <div className="p-2 space-y-4 md:space-y-6 sm:p-8 flex flex-col justify-center items-center w-full xl:w-1/2  ">
                        <p className="text-base sm:text-lg md:text-xl font-bold leading-tight tracking-tight text-gray-100 lg:text-3xl xl:text-4xl w-full text-center">
                            Create an account
                        </p>
                        <p className="text-xs sm:text-sm md:text-base font-bold leading-tight underline tracking-tight text-yellow-300 lg:text-xl xl:text-xl w-full text-center">
                            Note: Enter only the registerd email for OTP verification
                        </p>
                        <div className=' flex flex-col justify-center items-start w-3/4 sm:w-2/3 md:w-1/2 xl:w-2/3 '>
                            <label className="block mb-2 text-sm sm:text-base md:text-lg lg:text-xl font-medium text-gray-100">
                                Your username
                            </label>
                            <input value={registerForm.username} name='username' onChange={handleChange} placeholder="Enter username" className="bg-gray-50 border  border-gray-300 text-black text-xs sm:text-sm md:text-base rounded-lg block w-full p-2 md:p-2.5" type="text" />
                        </div>
                        <div className=' flex flex-col justify-center items-start w-3/4 sm:w-2/3 md:w-1/2 xl:w-2/3'>
                            <label className="block mb-2 text-sm sm:text-base md:text-lg lg:text-xl font-medium text-gray-100">
                                Your email
                            </label>
                            <input value={registerForm.email} name='email' onChange={handleChange} placeholder="Enter your email" className="bg-gray-50 border border-gray-300 text-black text-xs sm:text-sm md:text-base rounded-lg block w-full p-2  md:p-2.5" type="email" />
                        </div>
                        <div className='flex flex-col justify-center items-start w-3/4 sm:w-2/3 md:w-1/2 xl:w-2/3'>
                            <label className="mb-2 text-sm sm:text-base md:text-lg lg:text-xl font-medium text-gray-100 flex justify-center items-center gap-2">
                                Password
                                {!eyeClose && <IoMdEye onClick={handleEyeClose} className='text-lg md:text-xl lg:sm:text-2xl cursor-pointer' />}
                                {eyeClose && <IoMdEyeOff onClick={handleEyeOpen} className='text-lg md:text-xl lg:text-2xl cursor-pointer' />}
                            </label>
                            <input value={registerForm.password} name='password' onChange={handleChange} className="bg-gray-50 border border-gray-300 text-black text-xs sm:text-sm md:text-base rounded-lg block w-full p-2 md:p-2.5" placeholder="Enter password" type={`${!eyeClose ? 'password' : 'text'}`} />
                        </div>
                        <button onClick={handleSubmit} disabled={isDisabled} className={` w-3/4 sm:w-2/3 md:w-1/2 xl:w-2/3 ${isDisabled?" bg-blue-800 cursor-not-allowed":" bg-blue-600 hover:bg-blue-700 cursor-pointer"}   font-medium rounded-lg text-xs sm:text-sm md:text-base lg:text-lg px-2 sm:px-5 py-2 sm:py-2.5 text-center text-white`}>
                            Create an account
                        </button>
                    </div>
                    <div className="redirectLogin flex justify-center items-center text-xs mt-3 sm:text-base md:text-lg lg:text-xl gap-2"><p>Already have an account</p><NavLink onClick={handleRedirect} to='/login' className='text-blue-400 hover:underline cursor-pointer'>Login</NavLink></div>
                </div>
            </div>
        </>
    )
}

export default Register