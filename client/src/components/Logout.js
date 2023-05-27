
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Fetchloader from './Fetchloader';
const LogOut = () => {
    const navigate = useNavigate();
    const [load, setload] = useState(true)

    useEffect(() => {
        fetch('/logout', {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then((res) => {
                if (res.status === 200) {
                    setload(false)
                    navigate('/login')
                    return toast.success("Logout Successfully", {
                        position: "top-center",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    })
                }

                if (res.status !== 200) {
                    navigate('/')
                    return toast.info("Login first", {
                        position: "top-center",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            })

    }, [])


    return (
        <> {load ? <Fetchloader /> :
            <ToastContainer
                position="top-center" />
        }
        </>
    )
}
export default LogOut