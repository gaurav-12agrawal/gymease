import React, { useEffect, useReducer, useState } from 'react'
import Cardcss from '../components/styles/Bookingcard.module.css'
import { GiCheckMark } from "react-icons/gi";
import { IoIosHourglass } from "react-icons/io";
import { GoX } from "react-icons/go";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Bookingcard = (props) => {

    var milliseconds0 = new Date().getTime();
    const milliseconds = props.details.currentdate; // filling date
    const date = new Date(milliseconds);
    const dateString = date.toLocaleDateString();

    const milliseconds1 = props.details.joiningdate;
    const date1 = new Date(milliseconds1);
    const dateString1 = date1.toLocaleDateString();

    const milliseconds2 = props.details.expiredate;
    const date2 = new Date(milliseconds2);
    const dateString2 = date2.toLocaleDateString();
    const [type, settype] = useState('Booked');
    const [load, setload] = useState(1)
    const handleclick = async (e) => {
        const response = window.confirm("Are you sure you want to cencle your booked gym ?");
        if (response) {
            let token = document.cookie;
            if (token === '') token = 'empty'
            e.preventDefault();
            const res = await fetch(`https://gym-54v4.onrender.com/item/cenclemyitem/${props.details._id}/${token}`, {
                method: 'PATCH',
                body: ''
            });
            if (res.ok || res.status === 200) {
                toast.success("Cencel request send successfully", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
                props.fun();
                return
            }
            if (res.status === 400) {
                toast.warning("You are not authorized", {
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
                toast.warning("You can not cencle it now", {
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
            else {
                window.alert('Erroe from server side try after some time')

            }
        } else {
            window.location.reload();
        }

    }

    useEffect(() => {
        if (milliseconds0 >= milliseconds2)
            settype('Expired')
    }, [])
    const expiredcolor = {
        backgroundColor: "black"
    };
    const bookcolor = {
        backgroundColor: "green"
    };
    let note;
    if (props.details.isvalid === 1) note = <p className={Cardcss.firstveri}><GiCheckMark /> verified</p>
    else if (props.details.isvalid === 0) note = <p className={Cardcss.firstveriunder}><IoIosHourglass /> verification is under process</p>
    else note = note = <p className={Cardcss.firstverirej}><GoX /> Rejected</p>

    let cencle
    if (props.details.cbyuser === 0 && (milliseconds0 < milliseconds1) && (props.details.isvalid === 0 || props.details.isvalid === 1)) {
        cencle = <button className={Cardcss.bookbutton1} onClick={handleclick} >Cancel Now</button>
    }
    if (props.details.cbyuser === 1) {
        cencle = <button className={Cardcss.bookbutton5} >Cancel in request</button>
    }
    if (props.details.cbyuser === 2) {
        cencle = <button className={Cardcss.bookbutton5} >Cancelled</button>
    }






    return (
        <>

            <div className={Cardcss.main}>
                <div className={Cardcss.first} >
                    <p className={Cardcss.firstname}>{props.details.gymname}</p>
                    <p className={Cardcss.firstadd}>{props.details.gymaddress}</p>
                    {note
                    }
                    <hr></hr>
                </div>
                <div className={Cardcss.second}>
                    <p className={Cardcss.secondname} >Name : <b> {props.details.name}</b></p>
                    <p className={Cardcss.secondamount} >Amount paid  : <b>{props.details.amount} ₹ </b></p>
                    <p className={Cardcss.secondid} >Order Id :<b> {(props.details._id)}</b></p>
                    <p >Type : <b>{props.details.type}</b></p>
                    <hr className={Cardcss.secondtype}></hr>
                </div>
                <div className={Cardcss.third}>
                    <p>Booking Date : &nbsp;{dateString}</p>
                    <p>Starting Date : &nbsp;{dateString1}</p>
                    <p>Expire date : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{dateString2}</p>
                </div>
                <div className={Cardcss.forth}>
                    {props.details.isvalid === 2 ? < p ></p> : <button className={Cardcss.bookbutton} style={type === 'Booked' ? bookcolor : expiredcolor} >{type}</button>}
                    {cencle}
                </div>
            </div >

        </>
    )
}

export default Bookingcard
