
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Superadminlogout = () => {
    const navigate = useNavigate();


    useEffect(() => {
        fetch('https://gym-54v4.onrender.com/logout/superadminringrg', {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then((res) => {
                console.log(res)
                localStorage.removeItem('isadmin')
                localStorage.removeItem('setupTime')
                navigate('/superadminlogin')

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
