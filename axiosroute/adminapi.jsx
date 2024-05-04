'use client'
import axios from 'axios'

export const getAdminApi = () => {
    const authData = JSON.parse(localStorage.getItem('authData'))
    const token = authData?.token
    const id = authData?.user?._id

    return axios.create({
        baseURL: 'http://localhost:8000',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            id: id,
        },
    })
}
