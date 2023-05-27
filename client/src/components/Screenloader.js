import React from 'react'
import HashLoader from "react-spinners/HashLoader";

const Screenloader = () => {
    return (
        <div className='loadingdiv'>
            <HashLoader
                color={"#36d7b7"}

            />
        </div>
    )
}

export default Screenloader
