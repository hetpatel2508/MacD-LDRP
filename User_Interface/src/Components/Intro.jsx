import React from 'react';
// Option 1: Import from images.js
import { feastAndFlyImage } from '../assets/images.js';
// Option 2: Direct import - uncomment if Option 1 doesn't work
// import feastAndFlyImage from '../assets/image copy 5.png';

export default function Intro({ setShowIntro }) {
    return (
        <div className="w-full h-full fixed z-20 bg-white">
            {/* Image Section */}
            <div className="w-full h-[500px] bg-pink-100 flex justify-center items-center relative mt-5">
                <img
                    src={feastAndFlyImage}
                    alt="Feast and Fly to Goa"
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                        console.error('Image failed to load');
                        e.target.style.display = 'none';
                    }}
                />
                
            </div>
            

            {/* Buttons Section */}
            <div className="absolute w-full flex flex-col items-center mt-[-58px]">
                {/* Offer Text */}
                <div className=" bottom-0 w-full text-center bg-white p-5 mt-">
                    <h1 className="text-[62px] font-bold">FEAST & FLY OFFERS</h1>
                    <p className="text-[19px] mt-2">
                        Buy the most Festive Treat for Two this season & win an assured trip to Goa!
                    </p>
                </div>
                {/* Start Order Button */}
                <button
                    className="w-[300px] h-[120px] flex flex-col items-center justify-center bg-gray-50 rounded-lg border border-black shadow-lg hover:bg-gray-200 transition mt-5"
                    onClick={() => setShowIntro(false)}
                >
                    <span className="text-[29px] font-bold">Start Order</span>
                    <span className="text-[21px]">to get deliciousness</span>
                </button>

                {/* Accessibility Button */}
                <button
                    className="w-[210px] h-[59px] flex items-center justify-center gap-2 bg-gray-50 rounded-lg border border-black mt-3 shadow-md hover:bg-gray-200 transition mt-5"
                >
                    <div className="w-[30px] h-[30px] bg-black rounded-full"></div>
                    <span className="text-[18px]">Accessibility</span>
                </button>
            </div>
        </div>
    );
}