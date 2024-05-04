'use client'
import React from 'react'
import Link from 'next/link'
import { FaPencilAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import isAuth from '@/components/isAuth'
import { getAdminApi } from '@/axiosroute/adminapi'
import toast from 'react-hot-toast'
import { useAuth } from '@/context/authcontext'

const Teachers = () => {
    const [teachers, setTeachers] = React.useState([])

    const { isAdmin } = useAuth()

    const adminapi = getAdminApi()
    const getTeachers = async () => {
        const response = await adminapi.get('/api/teacher')
        const data = response.data
        setTeachers(data.teachers)
    }
    React.useEffect(() => {
        isAdmin && getTeachers()
    }, [])

    const deleteTeacher = async (id) => {
        const confirm = window.confirm('Are you sure you want to delete?')
        if (!confirm) return
        try {
            const response = await adminapi.delete(`/api/teacher/${id}`)
            if (response.status === 200) {
                toast.success('Teacher deleted successfully')
                getTeachers()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='w-full p-5 flex flex-col justify-start items-start gap-y-5'>
            <div className='flex flex-row justify-between items-center w-full'>
                <h4 className='text-2xl font-bold'>Teachers</h4>
                <Link
                    href={'/dashboard/teachers/new'}
                    className='bg-primary text-white px-5 py-1 uppercase'
                >
                    Add
                </Link>
            </div>
            <div className='overflow-x-auto w-full  rounded-md'>
                <table className='table w-full'>
                    <thead>
                        <tr className='bg-base-200'>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers?.map((teacher, i) => (
                            <tr key={i}>
                                <td>{teacher.fullname}</td>
                                <td>{teacher.email}</td>
                                <td>{teacher.phone}</td>
                                <td className='flex flex-row justify-start items-center gap-x-5'>
                                    <Link
                                        href={`/dashboard/teachers/edit/${teacher._id}`}
                                    >
                                        <FaPencilAlt className='text-lg text-primary ' />
                                    </Link>
                                    <MdDelete
                                        className='text-lg text-red-600 cursor-pointer'
                                        onClick={() =>
                                            deleteTeacher(teacher._id)
                                        }
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default isAuth(Teachers)
