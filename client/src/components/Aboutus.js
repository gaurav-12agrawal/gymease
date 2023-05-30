import React from 'react'
import Contactcss from '../components/styles/Contact.module.css'
import { FaInstagram } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
const Aboutus = () => {
    const rineshinsta = 'https://instagram.com/rinesh_garg?igshid=OGQ5ZDc2ODk2ZA=='
    const rineshfacebook = 'https://m.facebook.com/rinesh.garg'
    const rineshtwitter = 'https://twitter.com/rineshgarg2405'
    const rineshlinekedin = 'https://www.linkedin.com/in/rinesh-garg-300798218'
    const maheshinsta = 'https://instagram.com/mahesh_mangal?igshid=ZDc4ODBmNjlmNQ=='
    const maheshfacebook = 'https://www.facebook.com/mahesh.mangal.378'
    const maheshtwitter = 'https://twitter.com/MaheshMangal13?s=09'
    const maheshlinekedin = 'https://www.linkedin.com/in/mahesh-gupta-60144622a'
    const rinesh = 'https://res.cloudinary.com/dgfn40mfc/image/upload/v1685046275/Important%20image/fotor_2023-5-26_1_54_0_fwzql4.png'
    const mangal = 'https://res.cloudinary.com/dgfn40mfc/image/upload/v1685043954/Important%20image/fotor_2023-5-26_1_14_40_wsf8bq.png'
    return (
        <>
            <div className={Contactcss.about}>
                <p className={Contactcss.about1} >Meet to our team</p>
                <div className={Contactcss.about2}>
                    <div className={Contactcss.aboutcard} >
                        <img className={Contactcss.cofounderimage} src={rinesh} ></img>
                        <div className={Contactcss.aboutcarddata}>
                            <p className={Contactcss.aboutcarddata2}>Founder & CEO</p>
                            <p className={Contactcss.aboutcarddata1}>Rinesh Garg</p>
                            <p className={Contactcss.aboutcarddata3}>Always ready to learn and crete new things especially for betterment of life, on a mission to create strategies and solution for building a happire and productive workplace</p></div>
                        <div className={Contactcss.aboutleft3}>

                            <a className={Contactcss.iconlinks} target="_blank" href={rineshinsta}> <FaInstagram /></a>
                            <a className={Contactcss.iconlinks} target="_blank" href={rineshlinekedin}><FaLinkedin /></a>
                            <a className={Contactcss.iconlinks} target="_blank" href={rineshtwitter}><FaTwitter /></a>
                            <a className={Contactcss.iconlinks} target="_blank" href={rineshfacebook}><FaFacebook /></a>
                        </div>
                    </div>
                    <div className={Contactcss.aboutcard} >
                        <img className={Contactcss.cofounderimage} src={mangal} ></img>
                        <div className={Contactcss.aboutcarddata}>
                            <p className={Contactcss.aboutcarddata2}>Co-Founder & CFO</p>
                            <p className={Contactcss.aboutcarddata1}> Mahesh Mangal</p>
                            <p className={Contactcss.aboutcarddata3}>MBA ,experience in managing front desk operations and providing administrative support. Accept changes with positivity and diversificatoin . Adaptive nature and motivated to learn ,growand excelin my professional carrer</p></div>
                        <div className={Contactcss.aboutleft3}>
                            <a className={Contactcss.iconlinks} target="_blank" href={maheshinsta}> <FaInstagram /></a>
                            <a className={Contactcss.iconlinks} target="_blank" href={maheshlinekedin}><FaLinkedin /></a>
                            <a className={Contactcss.iconlinks} target="_blank" href={maheshtwitter}><FaTwitter /></a>
                            <a className={Contactcss.iconlinks} target="_blank" href={maheshfacebook}><FaFacebook /></a>
                        </div>
                    </div>

                </div>
            </div>
            <div className={Contactcss.about3}>
                <div className={Contactcss.content}>
                    <p className={Contactcss.content1}>
                        Founded in 2023 in india. gymozy.com has grown in from of a small indian startup to become one of the world’s leading  online gym booking companies. Part of GARANGAL MAGNATE gymozy.com’s mission is to make it easier for everyone to experience the world of gymnasium.

                        By investing in the technology that helps take the friction out of workout, gymozy.com seamlessly connects millions of gym trainers with memorable experiences, a range of workout options and incredible places to gym. As one of the world’s first marketplaces for both established brands and entrepreneurs of all sizes, gymozy.com enables properties all over the world to reach a global audience and grow their businesses.

                        gymozy.com offers many listings alone of gyms, yoga centres and other health and wellness places.No matter where you want to go or what you want to do, gymozy.com makes it easy and backs it all up with 24/7 customer support.</p>
                    <br></br>
                    <p>gymozy.com is a next generation ecommerce platform for Gym options. We provide the best experience for gym members by offering a wide assortment of certified gyms that are nearest to your location in a click of a button at the best price </p>
                    <br></br>
                    <br></br>
                    <h3>The first-class destination for first-class Gym!</h3>
                    <p>gymozy.com is your single stop for booking Gym, all over India. We've brought together cutting-edge technology with country-wide partners and more importantly, deep understanding of what trainee and trainers need. We solve all pain points associated with exercise and health care you get a quick, easy, fair, transparent, hassle (and haggle) free process.</p>
                    <br></br>
                    <br></br>
                    <h3>- Want to know about Gym with us ? -</h3>
                    <p>A gymnasium, also known as a gym, is an indoor location for athletics. The word is derived from the ancient Greek term "gymnasium". They are commonly found in athletic and fitness centers, and as activity and learning spaces in educational institutions. A gym session or brisk walk can help. Physical activity stimulates various brain chemicals that may leave you feeling happier, more relaxed and less anxious. Exercise delivers oxygen and nutrients to your tissues and helps your cardiovascular system work more efficiently.</p>
                    <br></br>
                    <br></br>
                    <h3>More interested in registering your property with us?</h3>
                    <br></br>
                    <h3>1.  Facility Maintenance</h3>
                    <p>Opening a gym can be costly in the beginning. In fact, depending on the type of gym you plan to open, the average cost is approximately $50,000 to over a million. However, if you manage your finances correctly you’ll see a revenue stream after you get your feet off the ground. Depending on what type of facility you open can determine how much you’ll spend up front. Not only will it be costly when you open a gym, but you have to maintain it as well. If you have a pool at your facility it takes some work and plenty of cleaning supplies to maintain. From chemical cleaners to vacuuming to testing the waters pH levels, it’s all part of maintaining a nice, clean pool for your members. Other typical costs you can expect when owning a gym include equipment and cleaning supplies such as towels, equipment cleaner, paper towels, toilet paper and much more. A few other operating costs to consider include rent, permits, and licenses.</p>
                    <br>
                    </br>
                    <h4>How to solve this challenge ?</h4>
                    <p>Be aware of the challenges and costs before they happen. Simply knowing about the challenges of owning and gym and understanding what it costs to open and maintain a facility will give you ample opportunity to prepare before it becomes a problem. Start with building a business plan, setting financial goals, creating a budget sheet and implementing the right technology to stay focused and prevent financial hardships from rising. Feedback from your members is another great way to solve maintenance challenges. Keep an open line of communication with your members and employees by providing comment boxes and encourage members to voice their opinions and requests.</p>
                    <br></br>
                    <h3>2. Member Satisfaction/Retention</h3>
                    <p>Keeping all members happy all the time is a difficult part of owning a gym. As a gym owner, you genuinely want to offer the best experience for each and every member, but as each one’s needs are different it can be very challenging. Consistently unhappy members can be a challenge to retain. It’s important for gym owners to understand and reward members, as higher member satisfaction leads to higher member retention. The only way to understand your members’ challenges and needs is to ask.</p>
                    <br>
                    </br>
                    <h4>How to solve this challenge ?</h4>
                    <p>Survey your members monthly. This will give your members the opportunity to voice their opinions and challenges. Ask members if they have any special requests or needs, such a different piece of gym equipment they would like to see, different flavors of sports drinks for purchasing, or new group classes they would be interested in. Receiving this type of feedback from your members is imperative to keep them engaged and satisfied. Other easy ways to communicate with your members is through email and a mobile app. Send a monthly newsletter to keep your members informed of what’s going on at your gym. If your gym takes advantage of a mobile app, you can provide your members the ability set their fitness goals and track their progress along the way. Other ways to keep members engaged through a mobile app is to send push notifications with information and reminders. This could include information such as a change in gym hours, reminders for schedule personal training sessions, upcoming payments, discounts on snacks and gym wide challenges.</p>
                    <br></br>
                    <p><b>Are you ready to overcome some of these gym ownership challenges?</b></p>
                    <br></br>
                    <h3>3. Employee Management</h3>
                    <p>Each employee is diverse and has different goals and ways of doing things, which can make it challenging for gym owners to manage different types of employees. Some employees may be passionate about their job while some are only there for a paycheck and may not care as much about the member experience as they should. Creating a work schedule that pleases everyone isn’t easy and scheduling conflicts can leave employees disgruntled. It’s crucial for gym owners to understand each employee and how to manage them differently. Happy employees lead to happy members.</p>
                    <br>
                    </br>
                    <h4>How to solve this challenge ?</h4>
                    <p>Strategically place employees that are passionate about their job in member-facing roles within your gym. If members see that employees are happy and enjoying engaging with them, this will likely produce higher member satisfaction and retention. Organize weekly in-person meetings with employees to discuss questions or concerns. To avoid scheduling conflicts, make sure that you’re using a gym management software that provides easy access to employee availability, timesheets, and scheduling. Non-digital timesheets and schedules only leave room for mistakes, so make certain your gym management software provides easy-to-use scheduling and availability tool to manage your employees.</p>
                    <br></br>
                    <h3>4. Consistent Revenue</h3>
                    <p>Revenue is the main concern for gym owners. After all, it is what keeps your business running. Revenue pays your employees, the light bill, heat & air, new equipment, and just about anything you can think of that is important to maintain your gym. It can be difficult owning a gym when members cancel their memberships or choose not to renew. Acquiring members has its highs and lows depending on the time of the year as well, which can be stressful when new memberships are lacking.</p>
                    <br>
                    </br>
                    <h4>How to solve this challenge ?</h4>
                    <p>It’s a simple as having a grasp on your finances. Understanding how to pull important financial reports frequently is key to staying on top of your finances. Don’t rely on unorganized spreadsheets. Invest in a complete gym management software that provides financial reporting at the click of a button. Analyzing financial reports on monthly costs and profits can lead gym owners to be able to predict revenue months out. The majority of fitness clubs have a churn rate of 30-50%. You can be the minority of clubs by understanding financial reports and staying on budget.</p>
                    <br></br>
                    <h3>5. Owner Sanity</h3>
                    <p>All the challenges mentioned above can only lead to one thing if they’re not resolved, the loss of your sanity as a gym owner. Of course, no one wants that! You’ll notice that each of these challenges relate to one another when you realize you haven’t prepared yourself for owning a gym. If you aren’t analyzing financial reports to know what your profits and losses are, chances are you won’t have the consistent revenue needed to run and maintain your gym.</p>
                    <br>
                    </br>
                    <h4>How to solve this challenge ?</h4>
                    <p>Invest in gymozy.com that reduces the manual labor and provides an easier way to track your finances and manage your members and employees. Gym management software provides member and employee management, automated reporting, inventory management, online account access for current members and online gym sign up for prospects. Through these software features your staff will have more free time to engage with members to provide a better member experience.</p>
                    <br></br>
                    <h3>Interested in learning more about gym management software? gymozy.com is the nation’s leading software website processing provider for the health and fitness industry.</h3>
                </div>
            </div>
        </>
    )
}

export default Aboutus
