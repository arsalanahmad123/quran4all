import React from 'react'

const page = () => {
    let admin = false
    let teacher = true
    return (
        <div className='h-screen w-full flex justify-start items-start md:p-5 px-2 mt-5 md:mt-0'>
            {admin && (
                <div className='flex md:flex-row flex-col justify-center items-center md:gap-x-3 w-full gap-y-3'>
                    <div className='p-5 bg-secondary shadow-xl flex flex-col justify-center items-start gap-y-4 lg:min-w-[500px] rounded-sm w-full'>
                        <h3 className='text-2xl font-bold text-gray-900'>
                            Total Teachers
                        </h3>
                        <span className='text-2xl font-extrabold italic ml-auto text-primary'>
                            100
                        </span>
                    </div>
                    <div className='p-5 bg-secondary shadow-xl flex flex-col justify-center items-start gap-y-4 lg:min-w-[500px] rounded-sm w-full'>
                        <h3 className='text-2xl font-bold text-gray-900'>
                            Total Students
                        </h3>
                        <span className='text-2xl font-bold italic ml-auto text-primary'>
                            1000
                        </span>
                    </div>
                </div>
            )}
            {!admin && teacher && (
                <div className='flex flex-col justify-start items-start gap-x-3 w-full h-screen gap-y-5'>
                    <h4 className='text-2xl font-bold'>Today Schedule</h4>
                    <div className='w-full bg-secondary border border-gray-300 p-3 flex flex-col rounded-md'>
                        <div className='flex flex-row justify-between items-center flex-wrap p-2 '>
                            <span>Time</span>
                            <span>Subject</span>
                            <span>Students</span>
                            <span>
                                <button className='text-primary text-sm hover:bg-gray-300 bg-gray-200 rounded-md font-bold btn btn-xs'>
                                    Join
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default page
