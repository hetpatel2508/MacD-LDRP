import React from 'react'
import EatIn from '../assets/EatIn.jpeg'
import { Link } from 'react-router'

export default function Sidebar() {
    const data = [
        {
            id: 1,
            img: EatIn,
            name: "Value Meal"
        },
        {
            id: 2,
            img: EatIn,
            name: "Burger & Wraps"
        },
        {
            id: 3,
            img: EatIn,
            name: "Festive Sharing Meal"
        },
        {
            id: 4,
            img: EatIn,
            name: "Coffee & Beverages"
        },
        {
            id: 5,
            img: EatIn,
            name: "Frish & Sides"
        },
        {
            id: 6,
            img: EatIn,
            name: "Happy Meal"
        },
        {
            id: 7,
            img: EatIn,
            name: "Desserts"
        },
        {
            id: 8,
            img: EatIn,
            name: "Cakes & Bakes"
        },
        {
            id: 9,
            img: EatIn,
            name: "McSavers + Combos"
        },
        {
            id: 10,
            img: EatIn,
            name: "Condiments"
        },
        {
            id: 11,
            img: EatIn,
            name: "No Onion No Garlic"
        }
    ]
    return (
        <div className='w-full h-full '>

            <Link to="/" className='w-full h-[80px] mt-9 rounded-r-full bg-pink-200 flex items-center cursor-pointer'>
                <div className='ml-4 mr-4 max-w-[60px] max-h-[60px] rounded-full bg-black flex items-center justify-center overflow-hidden'>
                    <img src={EatIn} alt="" className='w-full h-full' />
                </div>
                <div className='w-[55px] h-[35px] flex items-center pt-0.5 border-b-[4px] border-yellow-400  '>
                    <p className='text-xl font-[600]'>Home</p>
                </div>
            </Link>


            <div className='w-full min-h-[50px] mt-9 rounded-r-[15px] bg-pink-200'>
                {
                    data.map((item) => {
                        if (item.id === 1) {
                            return (
                                <Link to={`/${item.id}`} className='w-full h-[50px]'>
                                    <div className='w-full h-[50px] border rounded-tr-[15px] bg-pink-400 flex items-center'>
                                        <div className='ml-2 mr-2 max-w-[50px] max-h-[50px] rounded-full bg-black flex items-center justify-center overflow-hidden'><img src={item.img} alt="" /></div>
                                        <div className='w-[70%] h-full flex items-center pt-0.5 bg-cyan-100'>
                                            <p className='text-xl font-[400]'>{item.name}</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        }
                        else if (item.id === data.length) {
                            return (
                                <Link to={`/${item.id}`} className='w-full h-[50px]'>
                                    <div className='w-full h-[50px] border rounded-br-[15px] bg-pink-400 flex items-center'>
                                        <div className='ml-2 mr-2 max-w-[50px] max-h-[50px] rounded-full bg-black flex items-center justify-center overflow-hidden'><img src={item.img} alt="" /></div>
                                        <div className='w-[70%] h-full flex items-center pt-0.5 bg-cyan-100'>
                                            <p className='text-xl font-[400]'>{item.name}</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        }
                        else {
                            return (
                                <Link to={`/${item.id}`} className='w-full h-[50px]'>
                                    <div className='w-full h-[50px] border bg-pink-400 flex items-center'>
                                        <div className='ml-2 mr-2 max-w-[50px] max-h-[50px] rounded-full bg-black flex items-center justify-center overflow-hidden'><img src={item.img} alt="" /></div>
                                        <div className='w-[70%] h-full flex items-center pt-0.5 bg-cyan-100'>
                                            <p className='text-xl font-[400]'>{item.name}</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}
