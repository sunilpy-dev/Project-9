import React from 'react'
import 'animate.css';
import './navbar.css'
import { useState, useEffect } from 'react'
import { div, style } from 'motion/react-client';
import { CiSearch } from "react-icons/ci";
import { PiAcornFill } from 'react-icons/pi';
import { AiFillAccountBook } from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from 'react';
import { loggedInContext } from '../context/context';

const Navbar = () => {
  const [hover, sethover] = useState(false)
  const [hover1, sethover1] = useState(false)
  const [hover2, sethover2] = useState(false)
  const [hover3, sethover3] = useState(false)
  // const [Focus, setFocus] = useState(false)
  const value = useContext(loggedInContext);
  const [hamBurger, sethamBurger] = useState(false)
  // const [userData, setuserData] = useState(false)
  const handleOpen = () => {
    sethamBurger(true)
  }

  const handleClose = () => {
    sethamBurger(false)
  }
  const handleCloseLogOut = async () => {
    sethamBurger(false)
    let res = await fetch('https://snip-vault-backend.onrender.com/logot', { method: "GET", credentials: "include" });
    value.setloggedIn(false)
    value.setemail("")
    let success = await res.text()
    if (success == "true") {
      toast.success('Logged out successfuly!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        delay: 0,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (success == "false") {
      toast.error('Not logged out yet!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        delay: 0,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  // const handleUser = () => {
  //   setuserData(true)
  // }
  // const handleLogClose = () => {
  //   setuserData(false)
  // }

  useEffect(() => {
    if (hamBurger) {
      document.body.classList.add('overflow-hidden'); // Add Tailwind class manually
    } else {
      document.body.classList.remove('overflow-hidden'); // Restore scroll
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [hamBurger]);

  useEffect(() => {
          const checkAuth = async () => {
              const res = await fetch('https://snip-vault-backend.onrender.com/verifyUser', {
                  method: 'GET',
                  credentials: 'include'
              });
  
              const data = await res.json();
  
              if (res.ok) {
                  // set login state from server response
                  value.setemail(data.user.email)
                  value.setloggedIn(true);
              } else {
                  value.setemail("")
                  value.setloggedIn(false);
              }
          };
  
          checkAuth();
      }, []);

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
      <div className='hidden w-[95vw] mb-3 sm:flex justify-between items-center'>
        <div className="logo flex justify-center items-center gap-2 w-[20%] md:w-[19%] ">
          <img src="/images/logo.png" alt="logo" className='h-7 md:h-8 lg:h-9 xl:h-10 3xl:h-16 invert ' />
          <div className='w-full text-base md:text-lg lg:text-2xl xl:text-3xl 3xl:text-5xl font-bold cursor-pointer'><NavLink to='/'> Snip-Vault</NavLink></div>
        </div>
        <ul className='flex justify-center items-center h-[5vh] w-[60%] md:w-[60%] lg:w-[60%] xl:w-[60%] 3xl:w-[80%] gap-6 md:gap-5 lg:gap-10  '>
          <NavLink to='/' className={`text-base md:text-lg lg:text-2xl xl:text-3xl 3xl:text-5xl font-semibold 2xl:font-bold hover:cursor-pointer ${hover ? 'animate__animated animate__headShake' : ''}`} onMouseEnter={() => sethover(true)} onMouseLeave={() => sethover(false)}>Home</NavLink>
          <NavLink to='/user_guide' className={` text-base md:text-lg lg:text-2xl xl:text-3xl 3xl:text-5xl font-semibold 2xl:font-bold hover:cursor-pointer ${hover2 ? 'animate__animated animate__headShake' : ''}`} onMouseEnter={() => sethover2(true)} onMouseLeave={() => sethover2(false)}>User guide</NavLink>
          <NavLink to='/about' className={`text-base md:text-lg lg:text-2xl xl:text-3xl 3xl:text-5xl font-semibold 2xl:font-bold hover:cursor-pointer ${hover1 ? 'animate__animated animate__headShake' : ''}`} onMouseEnter={() => sethover1(true)} onMouseLeave={() => sethover1(false)}>About us</NavLink>
          <NavLink to='/contact' className={`text-base md:text-lg lg:text-2xl xl:text-3xl 3xl:text-5xl font-semibold 2xl:font-bold hover:cursor-pointer ${hover3 ? 'animate__animated animate__headShake' : ''}`} onMouseEnter={() => sethover3(true)} onMouseLeave={() => sethover3(false)}>Contact us</NavLink>
        </ul>
        {!value.loggedIn && <div className="relative inline-flex items-center justify-center gap-4 group pl-5 p-1 md:w-[15%] w-[10%]  ">
          <div
            className="absolute inset-0 duration-1000 opacity-60 transitiona-all bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"
          ></div>
          <NavLink
            role="button"
            className="group relative inline-flex items-center justify-center text-xs lg:text-base xl:text-lg rounded-xl bg-gray-900 px-5 py-2  md:px-8 md:py-3 font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30"
            title="Register"
            to='/login'
          >Login<svg
            aria-hidden="true"
            viewBox="0 0 10 10"
            height="10"
            width="10"
            fill="none"
            className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
          >
              <path
                d="M0 5h7"
                className="transition opacity-0 group-hover:opacity-100"
              ></path>
              <path
                d="M1 1l4 4-4 4"
                className="transition group-hover:translate-x-[3px]"
              ></path>
            </svg>
          </NavLink>
        </div>}
        {value.loggedIn && <div className="relative inline-flex items-center justify-center gap-4 group pl-5 p-1 md:w-[15%] lg:w-[15%] xl:w-[15%] 3xl:w-[15%] ">
          <div
            className="absolute inset-0 duration-1000 opacity-60 transitiona-all bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"
          ></div>
          <button
            role="button"
            className="group relative inline-flex items-center justify-center text-xs lg:text-base xl:text-lg 3xl:text-3xl rounded-xl bg-gray-900 px-2 lg:px-5 py-2  md:px-3 md:py-3 3xl:px-10 3xl:py-5 3xl:font-bold font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30"
            title="Logout"
            onClick={handleCloseLogOut}
          >Logout<svg
            aria-hidden="true"
            viewBox="0 0 10 10"
            height="10"
            width="10"
            fill="none"
            className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
          >
              <path
                d="M0 5h7"
                className="transition opacity-0 group-hover:opacity-100"
              ></path>
              <path
                d="M1 1l4 4-4 4"
                className="transition group-hover:translate-x-[3px]"
              ></path>
            </svg>
          </button>
        </div>}
      </div>

      {/* For the mobile */}

      <div className='flex w-[100%] sm:hidden justify-between items-center bg-black h-[30px] mb-3'>
        <div className="logo flex justify-center items-center gap-2 w-[60%] ">
          <img src="/images/logo.png" alt="logo" className='h-7 invert ' />
          <div className='w-full text-base font-bold cursor-pointer'><NavLink to='/'> Snip-Vault</NavLink></div>
        </div>
        <div onClick={handleOpen} className="hamburger w-[10%]">
          <GiHamburgerMenu className='text-xl' />
        </div>
      </div>
      <div className="line bg-gray-500 w-[100%] h-[.8px] mt-2 3xl:mt-5 flex justify-center items-center"></div>

      <div className={`linkBox sm:hidden flex justify-start items-center backdrop-blur-md bg-transparent h-screen overflow-hidden fixed   ${hamBurger ? 'transition-all -right-0 duration-200 ease-out' : ' transition-all -right-[1200px] duration-200 ease-in'} w-full -top-0 z-10 `}>
        <div className="contentLink flex justify-center rounded-sm items-center w-[80%] h-screen bg-black absolute right-0">
          <IoClose onClick={handleClose} className='absolute top-0 left-0 m-2 text-2xl border-2 rounded-full' />
          <div className='flex justify-center items-center flex-col gap-3 w-full'>
            {value.loggedIn && <div className="greet flex flex-col justify-center items-center gap-3 mb-2">
              <div className="userIcon border-2 rounded-full flex justify-center items-center p-1"><FaUserCircle className='text-7xl' /></div>
              <div className="greetTExt text-sm font-semibold font-serif truncate">Welcome User</div>
            </div>}
            {!value.loggedIn && <div className="greet flex flex-col justify-center items-center gap-3 mb-2">
              <div className="userIcon border-2 rounded-full flex justify-center items-center p-1"><FaUserCircle className='text-7xl' /></div>
              <div className="greetText text-sm font-semibold font-serif truncate">Welcome's you as a Guest</div>
            </div>}
            <div className="line bg-gray-500 w-[60%] h-[.5px] mb-3"></div>
            <div className="text-gray-200 center m-2 text-md font-bold font-serif">Quick Access</div>
            <div className='flex justify-start flex-col items-center h-[70%] w-full gap-2'>
              <NavLink onClick={handleClose} to='/' className={`text-sm font-medium text-gray-300 hover:cursor-pointer ${hover ? 'animate__animated animate__headShake' : ''}`} >Home</NavLink>
              <NavLink onClick={handleClose} to='/user_guide' className={`text-sm font-medium text-gray-300 hover:cursor-pointer ${hover2 ? 'animate__animated animate__headShake' : ''}`} >User guide</NavLink>
              <NavLink onClick={handleClose} to='/about' className={`text-sm font-medium text-gray-300 hover:cursor-pointer ${hover1 ? 'animate__animated animate__headShake' : ''}`}>About us</NavLink>
              <NavLink onClick={handleClose} to='/contact' className={`text-sm font-medium text-gray-300 hover:cursor-pointer ${hover3 ? 'animate__animated animate__headShake' : ''}`} >Contact us</NavLink>
              {!value.loggedIn && <NavLink onClick={handleClose} to='/login' className={`text-sm font-medium text-gray-300 hover:cursor-pointer ${hover3 ? 'animate__animated animate__headShake' : ''}`} >Login</NavLink>}
              {value.loggedIn && <button onClick={handleCloseLogOut} className={`text-sm font-medium text-gray-300 hover:cursor-pointer ${hover3 ? 'animate__animated animate__headShake' : ''}`} >Logout</button>}
            </div>
            <div className="Para w-full flex justify-center items-center text-center mt-10"><i className='flex text-center font-sans w-[90%] justify-center items-center text-xs text-gray-400'>"Every link is engineered for quick navigation and zero friction. Minimal effort. Maximum control."</i></div>
          </div>
        </div>
      </div>


    </>
  )
}

export default Navbar