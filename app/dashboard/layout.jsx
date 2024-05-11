'use client'
import Nav from '@/components/Nav'
import { FaWhatsapp } from 'react-icons/fa'
import { useEffect } from 'react'

import { useAuth } from '@/context/authcontext'
import { useRouter } from 'next/navigation'

export default function MainLayout({ children }) {
    const { isLoggedIn } = useAuth()
    const router = useRouter()
    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/')
        }
    }, [isLoggedIn])

    return (
        isLoggedIn && (
            <section className='flex flex-col lg:flex-row w-full h-screen relative overflow-x-hidden'>
                <Nav />
                <main className='lg:w-[80%] w-full flex flex-col justify-center items-center lg:fixed lg:top-0 lg:right-0'>
                    {children}
                </main>
                {isLoggedIn && (
                    <div className='absolute bottom-56 -right-20 w-28 h-16 bg-green-500 flex justify-center items-center cursor-pointer z-50 shadow-2xl shadow-black transition-all duration-500 ease-in hover:right-0'>
                        <FaWhatsapp className='text-4xl text-white m-auto' />
                    </div>
                )}
            </section>
        )
    )
}
