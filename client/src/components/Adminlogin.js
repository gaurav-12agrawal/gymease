import React, { useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import signupcss from './styles/signup.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const Adminlogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('')

    const loginAdmin = async (e) => {
        let res;
        e.preventDefault();
        if (!email || !name || !password) {
            return (
                toast.error("Fill all data", {
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
        try {
            res = await fetch('https://gym-54v4.onrender.com/signinadminringrg', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password, name
                })
            });
        }

        catch {
            alert('A server or network error occurred during the request!')
        }

        const data = await res.json()

        if (data.status === 422 || data.status === 400 || !data || !res.ok) {
            toast.error("You are not a Admin", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            setEmail('')
            setName('')
            setPassword('')
        }
        else {
            toast.success("Admin Login Successfully", {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            Cookies.set('jwtokenadmin', data.token, { expires: 1 });

            localStorage.setItem("isadmin", "admin")
            var now = new Date().getTime();
            localStorage.setItem('setupTime', now)
            navigate('/')
        }
    }


    return (
        <div className={signupcss.maincontainer}>
            <ToastContainer
                position="top-center" />
            <div className={signupcss.container}>
                <p className={signupcss.entrydivname}>Admin Login</p>
                <form>
                    <div className={signupcss.entrydiv}>

                        <input className={signupcss.inputdiv} type='text' id='name' name='name' placeholder='johndoeAdmin' value={name} onChange={(e) => setName(e.target.value)}></input>
                    </div>
                    <div className={signupcss.entrydiv}>

                        <input className={signupcss.inputdiv} type='email' id='email' name='email' placeholder='johndoeAdmin@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    </div>

                    <div className={signupcss.entrydiv}>

                        <input className={signupcss.inputdiv} value={password} type='password' id='password' name='password' placeholder='........' onChange={(e) => setPassword(e.target.value)}></input>
                    </div>



                </form>

                <div className={signupcss.entrydiv}>
                    <button className={signupcss.signupbutton} onClick={loginAdmin}>Login</button>
                </div>


            </div>
        </div>
    )
}

export default Adminlogin