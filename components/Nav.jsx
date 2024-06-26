'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IoHome as HomeIcon } from 'react-icons/io5'
import {
    GiTeacher as TeachersIcon,
    GiPrayerBeads as DuaIcon,
} from 'react-icons/gi'
import { PiStudentBold as StudentIcon } from 'react-icons/pi'
import { AiOutlineSchedule as ScheduleIcon } from 'react-icons/ai'
import { MdVideoLibrary as TutorialIcon } from 'react-icons/md'

import { useAuth } from '@/context/authcontext'
import logo from '@/public/logo.png'
import Image from 'next/image'

const Nav = () => {
    const currentPath = usePathname()
    const { handleLogout, isAdmin } = useAuth()

    const links = [
        {
            name: 'Dashboard',
            path: '/dashboard',
        },
        isAdmin
            ? {
                  name: 'Teachers',
                  path: '/dashboard/teachers',
              }
            : null,
        isAdmin
            ? {
                  name: 'Students',
                  path: '/dashboard/students',
              }
            : null,
        isAdmin
            ? {
                  name: 'Schedule Class',
                  path: '/dashboard/schedule-class',
              }
            : null,
        {
            name: 'tutorials',
            path: '/dashboard/tutorials',
        },
        {
            name: "Dua's",
            path: '/dashboard/duas',
        },
    ].filter((link) => link !== null)

    const icons = [
        {
            name: 'Home',
            path: '/dashboard',
            icon: HomeIcon,
        },
        isAdmin
            ? {
                  name: 'Teachers',
                  path: '/dashboard/teachers',
                  icon: TeachersIcon,
              }
            : null,
        isAdmin
            ? {
                  name: 'Students',
                  path: '/dashboard/students',
                  icon: StudentIcon,
              }
            : null,
        isAdmin
            ? {
                  name: 'Schedule Class',
                  path: '/dashboard/schedule-class',
                  icon: ScheduleIcon,
              }
            : null,
        {
            name: 'Tutorials',
            path: '/dashboard/tutorials',
            icon: TutorialIcon,
        },
        {
            name: "Dua's",
            path: '/dashboard/duas',
            icon: DuaIcon,
        },
    ].filter((link) => link !== null)

    const isActive = (path) => {
        if (path === '/' || path === '/dashboard') {
            return currentPath === path
        } else {
            // Check if the current path starts with the link's path
            return currentPath.startsWith(path)
        }
    }

    return (
        <>
            {/* // Medium Screens  */}
            <nav className='bg-primary p-2 md:flex flex-row justify-between items-center lg:hidden hidden'>
                <div>
                    <Image src={logo} alt='logo' width={50} height={50} />
                </div>
                <div className=''>
                    <ul className='flex flex-row justify-normal items-center gap-x-2'>
                        {links.map((link) => {
                            return (
                                <Link
                                    key={link.name}
                                    href={link.path}
                                    className={`p-1 text-sm text-left rounded-md hover:bg-white hover:text-primary  ${
                                        isActive(link.path)
                                            ? 'bg-white text-primary'
                                            : 'text-white'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            )
                        })}
                        <button
                            className='btn bg-red-500 text-white btn-xs hover:bg-red-600 border-none'
                            onClick={() => handleLogout()}
                        >
                            Log out
                        </button>
                    </ul>
                </div>
            </nav>
            {/* Large Screens  */}
            <nav className='bg-primary min-h-screen p-4 w-[20%] hidden lg:block rounded-tr-lg rounded-br-lg fixed top-0 left-0'>
                <div className='flex flex-col justify-start items-center py-10 gap-y-10'>
                    <Image src={logo} alt='logo' width={100} height={100} />

                    <ul className='flex flex-col justify-center items-start gap-y-2 w-full mt-8'>
                        {links.map((link) => {
                            return (
                                <Link
                                    key={link.name}
                                    href={link.path}
                                    className={`p-2 w-full font-bold text-left rounded-md tracking-widest uppercase ${
                                        isActive(link.path)
                                            ? 'bg-white text-primary'
                                            : 'text-white'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            )
                        })}
                    </ul>

                    <button
                        className='p-2 w-full font-bold text-center rounded-md tracking-widest bg-red-500 text-white'
                        onClick={() => handleLogout()}
                    >
                        Log Out
                    </button>
                </div>
            </nav>

            {/* Small Screens  */}
            <nav className='bg-primary p-2 fixed bottom-0 left-0 w-full md:hidden lg:hidden '>
                <ul className='flex flex-row justify-between items-center gap-x-2 flex-wrap gap-y-2'>
                    {icons.map((link) => {
                        return (
                            <Link
                                key={link.name}
                                href={link.path}
                                className={`text-lg p-4 text-left rounded-md hover:bg-white hover:text-primary ${
                                    isActive(link.path)
                                        ? 'bg-white text-primary'
                                        : 'text-white'
                                }`}
                            >
                                <link.icon />
                            </Link>
                        )
                    })}
                    <button className='btn bg-red-500 text-white btn-xs hover:bg-red-600 border-none'>
                        Log out
                    </button>
                </ul>
            </nav>
        </>
    )
}

export default Nav
