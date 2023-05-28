import React, { useEffect, useState } from "react";
import '../App.css'
import Citycards from "./Citycards";
import Citydata from "./Citydata";
import { useNavigate } from "react-router-dom";
import Reactplayer from 'react-player'
import { RxCross1 } from "react-icons/rx";
import Detailscss from '../components/styles/Detailspage.module.css'
function Home() {
    const [pop, setpop] = useState(false)
    const hidepop = () => {
        setpop(!pop)
    }
    const scrolldown = () => {
        window.scrollBy(0, 1000)
    }
    const handleClick = async (e) => {

        const city = e.target.innerText
        navigate(`https://gym-54v4.onrender.com/allcitygyms/${city}`)
    }

    const navigate = useNavigate();
    useEffect(() => {

        setTimeout(() => {
            setpop(!pop)
        }, 5000);
    }, [])

    return (

        <>
            <div>
                {pop ? <div className={`${Detailscss.popupwindow}`} >

                    <div className={Detailscss.popupwindowinner}>
                        <div className={Detailscss.cross} onClick={hidepop} >< RxCross1 /></div>
                        <img className={Detailscss.crossimage} src='https://res.cloudinary.com/dgfn40mfc/image/upload/v1685130280/Important%20image/gym1_yshefw.jpg' ></img>
                    </div>
                </div> : <p></p>}
            </div>
            <div className="home_main">
                <div className="home_maincontainer">
                    <div className="home_left">

                    </div>
                    <div className="home_right">
                        <p className="cont_1">Welcome To Our Fitness Support !</p>
                        <p className="cont_2">Enrich yourself in the world of <br></br>
                            <span className="big_name_home">G</span>ym<span className="big_name_home">E</span>ase</p>
                        <p className="cont_3">Offering Gym solution since 2023</p>
                        <div className="explore_button_div">
                            <button className="Explore_button" onClick={scrolldown}>Explore Now</button>
                        </div>
                    </div>
                </div>
                <div className="videocontainer">
                    <div className="video1" >
                        <Reactplayer url="https://res.cloudinary.com/dgfn40mfc/video/upload/v1685128012/Important%20image/pexels-taryn-elliott-3327959-1920x1080-24fps_w1w0li.mp4" controls loop
                            width='100%'
                            height='100%'
                            config={{
                                file: {
                                    attributes: {
                                        autoPlay: true,
                                        muted: true
                                    }
                                }
                            }}

                        /></div>
                    <div className="hidevideo video1"

                    >
                        <Reactplayer url="https://res.cloudinary.com/dgfn40mfc/video/upload/v1685128002/Important%20image/pexels-gustavo-fring-4110445-3840x2160-30fps_mdanpe.mp4" controls loop
                            width='100%'

                            height='100%'
                            config={{
                                file: {
                                    attributes: {
                                        autoPlay: true,
                                        muted: true

                                    }
                                }
                            }}
                        /></div>


                </div>
                <div className="home_notice_cards" >
                    Find Your City
                </div>

                <div className="home_city_cards">

                    {
                        Citydata.map((value) => (
                            <div key={value.id} className="home_grid_card" onClick={handleClick}>
                                <Citycards details={value} />
                            </div>
                        )
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default Home;