import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import citygymcss from './styles/Citygyms.module.css'
import Gymcard from './Gymcard';
import { FaInstagram } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import Reactplayer from 'react-player'
import { UserContext } from '../App'
import Fetchloader from './Fetchloader';
import Nodata from './Nodata';

const Allcitygyms = () => {
    const facebook = 'https://www.facebook.com/profile.php?id=100092718979254'
    const insta = 'https://www.facebook.com/profile.php?id=100092718979254'
    const twitter = 'https://twitter.com/GymEase'
    const linkedin = 'https://www.facebook.com/profile.php?id=100092718979254'
    const [loading, setloading] = useState(false)
    const { state } = useContext(UserContext)

    const { city } = useParams();
    const [getgymdata, setgymdata] = useState([])

    const getdata = async (e) => {
        let res;
        try {
            res = await fetch(`https://gym-54v4.onrender.com/getgym/${city}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'

                }
            })

        }
        catch (err) {
            console.log(err)
        }
        const data = await res.json()
        if (data.status === 400 || !data) {
            console.log("data is not found")
        }
        else {
            window.scrollTo(0, 0)
            setgymdata(data)
            setloading(false)

        }

    }

    useEffect(() => {
        setloading(true)
        getdata();
    }, [state])

    return (
        <>
            <div>

                {
                    loading ?
                        <Fetchloader /> :

                        <div className={citygymcss.maincontainer}>
                            <div className={citygymcss.leftcontainer} >
                                <div className={citygymcss.leftcontainerblocks5}>
                                    <Reactplayer url="https://res.cloudinary.com/dgfn40mfc/video/upload/v1685127888/Important%20image/finalvideo_qjgalg.mp4" controls loop

                                        width='100%'
                                        height='80%'
                                        config={{
                                            file: {
                                                attributes: {
                                                    autoPlay: true,
                                                    muted: true
                                                }
                                            }
                                        }}

                                    />
                                </div>
                                <div className={`${citygymcss.leftcontainerblocks} ${citygymcss.leftcontainerblocks1}`}></div>
                                <div className={`${citygymcss.leftcontainerblocks} ${citygymcss.leftcontainerblocks2}`}>
                                </div>
                                <div className={`${citygymcss.leftcontainerblocks} ${citygymcss.leftcontainerblocks3}`}> </div>

                                <div className={`${citygymcss.leftcontainerblocks} ${citygymcss.leftcontainerblocks4}`}>
                                    <p>Follow Us On</p>
                                    <div className={citygymcss.icondiv}>
                                        <a className={citygymcss.iconlinks} target="_blank" href={insta}> <FaInstagram /></a>
                                        <a className={citygymcss.iconlinks} target="_blank" href={linkedin}><FaLinkedin /></a>
                                        <a className={citygymcss.iconlinks} target="_blank" href={twitter}><FaTwitter /></a>
                                        <a className={citygymcss.iconlinks} target="_blank" href={linkedin}><FaFacebook /></a>
                                    </div>
                                </div>

                            </div>
                            <div className={citygymcss.rightcontainer}>

                                <div className={citygymcss.rightcontainerup} >
                                    <div className={citygymcss.rightcontainerup1} >
                                        &nbsp; Finding Gyms in {city}...
                                    </div>
                                    <div className={citygymcss.rightcontainerup2}>
                                        Introducing Gym Booking
                                    </div>
                                </div>
                                {
                                    getgymdata.length ?
                                        <div className={citygymcss.rightcontainerlow} >

                                            {
                                                (
                                                    getgymdata.map((value, id) => {

                                                        return (
                                                            <>
                                                                <div key={id + 1}>
                                                                    <Gymcard details={value} />
                                                                </div>
                                                            </>
                                                        )
                                                    }))

                                            }

                                        </div>
                                        :
                                        <Nodata value={city} />
                                }



                            </div>
                        </div>

                }

            </div>
        </>
    )
}

export default Allcitygyms