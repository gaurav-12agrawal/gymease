import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
const Screenloader = () => {
    useEffect(() => {
        AOS.init({ duration: 1200 })
    }, [])
    return (
        <div className='loadingdiv' data-aos="zoom-in">
            <img src='https://res.cloudinary.com/dgfn40mfc/image/upload/v1690913288/Important%20image/GYMOZY_LOGO_llplc3.png' alt="logo" className='loading-div-image' />
        </div>
    )
}

export default Screenloader
