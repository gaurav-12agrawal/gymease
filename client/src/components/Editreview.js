import React, { useState } from 'react'
import Detailscss from '../components/styles/Detailspage.module.css'
import { FaStar } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Editreview = (props) => {
    const stars = Array(5).fill(0)
    const [hoverValue, setHoverValue] = useState(undefined);
    const handleClick = value => {
        setrating(value)
    }
    const [rating, setrating] = useState(1);
    const [review, setreview] = useState('')
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
    const colors = {
        orange: "#FFBA5A",
        grey: "#a9a9a9"

    };


    const PostData = async (e) => {
        e.preventDefault();

        let res;
        if (!rating || !review) {
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

        try {
            res = await fetch(`/edit/review/${props.value}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    review, rating
                })
            })

        }
        catch (e) {
            toast.error("There is some Error on server side try after some time", {
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

        if (res.status === 200) {
            props.onsubmit(true)
            toast.success("Review Updated", {
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
        if (res.status === 400) {
            toast.error("Opps, try after sometime", {
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



    return (
        <div>
            <ToastContainer
                position="top-center" />
            <div className={Detailscss.editratingdiv}>
                <p>Edit your review</p >
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
                    <textarea className={Detailscss.editcommentbox} id='body' name='body'
                        onChange={(e) => setreview(e.target.value)} value={review} ></textarea>
                    <button className={Detailscss.editpopreviewbutton} onClick={PostData} >Edit</button>
                </form>

            </div>
        </div>
    )
}

export default Editreview
