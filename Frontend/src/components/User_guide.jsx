import React from 'react'

const User_guide = () => {
  return (
    <div className="min-h-screen max-w-[90vw] mx-auto justify-center flex flex-col items-center py-10 md:py-20">
      {/* Header Section */}
      <div className=" 2xl:min-w-[80%] w-full shadow-lg rounded-2xl p-6 mb-3 md:mb-6 text-center 3xl:flex flex-col gap-4">
        <h1 className="text-xl sm:text-3xl md:text-4xl xl:text-5xl font-extrabold text-white mb-4">📘 User Manual for Help</h1>
        <p className="text-base sm:text-xl md:text-xl xl:text-3xl text-gray-100 mb-2">
          This platform provides the best code management experience.
        </p>
        <p className="text-base sm:text-lg md:text-lg xl:text-xl text-gray-200 mt-4">
          Follow the steps below to learn how to add and manage your code in <span className="font-semibold md:font-bold text-base sm:text-lg md:text-xl xl:text-2xl bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent">Snip - Vault</span>
        </p>
      </div>

      {/* Manual Section */}
      <div className="w-full max-w-4xl shadow-md rounded-2xl 3xl:p-10 lg:p-8 p-10 xl:p-6 md:p-6">
        <h2 className="text-lg sm:text-xl md:text-2xl xl:text-4xl font-semibold text-gray-400 mb-4 text-center">📌 Steps to Save Code in Snip - Vault</h2>
        <ul className=" space-y-3 text-gray-300 text-sm sm:text-base md:text-lg xl:text-xl list-decimal list-inside md:px-10">
          <li>Enter the details of your code in the provided input fields.</li>
          <li>Save the details using the <span className="font-medium text-green-600">Save</span> button.</li>
          <li>View your code and its information in the <span className="font-medium text-blue-600">Code Details</span> section.</li>
          <li>Edit any information by clicking the <span className="font-medium text-yellow-500">Edit</span> button in the action section.</li>
          <li>Delete any entry using the <span className="font-medium text-red-500">Delete</span> button.</li>
          <li>Review all your saved code easily from Expand button in action section</li>
        </ul>
      </div>
      <div className="w-full max-w-4xl mt-10 bg-black rounded-2xl p-4 shadow-lg text-center">
        <h3 className=" text-xl sm:text-xl md:text-xl xl:text-3xl font-semibold text-white mb-3">You're all set! 🎉</h3>
        <p className=" text-gray-300 text-xs sm:text-base xl:text-lg mb-2">
          Now that you know how to use
          <span className="font-semibold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent ml-1">
            Snip - Vault
          </span>,
          go ahead and start organizing your code like a pro.
        </p>
        <p className=" text-gray-400 text-xs sm:text-sm md:text-base xl:text-lg">
          Need help later? You can always revisit this guide or reach out via the Contact section.
        </p>
      </div>


    </div>

  )
}

export default User_guide