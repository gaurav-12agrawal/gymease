import React, { useState } from 'react'
import Fcss from '../components/styles/Faq.module.css'
import { MdOutlineExpandMore } from "react-icons/md";
const Faqcard = (props) => {
    const [line, setline] = useState(true)
    const [rotation, setRotation] = useState(180);

    const handleRotateClick = () => {
        if (rotation === 180)
            setRotation(rotation + 180);
        else setRotation(rotation - 180)
    };
    const toggle = () => {
        setline(!line)
        handleRotateClick();
    }
    const divStyle = {
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 1s ease'
    };
    return (
        <div className={Fcss.lastdiv}>
            <div className={Fcss.cardcontainer}>
                <div className={Fcss.cardup}>
                    <h1 className={Fcss.questionmain} > Q{props.details.id} . {props.details.Question}</h1>
                </div>
                <div className={line ? Fcss.carddown : Fcss.carddown1}>
                    <h4 className={Fcss.cardanswer}><b>Ans.</b> {props.details.Answer}</h4>
                </div>
            </div>
            <p className={Fcss.dropdown} style={divStyle} onClick={toggle}><MdOutlineExpandMore /></p>
        </div>

    )
}

export default Faqcard
