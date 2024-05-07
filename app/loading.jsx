'use client'
import React from 'react'
import { BallTriangle } from 'react-loader-spinner'

const loading = () => {
    return (
        <div className='h-screen w-full flex justify-center items-center bg-white/70 '>
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color='#654DC4'
                ariaLabel='ball-triangle-loading'
                visible={true}
            />
        </div>
    )
}

export default loading
