'use client'
import React from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
const NewStudent = () => {
    const [showPassword, setShowPassword] = React.useState(false)
    return (
        <div className='w-full p-5 h-screen flex justify-center items-center'>
            <div className='flex flex-col bg-secondary shadow-2xl p-5 gap-y-2'>
                <h4 className='text-2xl font-extrabold tracking-wider'>
                    Add New Student
                </h4>
                <div className='mt-5 w-full flex flex-row justify-center items-center gap-x-5'>
                    <div className='flex flex-col gap-y-1'>
                        <label htmlFor='fullname' className='text-xs'>
                            Full Name
                        </label>
                        <input
                            type='text'
                            name='fullname'
                            id='fullname'
                            className=' border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
                        />
                    </div>
                    <div className='flex flex-col gap-y-1'>
                        <label htmlFor='username' className='text-xs'>
                            Username(Profile Name)
                        </label>
                        <input
                            type='text'
                            name='username'
                            id='username'
                            className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
                        />
                    </div>
                    <div className='w-full'>
                        <label htmlFor='email' className='text-xs'>
                            Email
                        </label>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
                        />
                    </div>
                </div>
                <div className='mt-2 w-full flex flex-row justify-center items-center gap-x-5'>
                    <div className='flex flex-col gap-y-1'>
                        <label htmlFor='phone' className='text-xs'>
                            Phone
                        </label>
                        <input
                            type='tel'
                            name='phone'
                            id='phone'
                            className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
                        />
                    </div>
                    <div className='flex flex-col gap-y-1'>
                        <label htmlFor='whatsapp' className='text-xs'>
                            Whatsapp Number
                        </label>
                        <input
                            type='tel'
                            name='whatsapp'
                            id='whatsapp'
                            className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
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
                                className='w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
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
                <div className='mt-2 w-full flex flex-row justify-center items-center gap-x-5'>
                    <div className='flex flex-col gap-y-1 w-full'>
                        <label htmlFor='skype' className='text-xs'>
                            Skype ID
                        </label>
                        <input
                            type='text'
                            name='skype'
                            id='skype'
                            className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
                        />
                    </div>
                    <div className='flex flex-col gap-y-1 w-full'>
                        <label htmlFor='country' className='text-xs'>
                            Country
                        </label>
                        <input
                            type='text'
                            name='country'
                            id='country'
                            className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
                        />
                    </div>
                </div>
                <div className='mt-2 flex flex-row justify-center items-center gap-x-5'>
                    <div className='flex flex-col gap-y-1'>
                        <label htmlFor='address' className='text-xs'>
                            Address
                        </label>
                        <textarea
                            name='address'
                            id='address'
                            className='border border-gray-300 p-2 rounded-md resize-none focus:outline-none focus:ring-0 focus:border-primary'
                            cols='38'
                            rows='3'
                        ></textarea>
                    </div>
                    <div className='flex flex-col gap-y-1 w-full'>
                        <label htmlFor='package' className='text-xs'>
                            Select Package
                        </label>
                        <select
                            name='package'
                            id='package'
                            className='border border-gray-300 p-2 rounded-md bg-secondary focus:outline-none  focus:ring-0 focus:border-primary'
                        >
                            <option value='package1'>Package1</option>
                            <option value='package2'>Package2</option>
                            <option value='package3'>Package3</option>
                        </select>
                    </div>
                </div>
                <button className='bg-primary text-white px-3 py-1 rounded-md'>
                    Submit
                </button>
            </div>
        </div>
    )
}

export default NewStudent
