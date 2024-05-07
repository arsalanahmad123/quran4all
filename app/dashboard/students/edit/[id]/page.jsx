'use client'
import { useState, useEffect } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import IsAuth from '@/components/isAuth'
import { getAdminApi } from '@/axiosroute/adminapi'
import toast from 'react-hot-toast'
const EditStudent = ({ params }) => {
    const [studentData, setStudentData] = useState(null)
    const [showPassword, setShowPassword] = useState(false)

    const adminapi = getAdminApi()
    useEffect(() => {
        const getStudent = async () => {
            try {
                const response = await adminapi.get(
                    `/api/student/${params.id}`,
                    {
                        cache: 'no-store',
                    },
                )
                const data = response.data.student[0]
                setStudentData(data)
            } catch (error) {
                console.log(error)
                toast.error('Failed to fetch student')
            }
        }

        getStudent()
    }, [params])

    const handleChange = (e) => {
        const { name, value } = e.target
        setStudentData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (
            studentData.fullname === '' ||
            studentData.username === '' ||
            studentData.phone === '' ||
            studentData.country === '' ||
            studentData.email === '' ||
            studentData.package === '' ||
            studentData.password === '' ||
            studentData.address === '' ||
            studentData.skype === '' ||
            studentData.whatsapp === ''
        ) {
            toast.error('All fields are required')
            return
        }

        try {
            const response = await adminapi.put(
                `/api/student/${params.id}`,
                studentData,
            )
            if (response.status === 200) {
                toast.success('Student updated successfully')
                window.location.href = '/dashboard/students'
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <IsAuth>
            <div className='w-full p-5 min-h-screen flex justify-center items-center'>
                {studentData && (
                    <div className='flex flex-col bg-secondary shadow-2xl py-10 px-5 gap-y-2 mb-5'>
                        <h4 className='text-2xl font-extrabold tracking-wider'>
                            Edit Student
                        </h4>
                        <div className='mt-5 w-full flex md:flex-row flex-col gap-y-2 justify-center items-center gap-x-5 '>
                            <div className='flex flex-col gap-y-1'>
                                <label htmlFor='fullname' className='text-xs'>
                                    Full Name
                                </label>
                                <input
                                    type='text'
                                    name='fullname'
                                    id='fullname'
                                    value={studentData?.fullname}
                                    className=' border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
                                    onChange={handleChange}
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
                                    value={studentData?.username}
                                    onChange={handleChange}
                                    className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
                                />
                            </div>
                            <div className='flex flex-col gap-y-1'>
                                <label htmlFor='email' className='text-xs'>
                                    Email
                                </label>
                                <input
                                    type='email'
                                    name='email'
                                    id='email'
                                    value={studentData?.email}
                                    onChange={handleChange}
                                    className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
                                />
                            </div>
                        </div>
                        <div className='mt-2 w-full flex md:flex-row flex-col gap-y-2 justify-center items-center gap-x-5'>
                            <div className='flex flex-col gap-y-1'>
                                <label htmlFor='phone' className='text-xs'>
                                    Phone
                                </label>
                                <input
                                    type='tel'
                                    name='phone'
                                    id='phone'
                                    value={studentData?.phone}
                                    onChange={handleChange}
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
                                    value={studentData?.whatsapp}
                                    onChange={handleChange}
                                    className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
                                />
                            </div>
                            <div className='flex flex-col gap-y-1 '>
                                <label htmlFor='password' className='text-xs'>
                                    Password
                                </label>
                                <div className='relative'>
                                    <input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        name='password'
                                        id='password'
                                        onChange={handleChange}
                                        className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
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
                        <div className='mt-2 flex md:flex-row flex-col gap-y-2 justify-center items-center gap-x-5 md:w-full '>
                            <div className='flex flex-col gap-y-1 md:w-full '>
                                <label htmlFor='skype' className='text-xs'>
                                    Skype ID
                                </label>
                                <input
                                    type='text'
                                    name='skype'
                                    id='skype'
                                    value={studentData?.skype}
                                    onChange={handleChange}
                                    className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
                                />
                            </div>
                            <div className='flex flex-col gap-y-1 md:w-full '>
                                <label htmlFor='country' className='text-xs'>
                                    Country
                                </label>
                                <input
                                    type='text'
                                    name='country'
                                    id='country'
                                    value={studentData?.country}
                                    onChange={handleChange}
                                    className='border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-0 focus:border-primary'
                                />
                            </div>
                        </div>
                        <div className='mt-2 flex md:flex-row flex-col gap-y-2 justify-center items-center gap-x-5 md:w-full '>
                            <div className='flex flex-col gap-y-1 md:w-full '>
                                <label htmlFor='address' className='text-xs'>
                                    Address
                                </label>
                                <textarea
                                    name='address'
                                    id='address'
                                    value={studentData?.address}
                                    onChange={handleChange}
                                    className='border border-gray-300 p-2 rounded-md resize-none focus:outline-none focus:ring-0 focus:border-primary'
                                ></textarea>
                            </div>
                            <div className='flex flex-col gap-y-1 md:w-full '>
                                <label htmlFor='package' className='text-xs'>
                                    Select Package
                                </label>
                                <select
                                    name='package'
                                    id='package'
                                    value={studentData?.package}
                                    onChange={handleChange}
                                    className='border border-gray-300 p-2 rounded-md bg-secondary focus:outline-none  focus:ring-0 focus:border-primary'
                                >
                                    <option value='package1'>Package1</option>
                                    <option value='package2'>Package2</option>
                                    <option value='package3'>Package3</option>
                                </select>
                            </div>
                        </div>
                        <button
                            className='bg-primary text-white px-3 py-1 mt-5 rounded-md'
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                )}
            </div>
        </IsAuth>
    )
}

export default EditStudent
