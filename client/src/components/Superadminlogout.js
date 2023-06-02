
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';

const Superadminlogout = () => {
    const navigate = useNavigate();


    useEffect(() => {
        const token = document.cookie;
        if (token === '') token = 'empty'
        fetch(`https://gym-54v4.onrender.com/logout/superadminringrg/${token}`, {
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
                navigate('/superadminlogin')
                Cookies.remove('jwtokensuperadmin');
            })
            .catch((err) => {
                console.log(err);
            })

    })


    return (
        navigate('/')
    )
}

export default Superadminlogout
