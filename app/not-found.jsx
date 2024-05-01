import React from 'react'
import Link from 'next/link'

const NotFound = () => {
    return (
        <div className='h-screen w-full flex justify-center items-center flex-col p-5 gap-y-3'>
            <h3 className='text-4xl font-bold text-gray-900 bg-transparent bg-clip-text text-transparent bg-gradient-to-b from-primary to-secondary'>
                Looks Like You're Lost
            </h3>
            <Link
                href={'/'}
                className='text-2xl font-semibold text-white bg-primary px-5 py-1'
            >
                Return to HomePage
            </Link>
        </div>
    )
}

export default NotFound
