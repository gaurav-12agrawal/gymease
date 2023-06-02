import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import formcss from './styles/Setdataform.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Editcard = () => {
    const [file, setFile] = useState([])
    const [data, setdata] = useState({ name: "", city: "", address: "", url: "", information: "", workouts: "", facilities: "", price: { fifdays: "", month: "", threemonth: "", sixmonth: "", oneyear: "", fifdayst: "", montht: "", threemontht: "", sixmontht: "", oneyeart: "", }, timing: { start: "", end: "" }, sex: { male: true, female: true }, ac: true, varified: true })

    const handleInputs = (e) => {
        const { name, value, checked } = e.target
        if (name === "name" || name === "city" || name === "url" || name === "workouts" || name === "facilities" || name === "information" || name === "address") {
            setdata((prevdata) => {
                return { ...prevdata, [name]: value }
            })
        }
        if ((name === "varified" || name === "ac") && checked) {
            setdata((prevdata) => {
                return { ...prevdata, [name]: true }
            })
        }
        if ((name === "varified" || name === "ac") && !checked) {
            setdata((prevdata) => {

                return { ...prevdata, [name]: false }
            })
        }
        if (name === "fifdays" || name === "month" || name === "threemonth" || name === "sixmonth" || name === "oneyear" || name === "fifdayst" || name === "montht" || name === "threemontht" || name === "sixmontht" || name === "oneyeart") {
            setdata((prevdata) => {
                const newdata = { ...prevdata }
                newdata.price[name] = value
                return newdata
            })
        }
        if (name === "start" || name === "end") {
            setdata((prevdata) => {
                const newdata = { ...prevdata }
                newdata.timing[name] = value
                return newdata
            })
        }
        if ((name === "male" || name === "female") && checked) {
            setdata((prevdata) => {
                const newdata = { ...prevdata }
                newdata.sex[name] = true
                return newdata
            })
        }
        if ((name === "male" || name === "female") && !checked) {
            setdata((prevdata) => {
                const newdata = { ...prevdata }
                newdata.sex[name] = false
                return newdata
            })
        }
    }


    const navigate = useNavigate();
    const { id } = useParams();

    const getdata = async (e) => {

        let res;

        res = await fetch(`https://gym-54v4.onrender.com/getcard/${id}`, {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const data1 = await res.json();
        if (data1.status === 422 || !data1 || !res.ok || data1.status === 400) {
            toast.error("Error from server side", {
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
            setdata(data1)

            setdata((prevdata) => {
                return { ...prevdata, ac: true }
            })
            setdata((prevdata) => {
                return { ...prevdata, varified: true }
            })
            setdata((prevdata) => {
                const newdata = { ...prevdata }
                newdata.sex.male = true
                return newdata
            })
            setdata((prevdata) => {
                const newdata = { ...prevdata }
                newdata.sex.female = true
                return newdata
            })
            if (!data1.price.sixmonth) {
                setdata((prevdata) => {
                    const newdata = { ...prevdata }
                    newdata.price.sixmonth = ""
                    return newdata
                })
            }
            if (!data1.price.oneyear) {
                setdata((prevdata) => {
                    const newdata = { ...prevdata }
                    newdata.price.oneyear = ""
                    return newdata
                })
            }
            if (!data1.price.threemonth) {
                setdata((prevdata) => {
                    const newdata = { ...prevdata }
                    newdata.price.threemonth = ""
                    return newdata
                })
            }
            if (!data1.price.month) {
                setdata((prevdata) => {
                    const newdata = { ...prevdata }
                    newdata.price.month = ""
                    return newdata
                })
            }
            if (!data1.price.fifdays) {
                setdata((prevdata) => {
                    const newdata = { ...prevdata }
                    newdata.price.fifdays = ""
                    return newdata
                })
            }
            if (!data1.price.sixmontht) {
                setdata((prevdata) => {
                    const newdata = { ...prevdata }
                    newdata.price.sixmontht = ""
                    return newdata
                })
            }
            if (!data1.price.oneyeart) {
                setdata((prevdata) => {
                    const newdata = { ...prevdata }
                    newdata.price.oneyeart = ""
                    return newdata
                })
            }
            if (!data1.price.threemontht) {
                setdata((prevdata) => {
                    const newdata = { ...prevdata }
                    newdata.price.threemontht = ""
                    return newdata
                })
            }
            if (!data1.price.montht) {
                setdata((prevdata) => {
                    const newdata = { ...prevdata }
                    newdata.price.montht = ""
                    return newdata
                })
            }
            if (!data1.price.fifdayst) {
                setdata((prevdata) => {
                    const newdata = { ...prevdata }
                    newdata.price.fifdayst = ""
                    return newdata
                })
            }


        }
    }



    const updatecard = async (e) => {

        e.preventDefault();


        const formData = new FormData()
        for (var i = 0; i < file.length; i++) {
            formData.append('image', file[i])
        }
        formData.append("name", data.name)
        formData.append("city", data.city)
        formData.append("address", data.address)
        formData.append("url", data.url)
        formData.append("information", data.information)
        formData.append("facilities", data.facilities)
        formData.append("workouts", data.workouts)
        formData.append("pricef", data.price.fifdays)
        formData.append("pricem", data.price.month)
        formData.append("pricetm", data.price.threemonth)
        formData.append("pricesm", data.price.sixmonth)
        formData.append("pricey", data.price.oneyear)
        formData.append("priceft", data.price.fifdayst)
        formData.append("pricemt", data.price.montht)
        formData.append("pricetmt", data.price.threemontht)
        formData.append("pricesmt", data.price.sixmontht)
        formData.append("priceyt", data.price.oneyeart)
        formData.append("timings", data.timing.start)
        formData.append("timinge", data.timing.end)
        formData.append("ac", data.ac)
        formData.append("sexf", data.sex.female)
        formData.append("sexm", data.sex.male)
        formData.append("varified", data.varified)
        let token = document.cookie;
        if (token === '') token = 'empty'
        const res2 = await fetch(`https://gym-54v4.onrender.com/updatecard/${id}/${token}`, {
            method: 'PATCH',
            body: formData

        });
        if (res2.ok) {

            toast.success("Edit Successfully", {
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
            return
        }
        if (res2.status === 400) {

            window.alert('Fill data properly')
        }
        else {
            window.alert('Fill data properly')

        }

    }
    const isadmin = async (e) => {

        let res5;
        try {
            let token = document.cookie;
            if (token === '') token = 'empty'
            res5 = await fetch(`https://gym-54v4.onrender.com/admin/isadmin/${token}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })

        }
        catch (err) {
            console.log(err)
        }
        const data4 = await res5.json()
        if (data4.status !== 200) {
            navigate('*')
        }


    }

    useEffect(() => {
        isadmin();
        getdata();
    }, [])



    return (
        <>


            <form className={formcss.container} enctype="multipart/form-data">
                <ToastContainer
                    position="top-center" />
                <div className={formcss.maincontainer}>
                    <div className={formcss.eachdiv} >
                        <label className={formcss.label} htmlFor="name">Name</label><br />
                        <input className={formcss.eachinput} type="text" name="name" id="name" placeholder="" value={data.name} onChange={handleInputs} />
                    </div>
                    <div className={formcss.eachdiv} >
                        <label className={formcss.label} htmlFor="city">City</label><br />
                        <input className={formcss.eachinput} type="text" name="city" id="city" placeholder="" value={data.city} onChange={handleInputs} />
                    </div>
                    <div className={formcss.eachdiv} >
                        <label className={formcss.label} htmlFor="address">Full Address</label><br />
                        <input className={formcss.eachinput} type="text" name="address" id="address" placeholder="" value={data.address} onChange={handleInputs} />
                    </div>
                    <div className={formcss.eachdiv} >
                        <label className={formcss.label} htmlFor="url">Location URL</label><br />
                        <input className={formcss.eachinput} type="text" name="url" id="url" placeholder="" value={data.url} onChange={handleInputs} />
                    </div>
                    <div className={formcss.eachdiv} >
                        <label className={formcss.label} htmlFor="information">Information</label><br />
                        <input className={formcss.eachinput} type="text" name="information" value={data.information} onChange={handleInputs} id="information" placeholder="" />
                    </div>

                    <div className={formcss.eachdiv}>
                        <label className={formcss.label} htmlFor="workouts">workouts</label><br />
                        <input className={formcss.eachinput} type="text" name="workouts" id="workouts" placeholder="" value={data.workouts} onChange={handleInputs} />
                    </div>
                    <div className={formcss.eachdiv}>
                        <label className={formcss.label} htmlFor="facilities">Facilities</label><br />
                        <input className={formcss.eachinput} type="text" name="facilities" id="facilities" placeholder="" value={data.facilities} onChange={handleInputs} />
                    </div>
                    <div className={formcss.eachdiv}>
                        <input
                            name='image'
                            onChange={e => setFile(e.target.files)}
                            type="file"
                            accept="image/*"
                            multiple
                        ></input>
                    </div>
                    <div >
                        <label className={formcss.label} htmlFor="male">Male</label><br />
                        <input type="checkbox" id="male" name="male" value={data.sex.male}
                            onClick={handleInputs} defaultChecked
                        />
                    </div>
                    <div >
                        <label className={formcss.label} htmlFor="female">Female</label><br />
                        <input type="checkbox" id="female" name="female" value={data.sex.female}
                            onClick={handleInputs} defaultChecked
                        />
                    </div>
                    <div >
                        <label className={formcss.label} htmlFor="varified">Varified by Gymozy</label><br />
                        <input type="checkbox" id="varified" name="varified" value={data.varified}
                            onClick={handleInputs} defaultChecked
                        />
                    </div>
                    <div >
                        <label className={formcss.label} htmlFor="ac">AC</label><br />
                        <input type="checkbox" id="ac" name="ac" value={data.ac}
                            onChange={handleInputs} defaultChecked
                        />
                    </div>
                    <div className={formcss.eachdiv}>
                        <label className={formcss.label} htmlFor="start">Start time </label><br />
                        <input className={formcss.eachinput} type="text" id="start" name="start" value={data.timing.start} onChange={handleInputs} />
                    </div>
                    <div className={formcss.eachdiv}>
                        <label className={formcss.label} htmlFor="end">End time </label><br />
                        <input className={formcss.eachinput} type="text" id="end" name="end" value={data.timing.end} onChange={handleInputs} />
                    </div>
                    <div className={formcss.eachdiv}>
                        <label className={formcss.label} htmlFor="fifdays">15 Days </label><br />
                        <input className={formcss.eachinput} type="number" id="fifdays" name="fifdays" value={data.price.fifdays} onChange={handleInputs} min="0" />
                    </div>
                    <div className={formcss.eachdiv}>
                        <label className={formcss.label} htmlFor="month">1 Month </label><br />
                        <input className={formcss.eachinput} min="0" type="number" id="month" name="month" value={data.price.month} onChange={handleInputs} />
                    </div>
                    <div className={formcss.eachdiv}>
                        <label className={formcss.label} htmlFor="threemonth">3 Months </label><br />
                        <input className={formcss.eachinput} type="number" id="threemonth" name="threemonth" value={data.price.threemonth} onChange={handleInputs} min="0" />
                    </div>
                    <div className={formcss.eachdiv}>
                        <label className={formcss.label} htmlFor="sixmonth">6 Months </label><br />
                        <input className={formcss.eachinput} type="number" id="sixmonth" name="sixmonth" value={data.price.sixmonth} onChange={handleInputs} min="0" />
                    </div>
                    <div className={formcss.eachdiv}>
                        <label className={formcss.label} htmlFor="oneyear">1 Year </label><br />
                        <input className={formcss.eachinput} type="number" id="oneyear" name="oneyear" value={data.price.oneyear} onChange={handleInputs} min="0" />
                    </div>
                    <br></br>
                    <p>price with Trainer</p>
                    <div className={formcss.eachdiv}>
                        <label className={formcss.label} htmlFor="fifdayst">15 Days </label><br />
                        <input className={formcss.eachinput} type="number" id="fifdayst" name="fifdayst" value={data.price.fifdayst} onChange={handleInputs} min="0" />
                    </div>
                    <div className={formcss.eachdiv}>
                        <label className={formcss.label} htmlFor="montht">1 Month </label><br />
                        <input className={formcss.eachinput} min="0" type="number" id="montht" name="montht" value={data.price.montht} onChange={handleInputs} />
                    </div>
                    <div className={formcss.eachdiv}>
                        <label className={formcss.label} htmlFor="threemontht">3 Months </label><br />
                        <input className={formcss.eachinput} type="number" id="threemontht" name="threemontht" value={data.price.threemontht} onChange={handleInputs} min="0" />
                    </div>
                    <div className={formcss.eachdiv}>
                        <label className={formcss.label} htmlFor="sixmontht">6 Months </label><br />
                        <input className={formcss.eachinput} type="number" id="sixmontht" name="sixmontht" value={data.price.sixmontht} onChange={handleInputs} min="0" />
                    </div>
                    <div className={formcss.eachdiv}>
                        <label className={formcss.label} htmlFor="oneyeart">1 Year </label><br />
                        <input className={formcss.eachinput} type="number" id="oneyeart" name="oneyeart" value={data.price.oneyeart} onChange={handleInputs} min="0" />
                    </div>
                    <div>
                        <button type="submit" className={formcss.submit} onClick={updatecard}>Edit</button>
                    </div>
                </div>


            </form>

        </>
    )
}

export default Editcard