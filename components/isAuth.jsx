'use client'

import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import { useAuth } from '@/context/authcontext'

export default function isAuth(Component) {
    return function (props) {
        const { isAdmin, isLoggedIn } = useAuth()
        useEffect(() => {
            if (!isAdmin && isLoggedIn) {
                redirect('/dashboard')
            }
        }, [])

        return <Component {...props} />
    }
}
