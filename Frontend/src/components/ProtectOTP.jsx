import React from 'react'
import { Navigate } from "react-router-dom";
import { useContext } from 'react';
import { loggedInContext } from '../context/context';

const ProtectOTP = ({children}) => {
    const value = useContext(loggedInContext);
    if (!value.registerd) {
        return <Navigate to="/" replace />;
    }

    return children;

};

export default ProtectOTP