import React from 'react'
import { FaYoutube } from 'react-icons/fa'

const page = () => {
    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <div className='kbd kbd-lg flex flex-col p-5 cursor-pointer '>
                <span className='text-2xl text-red-500 font-bold'>
                    For Tutorials
                </span>
                <span className='text-2xl text-primary'>
                    Visit Our Youtube Channel
                </span>
                <FaYoutube className='text-5xl text-red-600' />
            </div>
        </div>
    )
}

export default page
