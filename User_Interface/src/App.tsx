import React from 'react';
import Intro from './Components/Intro';
import Options from './Components/Options';
import Navbar from './Components/Navbar';
import MainBox from './Components/MainBox';
import Sidebar from './Components/Sidebar';
import SubBox from './Components/SubBox';
import { BrowserRouter, Route, Routes } from 'react-router';

export default function App() {
  const [showIntro, setShowIntro] = React.useState(true);
  const [showOptions, setShowOptions] = React.useState(true);

  const [OrderType, setOrderType] = React.useState('');
  return (
    <BrowserRouter>
      {showIntro && <Intro setShowIntro={setShowIntro} />}
      {showOptions && <Options setShowOptions={setShowOptions} setOrderType={setOrderType} />}
      <div className="w-full h-full">
        <Navbar />
        <div className="w-full max-h-[calc(100%-80px)] bg-pink-200">
          <div className="w-full h-full flex items-center justify-center relative">
            <div className="h-full w-[270px] bg-cyan-200 fixed left-0 top-[80px]">
              <Sidebar></Sidebar>
            </div>
            <div className="h-full w-[calc(100%-270px)] ml-[270px] mt-[80px] bg-pink-400 ">
              <Routes>
                <Route path="/" element={<MainBox />} />
                <Route path="/:id" element={<SubBox />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
