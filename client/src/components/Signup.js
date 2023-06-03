import React, { useState } from 'react'
import signupcss from './styles/signup.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Fetchloader from './Fetchloader';
const Signup = () => {
    const Navigate = useNavigate();
    const [user, setUser] = useState({
        name: "", email: "", phone: "", password: "", cpassword: ""
    })
    const [load, setload] = useState(false)
    let name, value;
    const handleInputs = (e) => {

        name = e.target.name; // name mila ki konsa attribute h
        value = e.target.value // yha us attribute ki value mili 
        setUser({ ...user, [name]: value })

    }

    const PostData = async (e) => {
        e.preventDefault();
        let res;

        const { name, email, phone, password, cpassword } = user;

        if (!name || !email || !phone || password.length < 8 || !password || !cpassword) {
            return (toast.error("Fill Data Properly", {
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
        if (password !== cpassword) {
            return (toast.error("Password should be same", {
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
        setload(true)
        try {
            res = await fetch('https://gym-54v4.onrender.com/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, phone, password, cpassword
                })
            })

        }
        catch (e) {
            alert('A server or network error occurred during the request!')
        }
        setload(false)
        try {
            const data = await res.json()

            if (res.status === 200) {
                toast.success("Verification mail sucessfully send to your gmail", {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
                setUser({
                    name: "", email: "", phone: "", password: "", cpassword: ""
                })
                setTimeout(() => {
                    Navigate('/login')
                }, 5000);
            }
            if (res.status === 401) {
                toast.error("Account Exists ", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
                setUser({
                    name: "", email: "", phone: "", password: "", cpassword: ""
                })
            }
            if (res.status === 400) {
                toast.error("Invalid Credentials", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
                setUser({
                    name: "", email: "", phone: "", password: "", cpassword: ""
                })
            }
        } catch (error) {
            toast.error("Invalid Credentials", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            console.log(error)
        }


    }
    return (
        <> {load ? <Fetchloader /> :
            <div className={signupcss.maincontainer}>
                <ToastContainer
                    position="top-center" />
                <div className={signupcss.container}>
                    <form>
                        <div className={signupcss.entrydiv}>

                            <label className={signupcss.lname} htmlFor='name'>Name </label>
                            <input className={signupcss.inputdiv} type='text' id='name' onChange={handleInputs} value={user.name} name='name' placeholder='johndoe'></input>

                        </div>
                        <div className={signupcss.entrydiv}>
                            <label className={signupcss.lname} htmlFor='email'>Email </label>
                            <input className={signupcss.inputdiv} type='email' id='email' onChange={handleInputs} value={user.email} name='email' placeholder='johndoe@gmail.com'></input>
                        </div>
                        <div className={signupcss.entrydiv}>
                            <label className={signupcss.lname} htmlFor='phone'>Phone </label>
                            <input className={signupcss.inputdiv} type='phone' id='phone' onChange={handleInputs} value={user.phone} name='phone' placeholder='+91...'></input>
                        </div>
                        <div className={signupcss.entrydiv}>
                            <label className={signupcss.lname} htmlFor='password'>Password </label>
                            <input className={signupcss.inputdiv} type='password' id='password' onChange={handleInputs} value={user.password} name='password' placeholder='........'></input>
                        </div>
                        <div className={signupcss.entrydiv}>
                            <label className={signupcss.lname} htmlFor='cpassword'>Confirm Password </label>
                            <input className={signupcss.inputdiv} type='password' id='cpassword' onChange={handleInputs} value={user.cpassword} name='cpassword' placeholder='........'></input>
                        </div>


                    </form>

                    <div className={signupcss.entrydiv}>
                        <button className={signupcss.signupbutton} onClick={PostData}>Sign Up</button>
                    </div>
                    <div className={signupcss.entrydiv}>
                        <p className={signupcss.already} > Already have an account ? </p>
                        <Link className={signupcss.linkdiv} to="/login">Login </Link>
                    </div>

                </div>
            </div>}
        </>
    )
}

export default Signup