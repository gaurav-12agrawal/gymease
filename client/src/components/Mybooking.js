import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Bookcss from '../components/styles/Bookings.module.css'
import 'react-toastify/dist/ReactToastify.css';
import { BsBagPlusFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import Bookingcard from "./Bookingcard";
import Fetchloader from './Fetchloader';
function Mybooking() {
    const [reducer, forceUpdate] = useReducer(x => x + 1, 0);
    const [loading, setloading] = useState(false)
    const navigate = useNavigate();
    const [detail, setdetail] = useState({ name: "", email: "" });
    const [detail1, setdetail1] = useState([{}]);
    const passfunction = () => {
        forceUpdate();
    }
    const handleinput = () => {
        navigate('/allcitygyms/Dehradun')
    }
    const checkdata = async () => {
        let res;
        let token = document.cookie;

        try {
            if (token === '') token = 'empty'
            res = await fetch(`https://gym-54v4.onrender.com/user/islogin/getdata/mybooking/${token}`, {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                credentials: 'include',
                withCredentials: true
            })
        }
        catch (err) {
            console.log(err);
            toast.error("server side error", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            navigate('/')
        }
        if (res.status === 400) {
            navigate('/login')
            toast.info("Login First", {
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
        if (res.status === 401) {
            navigate('/')
            toast.error("server side error", {
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
        const data = await res.json()
        setdetail(data)
        setdetail1(data.items)
        setloading(false)
    }

    useEffect(() => {
        checkdata();
        setloading(true)
    }, [reducer])
    let reversedArray = [...detail1].reverse();

    let i = 0;


    return (
        <>
            {
                loading ?
                    <Fetchloader /> :
                    <div>
                        <ToastContainer
                            position="top-center" />
                        <div className={Bookcss.main} >
                            <div className={Bookcss.up} >
                                <div className={Bookcss.upleft} >
                                    <img className={Bookcss.profilepic} src='https://res.cloudinary.com/dgfn40mfc/image/upload/v1685128810/Important%20image/profile_vv7b5k.jpg' ></img>
                                </div>
                                <div className={Bookcss.upright} >
                                    <p className={Bookcss.uprightname}>{detail.name}</p>
                                    <p className={Bookcss.uprightemail}> <span className={Bookcss.mailicon}> <AiOutlineMail /></span> {detail.email}</p>
                                </div>
                            </div>
                            <div className={Bookcss.steptocancle_div}>
                                <p className={Bookcss.cancleheading}>Steps for cancelling a gym :</p>
                                <p><b>1.</b> To cancel the gym booking, go to the 'My Booking' section and click on the 'Cancel' button.
                                </p>
                                <p><b>2.</b>  Please wait for 24 hours to receive <b>confirmation</b> for the cancellation request.
                                </p>
                                <p><b>3.</b> After cancellation, we will initiate the refund process, and you can expect to receive your refund within <b> 5-7 working days </b> if your payment is confirmed.

                                </p>
                            </div>
                            <div className={Bookcss.mid} ><button onClick={handleinput} className={Bookcss.bookbutton}> <BsBagPlusFill /> &nbsp;  Book Now</button> </div>
                            <div className={Bookcss.down} >

                                {

                                    reversedArray.map((value, i) => (

                                        <div key={value.id} className={!reversedArray[i++].isverified && Bookcss.hidebooking}>
                                            <Bookingcard details={value} fun={passfunction} />
                                        </div>
                                    )
                                    )
                                }
                            </div>
                        </div>
                    </div >
            }
        </>
    );
}

export default Mybooking;