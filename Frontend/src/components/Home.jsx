import React from 'react'
import { useState, useRef, useEffect } from 'react'
import lottie from "lottie-web";
import './home.css'
import 'animate.css';
import { code, div } from 'motion/react-client'
import { defineElement } from "@lordicon/element";
import { ToastContainer, toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { BiExpandAlt } from "react-icons/bi";
import { v4 as uuidv4 } from 'uuid';
import { useContext } from 'react';
import { loggedInContext } from '../context/context';

// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);
function Home() {
    const date = new Date()
    let month = date.getMonth()
    const value = useContext(loggedInContext);
    const regx = '-' + value.email.split('@')[0]
    month = month + 1
    let day = date.getDate()
    let year = date.getFullYear()
    const [data, setdata] = useState({ code: "", description: "", language: "", time: date.toLocaleTimeString(), date: `${day}/${month}/${year}` })
    const [click, setclick] = useState(false)
    const [success, setsuccess] = useState(false)
    const [details, setdetails] = useState([])
    const [isDisabled, setisDisabled] = useState(false)
    const [ShowMoredis, setShowMoredis] = useState(true)
    const [ShowLessdis, setShowLessdis] = useState(true)
    const [ShowAlldis, setShowAlldis] = useState(true)
    const [resetdis, setresetdis] = useState(true)
    const [expand, setexpand] = useState(false)
    const [codeDetails, setcodeDetails] = useState({})
    const [end, setend] = useState(5)

    const blurHappend = useRef()
    async function fetchData() {
        // console.log(regx)
        let req = await fetch('https://snip-vault-backend.onrender.com/fetchdata', { method: "POST",credentials: "include", headers: { "content-type": "application/json" }, body: JSON.stringify({ regx }) })
        let data1 = await req.json()
        if (req.ok) {
            setdetails(data1.Result) // so here it is not adding the data1 arrya into details array but setting data1 array to the details array
        } else {
            toast.error(`${data1.Message}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                delay: 2000,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        // console.log(details)

    }
    useEffect(() => {
        fetchData()
    }, [])
    useEffect(() => {
        fetchData()
    }, [value.email, value.loggedIn])




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
                value.setloggedIn(false);
            }
        };

        checkAuth();
    }, []);


    async function handleClick() {
        setisDisabled(true)
        // console.log(date.toDateString(), date.toLocaleTimeString())
        if (data.code.length >= 5 && data.language.length >= 1) {
            setclick(true)
            setTimeout(() => {
                setclick(false)
            }, 2000);
            let res = await fetch('https://snip-vault-backend.onrender.com/', { method: "POST", credentials: "include", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...data, id: uuidv4() + '-' + value.email.split('@')[0] }) })
            let recived = await res.json()
            if (res.ok) {
                setsuccess(true)
                setTimeout(() => {
                    setdetails([...details, { ...data, time: date.toLocaleTimeString(), date: `${day}/${month}/${year}`, id: uuidv4() }]) //here we are adding the data object into the details array in the form of object
                }, 2000);
                setTimeout(() => {
                    setdata({ code: "", description: "", language: "", })  //used to reset the value setted by the user
                    setisDisabled(false)
                }, 2000);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                toast.success('Saved code details!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    delay: 2000,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setsuccess(false)
                toast.error(`${recived.message}`, {
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
                setisDisabled(false)
            }

        }
        if (data.code.length < 5) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setsuccess(false)
            toast.warning('please enter a valid code', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setTimeout(() => {
                setisDisabled(false)
            }, 2000);
        }
        if (data.language.length < 1) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setsuccess(false)
            toast.warning('please enter a valid language', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setTimeout(() => {
                setisDisabled(false)
            }, 2000);
        }

    }
    function handleCHange(e) {
        setdata({ ...data, [e.target.name]: e.target.value })
    }

    function copyText(text) {
        // console.log(date.toTimeString())
        window.scrollTo({ top: 0, behavior: 'smooth' });
        toast.success('Text copied successfuly', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)

    }
    const handleEdit = async (id) => {
        setdetails(details.filter(item => item.id !== id))
        let res = await fetch('https://snip-vault-backend.onrender.com/delete', { method: "DELETE",credentials: "include", headers: { "content-type": "application/json" }, body: JSON.stringify({ id }) })
        let result = await res.text()
        if (res.ok) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            toast.success('Editing on', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setdata({ ...details.filter(i => i.id == id)[0], id: id, time: date.toLocaleTimeString(), date: `${day}/${month}/${year}` })
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            toast.success(`${result}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

    }
    const handleDelet = async (id) => {
        let cnf = confirm("Do you really want to delete this code data?")
        if (cnf) {
            let del = await fetch('https://snip-vault-backend.onrender.com/delete', { method: "DELETE",credentials: "include", headers: { "content-type": "application/json" }, body: JSON.stringify({ id }) })
            let result = del.text()
            if (del.ok) {

                setdetails(details.filter(item => item.id !== id))
                window.scrollTo({ top: 0, behavior: 'smooth' });
                toast.success('Code details deleted successfuly', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                toast.success(`${result}`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        }
        else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            toast.warn('Code details not deleted', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

        }
    }
    const handleExpand = async (id) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // let res = await fetch('http://localhost:3000/findone', { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ id }) })
        // setcodeDetails(dataFound)
        // let dataFound = await res.json()
        // if (dataFound?.Result) {
        //     setcodeDetails({...dataFound.Result});
        // } else {
        //     console.warn("Data not found or still processing.");
        // }

        setcodeDetails(details.filter(item => item.id == id)[0])
        setexpand(true)
    }
    const handleBlur = () => {
        setexpand(false)
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (blurHappend.current && !blurHappend.current.contains(event.target)) {
                handleBlur(); // Close when clicking outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleBlur]);


    useEffect(() => {

        if (details.length >= 8 && end < 6) {
            setShowMoredis(false)
        } else { setShowMoredis(true) }

        if (details.length > 5 && end >= 8) {
            setShowLessdis(false)
        } else { setShowLessdis(true) }

        if (end != details.length && details.length > 5) {
            setShowAlldis(false)
        } else { setShowAlldis(true) }

        if (end != 5 && details.length >= 6) {
            setresetdis(false)
        } else { setresetdis(true) }

    }, [end, details.length]);
    const handleShowMore = () => {
        // console.log('Show more')
        if (details.length > 5 && end <= 8) {
            setend(end + 3)
        } else { setShowMoredis(true) }

    }
    const handleShowLess = () => {
        // console.log('Show Less')
        if (details.length > 5 && end >= 8) {
            setend(end - 3)
        } else { setShowLessdis(true) }
    }
    const handleShowAll = () => {
        // console.log('Show All')
        if (end != details.length && details.length > 5) {
            setend(details.length)
        } else { setShowAlldis(true) }
    }
    const handleReset = () => {
        // console.log('Show All')
        if (end != 5 || details.length >= 6) {
            setend(5)
        } else { setShowMoredis(true) }
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


            <div className='flex justify-center items-center pt-10 flex-col w-[90vw] my-auto min-h-screen relative mx-auto '>
                <p className=' text-xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-serif font-semibold text-center w-full'>Welcome to <span className="brand_text">Snip-Vault</span></p>
                <div className="body flex flex-col justify-center sm:w-[95%] md:w-full text-center items-center gap-2 mt-3 font-thin text-sm sm:font-medium sm:text-base xl:text-xl font-serif text-gray-400 sm:text-gray-300 md:text-gray-200">
                    <p>This platform is made to provide the coder a better managment of code over the online platform and to make it available all the time.</p>
                    <p>This will make the code handling efficient and easy to access over any device with login</p>
                </div>
                <div className="data w-full lg:w-[70%] flex justify-center items-center flex-col mt-6 md:mt-10 gap-5">

                    <div className="flex flex-col justify-center items-start text-area w-[90%] sm:w-[75%] md:w-[70%] lg:w-[80%] xl:w-[70%]">

                        <label htmlFor="code" className='text-center flex justify-start items-center text-sm sm:text-lg xl:text-xl font-medium sm:font-bold'>Code</label>
                        <textarea value={data.code} onChange={handleCHange} name="code" id="code" placeholder='Write your code here..' className='focus:outline-none w-[100%] min-h-40 sm:min-h-60 text-black bg-gray-100 p-1 sm:p-2 text-xs sm:text-base xl:text-lg font-normal sm:font-medium rounded-md'></textarea>
                    </div>
                    <div className="flex flex-col justify-center items-start text-area w-[90%] sm:w-[75%] md:w-[70%] lg:w-[80%] xl:w-[70%]">

                        <label htmlFor="Description" className='text-center flex justify-start items-center text-sm sm:text-lg xl:text-xl font-medium sm:font-bold'>Description</label>
                        <textarea value={data.description} onChange={handleCHange} name="description" id="Description" placeholder='Write about code' className='focus:outline-none w-[100%] min-h-10 sm:min-h-20 text-black bg-gray-100 p-1 sm:p-2 text-xs sm:text-base xl:text-lg font-normal sm:font-medium rounded-md'></textarea>
                    </div>
                    <div className="val_fields flex flex-col sm:flex-row  justify-between items-center w-full sm:w-[50%] md:w-[60%] px-5 mx-auto sm:gap-2 lg:gap-0">
                        <div className="language-box w-full sm:w-[40%] md:w-auto flex flex-col sm:flex-row justify-center items-start sm:items-center gap-1 sm:gap-2 ">
                            <label htmlFor="language" className='text-sm sm:text-lg xl:text-xl font-semibold'>Language</label>
                            <input value={data.language} onChange={handleCHange} type="text" name="language" id="language" placeholder='Enter language...' className='focus:outline-none rounded-lg p-2 bg-gray-100 w-full sm:w-auto text-black text-xs sm:text-base xl:text-lg  ' />
                        </div>
                        {success && <div className={`box relative mt-5 sm:mt-0 ${click ? 'scale-150 ease-in duration-500' : 'scale-100 ease-in duration-500'}`}>
                            <button disabled={isDisabled} className=" item-box submit border border-white bg-white text-black p-2 text-xs sm:text-base xl:text-xl  sm:font-medium md:font-bold cursor-pointer rounded-xl sm:h-[5%]  md:h-[7%]" onClick={handleClick}>
                                <div className={`text flex justify-center items-center ${click ? ' scale-0 ease-in duration-200 -translate-y-4' : 'scale-100 ease-in duration-500'}`}>
                                    <div className="sv_word">S</div>
                                    <div className="sv_word">a</div>
                                    <div className="sv_word">v</div>
                                    <div className="sv_word">e</div>
                                </div>
                                {click && <div className={`image flex justify-center items-start absolute top-1 sm:top-2 md:top-1 lg:top-1 ${click ? 'scale-100 ease-in duration-300' : 'scale-0 ease-in duration-300'}`}>
                                    <lord-icon
                                        src="https://cdn.lordicon.com/tsrgicte.json"
                                        trigger="loop"
                                        delay="200"
                                        class='lord_icon'
                                    // style={{ width: "50px", height: "50px" }}
                                    >
                                    </lord-icon>
                                </div>}
                            </button>
                        </div>}
                        {!success && <div className={`box relative mt-5 sm:mt-0 `}>
                            <button disabled={isDisabled} className=" item-box submit border border-white bg-white text-black p-2 text-xs sm:text-base xl:text-xl  sm:font-medium md:font-bold cursor-pointer rounded-xl sm:h-[5%]  md:h-[7%]" onClick={handleClick}>
                                <div className={`text flex justify-center items-center`}>
                                    <div className="sv_word">S</div>
                                    <div className="sv_word">a</div>
                                    <div className="sv_word">v</div>
                                    <div className="sv_word">e</div>
                                </div>
                            </button>
                        </div>}
                    </div>

                </div>
                <div className="line bg-gray-500 h-[.5px] w-[90%] mt-6  "></div>
                {details.length > 0 &&
                    <div className="content text-white gap-5 w-[98%] sm:w-[90%] flex flex-col justify-center items-start mt-3 sm:mt-5 md:mt-10 ">
                        <div className="table_info m-2">
                            <p className=' text-base sm:text-xl xl:text-3xl font-bold text-gray-300'>The Snip vault Details</p>
                        </div>
                        <table className='w-full table-fixed sm:w-[100%]'>
                            <thead className='flex justify-center w-full sm:w-auto items-center bg-gray-200 text-black gap-1 sm:gap-10'>

                                <tr className='flex justify-center items-center w-[100%] gap-1'>
                                    <th className='w-1/2 sm:w-3/5 text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium sm:font-bold p-1 sm:p-2 xl:p-3'>Code</th>
                                    <th className='w-1/4 sm:w-1/5 text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium sm:font-bold p-1 sm:p-2 xl:p-3'>Language</th>
                                    <th className='w-1/4 sm:w-1/5 text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium sm:font-bold p-1 sm:p-2 xl:p-3'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='w-full sm:w-auto gap-10'>
                                {details.slice(0, `${end}`).map((item, index) => { //this helps to map thos object array one by one
                                    // {console.log(details)}
                                    return <tr key={index} className='flex justify-center items-center w-full sm:w-[100%]'>
                                        <td className='w-1/2 sm:w-3/5 flex justify-between items-center border border-white p-1 sm:p-2 lg:p-1 text-[10px] sm:text-sm md:text-base xl:text-lg 2xl:text-xl font-semibold h-[45px] sm:max-h-[45px] truncate'>
                                            <div className='w-11/12 lg:w-11/12 xl:w-11/12 2xl:max-w-[700px] sm:max-h-[45px] truncate' >{item.code}</div>
                                            <div className='flex justify-center items-center w-[8%] xl:w-[8%] 2xl:w-[10%] sm:w-[10%]'>
                                                <IoCopy title='Copy' onClick={() => { copyText(item.code) }} className='items-end h-4 md:h-5 lg:h-6 xl:h-6 2xl:h-7 w-10 cursor-pointer' />
                                            </div>
                                        </td>
                                        <td className='w-1/4 sm:w-1/5 text-center border flex justify-center items-center border-white p-1 sm:p-2 h-[45px] text-[10px] sm:text-sm md:text-base 2xl:text-xl 2xl:font-bold font-semibold sm:max-h-[45px]'>{item.language}</td>
                                        <td className='w-1/5  hidden text-center border border-white p-2 text-sm md:text-base lg:text-lg font-semibold sm:flex justify-center items-center gap-2 max-h-[45px] h-[45px]'>
                                            <MdDelete title='Delete' onClick={() => { handleDelet(item.id) }} className='h-4 md:h-6 xl:h-8 w-10 cursor-pointer' />/
                                            <FaEdit title='Edit' onClick={() => { handleEdit(item.id) }} className='h-4 md:h-5 xl:h-6 w-10 cursor-pointer' />/<BiExpandAlt title='Expand to view Details' onClick={() => { handleExpand(item.id) }} className='h-4 md:h-5 xl:h-6 w-10 cursor-pointer' />

                                        </td>
                                        <td className='w-1/4 sm:w-1/5 sm:hidden text-center border border-white p-2 text-[10px] sm:text-lg font-semibold flex justify-center items-center gap-1 sm:gap-2 max-h-[45px] h-[45px]'>
                                            <MdDelete title='Delete' onClick={() => { handleDelet(item.id) }} className=' w-1/3 h-4  sm:h-7 sm:w-10 cursor-pointer' />/
                                            <FaEdit title='Edit' onClick={() => { handleEdit(item.id) }} className='w-1/3 h-4 sm:h-6 sm:w-10 cursor-pointer' />/<BiExpandAlt title='Expand to view Details' onClick={() => { handleExpand(item.id) }} className='w-1/3 h-4 sm:h-6 sm:w-10 cursor-pointer' />

                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>}
                {details.length == 0 && <div className='text-sm sm:text-lg md:text-xl xl:text-2xl font-semibold text-gray-400 sm:p-5 w-[90%] m-1 md:m-2 text-center font-mono'><p>No code details to show</p></div>}
                {details.length > 5 && <div className="buttons flex justify-center items-center w-full gap-3 sm:gap-6 mt-5">
                    <button onClick={handleShowMore} className={`${ShowMoredis ? 'bg-gray-400 cursor-not-allowed' : 'buttonDetails'}  flex justify-center items-center bg-gray-100 text-black p-2 sm:p-2 text-[9px] sm:text-xs md:text-sm lg:text-lg rounded-lg font-semibold font-mono`}>Show More</button>
                    <button onClick={handleShowLess} className={`${ShowLessdis ? 'bg-gray-400 cursor-not-allowed' : 'buttonDetails'}   flex justify-center items-center bg-gray-100 text-black p-2 sm:p-2 text-[9px] sm:text-xs md:text-sm lg:text-lg rounded-lg font-semibold font-mono`}>Show Less</button>
                    <button onClick={handleShowAll} className={`${ShowAlldis ? 'bg-gray-400 cursor-not-allowed' : 'buttonDetails'} flex justify-center items-center bg-gray-100 text-black p-2 sm:p-2 text-[9px] sm:text-xs md:text-sm lg:text-lg rounded-lg font-semibold font-mono`}>Show All</button>
                    <button onClick={handleReset} className={`${resetdis ? 'bg-gray-400 cursor-not-allowed' : 'buttonDetails'} flex justify-center items-center bg-gray-100 text-black p-2 sm:p-2 text-[9px] sm:text-xs md:text-sm lg:text-lg rounded-lg font-semibold font-mono`}>Reset</button>
                </div>}
                {expand &&
                    <div className={`codetailsBox ${expand ? ' animate__animated animate__zoomIn' : ''} min-h-[350px] max-h-[450px] sm:min-h-[470px] sm:max-h-[500px] lg:min-h-[500px] lg:max-h-[600px] xl:min-h-[580px] xl:max-h-[680px] w-full absolute top-[200px] sm:top-56 md:top-48 lg:top-44 xl:top-48 2xl:top-40 flex justify-center items-center `}>
                        <div ref={blurHappend} className={`codeBOx w-[80%] min-h-[260px] sm:min-h-[400px] lg:min-h-[400px] xl:min-h-[420px] max-h-[90%] flex flex-col items-center bg-white text-black z-20 rounded-2xl shadow-xl p-2 sm:p-4 gap-2 sm:gap-4 border border-gray-300`}>

                            <div className="top h-1/5 flex sm:flex-row flex-col justify-around items-center w-full gap-2 sm:gap-10 mt-2">
                                <div className='flex justify-center items-start flex-col w-full sm:w-4/5 pl-2'>
                                    <p className=' text-xs sm:text-base lg:text-lg xl:text-xl font-semibold text-gray-700'>Description:</p>
                                    <div className='font-mono text-[10px] sm:text-sm lg:text-base xl:text-lg font-medium overflow-y-auto min-w-fit max-w-full min-h-[10px] max-h-[80px] border-b-2 border-gray-400 p-1 sm:scrollbar-medium md:scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 rounded-md'>
                                        {codeDetails.description}
                                    </div>
                                </div>
                                <p className='text-[12px] sm:text-sm md:text-base lg:text-lg xl:text-xl pl-2 sm:p-1 flex justify-start sm:justify-center items-start font-semibold w-full sm:w-2/5 lg::w-1/5 text-center text-gray-700'>Language: {codeDetails.language}</p>
                            </div>

                            <div className="bottom h-3/5 w-full">
                                <p className='text-xs sm:text-base xl:text-xl font-semibold p-1 text-gray-700'>Code:</p>
                                <div className="codecontent font-mono text-[10px] sm:text-xs md:text-base font-medium pt-1 sm:pt-2 overflow-y-scroll w-[98%] min-h-[120px] max-h-[230px] sm:min-h-[180px] md:min-h-[240px] sm:max-h-[260px] md:max-h-[300px] border-2 border-gray-400 bg-gray-50 p-2 sm:m-1 rounded-md scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                                    {codeDetails.code}
                                </div>
                            </div>
                            <div className="End h-1/5 w-full flex justify-between items-center sm:items-end mt-3 p-0 sm:p-2">
                                <button onClick={() => { handleBlur() }} className='text-[10px] sm:text-base xl:text-lg font-medium p-2 text-gray-600 italic hover:text-red-500 hover:underline'>Close</button>
                                <p className='text-[9px] flex justify-center items-center sm:text-xs lg:text-base xl:text-lg font-medium p-0 sm:p-2 text-gray-600 italic'>
                                    Last modified: {codeDetails.time} - {codeDetails.date}
                                </p>
                            </div>
                        </div>
                    </div>

                }
            </div>

        </>
    )
}

export default Home
