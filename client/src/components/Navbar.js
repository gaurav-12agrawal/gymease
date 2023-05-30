import { FaQuestionCircle } from 'react-icons/fa';
import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../App'
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { HiOutlineBars3 } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";
import '../App.css'



function Navbar() {
    const { state, dispatch } = useContext(UserContext)
    const [hide, sethide] = useState(true)
    const inputElement = useRef();
    const [city, setcity] = useState('');
    const navigate = useNavigate();

    const handleChange = event => {
        setcity(event.target.value);
    };

    const handleClick = async (e) => {
        if (inputElement.current.value !== '') {
            navigate(`/allcitygyms/${city}`)
            inputElement.current.value = ''
            dispatch({ type: 'USER', payload: state + 1 });
        }
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && inputElement.current.value !== '') {
            navigate(`/allcitygyms/${city}`);
            inputElement.current.value = ''
            dispatch({ type: 'USER', payload: state + 1 });

        }
    };
    const [scrollTop, setScrollTop] = useState(false);

    const onScroll = (e) => {
        if (window.scrollY < 500) setScrollTop(false);
        else setScrollTop(true);
    }

    useEffect(() => {
        window.addEventListener('scroll', onScroll);

    }, []);
    const hidediv = () => {
        sethide(!hide)
    }

    return (
        <>
            <div className={`Navbar_maincontainer ${scrollTop ? "shadow_nav" : ""} `} >
                <div className="Navbar_left" >
                    <div className='burger' onClick={hidediv}>
                        {
                            hide ?
                                <HiOutlineBars3 />
                                :
                                <RxCross1 />
                        }
                    </div>
                    <li className='Navbar_li'> <img src='https://res.cloudinary.com/dgfn40mfc/image/upload/v1685128198/Important%20image/logo_zzpwsu.jpg' alt="logo" className='logo_navbar' /></li>
                    <li className='Navbar_li Name_comp' >  <Link to="/" className="nav-link ">Gymozy</Link></li>
                    <div className='Navbar_search'>
                        <input onKeyUp={handleKeyDown} type="search" id="" name="" ref={inputElement} className='navbar_search_inp' placeholder='Find Your Gym...' onChange={handleChange}></input>
                        <button className='navbar_search_button' onClick={handleClick} >Search</button>
                    </div>
                    {!document.cookie && <li className='Navbar_li lihidelogin'> <Link to="/signup">


                        <button className='Login_button_navbar' >
                            <div className='loginicon'><IoLogInOutline /></div>
                            <p> Login</p>
                        </button>

                    </Link>  </li>}

                    {document.cookie && <li className='Navbar_li lihidelogin'> <Link to="/logout">


                        <button className='Login_button_navbar' >
                            <div className='loginicon'><IoLogOutOutline /></div>
                            <p> Logout</p>
                        </button>

                    </Link>  </li>}


                </div>

                <div className={hide ? "Navbar_right toggle" : "Navbar_right"}
                >
                    <li className='Navbar_li ' onClick={hidediv}> <Link to="/" className="nav-link li_item Navbar_li ">Home</Link></li>

                    <li className='Navbar_li ' onClick={hidediv}><Link to="/privacyandpolicy" className="nav-link li_item Navbar_li ">Privacy & Policy</Link></li>

                    <li className='Navbar_li  faq_unhide' onClick={hidediv}><Link to="/faqpage" className="nav-link li_item Navbar_li "><FaQuestionCircle /></Link></li>

                    <p className='Navbar_hide_faq'>FAQ's</p>

                    <li className='Navbar_li ' onClick={hidediv}><Link to="/booking" className="nav-link li_item Navbar_li ">My Bookings</Link></li>

                    <li className='Navbar_li ' onClick={hidediv}><Link to="/contact" className="nav-link li_item Navbar_li ">Contact Us</Link></li>

                    {!document.cookie && <li className='Navbar_li'> <Link to="/signup">


                        <button className='Login_button_navbar Login_button_navbarhide' onClick={hidediv}>
                            <div className='loginicon'><IoLogInOutline /></div>
                            <p> Login / Signup</p>
                        </button>

                    </Link>  </li>}

                    {document.cookie && <li className='Navbar_li'> <Link to="/logout">


                        <button className='Login_button_navbar Login_button_navbarhide' onClick={hidediv} >
                            <div className='loginicon'><IoLogOutOutline /></div>
                            <p> Logout</p>
                        </button>

                    </Link>  </li>}

                </div>

            </div>

        </>
    );
}

export default Navbar;