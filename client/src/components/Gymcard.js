import React, { useState } from 'react'
import Gymcardcss from './styles/Gymcards.module.css'
import { GoLocation } from "@react-icons/all-files/go/GoLocation";
import { FcCheckmark } from "@react-icons/all-files/fc/FcCheckmark";
import { useNavigate } from 'react-router-dom';
import { AiFillCheckCircle } from "react-icons/ai";
import { GiCheckMark } from "react-icons/gi";

import Ratingcitygymcard from './Ratingcitygymcard';
const Gymcard = (props) => {


    const result = props.details.reviews.reduce((total, currentValue) => total = total + currentValue.rating, 0);
    let totalrating = result / (props.details.reviews.length)
    totalrating = Math.round(totalrating * 10) / 10

    const navigate = useNavigate();
    const handleClick = async (e) => {

        const id = props.details._id
        navigate(`/details/${id}`)
    }

    return (
        <>
            <div className={Gymcardcss.maincontainer} onClick={handleClick}  >
                <div className={Gymcardcss.left} >
                    <div className={Gymcardcss.upperleft}>
                        {props.details.images.length && < img src={props.details.images[0].url} className={Gymcardcss.upperleftimage}></img >
                        }</div>
                    <div className={Gymcardcss.lowerleft}>
                        {props.details.images.length &&
                            props.details.images.filter((item, index) => index > 0 && index < 4).map(value =>
                                <div className={Gymcardcss.lowerleft1}>
                                    < img src={value.url} className={Gymcardcss.imagesdiv} ></img ></div>
                            )
                        }
                    </div>

                </div>
                <div className={Gymcardcss.right} >
                    <Ratingcitygymcard
                        size={props.details.reviews.length}
                        total={totalrating}
                    />
                    <div className={Gymcardcss.rightratingtick}>
                        <p className={Gymcardcss.rightname} >{props.details.name}</p>
                        <div className={Gymcardcss.forflex}>
                            {(props.details.varified) && (<img className={Gymcardcss.iconimage} src="https://res.cloudinary.com/dgfn40mfc/image/upload/v1685130143/Important%20image/verified_bak4pj.png"></img>)}
                            {(props.details.varified) && (<span > verified by GymEase</span>)}
                        </div>
                    </div>

                    <p className={Gymcardcss.rightloc}  > <a target="_blank" href={props.details.url} > <span><GoLocation /></span> </a>{props.details.city}</p>
                    <p>
                        {(props.details.sex.male) && <span> <span><GiCheckMark /></span> male</span>}
                        {(props.details.sex.female) && <span> <span><GiCheckMark /></span> female</span>}
                    </p>

                    <p>

                        {(props.details.ac) && (<span> <span><GiCheckMark /></span> Ac</span>)}
                        {!(props.details.ac) && <span><span><GiCheckMark /></span> Non-Ac</span>}
                    </p>
                    <div className={Gymcardcss.rightpricebutton}>

                        {(props.details.price.fifdays) && <button className={Gymcardcss.rightbuttons}>
                            <div> ₹ {props.details.price.fifdays} </div>
                            <div className={Gymcardcss.rightbuttonstext}>15 days </div>
                        </button>}

                        {(props.details.price.month) && <button className={Gymcardcss.rightbuttons}>
                            <div>₹ {props.details.price.month}</div>
                            <div className={Gymcardcss.rightbuttonstext}>30 days </div>

                        </button>}
                        {(props.details.price.threemonth) && <button className={Gymcardcss.rightbuttons}>
                            <div> ₹ {props.details.price.threemonth}</div>
                            <div className={Gymcardcss.rightbuttonstext}>3 months </div>

                        </button>}
                        {(props.details.price.sixmonth) && <button className={Gymcardcss.rightbuttons}>
                            <div> ₹ {props.details.price.sixmonth} </div>
                            <div className={Gymcardcss.rightbuttonstext}>6 month </div>

                        </button>}
                        {(props.details.price.oneyear) && <button className={Gymcardcss.rightbuttons}>
                            <div> ₹ {props.details.price.oneyear} </div>
                            <div className={Gymcardcss.rightbuttonstext}>1 year </div>

                        </button>}
                    </div>
                    <div>
                        <button onClick={handleClick} className={Gymcardcss.detailsbutton}>Explore More</button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Gymcard
