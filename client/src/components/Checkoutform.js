import React, { useState } from 'react'
import Checkoutcss from './styles/Checkoutform.module.css'
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Fetchloader from './Fetchloader'

const Checkoutform = () => {
    const navigate = useNavigate();
    const [load, setload] = useState(false)
    const location = useLocation();
    const { id } = useParams();


    const [data, setdata] = useState({ name: location.state.name, address: location.state.address, days: location.state.days, price: location.state.price, yname: "", number: "", email: "", date: Number, month: Number, year: Number });
    const [file, setfile] = useState([]);
    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setdata({ ...data, [name]: value });
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


    const Postdata = async (e) => {
        e.preventDefault();

        if (!data.name || !data.address || !data.days || !data.price || !data.yname || !data.number.length === 10 || !data.email || file.length === 0 || !data.date || !data.month || !data.year) {
            return (
                toast.error("Fill Data Properly", {
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
        if ((data.month == 2 && data.date > 28)) {
            return (
                toast.error("Check your date again", {
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
        const hour = '00';
        const minute = '00';
        const second = '00';
        const dynamicDate = new Date(data.year, data.month - 1, data.date, hour, minute, second);
        const milliseconds = dynamicDate.getTime();
        var milliseconds1 = Date.now();
        if (milliseconds - milliseconds1 < 0) {
            toast.info("You can Join from tomorrow and onwards only", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            return
        }
        setload(true)
        const formData = new FormData()
        for (var i = 0; i < file.length; i++) {
            formData.append('image', file[i])
        }
        formData.append("name", data.name)
        formData.append("address", data.address)
        formData.append("price", data.price)
        formData.append("days", data.days)
        formData.append("yname", data.yname)
        formData.append("email", data.email)
        formData.append("number", data.number)
        formData.append("date", data.date)
        formData.append("month", data.month)
        formData.append("year", data.year)
        let res;
        setdata({ ...data, email: "", yname: "", date: "", month: "", year: "", number: "" })
        try {
            let token = document.cookie;
            if (token === '') token = 'empty'
            res = await fetch(`https://gym-54v4.onrender.com/gym/${id}/paymentform/${token}`, {
                method: 'POST',
                body: formData
            })

        }
        catch (e) {
            alert('A server or network error occurred during the request!')
        }
        setload(false)

        if (res.status === 200 || res.ok) {

            toast.success(" We have send a link to you gmail , Please verify ", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            return
        }
        if (res.status === 400) {

            toast.error("Error from server , Try Again", {
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
            toast.error("Error from server , Try Again", {
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
        checkdata();
    }, [])

    return (
        <>{load ? <Fetchloader /> :
            <div className={Checkoutcss.maindiv}>
                <div className={Checkoutcss.container}>
                    <ToastContainer
                        position="top-center" />

                </div >
                <div className={Checkoutcss.steptocancle_div}>
                    <div className={Checkoutcss.blinkforcheck}>** Please read following steps before booking your gym **</div>
                    <p className={Checkoutcss.cancleheading}>Steps for booking a gym:-
                    </p>
                    <p className={Checkoutcss.cancleitem}><b>1.</b> <b>Double-check</b> your <b>email</b> address and verify the email address with in <b>24 hrs.</b> by clicking on the link provided in the email sent to your inbox. ( Entering the wrong email address may cause your bookings <b>not</b> to appear in the 'My Booking' section ).

                    </p>
                    <p className={Checkoutcss.cancleitem}><b>2.</b> Please attach the <b>correct screenshot of the payment </b>for the confirmed booking. (Providing an incorrect screenshot or a payment with less than the required amount may result in the <b>cancellation</b> of the booking).
                    </p>
                    <p className={Checkoutcss.cancleitem}><b>3.</b> Please wait for verification from our end. We will verify your booking within 24 hours

                    </p>
                </div>
                <div className={Checkoutcss.main}>
                    <div className={Checkoutcss.qr}>
                        <p className={Checkoutcss.note}>Make sure , you fill payment form given below</p>
                        <div className={Checkoutcss.upiqrdiv}>
                            <p className={Checkoutcss.qrheading}>Scan me to pay</p>
                            <img className={Checkoutcss.qrimage} src='https://res.cloudinary.com/dgfn40mfc/image/upload/v1726828626/0984c311-dc65-4ac0-ab9f-901a9c2437f6.png'></img>
                            <p className={Checkoutcss.upiheading}>Or make a upi payment </p>
                            <p className={Checkoutcss.upi}><b>gauravagrawal1202@axl</b></p>
                        </div>
                    </div>
                    <div className={Checkoutcss.form}>
                        <form className={Checkoutcss.containerform} onSubmit={Postdata} enctype="multipart/form-data">
                            <div className={Checkoutcss.maincontainerform}>
                                <div className={Checkoutcss.eachdiv} >
                                    <label className={Checkoutcss.label} htmlFor="name">Gym name</label><br />
                                    <input className={Checkoutcss.eachinput} type="text" name="name" id="name" placeholder="" value={location.state.name} />
                                </div>
                                <div className={Checkoutcss.eachdiv} >
                                    <label className={Checkoutcss.label} htmlFor="address">Gym address</label><br />
                                    <input className={Checkoutcss.eachinput} type="text" name="address" id="address" placeholder="" value={location.state.address} />
                                </div>
                                <div className={Checkoutcss.eachdiv} >
                                    <label className={Checkoutcss.label} htmlFor="days">Type</label><br />
                                    <input className={Checkoutcss.eachinput} type="text" name="days" id="days" placeholder="" value={location.state.days} />
                                </div>
                                <div className={Checkoutcss.eachdiv} >
                                    <label className={Checkoutcss.label} htmlFor="price">Amount </label><br />
                                    <input className={Checkoutcss.eachinput} type="number" name="price" id="price" value={location.state.price} placeholder="" />
                                </div>
                                <div className={Checkoutcss.eachdiv} >
                                    <div className={Checkoutcss.starlable} >
                                        <label className={Checkoutcss.label} htmlFor="yname">Name</label><br />
                                        <p className={Checkoutcss.star} > *</p>
                                    </div>
                                    <input className={Checkoutcss.eachinput} type="text" name="yname" id="yname" placeholder="" value={data.yname} onChange={handleInputs} />
                                </div>
                                <div className={Checkoutcss.eachdiv} >
                                    <div className={Checkoutcss.starlable} >
                                        <label className={Checkoutcss.label} htmlFor="email">Email</label><br />
                                        <p className={Checkoutcss.star} > *</p>
                                    </div>
                                    <input className={Checkoutcss.eachinput} type="email" name="email" id="email" placeholder="" value={data.email} onChange={handleInputs} />
                                </div>
                                <div className={Checkoutcss.eachdiv} >
                                    <div className={Checkoutcss.starlable} >
                                        <label className={Checkoutcss.label} htmlFor="email">Joining date</label><br />
                                        <p className={Checkoutcss.star} > *</p>
                                    </div>
                                    <div className={Checkoutcss.datecontainer}>
                                        <input className={Checkoutcss.eachinputdate} type="number" name="date" id="date" placeholder="DD" min='01' max='30' value={data.date} onChange={handleInputs} />
                                        <span className={Checkoutcss.dateslash}>/ </span>
                                        <input className={Checkoutcss.eachinputdate} type="number" name="month" id="month" placeholder="MM" min='01' max='12' value={data.month} onChange={handleInputs} />
                                        <span className={Checkoutcss.dateslash}> / </span>
                                        <input className={Checkoutcss.eachinputdate} type="number" name="year" id="year" placeholder="YYYY" min='2023' max='2030' value={data.year} onChange={handleInputs} />
                                    </div>
                                </div>

                                <div className={Checkoutcss.eachdiv} >
                                    <div className={Checkoutcss.starlable} >
                                        <label className={Checkoutcss.label} htmlFor="number">Phone no</label><br />
                                        <p className={Checkoutcss.star} > *</p>
                                    </div>
                                    <input className={Checkoutcss.eachinput} type="phone" name="number" id="number" placeholder="" value={data.number} onChange={handleInputs} />
                                </div>
                                <div className={Checkoutcss.eachdiv}>
                                    <div className={Checkoutcss.starlable} >
                                        <label className={Checkoutcss.label} >Payment Screenshot</label><br />
                                        <p className={Checkoutcss.star} > *</p>
                                    </div>
                                    <div className={Checkoutcss.uploadbox}>
                                        <input
                                            name='image'
                                            onChange={e => setfile(e.target.files)}
                                            type="file"
                                            accept="image/*"

                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    <button className={Checkoutcss.submit} type="submit">Submit</button>
                                </div>
                            </div>


                        </form>

                    </div>
                </div>
            </div >
        }</>
    )
}

export default Checkoutform
