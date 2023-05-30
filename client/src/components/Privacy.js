import React from "react";
import Pcss from '../components/styles/Privacy.module.css'
import { Link } from "react-router-dom";
function Privacy() {
    const image = 'https://res.cloudinary.com/dgfn40mfc/image/upload/v1685167581/Important%20image/photo_6309551419228796008_y-removebg-preview_qmpbgs.png';
    return (
        <>
            <div className={Pcss.container}>
                <img className={Pcss.div1} src={image}></img>
                <h1 className={Pcss.div2}>Gymozy's privacy policy</h1>
                <div className={Pcss.div3}>
                    <p><b>Privacy Policy</b>
                    </p>
                    <p><b>Effective Date: July 10,2023</b>

                    </p>
                    <p>
                        Thank you for using Gymozy, the online gym booking platform ("Website"). At Gymozy, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard the information you provide when using our Website. By accessing or using our Website, you agree to the terms of this Privacy Policy.
                    </p>
                </div>
                <div className={Pcss.div4}>
                    <p className={Pcss.question}><b>Information We Collect:</b>
                    </p>
                    <p className={Pcss.answer}>Booking Information: <br></br> To facilitate gym bookings, we collect information about your preferred gym location, date, and time of booking.

                    </p>
                    <br></br>
                    <p className={Pcss.answer}>Personal Information:<br></br> When you sign up for a Gymozy account, we collect certain personal information such as your name, email address, phone number, and billing details.
                    </p>
                    <br></br>
                    <p className={Pcss.answer}>Usage Information:<br></br>We may collect information about how you interact with our Website, including your browsing activities and IP address.

                    </p>
                    <br></br>
                    <br></br>
                    <p><b>How We Use Your Information:</b>
                    </p>
                    <p className={Pcss.answer}> Provide Services: <br></br>We use your personal information to process your gym bookings, communicate with you regarding your bookings, and provide customer support.

                    </p>
                    <br></br>
                    <p className={Pcss.answer}>Improve User Experience: <br></br>We may analyze usage patterns and behavior to enhance our Website, tailor our services, and improve user experience.

                    </p>
                    <br></br>
                    <p className={Pcss.answer}>Marketing and Promotions: <br></br>With your consent, we may send you promotional emails or newsletters to inform you about new gym offerings, discounts, or special events.


                    </p>
                    <br></br>
                    <br></br>
                    <p><b>Information Sharing:
                    </b>
                    </p>
                    <p className={Pcss.answer}>Service Providers:<br></br> We may engage third-party service providers to assist us in delivering our services. These providers have access to personal information only to perform specific tasks on our behalf and are obligated to keep the information confidential.


                    </p>
                    <br></br>
                    <p className={Pcss.answer}>Legal Requirements: <br></br> We may disclose your information if required by law, court order, or government regulations.
                    </p>
                    <br></br>
                    <br></br>
                    <p><b>Data Security:
                    </b>
                    </p>
                    <p className={Pcss.answer}>We employ industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.
                        Despite our best efforts, no data transmission over the internet or storage system can be guaranteed to be 100% secure. Therefore, we cannot warrant the absolute security of your information.


                    </p>
                    <br></br>
                    <br></br>
                    <p><b>Your Choices and Rights:
                    </b>
                    </p>
                    <p className={Pcss.answer}>

                        You have the right to access, update, or delete your personal information. You can manage your account settings or contact our support team for assistance.
                        You may choose to opt-out of receiving promotional emails by following the instructions provided in the emails.



                    </p>
                    <br></br>
                    <br></br>
                    <p><b>  Third-Party Links:
                    </b>
                    </p>
                    <p className={Pcss.answer}>
                        Our Website may contain links to third-party websites. We are not responsible for the privacy practices or content of those websites. We encourage you to review the privacy policies of any third-party websites you visit.
                    </p>
                    <br></br>
                    <h4>We reserve the right to update or modify this Privacy Policy at any time. The updated version will be posted on our Website with the revised effective date.
                        If you have any questions or concerns regarding this Privacy Policy or the handling of your information, please contact us at <Link to="/contact" className={Pcss.contact} >Contact Us</Link>.
                    </h4>
                    <br></br>
                    <p>
                        By using <b>Gymozy</b>, you acknowledge that you have read, understood, and agree to the terms of this <b>Privacy Policy</b>.
                    </p>
                </div>
            </div>
        </>
    );
}

export default Privacy;