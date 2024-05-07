'use client'
import React from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import IsAuth from '@/components/isAuth'

import toast from 'react-hot-toast'
import { getAdminApi } from '@/axiosroute/adminapi'
const NewTeacher = () => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [fullname, setFullname] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [address, setAddress] = React.useState('')

    const adminapi = getAdminApi()
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (
            fullname === '' ||
            phone === '' ||
            email === '' ||
            password === '' ||
            address === ''
        ) {
            toast.error('All fields are required')
            return
        }

        try {
            const data = {
                fullname,
                phone,
                email,
                password,
                address,
                role: 'teacher',
            }

            const response = await adminapi.post('/api/teacher', data)

            if (response.status === 201) {
                toast.success('Teacher added successfully')
                setFullname('')
                setPhone('')
                setEmail('')
                setPassword('')
                setAddress('')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg)
        }
    }

    return (
        <IsAuth>
            <div className='w-full p-5 h-screen flex justify-center items-center'>
                <div className='flex flex-col bg-secondary shadow-2xl p-5 gap-y-2'>
                    <h4 className='text-2xl font-extrabold tracking-wider'>
                        Add New Teacher
                    </h4>
                    <div className='mt-5 w-full flex flex-row justify-center items-center gap-x-5'>
                        <div className='w-full'>
                            <label htmlFor='fullname' className='text-xs'>
                                Full Name
                            </label>
                            <input
                                type='text'
                                name='fullname'
                                id='fullname'
                                value={fullname}
                                className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
                                required
                                onChange={(e) => setFullname(e.target.value)}
                            />
                        </div>
                        <div className='w-full '>
                            <label htmlFor='phone' className='text-xs'>
                                Phone
                            </label>
                            <input
                                type='tel'
                                name='phone'
                                id='phone'
                                value={phone}
                                className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
                                required
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='mt-2 w-full flex flex-row justify-center items-center gap-x-5'>
                        <div className='w-full'>
                            <label htmlFor='email' className='text-xs'>
                                Email
                            </label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                value={email}
                                className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='w-full '>
                            <label htmlFor='password' className='text-xs'>
                                Password
                            </label>
                            <div className='relative'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    id='password'
                                    value={password}
                                    className='w-full border border-gray-300 p-2 rounded-md
                                    focus:outline-none
                                    focus:ring-0
                                    focus:border-primary'
                                    required
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                {showPassword ? (
                                    <FaEye
                                        className='absolute top-3 right-3 cursor-pointer'
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    />
                                ) : (
                                    <FaEyeSlash
                                        className='absolute top-3 right-3 cursor-pointer'
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='mt-2 w-full flex flex-col'>
                        <label htmlFor='address' className='text-xs'>
                            Address
                        </label>
                        <textarea
                            name='address'
                            id='address'
                            value={address}
                            className='w-full border border-gray-300 p-2 rounded-md resize-none focus:outline-none focus:ring-0 focus:border-primary'
                            required
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <button
                        className='bg-primary text-white px-3 py-1 mt-5 rounded-md'
                        onClick={(e) => handleSubmit(e)}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </IsAuth>
    )
}

export default isAuth(NewTeacher)
