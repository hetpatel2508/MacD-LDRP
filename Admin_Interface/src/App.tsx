import React from 'react';
import Intro from './Components/Intro';
import Options from './Components/Options';
import Navbar from './Components/Navbar';
import MainBox from './Components/MainBox';
import Sidebar from './Components/Sidebar';
import SubBox from './Components/SubBox';
import User from './Components/User';
import Category from './Components/Category';
import Payments from './Components/Payments';
import Orders from './Components/Orders';
import Feedback from './Components/Feedback';
import Products from './Components/Products';

import { BrowserRouter, Route, Routes } from 'react-router';

export default function App() {
  const [showIntro, setShowIntro] = React.useState(true);
  const [showOptions, setShowOptions] = React.useState(true);

  const [OrderType, setOrderType] = React.useState('');
  return (
    <BrowserRouter>
      <div className="w-full h-full">
        <Navbar />
        <div className="w-full max-h-[calc(100%-80px)] ">
          <div className="w-full h-full flex items-center justify-center relative">
            <div className="h-full w-[270px]  fixed left-0 top-[80px]">
              <Sidebar></Sidebar>
            </div>
            <div className="h-full w-[calc(100%-270px)] ml-[270px] mt-[80px]  ">
              <Routes>
                <Route path="/" element={<User />} />
                <Route path="/Products" element={<Products />} />
                <Route path="/Category" element={<Category />} />
                <Route path="/Orders" element={<Orders />} />
                <Route path="/Feedbacks" element={<Feedback />} />
                <Route path="/Payments" element={<Payments />} />
                {/* <Route path="/:id" element={<SubBox />} /> */}
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
