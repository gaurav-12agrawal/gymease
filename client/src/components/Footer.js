import React from "react";
import '../App.css'
import { FaInstagram } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
function Footer() {
    const facebook = 'https://www.facebook.com/profile.php?id=100092718979254'
    const insta = 'https://www.facebook.com/profile.php?id=100092718979254'
    const twitter = 'https://twitter.com/GymEase'
    const linkedin = 'https://www.facebook.com/profile.php?id=100092718979254'
    return (
        <>
            <div className="Footer_container">
                <div className="footername">Gymozy</div>
                <div className="footercopy">© Gymozy, All rights reserved.
                </div>
                <div>
                    <div className='aboutleft3'>
                        <a className='conlinks' target="_blank" href={insta}> <FaInstagram /></a>
                        <a className='conlinks' target="_blank" href={linkedin}><FaLinkedin /></a>
                        <a className='conlinks' target="_blank" href={twitter}><FaTwitter /></a>
                        <a className='conlinks' target="_blank" href={linkedin}><FaFacebook /></a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;