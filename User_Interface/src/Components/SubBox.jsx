import React from 'react'
import { useParams } from 'react-router-dom'

export default function SubBox() {
    const { id } = useParams();
    const data = [
        "All", "Veg", "Chicken", "Fish", "Egg"
    ];
    return (
        <div className='w-full h-full flex flex-col items-center overflow-x-hidden'>
            <div className='w-full h-[50px] mt-9 ml-[100px] bg-cyan-200 flex items-center text-3xl font-[600]'>Newly Launched</div>
            <div className='w-[92%] min-h-[55px] bg-cyan-900 flex justify-center flex-wrap'>
                {
                    data.map((item) => (
                        <div className='px-12 h-[40px] bg-cyan-200 flex items-center justify-center cursor-pointer hover:bg-cyan-400 rounded-full ml-2 mr-2 mt-2'>{item}</div>
                    ))
                }
            </div>
            <div className='w-[92%] min-h-[520px] bg-purple-200 flex pb-10 flex-wrap'>
                <div className='w-[250px] h-[284px] bg-cyan-200 ml-6 mr-4 mt-[50px] transition-all duration-300 hover:shadow-2xl hover:scale-[1.006] flex flex-col rounded-[16px]'>
                    <div className='w-full h-[185px] rounded-t-[14px] bg-red-400'></div>
                    <div className='w-full h-[60px] bg-cyan-400'>Id is {id}</div>
                    <div className='w-full h-[calc(100%-185px-60px)] rounded-b-[16px] bg-pink-400'></div>
                </div>
                <div className='w-[250px] h-[284px] bg-cyan-200 ml-6 mr-4 mt-[50px] transition-all duration-300 hover:shadow-2xl hover:scale-[1.006] flex flex-col rounded-[16px]'>
                    <div className='w-full h-[185px] rounded-t-[14px] bg-red-400'></div>
                    <div className='w-full h-[60px] bg-cyan-400'>Id is {id}</div>
                    <div className='w-full h-[calc(100%-185px-60px)] rounded-b-[16px] bg-pink-400'></div>
                </div>
                <div className='w-[250px] h-[284px] bg-cyan-200 ml-6 mr-4 mt-[50px] transition-all duration-300 hover:shadow-2xl hover:scale-[1.006] flex flex-col rounded-[16px]'>
                    <div className='w-full h-[185px] rounded-t-[14px] bg-red-400'></div>
                    <div className='w-full h-[60px] bg-cyan-400'>Id is {id}</div>
                    <div className='w-full h-[calc(100%-185px-60px)] rounded-b-[16px] bg-pink-400'></div>
                </div>
                <div className='w-[250px] h-[284px] bg-cyan-200 ml-6 mr-4 mt-[50px] transition-all duration-300 hover:shadow-2xl hover:scale-[1.006] flex flex-col rounded-[16px]'>
                    <div className='w-full h-[185px] rounded-t-[14px] bg-red-400'></div>
                    <div className='w-full h-[60px] bg-cyan-400'>Id is {id}</div>
                    <div className='w-full h-[calc(100%-185px-60px)] rounded-b-[16px] bg-pink-400'></div>
                </div>
                <div className='w-[250px] h-[284px] bg-cyan-200 ml-6 mr-4 mt-[50px] transition-all duration-300 hover:shadow-2xl hover:scale-[1.006] flex flex-col rounded-[16px]'>
                    <div className='w-full h-[185px] rounded-t-[14px] bg-red-400'></div>
                    <div className='w-full h-[60px] bg-cyan-400'>Id is {id}</div>
                    <div className='w-full h-[calc(100%-185px-60px)] rounded-b-[16px] bg-pink-400'></div>
                </div>
                <div className='w-[250px] h-[284px] bg-cyan-200 ml-6 mr-4 mt-[50px] transition-all duration-300 hover:shadow-2xl hover:scale-[1.006] flex flex-col rounded-[16px]'>
                    <div className='w-full h-[185px] rounded-t-[14px] bg-red-400'></div>
                    <div className='w-full h-[60px] bg-cyan-400'>Id is {id}</div>
                    <div className='w-full h-[calc(100%-185px-60px)] rounded-b-[16px] bg-pink-400'></div>
                </div>
            </div>
        </div>
    )
}
