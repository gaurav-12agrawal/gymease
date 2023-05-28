import React, { useEffect, useState, useContext, useReducer } from 'react'
import { useParams } from 'react-router-dom';
import Detailscss from '../components/styles/Detailspage.module.css'
import { GoLocation } from "@react-icons/all-files/go/GoLocation";
import { BsArrow90DegRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import Fetchloader from './Fetchloader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RxCross1 } from "react-icons/rx";
import Editreview from './Editreview';
const Details = () => {

    const [change, forceUpdate] = useReducer(x => x + 1, 0)
    const [loading, setloading] = useState(false)
    const [isloginuserid, setisloginuserid] = useState("")
    const [item1, setitem1] = useState(false);
    const [item2, setitem2] = useState(false);
    const [item3, setitem3] = useState(false);
    const [item4, setitem4] = useState(false);
    const [item5, setitem5] = useState(false);

    const { id } = useParams();
    const reload = (isreload) => {
        if (isreload === true) {
            forceUpdate();
            setpop(!pop)
        }
    }
    const [getgymdata, setgymdata] = useState({ name: "", city: "", address: "", url: "", information: "", workouts: "", facilities: "", images: [{}], reviews: [{ author: {} }], price: { fifdays: Number, month: Number, threemonth: Number, sixmonth: Number, oneyear: Number, fifdayst: Number, montht: Number, threemontht: Number, sixmontht: Number, oneyeart: Number }, timing: { start: "", end: "" }, sex: { male: Boolean, female: Boolean }, ac: Boolean, varified: Boolean, rating: Number })

    const navigate = useNavigate();

    const getdata = async (e) => {
        let res;
        try {
            res = await fetch(`https://gym-54v4.onrender.com/getsinglegym/${id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'

                }
            })

        }
        catch (err) {
            console.log(err)
        }
        const data = await res.json()
        if (data.status === 400 || !data) {
            console.log("data is not found")
        }
        else {
            setgymdata(data)
            if (data.price.fifdays || data.price.fifdayst) { setitem1(true) }
            if (data.price.month || data.price.montht) { setitem2(true) }
            if (data.price.threemonth || data.price.threemontht) { setitem3(true) }
            if (data.price.sixmonth || data.price.sixmontht) { setitem4(true) }
            if (data.price.oneyear || data.price.oneyeart) { setitem5(true) }
            setloading(false)
        }

    }
    const getuser = async (e) => {

        let res5;
        try {
            res5 = await fetch(`https://gym-54v4.onrender.com/user/islogin`, {
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
        if (data4.status === 400 || !data4) {
            console.log('user is not login')
        }
        if (res5.status === 200) {
            setisloginuserid(data4.message)
        }

    }

    const Deletecard = async (id) => {
        var answer = window.confirm("Are You Sure to delete this gym");
        if (!answer) {
            forceUpdate();
            return
        }


        let res2
        try {
            res2 = await fetch(`https://gym-54v4.onrender.com/deletecard/${id}`, {

                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
        } catch (e) {
            console.log(e)
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
        const deletedata = await res2.json();
        if (deletedata.status === 422 || deletedata.status === 401 || !deletedata) {
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
        if (deletedata.status === 201) {
            toast.success("Gym deleted", {
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
    }

    const payment = (id, days, price) => {

        navigate(`/details/${id}/payment`, { state: { days: days, address: getgymdata.address, name: getgymdata.name, price: price } })
    }


    const Editcard = async (id) => {
        const res3 = await fetch(`https://gym-54v4.onrender.com/iseditable/${id}`, {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res3.status === 200) {
            navigate(`/edit/${id}`)

        }
        else {
            window.location.reload();
        }
    }

    const [selectedimage, setselectedimages] = useState(0);
    const images = getgymdata.images.map(value =>
        value.url)


    const [rating, setrating] = useState(1);
    const [review, setreview] = useState('')
    const Postreview = async (e) => {
        e.preventDefault();
        if (review === "") {
            return (
                toast.info("Review box should not be empty", {
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
        const res3 = await fetch(`https://gym-54v4.onrender.com/detials/${getgymdata._id}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
            ,
            body: JSON.stringify({
                rating, review
            })
        });
        if (res3.status === 200) {
            toast.success("Review Created", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            setrating(1)
            setreview('')
            forceUpdate();


        }
        else if (res3.status === 401) {
            toast.error("You already Reviewed ", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            setrating(1)
            setreview('')
            forceUpdate();


        }
        else {
            toast.error("Review not created", {
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
    let item = false;
    for (let i = 0; i < getgymdata.reviews.length; i++) {
        if (isloginuserid === getgymdata.reviews[i].author._id)
            item = true
    }

    // delete review 

    const Deletereview = async (id, reviewId) => {
        let res3
        console.log(id, reviewId)
        try {
            res3 = await fetch(`https://gym-54v4.onrender.com/detials/${id}/reviews/${reviewId}`, {

                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
        } catch (e) {
            console.log(e)
        }
        if (res3.status === 200) {
            toast.success("Review Deleted", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            forceUpdate();
        }
        if (res3.status === 400) {
            toast.warning("You are not author of this review", {
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
        window.scrollTo(0, 0)
        setloading(true)
        getdata();
        getuser();

    }, [change])
    const colors = {
        orange: "#FFBA5A",
        grey: "#a9a9a9"

    };

    const [hoverValue, setHoverValue] = useState(undefined);
    const stars = Array(5).fill(0)

    const handleClick = value => {
        setrating(value)
    }

    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }

    const styles = {
        stars: {
            display: "flex",
            flexDirection: "row"
        }

    };
    const [pop, setpop] = useState(false)
    const [editreviewid, seteditreviewid] = useState("")
    const hidepop = (review_id) => {
        seteditreviewid(review_id)
        setpop(!pop)
    }
    let reversedArray = [...getgymdata.reviews].reverse();

    return (

        <>

            {pop ? <div className={`${Detailscss.popupwindow}`} >

                <div className={Detailscss.popupwindowinner}>
                    <div className={Detailscss.cross} onClick={hidepop} >< RxCross1 /></div>
                    <Editreview value={editreviewid}
                        onsubmit={reload}
                    />
                </div>
            </div> : <p></p>}

            <div>
                {
                    loading ?
                        <Fetchloader />
                        :


                        <div className={Detailscss.maincontainer}>
                            <ToastContainer
                                position="top-center" />
                            <div className={Detailscss.carouseldiv}>


                                <button className={Detailscss.prevbutton} onClick={() => {
                                    if (selectedimage === 0) setselectedimages(images.length - 1)
                                    else
                                        setselectedimages(selectedimage - 1)
                                }} ><BsArrowLeftCircleFill /></button>
                                <img alt='gym-img' src={images[`${selectedimage}`]} className={Detailscss.cardimages}></img>
                                <button className={Detailscss.nextbutton} onClick={() => {
                                    if (selectedimage === (images.length - 1)) setselectedimages(0)
                                    else
                                        setselectedimages(selectedimage + 1)
                                }} ><BsArrowRightCircleFill /></button>
                            </div>

                            <div className={Detailscss.nameadd}>
                                <p className={Detailscss.name}>{getgymdata.name}</p>
                                <p className={Detailscss.add}><GoLocation /> {getgymdata.city}</p>
                            </div>
                            <div className={Detailscss.fulladd}>
                                <div className={Detailscss.fulladdleft} >
                                    <div><b> Full address : </b> &nbsp; {getgymdata.address}</div>
                                    <div><b> Open at : </b> {getgymdata.timing.start}</div>                          <div><b> Close at : </b> {getgymdata.timing.end}</div>
                                </div>

                                <div className={Detailscss.fulladdright}>  <button className={Detailscss.directionbutton} ><a target="_blank" className={Detailscss.anchor} href={getgymdata.url}> <BsArrow90DegRight /> Get Direction </a></button></div>
                            </div>
                            <div className={Detailscss.booking} >
                                <div className={Detailscss.bookingleft}>
                                    <div className={Detailscss.bookingleft1} >
                                        <span><b> Information : </b></span>
                                        <div>
                                            {getgymdata.information}
                                        </div>
                                    </div>
                                    <div className={Detailscss.bookingleft1}>
                                        <span><b>  Workouts Avialable :</b></span>
                                        <div>
                                            {getgymdata.workouts}</div></div>
                                    <div className={Detailscss.bookingleft1}>
                                        <span><b>   Facilities Avialable : </b></span>
                                        <div>
                                            {getgymdata.facilities}</div></div>
                                </div>
                                <div className={Detailscss.bookingright}>
                                    {item1 &&
                                        <div className={Detailscss.bookingright1} >
                                            <p className={Detailscss.bookings1}>15 Days</p>
                                            {(getgymdata.price.fifdayst) &&
                                                <button className={Detailscss.trainerbotton} onClick={() => payment(getgymdata._id, '15 days with trainer', getgymdata.price.fifdayst)} >
                                                    <div> ₹ {getgymdata.price.fifdayst} </div>
                                                    <div >With Trainer </div>
                                                </button>}
                                            {(getgymdata.price.fifdays) &&
                                                <button className={Detailscss.trainerbotton} onClick={() => payment(getgymdata._id, '15 days without trainer', getgymdata.price.fifdays)} >
                                                    <div> ₹ {getgymdata.price.fifdays} </div>
                                                    <div >Without Trainer </div>
                                                </button>
                                            }
                                        </div>
                                    }
                                    {item2 &&
                                        <div className={Detailscss.bookingright1} >
                                            <p className={Detailscss.bookings1}>1 Month</p>
                                            {(getgymdata.price.montht) &&
                                                <button className={Detailscss.trainerbotton} onClick={() => payment(getgymdata._id, '1 month with trainer', getgymdata.price.montht)} >
                                                    <div> ₹ {getgymdata.price.montht} </div>
                                                    <div >With Trainer </div>
                                                </button>
                                            }
                                            {(getgymdata.price.month) &&
                                                <button className={Detailscss.trainerbotton} onClick={() => payment(getgymdata._id, '1 month without trainer', getgymdata.price.month)} >
                                                    <div> ₹ {getgymdata.price.month} </div>
                                                    <div >Without Trainer </div>
                                                </button>}

                                        </div>}
                                    {item3 &&
                                        <div className={Detailscss.bookingright1} >
                                            <p className={Detailscss.bookings1}>3 Months</p>
                                            {(getgymdata.price.threemontht) &&
                                                <button className={Detailscss.trainerbotton} onClick={() => payment(getgymdata._id, '3 month with trainer', getgymdata.price.threemontht)} >
                                                    <div> ₹ {getgymdata.price.threemontht} </div>
                                                    <div >With Trainer </div>
                                                </button>
                                            }  {(getgymdata.price.threemonth) &&
                                                <button className={Detailscss.trainerbotton} onClick={() => payment(getgymdata._id, '3 month without trainer', getgymdata.price.threemonth)} >
                                                    <div> ₹ {getgymdata.price.threemonth} </div>
                                                    <div >Without Trainer </div>
                                                </button>
                                            }
                                        </div>}
                                    {item4 &&
                                        <div className={Detailscss.bookingright1} >
                                            <p className={Detailscss.bookings1}>6 Months</p>
                                            {(getgymdata.price.sixmontht) &&
                                                <button className={Detailscss.trainerbotton} onClick={() => payment(getgymdata._id, '6 month with trainer', getgymdata.price.sixmontht)} >
                                                    <div> ₹ {getgymdata.price.sixmontht} </div>
                                                    <div >With Trainer </div>
                                                </button>
                                            }   {(getgymdata.price.sixmonth) &&
                                                <button className={Detailscss.trainerbotton} onClick={() => payment(getgymdata._id, '6 month without trainer', getgymdata.price.sixmonth)} >
                                                    <div> ₹ {getgymdata.price.sixmonth} </div>
                                                    <div >Without Trainer </div>
                                                </button>
                                            }
                                        </div>}
                                    {item5 &&
                                        <div className={Detailscss.bookingright1} >
                                            <p className={Detailscss.bookings1}>12 Months</p>
                                            {(getgymdata.price.oneyeart) &&
                                                <button className={Detailscss.trainerbotton} onClick={() => payment(getgymdata._id, '1 year with trainer', getgymdata.price.oneyeart)} >
                                                    <div> ₹ {getgymdata.price.oneyeart} </div>
                                                    <div >With Trainer </div>
                                                </button>} {(getgymdata.price.oneyear) &&
                                                    <button className={Detailscss.trainerbotton} onClick={() => payment(getgymdata._id, '1 year without trainer', getgymdata.price.oneyear)} >
                                                        <div> ₹ {getgymdata.price.oneyear} </div>
                                                        <div >Without Trainer </div>
                                                    </button>
                                            }
                                        </div>}

                                </div>
                            </div>
                            {localStorage.getItem('isadmin') && <div className={Detailscss.adminbutton} >
                                <button className={Detailscss.deletebutton} onClick={() => Deletecard(getgymdata._id)} >Delete</button>
                                <button className={Detailscss.deletebutton} onClick={() => Editcard(getgymdata._id)} >Edit</button>
                            </div>}
                            <div className={Detailscss.review}>

                                <hr></hr>
                                <div>
                                    {
                                        !item ?


                                            <div>
                                                {(document.cookie) &&
                                                    <div>
                                                        <p>Leave your review</p >
                                                        <form>
                                                            <div style={styles.stars} className={Detailscss.starsinput}>
                                                                {stars.map((_, index) => {
                                                                    return (
                                                                        <FaStar
                                                                            key={index}
                                                                            size={24}
                                                                            onClick={() => handleClick(index + 1)}
                                                                            onMouseOver={() => handleMouseOver(index + 1)}
                                                                            onMouseLeave={handleMouseLeave}
                                                                            color={(hoverValue || rating) > index ? colors.orange : colors.grey}
                                                                            style={{
                                                                                marginRight: 10,
                                                                                cursor: "pointer"
                                                                            }}
                                                                        />
                                                                    )
                                                                })}
                                                            </div>
                                                            <textarea className={Detailscss.commentbox} id='body' name='body'
                                                                onChange={(e) => setreview(e.target.value)} value={review} ></textarea>
                                                            <button className={Detailscss.reviewbutton} onClick={Postreview}>Submit</button>
                                                            <hr className={Detailscss.downhr}></hr>
                                                        </form>

                                                    </div>
                                                }
                                            </div>
                                            : <></>

                                    }
                                </div>

                            </div>
                            <div className={Detailscss.reviewshere}>
                                <p className={Detailscss.reviewheading}>Reviews for this Gym</p>
                                {
                                    reversedArray.map((value) =>
                                        <div className={Detailscss.singlereview}>


                                            {value.author && <div className={Detailscss.reviewername}>
                                                By : {value.author.name}
                                            </div>}
                                            <div className={Detailscss.reviewerstars}>
                                                <p className={`${Detailscss.starabilityresult} ${Detailscss.reviewerstars} `} data-rating={value.rating}>
                                                    Rated: {value.rating}
                                                </p>
                                            </div>
                                            <div>
                                                {value.review}
                                            </div>


                                            {


                                                < div >
                                                    {
                                                        ((value.author) && value.author._id === isloginuserid) ?
                                                            <div className={Detailscss.seereviewbutton}>
                                                                <button className={Detailscss.deletereviewbutton} onClick={() => Deletereview(getgymdata._id, value._id)} >Delete</button>
                                                                <button className={Detailscss.editreviewbutton} onClick={() => hidepop(value._id)} >Edit</button></div>
                                                            : <p></p>
                                                    }
                                                </div>


                                            }

                                        </div>
                                    )
                                }
                            </div>
                        </div>
                }
            </div >
        </>

    )
}

export default Details