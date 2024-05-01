import React from 'react'
import Link from 'next/link'
import { FaPencilAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

const Teachers = () => {
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
                        <tr>
                            <td>John Doe</td>
                            <td>johndoe@gmail.com</td>
                            <td>+123456789</td>
                            <td className='flex flex-row justify-start items-center gap-x-5'>
                                <Link href={'/dashboard/teachers/edit'}>
                                    <FaPencilAlt className='text-lg text-primary ' />
                                </Link>
                                <MdDelete className='text-lg text-red-600 cursor-pointer' />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Teachers
