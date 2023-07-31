import React, { useState } from 'react'
import signupcss from './styles/signup.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Fetchloader from './Fetchloader';
import Cookies from 'js-cookie';

const Login = () => {
    const navigate = useNavigate();
    const [load, setload] = useState(false)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const handleKeyUp = (event) => {
        if (event.key === 'Enter') {
            loginUser(event);
        }
    };
    const loginUser = async (e) => {

        e.preventDefault(); //some times form reload itself so we use 
        let res;
        if (!email || !password) {
            return toast.error("Invalid Credentials", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        }
        setload(true)
        try {
            res = await fetch('https://gym-54v4.onrender.com/signin', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            });
        }

        catch {
            alert('A server or network error occurred during the request!')
        }

        const data = await res.json()

        const message = data.message
        setload(false)
        if (res.status === 200) {

            toast.success("Login Successfully", {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            Cookies.set('jwtoken', data.token, { expires: 30 });
            navigate(-1)

        }
        if (res.status === 400) {
            setEmail("")
            setPassword("")
            toast.error(` ${message}`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        }
    }


    return (<>
        {load ? <Fetchloader /> :
            <div>
                <ToastContainer
                    position="top-center" />
                <div className={signupcss.maincontainer}>
                    <div className={signupcss.container}>
                        <form>

                            <div className={signupcss.entrydiv}>

                                <input className={signupcss.inputdiv} type='email' id='email' name='email' placeholder='johndoe@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={handleKeyUp}></input>
                            </div>

                            <div className={signupcss.entrydiv}>

                                <input className={signupcss.inputdiv} value={password} type='password' id='password' name='password' placeholder='........' onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyUp}></input>
                            </div>



                        </form>

                        <div className={signupcss.entrydiv}>
                            <button className={signupcss.signupbutton} onClick={loginUser}>Login</button>
                        </div>
                        <div className={signupcss.entrydiv}>
                            <Link className={signupcss.linkdiv} to="/signup">Sign Up</Link>
                        </div>
                        <div className={signupcss.entrydiv}>
                            <Link className={signupcss.linkforgot} to="/forgetemail">Forget password?</Link>
                        </div>

                    </div>
                </div>
            </div>}
    </>

    )
}

export default Login