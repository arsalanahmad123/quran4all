'use client'

import { useEffect } from 'react'
import { redirect } from 'next/navigation'

export default function isAuth(Component) {
    return function (props) {
        let session = false

        useEffect(() => {
            if (session) {
                redirect('/dashboard')
            }
        })

        return <Component {...props} />
    }
}
