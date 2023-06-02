import React, { useReducer, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Paymentcss from './styles/payment.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Fetchloader from './Fetchloader';
import { RxCross1 } from "react-icons/rx";

import Coupondata from './Coupondata';
const Payment = () => {
    const [coupon, setcoupon] = useState('')
    const [count, setcount] = useState(1);
    const [tempprice, settemprice] = useState()

    const [reducer, forceupdate] = useReducer(x => x + 1, 0)
    const [load, setload] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();

    const handleclick = () => {
        navigate(`/details/${id}/payment/checkoutform`, { state: { days: location.state.days, address: location.state.address, name: location.state.name, price: location.state.price } })
    }
    const removecoupon = () => {
        setcount(1)
        setload(true)
        location.state.price = tempprice
        const timer = setTimeout(() => {
            setload(false)
        }, 200);
        forceupdate();
    }
    const checkcoupon = () => {
        if (coupon === '') {
            return toast.info("Coupon field can not be empty", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        }


        if (count === 1) {
            try {
                let cfind = Coupondata.find((cou) => cou.name === coupon);

                if (cfind.mb > location.state.price) {
                    return toast.info("Coupon can not be applied", {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    })
                }
                else {
                    settemprice(location.state.price)
                    if (cfind.isper) location.state.price = location.state.price - Math.round((location.state.price * cfind.off))
                    else location.state.price = location.state.price - cfind.off
                    setcount(2)
                    setload(true)
                    const timer = setTimeout(() => {
                        setload(false)
                    }, 200);
                    forceupdate();

                    return toast.success("Coupon applied successfully", {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    })
                }
            } catch (error) {

                return toast.info("Invalid coupon", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
            }

        }
        if (count > 1) {
            return toast.info("Coupon already appplied", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        }
    }
    const checkdata = async () => {
        let res;
        try {
            let token = document.cookie;
            if (token === '') token = 'empty'
            res = await fetch(`https://gym-54v4.onrender.com/getsinglegym/${id}/payment/${token}`, {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })

        }
        catch (err) {
            console.log(err);
            navigate('/login')
        }
        setload(false)
        if (!res.ok) {
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
    }
    useEffect(() => {
        setload(true)
        checkdata();
    }, [reducer])

    return (
        <>{
            load ? <Fetchloader /> :
                <div>
                    <div className={Paymentcss.container}>
                        <ToastContainer
                            position="top-center" />

                    </div >
                    <div className={Paymentcss.card}>
                        <p className={Paymentcss.para} ><b>Name :</b> <br></br> {location.state.name}</p>
                        <p className={Paymentcss.para}><b>Location :</b> <br></br>{location.state.address}</p>
                        <p className={Paymentcss.para}> <b>Type :</b> <br></br>{location.state.days}</p>
                        <p className={Paymentcss.para}> <b>Price :</b> <br></br>₹ {location.state.price}</p>
                        <div className={Paymentcss.coupon}>
                            <label className={Paymentcss.coupon1} htmlFor='coupon'>Do you have any discount coupon ?</label>
                            <br></br>
                            {count == 2 ?
                                <input type='text' value={coupon} className={Paymentcss.remove2} ></input> :
                                <input type='text' id='coupon' placeholder='Gymfree100' value={coupon} className={Paymentcss.coupon2} onChange={e => setcoupon(e.target.value)}></input>}
                            {count == 2 ?
                                <button className={Paymentcss.remove1} onClick={removecoupon}  >Remove</button>
                                : <button className={Paymentcss.coupon3} onClick={checkcoupon} >Apply</button>
                            }
                        </div>
                        <p className={Paymentcss.para}>
                            <button onClick={handleclick} className={Paymentcss.detailsbutton}>Proceed to payment</button>
                        </p>

                    </div>
                </div>}

        </>
    )
}

export default Payment
