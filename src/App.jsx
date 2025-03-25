import React from "react";
import Homepage from "./components/Homepage"; //home page
import AboutUs from './components/AboutUs'; // AboutUs import
import { Route,Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<AboutUs />} />
    </Routes>
  );
};

export default App;