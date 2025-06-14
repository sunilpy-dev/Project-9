import React from 'react'
import { useEffect } from "react";
const NetworkMonitor = () => {

  useEffect(() => {

    const handleOffline = () => {
      if (!navigator.onLine) {
        window.location.href = "/offline";
      }
    };

    const handleOnline = () => {
      if (navigator.onLine) {
        window.location.href = "/";
      }
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return null; // This component just listens, renders nothing
};


export default NetworkMonitor