import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Forgetcss from './styles/Forget.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Forgetpasswordadmin = () => {
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
        const res = await fetch(`https://gym-54v4.onrender.com/forgetpasswordadmin/${id}/${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json()
        console.log(data)
        if (data.status == 201) {
            console.log("user valid")
        } else {
            navigate("*")
        }
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
        if (password.length < 10) {
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
        const res = await fetch(`https://gym-54v4.onrender.com/admin/${id}/${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password, cpassword })
        });

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
                navigate("/superadminlogin")
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

export default Forgetpasswordadmin
