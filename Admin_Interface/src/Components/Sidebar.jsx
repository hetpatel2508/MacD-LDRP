import React from "react";
import EatIn from "../assets/EatIn.jpeg";
import { Link } from "react-router";

export default function Sidebar() {
  const data = [
    {
      id: 1,
      img: EatIn,
      name: "Value Meal",
    },
    {
      id: 2,
      img: EatIn,
      name: "Burger & Wraps",
    },
    {
      id: 3,
      img: EatIn,
      name: "Festive Sharing Meal",
    },
    {
      id: 4,
      img: EatIn,
      name: "Coffee & Beverages",
    },
    {
      id: 5,
      img: EatIn,
      name: "Frish & Sides",
    },
    {
      id: 6,
      img: EatIn,
      name: "Happy Meal",
    },
    {
      id: 7,
      img: EatIn,
      name: "Desserts",
    },
    {
      id: 8,
      img: EatIn,
      name: "Cakes & Bakes",
    },
    {
      id: 9,
      img: EatIn,
      name: "McSavers + Combos",
    },
    {
      id: 10,
      img: EatIn,
      name: "Condiments",
    },
    {
      id: 11,
      img: EatIn,
      name: "No Onion No Garlic",
    },
  ];
  return (
    <div className="w-full h-full ">
      <div className="w-full min-h-[50px] mt-9 rounded-r-[15px] bg-gray-100">
      <Link to={`/`} className="w-full h-[50px]">
                <div className="w-full h-[50px] border rounded-tr-[15px]   flex items-center">
                  <div className="w-[95%] h-full flex items-center justify-center pt-0.5 ">
                    <p className="text-xl font-[400]">User</p>
                  </div>
                </div>
              </Link>
      <Link to={`/Category`} className="w-full h-[50px]">
                <div className="w-full h-[50px] border  flex items-center">
                  <div className="w-[95%] h-full flex items-center justify-center pt-0.5 ">
                    <p className="text-xl font-[400]">Category</p>
                  </div>
                </div>
              </Link>
      <Link to={`/Products`} className="w-full h-[50px]">
                <div className="w-full h-[50px] border  flex items-center">
                  <div className="w-[95%] h-full flex items-center justify-center pt-0.5 ">
                    <p className="text-xl font-[400]">Products</p>
                  </div>
                </div>
              </Link>
      <Link to={`/Meals`} className="w-full h-[50px]">
                <div className="w-full h-[50px] border  flex items-center">
                  <div className="w-[95%] h-full flex items-center justify-center pt-0.5 ">
                    <p className="text-xl font-[400]">Meals</p>
                  </div>
                </div>
              </Link>
      {/* <Link to={`/Feedbacks`} className="w-full h-[50px]">
                <div className="w-full h-[50px] border   flex items-center">
                  <div className="w-[95%] h-full flex items-center justify-center pt-0.5 ">
                    <p className="text-xl font-[400]">Feedbacks</p>
                  </div>
                </div>
              </Link>
      <Link to={`/Orders`} className="w-full h-[50px]">
                <div className="w-full h-[50px] border  flex items-center">
                  <div className="w-[95%] h-full flex items-center justify-center pt-0.5 ">
                    <p className="text-xl font-[400]">Orders</p>
                  </div>
                </div>
              </Link>
      <Link to={`/Payments`} className="w-full h-[50px]">
                <div className="w-full h-[50px] border rounded-br-[15px]  flex items-center">
                  <div className="w-[95%] h-full flex items-center justify-center pt-0.5 ">
                    <p className="text-xl font-[400]">Payments</p>
                  </div>
                </div>
              </Link> */}
                
           
      </div>
    </div>
  );
}
