'use client'
import axios from 'axios'

export const getAdminApi = () => {
    const authData = JSON.parse(localStorage.getItem('authData'))
    const token = authData?.token
    const id = authData?.user?._id
    return axios.create({
        baseURL: 'https://quran4allbackend.vercel.app',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            id: id,
        },
    })
}
