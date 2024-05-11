'use client'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/authcontext'
import { getAdminApi } from '@/axiosroute/adminapi'
import toast from 'react-hot-toast'

const Page = () => {
    const { isAdmin, isLoggedIn, user } = useAuth()
    const adminapi = getAdminApi()
    const [classes, setClasses] = useState([])
    const [totalTeachers, setTotalTeachers] = useState(0)
    const [totalStudents, setTotalStudents] = useState(0)

    const fetchClasses = async () => {
        try {
            const endpoint = isAdmin ? '/api/class' : `/api/class/${user._id}`
            const response = await adminapi.get(endpoint, { cache: 'no-store' })
            if (response.status === 200) {
                setClasses(response.data.classes)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response.data.msg)
        }
    }

    const fetchCounts = async () => {
        try {
            const response = await adminapi.get('/api/auth/total', {
                cache: 'no-store',
            })
            if (response.status === 200) {
                setTotalTeachers(response.data.totalTeachers)
                setTotalStudents(response.data.totalStudents)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const openClass = async (link, class_id) => {
        try {
            if (user.role === 'teacher') {
                const response = await adminapi.put('/api/class', {
                    class_id,
                    teacher_id: user._id,
                })

                if (response.status === 200) {
                    window.open(link, '_blank')
                    toast.success('Class opened successfully after updation')
                    window.location.reload()
                }
            } else {
                window.open(link, '_blank')
                toast.success('Class opened successfully without updation')
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            fetchClasses()
        }
        if (isAdmin) {
            fetchCounts()
        }
    }, [isLoggedIn, isAdmin])

    return (
        <div className='h-screen w-full flex justify-start items-start md:p-5 px-2 mt-5 md:mt-0 flex-col overflow-auto'>
            {isAdmin && (
                <div className='flex md:flex-row flex-col justify-center items-center md:gap-x-3 w-full gap-y-3'>
                    <div className='p-5 bg-secondary shadow-xl flex flex-col justify-center items-start gap-y-4 lg:min-w-[500px] rounded-sm w-full'>
                        <h3 className='text-2xl font-bold text-gray-900'>
                            Total Teachers
                        </h3>
                        <span className='text-2xl font-extrabold italic ml-auto text-primary'>
                            {totalTeachers}
                        </span>
                    </div>
                    <div className='p-5 bg-secondary shadow-xl flex flex-col justify-center items-start gap-y-4 lg:min-w-[500px] rounded-sm w-full'>
                        <h3 className='text-2xl font-bold text-gray-900'>
                            Total Students
                        </h3>
                        <span className='text-2xl font-bold italic ml-auto text-primary'>
                            {totalStudents}
                        </span>
                    </div>
                </div>
            )}
            {isLoggedIn && classes.length > 0 && (
                <div className='flex flex-col justify-start items-start gap-x-3 w-full h-screen gap-y-5 mt-4'>
                    <h4 className='text-2xl font-bold'>Today Schedule</h4>
                    <div className='overflow-x-auto w-full  rounded-md'>
                        <table className='table w-full'>
                            <thead>
                                <tr className='bg-base-200'>
                                    <th>Time</th>
                                    <th>Country</th>
                                    <th>Teacher</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classes.map((item, i) => (
                                    <tr
                                        key={i}
                                        className={` ${
                                            item.status === 'completed' &&
                                            user.role === 'teacher' &&
                                            'overthrough'
                                        } `}
                                    >
                                        <td>
                                            {new Date(
                                                item.time,
                                            ).toLocaleTimeString()}
                                        </td>
                                        <td>{item.country}</td>
                                        <td>{item.teacher.fullname}</td>
                                        <td>
                                            <button
                                                className='text-primary text-sm hover:bg-gray-300 bg-gray-200 rounded-md font-bold btn btn-xs'
                                                onClick={() =>
                                                    openClass(
                                                        item.link,
                                                        item._id,
                                                    )
                                                }
                                                disabled={
                                                    item.status ===
                                                        'completed' &&
                                                    user.role === 'teacher'
                                                }
                                            >
                                                Join
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {classes.length === 0 && (
                <span className='text-gray-900 font-semibold text-2xl mt-5'>
                    No classes today 🙃
                </span>
            )}
        </div>
    )
}

export default Page
