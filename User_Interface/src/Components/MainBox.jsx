import React, { useEffect, useState } from 'react';
import IntroSvg from '../assets/prince.svg';

export default function MainBox() {

    return (
        <div className='w-full h-full flex flex-col items-center overflow-x-hidden'>
            <div className='w-full h-[50px] mt-9 ml-20 flex items-center text-3xl font-[600]'>Discover our Menu</div>

            <div className='w-[80%] h-[520px] flex justify-center flex-wrap'>
                {/* Static menu items */}
                {[
                    "https://mcdindia.com/wp-content/uploads/2023/01/veg-surprise-burger-1.png",
                    "https://mcdindia.com/wp-content/uploads/2020/02/2.1-mcaloo-tikki-cheese.png",
                    "https://mcdindia.com/wp-content/uploads/2020/02/2.3-mc-veggie-single.png",
                    "https://mcdindia.com/wp-content/uploads/2020/02/2.5-filet-o-fish.png",
                    "https://mcdindia.com/wp-content/uploads/2020/02/2.6-mcspicy-paneer-single.png"
                ].map((src, idx) => (
                    <div key={idx} className='w-[284px] h-[220px] bg-gray-100 ml-4 mr-4 mt-9 transition-all duration-300 hover:shadow-2xl hover:scale-100'>
                        <img className='w-full h-full object-cover' src={src} alt={`menu-item-${idx}`} />
                    </div>
                ))}
            </div>

            <div className='w-[100%] h-[190px] flex flex-col mt-9'>
                <div className='w-full h-[50px] flex items-center text-3xl font-[600] ml-[40px]'>Discover our new Loyalty Program</div>
                <div className='w-full h-[calc(100%-10px)] mt-5'>
                    <img src={IntroSvg} className='w-full h-full object-contain' alt="Loyalty Program" />
                </div>
            </div>


            <div className='w-full h-[50px] mt-24 ml-20 flex items-center text-3xl font-[600]'>Newly Launched</div>

            <div className='w-[100%] h-[520px] flex justify-center flex-wrap'>
                {/* Static menu items */}
                {[
                    "https://s7d1.scene7.com/is/image/mcdonalds/DC_201906_2692_MediumCappuccino_Glass_A1_HL_1564x1564-1:nutrition-calculator-tile",
                    "https://b.zmtcdn.com/data/dish_photos/8fd/f0c31b902a423b92bca43b0fae8df8fd.png",
                    "https://b.zmtcdn.com/data/dish_photos/d09/4f81f1aa86e90e15926b0508517b0d09.png",
                    "https://b.zmtcdn.com/data/dish_photos/4ae/e48b3e3982e57e85968fadec054fb4ae.png",
                    // "https://mcdindia.com/wp-content/uploads/2020/02/2.6-mcspicy-paneer-single.png"
                ].map((src, idx) => (
                    <div key={idx} className='w-[284px] h-[220px] bg-gray-100 ml-4 mr-4 mt-9 transition-all duration-300 hover:shadow-2xl hover:scale-100'>
                        <img className='w-full h-full object-contain' src={src} alt={`menu-item-${idx}`} />
                    </div>
                ))}
            </div>
        </div>
    );
}
