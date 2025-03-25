import React from "react";
import Homepage from "./components/Homepage"; //home page
import AboutUs from './components/AboutUs'; // AboutUs import
import Tax_Learning_home from './components/Tax_Learning_home'; // Tax_Learning_home import
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/Tax_learning_home" element={<Tax_Learning_home />} /> {/* Fixed */}
    </Routes>
  );
};

export default App;