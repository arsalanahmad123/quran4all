'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const authContext = createContext({
    user: null,
    setUser: (user) => {},
    isLoggedIn: false,
    setIsLoggedIn: (isLoggedIn) => {},
    token: null,
    setToken: (token) => {},
    isAdmin: false,
    setIsAdmin: (isAdmin) => {},
})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)

    const handleLogin = (user, token) => {
        setUser(user)
        setIsLoggedIn(true)
        setToken(token)
        localStorage.setItem('authData', JSON.stringify({ user, token }))

        if (user.role === 'admin') {
            setIsAdmin(true)
        } else {
            setIsAdmin(false)
        }
    }

    const handleLogout = () => {
        setUser(null)
        setIsLoggedIn(false)
        setToken(null)
        setIsAdmin(false)
        localStorage.removeItem('authData')
        window.location.href = '/'
    }

    useEffect(() => {
        const storedData = localStorage.getItem('authData')
        if (storedData) {
            const { user, token } = JSON.parse(storedData)
            setUser(user)
            setIsLoggedIn(true)
            setToken(token)
            setIsAdmin(user.role === 'admin')
        }
    }, [])

    return (
        <authContext.Provider
            value={{
                user,
                setUser,
                isLoggedIn,
                setIsLoggedIn,
                token,
                setToken,
                handleLogin,
                handleLogout,
                isAdmin,
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(authContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
