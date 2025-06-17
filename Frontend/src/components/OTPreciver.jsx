import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from 'react';
import { loggedInContext } from '../context/context';
import { useNavigate } from "react-router-dom";
const OTPreciver = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const value = useContext(loggedInContext);
    const navigate = useNavigate();
    const [resendClicked, setresendClicked] = useState(false)
    const [timeLeft, setTimeLeft] = useState(2 * 60); // 1 minutes in seconds
    const [isDisabled, setisDisabled] = useState(false)

    useEffect(() => {
        if (timeLeft <= 0) return;
        setisDisabled(false)
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);

    }, [timeLeft]);

    useEffect(() => {
        setTimeout(() => {
            setresendClicked(false)
            setisDisabled(true)
        }, 2 * 60 * 1000);

    }, [resendClicked]);

    // Format time as MM:SS
    const formatTime = (seconds) => {
        const min = String(Math.floor(seconds / 60)).padStart(2, "0");
        const sec = String(seconds % 60).padStart(2, "0");
        return `${min}:${sec}`;
    };

    function OTPGenerator() {
        return (100000 + Math.floor(Math.random() * 900000)).toString();
    }

    const handleChange = (index, value) => {
        if (!/^[0-9]?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            e.preventDefault(); // Prevent default backspace behavior
            const newOtp = [...otp];

            if (otp[index]) {
                newOtp[index] = "";
                setOtp(newOtp);
                const prevInput = document.getElementById(`otp-${index - 1}`);
                if (prevInput) prevInput.focus();
            }
            else if (index > 0) {
                // If current field is empty, move to previous
                const prevInput = document.getElementById(`otp-${index - 1}`);
                if (prevInput) prevInput.focus();

                // Clear previous input as well
                newOtp[index - 1] = "";
                setOtp(newOtp);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setisDisabled(true)
        // console.log("enterd")
        const finalOtp = otp.join("");
        const id = toast.loading("Please wait...")
        // console.log("Submitted OTP:", finalOtp);
        if (finalOtp == "" || finalOtp.length < 6) {
            // toast.warning('Enter a valid OTP', {
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
                render: 'Enter a valid OTP',
                type: "warn",
                isLoading: false,
                autoClose: 2000,
            });
            setisDisabled(false)
        }
        else {
            // console.log("enterd")
            let res = await fetch('https://snip-vault-backend.onrender.com/verifyOTP', { method: "POST",credentials:"include", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: value.tempemail, verificationCode: finalOtp }) })
            // console.log("enterd")
            let respond = await res.json()
            // console.log("enterd")
            // console.log(respond)
            if (respond.Success == true) {
                await fetch('https://snip-vault-backend.onrender.com/sendConfirm', {
                    method: "POST",credentials:"include", headers: { "content-type": "application/json" }, body: JSON.stringify({ username: value.username, email: value.tempemail })
                })
                toast.update(id, {
                    render: "Successfuly Registerd",
                    type: "success",
                    isLoading: false,
                    autoClose: 900,
                });
                setTimeout(() => {
                    navigate('/login', { replace: true })
                }, 1000);
                setOtp(["", "", "", "", "", ""])
                setisDisabled(false)
                // value.setregisterd(false)
            } else if (respond.Success == false) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                // toast.error(`${respond.Result}`, id, {
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
                    render: `${respond.Result}`,
                    type: "error",
                    isLoading: false,
                    autoClose: 2000,
                });
                setisDisabled(false)
                

            }
            else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                // toast.error(`${respond.Result}`, id, {
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
                    render: `${respond.Result}`,
                    type: "error",
                    isLoading: false,
                    autoClose: 2000,
                });
                setOtp(["", "", "", "", "", ""])
                setisDisabled(false)
            }
        }
        // Add submission logic here
    };

    const handleResend = async () => {
        setresendClicked(true)
        setisDisabled(true)
        const id = toast.loading("Please wait...")
        let res = await fetch('https://snip-vault-backend.onrender.com/resetOTP', {
            method: "POST",credentials:"include", headers: { "content-type": "application/json" }, body: JSON.stringify({ username: value.username, email: value.tempemail, verificationCode: OTPGenerator() })
        })
        let getBack = await res.json()
        if (getBack.Success == true) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // toast.success(`${getBack.Result}!`, id, {
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
                render: `${getBack.Result}!`,
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });
            setTimeLeft(2 * 60)
            setOtp(["", "", "", "", "", ""])
            setisDisabled(false)
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // toast.error(`${getBack.Result}!`, id, {
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
                render: `${getBack.Result}!`,
                type: "error",
                isLoading: false,
                autoClose: 2000,
            });
            setOtp(["", "", "", "", "", ""])
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
            <div className="min-h-screen flex items-center justify-center bg-black px-4">
                <div className="bg-gray-800 rounded-2xl shadow-lg p-8 md:p-10 max-w-md w-full text-center flex flex-col justify-center items-center">
                    <h2 className="text-base sm:text-2xl xl:text-3xl font-bold text-gray-100 mb-4">
                        Enter Verification Code
                    </h2>
                    <p className="text-gray-300 mb-6 text-xs sm:text-sm xl:text-base">
                        We've sent a 6-digit code to your registered email.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex justify-between gap-2 sm:gap-3">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-${index}`}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className="w-8 sm:w-10 xl:w-14 h-9 sm:h-11 xl:h-14 text-center text-sm sm:text-lg xl:text-xl font-semibold border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                                />
                            ))}
                        </div>

                        <button
                            disabled={isDisabled}
                            type="submit"
                            className={`w-full ${isDisabled ? 'bg-indigo-700 hover:cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}  text-white py-2 xl:py-3 rounded-lg text-base xl:text-lg font-medium transition`}
                        >
                            Verify
                        </button>
                    </form>
                    <p className="mt-6 text-xs sm:text-sm text-gray-400">
                        OTP is valid for <span className="text-white font-semibold">{formatTime(timeLeft)}</span>
                    </p>

                    <p className="mt-6 text-xs sm:text-sm text-gray-500">
                        Didn't receive the code?{" "}
                        <button
                            type="button"
                            className="text-indigo-600 hover:underline font-medium"
                            onClick={handleResend}
                        >
                            Resend
                        </button>
                    </p>
                </div>
            </div>
        </>
    );
};

export default OTPreciver;
