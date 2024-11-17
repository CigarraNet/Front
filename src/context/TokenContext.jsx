import React, { createContext, useEffect, useState } from 'react';
export const TokenContext = createContext();

export const TokenProvider = (props) => {

    const [token, setToken] = useState(localStorage.getItem('token'))

    useEffect(() => {
        const fetchUser = async () => {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
            }

            const response = await fetch('http://127.0.0.1:8000/empleados/me', requestOptions)

            if (!response.ok) {
                setToken(null)
                localStorage.removeItem('token')
            } else {
                const data = await response.json()
            }

            localStorage.setItem('token', token)
        }

        fetchUser()
    }, [token])

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            {props.children}
        </TokenContext.Provider>
)
}