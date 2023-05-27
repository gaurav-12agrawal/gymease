import React from 'react'
import BarLoader from "react-spinners/BarLoader";

const Fetchloader = () => {
    return (
        <div className='fetchingdiv'>
            <BarLoader


                color={"#36d7b7"}

            />
        </div>
    )
}

export default Fetchloader
