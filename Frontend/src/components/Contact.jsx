import React from 'react';
import { useState } from 'react';
import './contact.css';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';

const Contact = () => {
  const [messageDetails, setmessageDetails] = useState({ name: "", email: "", message: "" })
  const [isDisabled, setisDisabled] = useState(false)
  function handleCHange(e) {
    setmessageDetails({ ...messageDetails, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (messageDetails.message.length > 0 && messageDetails.name.length > 0 && messageDetails.email.length > 0 && messageDetails.email.endsWith('@gmail.com')) {
      if (messageDetails.message.length > 20) {

        let res = await fetch('http://localhost:3000/sendMessage', { method: "POST", credentials: "include", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...messageDetails, id: uuidv4() }) })
        let data = await res.json()
        if (res.ok) {
          setmessageDetails({ name: "", email: "", message: "", })  //used to reset the value setted by the user
          setisDisabled(false)
          window.scrollTo({ top: 0, behavior: 'smooth' });
          toast.success('Message Recived Successfuly!', {
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
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          toast.error(`${data.message}`, {
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
    } else {
      if (messageDetails.name.length == 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        toast.warn("Name is required!", {
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
      if (messageDetails.email.length == 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        toast.warn("Email is required!", {
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
      if (!messageDetails.email.endsWith('@gmail.com')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        toast.warn("Enter a valid email address", {
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
      <div className="contactBox tall w-full min-h-screen flex items-center justify-center px-4 sm:px-4 lg:px-8 py-10 bg-black overflow-y-auto">
        <div
          className="bg-gray-900 text-white shadow-2xl rounded-2xl p-6 sm:p-10 sm:w-[80%] md:h-[70%] lg:h-auto lg:w-full max-w-7xl xl:p-10 flex flex-col sm:flex-col md:flex-col lg:flex-row gap-10"
        >
          {/* Left Panel */}
          <div className="flex-1 space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-5xl font-bold">
              Get in Touch
            </h2>
            <p className="text-gray-400 text-xs sm:text-base lg:text-lg xl:text-xl">
              I'd love to hear from you! Whether you have a project idea, a job opportunity, or just want to say hello — feel free to reach out.
            </p>
            <p className="text-gray-400 text-xs sm:text-base xl:text-lg">
              I'm always open to discussing new ideas, creative collaborations, or opportunities to be part of your vision. Just drop a message and I’ll get back to you as soon as possible.
            </p>
          </div>
          {/* Right Panel - Contact Form */}
          <form
            className="flex flex-col space-y-4 w-full max-w-md mx-auto"
          >
            <div>
              <label className="block  text-xs sm:text-sm lg:text-base xl:text-lg font-medium text-gray-300">Name</label>
              <input
                type="text"
                required
                value={messageDetails.name}
                placeholder='Entre your name..'
                onChange={handleCHange}
                name='name'
                className="mt-1 text-xs sm:text-base w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm lg:text-base xl:text-lg font-medium text-gray-300">Email</label>
              <input
                type="email"
                required
                value={messageDetails.email}
                placeholder='Enter your email..'
                name='email'
                onChange={handleCHange}
                className="mt-1 text-xs sm:text-base w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm lg:text-base xl:text-lg font-medium text-gray-300">Message</label>
              <textarea
                rows="4"
                required
                value={messageDetails.message}
                placeholder='Enter your message..'
                name='message'
                onChange={handleCHange}
                className="mt-1 text-xs sm:text-base w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
              ></textarea>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isDisabled}
              className="w-[70%] sm:w-[80%] md:w-full text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 rounded-md font-normal sm:font-semibold transition mx-auto"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
