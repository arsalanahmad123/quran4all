'use client'
import React from 'react'
import Link from 'next/link'
import { FaPencilAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import isAuth from '@/components/isAuth'
import { getAdminApi } from '@/axiosroute/adminapi'
import toast from 'react-hot-toast'

const Students = () => {
    const [students, setStudents] = React.useState([])

    const adminapi = getAdminApi()
    const getStudents = async () => {
        try {
            const response = await adminapi.get('/api/student')
            if (response.status === 200) {
                console.log(response.data)
                const data = response.data
                setStudents(data.students)
            }
        } catch (error) {
            console.error(error)
        }
    }
    React.useEffect(() => {
        getStudents()
    }, [])

    const deleteStudent = async (id) => {
        const confirm = window.confirm('Are you sure you want to delete?')
        if (!confirm) return
        try {
            const response = await adminapi.delete(`/api/student/${id}`)
            if (response.status === 200) {
                toast.success('Student deleted successfully')
                getStudents()
            }
        } catch (error) {
            console.log(error)
        }
    }

    console.log(students)

    return (
        <div className='w-full p-5 flex flex-col justify-start items-start gap-y-5'>
            <div className='flex flex-row justify-between items-center w-full'>
                <h4 className='text-2xl font-bold'>Students</h4>
                <Link
                    href={'/dashboard/students/new'}
                    className='bg-primary text-white px-5 py-1 uppercase'
                >
                    Add
                </Link>
            </div>
            <div className='overflow-x-auto w-full  rounded-md'>
                <table className='table w-full'>
                    <thead>
                        <tr className='bg-base-200'>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Skype ID</th>
                            <th>Country</th>
                            <th>Package</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students?.map((student, i) => (
                            <tr key={i}>
                                <td>{student.username}</td>
                                <td>{student.email}</td>
                                <td>{student.phone}</td>
                                <td>{student.skype}</td>
                                <td>{student.country}</td>
                                <td>{student.package}</td>
                                <td className='flex flex-row justify-start items-center gap-x-5'>
                                    <Link
                                        href={`/dashboard/students/edit/${student._id}`}
                                    >
                                        <FaPencilAlt className='text-lg text-primary ' />
                                    </Link>
                                    <MdDelete
                                        className='text-lg text-red-600 cursor-pointer'
                                        onClick={() =>
                                            deleteStudent(student._id)
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

export default isAuth(Students)
