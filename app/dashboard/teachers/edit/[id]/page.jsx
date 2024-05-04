'use client'
import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import isAuth from '@/components/isAuth'
import { getAdminApi } from '@/axiosroute/adminapi'
import toast from 'react-hot-toast'
import { useAuth } from '@/context/authcontext'

const EditTeacher = ({ params }) => {
    const [teacherData, setTeacherData] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const { isAdmin } = useAuth()
    const adminapi = getAdminApi()
    useEffect(() => {
        const getTeacher = async () => {
            try {
                const response = await adminapi.get(
                    `/api/teacher/${params.id}`,
                    {
                        cache: 'no-store',
                    },
                )
                const data = response.data.teacher[0]
                setTeacherData(data)
            } catch (error) {
                console.log(error)
                toast.error('Failed to fetch teacher')
            }
        }

        isAdmin && getTeacher()
    }, [params])

    const handleChange = (e) => {
        const { name, value } = e.target
        setTeacherData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleTogglePassword = () => {
        setShowPassword(!showPassword)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (
            teacherData.fullname === '' ||
            teacherData.phone === '' ||
            teacherData.email === '' ||
            teacherData.password === '' ||
            teacherData.address === ''
        ) {
            toast.error('All fields are required')
            return
        }

        try {
            const response = await adminapi.put(
                `/api/teacher/${params.id}`,
                teacherData,
            )
            if (response.status === 200) {
                toast.success('Teacher updated successfully')
                window.location.href = '/dashboard/teachers'
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='w-full p-5 h-screen flex justify-center items-center'>
            {teacherData !== null && (
                <div className='flex flex-col bg-secondary shadow-2xl p-5 gap-y-2'>
                    <h4 className='text-2xl font-extrabold tracking-wider'>
                        Edit Teacher
                    </h4>
                    <div className='mt-5 w-full flex flex-row justify-center items-center gap-x-5'>
                        {/* Full Name */}
                        <div className='w-full'>
                            <label htmlFor='fullname' className='text-xs'>
                                Full Name
                            </label>
                            <input
                                type='text'
                                name='fullname'
                                value={teacherData.fullname}
                                className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
                                onChange={handleChange}
                            />
                        </div>
                        {/* Phone */}
                        <div className='w-full '>
                            <label htmlFor='phone' className='text-xs'>
                                Phone
                            </label>
                            <input
                                type='tel'
                                name='phone'
                                value={teacherData.phone || ''}
                                className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    {/* Email */}
                    <div className='mt-2 w-full flex flex-row justify-center items-center gap-x-5'>
                        <div className='w-full'>
                            <label htmlFor='email' className='text-xs'>
                                Email
                            </label>
                            <input
                                type='email'
                                name='email'
                                value={teacherData.email || ''}
                                className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
                                onChange={handleChange}
                            />
                        </div>
                        {/* Password */}
                        <div className='w-full '>
                            <label htmlFor='password' className='text-xs'>
                                Password
                            </label>
                            <div className='relative'>
                                <input
                                    name='password'
                                    type={showPassword ? 'text' : 'password'}
                                    className='w-full border border-gray-300 p-2 rounded-md
                                    focus:outline-none
                                    focus:ring-0
                                    focus:border-primary'
                                    value={teacherData.password || ''}
                                    onChange={handleChange}
                                />
                                {showPassword ? (
                                    <FaEye
                                        className='absolute top-3 right-3 cursor-pointer'
                                        onClick={handleTogglePassword}
                                    />
                                ) : (
                                    <FaEyeSlash
                                        className='absolute top-3 right-3 cursor-pointer'
                                        onClick={handleTogglePassword}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Address */}
                    <div className='mt-2 w-full flex flex-col'>
                        <label htmlFor='address' className='text-xs'>
                            Address
                        </label>
                        <textarea
                            name='address'
                            className='w-full border border-gray-300 p-2 rounded-md resize-none focus:outline-none focus:ring-0 focus:border-primary'
                            value={teacherData.address || ''}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Submit Button */}
                    <button
                        className='bg-primary text-white px-3 py-1 mt-5 rounded-md'
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            )}
        </div>
    )
}

export default isAuth(EditTeacher)
