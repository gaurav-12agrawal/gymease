import React, { useState } from 'react'
import Forgetcss from './styles/Forget.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Fetchloader from './Fetchloader'

const Forgetemail = () => {
    const [load, setload] = useState(false)
    const [email, setEmail] = useState("");
    const setVal = (e) => {
        setEmail(e.target.value)
    }

    const sendLink = async (e) => {
        setload(true)
        e.preventDefault();
        if (!email) {
            setload(false)

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
        const res = await fetch("https://gym-54v4.onrender.com/sendpasswordlink", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });
        setload(false)
        const data = await res.json();
        const message = data.message;
        if (data.status == 201) {
            setEmail("");
            toast.success(`${message}`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })

        } else if (data.status === 400) {
            toast.error(`${message}`, {
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
        }
    }
    return (
        <>  {load ? <Fetchloader /> :
            <div className={Forgetcss.emailcontainer}>
                <ToastContainer
                    position="top-center" />

                <div className={Forgetcss.emailcontainerlow}>

                    <input type="email" value={email} onChange={setVal} name="email" id="email" placeholder='Enter Your Email Address' className={Forgetcss.emailinput}  ></input >
                    <button className={Forgetcss.emailbutton} onClick={sendLink} > Send Email</button>
                </div >
            </div>}
        </>
    )
}

export default Forgetemail
