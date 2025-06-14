import React from 'react'

const Offline = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-6 py-12 text-center">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <span className="text-6xl md:text-7xl lg:text-8xl">📡</span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          You're Offline
        </h1>
      </div>

      <p className="mt-5 text-gray-400 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl text-base sm:text-lg leading-relaxed">
        No internet connection detected. We’re trying to reconnect you. Please check your Wi-Fi or mobile data.
      </p>

      <div className="mt-8 flex items-center gap-2">
        <span className="h-3 w-3 bg-green-500 rounded-full animate-ping" />
        <span className="text-sm text-gray-400">Reconnecting...</span>
      </div>
    </div>
  );

}

export default Offline