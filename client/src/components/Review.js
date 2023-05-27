import React from 'react'

const Review = () => {
    return (
        <>
            <div>
                <p>Leave your review</p >
                <input type='range' min={1} max={5}></input>
                <input type='text'></input>
            </div>
        </>
    )
}

export default Review
