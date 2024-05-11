'use client'
import { useState, useEffect } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '@/context/authcontext'
import { useRouter } from 'next/navigation'

const page = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { isLoggedIn, handleLogin } = useAuth()

    const router = useRouter()
    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        const data = {
            email,
            password,
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        try {
            const res = await axios.post(
                'https://quran4allbackend.vercel.app/api/auth/login',
                data,
                config,
            )

            if (res.status === 200) {
                toast.success('Login Successful')
                handleLogin(res.data.user, res.data.token)

                setLoading(false)
                router.push('/dashboard')
            }
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            router.push('/dashboard')
        }
    }, [isLoggedIn])

    return (
        <div className='flex justify-center items-center h-screen mx-2 lg:mx-0'>
            <div className='bg-white shadow-2xl p-5 lg:w-1/3 md:w-10/12 w-full flex flex-col justify-center items-center '>
                <h3 className='text-2xl font-extrabold uppercase text-primary tracking-widest'>
                    LogIn
                </h3>
                <div className='flex flex-col gap-y-1 mt-5 w-full'>
                    <label htmlFor='email' className='text-xs'>
                        Email
                    </label>
                    <input
                        type='text'
                        name='email'
                        id='email'
                        placeholder='Email'
                        className='p-2 border border-gray-300 rounded-md focus:border-primary  focus:outline focus:ring-0'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-y-1 mt-5 w-full'>
                    <label htmlFor='password' className='text-xs'>
                        Password
                    </label>
                    <div className='relative w-full'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            id='password'
                            placeholder='Password'
                            className='p-2 border border-gray-300 rounded-md focus:border-primary w-full focus:outline focus:ring-0'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {showPassword ? (
                            <FaEye
                                className='absolute top-3 right-3 cursor-pointer'
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        ) : (
                            <FaEyeSlash
                                className='absolute top-3 right-3 cursor-pointer'
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        )}
                    </div>
                </div>
                <button
                    className='mt-4 bg-primary text-white p-2 rounded-md w-full text-center'
                    onClick={(e) => handleSubmit(e)}
                    disabled={loading ? true : false}
                >
                    {loading ? 'Loading...' : 'Login'}
                </button>
            </div>
        </div>
    )
}

export default page
