import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Forgetcss from './styles/Forget.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Fetchloader from './Fetchloader'

const Forgetpassword = () => {
    const [load, setload] = useState(false)

    const [password, setPassword] = useState("");
    const [cpassword, setcPassword] = useState("");

    const { id, token } = useParams();
    const navigate = useNavigate();
    const setVal = (e) => {
        setPassword(e.target.value)
    }
    const setVal1 = (e) => {
        setcPassword(e.target.value)
    }

    const userValid = async () => {
        setload(true)
        const res = await fetch(`https://gym-54v4.onrender.com/forgotpassword/${id}/${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json()

        if (data.status == 201) {

        } else {
            navigate("*")
        }
        setload(false)
    }

    const sendpassword = async (e) => {
        e.preventDefault();
        if (password !== cpassword) {
            setPassword("")
            setcPassword("")
            return (

                toast.error("Password should be same", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })

            )
        }
        if (password.length < 8) {
            setPassword("")
            setcPassword("")
            return (
                toast.error("Password must be minimum 8 character", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
            )
        }
        setload(true)
        const res = await fetch(`https://gym-54v4.onrender.com/${id}/${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password, cpassword })
        });
        setload(false)
        const data = await res.json()

        if (data.status == 201) {
            setPassword("")
            setcPassword("")
            toast.success("Password Reset successfully", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            setTimeout(() => {
                navigate("/login")
            }, 3000);


        } else {
            toast.error("Try Again After some time", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            setTimeout(() => {
                navigate("/login")
            }, 3000);
        }
    }






    useEffect(() => {
        userValid()

    }, [])
    return (
        <div className={Forgetcss.emailcontainer}>
            <ToastContainer
                position="top-center" />
            <input type="password" value={password} onChange={setVal} name="password" id="password" placeholder='Enter Your New password' className={Forgetcss.emailinput}  ></input >
            <input type="password" value={cpassword} onChange={setVal1} name="cpassword" id="cpassword" placeholder=' Confirm Your password' className={Forgetcss.emailinput}  ></input >
            <button className={Forgetcss.emailbutton} onClick={sendpassword}  > Reset Password</button>
        </div >
    )
}

export default Forgetpassword
