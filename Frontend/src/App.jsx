import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'animate.css';
import './App.css'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import About from './components/About';
import User_guide from './components/User_guide';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import { loggedInContext } from './context/context';
import OTPreciver from './components/OTPreciver';
import Notfound from './components/Notfound';
import ProtectOTP from './components/ProtectOTP';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [hover, sethover] = useState(false)
  const [loggedIn, setloggedIn] = useState(false)
  const [registerd, setregisterd] = useState(false)
  const [email, setemail] = useState("")
  const name = useRef("")
  const [username, setusername] = useState("")
  const [tempemail, settempemail] = useState("")
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar />
        <Home />
        <Footer /></>,
    },
    {
      path: "/about",
      element: <><Navbar />
        <About />
        <Footer /></>,
    },
    {
      path: "/contact",
      element: <><Navbar />
        <Contact />
        <Footer /></>,
    },
    {
      path: "/user_guide",
      element: <><Navbar />
        <User_guide />
        <Footer /></>,
    },
    {
      path: "/login",
      element: <><Navbar />
        <Login />
        <Footer /></>,
    },
    {
      path: "/register",
      element: <><Navbar />
        <Register />
        <Footer /></>,
    },
    {
      path: "/otp",
      element: <>
        <ProtectOTP>
          <Navbar />
          <OTPreciver />
          <Footer />
        </ProtectOTP></>,
    },
    {
      path: "*",
      element: <><Notfound /></>,
    },
  ]);

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
      <loggedInContext.Provider value={{ loggedIn, setloggedIn, email, setemail, tempemail, settempemail, username, setusername, registerd, setregisterd,name }}>
        <RouterProvider router={router} />
      </loggedInContext.Provider>
    </>
  )
}

export default App
