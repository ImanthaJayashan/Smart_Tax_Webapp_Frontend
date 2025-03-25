import React from "react";
import Homepage from "./components/Homepage"; //home page
import AboutUs from './components/AboutUs'; // AboutUs import
import { Route, Routes, useLocation } from 'react-router-dom';
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {
  const location = useLocation();
  const noNavRoutes = ['/login', '/signup'];
  return (
    <>
      {!noNavRoutes.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>

  );
};

export default App;