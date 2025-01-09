import React from 'react'

export default function MainBox() {
    return (
        <div className='w-full h-full flex flex-col items-center overflow-x-hidden'>
            <div className='w-full h-[50px] mt-9 ml-20 bg-cyan-200 flex items-center text-3xl font-[600]'>Discover our Menu</div>
            <div className='w-[80%] h-[520px] bg-purple-200 flex justify-center flex-wrap'>
                <div className='w-[284px] h-[220px] bg-cyan-200 ml-4 mr-4 mt-9 transition-all duration-300 hover:shadow-2xl hover:scale-100'></div>
                <div className='w-[284px] h-[220px] bg-cyan-200 ml-4 mr-4 mt-9 transition-all duration-300 hover:shadow-2xl hover:scale-100'></div>
                <div className='w-[284px] h-[220px] bg-cyan-200 ml-4 mr-4 mt-9 transition-all duration-300 hover:shadow-2xl hover:scale-100'></div>
                <div className='w-[284px] h-[220px] bg-cyan-200 ml-4 mr-4 mt-9 transition-all duration-300 hover:shadow-2xl hover:scale-100'></div>
                <div className='w-[284px] h-[220px] bg-cyan-200 ml-4 mr-4 mt-9 transition-all duration-300 hover:shadow-2xl hover:scale-100'></div>
            </div>
            <div className='w-[100%] h-[190px] bg-cyan-100 flex flex-col mt-9'>
                <div className='w-full h-[50px] bg-cyan-200 flex items-center text-3xl font-[600] ml-[40px]'>Discover our new Loyalty Program</div>
                <div className='w-full h-[calc(100%-50px)] bg-red-300'></div>
            </div>


            <div className='w-full h-[50px] mt-9 ml-20 bg-cyan-200 flex items-center text-3xl font-[600]'>Newly Launched</div>
            <div className='w-[92%] max-h-[520px] bg-purple-200 flex justify-center flex-wrap'>
                <div className='w-[250px] h-[284px] bg-cyan-200 ml-4 mr-4 mt-9 transition-all duration-300 hover:shadow-2xl hover:scale-[1.006] flex flex-col'>
                    <div className='w-full h-[185px] bg-red-400'></div>
                    <div className='w-full h-[60px] bg-cyan-400'></div>
                    <div className='w-full h-[calc(100%-185px-60px)] bg-pink-400'></div>
                </div>
                <div className='w-[250px] h-[284px] bg-cyan-200 ml-4 mr-4 mt-9 transition-all duration-300 hover:shadow-2xl hover:scale-[1.006] flex flex-col'>
                    <div className='w-full h-[185px] bg-red-400'></div>
                    <div className='w-full h-[60px] bg-cyan-400'></div>
                    <div className='w-full h-[calc(100%-185px-60px)] bg-pink-400'></div>
                </div>
                <div className='w-[250px] h-[284px] bg-cyan-200 ml-4 mr-4 mt-9 transition-all duration-300 hover:shadow-2xl hover:scale-[1.006] flex flex-col'>
                    <div className='w-full h-[185px] bg-red-400'></div>
                    <div className='w-full h-[60px] bg-cyan-400'></div>
                    <div className='w-full h-[calc(100%-185px-60px)] bg-pink-400'></div>
                </div>
                <div className='w-[250px] h-[284px] bg-cyan-200 ml-4 mr-4 mt-9 transition-all duration-300 hover:shadow-2xl hover:scale-[1.006] flex flex-col'>
                    <div className='w-full h-[185px] bg-red-400'></div>
                    <div className='w-full h-[60px] bg-cyan-400'></div>
                    <div className='w-full h-[calc(100%-185px-60px)] bg-pink-400'></div>
                </div>
            </div>
        </div>
    )
}
