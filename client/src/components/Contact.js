import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Contactcss from '../components/styles/Contact.module.css'
import { FaInstagram } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Contact() {
    const form = useRef();
    const navigate = useNavigate();
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_tgnjtos', 'template_4f14fwu', form.current, '7o-uzARVuOxDRB-6n')
            .then((result) => {
                toast.success("Your query has been recorded", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })

            }, (error) => {
                toast.error("Some error occur, please try after some time", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
            });
        e.target.reset();
    };
    const handle = () => {
        navigate('/aboutus')
    }
    const facebook = 'https://www.facebook.com/profile.php?id=100092718979254'
    const insta = 'https://www.facebook.com/profile.php?id=100092718979254'
    const twitter = 'https://twitter.com/GymEase'
    const linkedin = 'https://www.facebook.com/profile.php?id=100092718979254'
    return (
        <>
            <div className={Contactcss.main}>
                <ToastContainer
                    position="top-center" />
                <div className={Contactcss.contact}>
                    <div className={Contactcss.contactleft}>
                        <div className={Contactcss.contactleft1}>Contact Us</div>
                        <div className={Contactcss.contactleft2}>Need to get in touch with us ? Either fill out the form with your inquery or contact us through below social links</div>
                        <div className={Contactcss.contactleft3}>
                            <a className={Contactcss.iconlinks} target="_blank" href={insta}> <FaInstagram /></a>
                            <a className={Contactcss.iconlinks} target="_blank" href={linkedin}><FaLinkedin /></a>
                            <a className={Contactcss.iconlinks} target="_blank" href={twitter}><FaTwitter /></a>
                            <a className={Contactcss.iconlinks} target="_blank" href={linkedin}><FaFacebook /></a>
                        </div>
                        <div className={Contactcss.contactleft4}>
                            <p> To Know more go to About us</p>
                            <button className={Contactcss.aboutbutton} onClick={handle}>About us</button>

                        </div>
                    </div>
                    <div className={Contactcss.contactright}>
                        <div className={Contactcss.contactrightsmall}>

                            <form className={Contactcss.contactrightsmallform} ref={form} onSubmit={sendEmail} >
                                <div className={Contactcss.name}>
                                    <div className={Contactcss.firstname}>    <label htmlFor="firstname" >First Name <span className={Contactcss.star}>*</span></label>
                                        <input className={Contactcss.contactinput} required type="text" name='user_name'></input>
                                    </div>
                                    <div className={Contactcss.lastname}>  <label htmlFor="lastname">Last Name</label>
                                        <input type="text" className={Contactcss.contactinput} name='user_lname'></input></div>


                                </div>
                                <div className={Contactcss.email} >
                                    <label htmlFor="email">Email <span className={Contactcss.star}>*</span></label>
                                    <input type="email" name='user_email' required className={Contactcss.contactinput}></input></div>
                                <div className={Contactcss.email}>   <label htmlFor="phone">Phone no <span className={Contactcss.star}>*</span></label>
                                    <input name='phone' required type="number" className={Contactcss.contactinput}></input></div>
                                <div className={Contactcss.email}>  <label htmlFor="query">Write your query here <span className={Contactcss.star}>*</span></label>
                                    <textarea required type="text" name='message' className={Contactcss.contactinput}></textarea></div>
                                <p className={Contactcss.note}><span className={Contactcss.star}>*</span>Make sure You filled data should be genuine.<br></br> so that we can resolve your query as soon as possible.</p>
                                <button type='submit' className={Contactcss.bookbutton}>Submit</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </>
    );
}

export default Contact;