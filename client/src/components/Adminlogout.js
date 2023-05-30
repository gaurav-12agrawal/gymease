
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';

const Adminlogout = () => {
    const navigate = useNavigate();


    useEffect(() => {
        let token = document.cookie;
        if (token === '') token = 'empty'
        fetch(`https://gym-54v4.onrender.com/logoutadminringrg/${token}`, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then((res) => {

                localStorage.removeItem('isadmin')
                localStorage.removeItem('setupTime')
                navigate('/adminlogin')
                Cookies.remove('jwtokenadmin');

            })
            .catch((err) => {
                console.log(err);
            })

    })


    return (
        navigate('/')
    )
}

export default Adminlogout
