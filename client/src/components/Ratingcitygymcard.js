import React from 'react'
import Gymcardcss from './styles/Gymcards.module.css'

const Ratingcitygymcard = (props) => {

    if (props.size) {

        return (
            <div>
                <p className={Gymcardcss.rightrating} >{props.total} ⭐ <span className={Gymcardcss.rightratingcount}> ({props.size} reviews)</span></p>
            </div>
        )
    }
    else {
        return (<>
            <div></div>
        </>)
    }
}

export default Ratingcitygymcard
