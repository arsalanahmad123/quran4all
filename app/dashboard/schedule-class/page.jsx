'use client'
import { useState, useEffect } from 'react'
import IsAuth from '@/components/isAuth'
import { getAdminApi } from '@/axiosroute/adminapi'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'
const page = () => {
    const [students, setStudents] = useState(null)
    const [teachers, setTeachers] = useState(null)
    const [filteredStudents, setFilteredStudents] = useState(null)
    const [selectedStudent, setSelectedStudent] = useState(null)
    const [selectedTeacher, setSelectedTeacher] = useState(null)
    const [time, setTime] = useState(null)
    const [usernameSearch, setUsernameSearch] = useState('')
    const [countrySearch, setCountrySearch] = useState('')
    const [link, setLink] = useState(null)

    const adminapi = getAdminApi()

    const getTeachers = async () => {
        try {
            const response = await adminapi.get('/api/teacher')
            const data = response.data
            setTeachers(data.teachers)
        } catch (error) {
            console.log(error)
        }
    }

    const getStudents = async () => {
        try {
            const response = await adminapi.get('/api/student')
            const data = response.data
            setStudents(data.students)
            setFilteredStudents(data.students)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTeachers()
        getStudents()
    }, [])

    useEffect(() => {
        if (usernameSearch === '') {
            setFilteredStudents(students)
        } else {
            setFilteredStudents(
                students.filter((student) =>
                    student.username.includes(usernameSearch),
                ),
            )
        }
    }, [usernameSearch])

    useEffect(() => {
        if (countrySearch === '') {
            setFilteredStudents(students)
        } else {
            setFilteredStudents(
                students.filter((student) =>
                    student.country.includes(countrySearch),
                ),
            )
        }
    }, [countrySearch])

    const scheduleClass = async () => {
        if (
            selectedStudent === null ||
            selectedTeacher === null ||
            time === null ||
            link === null
        ) {
            toast.error('All fields are required')
            return
        }
        try {
            const data = {
                student_id: selectedStudent,
                teacher_id: selectedTeacher,
                time,
                link,
            }
            const response = await adminapi.post('/api/class', data)
            if (response.status === 201) {
                toast.success('Class scheduled successfully')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg)
        }
    }

    return (
        <IsAuth>
            <div className='w-full p-5 flex justify-start items-start min-h-screen flex-col gap-y-5 mb-10'>
                <h1 className='text-2xl font-semibold '>Schedule Class</h1>
                {students && teachers && (
                    <div className='flex md:flex-row flex-col md:justify-between items-start w-full justify-center gap-y-5 h-full mb-5'>
                        <div className='max-h-[60vh] overflow-auto bg-secondary  p-5 w-full mb-5'>
                            <div className='flex justify-between items-center gap-x-2'>
                                <input
                                    type='search'
                                    name='search-student'
                                    className='input input-bordered input-primary input-xs focus:outline-none focus:ring-0'
                                    placeholder='Search by username'
                                    onChange={(e) =>
                                        setUsernameSearch(e.target.value)
                                    }
                                />
                                <input
                                    type='search'
                                    name='search-student'
                                    className='input input-bordered input-primary input-xs focus:outline-none focus:ring-0'
                                    placeholder='Search by country'
                                    onChange={(e) =>
                                        setCountrySearch(e.target.value)
                                    }
                                />
                            </div>
                            <table className='table mt-5 table-md'>
                                <thead>
                                    <tr>
                                        <th>Select</th>
                                        <th>Username</th>
                                        <th>Country</th>
                                        <th>Package</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStudents?.map((student, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input
                                                    type='radio'
                                                    name='select-student'
                                                    className='radio radio-xs radio-primary'
                                                    value={student._id}
                                                    onChange={() => {
                                                        setSelectedStudent(
                                                            student._id,
                                                        )
                                                    }}
                                                />
                                            </td>
                                            <td>{student.username}</td>
                                            <td>{student.country}</td>
                                            <td>{student.package}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='flex flex-col bg-primary p-5 gap-y-3 w-full'>
                            <select
                                name='select-teacher'
                                className='select select-primary focus:outline-none focus:ring-0 select-sm'
                                onChange={(e) => {
                                    setSelectedTeacher(e.target.value)
                                }}
                            >
                                <option value=''>Select Teacher</option>
                                {teachers.map((teacher, index) => (
                                    <option key={index} value={teacher._id}>
                                        {teacher.fullname}
                                    </option>
                                ))}
                            </select>
                            <input
                                type='datetime-local'
                                name='time'
                                className='input focus:outilne-none focus:ring-0 outline-none ring-0 input-sm'
                                onChange={(e) => setTime(e.target.value)}
                            />
                            <input
                                type='text'
                                name='link'
                                className='input focus:outilne-none focus:ring-0 outline-none ring-0 input-sm'
                                placeholder='Enter class link'
                                onChange={(e) => setLink(e.target.value)}
                            />
                            <button
                                className='btn btn-sm w-28 ml-auto'
                                onClick={scheduleClass}
                            >
                                Schedule
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </IsAuth>
    )
}

export default page
