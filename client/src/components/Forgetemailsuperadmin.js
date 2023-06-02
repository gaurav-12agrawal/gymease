import React, { useState } from 'react'
import Forgetcss from './styles/Forget.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Forgetemailsuperadmin = () => {
    const [email, setEmail] = useState("");
    const [name, setname] = useState("");
    const setVal = (e) => {
        setEmail(e.target.value)
    }
    const setVal1 = (e) => {
        setname(e.target.value)
    }

    const sendLink = async (e) => {
        e.preventDefault();
        if (!email || !name) {
            return (toast.error("Fill data properly", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            }))
        }
        const res = await fetch("https://gym-54v4.onrender.com/sendpasswordlinkadmin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, name })
        });


        const data = await res.json();

        if (data.status == 201) {
            setEmail("");
            setname("");
            toast.success("Reset password Link Sent to your Gamil", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })

        } else {
            toast.error("Invalid Gmail", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            setEmail("")
            setname("")
        }
    }
    return (
        <>
            <div className={Forgetcss.emailcontainer}>
                <ToastContainer
                    position="top-center" />

                <div className={Forgetcss.emailcontainerlow}>

                    <input type="name" value={name} onChange={setVal1} name="name" id="name" placeholder='Enter Your Name' className={Forgetcss.emailinput}  ></input >
                    <input type="email" value={email} onChange={setVal} name="email" id="email" placeholder='Enter Your Email Address' className={Forgetcss.emailinput}  ></input >
                    <button className={Forgetcss.emailbutton} onClick={sendLink} > Send Email</button>
                </div ></div>
        </>
    )
}

export default Forgetemailsuperadmin
