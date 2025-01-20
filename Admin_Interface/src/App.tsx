import React from 'react';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import User from './Components/User';
import Category from './Components/Category';
import Payments from './Components/Payments';
import Orders from './Components/Orders';
import Feedback from './Components/Feedback';
import Products from './Components/Products';
import Login from './Components/Login';
import PrivateRoute from './Components/PrivateRoute';
import Cookie from 'js-cookie';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router';
import Meals from './Components/Meals';

export default function App() {
  React.useEffect(() => {
    const token = Cookie.get('token');
    if (!token) {
      window.location.href = '/login';
    }
  }, []);

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
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <User />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/Products"
                  element={
                    <PrivateRoute>
                      <Products />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/Category"
                  element={
                    <PrivateRoute>
                      <Category />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/Orders"
                  element={
                    <PrivateRoute>
                      <Orders />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/Feedbacks"
                  element={
                    <PrivateRoute>
                      <Feedback />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/Payments"
                  element={
                    <PrivateRoute>
                      <Payments />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/Meals"
                  element={
                    <PrivateRoute>
                      <Meals />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/Login"
                  element={
                    <PrivateRoute>
                      <Login />
                    </PrivateRoute>
                  }
                />
                {/* <Route path="/:id" element={<SubBox />} /> */}
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
