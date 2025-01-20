import React from 'react'
import { BsCart } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

export default function Navbar() {
    const TotalAmount = useSelector((state) => state.products.TotalAmount);
    const TotalQuantity = useSelector((state) => state.products.TotalQuantity);
    const navigate = useNavigate();

    return (
        <div className='w-full h-[80px] bg-white fixed top-0 z-10 flex items-center justify-center'>
            <div className="w-[250px] h-[70px] flex justify-center items-center bg-black ">
                <div className="w-full h-16 flex items-center px-8 bg-yellow-400  text-2xl font-bold">
                    <div>🍔 McDonald's</div>
                </div>
                {/* <div
                    className='w-[50px] h-[50px] flex items-center border border-black justify-center rounded-full absolute top-4 right-4'
                    onClick={()=>{navigate("/cart")}}
                >
                    <BsCart size={23} />
                    <div className='p-[3px] flex items-center justify-center text-white bg-black rounded-full text-[9px] absolute -top-1 -right-1'>{TotalAmount}</div>
                    
                </div>   */}
                <a
                    href="#"
                    className="flex h-10 items-center px-2 rounded-lg absolute top-4 right-4 border border-black focus:outline-none hover:shadow-inner"
                    onClick={() => { navigate("/cart") }}
                >
                    <svg
                        className="h-6 w-6 leading-none text-black stroke-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                    </svg>
                    {/* <span className="pl-1 text-black text-md">{TotalAmount}</span> */}
                    <span className="pl-1 text-black text-md">{TotalQuantity}</span>
                </a>
            </div>
        </div>
    )
}
