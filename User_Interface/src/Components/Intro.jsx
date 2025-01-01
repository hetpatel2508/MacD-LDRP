import React from 'react'

export default function Intro({ setShowIntro }) {
    return (
        <div className='w-full h-full fixed z-20 bg-white'>
            <div className='w-full h-[520px] bg-pink-100'></div>
            <div className='w-full h-[120px] bg-slate-200 flex flex-col items-center justify-center'>
                <div className='w-full h-[75px] flex items-center justify-center text-[62px]'>
                    FEAST & FLY TO GOA
                </div>
                <div className='w-full h-[20px] flex items-center justify-center mt-0.5 text-[19px]'>
                    Buy the most Festive Treat for Two this season & win an assured trip to Goa!
                </div>
            </div>
            <div className='w-full h-[224px] flex flex-col items-center justify-center' onClick={() => setShowIntro(false)}>
                <div className='w-[300px] h-[120px] flex flex-col items-center justify-center bg-gray-50 gap-1.5 rounded-lg border border-black cursor-pointer'>
                    <div className='text-[29px] h-[35px] font-[700] flex items-center'>Start Order</div>
                    <div className='text-[21px] h-[22px] flex items-end'>to get deliciousness</div>
                </div>
                <div className='w-[210px] h-[59px] flex items-center justify-center gap-2 bg-gray-50 rounded-lg border border-black mt-3 cursor-pointer'>
                    <div className='w-[30px] h-[30px] bg-black rounded-full'></div>
                    <div className='text-[18px] '>
                        Accessibility
                    </div>

                </div>
            </div>
        </div>
    )
}
