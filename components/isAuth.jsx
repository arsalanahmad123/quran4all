'use client'

import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import { useAuth } from '@/context/authcontext'

export default function IsAuth({ children }) {
    const { isAdmin, isLoggedIn } = useAuth()
    useEffect(() => {
        if (!isAdmin && isLoggedIn) {
            redirect('/dashboard')
        }
    }, [])

    return isAdmin && <>{children}</>
}
