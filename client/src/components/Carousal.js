import React from 'react'
import { Carousel } from 'react-bootstrap'
import Detailscss from '../components/styles/Detailspage.module.css'

const Carousal = () => {
    return (
        <div className={Detailscss.Carousalcont}> <Carousel className={Detailscss.Carousal} >
            <Carousel.Item className={Detailscss.Carousalitem} >
                <img
                    className={Detailscss.cimg}
                    src="/images/gym1.jpeg"
                    alt="First slide"

                />

            </Carousel.Item>
            <Carousel.Item className={Detailscss.Carousalitem}>
                <img
                    className={Detailscss.cimg}
                    src="/images/gym4.jpeg"
                    alt="Second slide"

                />
            </Carousel.Item>
            <Carousel.Item className={Detailscss.Carousalitem}>
                <img
                    className={Detailscss.cimg}
                    src="/images/gym3.jpeg"
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel></div>
    )
}

export default Carousal