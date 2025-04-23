import React from 'react';
import Intro from './Components/Intro';
import Options from './Components/Options';
import Navbar from './Components/Navbar';
import MainBox from './Components/MainBox';
import Sidebar from './Components/Sidebar';
import SubBox from './Components/SubBox';
import { BrowserRouter, Route, Routes } from 'react-router';
import ValueMeal from './Components/ValueMeal';
import BurgerWraps from './Components/BurgerWraps';
import CoffeeBeverages from './Components/CoffeeBeverages';
import Condiments from './Components/Condiments';
import Desserts from './Components/Dessert';
import FriesSides from './Components/FriesSides';
import HappyMeal from './Components/HappyMeal';
import McSavers from './Components/McSavers';
import NONG from './Components/NONG';
import ProductDetails from './Components/ProductDetails';
import Cart from './Components/Cart';
import SendEmail from './Components/SendEmail';
import TakeInputNameEmail from './Components/TakeInputNameEmail';

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
        <div className="w-full max-h-[calc(100%-80px)] ">
          <div className="w-full h-full flex items-center justify-center relative">
            <div className="h-full w-[270px] fixed left-0 top-[80px]">
              <Sidebar></Sidebar>
            </div>
            <div className="h-full w-[calc(100%-270px)] ml-[270px] mt-[80px] ">
              <Routes>
                <Route path="/" element={<MainBox />} />
                <Route path="/cart" element={<Cart OrderType={OrderType} />} />
                <Route path="/:id" element={<SubBox />} />
                <Route path="/value-meal" element={<ValueMeal />} />
                <Route path="/burger-wraps" element={<BurgerWraps />} />
                <Route path="/coffee-beverages" element={<CoffeeBeverages />} />
                <Route path="/condiments" element={<Condiments />} />
                <Route path="/desserts" element={<Desserts />} />
                <Route path="/fries-sides" element={<FriesSides />} />
                <Route path="/happy-meal" element={<HappyMeal />} />
                <Route path="/mc-savers" element={<McSavers />} />
                <Route path="/nong" element={<NONG />} />
                <Route path="/order-details/:id" element={<SendEmail />} />
                {/* <Route path="/nong" element={<SendEmail />} /> */}
                <Route path="/product/:id" element={<ProductDetails />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
