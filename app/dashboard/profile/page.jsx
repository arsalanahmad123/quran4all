'use client'
import { useAuth } from '@/context/authcontext'

function Profile() {
    const { user } = useAuth()

    return (
        <div className='min-h-screen  flex justify-center items-center p-10'>
            <div className='bg-white rounded-lg p-8 shadow-2xl w-80 grid grid-cols-2 gap-4'>
                <h1 className='col-span-2 text-3xl font-bold text-center text-primary mb-6'>
                    Profile
                </h1>
                <div className='col-span-2 flex items-center justify-center mb-4'>
                    <img
                        className='w-20 h-20 rounded-full mb-2'
                        src='https://randomuser.me/api/portraits/men/4.jpg' // Placeholder image
                        alt='Profile Picture'
                    />
                </div>
                <div className='col-span-2 text-sm font-medium text-center text-neutral'>
                    {user.name}
                </div>
                <div className='text-sm font-bold'>Email:</div>
                <div>{user.email}</div>
                <div className='text-sm font-bold'>Phone:</div>
                <div>{user.phone || '0485739484'}</div>
                <div className='text-sm font-bold'>Address:</div>
                <div>{user.address || 'sargodha'}</div>
            </div>
        </div>
    )
}

export default Profile
